import { api, LightningElement } from 'lwc';
import LightningModal from 'lightning/modal';

export default class PersonalInfoUpdatedModal extends LightningModal {
    @api header;
    @api content;

    handleOkay() {
        this.close('Okay');
    }
}