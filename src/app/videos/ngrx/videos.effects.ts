import { Injectable } from "@angular/core";
import { VideosService } from "./videos.service";
import { Route, Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { VideosActions } from "./videos.actions";
import { VideosErrorResponseInterface, VideosResponseInterface } from "./videos.interface";


@Injectable()
export class VideosEffects {
    constructor(
        private actions$: Actions,
        private videosService: VideosService,
        private router: Router
    ){}

    mycourses$ = createEffect(() =>
        this.actions$.pipe(
          ofType(VideosActions.getVideos),
          tap((action) => console.log('Effect triggered with action:', action)), // Log the action
          mergeMap(action =>
            this.videosService.getVideosCoursebyId(action.courseId).pipe(
              tap(() => console.log('API call initiated for courseId:', action.courseId)), // Log before API call
              map((getVideosResponse) =>
                VideosActions.getVideosSuccess({ getVideosResponse })
              ),
              catchError((getVideosErrors) =>
                of(VideosActions.getVideosFailure({ getVideosErrors }))
              )
            )
          )
        )
      );
      







}