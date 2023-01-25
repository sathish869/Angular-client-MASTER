import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserComponent } from '../user/user.component';

const loginRoutes = [
  {
    path: '',
    component: UserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(loginRoutes)],
  exports: [RouterModule],
})
export class userRouteModule {}
