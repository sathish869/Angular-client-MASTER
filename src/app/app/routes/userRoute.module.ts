import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserComponent } from '../../user/components/user/user.component';

const userRoutes = [
  {
    path: '',
    component: UserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class userRouteModule {}
