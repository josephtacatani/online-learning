import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environment/environment.prod";

import { Observable } from "rxjs";
import { GetCourseResponseInterface } from "./homepage.interface";

@Injectable({
    providedIn: 'root',
})
export class GetCourseService{
    private apiUrl = `${environment.apiUrl}/api`;

    constructor(private http: HttpClient){}

    getCourses(): Observable<GetCourseResponseInterface> {
        const headers = new HttpHeaders({
          'accept': 'text/plain' // Matches the API's expected accept header
        });
      
        return this.http.get<GetCourseResponseInterface>(`${this.apiUrl}/OnlineLearning/GetAllCourse`, { headers });
      }
      
}