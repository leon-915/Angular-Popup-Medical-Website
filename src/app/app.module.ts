import { NgModule } from '@angular/core';
import {
  MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule,
  MatButtonToggleModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
  MatDialogModule, MatListModule, MatProgressBarModule, MatSnackBarModule,
  MatTabsModule, MatSidenavModule, MatToolbarModule, MatIconModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ArrayFilterPipe, Globals } from './shared/index';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';

/* COMPONENTS */
import { ProductComponent } from './components/index';
import { ProductVideoComponent } from './components/product-video/product-video.component';
/* COMPONENTS */


/* SERVICES */
import {CommonService, ContentService} from './services/index';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
/* SERVICES */






@NgModule({
  declarations: [
    AppComponent,
    ArrayFilterPipe,
    NavMenuComponent,
    ProductComponent,
    HomeComponent,
    ProductVideoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule, MatCheckboxModule, MatButtonToggleModule, MatAutocompleteModule,
     MatBadgeModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatTabsModule, MatListModule, MatProgressBarModule,
    MatBottomSheetModule, MatToolbarModule,
    MatSnackBarModule, MatSidenavModule, MatIconModule
  ],
  providers: [Globals, CommonService, ContentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
