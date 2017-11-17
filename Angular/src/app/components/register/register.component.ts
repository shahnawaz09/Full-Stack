import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from '@angular/router';
import { RegistrationDataService } from '../../services/registration.service';
 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: any;
  password: any;
  firstname: any;
  lastname: any;
  email: any;
  usernameFormControl: any;
  passwordFormControl: any;
  firstnameFormControl: any;
  lastnameFormControl: any;
  emailFormControl: any;
  loading:boolean = false;

  constructor(private router: Router, private _http: HttpClient, private _registrationDataService: RegistrationDataService) { }

  ngOnInit() {
    document.getElementById("bg").className = "landingBg";
    this._registrationDataService.emitSuccessfulRegistration(null);
  }


  register(): void {
    this.loading = true;
    let dataObj = {
      firstname: this.firstname,
      lastname: this.lastname,
      username: this.username,
      password: this.password,
      email: this.email
    }
    this._http.post("http://localhost:8084/RestApi/webapi/api/Timesheet/Register", dataObj, { observe: 'response', responseType: 'text' })
      .subscribe(Response => {
        this.loading = false;
        if (Response.status === 201) {
          this._registrationDataService.emitSuccessfulRegistration({severity:'success', summary:'Success Message', detail:'Registration Successful! Please login'});
          this.router.navigate(['/login']);

        }
      });
  }

  cancel(): void {
    this.router.navigate(['/login']);
  }
}
