
const domain = "http://ec2-43-204-215-240.ap-south-1.compute.amazonaws.com:9001"
//const domain = "http://localhost:9001"

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
	welcomePageRequestUrl =  domain + "/api/v1/welcome/requestdetails"
	//welcomePageRequestUrl = "https://eb94d8fb-4841-42be-82ec-2fbea4204936.mock.pstmn.io/welcomepage"
  	guestUserActionEndPoint =  domain + "/api/v1/user/createguestuser"
	createRegisteredUserEndPoint =  domain + "/api/v1/user/createregistereduser"
	loginUserEndPoint =  domain + "/api/v1/user/reguserlogin"
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
