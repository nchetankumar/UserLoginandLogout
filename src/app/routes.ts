import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { ForgetPassComponent } from './user/forget-pass/forget-pass.component';
import { UpdatePassComponent } from './user/update-pass/update-pass.component';
import { AuthGuard } from './auth/auth.guard';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent,canActivate:[AuthGuard] },
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'forget', component: UserComponent,
        children: [{ path: '', component: ForgetPassComponent }]
    },
    {
        path: 'updatePass', component: UserComponent,
        children: [{ path: '', component: UpdatePassComponent }]
    },
    { path : '', redirectTo:'/login', pathMatch : 'full'}
    
];