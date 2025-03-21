public class ContactsDML {

    public static void standaloneDML(){
        //----------------------------------------------------------
        // TASK 1: Use standalone DML command to insert new Contacts.
        //----------------------------------------------------------

        // TODO #1: Declare a variable whose type is Contact named name1
        //          and initialize it to a newly constructed Contact sObject
        //          assigning the field LastName the value 'Minkowitz'.
        Contact name1 = new Contact(LastName = 'Minkowitz');

        // TODO #2: Declare a variable whose type is Contact named name2
        //          and initialize it to a newly constructed Contact sObject
        //          assigning the field LastName the value 'Singh'.
        Contact name2 = new Contact(LastName = 'Singh');

        // TODO #3: Declare a variable whose type is a List of Contact sObjects
        //          named contacts and initialize it to a newly constructed List.
        List<Contact> contacts = new List<Contact>();

        // TODO #4: Add name1 to the list contacts.
        contacts.add(name1);
        // TODO #5: Add name2 to the list contacts.
        contacts.add(name2);
        // TODO #6: Use the standalone insert command to insert contacts into the database.
        insert contacts;

        // When you successfully insert an sObject instance, the ID of the inserted instance is returned to it.
        // TODO #7: Write a statement to output the ID of name1 into the debug log.
        System.debug(name1.id);
        // TODO #8: Write a statement to output the ID of name2 into the debug log.
        System.debug(name2.id);
    }

    public static void databaseMethodDML(){
        //-------------------------------------------------------------
        // TASK 2: Use a Database class method to insert Contacts.
        //-------------------------------------------------------------

        // TODO #1: Declare a variable whose type is Contact named name1.
        //          It should not set any fields.
        Contact name1 = new Contact();

        // TODO #2: Declare a variable whose type is Contact named name2
        //          and initialize it to a newly constructed Contact sObject
        //          assigning the field LastName the value 'Picasso'.
        Contact name2 = new Contact(LastName = 'Picasso');

        // TODO #3: Declare a variable whose type is a List of Contact sObjects
        //          named contacts and initialize it to a newly constructed List.
        List<Contact> contacts = new List<Contact>();

        // TODO #4: Add name1 and name2 to the list contacts.
        contacts.add(name1);
        contacts.add(name2);

        // TODO #5: Use the Database.insert command to replicate the
        //          behavior you would expect by issuing the command:
        //          insert contacts;
        //          Because name1 has not been assigned a string value,
        //          you should expect a DMLexception.
        Database.insert(contacts);

    }

    public static void databaseMethodPartialCommit(){
        //-----------------------------------------------------------------------------
        // TASK 3: Use a Database class method to insert Contacts with a partial commit
        //-----------------------------------------------------------------------------

        // TODO #1: Declare a variable whose type is Contact named name1.
        //          It should not set any fields.
        Contact name1 = new Contact();


        // TODO #2: Declare a variable whose type is Contact named name2
        //          and initialize it to a newly constructed Contact sObject
        //          assigning the field LastName the value 'Picasso'.
        Contact name2 = new Contact(LastName = 'Picasso');

        // TODO #3: Declare a variable whose type is a List of Contact sObjects
        //          named contacts and initialize it to a newly constructed List.
        List<Contact> contacts = new List<Contact>();

        // TODO #4: Add name1 and name2 to the list contacts.
        contacts.add(name1);
        contacts.add(name2);

        // TODO #5: Use the Database.insert command to insert the Contacts
        //          in contacts, with a partial commit.
        Database.insert(contacts, false);

        // TODO #6: Print the id of name2 to the debug log.
        System.debug(name2.id);
    }
}