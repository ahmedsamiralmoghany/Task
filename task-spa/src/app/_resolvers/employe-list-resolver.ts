import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Employee } from '../_models/Employee';
import { EmpService } from '../_services/emp.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PaginationResault } from '../_models/pagination';

@Injectable()
export class EmpListResolver implements Resolve<PaginationResault<Employee>> {
    constructor(private empServics: EmpService, private router: Router, private alertify: AlertifyService) { }
    resolve(router: ActivatedRouteSnapshot): Observable<PaginationResault<Employee>> {
        return this.empServics.getAllUser().pipe(
            catchError(error => {
                this.alertify.error('غير قادر الحصول على الاعضاء');
                this.router.navigate(['/employes']);
                return of(null);
            })
        );
    }
}
