export interface GetCourseResponseInterface{
    message: string; // Message from the API
    result: boolean; // Indicates success or failure of the API call
    data: CourseInterface[]; 
}

export interface GetCourseErrorResponseInterface{
    message: string,
    result: boolean,
}

export interface CourseInterface {
    courseId: number; // Unique identifier for the course
    courseName: string; // Name of the course
    createdDate: string; // Date when the course was created (ISO 8601 string format)
    totalHours: string; // Total hours of the course
    totalVideos: number; // Total number of videos in the course
    courseDescription: string; // Description of the course
    thumbnailUrl: string | null; // URL for the course thumbnail or null if not available
}
  