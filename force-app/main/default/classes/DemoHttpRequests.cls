public with sharing class DemoHttpRequests {
    public DemoHttpRequests() {
        System.debug('DemoHTTPRequests Constructor');
    }

    public void getCustomer(){

        HttpRequest req = new HttpRequest();

        // setting the endpoint with the name of the Named Credentials we set up
        req.setEndpoint('callout:Appian_Customer_Named_Credentials/tax-customer');
        req.setMethod('GET');

        // send the request
        Http http = new Http();
        HttpResponse response = http.send(req);

        System.debug(response.getStatusCode());
        System.debug(response.getStatus());
        System.debug(response.getBody());
    
        Integer statusCode = response.getStatusCode();
        if(statusCode == 200)
        {
            //handle success
            System.debug('SUCCESS: ' + statusCode);

            List<CustomerInfoDTO> customers = (List<CustomerInfoDTO>)JSON.deserialize(response.getBody(), List<CustomerInfoDTO>.class);
            for(CustomerInfoDTO customer : customers){
                System.debug(customer);
            }
        }
        else if(statusCode == 400){
            // handle bad requests
            System.debug('ERROR: ' + statusCode);
        }
        else if(statusCode == 500){
            // handle server error
            System.debug('ERROR: ' + statusCode);
        }
    }

    public void createCustomer(CustomerInfoDTO customerInfo) {


        HttpRequest req = new HTTPRequest();
        req.setEndpoint('callout:Appian_Customer_Named_Credentials/tax-customer');
        req.setMethod('POST');
        req.setBody(JSON.serialize(customerInfo)); //converts Apex object to JSON so it can be sent in http request

        // send the request
        Http http = new Http();
        HttpResponse response = http.send(req);

        Integer statusCode = response.getStatusCode();
        if(statusCode == 201)
        {
            //handle success
            System.debug('SUCCESS: ' + response.getBody());
        }
        else if(statusCode == 400){
            // handle bad requests
            System.debug('ERROR: ' + statusCode);
        }
        else if(statusCode == 500){
            // handle server error
            System.debug('SERVER ERROR: ' + response.getBody());
        }
    }
}