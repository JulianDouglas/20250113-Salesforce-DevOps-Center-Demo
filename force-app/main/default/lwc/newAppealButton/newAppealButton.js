//import Constants
import { LightningElement, wire, api } from 'lwc';
import ACTIVE_USER_ID from '@salesforce/user/Id';
import newAppealModal from 'c/newAppealModal';

//import functions
import getAccountByUserId from '@salesforce/apex/ClaimByAccountManager.getAccountByUserId';
import { NavigationMixin } from "lightning/navigation";

export default class NewAppealButton extends NavigationMixin(LightningElement) {
    currentUserID = ACTIVE_USER_ID;
    claimantID;
    @api claimid = '';

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
        console.log(this.claimid);
        console.log(this.claimantID);
        
        const result = await newAppealModal.open({
            size: 'medium',
            description: 'Display the process to create a new appeal',
            content: this.claimid,//{claimID:this.claimid,claimantId:this.claimantID}
            claimantID: this.claimantID,
            claimID: this.claimid
            // claimantID: this.claimantID, //[this.claimantID,this.claimID]
        });
        
        console.log('CLOSED MODAL: '+ result[0].value);

        let destinationURL = '/claims/appeal-details?recordId=' + result[0].value;

        //only navigate if not exited prematurely
        if(result != undefined){
            this[NavigationMixin.Navigate]({
                type: 'standard__webPage',
                attributes: {
                    url: destinationURL
                }
            });
        }
        

        console.log(result);
    }

}