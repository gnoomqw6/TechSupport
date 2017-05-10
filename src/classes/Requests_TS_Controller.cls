public with sharing class Requests_TS_Controller {
    @AuraEnabled
    public static List<Request__c> getOpenedRequests() {
    	return [SELECT Account__r.Name, Contact__r.LastName, Description__c,
    					Status__c, Priority__c, Expiration_Date__c, Cost__c
    			FROM Request__c WHERE Status__c != 'Closed' ORDER BY Expiration_Date__c];
    }
}