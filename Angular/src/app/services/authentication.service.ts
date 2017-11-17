import { Injectable} from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams} from "@angular/common/http";
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
    credentials: any;

    private loggedIn = new BehaviorSubject<boolean>(false);
    public isLoggedIn = this.loggedIn.asObservable();

    private loggedInUser = new BehaviorSubject<any>(null);
    public _loggedInUser = this.loggedInUser.asObservable();

    constructor(private _http: HttpClient){}

    login(username:any, password:any): Observable<boolean> {
         this.credentials = {
            username:username,
            password:password
        };

        return this._http.post('http://localhost:8084/RestApi/webapi/api/Timesheet/Authenticate', this.credentials,{observe:'response',responseType:'text'})
            .map(response => {
               var res  = JSON.parse(response.body);
              
                if(res.token){
                    this.loggedInUser.next(this.credentials.username);
                    this.loggedIn.next(true);
                        localStorage.setItem('currentUser',JSON.stringify({token:res.token,username:this.credentials.username}))
                        
                    return true;
                   
                }
                else{
                    return false;
                }
            });

    }

    logout() : void{
        this.loggedIn.next(false);
        localStorage.removeItem('currentUser');
    }

    checkCurrentUser() : any{
        if(localStorage.getItem('currentUser')){
            this.loggedIn.next(true);
        }
        else{
        this.loggedIn.next(false);
    }
    }
}