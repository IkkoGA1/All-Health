import { Component, OnInit } from '@angular/core';
import { CategoryService } from './../../category.service';
import { StatusService } from 'src/app/status.service';
import { PropertyService } from './../../property.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.css']
})
export class PropertyFormComponent implements OnInit {
  categories$;
  status$;
  property: any = {};
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService, 
    private statusService: StatusService, 
    private propertyService: PropertyService) { 
    this.categories$ = categoryService.getCategories();
    this.status$ = statusService.getStatus();


    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.propertyService.get(this.id)
    .valueChanges()
    .pipe(take(1)).subscribe(p => this.property = p);
  }

  save(property) {
    if (this.id) this.propertyService.update(this.id, property);

    else this.propertyService.create(property);
    this.router.navigate(['/admin/properties']);
  }

  delete() {
    if (!confirm('Are you sure that you want to delete this property?')) return; 
      
    this.propertyService.delete(this.id);
    this.router.navigate(['/admin/properties']);
    
  }
  filter(query) {
    console.log(query.split('').filter(query));
  }
  ngOnInit() {
  }

}
