import { LightningElement, wire, track } from 'lwc';
import getRecentlyModifiedRecords from '@salesforce/apex/RecentlyModifiedController.getRecentlyModifiedRecords';
import ACTIVE_USER_ID from '@salesforce/user/Id';

export default class RecentlyModified extends LightningElement {
    @track allRecords = [];
    @track filteredRecords = [];
    @track error;

    selectedFilter = 'all'; // Default filter

    filterOptions = [
        { label: 'Claims & Appeals', value: 'all' },
        { label: 'Claims', value: 'claims' },
        { label: 'Appeals', value: 'appeals' },
    ];

    claimBasePath = '/claims/claim-details?recordId=';
    appealBasePath = '/claims/appeal-details?recordId=';

    @wire(getRecentlyModifiedRecords, { userId: ACTIVE_USER_ID })
    wiredRecords({ error, data }) {
        if (data) {
            // Process records
            this.allRecords = data.map(record => {
                const isClaim = !!record.Claim_Type__c; // Distinguish claims from appeals
                const detailsUrl = isClaim
                    ? `${this.claimBasePath}${record.Id}`
                    : `${this.appealBasePath}${record.Id}`;

                // Add a class for claims for styling purposes
                const tileClass = isClaim ? 'custom-claim-tile' : '';

                const formattedDate = new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                }).format(new Date(record.LastModifiedDate));

                return {
                    id: record.Id,
                    name: record.Name || record.CaseNumber,
                    status: record.Status || record.Status__c,
                    type: isClaim ? 'Claim' : 'Appeal',
                    lastModified: record.LastModifiedDate,
                    formattedLastModified: formattedDate,
                    detailsUrl,
                    tileClass,
                };
            });

            // Sort records by LastModifiedDate (descending)
            this.allRecords.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));

            this.filterRecords(); // Apply the initial filter
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.allRecords = [];
        }
    }

    handleFilterChange(event) {
        this.selectedFilter = event.detail.value; // Update selected filter
        this.filterRecords(); // Reapply the filter
    }

    filterRecords() {
        if (this.selectedFilter === 'claims') {
            // Filter top 3 most recent claims
            this.filteredRecords = this.allRecords
                .filter(record => record.type === 'Claim')
                .slice(0, 3);
        } else if (this.selectedFilter === 'appeals') {
            // Filter top 3 most recent appeals
            this.filteredRecords = this.allRecords
                .filter(record => record.type === 'Appeal')
                .slice(0, 3);
        } else {
            // Default to top 3 most recent claims and appeals combined
            this.filteredRecords = this.allRecords.slice(0, 3);
        }
    }
}