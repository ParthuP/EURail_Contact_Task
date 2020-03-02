import React from 'react';

import {TabView,TabPanel} from 'primereact/tabview';
import { ADDRESS_BOOK_TABS } from '../utils/constants';
import ContactUtil from '../utils/contactUtil';

import APIServices from '../utils/apiService'

class Contacts extends React.Component {

    constructor(){
        super();
        this.tabs = ADDRESS_BOOK_TABS;
        this.state ={
            selectedTab:this.tabs[0]
        }
    }

    componentDidMount() {
        this.getAndSetUserData();
    }

    
  /**
   * Function to make API call and fetch user contact data objects from server
   * Also groups data and sets the value to {@link ContactList#state#selectedUser}
   * using method {@link ContactList#getIntialStateListType}
   */
  getAndSetUserData() {
    APIServices.getUserData()
      .then(res => { 
        this.userSortedData = ContactUtil.sortAndGroup(res);
        let initialState = ContactUtil.getIntialStateListType(this.state.selectedTab, this.userSortedData) 
        this.setState({ ...initialState, loading: false });
      })
      .catch(err => {
        console.error('Error during API call: ', err);
      });
  }


    render(){
        return(
            <div>
                <TabView>
                    {
                        this.tabs !== undefined && this.tabs.length > 0 && this.tabs.map((tabPnl, idx) => {
                            return (<TabPanel header={tabPnl}></TabPanel>)
                        })
                    }
                </TabView>
            </div>
        )
    }
}

export default Contacts;