import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppBootstrapModule } from './app-bootstrap.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PostsComponent } from './components/posts/posts.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { WarningModalComponent } from './components/warning-modal/warning-modal.component';
import { PostFilterPipe } from './components/posts/post-filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
library.add(fas);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PostsComponent,
    NewPostComponent,
    PostFilterPipe,
    WarningModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppBootstrapModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxPaginationModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [WarningModalComponent]
})
export class AppModule { }
