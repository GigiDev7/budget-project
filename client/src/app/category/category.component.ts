import { Component, OnInit } from '@angular/core';
import { CategoryService } from './services/category.service';
import { CategoryModel } from './category.model';
import { FormCardService } from '../shared/form-card/services/form-card.service';
import { ModalService } from '../shared/modal-card/services/modal-card.service';
import { NotificationService } from '../shared/notification-card/services/notification.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  public searchQuery: string = '';
  private incomeClicked: boolean = false;
  private expanseClicked: boolean = false;
  public isEmpty: boolean = false;

  constructor(
    public categoryService: CategoryService,
    public formCardService: FormCardService,
    public modalService: ModalService,
    public notificationService: NotificationService
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

  public handleInputChange(event: Event): void {
    this.isEmpty = false;
    this.searchQuery = (event.target as HTMLInputElement).value;
    if (!this.searchQuery) {
      this.categoryService.filteredCategories = null;
    }
    if (this.searchQuery.length > 1) {
      const filtered = this.categoryService.categories.filter((el) =>
        el.title.toLowerCase().startsWith(this.searchQuery.toLowerCase())
      );
      if (filtered.length === 0) {
        this.isEmpty = true;
      }
      this.categoryService.filteredCategories = filtered;
    }
  }

  public onIncomeClick(): void {
    if (this.incomeClicked) {
      this.incomeClicked = false;
      this.categoryService.filteredCategories = null;
    } else {
      this.incomeClicked = true;
      const filtered = this.categoryService.categories.filter(
        (el) => el.type === 'income'
      );
      this.categoryService.filteredCategories = filtered;
    }
  }

  public onExpanseClick(): void {
    if (this.expanseClicked) {
      this.expanseClicked = false;
      this.categoryService.filteredCategories = null;
    } else {
      this.expanseClicked = true;
      const filtered = this.categoryService.categories.filter(
        (el) => el.type === 'expanse'
      );
      this.categoryService.filteredCategories = filtered;
    }
  }

  public ngOnInit(): void {
    this.categoryService.getCategories().pipe(untilDestroyed(this)).subscribe();
  }
}
