import { api } from 'lwc';
import LightningModal from 'lightning/modal';

export default class NewClaimModal extends LightningModal {
    @api content;
    //claimantID = content;

    get inputVariables() {
        console.log(`+++ ${this.content}`);
        return [
            {
                name: 'Claimant_Record_Id',
                type: 'String',
                value: this.content
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