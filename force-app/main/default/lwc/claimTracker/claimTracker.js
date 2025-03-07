//import functions
import { LightningElement, wire, api } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import { publish, MessageContext } from 'lightning/messageService'
import getClaimsByAccountId from '@salesforce/apex/ClaimByAccountManager.getClaimsByAccountId';
import callToolingAPI from '@salesforce/apex/ToolingAPICalls.callToolingAPI';

//import consts
import ACTIVE_USER_ID from '@salesforce/user/Id';
import CLAIMANT_NAME from '@salesforce/schema/Account.Name';
import CLAIMTRACKMESSAGE from '@salesforce/messageChannel/claimTracker__c'


export default class claimTracker extends LightningElement {
    currentUserID = ACTIVE_USER_ID;
    currentAccountID = '';//'001DZ0000155O7YYAU';
    cardTitle = "Claim Tracker";
    myErrorMessage = "";
    claimName = "";
    claimData = [];
    dropDownIcon = "utility:chevronleft";

    //Parse the current url paramters
    getURLQuery(locSearch){
        let params;
        
        if (locSearch) {
            params = JSON.parse('{"' + locSearch.replace(/&/g, '","').replace(/=/g, '":"') + '"}', (key, value) => {
                return key === "" ? value : decodeURIComponent(value)
            });
        }

        return params;
    };

    queryResults = this.getURLQuery(location.search.substring(1));

    //Default to test org for development in builder

    validateAccountID = () => {
        // if(this.queryResults.accountID)
        //     {
        //         return this.queryResults.accountID ?? '001DZ0000155O7YYAU';
        //     }
        // else{
        try
        {
            return this.queryResults.accountID;
        }
        catch(e)
        {
            this.myErrorMessage = this.queryResults;
            //this.myErrorMessage = 'No Account ID provided';
            return '';
        }
    };

    currentAccountID = this.validateAccountID();

    //errorMessage = this.currentAccountID;

    //currentAccountID = '001DZ0000155O7YYAU';

    @wire(getRecord,{
        recordId: '$currentAccountID',
        fields: [CLAIMANT_NAME]
     })
     handleClaimant({error, data}){
        try{
            if(data)
                {
                    this.cardTitle = data.fields.Name.value + `'s Claims`;
                }
                else if (error){
                    this.myErrorMessage = error.body.message;
                }
        
                //this.getURLQuery(location.search.substring(1));
                //this.myErrorMessage = this.currentUserID;
        }
        catch(e)
        {
            this.myErrorMessage = e.errorMessage;
        }
        
     }

