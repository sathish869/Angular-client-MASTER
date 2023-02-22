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
import { MatCardModule} from '@angular/material/card';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeOfAppModule } from './appStore/app-store.module';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginPageComponent,
    HeaderComponent,
    UserDetailComponent,
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
    MatCardModule,
    MatFormFieldModule,
    AppRoutingModule,
    MatInputModule,
    MatTooltipModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    StoreRouterConnectingModule,
    EffectsModule.forRoot(storeOfAppModule.allEffects),
    StoreModule.forRoot(storeOfAppModule.allReducers),
    
  ],
})
export class AppModule {}
