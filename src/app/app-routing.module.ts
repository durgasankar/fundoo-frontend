import { AuthGuardService } from "./services/auth-guard.service";
import { DisplayBoxComponent } from "./containers/dashboard/display-box/display-box.component";
import { TrashedNotesComponent } from "./containers/dashboard/trashed-notes/trashed-notes.component";
import { ArchievedNotesComponent } from "./containers/dashboard/archieved-notes/archieved-notes.component";
import { UpdatePasswordComponent } from "./containers/user-authentication/update-password/update-password.component";
import { DashboardComponent } from "./containers/dashboard/dashboard.component";
import { ForgotPasswordComponent } from "./containers/user-authentication/forgot-password/forgot-password.component";
import { LoginComponent } from "./containers/user-authentication/login/login.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegistrationComponent } from "./containers/user-authentication/registration/registration.component";
import { PageNotFoundComponent } from "./containers/page-not-found/page-not-found.component";
import { AccoutActivationComponent } from "./containers/user-authentication/accout-activation/accout-activation.component";
import { RemainderNotesComponent } from "./containers/dashboard/remainder-notes/remainder-notes.component";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "registration", component: RegistrationComponent },
  { path: "verification/:token", component: AccoutActivationComponent },
  { path: "login", component: LoginComponent },
  { path: "forgot-password", component: ForgotPasswordComponent },
  { path: "update-password/:token", component: UpdatePasswordComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    children: [
      {
        path: "",
        redirectTo: "/dashboard/notes",
        pathMatch: "full",
        canActivate: [AuthGuardService]
      },
      {
        path: "notes",
        component: DisplayBoxComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "remainders",
        component: RemainderNotesComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "archieve",
        component: ArchievedNotesComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "trash",
        component: TrashedNotesComponent,
        canActivate: [AuthGuardService]
      }
    ]
  },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
