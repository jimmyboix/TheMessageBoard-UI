import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { Subscription } from 'rxjs';
import { Post, Comment } from 'src/app/models/app.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  allPostsSub: Subscription;
  posts: Post[] = [];
  maxItemsPP = 10;

  @Input()
  searchTitle: string;

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.getPosts();
  }
  ngOnDestroy() {
    this.allPostsSub.unsubscribe();
  }

  getPosts() {
    this.allPostsSub = this.homeService.getAllPosts().subscribe(
      success => {
        this.posts = success.data;
        console.log(this.posts);
        this.sortPostsByDate(this.posts);
      },
      error => {
          throw error;
      }
    );
  }

  getPostsList() {
    return this.posts;
  }

  sortPostsByDate(array: any): void {
    array.sort((a: Post, b: Post) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    this.posts.forEach(post => {
      if (post._comments.length) {
        post._comments.sort((a: Comment, b: Comment) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
      }
    });
  }
}
