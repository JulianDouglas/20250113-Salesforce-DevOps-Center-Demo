({
    handleVeteranClick : function(cmp, event, helper) {
        console.log("Veteran Clicked");
        try{
            let claimID = cmp.get('c.assignClaimOldestRecordToCurrentUser');
            claimID.setParams({ queueId : '00GDZ000005h9pg2AA' });
            cmp.set("v.vetButtonActivate", "true");
            cmp.set("v.feedbackText", "There are no pending Veteran Claims");

            claimID.setCallback(this, function(response) {
                //alert("Response Callback " + response.returnValue);
                console.log("Response Value "+ Object.keys(response.getReturnValue()));
                if(response.getReturnValue() !== null)
                {
                    var navEvt = $A.get("e.force:navigateToSObject");
                    navEvt.setParams({
                        "recordId": response.getReturnValue().Id//,
                        // "slideDevName": "Detail"
                        });
                    navEvt.fire();
                }
                else
                {
                    cmp.set("v.feedbackText", "There are no pending Veteran Claims");
                    console.log("Response Error "+ response.getError()[0].message);
                }
                
            });
    
            $A.enqueueAction(claimID);
            console.log("Action Enqueued");
        }
        catch(e){
            console.log(e.message);
        }
    },

    handleVeteranAppealClick : function(cmp, event, helper) {
        console.log("Veteran Appeal Clicked");
        try{
            let claimID = cmp.get('c.assignAppealOldestRecordToCurrentUser');
            claimID.setParams({ queueId : '00GDZ000005h9pb2AA' });
            cmp.set("v.vetAppButtonActivate", "true");
            cmp.set("v.feedbackText", "There are no pending Veteran Appeals");

            claimID.setCallback(this, function(response) {
                //alert("Response Callback " + response.returnValue);
                console.log("Response Value "+ Object.keys(response.getReturnValue()));
                if(response.getReturnValue() !== null)
                {
                    var navEvt = $A.get("e.force:navigateToSObject");
                    navEvt.setParams({
                        "recordId": response.getReturnValue().Id//,
                        // "slideDevName": "Detail"
                        });
                    navEvt.fire();
                }
                else
                {
                    cmp.set("v.feedbackText", "There are no pending Veteran Appeals");
                    console.log("Response Error "+ response.getError()[0].message);
                }
                
            });
    
            $A.enqueueAction(claimID);
            console.log("Action Enqueued");
        }
        catch(e){
            console.log(e.message);
        }
    },

    handleCivilianClick : function(cmp, event, helper) {
        console.log("Civilian Clicked");
        try{
            let claimID = cmp.get('c.assignClaimOldestRecordToCurrentUser');
            claimID.setParams({ queueId : '00GDZ000005h9pl2AA' });
            cmp.set("v.civButtonActivate", "true");
            cmp.set("v.feedbackText", "There are no pending Civilian Claims");

            claimID.setCallback(this, function(response) {
                //alert("Response Callback " + response.returnValue);
                console.log("Response Value "+ Object.keys(response.getReturnValue()));
                if(response.getReturnValue() !== null)
                {
                    var navEvt = $A.get("e.force:navigateToSObject");
                    navEvt.setParams({
                        "recordId": response.getReturnValue().Id//,
                        // "slideDevName": "Detail"
                        });
                    navEvt.fire();
                }
                else
                {
                    cmp.set("v.feedbackText", "There are no pending Civilian Claims");
                    console.log("Response Error "+ response.getError()[0].message);
                }
                
            });
    
            $A.enqueueAction(claimID);
            console.log("Action Enqueued");
        }
        catch(e){
            console.log(e.message);
        }
    },

    handleCivilianAppealClick : function(cmp, event, helper) {
        console.log("Civilian Clicked");
        try{
            let claimID = cmp.get('c.assignAppealOldestRecordToCurrentUser');
            claimID.setParams({ queueId : '00GDZ000005h9pq2AA' });
            cmp.set("v.civAppButtonActivate", "true");
            cmp.set("v.feedbackText", "There are no pending Civilian Appeals");

            claimID.setCallback(this, function(response) {
                //alert("Response Callback " + response.returnValue);
                console.log("Response Value "+ Object.keys(response.getReturnValue()));
                if(response.getReturnValue() !== null)
                {
                    var navEvt = $A.get("e.force:navigateToSObject");
                    navEvt.setParams({
                        "recordId": response.getReturnValue().Id//,
                        // "slideDevName": "Detail"
                        });
                    navEvt.fire();
                }
                else
                {
                    cmp.set("v.feedbackText", "There are no pending Civilian Appeals");
                    console.log("Response Error "+ response.getError()[0].message);
                }
                
            });
    
            $A.enqueueAction(claimID);
            console.log("Action Enqueued");
        }
        catch(e){
            console.log(e.message);
        }
    }
})