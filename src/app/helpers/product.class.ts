export class Products {
    products: Product[]

    constructor(){
        this.products = [];
    }
}

export class Product{
    id!: number;
    name!: string;
    category!: string;
    price!: number;
    floor!: number;
    shelves!: string;
    shopId!: number;
}