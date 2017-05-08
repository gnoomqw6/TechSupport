({
	getAccountContacts : function(component) {
		var action = component.get('c.getAccountContacts');
		
		action.setParams({
			accountId: component.get('v.accountId')
		});
		
		action.setCallback(this, function(response) {
			if(response.getState() === 'SUCCESS') {
				console.log('contacts were loaded');
				component.set('v.contacts', response.getReturnValue());
			}
		});
		
		$A.enqueueAction(action);
	}
})