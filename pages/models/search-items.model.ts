import Item from "./item.model";

export default interface Items {
    name: string;
    id: number;
    payload: Item[];
}