
export class DomainHandler{
    sameHost : boolean = true

    getDomain(){
        var portNumber = "9001"

        if(this.sameHost){
            var domain = window.location.protocol + "//" + window.location.hostname + ":" + portNumber
            return domain
        }

        var domain = "http://{{userDefinedDomain}}:9001"
        return domain
        
    }
}