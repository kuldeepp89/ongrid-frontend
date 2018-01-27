import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, QueryEncoder } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class BookdetailsService {
	url = "https://www.googleapis.com/books/v1/volumes/";

	constructor(private http: Http) { }

	getBookDetails(id: string){
		return this.http.get(this.url+id).map((response: Response) => response.json());
	}
}
