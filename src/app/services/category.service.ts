import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor( private http: HttpClient) { }

  getCategories(){

    const url = `http://localhost:3600/api/categories`;
    return this.http.get<any>(url);
  }

}
