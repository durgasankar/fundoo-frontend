import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
import {
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatFormFieldModule
} from "@angular/material";
import { PageNotFoundComponent } from "./containers/page-not-found/page-not-found.component";
import { LoginComponent } from './containers/user-authentication/login/login.component';
import { RegistrationComponent } from './containers/user-authentication/registration/registration.component';

const MaterialComponents = [
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatFormFieldModule
];
@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, LoginComponent, RegistrationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialComponents
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
