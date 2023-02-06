import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appsRoute: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  {
    path: 'users',
    loadChildren: () =>
      import('./userRoute.module').then((m) => m.userRouteModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./loginRoute.module').then((m) => m.loginRouteModule),
  },
  
];

@NgModule({
  imports: [RouterModule, RouterModule.forRoot(appsRoute)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
