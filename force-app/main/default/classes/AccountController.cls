public class AccountController {
     
   @AuraEnabled
   public static list<Contact> fetchAccounts(){
       return [SELECT Id, Name, Account.Name, Phone FROM Contact LIMIT 10];
   }
}