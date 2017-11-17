import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/authentication.service';
import { RegistrationDataService } from '../../services/registration.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  isLoggedIn: any;
  currentUser: any;
  username: any;

  constructor(private authService: AuthService, private router: Router, private _registrationDataService: RegistrationDataService) { }

  ngOnInit() {

    this.subscription = this.authService._loggedInUser.subscribe(data => {
      if (data !== null) {
        this.username = data;
      }
      else if (localStorage.getItem('currentUser') && data === null) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = this.currentUser.username;
      }
    });

    this.subscription = this.authService.isLoggedIn.subscribe(data => {
      this.isLoggedIn = data;
    });


  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    this._registrationDataService.emitSuccessfulRegistration(null);
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}
