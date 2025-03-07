public with sharing class ClaimByAccountManager {
    public ClaimByAccountManager() {
        System.debug('Hello World');
    }

    //returns the list of claim fields by AccountId. May need to be a list of lists
    @AuraEnabled(cacheable=true)
    public static List<Claim__c> getClaimsByAccountId(string userID, List<string> fieldNames){

        //console.log('still here somehow');
        //generate query string based on the provided fieldNames
        string queryString = 'Select ';
        string queryFields = '';
        string localUserId = userID;

        for(string currentName: fieldNames){
            queryFields += currentName.toString() + ', ';
        }

        queryString += queryFields.removeEnd(', ');
        queryString += ' FROM Claim__c ';
        queryString += 'Where Claimant__r.Claimant_User__c = \''+ localUserId + '\' ORDER BY CreatedDate DESC';

        //throw new AuraHandledException(queryString);

        List<Claim__c> queryResults = Database.query(queryString);

        return queryResults;
    }

    @AuraEnabled(cacheable=true)
    public static Account getAccountByUserId(string userID)
    {
        //generate query String
        string queryString = 'Select Name FROM Account WHERE Claimant_User__c = \'' + userID + '\' LIMIT 1';

        Account account = Database.query(queryString);

        return account;
    }
}