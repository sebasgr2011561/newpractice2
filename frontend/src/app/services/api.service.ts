import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    api = "api/";
    apiUrl = environment.api;
    bodyRequest: any;

    

    constructor(private http: HttpClient) { }

    getDataAssignments(controller: string, id: number):Observable<any> {
        const url = this.apiUrl + this.api + controller + '/AssignmentsByStudent/' + id;
        return this.http.get<any>(url)
    }

    getData(controller: string, id: number = 0) : Observable<any> { 

        if (id !== 0) {
            this.bodyRequest = {
                numPage: 1,
                numRecordsPAge: 10,
                order: 'asc',
                sort: 'Id', 
                id: id
            };   
        }

        const url = this.apiUrl + this.api + controller + '/';
        return this.http.post<any>(url, this.bodyRequest);
    }

    getFullData(controller: string, idUser: number = 0, idRol: number = 0) : Observable<any> { 
        let url = '';

        if (idRol === 2) {
            url = this.apiUrl + this.api + controller + '/SelectByProfesorId/' + idUser;
            return this.http.get<any>(url);
        }

        if (idUser === 0) {
            url = this.apiUrl + this.api + controller + '/select';    
        } else {
            url = this.apiUrl + this.api + controller + '/select/' + idUser;
        }
        
        return this.http.get<any>(url)
    }

    getFullDataSelect(controller: string, id: number = 0) : Observable<any> { 
        let url = this.apiUrl + this.api + controller + '/select/' + id;
        return this.http.get<any>(url)
    }

    getFullDataById(controller: string, id:number) : Observable<any> { 
        const url = this.apiUrl + this.api + controller + '/SelectByProfesorId/' + id;
        return this.http.get<any>(url)
    }

    getDataById(controller: string, id: number) : Observable<any> { 
        const url = this.apiUrl + this.api + controller + '/' + id;
        return this.http.get<any>(url)
    }

    createData(controller: string, data: any) : Observable<any> { 
        var header = new HttpHeaders().set("content-type", "multipart/form-data")
        const url = this.apiUrl + this.api + controller + '/Register';
        return this.http.post<any>(url, data);
    }

    updateData(controller: string, id: number, data: any) : Observable<any> { 
        var header = new HttpHeaders().set("content-type", "multipart/form-data")
        const url = this.apiUrl + this.api + controller + '/Update/' + id;
        return this.http.put<any>(url, data);
    }

    deleteData(controller: string, id: number) : Observable<any> { 
        const url = this.apiUrl + this.api + controller + '/Delete/' + id;
        return this.http.put<any>(url, id);
    }

    loginUser(controller: string, userRequestData: any): Observable<any> {
        const urlLogin = this.apiUrl + this.api + controller + '/Generate';
        return this.http.post<any>(urlLogin, userRequestData);
    }

    getDashboardActive(controller: string, idPRofesor: number): Observable<any> {
        const url = this.apiUrl + this.api + controller + '/SelectInfoDashboardActive/' + idPRofesor;
        return this.http.get<any>(url);
    }

    getDashboardInactive(controller: string, idPRofesor: number): Observable<any> {
        const url = this.apiUrl + this.api + controller + '/SelectInfoDashboardInactive/' + idPRofesor;
        return this.http.get<any>(url);
    }
}