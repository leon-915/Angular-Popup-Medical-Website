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
  MatInputModule,
  MatRadioModule,
  MatSelectModule
} from '@angular/material';
import { NgxCaptchaModule } from 'ngx-captcha';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as moment from 'moment';

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
  AccountInformationComponent,
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
  SignupStep6Component,
  MyHomeComponent,
  SignupConfirmComponent,
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
import { OnlyNumbersDirective } from './shared/directives/only-numbers.directive';
import { AuthGuard } from './guards/auth.guard';
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { PersonalInformationComponent } from './components/onboarding/personal-information/personal-information.component';
import { AllergiesComponent } from './components/onboarding/allergies/allergies.component';
import { ConditionsComponent } from './components/onboarding/conditions/conditions.component';
import { MedicationsComponent } from './components/onboarding/medications/medications.component';
import { PrimaryPharmacyComponent } from './components/onboarding/primary-pharmacy/primary-pharmacy.component';
import { OnboardingCompleteComponent } from './components/onboarding/onboarding-complete/onboarding-complete.component';
import { InvoiceGeneratorComponent } from './components/invoice-generator/invoice-generator.component';

@NgModule({
  declarations: [
    AccountDashboardComponent,
    AccountInformationComponent,
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
    SignupStep6Component,
    OnlyNumbersDirective,
    MyHomeComponent,
    OnboardingComponent,
    PersonalInformationComponent,
    AllergiesComponent,
    ConditionsComponent,
    MedicationsComponent,
    PrimaryPharmacyComponent,
    OnboardingCompleteComponent,
    InvoiceGeneratorComponent
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
    MatSelectModule,
    MatRadioModule,
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
    AuthGuard,
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
