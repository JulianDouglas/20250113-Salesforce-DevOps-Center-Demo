//import constants
import { LightningElement, wire } from 'lwc';
import newClaimModal from 'c/newClaimModal';
import ACTIVE_USER_ID from '@salesforce/user/Id';
import CLAIMANT_ID from '@salesforce/schema/Account.Id';

// import functions
import { getRecord } from 'lightning/uiRecordApi';
import getAccountByUserId from '@salesforce/apex/ClaimByAccountManager.getAccountByUserId';
import { NavigationMixin } from "lightning/navigation";

export default class NewClaimButton extends NavigationMixin(LightningElement) {
    currentUserID = ACTIVE_USER_ID;
    claimantID = '';

    @wire(getAccountByUserId,{
        userID: ACTIVE_USER_ID
     })
    handleAccount({error, data}){
        try{
            if(data)
                {
                    console.log(data);
                    this.claimantID = data.Id;
                }
                else if (error){
                    console.log('ERROR: ' + error.body.message);
                }
        
                //this.getURLQuery(location.search.substring(1));
                //this.myErrorMessage = this.currentUserID;
        }
        catch(e)
        {
            console.log('ERROR: ' + e.errorMessage);
        }
        
     }

    async onButtonClick()
    {
        console.log("Clicked the Button");
        const result = await newClaimModal.open({
            size: 'medium',
            description: 'Display the process to create a new claim',
            content: this.claimantID
        });
        
        let redirectURL = "/claims/claim-details?recordId=" + result[1].value;

        if(result != undefined)
        {
            this[NavigationMixin.Navigate]({
                type: 'standard__webPage',
                attributes: {
                    url: redirectURL
                }
            });
        }
        

        console.log(result);
    }

}