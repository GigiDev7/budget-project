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

  public categoryTitle: string = '';

  public onDeleteClick(): void {
    this.categoryService.deleteCategory(this.category._id).subscribe();
    this.reloadService.reloadComponent();
  }

  public onEditClick(event:Event): void {
    event.stopPropagation()
    this.categoryService.setActiveCategory(this.category);
    this.categoryTitle = this.category.title;
  }

  public onConfirmClick(): void {
    if (!this.checkValidation()) return;
    this.categoryService
      .updateCategory(this.category._id, this.categoryTitle)
      .subscribe();
    this.categoryService.setActiveCategory(null);
    this.reloadService.reloadComponent();
  }

  public checkValidation(): boolean {
    return /^[a-zA-Z]+$/.test(this.categoryTitle);
  }

  constructor(
    public categoryService: CategoryService,
    private reloadService: ReloadService
  ) {}
}
