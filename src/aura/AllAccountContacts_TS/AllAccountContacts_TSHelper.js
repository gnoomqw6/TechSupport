({
	getAccountContacts : function(component) {
		var action = component.get('c.getAccountContacts');
		
		action.setParams({
			accountId: component.get('v.accountId')
		});
		
		action.setCallback(this, function(response) {
			if(response.getState() === 'SUCCESS') {
				var allContacts = response.getReturnValue();
				
				//	arrays for sorting contacts by opened request priority
				var highPrior = new Array();
				var midPrior = new Array();
				var lowPrior = new Array();
				var noPrior = new Array();
				
				while (allContacts.length > 0) {
					//	take off first contact from the returned array and get it's requests
					var con = allContacts.shift();
					var requests = con.Requests__r;
					//	server controller returned only opened requests
					//	if contact has opened requests - let's check priorities
					if (requests != null && requests.length > 0) {
						//	flags to check request priorities for current contact
						var toHighPrior = false;
						var toMidPrior = false;
						var toLowPrior = false;
						//	check requests in a cycle
						//	if contact has at least one high-prior request - stop cycle
						//	and push contact to highPrior array
						//	else - go through all requests and change flag values
						for (var i = 0; i < requests.length; i++) {
							if (requests[i].Priority__c == 'High') {
								toHighPrior = true;
								break;
							} else if (requests[i].Priority__c == 'Mid') {
								toMidPrior = true;
							} else {
								toLowPrior = true;
							}
						}
						
						//	check flags and push contact to certain array
						if (toHighPrior) {
							highPrior.push(con);
						} else if (toMidPrior) {
							midPrior.push(con);
						} else {
							lowPrior.push(con);
						}
					//	if contact has no opened requests (returned value by server)
					//	push it to noPrior array
					} else {
						noPrior.push(con);
					}
				}
				
				//	set our arrays to aura attributes
				component.set('v.highPriorContacts', highPrior);
				component.set('v.midPriorContacts', midPrior);
				component.set('v.lowPriorContacts', lowPrior);
				component.set('v.noPriorContacts', noPrior);
			}
		});
		
		$A.enqueueAction(action);
	}
})