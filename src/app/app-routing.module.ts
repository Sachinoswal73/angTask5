import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HodDashboardComponent } from './hod-dashboard/hod-dashboard.component';
import { StaffDashboardComponent } from './staff-dashboard/staff-dashboard.component';
import { AuthGuard } from './shared/auth-guard.service';

const routes: Routes = [
  { path : '', component : LoginComponent },
  { path : 'register', component : RegisterComponent },
  { path : 'dashboardhod/:uid', canActivate:[AuthGuard], component : HodDashboardComponent},
  // { path : 'dashboardhod/:uid', component : HodDashboardComponent},
  { path : 'dashboardstaff/:uid', canActivate:[AuthGuard], component : StaffDashboardComponent },
  // { path : 'dashboardstaff/:uid', component : StaffDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
