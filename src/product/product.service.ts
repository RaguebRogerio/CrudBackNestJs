//Aca se definen los metodos, luego estos se aplican en los controladores
import { Injectable } from '@nestjs/common';
import {Model} from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/product.dto';
@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

    //Ahora declaro los metodos del shcema Product 

    async getProducts(): Promise<Product[]>  {
        const products = await this.productModel.find()
        return products; 
    }

    async getProduct(productID: string): Promise<Product> {
        const product = await this.productModel.findById(productID);
        return product;
    }

    async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
        const product = new this.productModel(createProductDTO);
        await product.save();
        return product;
    }

    async deleteProduct(productID: string): Promise<Product> {
        const deletedProduct = await this.productModel.findByIdAndDelete(productID);
        return deletedProduct;
    }

    async updateProduct(productID: string, createProductDTO: CreateProductDTO): Promise<Product>{
        const updateProduct = await this.productModel.findByIdAndUpdate(productID, createProductDTO, {new: true});
        return updateProduct
    }
}
