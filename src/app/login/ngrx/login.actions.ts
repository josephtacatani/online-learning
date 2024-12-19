import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { LoginErrorResponseInterface, LoginRequestInterface, LoginResponseInterface } from "./login.interface";

export const LogRegActions = createActionGroup({
    source: 'LogReg',
    events: {
        'Login': props<{ loginPayload: LoginRequestInterface}>(),
        'Login Success': props <{loginResponse: LoginResponseInterface}>(),
        'Login Failure': props <{loginErrorResponse: LoginErrorResponseInterface}>(),
        'Logout': emptyProps(),
    }
})