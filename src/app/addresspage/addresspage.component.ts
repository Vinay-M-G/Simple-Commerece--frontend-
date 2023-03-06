import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressModel, AddressPageEndPoints, BasketDetails, UpdateAddress } from './addresspage.model'
import { CookieHandler, CookieVariables } from '../app.CookieHandler';
import { DomainHandler } from '../app.DomainHandler';

@Component({
  selector: 'app-addresspage',
  templateUrl: './addresspage.component.html',
  styleUrls: ['./addresspage.component.css']
})
export class AddresspageComponent implements OnInit {

  constructor(private http : HttpClient , private route:Router) { }

  isBillingAndShippingDifferent : boolean = false;
  isBusnisessUser : boolean = false;

  shippingAddressModel : any[] | undefined
  billingAddressModel : any[] | undefined

  shippingAddressForm = new UpdateAddress();
  billingAddressForm = new UpdateAddress();

  countryList : any[] | undefined

  addressPageEndPoints = new AddressPageEndPoints();
  isRecommendationPresent = false;

  basketDetails = new BasketDetails();
  cookieHandler = new CookieHandler();
  cookieVariables = new CookieVariables(); 
  emailId : String = ""

  shippingAdressCountryCodePopulator : string = "India, +91"
  billingAdressCountryCodePopulator : string = "India, +91"

  isShippingNotificationReceived : boolean = false
  isBillingNotificationReceived : boolean = false
  addressNotificationMessage : string = ""
  addressNotificationBackground : string = ""
  backendHostUrl : string = ""

  ngOnInit(): void {
    this.backendHostUrl = new DomainHandler().getDomain();
    
    this.getRecommendedAddress();

    const headers = new HttpHeaders().append("guid" , this.cookieHandler.extractCookie(this.cookieVariables.tempGuid));

    this.http.get(this.backendHostUrl + this.addressPageEndPoints.getBasketDetails , {'headers' : headers}).subscribe(
      responseBody => {
        this.basketDetails = JSON.parse(JSON.stringify(responseBody))
      }
    )
    
    this.http.get(this.addressPageEndPoints.getCountryList).subscribe(
      responseBody => {
        this.countryList = JSON.parse(JSON.stringify(responseBody))
      }
    )
  }

  sendShippingAddress(shippingDetails : NgForm){
    console.log(shippingDetails)

    var shippingAddressRequestBody = new UpdateAddress();
    shippingAddressRequestBody.line1 = shippingDetails.form.controls['addressLine1'].value;
    shippingAddressRequestBody.line2 = shippingDetails.form.controls['addressLine2'].value;
    shippingAddressRequestBody.city = shippingDetails.form.controls['city'].value;
    shippingAddressRequestBody.phoneNumber = shippingDetails.form.controls['phoneNumber'].value;
    shippingAddressRequestBody.pincode = shippingDetails.form.controls['pinCode'].value;
    shippingAddressRequestBody.addressTitle = shippingDetails.form.controls['addressTitle'].value;
    shippingAddressRequestBody.state = shippingDetails.form.controls['state'].value;

    if(this.isBusnisessUser){
      shippingAddressRequestBody.companyName = shippingDetails.form.controls['company'].value;
    }

    var countryCode: string = shippingDetails.form.controls['countryCode'].value;

    shippingAddressRequestBody.country = countryCode.split(", ")[0];
    shippingAddressRequestBody.countryCode = countryCode.split(", ")[1];

    shippingAddressRequestBody.isBillingAddress = false;
    shippingAddressRequestBody.isBusinessOrder = this.isBusnisessUser;

    const headers = new HttpHeaders().append("guid" , this.cookieHandler.extractCookie(this.cookieVariables.tempGuid)).append("content-type", "application/json");
    
    this.http.post(this.backendHostUrl + this.addressPageEndPoints.updateAddressDetails , 
      JSON.parse(JSON.stringify(shippingAddressRequestBody)) , {'headers' : headers}).subscribe(
        responseBody => {
          console.log(responseBody)

          if(!this.isBillingAndShippingDifferent){

            shippingAddressRequestBody.isBillingAddress = true;
      
            this.http.post(this.backendHostUrl + this.addressPageEndPoints.updateAddressDetails , 
              JSON.parse(JSON.stringify(shippingAddressRequestBody)) , {'headers' : headers}).subscribe(
                responseBody => {
                  console.log(responseBody)
                   
                  this.isShippingNotificationReceived = true
                  this.addressNotificationMessage = "Address updated successfully"
                  this.addressNotificationBackground = "bg-success"

                  setTimeout(() => {
                    this.isShippingNotificationReceived = false
                  }, 3000)
            
                },(error : HttpErrorResponse) => {
                  console.log(error)
                  
                  if(error.status == 404 || error.status == 409){
                    this.isShippingNotificationReceived = true
                    this.addressNotificationMessage = "Address was not updated successfully"
                    this.addressNotificationBackground = "bg-danger"

                    setTimeout(() => {
                      this.isShippingNotificationReceived = false
                    }, 3000)
                  }

                }
            )
          }

        },(error : HttpErrorResponse) => {
          console.log(error)
        }
    ) 
    
  }

  getBusnisessValue(){
    var busnisessOption = document.querySelector('input[name="busnisess"]:checked')?.id;
    return busnisessOption
  }

  billingAndShippingDifferent(){
    this.isBillingAndShippingDifferent = !(this.isBillingAndShippingDifferent)
  }

