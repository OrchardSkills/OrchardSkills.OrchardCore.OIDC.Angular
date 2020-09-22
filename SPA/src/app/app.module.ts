import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { SigninCallbackComponent } from './signin-callback/signin-callback.component';
import { SignoutCallbackComponent } from './signout-callback/signout-callback.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninCallbackComponent,
    SignoutCallbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
