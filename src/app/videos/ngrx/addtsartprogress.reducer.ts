import { createFeature, createReducer, on } from "@ngrx/store";
import { AddStartProgressInterface, VideosData } from "./videos.interface";
import { VideosActions } from "./videos.actions";


export interface AddStartProgressState {
    isSubmitting: boolean;
    addProgressMessage: string | null;
    addProgressError: string | null;
    addStartProgressData: AddStartProgressInterface[] | null;
}

const initialState: AddStartProgressState = {
    isSubmitting: false,
    addProgressMessage: null,
    addProgressError: null,
    addStartProgressData: null,
}


export const addStartProgressFeature = createFeature({
    name: 'addstartprogress',
    reducer: createReducer(
        initialState,

        on(VideosActions.addStartProgress, state => ({
            ...state,
            isSubmitting: true,
            addProgressMessage: null,
            addProgressError: null
            
        })),

        on(VideosActions.addStartProgressSuccess, (state, {addStartProgressResponse})=>({
            ...state,
            addProgressMessage: addStartProgressResponse.message,
            addProgressError: null,
            isLoading: false,
            addStartProgressData: addStartProgressResponse.data
        })),

        on(VideosActions.addStartProgressFailure, (state, {addStartProgressErrors}) => ({
            ...state,
            addProgressError: addStartProgressErrors.message
        })),


    )
});

export const {
    name: addStartProgressFeatureKey,
    reducer: addStartProgressReducer,
    selectAddProgressError,
    selectAddProgressMessage,
    selectAddStartProgressData

} = addStartProgressFeature

