
export class WelcomePageModel{
	"isLoginEnabled" : boolean
	"isGuestEnabled" : boolean
	"isCreateAccountEnabled" : boolean
	"contentForWhyUS" : [
		{
			"rank" : number,
			"content" : string
		}
	]
	"productCategoryAvailable" : [
		{	
			"rank" : number,
			"categoryName" : string,
			"productModelCount" : number
		}
	]
	"premiumProducts" : [
		{
			"productName" : string,
			"productModelId" : string,
			"priceValues" : {
				"basePrice" : number,
				"offerPrice" : number,
			},
			"imageUrl" : string,
			"description" : string
		}
	]
	"contactDetails" : {
		"email" : string,
		"phoneNumber" : string,
		"Address1" : string		
	}
		
}

export class guestUserAction {
	"firstName" : string
	"lastName" : string
	"email" : string
}

export class RegisteredUserAction {
	"email" : string
	"password" : string
}

export class CreateAccountAction {
	"firstName" : string
	"lastName" : string
	"email" : string
	"password" : string
}

export class EndPointCollections{
	welcomePageRequestUrl =  "/api/v1/welcome/requestdetails"
  	guestUserActionEndPoint = "/api/v1/user/createguestuser"
	createRegisteredUserEndPoint =  "/api/v1/user/createregistereduser"
	loginUserEndPoint =  "/api/v1/user/reguserlogin"
}

export class AuthenticationResponseBody{
	"authStatus" : string
	"error" : boolean
	"guid" : string
	"errorMessage" : string
}

//error messages
export class ErrorMessages{
	emailIdInValid : string = "Invalid Email Id"
	passwordMisMatch : string = "Password is not Matching"
	serverDown : string = "server is temporarly down"
	unExpectedError : string = "something went wrong while processing, please try again after few minutes"
}
