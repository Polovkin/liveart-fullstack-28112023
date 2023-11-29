import {BindingScope, inject, injectable, service} from '@loopback/core';
import {Filter, repository} from "@loopback/repository";
import {ProductRepository} from "../repositories";
import {Product} from "../models";
import {FilesService, FilesServiceInterface} from "./files.service";

export interface ProductServiceInterface {
    updateProduct(id: string, product: Product): Promise<void>;
}

@injectable({scope: BindingScope.TRANSIENT})
export class ProductService implements ProductServiceInterface {
    constructor(
        @service(FilesService)
        public fileService: FilesServiceInterface,

        @repository(ProductRepository)
        public productRepository: ProductRepository) {
    }

    async updateProduct(id: string, product: Product) {
        const productImage = product?.previewImage;

        if (productImage) {
          const filename = await this.fileService.uploadFile(productImage);
            return await this.productRepository.replaceById(id, {
                ...product,
                previewImage: filename,
            });
        }

        return await this.productRepository.replaceById(id, product);
    }
}
