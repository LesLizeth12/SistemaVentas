import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/UsuarioModel';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl: string = 'http://localhost:3000/api/usuario';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Usuario[]> {
      return this.http.get<Usuario[]>(this.apiUrl);
  }

  deleteUser(id: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  restoreUser(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/restore/${id}`, {});
  }

  updateUser(id: number, persona: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, persona);
  }

  createUser(persona: Usuario): Observable<Usuario> {
    persona.estado = "1";
    return this.http.post<Usuario>(this.apiUrl, persona);
  }

  login(username: string): Observable<Usuario>{
    return this.http.get<Usuario>(this.apiUrl+"/getusername/"+username);
  }

}
