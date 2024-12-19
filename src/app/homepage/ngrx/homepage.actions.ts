import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { GetCourseErrorResponseInterface, GetCourseResponseInterface } from "./homepage.interface";

export const GetCourseActions = createActionGroup({
    source: 'getcourse',
    events: {
        'Get Course': emptyProps(),
        'Get Course Success': props <{getCourseResponse: GetCourseResponseInterface}>(),
        'Get Course Failure': props <{getCourseErrorResponse: GetCourseErrorResponseInterface}>()
    }
})