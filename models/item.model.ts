export default class Item {
    product: string;
    price: string;
    searchTerm: string;
    linkToProductPage: string;
    constructor(product: string, price: string, searchTerm: string, linkToProductPage: string) {
        this.product = product;
        this.price = price;
        this.searchTerm = searchTerm;
        this.linkToProductPage = linkToProductPage;
    }
}