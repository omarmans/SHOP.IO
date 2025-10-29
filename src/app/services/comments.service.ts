import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Comment } from '../shared/models/comment.interface';

@Injectable({
  providedIn: 'root',
})
export class CommentsService implements OnInit {
  private http = inject(HttpClient);
  private commentsSubject = new BehaviorSubject<Comment[]>([]);
  comments$ = this.commentsSubject.asObservable();
  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>('data-json/comments.json');
  }

  // testERR
  // getComments(): Observable<Comment[]> {
  //   return this.http.get<Comment[]>(
  //     'data-json/comments.jsonddddddddddddddddddddd'
  //   );
  // }
  setComments(data: Comment[]) {
    this.commentsSubject.next(data);
  }
  constructor() {}
  ngOnInit(): void {
    // this.getComments();
  }
}
