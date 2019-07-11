import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chat-ui';
  currentUser: any;
  year: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.year = new Date().getFullYear().toString();
  }

  get user(): any {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
