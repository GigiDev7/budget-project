import { Component, OnInit } from '@angular/core';
import { CategoryService } from './services/category.service';
import { CategoryModel } from './category.model';
import { FormCardService } from '../shared/form-card/services/form-card.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  constructor(
    public categoryService: CategoryService,
    public formCardService: FormCardService
  ) {}

  public trackBy(index: number, item: CategoryModel): string {
    return item._id;
  }

  public ngOnInit(): void {
    this.categoryService.getCategories().subscribe();
  }
}
