export interface EnrollCourseRequestInterface{
    userId: number,
    courseId: number,
    enrolledDate: string,
    isCompleted: boolean,

}

export interface EnrollCourseResponseInterface{
    message: string,
    result: boolean,
    data: EnrollCourseInterface[]
}

export interface EnrollCourseErrorResponseInterface{
    message: string,
    result: boolean,
}

export interface EnrollCourseInterface{
    enrollmentId: number,
    userId: number,
    courseId: string,
    enrolledDate: string,
    isCompleted: boolean
}
