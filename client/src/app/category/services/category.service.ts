import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CategoryModel } from '../category.model';

const URL = 'http://localhost:5000/api/category';

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
    return this.http.get(URL).pipe(
      tap({
        next: (res: any) => (this.categories = res),
      })
    );
  }

  public addCategory(type: string, title: string): Observable<any> {
    return this.http.post(URL, { title, type });
  }

  public deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete(`${URL}/${categoryId}`);
  }

  public setActiveCategory(category: CategoryModel | null): void {
    this.activeCategory = category;
  }

  public updateCategory(categoryId: string, title: string): Observable<any> {
    return this.http.patch(`${URL}/${categoryId}`, { title });
  }

  public setModalText(val: string): void {
    this.modalText = val;
  }
}
