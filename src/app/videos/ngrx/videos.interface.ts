

export interface VideosResponseInterface{
    message: string,
    result: boolean,
    data: VideosData[] | null,
}

export interface VideosErrorResponseInterface{
    message: string,
    result: boolean,
}

export interface VideosData{
    courseVideoId: number,
    courseId: number,
    videoTitle: string,
    videoId: number,
    videoUrl: string,
    totalDuration: number,
    videoDescription: string,
    videoThumbnail: string
}


export interface AddStartProgressRequestInterface{
    enrollmentId: number,
    videoId: number,
    isStarted: boolean,
    isCompleted: boolean,
    startedDate: string,
    completedDate: string
}

export interface AddStartProgressResponseInterface{
    message: string,
    result: string,
    data: AddStartProgressInterface[] | null
}

export interface AddStartProgressErrorsInterface{
    message: string,
    result: boolean,
}

export interface AddStartProgressInterface{
    progressId: number,
    enrollmentId: number,
    videoId: number,
    isStarted: boolean,
    isCompleted: boolean,
    startedDate: string,
    completedDate: string
}

