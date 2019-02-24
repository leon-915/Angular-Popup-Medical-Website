import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


/*Custom Modules*/
import {Globals,ArrayFilterPipe} from './shared/index'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';




import {
        MatButtonModule, 
        MatCheckboxModule,
        MatButtonToggleModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatTabsModule,
        MatListModule,
        MatProgressBarModule,
        MatBottomSheetModule,
        MatSnackBarModule,
     
      
      } from '@angular/material';

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
    MatButtonModule, MatCheckboxModule,MatButtonToggleModule,MatAutocompleteModule, MatBadgeModule,MatChipsModule,MatDatepickerModule,MatDialogModule,MatTabsModule,MatListModule,MatProgressBarModule,
    MatBottomSheetModule,
    MatSnackBarModule,
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
