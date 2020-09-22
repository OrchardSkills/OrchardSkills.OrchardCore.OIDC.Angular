import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SigninCallbackComponent } from './signin-callback/signin-callback.component';
import { SignoutCallbackComponent } from './signout-callback/signout-callback.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'contact-us', loadChildren: () => import('./contact-us/contact-us.module').then(m => m.ContactUsModule)},
  {path: 'signin-callback', component: SigninCallbackComponent},
  {path: 'signout-callback', component: SignoutCallbackComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
