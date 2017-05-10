({
	getRequests : function(component) {
		var action = component.get('c.getOpenedRequests');
		
		action.setCallback(this, function(response) {
			if (response.getState() === 'SUCCESS') {
				var requests = response.getReturnValue();
				
				//	arrays for requests with certain status
				var notStarted = new Array();
				var inProgress = new Array();
				var waiting = new Array();
				var notPayed = new Array();
				
				//	determine request status and push to certain array
				for (var i = 0; i < requests.length; i++) {
					var req = requests[i];
					if (req.Ststus__c == 'Not started') {
						notStarted.push(req);
					} else if (req.Status__c == 'In progress') {
						inProgress.push(req);
					} else if (req.Status__c == 'Waiting') {
						waiting.push(req);
					} else {
						notPayed.push(req);
					}
				}
				
				//	setting aura attributes
				component.set('v.notStarted', notStarted);
				component.set('v.inProgress', inProgress);
				component.set('v.waiting', waiting);
				component.set('v.notPayed', notPayed);
			}
		});
		
		$A.enqueueAction(action);
	}
})