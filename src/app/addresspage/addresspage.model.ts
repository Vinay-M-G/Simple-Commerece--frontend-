//const domain = "http://localhost:9001"
const domain = "http://ec2-43-204-215-240.ap-south-1.compute.amazonaws.com:9001"

export class AddressModel{
    "addressValues": [
        {
            "pk": String,
            "emailId": String,
            "line1": String,
            "line2": String,
            "pincode": String,
            "countryCode": String,
            "phoneNumber": String,
            "city": String,
            "state": String,
            "country": String,
            "addressType": String,
            "addressTitle": String,
            "businessType": String,
            "companyName": String,
            "updatedAt": String
        }
    ]
    "emailId" : String
    "error": boolean
    "message": String
}

export class UpdateAddress{
    "line1": String
    "line2": String
    "pincode": String
    "countryCode": String
    "phoneNumber": String
    "city": String
    "state": String
    "country": String
    "isBillingAddress": boolean
    "addressTitle": String 
    "isBusinessOrder": boolean
    "companyName" : String
}

export class BasketDetails {
    "basketCostSummary": {
        "serviceSubTotalWithOutDiscount": number,
        "orderTotalWithDiscount": number,
        "lineSubTotalWithDiscount": number,
        "serviceSubTotalWithDiscount": number,
        "orderTotalWithOutDiscount": number,
        "cartCount": number,
        "cartSavings": number,
        "lineSubTotalWithOutDiscount": number
    }
    "products": [
        {
            "quantity": number,
            "priceValues": {
                "lineTotal": number,
                "offerPrice" : number,
                "basePrice": number
            },
            "productId": string,
            "productServices": [
                {
                    "serviceType": string,
                    "isServiceSelected": boolean,
                    "priceValues": {
                        "offerPrice": number,
                        "basePrice": number
                    },
                    "isMultiplier": boolean,
                    "serviceDescription": string,
                    "serviceId": string,
                    "serviceName": string
                }
            ],
            "productUrl": string,
            "productModelId": string,
            "productDescription": string,
            "productName": string
        }
    ]
}

export class AddressPageEndPoints{
    getRecommendedAddressDetails(businessType : string | undefined){
        return domain + "/api/v1/user/getaddresslist?busnisessType=" + businessType
    }
    
    updateAddressDetails = domain + "/api/v1/user/updateaddress"
    getBasketDetails = domain + "/api/v1/carts/loadbasket"
    getCountryList = "https://restcountries.com/v2/all"
}