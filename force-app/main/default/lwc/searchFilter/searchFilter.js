import { LightningElement, api, wire, track } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';
import getContact from '@salesforce/apex/ContactController.getContact';
const COLUMNS = [
   { label: 'First Name', fieldName:'FirstName', type: 'text', sortable: true},
   { label: 'Last Name', fieldName: 'LastName', type: 'text'},
   { label: 'Email', fieldName: 'Email', type: 'email'},
   { label: "Account Name", fieldName: "recordLink", type: "url",
      typeAttributes: { label: { fieldName: 'Account_Name' }}},
   { label: 'Mobile Phone', fieldName: 'Phone', type: 'phone', sortable: true },
   { label: 'Created Date', fieldName:  'CreatedDate', type: 'date', sortable: true, typeAttributes:{
   year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"}}
];
export default class SearchFilter extends LightningElement {
   @track contacts;
   columns = COLUMNS;
   @track error;
   @track contacts;
   @wire(getContactList)
   wiredAccounts({error, data}) {
      if (data) {
         var ObjData = JSON.parse(JSON.stringify(data));
         ObjData.forEach(item =>{
            item.recordLink = item.Account!=undefined ? '/lightning/r/Account/' +item.AccountId +'/view' : ''
            
      });
         this.contacts = ObjData;
     } else if (error) {
         this.error = error;
     }
   }
     searchKey;
    handelSearchKey(event){
        this.contacts = event.target.value;
    }
    SearchAccountHandler(){
        getContact({textkey: this.contacts})
        .then(result => {
                this.contacts = result;
        })
        .catch( error=>{
            this.contacts = null;
        });

    }
}

