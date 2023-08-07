export interface Product {
    product: ProductElement[];
}

export interface ProductElement {
    name:   string;
    price:  number;
    detail: string;
    cname:  Cname;
    pid:    number;
    image: string[];
    text: string;
    
}

export enum Cname {
    Car = "Car",
    Dress = "Dress",
    Electronic = "Electronic",
    Food = "Food",
    Home = "Home",
    Kitchen = "Kitchen",
    Shoes = "Shoes",
}
