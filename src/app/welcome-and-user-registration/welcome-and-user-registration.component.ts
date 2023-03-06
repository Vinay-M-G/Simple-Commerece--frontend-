import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient , HttpErrorResponse} from '@angular/common/http';
import { WelcomePageModel, guestUserAction, EndPointCollections, CreateAccountAction, RegisteredUserAction, ErrorMessages, AuthenticationResponseBody } from "./welcome-and-user-registration.model";
import { CookieHandler, CookieVariables } from '../app.CookieHandler';
import { DomainHandler } from '../app.DomainHandler';

@Component({
  selector: 'app-welcome-and-user-registration',
  templateUrl: './welcome-and-user-registration.component.html',
  styleUrls: ['./welcome-and-user-registration.component.css']
})
export class WelcomeAndUserRegistrationComponent implements OnInit {

  constructor(private route : Router, private http : HttpClient) { }

  errorPresent = false
  errorMessage : string = ""

  welcomePageContent : WelcomePageModel[] = []
  endPoints = new EndPointCollections()

  errorMessages = new ErrorMessages()
  guestUserRequestBody = new guestUserAction()
  loginRequestBody = new RegisteredUserAction()
  createAccountRequestBody = new CreateAccountAction()
  authenticationResponseBody = new AuthenticationResponseBody()
  cookieVariables = new CookieVariables()
  cookieHandler = new CookieHandler()
  premiumProductIndex : number = 0
  premiumProductsCount : number = 0

  backendHostUrl : string = ""
  availableUserType : string[] = ["GUEST", "REGISTERED", "REQUESTTOCREATEACCOUNT"] 

  ngOnInit(): void {

    this.backendHostUrl = new DomainHandler().getDomain();
    this.cookieHandler.deleteAllCookies();
    
    this.http.get(this.backendHostUrl + this.endPoints.welcomePageRequestUrl).subscribe(
      responseBody =>{
        this.welcomePageContent[0] = JSON.parse(JSON.stringify(responseBody))
        this.premiumProductsCount = this.welcomePageContent[0].premiumProducts.length;
      }  
    );

  }

  timmerDummyConstant = setInterval(() => {

    if(this.premiumProductIndex < this.premiumProductsCount){
      this.premiumProductIndex++;
      
    }else{
      this.premiumProductIndex = 0;
      
    }
  }, 5000);

  
  userType : string = this.availableUserType[0]


  guestUser(){
    this.userType = this.availableUserType[0]
    console.log(this.userType)
  }

  loggedInUser(){
    this.userType = this.availableUserType[1]
    console.log(this.userType)
  }

  createUser(){
    this.userType = this.availableUserType[2]
    console.log(this.userType)
  }

  isUserTypeGuest(){
    if(this.userType.match("GUEST")){
      return true
    }else{
      return false
    }
  }

  isUserTypeRegistered(){
    if(this.userType.match("REGISTERED")){
      return true
    }else{
      return false
    }
  }

  isUserTypeAccountCreation(){
    if(this.userType.match("REQUESTTOCREATEACCOUNT")){
      return true
    }else{
      return false
    }
  }

