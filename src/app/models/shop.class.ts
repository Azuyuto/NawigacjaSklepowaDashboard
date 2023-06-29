export class Shops {
    shops: Shop[]

    constructor(){
        this.shops = [];
    }
}

export class Shop{
    id!: any;
    name!: any;
    address!: any;
    postalCode!: any;
    city!: any;
    country!: any;
}