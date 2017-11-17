import { Component,OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router,NavigationStart } from '@angular/router';
import { AuthService } from '../../services/authentication.service';
import { RegistrationDataService } from '../../services/registration.service';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  username: any;
  password: any;
  usernameFormControl: any;
  passwordFormControl: any;
  msgs: Message[] = [];
  showMessage: any = true;
  subscription: Subscription;
  loading:boolean = false;

  constructor(private authService: AuthService, private router: Router, private ref: ChangeDetectorRef, private _registrationDataService: RegistrationDataService, private _messageService: MessageService) { 
    
  }

  ngOnInit() {
    document.getElementById("bg").className = "landingBg";
    this.subscription = this._registrationDataService._showRegistrationSuccessMessage.subscribe(data => {
      if (data === null) {
        this.showMessage = false;
      }
      this.msgs = [];
      this.msgs.push(data);
    });
    
  }

  login() {
    this.loading = true;
    this.authService.login(this.username, this.password).subscribe(result => {
      this.loading = false;
      if (result === true) {
        this.router.navigate(['/home']);
        this.ref.detectChanges();
      }
      else {
        this.showMessage = true;
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Username or Password is incorrect' });
      }
    });

  }

  signUp(): void {
    this.router.navigate(['/register']);
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }


}
