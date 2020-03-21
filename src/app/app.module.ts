import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AmazingTimePickerModule } from "amazing-time-picker";
import {
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatSnackBarModule,
  MatGridListModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatDatepickerModule,
  MatRadioModule,
  MatSliderModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatStepperModule,
  MatTabsModule,
  MatExpansionModule,
  MatButtonToggleModule,
  MatChipsModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatDialogModule,
  MatTooltipModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule
} from "@angular/material";

import { LoginComponent } from "./containers/user-authentication/login/login.component";
import { RegistrationComponent } from "./containers/user-authentication/registration/registration.component";
import { PageNotFoundComponent } from "./containers/page-not-found/page-not-found.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { LogoComponent } from "./containers/logo/logo.component";
import { ForgotPasswordComponent } from "./containers/user-authentication/forgot-password/forgot-password.component";
import { DashboardComponent } from "./containers/dashboard/dashboard.component";
import { AccoutActivationComponent } from "./containers/user-authentication/accout-activation/accout-activation.component";
import { UpdatePasswordComponent } from "./containers/user-authentication/update-password/update-password.component";
import { DisplayBoxComponent } from "./containers/dashboard/display-box/display-box.component";
import { DisplayNotesComponent } from "./containers/dashboard/display-notes/display-notes.component";
import { ArchievedNotesComponent } from "./containers/dashboard/archieved-notes/archieved-notes.component";
import { RemainderNotesComponent } from "./containers/dashboard/remainder-notes/remainder-notes.component";
import { TrashedNotesComponent } from "./containers/dashboard/trashed-notes/trashed-notes.component";
import { PinnedNotesComponent } from "./containers/dashboard/pinned-notes/pinned-notes.component";
import { SimpleNoteComponent } from "./containers/dashboard/simple-note/simple-note.component";
import { UpdateNoteComponent } from "./containers/dashboard/update-note/update-note.component";
import { IconListComponent } from "./containers/dashboard/icon-list/icon-list.component";
import { EditLabelComponent } from "./containers/dashboard/labels/edit-label/edit-label.component";
const MaterialModule = [
  BrowserModule,
  BrowserAnimationsModule,
  MatCheckboxModule,
  MatCheckboxModule,
  MatButtonModule,
  MatInputModule,
  MatAutocompleteModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatStepperModule,
  MatTabsModule,
  MatExpansionModule,
  MatButtonToggleModule,
  MatChipsModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatDialogModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule
];
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegistrationComponent,
    LogoComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    AccoutActivationComponent,
    UpdatePasswordComponent,
    DisplayBoxComponent,
    DisplayNotesComponent,
    ArchievedNotesComponent,
    RemainderNotesComponent,
    TrashedNotesComponent,
    PinnedNotesComponent,
    SimpleNoteComponent,
    UpdateNoteComponent,
    IconListComponent,
    EditLabelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    NgxSpinnerModule,
    HttpClientModule,
    ReactiveFormsModule,
    AmazingTimePickerModule
  ],
  // any type of dialogue box opening for mat label
  entryComponents: [UpdateNoteComponent, EditLabelComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
