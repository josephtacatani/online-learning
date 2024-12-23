

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


