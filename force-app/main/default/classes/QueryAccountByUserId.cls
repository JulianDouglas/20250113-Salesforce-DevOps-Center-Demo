public class QueryAccountByUserId {

    @AuraEnabled(cacheable=true)
    public static Account queryAccountByUserId(string userId) {
        Account account = [SELECT 
                Id,
                SSN__c
            FROM Account
            WHERE Claimant_User__c = :userId
            LIMIT 1
        ];
        return account;
    }

}