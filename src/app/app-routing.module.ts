import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
  SignupConfirmComponent,
  RegisterComponent,
  AccountFamilyComponent,
  FamilyEditComponent,
  AddDependentComponent,
  MembershipCardComponent,
  GuestEditComponent
} from './components/index';
import { MatNativeDateModule, MatDatepickerModule } from '@angular/material';
import { TranslatorTestComponent } from './components/translator-test/translator-test.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'my-home', component: MyHomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  {
    path: 'account',
    component: AccountDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'account/info',
    component: AccountInformationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'account/security',
    component: AccountSecurityComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'account/family',
    component: AccountFamilyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'account/family/family-edit/:id',
    component: FamilyEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'account/family/guest-edit/:id',
    component: GuestEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'account/family/dependent',
    component: AddDependentComponent,
    canActivate: [AuthGuard]
  },
  { path: 'signup', component: SignupComponent },
  { path: 'translator-test', component: TranslatorTestComponent },
  { path: 'signup-confirm', component: SignupConfirmComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register/:invitationCode/:email', component: RegisterComponent },
  { path: 'reset', component: ResetPasswordComponent },
  { path: 'home', component: HomeComponent },
  { path: 'product', component: ProductComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'onboarding', component: OnboardingComponent },
  { path: 'invoice-generator', component: InvoiceGeneratorComponent },
  { path: 'membership-card', component: MembershipCardComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatDatepickerModule, MatNativeDateModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
