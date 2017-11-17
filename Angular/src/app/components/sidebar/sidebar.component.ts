import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/authentication.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  isLoggedIn: boolean;
  constructor(private authService: AuthService) { }

  ngOnInit() {
   
    this.subscription = this.authService.isLoggedIn.subscribe(data => {
      this.isLoggedIn = data;
    });

  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}
