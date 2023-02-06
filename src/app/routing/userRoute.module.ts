import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserDetailComponent } from '../user/user-detail/user-detail.component';
import { userDetailResolverService } from '../user/user-detail/user-detailResolver.service';
import { UserComponent } from '../user/user.component';

const loginRoutes = [
  {
    path: '',
    component: UserComponent,
  },
  {
    path:':username',
    component:UserDetailComponent,
    resolve: [userDetailResolverService],
  }
];

@NgModule({
  imports: [RouterModule.forChild(loginRoutes)],
  exports: [RouterModule],
})
export class userRouteModule {}
