
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

export class BasketPageEndPoints {
    getBasketDetails = "/api/v1/carts/loadbasket"

    basketProductUpdate = (productCode: string, quantity: number) => {
        return "/api/v1/carts/basketproductupdate?productcode=" + productCode + "&quantity=" + quantity;
    }

    basketProductServiceUpdate = (productCode: string, serviceCode: string, isSelected: boolean) => {
        return "/api/v1/carts/basketserviceupdate?productcode=" + productCode + "&servicecode=" + serviceCode + "&isSelected=" + isSelected;
    }


}