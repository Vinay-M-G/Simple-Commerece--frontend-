import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddresspageComponent } from './addresspage/addresspage.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { UserBasketComponent } from './user-basket/user-basket.component';
import { WelcomeAndUserRegistrationComponent } from './welcome-and-user-registration/welcome-and-user-registration.component';

const routes: Routes = [
  {
    path : '',
    component : WelcomeAndUserRegistrationComponent
  },
  {
    path : 'productListing',
    component : ProductListingComponent
  },
  {
    path : 'basket',
    component : UserBasketComponent
  },
  {
    path : 'address',
    component : AddresspageComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
