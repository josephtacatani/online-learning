import { createFeature, createReducer, on } from "@ngrx/store";
import { VideosData } from "./videos.interface";
import { VideosActions } from "./videos.actions";


export interface VideosState {
    isLoading: boolean;
    videosMessage: string | null;
    videosError: string | null;
    videosData: VideosData[] | null;
}

const initialState: VideosState = {
    isLoading: false,
    videosMessage: null,
    videosError: null,
    videosData: null,
}


export const videosFeature = createFeature({
    name: 'myvideos',
    reducer: createReducer(
        initialState,

        on(VideosActions.getVideos, state => ({
            ...state,
            isLoading: true,
            videosMessage: null,
            videosError: null
            
        })),

        on(VideosActions.getVideosSuccess, (state, {getVideosResponse})=>({
            ...state,
            videosMessage: getVideosResponse.message,
            videosError: null,
            isLoading: false,
            videosData: getVideosResponse.data
        })),

        on(VideosActions.getVideosFailure, (state, {getVideosErrors}) => ({
            ...state,
            videosError: getVideosErrors.message
        })),


    )
});

export const {
    name: videosFeatureKey,
    reducer: videosReducer,
    selectIsLoading,
    selectVideosData,
    selectVideosError,
    selectVideosMessage

} = videosFeature

