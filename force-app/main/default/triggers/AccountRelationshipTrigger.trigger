//
// (c) 2015 Appirio, Inc.
//
// Trigger Name: AccountRelationshipTrigger
// On SObject: Account Relationship (Account_Relationship__c)
// Description: For "Account Relationship" record type, the unique key for checking duplicate records should be "Parent Account" + "Child Account" +
// "Active Flag". For "Contact Relationship" record type, the unique key for checking duplicate records should be "Parent Account" + "Contact To" +
// "Contact Role(Primary Contact/Billing Contact)" + "Active Flag". Also, auto-populate 'Account.Parent_Broker__c'. The billing contact cannot be
// marked inactive if there is no other billing contact associated with that account.
//
// User Story Acceptance Criteria Updated on 29th April 2015 For Issue # I-157451 - A duplicate contact relationship should not be allowed
// irrespective of contact role.
//
// 17th March 2015    Hemendra Singh Bhati    Original (Task # T-371098)
// 23rd March 2015    Hemendra Singh Bhati    Modified (Task # T-372661)  - Complete Code Re-factored.
// 26th March 2015    Hemendra Singh Bhati    Modified (Task # T-373693)  - Complete Code Re-factored.
// 09th April 2015    Hemendra Singh Bhati    Modified (Task # T-377199)  - Added logic to auto-populate 'Account.Parent_Broker__c'.
// 23rd April 2015    Hemendra Singh Bhati    Modified (Issue # I-155139) - The billing contact cannot be marked inactive if there is no other
//                                                                        - billing contact associated with that account.
// 29th April 2015    Hemendra Singh Bhati    Modified (Issue # I-157451) - A duplicate contact relationship should not be allowed irrespective
//                                                                        - of contact role.
// 06th May 2015      Hemendra Singh Bhati    Modified (Task # T-392803)  - Set the boolean field "Is_Sent_To_CDH__c" value to "False" whenever a
//                                                                        - new record on 'Account_Relationship__c' object is created and whenever
//                                                                        - the "Active" field is updated to "False".
//
trigger AccountRelationshipTrigger on Account_Relationship__c(before insert, before update, after insert, after update, before Delete, after Delete) {
    if(OrderDecompController.testClassTriggerFlag == True){
        
    }else{
        // CRM-2170 - Execute Update Billing Contact Flag code for CDH Data Load
        if (AccountRelationshipTriggerHandler.runFutureMethod && trigger.isInsert && trigger.isAfter && Label.CDH_Data_Load_User.contains(UserInfo.getUserName())) {
            AccountRelationshipTriggerHandler.onAfterInsertUpdateUpdateForCDHUser(Trigger.newMap);
            
        }        
        
        // CRM-2170 - End
        List<String> UserNameStrings = new List<String>(Label.Avoid_Skip_Trigger.split(';'));
        DisabledTrigger__c Dtrg= DisabledTrigger__c.getValues('Disabled');
        // Turn off trigger if the value of custom setting field is true. 
        String usercheck='';
        if(Dtrg.AccountRelationshipTrigger__c!=null){usercheck=Dtrg.AccountRelationshipTrigger__c;}
        System.debug('The User coming over here****   ' + usercheck);
        //if(usercheck!= UserInfo.getUserName() && Label.Avoid_Skip_Trigger.contains(UserInfo.getUserName()){
            If(!UserNameStrings.contains(UserInfo.getUserName())){
            AccountRelationshipTriggerHandler theHandler = new AccountRelationshipTriggerHandler(Trigger.isExecuting, Trigger.size);
            
            // Turn off the trigger if the value of custom setting field is true.
            if(Switch_AccountRelationshipTrigger__c.getInstance().Set_Overall_Trigger_Off__c == false) {
                system.debug('TRACE: AccountRelationshipTrigger is active.');
                
                // Trigger Event - Before Insert/Update.
                if(trigger.isBefore && (trigger.isInsert || trigger.isUpdate)) {
        
                    theHandler.onBeforeInsertUpdate(trigger.new, trigger.oldMap, trigger.isInsert);
                    if( trigger.isUpdate  ){
                        theHandler.onBeforeUpdate(trigger.newmap, trigger.oldMap, trigger.isInsert);      
                    } 
                }
                
                if(Trigger.isBefore && Trigger.isInsert)
                    theHandler.handleBeforeInsert(Trigger.new);
               
                // Trigger Event - After Insert/Update.
                if(trigger.isAfter && (trigger.isInsert || trigger.isUpdate)) {
                    theHandler.onAfterInsertUpdate(trigger.newMap, trigger.oldMap, trigger.isInsert);                                   
                }
                // Trigger Event - After Delete
                 if(trigger.isAfter && trigger.isDelete){
                    theHandler.onAfterDelete(trigger.old);
                }
                if(trigger.isAfter && !trigger.isDelete){
                    FOR (Account_Relationship__c relloop : trigger.newMap.values()){
                        IF(trigger.NewMap.get(relloop.id).Relationship_Type__c == 'Parent/Child'){
                            If(trigger.isInsert){
                                theHandler.updateAccount(trigger.new);
                            }
                           
                            if(trigger.isUpdate){
                                IF(trigger.oldMap.get(relloop.id).Active__c != trigger.NewMap.get(relloop.id).Active__c){
                                    theHandler.updateAccount(trigger.old);
                                }
                            }
                        }
                    }
                }
            }
        }
        if((trigger.isUpdate || trigger.isInsert ) && trigger.isAfter){
            AccountRelationshipTriggerHandler theHandler = new AccountRelationshipTriggerHandler(Trigger.isExecuting, Trigger.size);            
            theHandler.onAfterInsertUpdateAccount(trigger.newMap, trigger.oldMap, trigger.isInsert);
        }
    }
}