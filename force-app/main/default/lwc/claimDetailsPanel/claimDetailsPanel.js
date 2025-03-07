// recordViewGetRecordParent.js
import { LightningElement, api, wire } from "lwc";

import { getRecord, getFieldValue } from "lightning/uiRecordApi";
import CLAIM_OBJECT from "@salesforce/schema/Claim__c";
import NAME_FIELD from "@salesforce/schema/Claim__c.Name";
import STATUS_FIELD from "@salesforce/schema/Claim__c.Status__c";
import TYPE_FIELD from "@salesforce/schema/Claim__c.Claim_Type__c";
import CLAIMANT_FIELD from "@salesforce/schema/Claim__c.Claimant__c";
import DISABILITY_RATING_FIELD from "@salesforce/schema/Claim__c.Current_Disability_Rating__c";
import HEALTH_STATUS_FIELD from "@salesforce/schema/Claim__c.Current_Health_Status__c";
import DIAGNOSED_DATE_FIELD from "@salesforce/schema/Claim__c.Date_Illness_Diagnosed__c";
import INJURY_DATE_FIELD from "@salesforce/schema/Claim__c.Date_Injury_Occurred__c";
import DATE_OF_ONSET_FIELD from "@salesforce/schema/Claim__c.Date_of_Onset__c";
import DESCRIPTION_FIELD from "@salesforce/schema/Claim__c.Description_of_Illness_or_Injury__c";
import INJURY_LOCATION_FIELD from "@salesforce/schema/Claim__c.Location_Injury_Occurred__c";
import INJURY_HISTORY_FIELD from "@salesforce/schema/Claim__c.Injury_History__c";

export default class RecordViewFormParentData extends LightningElement {
  objectName = CLAIM_OBJECT;
  nameField = NAME_FIELD;
  statusField = STATUS_FIELD;
  typeField = TYPE_FIELD;
  claimantField = CLAIMANT_FIELD;
  currentDisabilityRatingField = DISABILITY_RATING_FIELD;
  currentHealthStatusField = HEALTH_STATUS_FIELD;
  dateIllnessDiagnosedField = DIAGNOSED_DATE_FIELD;
  dateInjuryOccurredField = INJURY_DATE_FIELD;
  dateOfOnsetField = DATE_OF_ONSET_FIELD;
  descriptionOfIllnessOrInjuryField = DESCRIPTION_FIELD;
  locationInjuryOccurredField = INJURY_LOCATION_FIELD;
  injuryHistoryField = INJURY_HISTORY_FIELD;
  

  // recordId = '';
    // recordId = 'a0DDZ000004vRf02AE';
  @api objectApiName;

  queryResults = (function getQueryResults() {
    let params;
    let locSearch = location.search.substring(1);

    if (locSearch) {
        params = JSON.parse('{"' + locSearch.replace(/&/g, '","').replace(/=/g, '":"') + '"}', (key, value) => {
            return key === "" ? value : decodeURIComponent(value)
        });
    }

    return params;
  })();
  
  recordId = this.queryResults.recordId;

  // getQueryResults(location.search.substring(1));

  @wire(getRecord, {
    recordId: "$recordId",
    fields: [NAME_FIELD],

  })
  record;

  

  /* get the field value. */
  get recordField() {
    return this.record.data ? getFieldValue(this.record.data, NAME_FIELD) : "";
  }
}