import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatListModule} from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { ProgressSpinnerComponent } from './list-of-user/progress-spinner/progress-spinner.component';
import { HeaderComponent } from './header/header.component';
import { AppComponent } from './app.component';
import { ListOfUserComponent } from "./list-of-user/list-of-user.component";

@NgModule({
    declarations: [AppComponent,
        HeaderComponent,
        ListOfUserComponent,
        ProgressSpinnerComponent],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        MatProgressSpinnerModule,
        HttpClientModule,
        MatListModule,
        ReactiveFormsModule,
    ]    
})
export class AppModule {}
