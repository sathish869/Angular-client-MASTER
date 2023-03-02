import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { AppComponent } from './app.component';
import { ListOfUserComponent } from './list-of-user/list-of-user.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, ListOfUserComponent],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatListModule,
    MatToolbarModule,
    ReactiveFormsModule,
  ],
})
export class AppModule {}
