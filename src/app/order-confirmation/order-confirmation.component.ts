import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomainHandler } from '../app.DomainHandler';
import { OrderConfirmationPageEndPoints, OrderModel, ProductModel } from './order-confirmation.model';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {

  constructor(private http : HttpClient, private route : Router) { }

  orderModel = new OrderModel();
  productModel = new ProductModel();
  orderConfirmationPageEndPoints = new OrderConfirmationPageEndPoints();
  backendHostUrl : string = ""
  orderProductEntries : any[] | undefined
  orderServiceEntries : any[] | undefined
  imageUrls : string[] = []

  ngOnInit(): void {

    this.backendHostUrl = new DomainHandler().getDomain();
    this.http.get(this.backendHostUrl + this.orderConfirmationPageEndPoints.getOrderEndPoint()).subscribe(

      responseBody => {
        console.log(responseBody)
        this.orderModel = JSON.parse(JSON.stringify(responseBody));

        this.orderProductEntries = this.orderModel.OrderEntries.filter( function (element) {
          return element.entryId.length == 1
        });

        this.orderServiceEntries = this.orderModel.OrderEntries.filter( function (element) {
          return element.entryId.length == 2
        });

        for(var index = 0; index < this.orderProductEntries.length; index++){
          this.getProductUrl(this.orderProductEntries[index].entryCode)
        }

      }
    );

  }

  isShippingAddress(addressType : string){
    if(addressType == "SHIPPING"){
      return true
    }else{
      return false
    }
  }

  isDeliveryEntry(entryCode : string){
    if(entryCode == "DEL"){
      return true
    }else{
      return false
    }
  }

  isOfferPricePresent(offerPrice : number, basePrice : number){

    if(offerPrice != null && (basePrice - offerPrice) > 0){
      return true
    }else{
      return false
    }
  }

  isServiceElementAssociatedToProduct(productEntryId : string, serviceEntryId : string){
    if(serviceEntryId.startsWith(productEntryId)){
      return true
    }else{
      return false
    }
  }

  getProductUrl(productId : string){

    this.http.get( this.backendHostUrl + this.orderConfirmationPageEndPoints.singleProductEndPoint + productId).subscribe(

      responseBody =>{
        this.productModel = JSON.parse(JSON.stringify(responseBody))
        this.imageUrls.push(this.productModel.productUrl)
      }
    )
    
  }

  

}
