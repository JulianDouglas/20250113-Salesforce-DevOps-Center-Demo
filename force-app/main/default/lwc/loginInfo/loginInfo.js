import { LightningElement, track, wire } from 'lwc';
import getVisualforceURL from '@salesforce/apex/EnvironmentConfigController.getVisualforceURL';

export default class VisualforceWrapper extends LightningElement {
    @track visualforceUrl;

    @wire(getVisualforceURL)
    wiredURL({ error, data }) {
        if (data) {
            this.visualforceUrl = data;
        } else if (error) {
            console.error('Error fetching Visualforce URL:', error);
        }
    }
}