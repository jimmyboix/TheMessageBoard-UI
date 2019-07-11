import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  newPostForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;
  titleMaxLength = 100;
  contentMaxLength = 200;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private authenticationService: AuthenticationService,
    private home: HomeComponent) { }

  ngOnInit() {
    this.newPostForm = this.formBuilder.group({
      postTitle: ['', Validators.required],
      postText: ['', Validators.required],
      anonSwitch: [false]
    });
  }

  get f() { return this.newPostForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.newPostForm.invalid) {
      return;
    }
    this.loading = true;
    this.postService.newPost(this.f.postTitle.value.trim(), this.f.postText.value.trim(), this.f.anonSwitch.value,
      this.authenticationService.currentUserValue.data._id).pipe()
      .subscribe(
        data => {
          this.loading = false;
          this.home.getPosts();
        },
        error => {
          this.error = error;
          this.loading = false;
        });

  }

}
