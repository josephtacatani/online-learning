import { createFeature, createReducer, on } from "@ngrx/store";
import { LoginRequestInterface, userDataInterface } from "./login.interface";
import { LogRegActions } from "./login.actions";

export interface LoginState {
    isLoading: boolean;
    isSubmitting: boolean;
    loginMessage: string | null;
    loginErrors: string | null;
    loginData: userDataInterface | null;
    isLoggedIn: boolean;
}

const initialState: LoginState = {
    isLoading: false,
    isSubmitting: false,
    loginMessage: null,
    loginErrors: null,
    loginData: null,
    isLoggedIn: false
}

export const logRegFeature = createFeature({
    name: 'logreg',
    reducer: createReducer(
        initialState,

        on(LogRegActions.login, state => ({
            ...state,
            isSubmitting: true,
            loginMessage: null,
            loginErrors: null,
        })),

        on(LogRegActions.loginSuccess, (state, {loginResponse})=>({
            ...state,
            loginMessage: loginResponse.message,
            loginData: {
                userName: loginResponse.data.userName,
                fullName: loginResponse.data.fullName,
                role: loginResponse.data.role
            },
            isLoggedIn: true
        })),

        on(LogRegActions.loginFailure, (state, {loginErrorResponse}) => ({
            ...state,
            loginErrors: loginErrorResponse.message,
            isLoggedIn: false
        }))
    )
});

export const {
    name: logregFeatureKey,
    reducer: logregReducer,
    selectIsSubmitting,
    selectIsLoading,
    selectLoginData,
    selectLoginErrors,
    selectLoginMessage,
    selectIsLoggedIn

} = logRegFeature

