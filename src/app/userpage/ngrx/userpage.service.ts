import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environment/environment.prod";
import { EnrollCourseRequestInterface, EnrollCourseResponseInterface } from "./userpage.interface";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class EnrollCourseService{
    private apiUrl = `${environment.apiUrl}/api`;

    constructor(private http: HttpClient){}

    addcourse(enrollCoursePayload: EnrollCourseRequestInterface): Observable<EnrollCourseResponseInterface>{
        const headers = new HttpHeaders({
            'Content-Type': 'application/json-patch+json'
        });

        return this.http.post<EnrollCourseResponseInterface>(`${this.apiUrl}/OnlineLearning/CreateNewEnrollment`, enrollCoursePayload, {headers});
    }
}