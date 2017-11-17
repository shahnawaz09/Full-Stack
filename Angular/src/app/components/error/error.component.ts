import { Component, OnInit, OnDestroy } from '@angular/core';
import { ErrorDataService } from './../../services/ErrorData.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit,OnDestroy {
  errorDetails:any;
  subscription:Subscription;
  constructor(private service:ErrorDataService) { }

  ngOnInit() {
    this.subscription = this.service._newErrorSubject.subscribe(data =>{
      this.errorDetails = data;
      console.log(data);
      console.log("errorPage",this.errorDetails);
    });
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}
