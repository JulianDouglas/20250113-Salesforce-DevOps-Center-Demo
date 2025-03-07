public without sharing class EnvironmentConfigController {
    @AuraEnabled(cacheable=true)
    public static String getVisualforceURL() {
        // Fetch custom metadata record based on environment
        Organization org = [SELECT Id, IsSandbox FROM Organization LIMIT 1];
        String label = org.IsSandbox ? 'Sandbox' : 'Production';
        
        EnvironmentConfig__mdt config = [SELECT Visualforce_Login_URL__c	 FROM EnvironmentConfig__mdt WHERE Label = :label LIMIT 1];
        return config.Visualforce_Login_URL__c	;
    }
}