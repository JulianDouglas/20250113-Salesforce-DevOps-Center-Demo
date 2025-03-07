import { api } from 'lwc';
import LightningModal from 'lightning/modal';

export default class NewAppealModal extends LightningModal {
    //the received content
    @api content;

    @api claimantID; //= content.claimantId; //= content[0];
    @api claimID; //= content.claimID; //= content[1];

    get inputVariables() {
        console.log(`+++ ${this.content}`);
        console.log(`+++ ${this.claimID}`);
        return [
            {
                name: 'Claimant_Record_Id',
                type: 'String',
                value: this.claimantID
            },
            {
                name: 'Claim_Record_Id',
                type: 'String',
                value: this.claimID
            }
        ]
        
    }

    handleStatusChange(event) {
        if (event.detail.status === 'FINISHED') {
            //Close the modal once the interview is finished
            this.close(event.detail.outputVariables);
        }
    }
}