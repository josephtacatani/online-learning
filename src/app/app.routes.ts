import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { UserpageComponent } from './userpage/userpage.component';
import { MycoursesComponent } from './mycourses/mycourses.component';
import { VideosComponent } from './videos/videos.component';


export const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'userpage', component: UserpageComponent },
    { path: 'mycourses', component: MycoursesComponent },
    { path: 'videos', component: VideosComponent },
    { path: 'videos/:courseId/:enrollmentId', component: VideosComponent },
];
