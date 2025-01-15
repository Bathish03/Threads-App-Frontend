import { HttpClient, provideHttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroment } from '../enviroment';
import { Comment } from '../interfaces/comment.interface';

type createCommentDto = {
  parentId?: string;
  text: string;
  userId: string;
};

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  http = inject(HttpClient);

  getComments(parentId: string = '') {
    let url = `${enviroment.apiBaseUrl}/comments`;
    if (parentId) {
      url += `?parentId=${parentId}`;
    }
    return this.http.get<Comment[]>(url);
  }
  createdComment(comment: createCommentDto) {
    return this.http.post<Comment>(
      `${enviroment.apiBaseUrl}/comments`,
      comment
    );
  }
}
