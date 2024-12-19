import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environment/environment.prod";
import { LoginRequestInterface, LoginResponseInterface } from "./login.interface";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class LogRegService{
    private apiUrl = `${environment.apiUrl}/api`;

    constructor(private http: HttpClient){}

    login(loginPayload: LoginRequestInterface): Observable<LoginResponseInterface>{
        const headers = new HttpHeaders({
            'Content-Type': 'application/json-patch+json'
        });

        return this.http.post<LoginResponseInterface>(`${this.apiUrl}/OnlineLearning/login`, loginPayload, {headers});
    }
}