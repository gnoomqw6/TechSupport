public with sharing class Contacts_TS_Controller {
    @AuraEnabled
    public static List<Account> getAllAccounts() {
    	return [SELECT Id, Name FROM Account ORDER BY Name];
    }
    
    @AuraEnabled
    public static List<Contact> getAccountContacts(String accountId) {
    	return [SELECT LastName, Phone, MobilePhone, Teamviewer_ID__c, 
    					(SELECT Priority__c, Status__c 
    					FROM Requests__r WHERE Status__c != 'Closed' 
    					ORDER BY Status__c) 
    			FROM Contact WHERE AccountId = :accountId ORDER BY LastName];
    }
}