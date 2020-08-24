import { Rental } from './rental';

export class RentalFormItem {
    key: string;
    name: string;
    address: string;
    income: number;
    email: string;
    phone: number;
    constructor(public rentalForm: Rental, public quantity: number) {}
}