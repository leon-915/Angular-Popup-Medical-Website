import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import {
  LoginComponent,
  MyHomeComponent,
  ProductComponent,
  ResetPasswordComponent,
  AccountDashboardComponent,
  AccountInformationComponent,
  AccountSecurityComponent,
  SignupComponent,
  OnboardingComponent,
  InvoiceGeneratorComponent,
  SignupStep1Component,
  SignupConfirmComponent
} from './components/index';
import { MatNativeDateModule, MatDatepickerModule } from '@angular/material';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'my-home', component: MyHomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'account', component: AccountDashboardComponent },
  { path: 'account/info', component: AccountInformationComponent },
  { path: 'account/security', component: AccountSecurityComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signup-confirm', component: SignupConfirmComponent },
  { path: 'register', component: SignupStep1Component },
  { path: 'reset', component: ResetPasswordComponent },
  { path: 'home', component: HomeComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'onboarding', component: OnboardingComponent },
  { path: 'invoice-generator', component: InvoiceGeneratorComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
