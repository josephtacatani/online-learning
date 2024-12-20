import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { LogRegActions } from '../login/ngrx/login.actions';
import { selectIsLoggedIn } from '../login/ngrx/login.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isLoggedIn$: Observable<boolean>;
  currentRoute: string = '';


  constructor(
    private store: Store,
    private router: Router
  ) {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);

        // Listen to route changes to update the currentRoute
        this.router.events.subscribe(() => {
          this.currentRoute = this.router.url; // Get the current URL
        });
  }

  onLogout() {
    this.store.dispatch(LogRegActions.logout()); // Dispatch logout action
  }

  getCoursesLink(): { text: string, link: string } {
    if (this.currentRoute === '/mycourses') {
      return { text: 'Back to Courses', link: '/userpage' };
    }
    return { text: 'My Courses', link: '/mycourses' };
  }
}
