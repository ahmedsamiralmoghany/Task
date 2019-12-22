import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { PaginationModule, BsDropdownModule } from 'ngx-bootstrap';
import { AppComponent } from './app.component';
import { EmpService } from './_services/emp.service';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { appRoutes } from './routes';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { NewEmpComponent } from './new-emp/new-emp.component';
import { AlertifyService } from './_services/alertify.service';
import { EmpListResolver } from './_resolvers/employe-list-resolver';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeEditComponent,
    NewEmpComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    FormsModule,
    BsDropdownModule.forRoot(),
  ],
  providers: [
    EmpService,
    AlertifyService,
    EmpListResolver
  ],
  bootstrap: [
    AppComponent
  ],
  exports: [
    RouterModule
  ]
})
export class AppModule { }
