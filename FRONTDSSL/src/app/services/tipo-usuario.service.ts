import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoUsuario } from '../models/TipoUsuarioModel';

@Injectable({
  providedIn: 'root'
})
export class TipoUsuarioService {
  private apiUrl: string = 'http://localhost:3000/api/tipousuario';

  constructor(private http: HttpClient) { }

  getTiposUsers(): Observable<TipoUsuario[]> {
      return this.http.get<TipoUsuario[]>(this.apiUrl);
  }

  getTiposUser(id: number): Observable<TipoUsuario> {
    return this.http.get<TipoUsuario>(`${this.apiUrl}/${id}`);
  }

  createTiposUser(model: TipoUsuario): Observable<TipoUsuario> {
    model.estado="1";
    return this.http.post<TipoUsuario>(this.apiUrl, model);
  }

  updateTiposUser(id: number, model: TipoUsuario): Observable<TipoUsuario> {
    return this.http.put<TipoUsuario>(`${this.apiUrl}/${id}`, model);
  }

  deleteTiposUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  restoreTipoUser(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/restore/${id}`, {});
  }

}
