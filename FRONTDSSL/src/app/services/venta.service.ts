import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venta } from '../models/VentaModel';

@Injectable({
  providedIn: 'root',
})
export class VentaService {
  private apiUrl: string = 'http://localhost:3000/api/venta';
  constructor(private http: HttpClient) {}

  getVentas(): Observable<Venta[]> {
    return this.http.get<Venta[]>(this.apiUrl);
  }

  createVenta(model: Venta): Observable<Venta> {
    return this.http.post<Venta>(this.apiUrl, model);
  }
}
