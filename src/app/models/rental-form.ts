import { RentalFormItem } from './rental-form-item';
import { Rental } from './rental';

export class RentalForm {
    items: RentalFormItem[] = [];
    constructor(private itemsMap: { [rentalFormId: string]: RentalFormItem }) {
      this.itemsMap = itemsMap || {};
      for (let rentalFormId in itemsMap) {
        let item = itemsMap[rentalFormId];
        this.items.push(new RentalFormItem(item.rentalForm, item.quantity));
      }
        
    }
  getQuantity(rentalForm: Rental) {
    let item = this.itemsMap[rentalForm.key];
    return item ? item.quantity : 0;
  }
}