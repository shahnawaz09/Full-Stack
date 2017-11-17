import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { ExportComponent } from './components/export/export.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { ImageListComponent } from './components/image-list/image-list.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGaurd } from './services/authGaurd.service';

const appRoutes: Routes = [

    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    { path: 'home', component: HomeComponent, canActivate: [AuthGaurd] },
    { path: 'analytics', component: AnalyticsComponent, canActivate: [AuthGaurd]  },
    { path: 'export', component: ExportComponent, canActivate: [AuthGaurd]  },
    { path: 'addEmployee', component: AddEmployeeComponent, canActivate: [AuthGaurd]  },
    {path: 'searchImages', component: ImageListComponent, canActivate: [AuthGaurd] },
    {path: 'error', component: ErrorComponent, canActivate: [AuthGaurd] },

    //otherwise redirect to home
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

