import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { NgModel } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap';
import {
  MdAutocompleteModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCoreModule,
  MdDatepickerModule,
  MdNativeDateModule,
  MdIconModule,
  MdInputModule,
  MdTabsModule,
  MdTableModule,
  MdSortModule,
  MdSelectModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk';
import { CollapsibleModule } from 'angular2-collapsible'; // <-- import the module
import 'hammerjs';
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';


import { AppComponent } from './app.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { SearchOutputComponent } from './search-output/search-output.component';
import { SearchOutputDetailComponent } from './search-output-detail/search-output-detail.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';








@NgModule({
  declarations: [
    AppComponent,
    SearchInputComponent,
    SearchOutputComponent,
    SearchOutputDetailComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCoreModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdIconModule,
    MdInputModule,
    MdTabsModule,
    MdTableModule,
    FormsModule,
    MdSelectModule,
    AlertModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    CdkTableModule,
    MdSortModule,
    CollapsibleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

