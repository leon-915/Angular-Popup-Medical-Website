import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {
  ProductComponent,
  LoginComponent,
  ResetPasswordComponent,
  ResetPasswordStep1Component,
  ResetPasswordStep2Component,
  ResetPasswordStep3Component
} from './components/index';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'reset', component: ResetPasswordComponent },
  { path: 'reset/step1', component: ResetPasswordStep1Component },
  { path: 'reset/step2', component: ResetPasswordStep2Component },
  { path: 'reset/step3', component: ResetPasswordStep3Component },
  { path: 'home', component: HomeComponent },
  { path: 'product/:id', component: ProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
