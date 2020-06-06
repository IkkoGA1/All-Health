import { Component, OnInit, OnDestroy } from '@angular/core';
import { PropertyService } from './../../property.service';
import { StatusService } from './../../status.service';
import { Subscription } from 'rxjs';
import { Property } from 'src/app/models/property';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit, OnDestroy {
  properties: Property[];
  filteredProperties: any[];
  items: Property[] = []; 
  subscription: Subscription;
  itemCount: number;
  tableResource: DataTableResource<Property>;

  constructor(private propertyService: PropertyService, private statusService: StatusService) { 
    this.subscription = this.propertyService.getAll()
    .subscribe(properties => {
      this.properties = properties;
      this.initializeTable(properties);
    });
      
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initializeTable(properties: Property[]) {
    this.tableResource = new DataTableResource(properties);
    this.tableResource.query({ offset: 0 })
      .then(items => this.properties = properties);
    this.tableResource.count()
      .then(count => this.itemCount = count);  
  }
  
  reloadItems(params) {
    if (!this.tableResource) return

    this.tableResource.query(params)
      .then(items => this.items = items);
  }

  filter(query: string) {
    this.filteredProperties = (query) ?
      this.properties.filter(p => p.address.toLowerCase().includes(query.toLowerCase())) :
      this.properties;


      this.initializeTable(this.filteredProperties);
  }
  ngOnInit(): void {
  }

}
