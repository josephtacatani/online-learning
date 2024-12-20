import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { EnrollCourseErrorResponseInterface, EnrollCourseRequestInterface, EnrollCourseResponseInterface} from "./userpage.interface";

export const EnrollCourseActions = createActionGroup({
    source: 'enrollcourse',
    events: {
        'Enroll Course': props<{ enrollCoursePayload: EnrollCourseRequestInterface}>(),
        'Enroll Course Success': props <{enrollCourseResponse: EnrollCourseResponseInterface}>(),
        'Enroll Course Failure': props <{enrollCourseErrors: EnrollCourseErrorResponseInterface}>(),
    }
})