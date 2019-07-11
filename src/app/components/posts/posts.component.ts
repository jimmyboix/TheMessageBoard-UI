import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Comment, Creator } from '../../models/app.models';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HomeComponent } from '../home/home.component';
import { WarningModalComponent } from '../warning-modal/warning-modal.component';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})

export class PostsComponent implements OnInit {

  @Input() postTitle: string;
  @Input() postId: string;
  @Input() link: string;
  @Input() text: string;
  @Input() createdAt: string;
  @Input() comments: Array<Comment>;
  @Input() creator: Array<Creator>;
  @Input() isAnon: boolean;
  @Input() isLocked: boolean;
  modalRef: BsModalRef;
  newCommentForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;
  commentPostMaxLength = 150;

  constructor(
    private formBuilder: FormBuilder, private postService: PostService,
    private modalService: BsModalService, private authenticationService: AuthenticationService,
    private home: HomeComponent) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  ngOnInit() {
    this.newCommentForm = this.formBuilder.group({
      commentPost: [{ value: '', disabled: this.isLocked }, Validators.required],
      anonComment: [{ value: false, disabled: this.isLocked }]
    });
  }

  get f() { return this.newCommentForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.newCommentForm.invalid) {
      return;
    }

    this.loading = true;
    this.postService.newComment(this.f.commentPost.value.trim(), this.postId,
      this.authenticationService.currentUserValue.data._id, this.f.anonComment.value).pipe()
      .subscribe(
        data => {
          this.loading = false;
          this.home.getPosts();
          this.getComments();
        },
        error => {
          this.error = error;
          this.loading = false;
        });

  }

  getComments() {
    this.postService.getComments(this.postId).subscribe(
      success => {
        this.comments = success.data;
        this.sortPostsByDate(this.comments);
      },
      error => {
        console.log(error);
      }
    );
  }

  sortPostsByDate(array: any): void {

    array.sort((a: Comment, b: Comment) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  get user(): any {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  deletePost() {
    const initialState = {
      title: 'WARNING',
      text: 'Are you sure you want to delete the post?',
      confirmModal: true
    };

    this.modalRef = this.modalService.show(WarningModalComponent, { initialState });
    this.modalRef.content.result.subscribe(res => {
      if (res) {
        this.postService.deletePost(this.postId).pipe()
          .subscribe(
            success => {
              this.loading = false;
              this.home.getPosts();
            },
            error => {
              this.error = error;
              this.loading = false;
            });
      }
    });
  }

}
