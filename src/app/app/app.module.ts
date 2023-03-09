import { NgModule } from "@angular/core";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material/snack-bar";
import { MaterialModule } from "../shared/modules/material.module";
import { SharedModule } from "../shared/modules/shared.module";
import { UserModule } from "../user/user.module";
import { AppComponent } from "./components/app/app.component";
import { AppRoutingModule } from "./routes/app-routing.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  
  bootstrap: [AppComponent],
  imports: [
    SharedModule,
    UserModule,
    MaterialModule,
    AppRoutingModule,
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2000}}
  ]
})
export class AppModule {}
