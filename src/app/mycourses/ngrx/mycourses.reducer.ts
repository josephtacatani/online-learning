import { createFeature, createReducer, on } from "@ngrx/store";
import { MyCourseInterface } from "./mycourses.interface";
import { MyCoursesActions } from "./mycourses.actions";

export interface MyCoursesbyIdState {
    isLoading: boolean;
    myCoursebyIdMessage: string | null;
    myCoursebyIdError: string | null;
    myCoursebyIdData: MyCourseInterface[] | null;
}

const initialState: MyCoursesbyIdState = {
    isLoading: false,
    myCoursebyIdMessage: null,
    myCoursebyIdError: null,
    myCoursebyIdData: null,
}


export const myCourseFeature = createFeature({
    name: 'mycourse',
    reducer: createReducer(
        initialState,

        on(MyCoursesActions.myCourse, state => ({
            ...state,
            isLoading: true,
            myCoursebyIdMessage: null,
            myCoursebyIdError: null
            
        })),

        on(MyCoursesActions.myCourseSuccess, (state, {myCourseResponse})=>({
            ...state,
            myCoursebyIdMessage: myCourseResponse.message,
            myCoursebyIdData: myCourseResponse.data,
            isLoading: false,
        })),

        on(MyCoursesActions.myCourseFailure, (state, {myCourseErrors}) => ({
            ...state,
            myCoursebyIdError: myCourseErrors.message
        })),


    )
});

export const {
    name: myCourseFeatureKey,
    reducer: myCourseReducer,
    selectIsLoading,
    selectMyCoursebyIdData,
    selectMyCoursebyIdError,
    selectMyCoursebyIdMessage

} = myCourseFeature

