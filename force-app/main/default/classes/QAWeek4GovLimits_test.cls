@isTest
public with sharing class QAWeek4GovLimits_test {

    public QAWeek4GovLimits_test() {
        //testObject = new QAWeek4GovLimits();
    }

    //Declare Test Object
    @TestSetup
    static void makeData(){
        QAWeek4GovLimits testObject = new QAWeek4GovLimits();
    }

    @isTest
    public static void testGovLimit()
    {
        QAWeek4GovLimits testObject = new QAWeek4GovLimits();
        //testObject.SOQLGovLimit();
    }

    @isTest
    public static void testSOSLGovLimit()
    {
        QAWeek4GovLimits testObject = new QAWeek4GovLimits();
        //testObject.SOSLGovLimit();
    }
}