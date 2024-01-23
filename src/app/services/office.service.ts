import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Office } from '../interface/office';

@Injectable({
  providedIn: 'root',
})
export class OfficeService {
  private apiUrl = 'http://localhost:5000/offices';

  constructor(private http: HttpClient) {}

  getOffices(): Observable<Office[]> {
    return this.http.get<Office[]>(this.apiUrl);
  }
}
