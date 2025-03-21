@isTest
private class ContactsDML_test {

    // This method verifies that the standaloneDML method inserts two contacts into the database.
    @isTest
    private static void standaloneDMLTest() {
        // TODO #1: Review the code below to see how we are using  
        //          the assertEquals method of the System class to  
        //          ensure that there are no Contacts in the db.
        System.assertEquals(0, [SELECT LastName FROM Contact].size());
        
        // Call the standaloneDML method of the ContactsDML class.
        ContactsDML.standaloneDML();
        
        List<Contact> contactsPostInsert = [SELECT LastName FROM Contact];
        // TODO #2: Review the code below to see how we are using  
        //          the assertEquals method of the System class to  
        //          ensure that there are two Contacts in the db.
        System.assertEquals(2, contactsPostInsert.size());
        
        // TODO #3: Review the code below to see how we are using 
        //          the assert method of the System class to ensure that the 
        //          Contacts in the db contain the LastNames - 'Minkowitz' and 'Singh'
        Set<String> lastNameSet = new Set<String>();
        for (Contact contact : contactsPostInsert) {
            lastNameSet.add(contact.LastName);
        }
        System.assert(lastNameSet.contains('Minkowitz'));
        System.assert(lastNameSet.contains('Singh'));
    }

    // This method verifies that the databaseMethodDML method fails to insert two 
    // contacts into the database, because one contact does not include the LastName 
    // field and the DML method is using the default allOrNone value of true.
    @isTest
    private static void databaseMethodDMLTest() {

        // TODO #4: Review the code below to see how we are using
        //          the assert method of the System class to verify that the error message 
        //          returned by the getMessage method of the DMLException class contains the string 
        //          'Required fields are missing: [LastName]: [LastName]'.      
        try {
            ContactsDML.databaseMethodDML();
            System.Assert(false);
        } catch(DMLException e) {
            System.assert(e.getMessage().contains('Required fields are missing: [LastName]: [LastName]'));
        } 
    }

    // This method verifies that the databaseMethodPartialCommit method inserts one
    // contact into the database, because one contact does not include the LastName 
    // field and the DML method is using the value of false for the parameter allOrNone.      
    @isTest
    private static void databaseMethodPartialCommitTest() {

        // TODO #5: Review the code below to see how we are using  
        //          the assertEquals method of the System class to 
        //          ensure that there are no Contacts in the db.
        System.assertEquals(0, [SELECT LastName FROM Contact].size());
        
        ContactsDML.databaseMethodPartialCommit();
        
        // TODO #6: Review the code below to see how we are using  
        //          the assertEquals method of the System class to 
        //          ensure that there is only one Contact in the db.
        List<Contact> contactsPostInsert = [SELECT LastName FROM Contact];
        System.assertEquals(1, contactsPostInsert.size());
        
        // TODO #7  Review the code below to see how we are using  
        //          the assertEquals method of the System class to ensure  
        //          that the LastName of the Contact in the db contains 'Picasso'
        System.assertEquals('Picasso', contactsPostInsert[0].LastName);
    }
}