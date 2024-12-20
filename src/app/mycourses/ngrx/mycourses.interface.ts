export interface myCourseRequestInterface{
    userId: number,
}

export interface MyCourseResponseInterface{
    message: string,
    result: boolean,
    data: MyCourseInterface[] | null,
}

export interface MyCourseErrorResponseInterface{
    message: string,
    result: boolean,
}

export interface MyCourseInterface{
    courseId: number,
    courseName: string,
    createdDate: string,
    enrollmentId: number,
    totalHours: number,
    totalVideos: number,
    courseDescription: string,
    thumbnailUrl: string
}

export interface DeleteMyCourseRequestInterface{
    enrollmentId: number
}

export interface DeleteMyCourseResponseInterface{
    message: string,
    result: boolean,
}

export interface DeleteMyCourseErrorResponseInterface{
    message: string,
    result: boolean,
}
