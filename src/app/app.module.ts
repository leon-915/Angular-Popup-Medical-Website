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
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ArrayFilterPipe, Globals } from './shared/index';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';

/* COMPONENTS */
import { ProductComponent } from './components/index';
import { ProductVideoComponent } from './components/product-video/product-video.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './footer/footer.component';
/* COMPONENTS */


/* SERVICES */
import {CommonService, ContentService, AccountService, GooglePlacesService} from './services/index';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SignupComponent } from './components/signup/signup.component';
/* SERVICES */

import { AgmCoreModule } from '@agm/core';
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
    SignupComponent,
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
     MatBadgeModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatTabsModule, MatListModule, MatProgressBarModule,
    MatBottomSheetModule, MatToolbarModule,
    MatSnackBarModule, MatSidenavModule, MatIconModule, MatFormFieldModule, MatInputModule,
    AgmCoreModule.forRoot({
      apiKey: `${environment.googleApiKey}`,
      libraries: ['places']
    })
  ],
  providers: [Globals, CommonService, ContentService, AccountService, GooglePlacesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
