import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieHandler, CookieVariables } from '../app.CookieHandler';
import { DomainHandler } from '../app.DomainHandler';
import { AddressModel, BasketDetails, DeliveryAndPaymentPageEndPoints, ErrorModel, OrderCreatedModel } from './delivery-and-payment.model';

@Component({
  selector: 'app-delivery-and-payment',
  templateUrl: './delivery-and-payment.component.html',
  styleUrls: ['./delivery-and-payment.component.css']
})

export class DeliveryAndPaymentComponent implements OnInit {

  constructor( private http : HttpClient, private route:Router) { }

  basketDetails = new BasketDetails();
  cookieHandler = new CookieHandler();
  cookieVariables = new CookieVariables(); 
  delAndPayPageEndpoints = new DeliveryAndPaymentPageEndPoints()
  backendHostUrl : string = ""
  addressModel = new AddressModel();
  isDeliveryServiceSelected : boolean = false;
  orderCreatedModel = new OrderCreatedModel();
  errorModel = new ErrorModel();

  ngOnInit(): void {
    this.backendHostUrl = new DomainHandler().getDomain();
    const headers = new HttpHeaders().append("guid" , this.cookieHandler.extractCookie(this.cookieVariables.tempGuid));

    this.http.get(this.backendHostUrl + this.delAndPayPageEndpoints.getBasketDetails , {'headers' : headers}).subscribe(
      responseBody => {
        this.basketDetails = JSON.parse(JSON.stringify(responseBody))
        this.isSelectedDeliveryServicePresent()
      }
    );

    this.http.get(this.backendHostUrl + this.delAndPayPageEndpoints.getCartAddress, {'headers' : headers}).subscribe(
      responseBody => {
        console.log(responseBody)
        this.addressModel = JSON.parse(JSON.stringify(responseBody))
      }
    );

  }

  getStyleValueForDeliveryService(isSelected : boolean){
    if(isSelected){
      return "selected-delivery-range-card"
    }else{
      return "delivery-range-card"
    }
  }

  isOfferPricePresent(offerPrice : number, basePrice : number){

    if(offerPrice != null && (basePrice - offerPrice) > 0){
      return true
    }else{
      return false
    }
  }

  isShippingAddress(addressType : String){
    if(addressType == "SHIPPING"){
      return true;
    }else{
      return false;
    }
  }

  updateDeliveryService(deliveryServiceId : string){
    var url = this.backendHostUrl + this.delAndPayPageEndpoints.updateDeliveryService + deliveryServiceId
    const headers = new HttpHeaders().append("guid" , this.cookieHandler.extractCookie(this.cookieVariables.tempGuid));

    this.http.post(url , null, {'headers' : headers} ).subscribe(
      responseBody => {
        console.log(responseBody)
        this.isDeliveryServiceSelected =  true
        window.location.reload()
      }
    );
  }

  isSelectedDeliveryServicePresent(){
    
    for(var index = 0; index < this.basketDetails.basketDeliveryServices.length; index++){
      if(this.basketDetails.basketDeliveryServices[index].isServiceSelected){
        this.isDeliveryServiceSelected = true
        break
      }
    }
  }

  placeOrder(orderTotal : number){

    if(!this.isDeliveryServiceSelected){
      alert("Please select anyone of the offered delivery service")
      return
    }

    var url = this.backendHostUrl + this.delAndPayPageEndpoints.confirmOrder + orderTotal
    const headers = new HttpHeaders().append("guid" , this.cookieHandler.extractCookie(this.cookieVariables.tempGuid));
    
    this.http.post(url , null, {'headers' : headers} ).subscribe(
      responseBody => {
        console.log(responseBody)
        this.orderCreatedModel = JSON.parse(JSON.stringify(responseBody))
        this.cookieHandler.addCookie(this.cookieVariables.orderId, this.orderCreatedModel.orderId)
        this.route.navigate(['/orderConfirmation'])
      },(err : HttpErrorResponse) => {

        if(err.status == 409){

          this.errorModel = JSON.parse(JSON.stringify(err.error))
          alert(this.errorModel.message)
          window.location.reload()
          return
        }

        if(err.status == 404){
          this.errorModel = JSON.parse(JSON.stringify(err.error))
          alert(this.errorModel.message)
          return
        }
      }
    );

  }

}
