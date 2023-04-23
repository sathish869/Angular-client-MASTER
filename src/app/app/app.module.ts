import { NgModule } from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { SharedModule } from '../shared/modules/shared.module';
import { UserModule } from '../user/user.module';
import { AppComponent } from './components/app/app.component';
import { AppRoutingModule } from './routes/app-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeOfAppModule } from '../app/app-store/app-store.module';
import { environment } from 'src/environments/environment';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [AppComponent,HeaderComponent],

  bootstrap: [AppComponent],
  imports: [
    SharedModule,
    UserModule,
    AppRoutingModule,
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    EffectsModule.forRoot(storeOfAppModule.allEffects),
    StoreModule.forRoot(storeOfAppModule.allReducers),
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2000 } },
  ],
})
export class AppModule {}
