import { Component, OnInit, OnDestroy, ChangeDetectorRef, DoCheck, ChangeDetectionStrategy} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from "@angular/common/http";
import { Router} from '@angular/router';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { EmployeeData } from '../../interface/employeeData';
import { Message } from 'primeng/components/common/api';
import { Subscription } from 'rxjs/Subscription';
import { ConfirmationService } from 'primeng/primeng';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy{

  employeesData: EmployeeData[];
  emp: EmployeeData[];
  msgs: Message[] = [];
  loading: boolean;
  error: any[];
  //updateField: boolean = false;
  selectedEmployee: EmployeeData;
  subscription: Subscription;

  constructor(private router: Router, private _http: HttpClient, private confirmationService: ConfirmationService, private ref: ChangeDetectorRef) {
 
  }

  ngOnInit(): void {
     document.getElementById("bg").className = "homeBg";
   // this.showSuccess();
    this.loadEmployeesDetail();
  }

  // showSuccess() {
  //   this.subscription = this.saveEmployeeDataService._newSuccessSubject.subscribe(event => {
  //     this.msgs = [];
  //     this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Employee Added Successfully' });
  //   });

  // }

  onRowSelect(event) {
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'Employee Selected', detail: event.data.name + ' - ' + event.data.id });
  }

  onRowUnselect(event) {
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'Employee Unselected', detail: event.data.name + ' - ' + event.data.id });
  }

  deleteEmployeeData(data): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this record?',
      header: ' Delete Confirmation',
      icon: 'fa fa-question-circle',
      accept: () => {
        this._http.delete("http://localhost:8084/RestApi/webapi/api/Timesheet/DeleteEmployee/" + data.id, { observe: 'response', responseType: 'text' })
          .subscribe(Response => {
            if (Response.status === 200) {
              this.loadEmployeesDetail();
              this.msgs = [{ severity: 'success', summary: 'Confirmed', detail: 'You have successfully deleted the record' }];
            }
          });
      },
      reject: () => {
        this.msgs = [{ severity: 'error', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }

  updateEmployeeData(data) {

    // this.updateField = true;
    this.confirmationService.confirm({
      message: 'Are you sure you want to update this record?',
      header: ' Update Confirmation',
      icon: 'fa fa-question-circle',
      accept: () => {
        this._http.put('http://localhost:8084/RestApi/webapi/api/Timesheet/UpdateEmployee/' + data.id, data, { observe: 'response', responseType: 'text' })
          .subscribe(Response => {
            if (Response.status === 200) {
              this.msgs = [{ severity: 'success', summary: 'Confirmed', detail: 'You have successfully updated the record' }];
            }
          });
      },
      reject: () => {
        this.msgs = [{ severity: 'error', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }
  loadEmployeesDetail(): void {
    this.loading = true;
    this._http.get<any>('http://localhost:8084/RestApi/webapi/api/Timesheet/GetEmployeesDetail')
      .subscribe((response) => {
        this.employeesData = response;
        this.loading = false;

      });
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    //this.subscription.unsubscribe();
  }

}

