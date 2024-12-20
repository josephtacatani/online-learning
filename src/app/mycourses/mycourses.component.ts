import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { DeleteMyCourseRequestInterface, MyCourseInterface } from './ngrx/mycourses.interface';
import { Store } from '@ngrx/store';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { selectIsLoading, selectMyCoursebyIdData, selectMyCoursebyIdMessage } from './ngrx/mycourses.reducer';
import { MyCoursesActions } from './ngrx/mycourses.actions';
import { MatProgressSpinner, MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { selectEnrollmentErrors, selectEnrollmentMessage } from './ngrx/mycourses.enrollmentreducer copy';

@Component({
  selector: 'app-mycourses',
  standalone: true,
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './mycourses.component.html',
  styleUrls: ['./mycourses.component.scss']
})
export class MycoursesComponent {

  mycourses$: Observable<MyCourseInterface[] | null>;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  myCourseMessage$: Observable<string | null>;
  deleteEnrollmentMessage$: Observable<string | null>;
  deleteEnrollmentErrors$: Observable<string | null>;
  

  constructor(
    private store: Store, 
    private snackBar: MatSnackBar, 
    private router: Router) {
    // Select data from the store
    this.mycourses$ = this.store.select(selectMyCoursebyIdData);
    this.isLoading$ = this.store.select(selectIsLoading);
    this.error$ = this.store.select(selectMyCoursebyIdMessage);
    this.myCourseMessage$ = this.store.select(selectMyCoursebyIdMessage);
    this.deleteEnrollmentMessage$ = this.store.select(selectEnrollmentMessage);
    this.deleteEnrollmentErrors$ = this.store.select(selectEnrollmentErrors);


    


  }

  ngOnInit(): void {
       // Dispatch action to fetch courses
       this.store.dispatch(MyCoursesActions.myCourse());
    
       // Display snackbars for error and success messages
       this.error$.subscribe((error) => {
         if (error) this.showSnackbar(error);
       });
   
       this.myCourseMessage$.subscribe((message) => {
         if (message) this.showSnackbar(message);
       });

       this.deleteEnrollmentMessage$.subscribe((message) => {
        if (message) this.showSnackbar(message);
      });

      this.deleteEnrollmentErrors$.subscribe((message) => {
        if (message) this.showSnackbar(message);
      });


    this.store.dispatch(MyCoursesActions.myCourse());
  }

  private showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  onCourseClick(courseId: number){

  }

  onDeleteCourse(enrollmentId: number){

    const deletemyCoursePayload: DeleteMyCourseRequestInterface = {
      enrollmentId: enrollmentId
    }

    this.store.dispatch(MyCoursesActions.deleteCourse({deletemyCoursePayload}));
  }

}
