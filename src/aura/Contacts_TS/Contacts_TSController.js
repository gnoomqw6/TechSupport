({
	doInit : function(component, event, helper) {
		helper.loadAllAccounts(component);
		helper.determineDevice(component);
   	}
})