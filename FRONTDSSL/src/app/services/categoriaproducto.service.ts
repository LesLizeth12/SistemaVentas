import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../models/CategoriaModel';

@Injectable({
  providedIn: 'root'
})
export class CategoriaproductoService {

  private apiUrl: string = 'http://localhost:3000/api/categoria';

    constructor( private http: HttpClient) { }
  
    getCategorias(): Observable<Categoria[]> {
      return this.http.get<Categoria[]>(this.apiUrl);
    }
  
    getCategoria(id: number): Observable<Categoria> {
      return this.http.get<Categoria>(`${this.apiUrl}/${id}`);
    }
  
    createCategoria(model: Categoria): Observable<Categoria> {
      return this.http.post<Categoria>(this.apiUrl, model);
    }
  
    updateCategoria(id: number, model: Categoria): Observable<Categoria> {
      return this.http.put<Categoria>(`${this.apiUrl}/${id}`, model);
    }
  
    deleteCategoria(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${id}`);
    }

    restoreCategoria(id: number): Observable<any> {
      return this.http.put(`${this.apiUrl}/restore/${id}`, {});
    }
}
