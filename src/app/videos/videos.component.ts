import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectVideosData, selectVideosError, selectVideosMessage } from './ngrx/videos.reducer';
import { Observable } from 'rxjs';
import { VideosData } from './ngrx/videos.interface';
import { MatSnackBar,MatSnackBarModule } from '@angular/material/snack-bar';
import { VideosActions } from './ngrx/videos.actions';


@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [
    CommonModule,
    MatSnackBarModule,
  ],
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {


  getVideosbyIdData$: Observable<VideosData[] | null>;
  getVideosbyIdErrors$: Observable<string | null>;
  getVideosbyIdMessage$: Observable<string | null>;



  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private snackBar: MatSnackBar, 
  ){
    this.getVideosbyIdData$ = this.store.select(selectVideosData);
    this.getVideosbyIdMessage$ = this.store.select(selectVideosMessage);
    this.getVideosbyIdErrors$ = this.store.select(selectVideosError);

    this.getVideosbyIdErrors$.subscribe((error) => {
      if (error) {
        this.showSnackbar(error);
      }
    });
  
    this.getVideosbyIdMessage$.subscribe((message) => {
      if (message) {
        this.showSnackbar(message);
      }
    });

  }

  ngOnInit(): void {

        this.route.paramMap.subscribe((params) => {
      const courseId = params.get('courseId'); // Get courseId from URL
      if (courseId) {
        this.store.dispatch(VideosActions.getVideos({ courseId: +courseId })); // Convert to number
      }
    });
  }

  private showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }



}
