import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Query } from '@nestjs/common';
import {CreateProductDTO} from './dto/product.dto';
import { ProductService } from './product.service';
//El controlador es la manera en la que vamos a controlar las rutas qu vienen al servidor
@Controller('product')
export class ProductController {
    //Instanciar el servicio
    constructor(private productService: ProductService){}
    @Post('/create')
    async cereatePost(@Res() res, @Body() createProductDTO: CreateProductDTO){
        const product = await this.productService.createProduct(createProductDTO)
        return res.status(HttpStatus.OK).json({
            message: 'Producto creado con exito',
            product: product,
        });
    }

    @Get('/')
    async getProducts(@Res() res){
        const products = await this.productService.getProducts();
        return res.status(HttpStatus.OK).json({
            products: products
        })
    }
    //Aca trabajo con parametros
    @Get('/:productID')
    async getProduct(@Res() res, @Param('productID') productID){
        const product = await this.productService.getProduct(productID);
        if(!product)throw new NotFoundException('El producto no existe');
        return res.status(HttpStatus.OK).json(product)
    }
    //Aca trabajo con Query
    @Delete('/delete')
    async deleteProduct(@Res() res, @Query('productID') productID){
        const productDeleted = await this.productService.deleteProduct(productID);
        if(!productDeleted)throw new NotFoundException('El producto no existe');
        return res.status(HttpStatus.OK).json({
            message: 'El producto fue eliminado',
            product: productDeleted
        })
    }
    
    @Put('/update')
    async updateProduct(@Res() res, @Body() createProductDTO: CreateProductDTO, @Query('productID') productID){
        const updateProduct = await this.productService.updateProduct(productID, createProductDTO)
        if(!updateProduct)throw new NotFoundException('El producto no existe');
        return res.status(HttpStatus.OK).json({
            message: 'El producto fue modificado',
            updateProduct
        })
    }
}
