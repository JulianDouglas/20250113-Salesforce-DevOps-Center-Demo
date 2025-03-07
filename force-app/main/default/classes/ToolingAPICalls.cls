//This call is responsible for calling the ToolingAPI using REST calls
public with sharing class ToolingAPICalls {
    public ToolingAPICalls() {
        System.debug('in constructor');
    }

    public static string apiHTTPRequest(){
        try {
            string httpURL = URL.getOrgDomainUrl().toExternalForm();
            //Create  HTTP Request
            HttpRequest req = new HttpRequest();
            //Directly send sessionID in Auth for HTTP Request
            req.setHeader('Authorization', 'Bearer ' + UserInfo.getSessionID());
            req.setHeader('Content-Type', 'application/json');

            req.setEndpoint(httpURL + '/services/data/v63.0/tooling/query/?q=SELECT+Info+FROM+PathAssistantStepInfo+LIMIT+200');
            req.setMethod('GET');

            Http h = new Http();
            HttpResponse res = h.send(req);
            
            return res.getBody();
        } catch (Exception e) {
            throw new AuraHandledException('An error was encountered: ' + e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<string> callToolingAPI(){
        string httpResults = apiHTTPRequest();
        List<string> returnStrings = new List<string>();

        pathAssistInfoDTO returnedResponse = (pathAssistInfoDTO)JSON.deserialize(httpResults,pathAssistInfoDTO.class);

        for(pathAssistInfoDTO.Record record: returnedResponse.records)
        {
            returnStrings.add(record.info.remove('<p>').remove('</p>'));
        }

        return returnStrings;
    }
}