import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { EmpService } from '../_services/emp.service';
import { Employee } from '../_models/Employee';
import { Pagination } from '../_models/pagination';
import * as XLSX from 'xlsx';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  @ViewChild('TABLE') TABLE: ElementRef;
  constructor(private empService: EmpService, private alertfy: AlertifyService, private route: ActivatedRoute) { }
  empls: Employee[];
  pagination: Pagination;
  name: string;
  phone: string;
  searshFlag = false;
  isConfic = false;
  ngOnInit() {
    this.name = '';
    this.phone = '';
    this.route.data.subscribe(data => {
      this.empls = data['emps'].result;
      this.pagination = data['emps'].pagination;
    });
    // this.loadUsers();

  }

  search() {
    console.log(this.name);
    this.loadUsers();
  }



  enableSearch() {
    this.searshFlag = !this.searshFlag;
  }
  enableConfig() {
    this.isConfic = !this.isConfic;
  }


  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'ScoreSheet.xlsx');
  }




  loadUsers(pg?) {
    this.empService.getpgUser(pg, 10, this.name, this.phone).subscribe((emps: any) => {
      this.empls = emps.body.result;
      this.pagination = emps.body.pagination;
    }, error => {
      console.log(error);
    });
  }

  reload() {
    this.phone = '';
    this.name = '';
    this.loadUsers();
  }



  pageChanged(event: any) {
    this.pagination.currentPage = event.page;
    this.loadUsers(this.pagination.currentPage);
  }






  deleteUser(id) {

    this.alertfy.confirm('تأكيد الحذف',
      () => {
        this.empService.deleteEmployee(id).subscribe(() => {
          this.loadUsers();
          this.alertfy.success('تم الحذف');
        });
      },
    );
  }






  printData() {
    const divToPrint = document.getElementById('tablerecords');
    const newWin = window.open('');
    newWin.document.write(divToPrint.innerHTML);
    newWin.print();
    newWin.close();
  }

}
