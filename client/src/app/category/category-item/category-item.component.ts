import { Component, Input } from '@angular/core';
import { ReloadService } from 'src/app/reload/reload.service';
import { ModalService } from 'src/app/shared/modal-card/services/modal-card.service';
import { NotificationService } from 'src/app/shared/notification-card/services/notification.service';
import { TransactionService } from 'src/app/transaction-card/services/transaction.service';
import { CategoryModel } from '../../shared/models/category.model';
import { CategoryService } from '../services/category.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss'],
})
export class CategoryItemComponent {
  @Input() category!: CategoryModel;

  public categoryTitle!: string;

  public onDeleteClick(): void {
    this.categoryService
      .deleteCategory(this.category._id)
      .pipe(untilDestroyed(this))
      .subscribe();
    this.reloadService.reloadComponent();
    this.notificationService.setNotificationText('Category Deleted');
    this.notificationService.showNotification();
  }

  public onEditClick(event: Event): void {
    event.stopPropagation();
    this.categoryService.setActiveCategory(this.category);
    this.categoryTitle = this.category.title;
  }

  public onConfirmClick(): void {
    if (!this.checkValidation()) return;
    if (this.checkTitle()) {
      this.categoryService.setModalText(
        'Category already exists. Please update the title.'
      );
      this.modalService.showModal();
      return;
    }
    this.categoryService
      .updateCategory(this.category._id, this.categoryTitle)
      .pipe(untilDestroyed(this))
      .subscribe();
    this.categoryService.setActiveCategory(null);
    this.reloadService.reloadComponent();
  }

  public checkValidation(): boolean {
    return /^([a-zA-Z]+\s)*[a-zA-Z]+$/.test(this.categoryTitle);
  }

  private checkTitle(): boolean {
    const { activeCategory } = this.categoryService;
    const filtered = this.categoryService.categories.filter(
      (el) => el.type === activeCategory?.type
    );
    const item = filtered.find((el) => el.title === this.categoryTitle);
    return !!item;
  }

  constructor(
    public categoryService: CategoryService,
    private reloadService: ReloadService,
    public modalService: ModalService,
    private transactionService: TransactionService,
    public notificationService: NotificationService
  ) {}
}
