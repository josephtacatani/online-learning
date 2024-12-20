import { Injectable } from "@angular/core";
import { EnrollCourseService } from "./userpage.service";
import { Route, Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { catchError, map, mergeMap, of, tap } from "rxjs";
import { EnrollCourseActions } from "./userpage.actions";
import { EnrollCourseErrorResponseInterface, EnrollCourseResponseInterface } from "./userpage.interface";


@Injectable()
export class enrollCourseEffects {
    constructor(
        private actions$: Actions,
        private enrollCourseService: EnrollCourseService,
        private router: Router
    ){}

    enroll$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EnrollCourseActions.enrollCourse),
            mergeMap(action =>
                this.enrollCourseService.addcourse(action.enrollCoursePayload).pipe(
                    map((enrollCourseResponse: EnrollCourseResponseInterface) => {
                        return EnrollCourseActions.enrollCourseSuccess({ enrollCourseResponse});
                    }),
                    catchError((enrollCourseErrors: EnrollCourseErrorResponseInterface) => {
                        return of(EnrollCourseActions.enrollCourseFailure({enrollCourseErrors}));
                    })
                )
            )
        )
    );





}