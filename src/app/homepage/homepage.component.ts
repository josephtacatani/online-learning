import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CourseInterface } from './ngrx/homepage.interface';

import { GetCourseActions } from './ngrx/homepage.actions';
import { selectCourses, selectError, selectIsLoading } from './ngrx/homepage.reducer';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    RouterModule
  ],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  courses$: Observable<CourseInterface[] | null>;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store, private snackBar: MatSnackBar, private router: Router) {
    // Select data from the store
    this.courses$ = this.store.select(selectCourses);
    this.isLoading$ = this.store.select(selectIsLoading);
    this.error$ = this.store.select(selectError);

    // Handle errors and display messages using a snackbar
    this.error$.subscribe((error) => {
      if (error) {
        this.showSnackbar(error);
      }
    });
  }

  ngOnInit(): void {
    // Dispatch action to fetch courses new comment herre
    this.store.dispatch(GetCourseActions.getCourse());
  }

  private showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  onCourseClick(courseId: number): void {
    // Navigate to course details page
    this.router.navigate(['/courses', courseId]);
  }
}
