public with sharing class Contacts_TS_Controller {
    @AuraEnabled
    public static List<Account> getAllAccounts() {
    	return [SELECT Id, Name FROM Account ORDER BY Name];
    }
    
    @AuraEnabled
    public static List<Contact> getAccountContacts(String accountId) {
    	return [SELECT LastName FROM Contact WHERE AccountId = :accountId ORDER BY LastName];
    }
}