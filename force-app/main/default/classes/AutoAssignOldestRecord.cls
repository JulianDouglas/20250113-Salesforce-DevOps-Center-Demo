public without sharing class AutoAssignOldestRecord {

    @AuraEnabled(cacheable=true)
    public static Claim__C assignClaimOldestRecordToCurrentUser(String queueId) {
        Id currentUserId = UserInfo.getUserId();

        Claim__C oldestRecord = [
            SELECT Id, Name, CreatedDate
            FROM Claim__C
            WHERE OwnerId = :queueId
            ORDER BY CreatedDate ASC
            LIMIT 1
        ];

        if (oldestRecord != null) {
            oldestRecord.OwnerId = currentUserId;
            //update oldestRecord;
            return oldestRecord;
        } else {
            return null;
        }
    }

    @AuraEnabled(cacheable=true)
    public static Case assignAppealOldestRecordToCurrentUser(String queueId) {
        Id currentUserId = UserInfo.getUserId();

        Case oldestRecord = [
            SELECT Id
            FROM Case
            WHERE OwnerId = :queueId
            ORDER BY CreatedDate ASC
            LIMIT 1
        ];

        if (oldestRecord != null) {
            oldestRecord.OwnerId = currentUserId;
            //update oldestRecord;
            return oldestRecord;
        } else {
            return null;
        }
    }
}