  sendBillingAddress(billingDetails : NgForm){
    console.log(billingDetails)

    var billingAddressRequestBody = new UpdateAddress();
    billingAddressRequestBody.line1 = billingDetails.form.controls['addressLine1'].value;
    billingAddressRequestBody.line2 = billingDetails.form.controls['addressLine2'].value;
    billingAddressRequestBody.city = billingDetails.form.controls['city'].value;
    billingAddressRequestBody.phoneNumber = billingDetails.form.controls['phoneNumber'].value;
    billingAddressRequestBody.pincode = billingDetails.form.controls['pinCode'].value;
    billingAddressRequestBody.addressTitle = billingDetails.form.controls['addressTitle'].value;
    billingAddressRequestBody.state = billingDetails.form.controls['state'].value;

    if(this.isBusnisessUser){
      billingAddressRequestBody.companyName = billingDetails.form.controls['company'].value;
    }

    var countryCode: string = billingDetails.form.controls['countryCode'].value;

    billingAddressRequestBody.country = countryCode.split(", ")[0];
    billingAddressRequestBody.countryCode = countryCode.split(", ")[1];

    billingAddressRequestBody.isBillingAddress = true;
    billingAddressRequestBody.isBusinessOrder = this.isBusnisessUser;

    const headers = new HttpHeaders().append("guid" , this.cookieHandler.extractCookie(this.cookieVariables.tempGuid)).append("content-type", "application/json");
    
    this.http.post(this.backendHostUrl + this.addressPageEndPoints.updateAddressDetails , 
      JSON.parse(JSON.stringify(billingAddressRequestBody)) , {'headers' : headers}).subscribe(
        responseBody => {
          console.log(responseBody)
          this.addressNotificationMessage = "Billing Address updated successfully"
          this.addressNotificationBackground = "bg-success"
          this.isBillingNotificationReceived = true

          setTimeout(() => {
            this.isBillingNotificationReceived = false
          }, 3000)

        },(error : HttpErrorResponse) => {
          console.log(error)

          if(error.status == 409 || error.status == 404){
            this.addressNotificationMessage = "Billing Address not updated successfully"
            this.addressNotificationBackground = "bg-danger"
            this.isBillingNotificationReceived = true
            setTimeout(() => {
              this.isBillingNotificationReceived = false
            }, 3000)
          }
          
        }
    ) 
  }

  isOfferPricePresent(offerPrice : number, basePrice : number){

    if(offerPrice != null && (basePrice - offerPrice) > 0){
      return true
    }else{
      return false
    }
  }

  getRecommendedAddress(){
    var endPoint = this.backendHostUrl + this.addressPageEndPoints.getRecommendedAddressDetails(this.getBusnisessValue())
    const headers = new HttpHeaders().append("guid" , this.cookieHandler.extractCookie(this.cookieVariables.tempGuid))

    if(this.getBusnisessValue() == 'B2B'){
      this.isBusnisessUser = true
    }else{
      this.isBusnisessUser = false
    }

    this.http.get(endPoint, {'headers' : headers}).subscribe(
      responseBody => {
        var baseAddressModel = new AddressModel();
        
        baseAddressModel = JSON.parse(JSON.stringify(responseBody));
        this.emailId = baseAddressModel.emailId

        console.log(baseAddressModel)
        if(baseAddressModel.addressValues != undefined){
            this.shippingAddressModel = baseAddressModel.addressValues.filter(function(element) {
              return element.addressType === 'SHIPPING'
          })

          this.billingAddressModel = baseAddressModel.addressValues.filter(function(element) {
            return element.addressType === 'BILLING'
          })

          this.isRecommendationPresent = true
        }
        
      }
    )
    
  }

  updateShippingForm(line1: String, line2: String, contactNumber: String, countryCode : string, country : string,
    city: String, state: String, pincode: String, addressTitle : String, companyName: String){

      this.shippingAddressForm.line1 = line1;
      this.shippingAddressForm.line2 = line2;
      this.shippingAddressForm.phoneNumber = contactNumber;
      this.shippingAddressForm.countryCode = countryCode;
      this.shippingAddressForm.country = country;
      this.shippingAddressForm.city = city;
      this.shippingAddressForm.pincode = pincode;
      this.shippingAddressForm.state = state
      this.shippingAddressForm.addressTitle = addressTitle;
      this.shippingAddressForm.companyName = companyName;
      this.shippingAdressCountryCodePopulator = country + ", " +countryCode;

  }

  updateBillingForm(line1: String, line2: String, contactNumber: String, countryCode : String, country : String,
    city: String, state: String, pincode: String, addressTitle : String, companyName: String){

      this.billingAddressForm.line1 = line1;
      this.billingAddressForm.line2 = line2;
      this.billingAddressForm.phoneNumber = contactNumber;
      this.billingAddressForm.countryCode = countryCode;
      this.billingAddressForm.country = country;
      this.billingAddressForm.city = city;
      this.billingAddressForm.pincode = pincode;
      this.billingAddressForm.state = state
      this.billingAddressForm.addressTitle = addressTitle;
      this.billingAddressForm.companyName = companyName;
      this.billingAdressCountryCodePopulator = country + ", " + countryCode;

  }

  navigateToBasketPage(){
    this.route.navigate(['/basket'])
  }

  navigateToDelieryAndPayment(){
    this.route.navigate(['/finalsteps'])
  }

  updateCountryCodeDisplayBox(country: string, countryCode : string, isShipping : boolean){
      if(isShipping){
        this.shippingAdressCountryCodePopulator = country + ", +" + countryCode;
      }else{
        this.billingAdressCountryCodePopulator =  country + ", +" + countryCode;
      }
  }

}
