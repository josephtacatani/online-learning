import { Injectable } from "@angular/core";
import { LogRegService } from "./login.service";
import { Route, Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LogRegActions } from "./login.actions";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { LoginResponseInterface } from "./login.interface";

@Injectable()
export class LogRegEffects {
    constructor(
        private actions$: Actions,
        private logRegService: LogRegService,
        private router: Router
    ){}

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LogRegActions.login),
            mergeMap(action =>
                this.logRegService.login(action.loginPayload).pipe(
                    map((loginResponse: LoginResponseInterface) => {
                        localStorage.setItem('loginResponse',JSON.stringify(loginResponse));
                        return LogRegActions.loginSuccess({ 
                            loginResponse: {
                                message: loginResponse.message,
                                result: loginResponse.result,
                                data:{
                                    userName: loginResponse.data.userName,
                                    fullName: loginResponse.data.fullName,
                                    role: loginResponse.data.role
                                }
                            }
                        

                         });
                    }),
                    tap(() => {
                        this.router.navigate(['/userpage']);
                    }),
                    catchError((loginErrorResponse) => {
                        return of(LogRegActions.loginFailure({ loginErrorResponse }));
                    })
                )
            )
        )
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LogRegActions.logout),
            tap(() => {
                try {
                    localStorage.removeItem('loginResponse'); // Clear local storage
                    this.router.navigate(['/']).then(()=>{
                        window.location.reload();
                    });
                    // Refresh the page

                } catch (error) {
                    console.error('Failed to remove loginResponse from localStorage', error);
                }
            })
        ),
        { dispatch: false } // No new action dispatched
    );





}