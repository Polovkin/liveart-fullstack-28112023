import {BindingScope, injectable, service} from '@loopback/core';
import {repository} from "@loopback/repository";
import {ProductRepository, TagRepository} from "../repositories";
import {Product, Tag} from "../models";
import {FilesService, FilesServiceInterface} from "./files.service";

export interface ProductServiceInterface {
    updateProduct(id: string, product: Product): Promise<void>;

    createProduct(product: Omit<Product, 'id'>): Promise<Product>;

    getAvailableProducts(): Promise<Product[]>
}

@injectable({scope: BindingScope.TRANSIENT})
export class ProductService implements ProductServiceInterface {
    constructor(
        @service(FilesService)
        public fileService: FilesServiceInterface,

        @repository(ProductRepository)
        public productRepository: ProductRepository,

        @repository(TagRepository)
        public tagRepository: TagRepository
    ) {
    }

    async getAvailableProducts(): Promise<Product[]> {
        return await this.productRepository.find({
            where: {
                isHidden: false,
            },
        });
    }

    async createProduct(product: Product) {
        const productImage = product?.previewImage;

        if (productImage) {
            const filename = await this.fileService.uploadFile(productImage);
            return await this.productRepository.create({
                ...product,
                previewImage: filename,
            });
        }

        return await this.productRepository.create(product);
    }

    async updateProduct(id: string, product: Product) {
        const tagsIds = product?.tags;
        const productImage = product?.previewImage;
        const newProduct = new Product();

        newProduct.name = product.name;
        newProduct.description = product.description;
        newProduct.categoryId = product.categoryId;
        newProduct.isHidden = product.isHidden;

        if (tagsIds) {
            newProduct.tags = tagsIds;
        }

        if (productImage) {
            const {previewImage} = await this.replaceProductImage(product);
            newProduct.previewImage = previewImage;
        }

        return await this.productRepository.replaceById(id, newProduct);
    }

    private async replaceProductImage(request: Product) {
        const productImage = request?.previewImage;
        const oldProductImage = await this.productRepository.findById(request.id).then(product => product.previewImage);

        if (productImage && productImage !== oldProductImage) {
            if (oldProductImage) {
                await this.fileService.deleteFile(oldProductImage);
            }
            const filename = await this.fileService.uploadFile(productImage);
            return {
                ...request,
                previewImage: filename,
            } as Product;
        }
        return request;
    }

}
