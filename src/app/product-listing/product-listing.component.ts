import { Component, OnInit } from '@angular/core';
import { listingAttr, refinedListingAttr, baseProductModel, EndPointCollectionsProductListing, StockMessages, ProductAdditionResponse} from './product-listing.model';
import { HttpClient , HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieHandler, CookieVariables } from '../app.CookieHandler';
import { DomainHandler } from '../app.DomainHandler';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {

  constructor(private http : HttpClient , private route:Router) {
    
  }

  list_attr : listingAttr[] = []
  refined_attr = refinedListingAttr
  endPointsProductListing = new EndPointCollectionsProductListing()
  products : baseProductModel[] = []
  nestedProductList : any[] = []
  selectedSortType = ""
  cookieHandler = new CookieHandler();
  cookieVariables = new CookieVariables();
  productAdditionResponse = new ProductAdditionResponse();
  stockMessages = new StockMessages();
  backendHostUrl : string = "";

  ngOnInit(): void {
    this.backendHostUrl = new DomainHandler().getDomain();

    this.http.get(this.backendHostUrl + this.endPointsProductListing.productKeyConfigurationsEndPoint).subscribe(
      responseBody =>{
        console.log(responseBody)
        this.refined_attr = JSON.parse(JSON.stringify(responseBody))
        this.getProducts()
      }  
    );
  }

  customProductListRequestParamBuilder(){

    //initialising request params
    var filter = "filterby="
    var category = "category="
    var sort = "sortby=" + this.selectedSortType

    //updating filter choosen
    for(var filterIndex = 0 ; filterIndex < this.refined_attr.filters.length ; filterIndex++){
      if(this.refined_attr.filters[filterIndex].value){
        filter = filter + this.refined_attr.filters[filterIndex].key + ","
      }
    }
    filter = filter.substring(0, filter.length-1)


    //updating categories selected
    for(var categoryIndex = 0 ; categoryIndex < this.refined_attr.categories.length ; categoryIndex++){
      if(this.refined_attr.categories[categoryIndex].value){
        category = category + this.refined_attr.categories[categoryIndex].key + ","
      }

    }
    category = category.substring(0, category.length-1)

    console.log(filter , category, sort)
    return "?" + filter + "&" + category + "&" + sort

  }

  getProducts(){
    this.http.get(this.backendHostUrl + this.endPointsProductListing.customProductListEndoint + this.customProductListRequestParamBuilder()).subscribe(
      responseBody =>{
        this.products = JSON.parse(JSON.stringify(responseBody))
        console.log(this.products)
        //this.productGroupingHandler()
      }  
    );
    
  }

  isPriceValid(price : number){
    if(price != null && price > 0){
       return false 
    }else{
      return true
    }
  }

  isOfferPricePresent(offerPrice : number, basePrice : number){

    if(offerPrice != null && (basePrice - offerPrice) > 0){
      return true
    }else{
      return false
    }
  }

  getStockIndicator(statusCode : string){
    if(statusCode.match("INS")){
      return "text-success"
    }else if(statusCode.match("LS")){
      return "text-warning"
    }else{
      return "text-danger"
    }
  }

  getStockText(statusCode : string, stockValue : number){
    return this.stockMessages.stockMessageProvider(statusCode, stockValue);
  }

  updateCategoryAttribute(attribute : string){
    var count = 0;
    while(true){
      if(this.refined_attr.categories[count].key == attribute){

        if(this.refined_attr.categories[count].value == true){
          this.refined_attr.categories[count].value = false;
        }else{
          this.refined_attr.categories[count].value = true;
        }
        
        break;
      }else{
        count++
      }
    }

    this.getProducts()
    
  }

  updateFilterAttribute(attribute : string){
    var count = 0;
    while(true){
      if(this.refined_attr.filters[count].key == attribute){

        if(this.refined_attr.filters[count].value == true){
          this.refined_attr.filters[count].value = false;
        }else{
          this.refined_attr.filters[count].value = true;
        }
        
        break;
      }else{
        count++
      }
    }

    this.getProducts()
  }

  updateSortAttribute(attribute : string){

    for(var index = 0 ; index < this.refined_attr.sortTypes.length ; index++){
      if(this.refined_attr.sortTypes[index].key == attribute){
        this.refined_attr.sortTypes[index].value = true;
        this.selectedSortType = attribute

      }else{

        this.refined_attr.sortTypes[index].value = false;
      }
    }

    this.getProducts()

  }

  addProductToBasket(productId : string, navigateToBasket : boolean){
    var guidCookie = this.cookieHandler.extractCookie(this.cookieVariables.tempGuid);
    console.log(guidCookie)
    const headers = new HttpHeaders().append('guid', guidCookie).set('content-type', 'application/json');
    
    this.http.post(this.backendHostUrl + this.endPointsProductListing.addProductToBasket + productId , null,  {'headers' : headers}).subscribe(
      response => {
        console.log(response)
        this.productAdditionResponse = JSON.parse(JSON.stringify(response))
        alert(this.productAdditionResponse.message)
        if(navigateToBasket){
          this.navigateToBasket()
        }

      }, (err : HttpErrorResponse) => {


      }
    )

  }

  navigateToBasket(){
    this.route.navigate(['/basket'])
  }
  color = "btn-dark"

}
