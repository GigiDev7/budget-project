import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CategoryModel } from '../../shared/models/category.model';
import { URL } from '../../shared/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  public categories!: CategoryModel[];
  public activeCategory!: CategoryModel | null;
  public modalText: string = '';
  public filteredCategories: CategoryModel[] | null = null;

  constructor(private http: HttpClient) {}

  public getCategories(): Observable<any> {
    return this.http.get(`${URL}/category`).pipe(
      tap({
        next: (res: any) => (this.categories = res),
      })
    );
  }

  public addCategory(type: string, title: string): Observable<any> {
    return this.http.post(`${URL}/category`, { title, type });
  }

  public deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete(`${URL}/category/${categoryId}`);
  }

  public setActiveCategory(category: CategoryModel | null): void {
    this.activeCategory = category;
  }

  public updateCategory(categoryId: string, title: string): Observable<any> {
    return this.http.patch(`${URL}/category/${categoryId}`, { title });
  }

  public setModalText(val: string): void {
    this.modalText = val;
  }
}
