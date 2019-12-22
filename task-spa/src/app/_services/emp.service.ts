import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../_models/Employee';
import { PaginationResault } from '../_models/pagination';
import { map } from 'rxjs/operators';
import { SearchEmployees } from '../_models/searchEmployees';

@Injectable({
  providedIn: 'root'
})
export class EmpService {
  basUrl = environment.apiUrl + 'employee';
  constructor(private http: HttpClient) { }

  getAllUser(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.basUrl);
  }
  getpgUser(page?, itemsPerPage?, name?, phone?): Observable<any> {
    const paginatedResult: PaginationResault<Employee[]> = new PaginationResault<Employee[]>();
    // tslint:disable-next-line: prefer-const
    let params = new HttpParams();
    params = params.append('name', name);
    params = params.append('phone', phone);

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<Employee[]>(this.basUrl, { observe: 'response', params });
  }
  getUser(id): Observable<Employee> {
    return this.http.get<Employee>(this.basUrl + '/' + id);
  }
  deleteEmployee(id): Observable<any> {
    return this.http.delete(this.basUrl + '/' + id);
  }
  editEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.basUrl, employee);
  }
  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.basUrl, employee);
  }
}
