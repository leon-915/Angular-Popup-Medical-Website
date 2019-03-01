import { NgModule } from '@angular/core';
import {
  MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule,
  MatButtonToggleModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
  MatDialogModule, MatListModule, MatProgressBarModule, MatSnackBarModule,
  MatTabsModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatFormFieldModule, MatInputModule
} from '@angular/material';
import { NgxCaptchaModule } from 'ngx-captcha';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* CONFIGURATIONS */
import {customNotifierOptions} from './configurations/index';
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
import {FooterComponent} from './footer/footer.component';
import { ProductComponent, ProductVideoComponent, LoginComponent,
  ResetPasswordComponent, SignupComponent } from './components/index';
/* COMPONENTS */

/* SERVICES */
import {CommonService, NotificationService, ContentService, AccountService, GooglePlacesService } from './services/index';
/* SERVICES */

import { HttpConfigInterceptor} from './httpconfig.interceptor';

import { environment } from 'src/environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    ArrayFilterPipe,
    NavMenuComponent,
    ProductComponent,
    HomeComponent,
    ProductVideoComponent,
    LoginComponent,
    FooterComponent,
    ResetPasswordComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    MatButtonModule, MatCheckboxModule, MatButtonToggleModule, MatAutocompleteModule,
    MatBadgeModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatTabsModule,
    MatListModule, MatProgressBarModule, MatBottomSheetModule, MatToolbarModule, MatSnackBarModule, 
    MatSidenavModule, MatIconModule, MatFormFieldModule, MatInputModule,
    AgmCoreModule.forRoot({
      apiKey: `${environment.googleApiKey}`,
      libraries: ['places']
    }), NotifierModule.withConfig(customNotifierOptions)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    Globals, NotificationService, CommonService, ContentService, AccountService, GooglePlacesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
