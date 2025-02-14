import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetalleVenta } from '../models/DetalleVentaModel';

@Injectable({
  providedIn: 'root'
})
export class DetalleventaService {
  private apiUrl: string = 'http://localhost:3000/api/detalleventa';
    constructor(private http: HttpClient) { }
  
    getDetalleVentas(): Observable<DetalleVenta[]> {
        return this.http.get<DetalleVenta[]>(this.apiUrl);
      }

    createDetalleVenta(model: DetalleVenta): Observable<DetalleVenta> {
          return this.http.post<DetalleVenta>(this.apiUrl, model);
    }

    getDetallesVentaByVenta(id: number): Observable<any> {
      return this.http.put(`${this.apiUrl}/venta/${id}`, {});
    }
}
