import { DashboardComponent } from "./containers/dashboard/dashboard.component";
import { ForgotPasswordComponent } from "./containers/user-authentication/forgot-password/forgot-password.component";
import { LoginComponent } from "./containers/user-authentication/login/login.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegistrationComponent } from "./containers/user-authentication/registration/registration.component";
import { PageNotFoundComponent } from "./containers/page-not-found/page-not-found.component";
import { AccoutActivationComponent } from "./containers/user-authentication/accout-activation/accout-activation.component";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "registration", component: RegistrationComponent },
  { path: "verification/:token", component: AccoutActivationComponent },
  { path: "login", component: LoginComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "forgotPassword", component: ForgotPasswordComponent },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
