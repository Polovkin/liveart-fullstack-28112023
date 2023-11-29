import {BindingScope, injectable, service} from '@loopback/core';
import {repository} from "@loopback/repository";
import {ProductRepository} from "../repositories";
import {Product} from "../models";
import {FilesService, FilesServiceInterface} from "./files.service";

export interface ProductServiceInterface {
    updateProduct(id: string, product: Product): Promise<void>;

    createProduct(product: Omit<Product, 'id'>): Promise<Product>;

    getAvaliableProducts(): Promise<Product[]>;
}

@injectable({scope: BindingScope.TRANSIENT})
export class ProductService implements ProductServiceInterface {
    constructor(
        @service(FilesService)
        public fileService: FilesServiceInterface,
        @repository(ProductRepository)
        public productRepository: ProductRepository) {
    }

    async getAvaliableProducts(): Promise<Product[]> {
        return await this.productRepository.find({
            where: {
                isHidden: false,
            }
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
        const productImage = product?.previewImage;

        if (productImage) {
            const oldProduct = await this.productRepository.findById(id);
            const oldProductImage = oldProduct?.previewImage;

            if (productImage === oldProductImage) {
                return await this.productRepository.replaceById(id, product);
            }
            if (oldProductImage) {
                await this.fileService.deleteFile(oldProductImage);
            }

            const filename = await this.fileService.uploadFile(productImage);
            return await this.productRepository.replaceById(id, {
                ...product,
                previewImage: filename,
            });
        }

        return await this.productRepository.replaceById(id, product);
    }
}