  isPasswordSame(password : string , confirmedPassword : string){
    if(password == confirmedPassword){
      return true
    } else{
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

  isValidEmail(emailId : string){
    var mailformat =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return mailformat.test(emailId)
  }

  sendRequestForGuest(guestUserDetails : NgForm){

    this.errorPresent = false;

    // Request body builder
    console.log(guestUserDetails)
    this.guestUserRequestBody.email = guestUserDetails.form.controls['guestUserEmail'].value
    this.guestUserRequestBody.firstName = guestUserDetails.form.controls['guestUserName'].value
    this.guestUserRequestBody.lastName = "Test"
    
    //email validation  
    if(!this.isValidEmail(this.guestUserRequestBody.email)){
      this.errorPresent = true;
      this.errorMessage = this.errorMessages.emailIdInValid;

      setTimeout(() => {
        this.errorPresent = false;
      }, 3000);

      return
    } 
    
    //Parsing to JSON Format
    const jsonBody = JSON.parse(JSON.stringify(this.guestUserRequestBody))

    //Configuring Headers
    const headers = { 'content-type': 'application/json'}

    //Post Call to Server to create guest user
    this.http.post( this.backendHostUrl + this.endPoints.guestUserActionEndPoint, jsonBody, {'headers': headers}).subscribe(
      response =>{  
        console.log(response)

        this.authenticationResponseBody = JSON.parse(JSON.stringify(response))
        this.cookieHandler.addCookie(this.cookieVariables.tempGuid , this.authenticationResponseBody.guid)

        this.route.navigate(['/productListing'])
      },(err:HttpErrorResponse)=>{

        if(err.status == 409){
          this.authenticationResponseBody = JSON.parse(JSON.stringify(err.error))
          this.errorPresent = true;
          this.errorMessage = this.authenticationResponseBody.errorMessage;

          setTimeout(() => {
            this.errorPresent = false;
          }, 3000);

        }
        
      }
    )

  }

  sendRequestForRegistered(registeredUserDetails : NgForm){

    this.errorPresent = false;

    // Request body builder
    console.log(registeredUserDetails)
    this.loginRequestBody.email = registeredUserDetails.form.controls['registeredUserEmail'].value
    this.loginRequestBody.password = registeredUserDetails.form.controls['registeredUserPassword'].value

    if(!this.isValidEmail(this.loginRequestBody.email)){
      this.errorPresent = true;
      this.errorMessage = this.errorMessages.emailIdInValid;

      setTimeout(() => {
        this.errorPresent = false;
      }, 3000);

      return
    }

    //Parsing to JSON Format
    const jsonBody = JSON.parse(JSON.stringify(this.loginRequestBody))
    console.log(jsonBody)

    //Configuring Headers
    const headers = { 'content-type': 'application/json'}

    //Post Call to Server to create guest user
    this.http.post( this.backendHostUrl + this.endPoints.loginUserEndPoint, jsonBody, {'headers': headers}).subscribe(
      response =>{  
        console.log(response)

        this.authenticationResponseBody = JSON.parse(JSON.stringify(response))
        this.cookieHandler.addCookie(this.cookieVariables.tempGuid , this.authenticationResponseBody.guid)

        this.route.navigate(['/productListing'])
      },(error : HttpErrorResponse) => {

        this.authenticationResponseBody = JSON.parse(JSON.stringify(error.error))
        this.errorPresent = true;
        this.errorMessage = this.authenticationResponseBody.errorMessage;

        setTimeout(() => {
          this.errorPresent = false;
        }, 3000);

      }
    )

    
  }

  sendRequestForRegisteredUserCreation(userRegistrationDetails : NgForm){

    this.errorPresent = false;

    // Start parsing data
    const password : string = userRegistrationDetails.form.controls['registeredUserPassword'].value
    const retypedPassword : string = userRegistrationDetails.form.controls['registeredUserPasswordConfirmation'].value
    this.createAccountRequestBody.email = userRegistrationDetails.form.controls['registeredUserEmail'].value

    //Email Validation
    if(!this.isValidEmail(this.createAccountRequestBody.email)){
      this.errorPresent = true;
      this.errorMessage = this.errorMessages.emailIdInValid;

      setTimeout(() => {
        this.errorPresent = false;
      }, 3000);

      return
    }

    //password validation
    if(!this.isPasswordSame(password , retypedPassword)){
      this.errorPresent = true;
      this.errorMessage = this.errorMessages.passwordMisMatch;
      setTimeout(() => {
        this.errorPresent = false;
      }, 3000);

      return
    }

       // Request body builder based on confirmation that data entered by user is correct
      this.createAccountRequestBody.firstName = userRegistrationDetails.form.controls['registeredUserName'].value
      this.createAccountRequestBody.lastName = "Test Last Name"
      this.createAccountRequestBody.password = retypedPassword

      //Parsing to JSON Format
      const jsonBody = JSON.parse(JSON.stringify(this.createAccountRequestBody))
      console.log(jsonBody)

      //Configuring Headers
      const headers = { 'content-type': 'application/json'}

      //Post Call to Server to create Registered user
      this.http.post(this.backendHostUrl + this.endPoints.createRegisteredUserEndPoint, jsonBody, {'headers': headers}).subscribe(
        response =>{  
          console.log(response)
        },(error : HttpErrorResponse) => {

          this.authenticationResponseBody = JSON.parse(JSON.stringify(error.error))
          this.errorPresent = true;
          this.errorMessage = this.authenticationResponseBody.errorMessage;

          setTimeout(() => {
            this.errorPresent = false;
          }, 3000);

        }
      )
    
  }

 

}
