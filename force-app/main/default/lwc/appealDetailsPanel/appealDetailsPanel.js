// recordViewGetRecordParent.js
import { LightningElement, api, wire } from "lwc";

import { getRecord, getFieldValue } from "lightning/uiRecordApi";
import APPEAL_OBJECT from "@salesforce/schema/Case";
import NUMBER_FIELD from "@salesforce/schema/Case.CaseNumber";
import STATUS_FIELD from "@salesforce/schema/Case.Status";
import TYPE_FIELD from "@salesforce/schema/Case.Appeal_Type__c";
import CLAIM_FIELD from "@salesforce/schema/Case.Claim__c";
import CLAIMANT_FIELD from "@salesforce/schema/Case.Claimant__c";
import JUSTIFICATION_FIELD from "@salesforce/schema/Case.Appeal_Justification__c";
import OPEN_FIELD from "@salesforce/schema/Case.CreatedDate";
import CLOSE_FIELD from "@salesforce/schema/Case.ClosedDate";

export default class RecordViewFormParentData extends LightningElement {
  objectName = APPEAL_OBJECT;
  numberField = NUMBER_FIELD;
  claimField = CLAIM_FIELD;
  statusField = STATUS_FIELD;
  typeField = TYPE_FIELD;
  claimantField = CLAIMANT_FIELD;
  justificationField = JUSTIFICATION_FIELD;
  dateOpenedField = OPEN_FIELD;
  dateClosedField = CLOSE_FIELD;
  

//   @api recordId;
    // recordId = '500DZ00000Cl9OQYAZ';
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

  @wire(getRecord, {
    recordId: "$recordId",
    fields: [NUMBER_FIELD],
  })
  record;

  /* get the field value. */
  get recordField() {
    return this.record.data ? getFieldValue(this.record.data, NUMBER_FIELD) : "";
  }
}