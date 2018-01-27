import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, QueryEncoder } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class AuthService {

  constructor(private http: Http) { }

	isLoggedIn(){
		return this.http.get("/check/login/status").map((response: Response) => response.json());
	}


}
