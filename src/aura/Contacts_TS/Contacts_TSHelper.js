({
	loadAllAccounts : function(component) {
		var action = component.get('c.getAllAccounts');
		
		action.setCallback(this, function(response) {
			if(response.getState() === 'SUCCESS') {
				component.set('v.accounts', response.getReturnValue());
                console.log('number of loaded accounts: ' + response.getReturnValue().length);
                component.set('v.testAcc', response.getReturnValue()[0]);
			}
		});
		
		$A.enqueueAction(action);
	},

	determineDevice : function(component) {
		var device = $A.get('$Browser.formFactor');
        console.log('device is: ' + device);
		if (device != 'DESKTOP') {
			component.set('v.isPhone', true);
		}
	}
})