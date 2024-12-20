import { createFeature, createReducer, on } from "@ngrx/store";
import { MyCourseInterface } from "./mycourses.interface";
import { MyCoursesActions } from "./mycourses.actions";

export interface RemoveMyCoursesByIdEnrollmentState {
    isLoading: boolean;
    enrollmentMessage: string | null,
    enrollmentErrors: string | null
}

const initialState: RemoveMyCoursesByIdEnrollmentState = {
    isLoading: false,
    enrollmentMessage: null,
    enrollmentErrors: null

}


export const deleteMyCourseFeature = createFeature({
    name: 'removemycourse',
    reducer: createReducer(
        initialState,

        on(MyCoursesActions.deleteCourse, state => ({
            ...state,
            isLoading: true,
            enrollmentMessage: null,
            enrollmentErrors: null
            
        })),

        on(MyCoursesActions.deleteCourseSuccess, (state, {deletemyCourseResponse})=>({
            ...state,
            isLoading: false,
            enrollmentMessage: deletemyCourseResponse.message,
            enrollmentErrors: null
        })),

        on(MyCoursesActions.deleteCourseFailure, (state, {deletemyCourseResponseErrors}) => ({
            ...state,
            enrollmentErrors:deletemyCourseResponseErrors.message
        })),


    )
});

export const {
    name: deleteMyCourseFeatureKey,
    reducer: deleteMyCourseReducer,
    selectIsLoading,
    selectEnrollmentErrors,
    selectEnrollmentMessage

} = deleteMyCourseFeature

