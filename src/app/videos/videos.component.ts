import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectVideosData, selectVideosError, selectVideosMessage } from './ngrx/videos.reducer';
import { Observable } from 'rxjs';
import { AddStartProgressRequestInterface, VideosData } from './ngrx/videos.interface';
import { MatSnackBar,MatSnackBarModule } from '@angular/material/snack-bar';
import { VideosActions } from './ngrx/videos.actions';
import { SafeUrlPipe } from './safeUrlPipe';


@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [
    CommonModule,
    MatSnackBarModule,
    SafeUrlPipe
  ],
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {


  getVideosbyIdData$: Observable<VideosData[] | null>;
  getVideosbyIdErrors$: Observable<string | null>;
  getVideosbyIdMessage$: Observable<string | null>;
  selectedVideo: VideosData | null = null;
  enrollmentId: number | null = null;




  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private snackBar: MatSnackBar, 
  ){
    this.getVideosbyIdData$ = this.store.select(selectVideosData);
    this.getVideosbyIdMessage$ = this.store.select(selectVideosMessage);
    this.getVideosbyIdErrors$ = this.store.select(selectVideosError);


  }

  ngOnInit(): void {

      this.route.paramMap.subscribe((params) => {
      const courseId = params.get('courseId'); // Get courseId from URL
      const enrollmentId = params.get('enrollmentId'); // Get enrollment from URL
      if (courseId && enrollmentId) {
        this.enrollmentId = +enrollmentId
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

  selectVideo (video: VideosData): void {
    this.selectedVideo = video;
    const videoId = video.videoId;
    if (this.enrollmentId){
      this.addStartProgress(videoId, this.enrollmentId);
    }
    
  }

  addStartProgress(videoId: number, enrollmentId: number){
    const dateNow = this.getCurrentTime();

    const addStartProgressPayload: AddStartProgressRequestInterface = {
      enrollmentId: enrollmentId,
      videoId: videoId,
      isStarted: true,
      isCompleted: false,
      startedDate: dateNow,
      completedDate: dateNow
    } 
    this.store.dispatch(VideosActions.addStartProgress({addStartProgressPayload}));

  }
  private getCurrentTime(): string {
    return new Date().toISOString(); // Get current time in ISO format
  }


}
