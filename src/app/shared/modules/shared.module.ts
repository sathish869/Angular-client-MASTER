import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { HeaderComponent } from "../components/header/header.component";
import { MaterialModule } from "./material.module";

@NgModule({
    declarations: [
        HeaderComponent,
    ],
    imports: [
        MatIconModule,
        MatToolbarModule,
        MaterialModule,        
    ],
    exports: [
        HeaderComponent,
    ],
  
  })
  export class SharedModule {}