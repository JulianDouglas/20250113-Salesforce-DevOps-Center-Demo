public without sharing class RecentlyModifiedController {
    @AuraEnabled(cacheable=true)
    public static List<Object> getRecentlyModifiedRecords(Id userId) {
        // Fetch Claims
        List<Claim__c> claims = [
            SELECT Name, Id, Status__c, Claim_Type__c, LastModifiedDate
            FROM Claim__c
            WHERE Claimant__r.Claimant_User__c = :userId
            ORDER BY LastModifiedDate DESC
            LIMIT 3
        ];

        // Fetch Appeals (Cases)
        List<Case> appeals = [
            SELECT CaseNumber, Id, Status, Subject, LastModifiedDate
            FROM Case
            WHERE Claim__r.Claimant__r.Claimant_User__c = :userId
            ORDER BY LastModifiedDate DESC
            LIMIT 3
        ];

        // Combine results and return
        List<Object> recentlyModifiedRecords = new List<Object>();
        recentlyModifiedRecords.addAll(claims);
        recentlyModifiedRecords.addAll(appeals);

        return recentlyModifiedRecords;
    }
}