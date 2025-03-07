public with sharing class VFDynamicObjectSearchController {
    
    
    public String selectedObject {get; set;}
    public List<SelectOption> objectOptions {
        get{
            if(objectOptions == null){
                
                //initlaizings new list
                List<SelectOption> options = new List<SelectOption>();
                options.add(new SelectOption('Account', 'Account')); //label, name
                options.add(new SelectOption('Contact', 'Contact'));
                options.add(new SelectOption('Course__c', 'Course__c'));

/*              objectOptions = new List<SelectOption>();
                objectOptions.add(new SelectOption('Account', 'Account')); //label, name
                objectOptions.add(new SelectOption('Case', 'Case'));
                objectOptions.add(new SelectOption('Course__c', 'Course__c')); */
                return options;
            }
            else
            {
                return objectOptions;
            }
        }

        //no setter - read-only property
    }

    public List<Map<String, String>> records { get; set; }

    public void fetchRecords() {
        records = new List<Map<String,String>>();
        List<sObject> queryResults = new List<sObject>();

        // retrieve records
        if(selectedObject == 'Account') {
            queryResults = [SELECT ID, Name FROM Account];
        }
        else if(selectedObject == 'Contact')
        {
            queryResults = [SELECT ID, Name FROM Contact];
        }
        else if(selectedObject == 'Course__c')
        {
            queryResults = [SELECT ID, Name FROM Course__c];
        }

        //add result to map
        for(SObject obj : queryResults)
        {
            Map<String, String> recordsMap = new Map<String, String>();
            recordsMap.put('Id', (String)obj.get('Id'));
            recordsMap.put('Name', (String) obj.get('Name'));

            records.add(recordsMap);
        }

    }
}