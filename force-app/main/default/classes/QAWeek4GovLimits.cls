public with sharing class QAWeek4GovLimits {
    public QAWeek4GovLimits() {

    }

    //Function to test SOQL Governor Limit
    public void SOQLGovLimit()
    {
        List<Contact> maxContact = new List<Contact>();

        //Attempts to run the Select Query 150 times. The GOV limit for SOQL queries is 100 for SYNC APEX, so we should get an error
       // for(Integer i = 0; i < 150; i++)
        //{
            //maxContact = [SELECT ID, Name FROM Contact];
        //}
    }

    public void SOSLGovLimit()
    {
        //loop through a SOSL Query in order to hit the GOV limit of 20 searches
        for(Integer i = 0; i < 30; i++)
        {
        //    List<List<sObject>> returnLists = [FIND 'contract' IN ALL FIELDS RETURNING Account(Name), Contact(FirstName, LastName)];
            System.debug('Inside SOSL Gov Lim Loop');
        }
    }
}