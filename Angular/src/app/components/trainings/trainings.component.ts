import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import { Message } from 'primeng/components/common/api';
import {ConfirmationService} from 'primeng/primeng';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit {
  msgs: Message[] = [];
  constructor(private confirmationService: ConfirmationService) { }

  ngOnInit() {
  }
  confirm() {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
            //Actual logic to perform a confirmation
        }
    });
}
//   cancel():void {
//     this.confirmationService.confirm({
//         message: 'Are you sure that you want to leave?',
//         header: 'Confirmation',
//         icon: 'fa fa-question-circle',
//         accept: () => {
//             this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
//           //  this.router.navigate(['/home']);
            
//         },
//         reject: () => {
//             this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
//         }
//     });
// }


}
