import { NgModule } from "@angular/core";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material/snack-bar";
import { SharedModule } from "../shared/modules/shared.module";
import { UserModule } from "../user/user.module";
import { AppComponent } from "./components/app/app.component";
import { AppRoutingModule } from "./routes/app-routing.module";
import { HeaderComponent } from "./components/header/header.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  
  bootstrap: [AppComponent],
  imports: [
    SharedModule,
    UserModule,
    AppRoutingModule,
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2000}}
  ]
})
export class AppModule {}
