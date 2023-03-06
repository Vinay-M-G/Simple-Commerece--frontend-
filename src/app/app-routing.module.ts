import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddresspageComponent } from './addresspage/addresspage.component';
import { DeliveryAndPaymentComponent } from './delivery-and-payment/delivery-and-payment.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
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
  },
  {
    path : 'finalsteps',
    component : DeliveryAndPaymentComponent
  },
  {
    path : 'orderConfirmation',
    component : OrderConfirmationComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
