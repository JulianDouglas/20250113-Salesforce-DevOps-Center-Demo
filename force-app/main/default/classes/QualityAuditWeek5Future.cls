//The main Quality Audit Week 5 class
public with sharing class QualityAuditWeek5Future {
    public QualityAuditWeek5Future() {
        System.debug('Inside class constructor');
    }

    //Non future function that will call the future function
    public void basicTestedFunction()
    {
        System.debug('Before Future Call');

        List<string> stringDebugMessage = new List<string>();
        stringDebugMessage.add('This ');
        stringDebugMessage.add('is a ');
        stringDebugMessage.add('FUTURE ');
        stringDebugMessage.add('message!');

        futureTestFunction(stringDebugMessage);

        System.debug('After Future Call');
    }

    //TODO: Declare @Future class to run
    @Future
    private static void futureTestFunction(List<string> stringToAdd)
    {
        string debugString = '';

        for(string currentlistValue: stringToAdd){
            debugString += currentlistValue;
        }

        System.debug(debugString);
    }
}