import { RentalPropertyItem } from './rental-cart-item';
import { Property } from './property';


export class RentalCart {
  items: RentalPropertyItem[] = [];
  constructor(private itemsMap: { [propertyId: string]: RentalPropertyItem }) {
    this.itemsMap = itemsMap || {};
    for (let propertyId in itemsMap) {
      let item = itemsMap[propertyId];
      this.items.push(new RentalPropertyItem(item.property, item.quantity));
    }

  }
  getQuantity(property: Property) {
    let item = this.itemsMap[property.key];
    return item ? item.quantity : 0;
  }
}