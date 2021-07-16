import { IProduct } from "./product";

export class productImpl implements IProduct{

    productId!: number;
    productName!: string;
    productCode!: string;
    releaseDate!: string;
    description!: string;
    price!: number;
    starRating!: number;
    imageUrl!: string;
   
}