     //retrieve all data relevant for claims
    @wire(getClaimsByAccountId,{
        userID: '$currentUserID',
        fieldNames: ['Name','Id','Status__c','Claim_Type__c','Claimant__r.Name']
    })
    handleRecords({error, data }){
        try
        {
            if(data)
            {
                this.claimData = data.map(rec => ({
                    claimRecName: rec.Name,
                    claimRecId: rec.Id,
                    claimRecStatus: rec.Status__c,
                    claimRecType: rec.Claim_Type__c,
                    claimCssClass: 'slds-p-around_medium claimTile',
                    claimSlideOut: false,
                    claimSlideOutText:'',
                    claimSlideAnimation: '',
                    claimToggleIcon: this.dropDownIcon,
                    claimClaimantName: rec.Claimant__r.Name
                }));
                //this.claimName = this.claimData[0].claimRecName;
                //Dynamically Add CSS
                for(let claim of this.claimData){
                    if(claim.claimRecStatus.includes("Denied"))
                    {
                        claim.claimCssClass = claim.claimCssClass + ' claimDenied';
                    }
                    else if (claim.claimRecStatus.includes("Approved"))
                    {
                        claim.claimCssClass += ' claimApproved';
                    }
                    else
                    {
                        claim.claimCssClass += ' claimInProgress';
                    }
                }

                callToolingAPI()
                .then((result) => {
                    for(let claim of this.claimData)
                    {
                        switch(claim.claimRecStatus){
                            case 'Under Review':
                                claim.claimSlideOutText = result[0];
                                break;
                            case 'Evidence Gathering':
                                claim.claimSlideOutText = result[1];
                                break;
                            case 'Received':
                                claim.claimSlideOutText = result[2];
                                break;
                            case 'Decision Pending':
                                claim.claimSlideOutText = result[3];
                                break;
                            case 'Denied - Insufficient evidence':
                                claim.claimSlideOutText = result[5];
                                break;
                            case 'Denied - Dishonorable Discharge':
                                claim.claimSlideOutText = result[11];
                                break;
                            case 'Approved':
                                claim.claimSlideOutText = 'Your Claim has been Approved';
                                break;
                            default:
                                claim.claimSlideOutText = 'Your Claim is Current being Processed';                        
                            }                  
                        }
                        //this.myErrorMessage = result;
                    })
                    .catch((error) => {
                        this.myErrorMessage = error.body.message;
                    })
                this.cardTitle = this.claimData[0].claimClaimantName + `'s Claims`;;
                //this.claimData = tempClaimData;
            }
            else if (error)
            {
                this.myErrorMessage = `Call to the Database Failed with these parameters ${this.currentUserID} and 'Name' Error Message: `;
                this.myErrorMessage += error.body.message;
            }
            //this.myErrorMessage = location;
        }
        catch(e)
        {
            this.myErrorMessage = e.message;
        }
    }

    //Retrieve Message Context
    @wire(MessageContext)
    MessageContext;

    onClaimClick(event){
        console.log("The clicked target ID is: " + event.currentTarget.dataset.id);
        let targetID = event.currentTarget.dataset.id;
        let showingBool = false;

        //calls the ToolingApi for guidance information
        callToolingAPI()
        .then((result) => {
            for(let claim of this.claimData)
            {
                switch(claim.claimRecStatus){
                    case 'Under Review':
                        claim.claimSlideOutText = result[0];
                        break;
                    case 'Evidence Gathering':
                        claim.claimSlideOutText = result[1];
                        break;
                    case 'Received':
                        claim.claimSlideOutText = result[2];
                        break;
                    case 'Decision Pending':
                        claim.claimSlideOutText = result[3];
                        break;
                    case 'Denied - Insufficient evidence':
                        claim.claimSlideOutText = result[5];
                        break;
                    case 'Denied - Dishonorable Discharge':
                        claim.claimSlideOutText = result[11];
                        break;
                    case 'Approved':
                        claim.claimSlideOutText = 'Your Claim has been Approved';
                        break;
                    default:
                        claim.claimSlideOutText = 'Your Claim is Current being Processed';                        
                }                  
            }
            //this.myErrorMessage = result;
        })
        .catch((error) => {
            this.myErrorMessage = error.body.message;
        })

        // Create a new array with updated objects
        this.claimData = this.claimData.map(claim => {
            if (claim.claimRecId === targetID) {
                console.log("Found Clicked Record");
                showingBool = !claim.claimSlideOut;
                if(showingBool){
                    this.dropDownIcon = "utility:chevrondown";
                }
                else{
                    this.dropDownIcon = "utility:chevronleft";
                }
                return { ...claim, 
                        claimSlideOut: !claim.claimSlideOut,
                        claimSlideAnimation: 'slideAnimation',
                        claimToggleIcon: this.dropDownIcon }; // Toggle the slide-out property
            }
            return claim; // Return unchanged objects
        });


        //publish clicked ClaimID
        let claimMessageValue = {
            claimID: targetID,
            claimSource: 'claimTrackerLWC'
        }

        //Only Do these things if the slide out is showing
        if(showingBool)
        {
            publish(this.MessageContext, CLAIMTRACKMESSAGE, claimMessageValue);
            console.log("Claim Tracker LMS fired");    
        }
    }

}