public with sharing class ClaimsSummaryController {
    public Integer totalClaims { get; private set; }
    public Integer totalClaimants { get; private set; }

    public ClaimsSummaryController() {
        // Get total number of claims
        AggregateResult[] totalClaimsResult = [SELECT COUNT(Id) total FROM Claim__c];
        totalClaims = (Integer)totalClaimsResult[0].get('total');

        // Get total number of claimants (Accounts)
        AggregateResult[] totalClaimantsResult = [SELECT COUNT(Id) total FROM Account];
        totalClaimants = (Integer)totalClaimantsResult[0].get('total');
    }
}