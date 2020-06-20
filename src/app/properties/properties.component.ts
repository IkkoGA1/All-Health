import { Component, OnInit } from '@angular/core';
import { Property } from '../models/property';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../property.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {

  properties: Property[] = [];
  filteredProperties: Property[] = [];
  categories$;
  category: string;
  

  constructor(
   
    private route: ActivatedRoute,
    private propertyService: PropertyService,  
    private categoryService: CategoryService) {
      
  }

  async ngOnInit(){
    this.categories$ = await this.categoryService.getAll();
    this.populateProperties();
  }

  private populateProperties() {
    this.propertyService.getAvailable()
    .switchMap(properties => {
      this.properties = properties;
      return this.route.queryParamMap;
    })
    .subscribe(params => {
      this.category = params.get('category');
      this.applyFilter();
    });
  }
  
  private applyFilter() {
    this.filteredProperties = (this.category) ?
    this.properties.filter(p => p.category === this.category) :
    this.properties;
  }
  

}
