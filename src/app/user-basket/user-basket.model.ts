
const domain = "http://ec2-43-204-215-240.ap-south-1.compute.amazonaws.com:9001"
//const domain = "http://localhost:9001"

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
    getBasketDetails = domain + "/api/v1/carts/loadbasket"

    basketProductUpdate = (productCode: string, quantity: number) => {
        return domain + "/api/v1/carts/basketproductupdate?productcode=" + productCode + "&quantity=" + quantity;
    }

    basketProductServiceUpdate = (productCode: string, serviceCode: string, isSelected: boolean) => {
        return domain + "/api/v1/carts/basketserviceupdate?productcode=" + productCode + "&servicecode=" + serviceCode + "&isSelected=" + isSelected;
    }


}