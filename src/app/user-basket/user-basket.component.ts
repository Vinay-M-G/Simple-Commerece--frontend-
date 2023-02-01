import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasketDetails, BasketPageEndPoints } from './user-basket.model';
import { CookieHandler, CookieVariables } from '../app.CookieHandler';

@Component({
  selector: 'app-user-basket',
  templateUrl: './user-basket.component.html',
  styleUrls: ['./user-basket.component.css']
})
export class UserBasketComponent implements OnInit {

  constructor(private http : HttpClient , private route:Router) { }

  basketDetails = new BasketDetails();
  cookieHandler = new CookieHandler();
  cookieVariables = new CookieVariables();
  basketPageEndPoints = new BasketPageEndPoints();
  productMaxCount = 99

  ngOnInit(): void {

    const headers = new HttpHeaders().append("guid" , this.cookieHandler.extractCookie(this.cookieVariables.tempGuid))
    console.log(headers)
    this.http.get(this.basketPageEndPoints.getBasketDetails , {'headers' : headers}).subscribe(
      responseBody => {
        console.log(responseBody)
        this.basketDetails = JSON.parse(JSON.stringify(responseBody))
      }
    )
  }

  updateService(serviceCode : string, serviceStatus : boolean, productCode : string){
    
    const url = this.basketPageEndPoints.basketProductServiceUpdate(productCode, serviceCode, !serviceStatus);
    const headers = new HttpHeaders().append("guid" , this.cookieHandler.extractCookie(this.cookieVariables.tempGuid))
    this.http.patch(url, null, {'headers' : headers}).subscribe(
      responseBody => {
        console.log(responseBody)
        window.location.reload()
      }
    )
  }

  updateProductQuantity(productCode : string, prodQuantity : string){
    
    var quantity = Number(prodQuantity)
    if((quantity < 1 || quantity > this.productMaxCount) && (quantity != 0)){
      for(var i = 0; i < this.basketDetails.products.length; i++){
        if(this.basketDetails.products[i].productId == productCode){
          alert("Invalid Quantity")
          this.basketDetails.products[i].quantity = quantity
          break
        }

      }

      return
    }

    const url = this.basketPageEndPoints.basketProductUpdate(productCode, quantity)
    const headers = new HttpHeaders().append("guid" , this.cookieHandler.extractCookie(this.cookieVariables.tempGuid))
    this.http.patch(url , null, {'headers' : headers}).subscribe(
      responseBody => {
        console.log(responseBody)
        window.location.reload()
      }
    )
  }

  productIncrementButton(productCode : string , prodQuantity : string){

    var quantity = Number(prodQuantity) + 1
    this.updateProductQuantity(productCode, String(quantity))

  }

  productDecrementButton(productCode : string, prodQuantity : string){

    var quantity = Number(prodQuantity) - 1
    this.updateProductQuantity(productCode, String(quantity))

  }

  removeProduct(productCode : string){
    this.updateProductQuantity(productCode, String(0));
  }

  getServiceAttribute(status : boolean){
    if(status){
      return "active"
    }else{
      return null
    }
  }

  isOfferPricePresent(offerPrice : number, basePrice : number){

    if(offerPrice != null && (basePrice - offerPrice) > 0){
      return true
    }else{
      return false
    }
  }

  isDecrementalButtonDisabled(prodQuantity : string){

    var quantity = Number(prodQuantity)

    if( quantity <= 1){
      return "disabled"
    }else{
      return null
    }
  }

  isIncrementalButtonDisabled(prodQuantity : string){

    var quantity = Number(prodQuantity)

    if( quantity >= this.productMaxCount){
      return "disabled"
    }else{
      return null
    }
  }

  navigateToListingPage(){
    this.route.navigate(['/productListing'])
  }

  navigateToAddressPage(){
    this.route.navigate(['/address'])
  }

}
