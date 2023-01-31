import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthInterceptorService } from './auth-interceptor.service';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { MatTooltipModule } from '@angular/material/tooltip'
import { LoginPageComponent } from './login-page/login-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppRoutingModule } from './routing/app-routing.module';
import { HeaderComponent } from './login-page/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginPageComponent,
    HeaderComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    AppRoutingModule,
    MatInputModule,
    MatTooltipModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule
  ],
})
export class AppModule {}
