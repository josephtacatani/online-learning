import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { CourseInterface } from '../homepage/ngrx/homepage.interface';
import { selectCourses, selectError, selectIsLoading } from '../homepage/ngrx/homepage.reducer';
import { GetCourseActions } from '../homepage/ngrx/homepage.actions';
import { Router, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EnrollCourseService } from './ngrx/userpage.service';
import { EnrollCourseActions } from './ngrx/userpage.actions';
import { EnrollCourseRequestInterface } from './ngrx/userpage.interface';
import { selectEnrollMessage } from './ngrx/userpage.reducer';
import { VideosActions } from '../videos/ngrx/videos.actions';


@Component({
  selector: 'app-userpage',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    RouterModule

  ],
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.scss']
})
export class UserpageComponent {

  courses$: Observable<CourseInterface[] | null>;
  courseId$: Observable<number[] | null>
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  enrollCourseMessage$: Observable<string | null>;
  

  constructor(
    private store: Store, 
    private snackBar: MatSnackBar, 
    private router: Router) {
    // Select data from the store
    this.courses$ = this.store.select(selectCourses);
    this.isLoading$ = this.store.select(selectIsLoading);
    this.error$ = this.store.select(selectError);
    this.enrollCourseMessage$ = this.store.select(selectEnrollMessage);

    // Handle errors and display messages using a snackbar
    this.error$.subscribe((error) => {
      if (error) {
        this.showSnackbar(error);
      }
    });

    this.enrollCourseMessage$.subscribe((message) => {
      if (message) {
        this.showSnackbar(message);
      }
    });




    this.courseId$ = this.courses$.pipe(
      map(courses => courses ? courses.map(course => course.courseId) : null) // Extract courseId
    );

    


  }

  ngOnInit(): void {
    // Dispatch action to fetch courses
    this.store.dispatch(GetCourseActions.getCourse());
  }

  private showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }


  onEnrollClick(courseId: number){

    const loginResponse = localStorage.getItem('loginResponse');
    

    if (loginResponse){
      const parsedResponse = JSON.parse(loginResponse);
      const userId = parsedResponse.data.userId;
      const dateNow = this.getCurrentTime();

      const enrollCoursePayload: EnrollCourseRequestInterface = {
        courseId: courseId,
        userId: userId,
        enrolledDate: dateNow,
        isCompleted: true,
      } 
      this.store.dispatch(EnrollCourseActions.enrollCourse({enrollCoursePayload}));
    }
    else{
      console.log('No Response');
    }

  }

  private getCurrentTime(): string {
    return new Date().toISOString(); // Get current time in ISO format
  }


  
}
