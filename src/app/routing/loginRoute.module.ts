import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginPageComponent } from '../login-page/login-page.component';


const loginRoutes = [
  {
    path: '',
    component: LoginPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(loginRoutes)],
  exports: [RouterModule],
})
export class loginRouteModule {}
