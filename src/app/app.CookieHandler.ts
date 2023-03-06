export class CookieHandler{

    addCookie(cookieKey : string , cookieValue : string){
        document.cookie = cookieKey.trim() + "=" + cookieValue.trim()
    }
  
    removeCookie(cookieKey : string ){
        document.cookie = cookieKey + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"
    }
  
    extractCookie(cookieId : string){
        var cookieValue = ""
        let cookieList = document.cookie.split(";");
        for(var i = 0; i < cookieList.length; i++){

           let cookieElement = cookieList[i].split("=");
           if(cookieElement[0].trim() == cookieId){
            cookieValue = cookieElement[1];
            break;
           } 
        }

        return cookieValue;
    }

    deleteAllCookies(){
        let cookieList = document.cookie.split(";");
        for(var i = 0; i < cookieList.length; i++){
            
           let cookieElement = cookieList[i].split("=");
           document.cookie = cookieElement[0] + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"
        }

    }
}

export class CookieVariables {
    tempGuid = 'tempGuid'
    orderId = 'orderId' 
}