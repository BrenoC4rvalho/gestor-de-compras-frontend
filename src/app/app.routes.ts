import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { NewRequestComponent } from './pages/new-request/new-request.component';

export const routes: Routes = [
    { path: '', component: LoginComponent},
    { path: 'home', canActivate: [AuthGuard], component: HomeComponent},
    { path: 'admin', canActivate: [AuthGuard], component: AdminComponent},
    { path: 'newRequest', canActivate: [AuthGuard], component: NewRequestComponent}
];
