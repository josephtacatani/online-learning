import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environment/environment.prod";
import { Observable } from "rxjs";
import { AddStartProgressRequestInterface, AddStartProgressResponseInterface, VideosResponseInterface } from "./videos.interface";
import { Store } from "@ngrx/store";

@Injectable({
    providedIn: 'root',
})
export class VideosService{
    private apiUrl = `${environment.apiUrl}/api`;

    constructor(
        private http: HttpClient,
        private store: Store

    ){


    }

    getVideosCoursebyId(courseId: number): Observable<VideosResponseInterface>{
        const headers = new HttpHeaders({
            'accept': 'text/plain'
        });

        return this.http.get<VideosResponseInterface>(`${this.apiUrl}/OnlineLearning/GetCourseVideosbyCourseId`, {headers, params: { courseId }});
    }

    addStartProgress(addStartProgressPayload: AddStartProgressRequestInterface): Observable<AddStartProgressResponseInterface>{
        const headers = new HttpHeaders({
            'accept': 'text/plain',
            'Content-Type': 'application/json-patch+json'
        });

        return this.http.post<AddStartProgressResponseInterface>(`${this.apiUrl}/OnlineLearning/addStartProgress`, addStartProgressPayload, {headers});
    }






    
}