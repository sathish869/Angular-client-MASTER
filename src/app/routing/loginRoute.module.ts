import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginPageComponent } from '../login-page/login-page.component';
import { UserDetailComponent } from '../user/user-detail/user-detail.component';


const loginRoutes = [
  {
    path: '',
    component: LoginPageComponent,
  },
  {
    path: ':user',
    component: UserDetailComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(loginRoutes)],
  exports: [RouterModule],
})
export class loginRouteModule {}
