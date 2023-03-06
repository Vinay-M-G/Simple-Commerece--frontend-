import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeAndUserRegistrationComponent } from './welcome-and-user-registration/welcome-and-user-registration.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { HttpClientModule, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Observable } from 'rxjs';
import { UserBasketComponent } from './user-basket/user-basket.component';
import { AddresspageComponent } from './addresspage/addresspage.component';
import { DeliveryAndPaymentComponent } from './delivery-and-payment/delivery-and-payment.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';

@Injectable()
export class CustomInterceptor implements HttpInterceptor { 
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
        request = request.clone({
            withCredentials: true
        });
    
        return next.handle(request);
    }
}

@NgModule({
  declarations: [
    AppComponent,
    WelcomeAndUserRegistrationComponent,
    ProductListingComponent,
    UserBasketComponent,
    AddresspageComponent,
    DeliveryAndPaymentComponent,
    OrderConfirmationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor , multi : true}
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
