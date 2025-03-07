//Import Functions
import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import { getRecord } from 'lightning/uiRecordApi';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';
import { NavigationMixin } from "lightning/navigation";

//Import Constants
import CLAIMTRACKERMESSAGE from '@salesforce/messageChannel/claimTracker__c'
//Import Claim Schema details
import NAME_FIELD from "@salesforce/schema/Claim__c.Name";
import STATUS_FIELD from "@salesforce/schema/Claim__c.Status__c";
import TYPE_FIELD from "@salesforce/schema/Claim__c.Claim_Type__c";
import CREATED_DATE from "@salesforce/schema/Claim__c.CreatedDate"



export default class ClaimTrackerDetailPanel extends NavigationMixin(LightningElement) {

    //the currentSubscription
    messageSubscription = null;
    localClaimID = null;
    claimTileTitle;
    errorMessage = "";
    recordName = "";
    recordStatus = "";
    recordType = "";
    recordCreatedDate = "";
    claimAppeals;//= [{}]
    displayAppeals = false;
    
    //page redirect variables
    pageReference;

    //RetrieveMessage Context
    @wire(MessageContext)
    messageContext;
    
    //get Claim Record By ID
    @wire(getRecord,{
        recordId: '$localClaimID',
        fields: [NAME_FIELD, STATUS_FIELD,TYPE_FIELD,CREATED_DATE]
    })
    claimRetrievedRecord({error, data }){
        try{
            if(data)
            {
                this.recordName = data.fields.Name.value;
                this.claimTileTitle = "Details for " + this.recordName;
                this.recordStatus = data.fields.Status__c.value;
                this.recordType = data.fields.Claim_Type__c.value;
                this.recordCreatedDate = data.fields.CreatedDate.value;
            }
            else if(error)
            {
                this.errorMessage = error.body.message;
            }
        }
        catch(e)
        {
            this.errorMessage = e.message;
        }

    }

    @wire(getRelatedListRecords,{
        parentRecordId:'$localClaimID',
        relatedListId: 'Appeals__r',
        fields:["Case.CaseNumber","Case.Status"]
    })
    processAppealRecords({error, data})
    {
        try{
            if(data){
                // this.claimAppeals = data.records.map((rec)=>({
                //     appealNumber: rec.fields.Appeal_Justification__c,
                //     appealId: rec.id
                // }));
                if(data.count > 0){
                    this.displayAppeals = true;
                }
                else
                {
                    this.displayAppeals = false;
                }                        
                this.claimAppeals = data.records;
            }
            else if(error)
            {
                this.errorMessage = error.body.message;
            }
        }
        catch(e){
            this.errorMessage = e.message;
        }
    }

    //subscribe to incoming message for claimID
    initialSubscribe(){
        console.log("Starting Subscription");
        //Dont resubscribe if already subscribed
        if(this.messageSubscription)
        {
            return;
        }

        this.messageSubscription = subscribe(this.messageContext, CLAIMTRACKERMESSAGE, (message) => {
            this.handleMessageFromSubscribe(message);
        });

    }

    //handle assigning the received claimID to local scope
    handleMessageFromSubscribe(receivedMessage){
        console.log('Received Message');
        this.localClaimID = receivedMessage.claimID ?? "No Claim ID Selected";

    }

    //Standard Lifecycle for LMS
    connectedCallback()
    {
        this.initialSubscribe();
    }

    // Navigate to Claim Record via click event
    navigateToClaim() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: `/claims/claim-details?recordId=${this.localClaimID}`
            }
        });
    }

    // Navigate to Appeal Record via click event
    navigateToAppeal(event) {
        const appealId = event.currentTarget.getAttribute('data-id');
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: `/claims/appeal-details?recordId=${appealId}`
            }
        });
    }
}