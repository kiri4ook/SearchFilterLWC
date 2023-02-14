public with sharing class ContactController {
   @AuraEnabled(cacheable=true)
   public static List<Contact> getContactList(){
      return[ SELECT Id, FirstName, LastName, AccountId, Account.Name, Email, Phone, CreatedDate
      FROM Contact
      WITH SECURITY_ENFORCED
      ORDER BY FirstName
      ];
   }
   @AuraEnabled(cacheable=true)
   public static List<Contact> getContact(String textkey) {
      textkey = '%' + textkey + '%';
       List<Contact> contList = [ SELECT Id, FirstName, LastName, AccountId, Account.Name, Email, Phone, CreatedDate
       FROM Contact
       WHERE FirstName LIKE :textkey
       ORDER BY FirstName
   ];
   if(contList.isEmpty()) {
      throw new AuraHandledException('No Record Found..');
  }
      return contList;
   }

   // @AuraEnabled(cacheable=true)
   // public static List<Contact> getContacts( String searchkey) {
   //     System.debug('searchkey'+searchkey);
   //     string searchKeyword = '%' + searchkey + '%';
   //     return [
   //         SELECT Id, FirstName, LastName, Phone, Email, Account.Name,AccountId, CreatedDate
   //         FROM Contact where Name LIKE :searchKeyword
   //         LIMIT 5
   //     ];
   // }
}