import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { ExportComponent } from './components/export/export.component';
import {DataTableModule,SharedModule,GrowlModule,DialogModule,ConfirmDialogModule,ConfirmationService,TooltipModule,MessagesModule} from 'primeng/primeng';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import {MessageService} from 'primeng/components/common/messageservice';
import { ErrorDataService } from './services/ErrorData.service';
import { RegistrationDataService } from './services/registration.service';
import { ImagesService } from './services/images.service';
import { AuthGaurd } from './services/authGaurd.service';
import { AuthService } from './services/authentication.service';
import { MasonryModule } from 'angular2-masonry';
import { ImageListComponent } from './components/image-list/image-list.component';
import {MatCardModule,MatFormFieldModule,MatInputModule,MatProgressSpinnerModule,MatProgressBarModule,MatButtonModule} from '@angular/material';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { RequestResponseInterceptor } from './services/httpInterceptor.service';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    TrainingsComponent,
    AnalyticsComponent,
    ExportComponent,
    AddEmployeeComponent,
    ImageListComponent,
    ErrorComponent,
    LoginComponent,
    RegisterComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    DataTableModule,
    SharedModule,
    GrowlModule,
    MessagesModule,
    DialogModule,
    ConfirmDialogModule,
    TooltipModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatButtonModule,
    MasonryModule
  ],
  providers: [ConfirmationService,ErrorDataService,ImagesService,AuthGaurd,AuthService,MessageService,RegistrationDataService,{
    provide: HTTP_INTERCEPTORS,
    useClass: RequestResponseInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
