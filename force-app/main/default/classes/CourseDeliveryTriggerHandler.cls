public without sharing class CourseDeliveryTriggerHandler {

    private static Set<Date> allHolidays = new Set<Date>();

    static {
        for (Holiday h : [SELECT ActivityDate FROM Holiday]) {
            allHolidays.add(h.ActivityDate);
        }
    }

    public static void preventInvalidCourseDeliveries(List<Course_Delivery__c> newCourseDeliveryList,
                                                      Map<ID, Course_Delivery__c> oldCourseDeliveryMap) {
        
        List<Error_message__e> errors = new List<Error_Message__e>();
        for (Course_Delivery__c cd : newCourseDeliveryList) {
            if (oldCourseDeliveryMap?.get(cd.Id).Start_Date__c != cd.Start_Date__c) {   
                if ( allHolidays.contains(cd.Start_Date__c) ) {
                    cd.Start_Date__c.addError(Label.Invalid_Delivery_Start_Date);
                
                    // TODO #1
                    // Immediately Publish a platform event with details of the error
                    Error_Message__e event = new Error_Message__e();
                    event.Source_Component__c = 'CourseDeliveryTriggerHandler';
                    event.Message__c = 'ERROR: ' + Label.Invalid_Delivery_Start_Date;
                    EventBus.publish(event);
                }
            }
        }
    }
}