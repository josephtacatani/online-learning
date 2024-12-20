import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environment/environment.prod";
import { Observable } from "rxjs";
import { DeleteMyCourseRequestInterface, DeleteMyCourseResponseInterface, myCourseRequestInterface, MyCourseResponseInterface } from "./mycourses.interface";

@Injectable({
    providedIn: 'root',
})
export class MyCourseService{
    private apiUrl = `${environment.apiUrl}/api`;

    constructor(private http: HttpClient){}

    getCoursebyId(): Observable<MyCourseResponseInterface>{
        const headers = new HttpHeaders({
            'accept': 'text/plain'
        });

        const loginResponse = localStorage.getItem('loginResponse');
        let userId;

        if (loginResponse){
          const parsedResponse = JSON.parse(loginResponse);
          userId = parsedResponse.data.userId;
        }
        else{
            console.log('no data');
        }

        return this.http.get<MyCourseResponseInterface>(`${this.apiUrl}/OnlineLearning/GetEnrolledCourseByUserId`, {headers, params: { userId }});
    }

    deleteCoursebyEnrollmentId(deleteCoursebyEnrollmentId: DeleteMyCourseRequestInterface): Observable<DeleteMyCourseResponseInterface>{
        const headers = new HttpHeaders({
            'accept': 'text/plain'
        });

        let enrollmentId;

        enrollmentId = deleteCoursebyEnrollmentId.enrollmentId;

        return this.http.delete<DeleteMyCourseResponseInterface>(`${this.apiUrl}/OnlineLearning/DeleteEnrollment`, {headers, params: {enrollmentId}});
    }

    
}