import { NgModule } from '@angular/core';
import {
  MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule,
  MatButtonToggleModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
  MatDialogModule, MatListModule, MatProgressBarModule, MatSnackBarModule, MatTabsModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
/*Custom Modules*/
import { ArrayFilterPipe, Globals } from './shared/index';








/**/


@NgModule({
  declarations: [
    AppComponent,
    ArrayFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule, MatButtonToggleModule, MatAutocompleteModule,
     MatBadgeModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatTabsModule, MatListModule, MatProgressBarModule,
    MatBottomSheetModule,
    MatSnackBarModule,
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
