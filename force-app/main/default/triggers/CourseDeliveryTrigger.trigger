//TODO #1: Enter the before insert and before update DML events
trigger CourseDeliveryTrigger on Course_Delivery__c (before insert, before update) {
    
    Trigger_Switch__mdt triggerSwitch = Trigger_Switch__mdt.getInstance('Course_Delivery_Trigger');
    if(triggerSwitch == null || triggerSwitch.Active_Flag__c)
    {
        //TODO #2: Review the for loop to see how we are populating allHolidays
        //  We have assumed that there are no recurring Holidays, for simplicity's sake.
        Set<Date> allHolidays = new Set<Date>();
        for (Holiday h : [SELECT ActivityDate FROM Holiday]) {
            allHolidays.add(h.ActivityDate);
        }
    
        for (Course_Delivery__c cd : Trigger.new) {
            // Always check Inserts, but only check Updates when the Delivery Date just changed:
            Boolean checkDate = (Trigger.isInsert || Trigger.oldMap.get(cd.Id).Start_Date__c != cd.Start_Date__c);


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