import { Injectable } from "@angular/core";
import { MyCourseService } from "./mycourses.service";
import { Route, Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { MyCoursesActions } from "./mycourses.actions";
import { DeleteMyCourseResponseInterface, MyCourseErrorResponseInterface, MyCourseResponseInterface } from "./mycourses.interface";


@Injectable()
export class myCourseEffects {
    constructor(
        private actions$: Actions,
        private myCourseService: MyCourseService,
        private router: Router
    ){}

    mycourses$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MyCoursesActions.myCourse),
            mergeMap(action =>
                this.myCourseService.getCoursebyId().pipe(
                    map((myCourseResponse: MyCourseResponseInterface) => {
                        return MyCoursesActions.myCourseSuccess({ myCourseResponse});
                    }),
                    catchError((myCourseErrors: MyCourseErrorResponseInterface) => {
                        return of(MyCoursesActions.myCourseFailure({myCourseErrors}));
                    })
                )
            )
        )
    );

    deleteenrollment$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MyCoursesActions.deleteCourse),
            mergeMap(action =>
                this.myCourseService.deleteCoursebyEnrollmentId(action.deletemyCoursePayload).pipe(
                    map((deletemyCourseResponse: DeleteMyCourseResponseInterface) => {
                        return MyCoursesActions.deleteCourseSuccess({ deletemyCourseResponse });
                    }),
                    catchError((deletemyCourseResponseErrors: MyCourseErrorResponseInterface) => {
                        return of(MyCoursesActions.deleteCourseFailure({ deletemyCourseResponseErrors }));
                    })
                )
            )
        )
    )

    reloadCoursesAfterDelete$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MyCoursesActions.deleteCourseSuccess),
            map(() => MyCoursesActions.myCourse()) // Dispatch the action to reload courses
        )
    );





}