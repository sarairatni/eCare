import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdonnanceService {
  private baseUrl = 'http://127.0.0.1:8000/medecin/ordonnance/add/';

  constructor(private http: HttpClient) {}

  createOrdonnance(consultationId: string, ordonnanceData: any): Observable<any> {
    const url = `${this.baseUrl}${consultationId}/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, ordonnanceData, { headers });
  }
}
