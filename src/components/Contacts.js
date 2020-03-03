import React from 'react';
import { TabView, TabPanel } from 'primereact/tabview';


import { ADDRESS_BOOK_TABS } from '../utils/constants';
import ContactUtil from '../utils/contactUtil'; 
import APIServices from '../utils/apiService';
import UserContact from './UserContact';

class Contacts extends React.Component {
    constructor() {
        super();
        this.tabs = ADDRESS_BOOK_TABS;
        this.state = {
            activeIdx: 0,
            contactUsersData: [],
            contactUsers: [],
            selectedUser:{},
            contactsCount:0,
            dialogComp:[]
        }
        this.showContactsOnTabChange = this.showContactsOnTabChange.bind(this);
        this.showContactDialog = this.showContactDialog.bind(this);
    }

    componentDidMount() {
        this.getAndSetUserData();
    }


    /**
     * Function to make API call and fetch user contact data objects from server 
     */
    getAndSetUserData() {
        APIServices.getUserData()
            .then(res => {
                let respUserData = ContactUtil.sortAndGroup(res);
                let onLoadContacts = respUserData[this.tabs[0]]; // Get contacts which starts with "A" on load of application
                this.createContactNames(onLoadContacts)
                this.setState({ contactUsersData: respUserData, contactsCount:(onLoadContacts !== undefined ? onLoadContacts.length : 0)});
            })
            .catch(err => {
                console.error('Error during API call: ', err);
            });
    }

    showContactsOnTabChange(e) {
        this.setState({ activeIdx: e.index });
        let userData = this.state.contactUsersData[this.tabs[e.index]]
        this.setState({ contactsCount: (userData !== undefined ? userData.length : 0)});        
        this.createContactNames(userData)
    }

    createContactNames(userData) {
      let contactUsers = []
      if(userData === undefined) {
        contactUsers.push((
          <div className="grid_item" key="1">
              <div className="flex_center">No Contacts to show....!</div>
          </div>
        ))
      }
      else {
        contactUsers = userData && userData.map((user, idx) => {
          return (
            <div className="grid_item" key={idx} onClick={() => {this.showContactDialog(user)}}>
                <div className="flex_center">{user.name.last}, {user.name.first.toString().toUpperCase()}</div>
            </div>
          );
      });
      }
     this.setState({
        contactUsers: contactUsers
      })
    }

    showContactDialog(user) {
      let compVisible = true;
      this.setState({
        dialogComp : <UserContact user={user} visible={compVisible}/>
      })
    }
    
    render() {
        const { activeIdx, contactUsers,contactsCount, dialogComp } = this.state
        return (
            <div>
                <TabView onTabChange={(e) => this.showContactsOnTabChange(e)} activeIndex={activeIdx}>
                    {
                        this.tabs !== undefined && this.tabs.length > 0 && this.tabs.map((tabPnl, idx) => {
                            return (<TabPanel header={tabPnl} key={idx}>
                                <div className="contact_count">
                                    <span className="contact_text">
                                        Total Contacts : {contactsCount}
                                    </span>
                                </div>
                                <div className="grid">
                                    {contactUsers}
                                </div>         
                                {dialogComp}                       
                            </TabPanel>)
                        })
                    }
                </TabView>
            </div>
        )
    }
}

export default Contacts;