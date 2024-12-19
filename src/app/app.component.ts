import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { Store } from '@ngrx/store';
import { LogRegActions } from './login/ngrx/login.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'online-learning';
  //this persist loggedin using localstorage
  constructor(private store: Store) {
    const storedUser = localStorage.getItem('loginResponse');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      this.store.dispatch(
        LogRegActions.loginSuccess({
          loginResponse: {
            message: 'Restored from localStorage',
            result: true,
            data: userData,
          },
        })
      );
    }
  }
}
