
export class BasketDetails {
    "basketDeliveryServices": [
        {
            "serviceType": string,
            "isServiceSelected": boolean,
            "priceValues": {
                "basePrice": number
                "offerPrice" : number
            },
            "isMultiplier": boolean,
            "serviceDescription": string,
            "serviceId": string,
            "serviceName": string
        }
    ]
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

export class DeliveryAndPaymentPageEndPoints{
    getBasketDetails = "/api/v1/carts/loadbasket"
    updateDeliveryService = "/api/v1/carts/basketdeliveryserviceupdate?servicecode="
    getCartAddress = "/api/v1/user/getcartaddress"
    confirmOrder = "/api/v1/orders/createorder/"
}

export class ErrorModel{
    "error" : boolean
    "message" : string
}

export class OrderCreatedModel{
    "error" : boolean
    "message" : string
    "orderId" : string
}