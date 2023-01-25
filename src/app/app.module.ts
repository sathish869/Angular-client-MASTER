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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppRoutingModule } from './routing/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginPageComponent,
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
    MatSnackBarModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
})
export class AppModule {}
