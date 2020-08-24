import { Property } from './property';

export class RentalPropertyItem {
    key: string;
    address: string;
    rent: number;
    constructor(public property: Property, public quantity: number) {}
}