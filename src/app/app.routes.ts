import { Routes } from '@angular/router';
import { NoticesComponent } from './pages/notices/notices.component';
import { HomeComponent } from './pages/home/home.component';
import { NoticeComponent } from './pages/notices/components/notice/notice.component';
import { LoginComponent } from './admin/login/login.component';
import { NewsComponent } from './admin/news/news.component';
import { ArticleComponent } from './admin/article/article.component';
import { CategoryComponent } from './admin/category/category.component';

export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path:'notices', component: NoticesComponent},
    {path:'notice/:id', component: NoticeComponent},
    {path:'admin/login', component: LoginComponent},
    {path:'admin/news', component: NewsComponent},
    {path:'admin/news/create', component: ArticleComponent},
    {path:'admin/categories', component: CategoryComponent}
];
