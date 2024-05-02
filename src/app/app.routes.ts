import { Routes } from '@angular/router';
import { NoticesComponent } from './pages/notices/notices.component';
import { HomeComponent } from './pages/home/home.component';
import { NoticeComponent } from './pages/notices/components/notice/notice.component';

export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path:'notices', component: NoticesComponent},
    {path:'notice/:id', component: NoticeComponent}
];
