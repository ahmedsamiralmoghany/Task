import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { NewEmpComponent } from './new-emp/new-emp.component';
import { EmpListResolver } from './_resolvers/employe-list-resolver';

export const appRoutes: Routes = [
    { path: 'employes', component: EmployeeListComponent, resolve: { emps: EmpListResolver } },
    { path: 'edit/:id', component: EmployeeEditComponent },
    { path: 'newEmp', component: NewEmpComponent },
    { path: '**', redirectTo: 'employes', pathMatch: 'full' },
];
