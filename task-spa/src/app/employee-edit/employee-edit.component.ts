import { Component, OnInit } from '@angular/core';
import { EmpService } from 'src/app/_services/emp.service';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/_models/Employee';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  employee: Employee;
  editForm: FormGroup;
  constructor(private empService: EmpService, private rout: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {
    this.editForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl(),
      mobile: new FormControl(),
      whatsapp: new FormControl(),
      code: new FormControl(),
      mobile2: new FormControl(),
      job: new FormControl(),
      description: new FormControl(),
      enterdBy: new FormControl(),
    });
    this.loadEmployee();
  }
  loadEmployee() {
    this.empService.getUser(this.rout.snapshot.params['id']).subscribe((emp: Employee) => {
      this.employee = emp;
      (<FormGroup>this.editForm).patchValue(emp);

    },
      error => {
        console.log(error);
      }
    );
  }


  editEmployee() {
    this.employee = this.editForm.value;
    this.employee.id = this.rout.snapshot.params['id'];
    this.empService.editEmployee(this.employee).subscribe((emp: Employee) => {
      this.loadEmployee();
      this.alertify.success('تم الحفظ');
    },
      error => {
        console.log(error);
        this.alertify.error('لم يتم الحفظ');
      });
  }

}
