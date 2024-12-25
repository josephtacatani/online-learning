import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { AddStartProgressErrorsInterface, AddStartProgressRequestInterface, AddStartProgressResponseInterface, VideosErrorResponseInterface, VideosResponseInterface } from "./videos.interface";

export const VideosActions = createActionGroup({
    source: 'videos',
    events: {
        'Get Videos': props<({courseId: number})>(),
        'Get Videos Success': props <{getVideosResponse: VideosResponseInterface}>(),
        'Get Videos Failure': props <{getVideosErrors: VideosErrorResponseInterface}>(),

        'Add Start Progress': props<({addStartProgressPayload: AddStartProgressRequestInterface})>(),
        'Add Start Progress Success': props<({addStartProgressResponse: AddStartProgressResponseInterface})>(),
        'Add Start Progress Failure': props<({addStartProgressErrors: AddStartProgressErrorsInterface})>()
    }
})