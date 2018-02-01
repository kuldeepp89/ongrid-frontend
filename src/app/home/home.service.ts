import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, QueryEncoder } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class HomeService {
	url: string = 'https://www.googleapis.com/books/v1/volumes';
	constructor(private http: Http) { }

	searchBooks(bookName: string){
		return this.http.get(this.url+"?q="+bookName).map((response: Response) => response.json());
	}

	makeBookmark(bookId: string){
		let book = new URLSearchParams();		
		book.set('book', bookId);
		return this.http.post("/make/bookmark", {search: book}).map((response: Response) => response.json());
	}
}
