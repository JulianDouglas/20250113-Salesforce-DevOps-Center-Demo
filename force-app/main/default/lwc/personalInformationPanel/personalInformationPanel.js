import { api, LightningElement, track, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import ACTIVE_USER_ID from '@salesforce/user/Id';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import queryAccountById from '@salesforce/apex/QueryAccountByUserId.queryAccountByUserId';
import PersonalInfoUpdatedModal from 'c/personalInfoUpdatedModal';

// Field names.
import NAME_FIELD from "@salesforce/schema/Account.Name";
import BONUSES_EARNED_FIELD from "@salesforce/schema/Account.Bonuses_Earned__c";
import COMMISSIONS_EARNED_FIELD from "@salesforce/schema/Account.Commissions_Earned__c";
import CURRENT_DISABILITY_FIELD from "@salesforce/schema/Account.Current_Disability__c";
import INTEREST_FIELD from "@salesforce/schema/Account.Interest_And_Dividends_Earned__c";
import CREDIT_SCORE_FIELD from "@salesforce/schema/Account.Latest_Credit_Score__c";
import DISABILITY_PAYOUT_FIELD from "@salesforce/schema/Account.Monthly_Disability_Payout__c";
import RETIREMENT_PAYOUT_FIELD from "@salesforce/schema/Account.Monthly_Retirement_Payout__c";
import SOCIAL_SECURITY_PAYOUT_FIELD from "@salesforce/schema/Account.Monthly_Social_Security_Payout__c";
import FARMING_OR_BUSINESS_FIELD from "@salesforce/schema/Account.Net_Income_From_Farming_Or_Business__c";
import PERMANENTLY_DISABLED_FIELD from "@salesforce/schema/Account.Permanently_Disabled__c";
import PHONE_FIELD from "@salesforce/schema/Account.Phone";
import INCOME_TYPE_FIELD from "@salesforce/schema/Account.Primary_Income_Type__c";
import SSN_FIELD from "@salesforce/schema/Account.SSN__c";
import TIPS_EARNED_FIELD from "@salesforce/schema/Account.Tips_Earned__c";
import HOUSING_STATUS_FIELD from "@salesforce/schema/Account.Housing_Status__c";
import YEARLY_STANDARD_GROSS_PAY_FIELD from "@salesforce/schema/Account.Yearly_Standard_Gross_Pay__c";

export default class PersonalInformationPanel extends LightningElement {
    
    activeUserId = ACTIVE_USER_ID;
    objectName = ACCOUNT_OBJECT;
    name = NAME_FIELD;
    bonusesEarned = BONUSES_EARNED_FIELD;
    commissionsEarned = COMMISSIONS_EARNED_FIELD;
    currentDisabilityRating = CURRENT_DISABILITY_FIELD;
    interestAndDividendsEarned = INTEREST_FIELD;
    latestCreditScore = CREDIT_SCORE_FIELD;
    monthlySocialSecurityPayout = SOCIAL_SECURITY_PAYOUT_FIELD;
    monthlyDisabilityPayout = DISABILITY_PAYOUT_FIELD;
    monthlyRetirementPayout = RETIREMENT_PAYOUT_FIELD;
    netIncomeFromFarmingOrBusiness = FARMING_OR_BUSINESS_FIELD;
    permanentlyDisabled = PERMANENTLY_DISABLED_FIELD;
    phone = PHONE_FIELD;
    primaryIncomeType = INCOME_TYPE_FIELD;
    ssn = SSN_FIELD;
    tipsEarned = TIPS_EARNED_FIELD;
    housingStatus = HOUSING_STATUS_FIELD;
    yearlyStandardGrossPay = YEARLY_STANDARD_GROSS_PAY_FIELD;
    
    recordId;
    ssn;
    viewMode = true;
    formIsDirty = false;
    disableSubmitButton = true;

    @wire(queryAccountById, { userId: '$activeUserId'})
    wiredHandler({ error, data }) {
        if (data) {
            this.recordId = data.Id;
            const stringSSN = data.SSN__c.toString();
            this.ssn = '***-**-' + stringSSN.substring(stringSSN.length - 4);
        }
        else if (error) {
            console.log(error);
        }
    }

    handleFieldChange(event) {
        const inputFields = this.template.querySelectorAll('lightning-input-field');
        for (let field of inputFields) {
            if (field.dirty) {
                this.formIsDirty = true;
                this.disableSubmitButton = false;
                return;
            }
        }
        this.formIsDirty = false;
        this.disableSubmitButton = true;
    }

    async handleSuccess(event) {
        this.formIsDirty = false;
        this.disableSubmitButton = true;
        PersonalInfoUpdatedModal.open({
            size: 'large',
            description: 'Modal expressing that updating the claimant\'s personal information was a success',
            header: 'Success!',
            content: 'You have successfully updates your personal information.'
        });
    }

    handleReset(event) {
        const inputFields = this.template.querySelectorAll('lightning-input-field');
        if (inputFields) {
            inputFields.forEach(field => {
                field.reset();
            });
        }
        this.formIsDirty = false;
        this.disableSubmitButton = true;
    }

    toggleViewMode(event) {
        event.preventDefault();
        this.viewMode = !this.viewMode;
    }
}