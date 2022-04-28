import {Document} from 'mongoose'
export interface Product extends Document { //Mongo solo lee documentos
    readonly name: string;
    readonly description: string;
    readonly imageURL: string;
    readonly price: string;
    readonly createdAt: string;
}