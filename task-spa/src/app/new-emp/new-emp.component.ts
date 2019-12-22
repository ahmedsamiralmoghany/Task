import { Component, OnInit } from '@angular/core';
import { Employee } from '../_models/Employee';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmpService } from '../_services/emp.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-new-emp',
  templateUrl: './new-emp.component.html',
  styleUrls: ['./new-emp.component.css']
})
export class NewEmpComponent implements OnInit {
  employee: Employee;
  editForm: FormGroup;
  constructor(private employeeService: EmpService, private alert: AlertifyService) { }

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
  }
  AddEmplye() {
    this.employeeService.addEmployee(this.editForm.value).subscribe((data: Employee) => {
      this.editForm.reset();
      this.alert.success('تم الاضافة');

    }, error => {
      console.log(error);
      this.alert.success('حدث حطاء لم يتم الاضافة');

    });

  }
}
