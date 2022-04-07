import { Component, Input } from '@angular/core';
import { ReloadService } from 'src/app/reload/reload.service';
import { CategoryModel } from '../category.model';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss'],
})
export class CategoryItemComponent {
  @Input() category!: CategoryModel;

  public onDeleteClick(): void {
    this.categoryService.deleteCategory(this.category._id).subscribe();
    this.reloadService.reloadComponent();
  }

  constructor(
    private categoryService: CategoryService,
    private reloadService: ReloadService
  ) {}
}
