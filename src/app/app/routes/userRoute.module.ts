import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { userDetailResolver } from '../../user/resolver/user-detail-resolver';
import { UserDetailComponent } from '../../user/components/user-detail/user-detail.component';
import { UserComponent } from '../../user/components/user/user.component';

const userRoutes = [
  {
    path: '',
    component: UserComponent,
  },
  {
    path: ':username',
    component: UserDetailComponent,
    resolve: [userDetailResolver],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class userRouteModule {}
