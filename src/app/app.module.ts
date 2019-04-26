import { NgModule, APP_INITIALIZER } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
  MatSelectModule,
  MatSlideToggleModule
} from '@angular/material';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import * as moment from 'moment';
import { TranslateService } from './translator/translate.service';

/* CONFIGURATIONS */
/* CONFIGURATIONS */

/* MODULES */
import { AgmCoreModule } from '@agm/core';
/* MODULES */

/* PIPES */
import { ArrayFilterPipe, SafePipe, Globals } from './shared/index';
/* PIPES */

/* COMPONENTS */
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { LanguageComponent } from './components/language/language.component';

import {
  AccountDashboardComponent,
  AccountFamilyComponent,
  AccountInformationComponent,
  AccountSecurityComponent,
  AddMemberComponent,
  AddDependentComponent,
  AllergiesComponent,
  ConditionsComponent,
  FamilyEditComponent,
  GuestEditComponent,
  InvoiceGeneratorComponent,
  LoginComponent,
  MedicationsComponent,
  MyHomeComponent,
  OnboardingCompleteComponent,
  OnboardingComponent,
  PersonalInformationComponent,
  PrimaryPharmacyComponent,
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
  SignupConfirmComponent,
  ShippingInformationComponent,
  PaymentMethodsComponent,
  RegisterComponent,
  SelectMyPlanComponent,
  BillingInformationComponent,
  OrderConfirmationComponent,
  MedicalHistoryComponent,
  MembershipCardComponent
} from './components/index';

/* COMPONENTS */

/* SERVICES */
import {
  AccountService,
  MyFamilyService,
  CommonService,
  ContentService,
  GooglePlacesService,
  NotificationService,
  SignupService,
  AllergiesService,
  ConditionsService,
  DciService,
  MedicationsService,
  OnboardingService,
  PharmaciesService,
  PlanService,
  MyFamilyPersistData,
  MenuService
} from './services/index';
/* SERVICES */

import { HttpConfigInterceptor } from './httpconfig.interceptor';
import { environment } from 'src/environments/environment';
import { OnlyNumbersDirective } from './shared/directives/only-numbers.directive';
import { AuthGuard } from './guards/auth.guard';
import { TranslatorTestComponent } from './components/translator-test/translator-test.component';
import { TranslatePipe } from './translator/translate.pipe';

export function setupTranslateFactory(service: TranslateService) {
  const userLang = localStorage.getItem('lng') || 'en';
  localStorage.setItem('lng', userLang);
  return () => service.use();
}

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    TranslatePipe,
    LanguageComponent,
    AccountDashboardComponent,
    AccountFamilyComponent,
    AccountInformationComponent,
    AddDependentComponent,
    AppComponent,
    ArrayFilterPipe,
    SafePipe,
    FamilyEditComponent,
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
    ShippingInformationComponent,
    OnlyNumbersDirective,
    MyHomeComponent,
    OnboardingComponent,
    PersonalInformationComponent,
    AllergiesComponent,
    ConditionsComponent,
    MedicationsComponent,
    PrimaryPharmacyComponent,
    OnboardingCompleteComponent,
    InvoiceGeneratorComponent,
    AccountSecurityComponent,
    RegisterComponent,
    SelectMyPlanComponent,
    BillingInformationComponent,
    OrderConfirmationComponent,
    MedicalHistoryComponent,
    MembershipCardComponent,
    GuestEditComponent,
    TranslatorTestComponent,
    LanguageComponent,
    PaymentMethodsComponent,
    AddMemberComponent
  ],
  imports: [
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: `${environment.googleApiKey}`,
      libraries: ['places']
    }),
    NgbModule,
    NgbModalModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
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
    MatSlideToggleModule,
    MatRadioModule,
    MatListModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    NgxCaptchaModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor
    },
    TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateFactory,
      deps: [TranslateService],
      multi: true
    },
    AuthGuard,
    AccountService,
    TranslateService,
    MyFamilyService,
    CommonService,
    ContentService,
    Globals,
    GooglePlacesService,
    NotificationService,
    PlanService,
    SignupService,
    AllergiesService,
    ConditionsService,
    DciService,
    MedicationsService,
    OnboardingService,
    PharmaciesService,
    MyFamilyPersistData,
    MenuService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
