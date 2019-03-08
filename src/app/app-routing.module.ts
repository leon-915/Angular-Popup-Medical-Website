import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {AuthGuard} from './guards/auth.guard';
import {
  LoginComponent,
  MyHomeComponent,
  ProductComponent,
  ResetPasswordComponent,
  AccountDashboardComponent,
  SignupComponent,
  OnboardingComponent
} from './components/index';

const routes: Routes = [
  { path: '', component: HomeComponent , pathMatch: 'full' },
  { path: 'my-home', component: MyHomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: AccountDashboardComponent  },
  { path: 'signup', component: SignupComponent },
  { path: 'reset', component: ResetPasswordComponent },
  { path: 'home', component: HomeComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'onboarding', component: OnboardingComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
