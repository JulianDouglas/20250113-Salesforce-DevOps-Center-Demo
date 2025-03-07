//Exercise 8-1 Class
//Designed to hold all the trigger information

public without sharing class CourseDeliveryTriggerClass {
    public CourseDeliveryTriggerClass() {
        System.debug('Inside Course Delivery Trigger Class Default Constructor');
    }

    //Trigger Call Function
    public void triggerAction(List<Course_Delivery__c> newVal, Map<ID, Course_Delivery__c> oldmapVal)
    {
                //TODO #2: Review the for loop to see how we are populating allHolidays
        //  We have assumed that there are no recurring Holidays, for simplicity's sake.
        Set<Date> allHolidays = new Set<Date>();
        for (Holiday h : [SELECT ActivityDate FROM Holiday]) {
            allHolidays.add(h.ActivityDate);
        }
    
        for (Course_Delivery__c cd : newVal) {
            // Always check Inserts, but only check Updates when the Delivery Date just changed:
            Boolean checkDate = (oldmapVal != null && oldmapVal.get(cd.Id).Start_Date__c != cd.Start_Date__c);


            if (checkDate && cd.Start_Date__c != NULL) {
                //TODO #3: Prevent the invoking DML action if the Start Date is 
                //  in the allHolidays set. Create an if statement that 
                //  determines if the Set allHolidays contains the course delivery 
                //  Start Date. Use the addError method of the sObject class to
                //  add an error to the cd sObject using the custom label you defined earlier
                if(allHolidays.contains(cd.Start_Date__c))
                {
                    cd.Start_Date__c.addError(Label.Invalid_Delivery_Start_Date);
                }
            }
        }
    }
}