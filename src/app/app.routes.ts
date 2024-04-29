import { Routes } from '@angular/router';
import { NoticesComponent } from './pages/notices/notices.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path:'notices', component: NoticesComponent},
];
