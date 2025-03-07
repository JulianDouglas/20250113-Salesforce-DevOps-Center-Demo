//The Test Class for Quality Audit Week 5
@isTest
public with sharing class QualityAuditWeek5Future_Test {

    private static QualityAuditWeek5Future testObject = new QualityAuditWeek5Future();

    public QualityAuditWeek5Future_Test() {
        System.debug('Inside default test constructor');
        //testObject = new QualityAuditWeek5Future();
        
    }

    @isTest
    public static void testingFuture(){

        //Create Test Context for testing @Future functions
        Test.startTest();

        //Call Future Function
        testObject.basicTestedFunction();

        //Stopping Test will trigger all A-sync functions: @future functions
        Test.stopTest();
    }
}