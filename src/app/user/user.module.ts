import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../shared/modules/material.module';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserComponent } from './components/user/user.component';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';

@NgModule({
  declarations: [LoginPageComponent, UserComponent, UserDetailComponent],
  imports: [MaterialModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  exports: [LoginPageComponent, UserComponent, UserDetailComponent],
})
export class UserModule {}
