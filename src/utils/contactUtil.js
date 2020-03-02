import { ADDRESS_BOOK_TABS } from './constants';

/**
 * Util class to make APIServices
 */
class ContactUtil {
  /**
   * Method to sort and group raw data recieved from server
   * based on first name
   * Used by {@link Contact#getAndSetUserData}
   * @param {Object} userRawData raw data object recieved from server
   * @return {Object} contains sorted and grouped data
   */
  static sortAndGroup(userRawData) {
    const sortedData = userRawData.results.sort(function(obj1, obj2) {
      return obj1.name.first.localeCompare(obj2.name.first);
    });
    let groupedData = {};
    for (let user of sortedData) {
      var firstLetter = user.name.first[0].toUpperCase();
      if (firstLetter && !ADDRESS_BOOK_TABS.includes(firstLetter)) {
        firstLetter = ADDRESS_BOOK_TABS[ADDRESS_BOOK_TABS.length - 1];
      }
      if (groupedData[firstLetter] && groupedData[firstLetter].length >= 0)
        groupedData[firstLetter].push(user);
      else {
        groupedData[firstLetter] = [];
        groupedData[firstLetter].push(user);
      }
    }
    return groupedData;
  }

  /**
   * Returns a user object based on selected alphabet when view is of type LIST_VIEW.
   * Used by {@link Contact#getAndSetUserData}
   * Also used to reset to initial state when view changes between GRID_VIEW and LIST_VIEW.
   * @param {String} selectedTab alphabet selected by user
   * @param {Array} sortedData user list grouped and sorted based on alphabet list
   * @return {Object} state object with user to be set to state based on selected alphabet
   */
  static getIntialStateListType(selectedTab, sortedData) {
    let selectedTabContactList = sortedData[selectedTab];
    let defaultSelectedItem =
      selectedTabContactList &&
      selectedTabContactList.length &&
      selectedTabContactList[0];
    return {
      selectedUser: defaultSelectedItem,
    };
  }

  /**
   * Always returns an object with user object set to null - because of GRID_VIEW
   * Used to clear the user object set in state
   */
  static getIntialStateGridType() {
    return {
      selectedUser: null,
    };
  }
}

export default ContactUtil;
