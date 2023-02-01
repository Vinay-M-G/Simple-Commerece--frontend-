const domain = "http://ec2-43-204-215-240.ap-south-1.compute.amazonaws.com:9001"
//const domain = "http://localhost:9001"

export class listingAttr{
    "sortTypes" : string[]
    "filters" : string[]
    "categories" : string[]
}

export var refinedListingAttr = {
    "sortTypes" : [
        {
        "key" : "",
        "value" : false
        }
    ],
    "filters" : [
        {
            "key" : "",
            "value" : false
        }
    ],
    "categories" : [
        {
            "key" : "",
            "value" : false
        }
    ]

}

export class baseProductModel{
    "productName" : string
    "productModelId" : string
    "productDescription" : string
    "productCategory" : string
    "productId" : string
    "productUrl" : string
    "isPremiumProduct" : boolean
    "priceValues" : {
        "basePrice" : number
        "offerPrice" : number
    }
    "stockData":{
        "quantity" : number
        "stockStatus" : string	
    }
    "availabiltyOptions": {
        "availableForSale": boolean,
        "isSellableOnline": boolean
    }	
}

export class ProductAdditionResponse{
    "error" : boolean
    "message" : string
}

export class EndPointCollectionsProductListing{
    productKeyConfigurationsEndPoint = domain + "/api/v1/products/getkeyconfigurations"
    customProductListEndoint = domain + "/api/v1/products/list"
    addProductToBasket = domain + "/api/v1/carts/addtobasket?productcode="
}

export class StockMessages{

    stockMessageProvider(stockStatus : string, stockValue: number){
        if(stockStatus == "INS"){
            var value = "Available : " + stockValue
            return value
        }
        
        if(stockStatus == "LS"){
            var value = " Hurry up only " + stockValue + " left"
            return value
        }
        
        if(stockStatus == "OS"){
            var value = "will be back soon" 
            return value
        }

        return null
    }
    
}
