import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { DeleteMyCourseErrorResponseInterface, DeleteMyCourseRequestInterface, DeleteMyCourseResponseInterface, MyCourseErrorResponseInterface, MyCourseResponseInterface, myCourseRequestInterface } from "./mycourses.interface";

export const MyCoursesActions = createActionGroup({
    source: 'mycourse',
    events: {
        'My Course': emptyProps(),
        'My Course Success': props <{myCourseResponse: MyCourseResponseInterface}>(),
        'My Course Failure': props <{myCourseErrors: MyCourseErrorResponseInterface}>(),

        'Delete Course': props <{deletemyCoursePayload: DeleteMyCourseRequestInterface}>(),
        'Delete Course Success': props <{deletemyCourseResponse: DeleteMyCourseResponseInterface}>(),
        'Delete Course Failure': props <{deletemyCourseResponseErrors: DeleteMyCourseErrorResponseInterface}>(),

    }
})