import { LightningElement, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.Name';
import EMAIL_FIELD from '@salesforce/schema/User.Email';

export default class UserInformation extends LightningElement {
    userId = USER_ID;
    userName;
    userEmail;

    @wire(getRecord, {
        recordId: '$userId',
        fields: [NAME_FIELD, EMAIL_FIELD]
    })
    userRecord({ error, data }) {
        if (data) {
            this.userName = data.fields.Name.value;
            this.userEmail = data.fields.Email.value;
        } else if (error) {
            console.error(error);
        }
    }
}