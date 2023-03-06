import { CookieHandler, CookieVariables } from "../app.CookieHandler"

export class OrderModel {
    "error": boolean
    "message": string
    "OrderSummary": [
        {
            "guid": string,
            "orderId": string,
            "createdAt": string,
            "emailId": string
        }
    ]
    "OrderEntries": [
        {
            "pk": string,
            "orderId": string,
            "entryId": string,
            "entryCode": string,
            "productModelId": string,
            "codeShortDescription": string,
            "basePrice": number,
            "payablePrice": number,
            "quantity": number,
            "lineTotal": number,
            "productUrl" : string
        }
    ]
    "OrderCostSummary": [
        {
            "orderId": string,
            "lineTotalWithDiscount": number,
            "serviceTotalWithDiscount": number,
            "orderTotalWithDiscount": number,
            "lineTotalWithoutDiscount": number,
            "serviceTotalWithoutDiscount": number,
            "orderTotalWithoutDiscount": number,
            "totalQuantity": number,
            "orderSavings": number
        }
    ]
    "orderAddressDetails": [
        {
            "pk": string,
            "orderId": string,
            "emailId": string,
            "line1": string,
            "line2": string,
            "pincode": string,
            "countryCode": string,
            "country": string,
            "phoneNumber": string,
            "city": string,
            "state": string,
            "addressType": string,
            "addressTitle": string,
            "busnisessType": string,
            "companyName": string
        }
    ]
}

export class ProductModel {
    "productName": string
    "productModelId": string
    "productDescription": string
    "productCategory": string
    "productId": string
    "productUrl": string
    "isPremiumProduct": boolean
    "priceValues": {
        "basePrice": 0,
        "offerPrice": 0
    }
    "stockData": {
        "quantity": 0,
        "stockStatus": "INS"
    }
    "availabiltyOptions": {
        "availableForSale": boolean,
        "isSellableOnline": boolean
    }
}

export class OrderConfirmationPageEndPoints {

    getOrderEndPoint() {
        var cookieHandler = new CookieHandler();
        var cookieVariables = new CookieVariables();

        var orderId = cookieHandler.extractCookie(cookieVariables.orderId);
        return "/api/v1/orders/getorder/" + orderId;
    }

    singleProductEndPoint = "/api/v1/products/productview/"



}