import { Injectable } from "@angular/core";

import { Route, Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { catchError, map, mergeMap, of } from "rxjs";
import { GetCourseService } from "./homepage.service";
import { GetCourseActions } from "./homepage.actions";

@Injectable()
export class GetCourseEffects {
    constructor(
        private actions$: Actions,
        private getCourseService: GetCourseService,
        private router: Router
    ){}

    getcourse$ = createEffect(() =>
        this.actions$.pipe(
          ofType(GetCourseActions.getCourse),
          mergeMap(() =>
            this.getCourseService.getCourses().pipe(
              map((getCourseResponse) => GetCourseActions.getCourseSuccess({ getCourseResponse })),
              catchError((getCourseErrorResponse) => of(GetCourseActions.getCourseFailure({ getCourseErrorResponse })))
            )
          )
        )
      );
}