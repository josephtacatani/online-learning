import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { VideosErrorResponseInterface, VideosResponseInterface } from "./videos.interface";

export const VideosActions = createActionGroup({
    source: 'videos',
    events: {
        'Get Videos': props<({courseId: number})>(),
        'Get Videos Success': props <{getVideosResponse: VideosResponseInterface}>(),
        'Get Videos Failure': props <{getVideosErrors: VideosErrorResponseInterface}>(),
    }
})