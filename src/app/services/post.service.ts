import { Injectable } from '@angular/core';
import { HttpService } from './httpservice.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpService) { }

  newPost(title: string, text: string, isAnon: boolean, userId: string) {
    return this.http.invoke({
      method: 'POST', // method like POST, GET etc.
      url: 'http://localhost:3000/api', // base URL
      path: 'post', // API endpoint
      body: { title, text, isAnon, userId }, // body for POST or PUT requests
      headers: {}, // headers you need to add to your request
      query: {} // URL query to be added (eg. ?query=queryValue)
    });
  }

  deletePost(postId: string) {
    return this.http.invoke({
      method: 'PUT', // method like POST, GET etc.
      url: 'http://localhost:3000/api', // base URL
      path: 'delete-post', // API endpoint
      body: { postId }, // body for POST or PUT requests
      headers: {}, // headers you need to add to your request
      query: {} // URL query to be added (eg. ?query=queryValue)
    });
  }

  newComment(text: string, postId: string, userId: string, isAnon: boolean) {
    return this.http.invoke({
      method: 'POST', // method like POST, GET etc.
      url: 'http://localhost:3000/api', // base URL
      path: 'comment', // API endpoint
      body: { postId, text, userId, isAnon }, // body for POST or PUT requests
      headers: {}, // headers you need to add to your request
      query: {} // URL query to be added (eg. ?query=queryValue)
    });
  }

  getComments(postId: string) {
    return this.http.invoke({
      method: 'GET', // method like POST, GET etc.
      url: 'http://localhost:3000/api', // base URL
      path: 'comments', // API endpoint
      body: {}, // body for POST or PUT requests
      headers: { 'Content-Type': 'application/json' }, // headers you need to add to your request
      query: { postId } // URL query to be added (eg. ?query=queryValue)
    });
  }
}
