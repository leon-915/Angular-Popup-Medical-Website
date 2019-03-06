import { NgModule } from '@angular/core';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatListModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatTabsModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
import { NgxCaptchaModule } from 'ngx-captcha';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* CONFIGURATIONS */
import { customNotifierOptions } from './configurations/index';
/* CONFIGURATIONS */

/* MODULES */
import { NotifierModule } from 'angular-notifier';
import { AgmCoreModule } from '@agm/core';
/* MODULES */

/* PIPES */
import { ArrayFilterPipe, Globals } from './shared/index';
/* PIPES */

/* COMPONENTS */
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import {
  AccountDashboardComponent,
  LoginComponent,
  ProductComponent,
  ProductVideoComponent,
  ResetPasswordComponent,
  ResetPasswordSelectMethodComponent,
  ResetPasswordStep1Component,
  ResetPasswordStep2Component,
  ResetPasswordStep3Component,
  SignupComponent,
  SignupStep1Component,
  SignupStep2Component,
  SignupStep3Component,
  SignupStep4Component,
  SignupStep5Component,
  SignupStep6Component
} from './components/index';
/* COMPONENTS */

/* SERVICES */
import {
  AccountService,
  CommonService,
  ContentService,
  GooglePlacesService,
  NotificationService,
  PlanService,
  SignupService
} from './services/index';
/* SERVICES */

import { HttpConfigInterceptor } from './httpconfig.interceptor';

import { environment } from 'src/environments/environment';
import { SignupConfirmComponent } from './components/signup-confirm/signup-confirm.component';

@NgModule({
  declarations: [
    AccountDashboardComponent,
    AppComponent,
    ArrayFilterPipe,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    NavMenuComponent,
    ProductComponent,
    ProductVideoComponent,
    ResetPasswordComponent,
    ResetPasswordSelectMethodComponent,
    ResetPasswordStep1Component,
    ResetPasswordStep2Component,
    ResetPasswordStep3Component,
    SignupComponent,
    SignupConfirmComponent,
    SignupStep1Component,
    SignupStep2Component,
    SignupStep3Component,
    SignupStep4Component,
    SignupStep5Component,
    SignupStep6Component
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: `${environment.googleApiKey}`,
      libraries: ['places']
    }),
    AppRoutingModule,

    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    NgxCaptchaModule,
    NotifierModule.withConfig(customNotifierOptions),
    ReactiveFormsModule
  ],
  providers: [
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor
    },
    AccountService,
    CommonService,
    ContentService,
    Globals,
    GooglePlacesService,
    NotificationService,
    PlanService,
    SignupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
