import { Component, OnInit } from '@angular/core';
import { CategoryService } from './services/category.service';
import { CategoryModel } from './category.model';
import { FormCardService } from '../shared/form-card/services/form-card.service';
import { ModalService } from '../shared/modal-card/services/modal-card.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  constructor(
    public categoryService: CategoryService,
    public formCardService: FormCardService,
    public modalService: ModalService
  ) {}

  public trackBy(index: number, item: CategoryModel): string {
    return item._id;
  }

  public onClickHandler(event: Event): void {
    if (
      this.categoryService.activeCategory &&
      !(event.target as Element).className.includes('category')
    ) {
      this.categoryService.setActiveCategory(null);
    }
  }

  public ngOnInit(): void {
    this.categoryService.getCategories().subscribe();
  }
}
