import { Component, inject, OnInit, signal } from '@angular/core';
import { Comment } from '../interfaces/comment.interface';
import { CommentService } from '../services/comment.service';
import { CommentComponent } from '../components/comment/comment.component';
import { NgFor } from '@angular/common';
import { CommentFormComponent } from '../components/comment-form/comment-form.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommentComponent, NgFor, CommentFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  commentService = inject(CommentService);
  comments = signal<Comment[]>([]);
  userService = inject(UserService);

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.commentService.getComments().subscribe((comms) => {
      this.comments.set(comms);
    });
  }
  createdComment(formsValues: { text: string }) {
    const { text } = formsValues;
    const user = this.userService.getUserFromStorage();
    if (!user) {
      return;
    }
    this.commentService
      .createdComment({
        text,
        userId: user._id,
      })
      .subscribe((createdComment) => {
        this.comments.set([createdComment, ...this.comments()]);
      });
  }
}
