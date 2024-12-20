import { createFeature, createReducer, on } from "@ngrx/store";
import { EnrollCourseActions } from "./userpage.actions";
import { EnrollCourseInterface } from "./userpage.interface";

export interface UserState {
    isLoading: boolean;
    isSubmitting: boolean;
    enrollMessage: string | null;
    enrollErrors: string | null;
    enrollCourseData: EnrollCourseInterface[] | null;
}

const initialState: UserState = {
    isLoading: false,
    isSubmitting: false,
    enrollMessage: null,
    enrollErrors: null,
    enrollCourseData: null,
}

export const enrollCourseFeature = createFeature({
    name: 'enrollcourse',
    reducer: createReducer(
        initialState,

        on(EnrollCourseActions.enrollCourse, state => ({
            ...state,
            isSubmitting: true,
            loginMessage: null,
            loginErrors: null,
        })),

        on(EnrollCourseActions.enrollCourseSuccess, (state, {enrollCourseResponse})=>({
            ...state,
            enrollMessage: enrollCourseResponse.message,
            enrollCourseData: enrollCourseResponse.data,
            isSubmitting: false
        })),

        on(EnrollCourseActions.enrollCourseFailure, (state, {enrollCourseErrors}) => ({
            ...state,
            enrollErrors: enrollCourseErrors.message,
        }))
    )
});

export const {
    name: enrollCourseFeatureKey,
    reducer: enrollCourseReducer,
    selectEnrollCourseData,
    selectEnrollErrors,
    selectEnrollMessage,
    selectIsSubmitting

} = enrollCourseFeature

