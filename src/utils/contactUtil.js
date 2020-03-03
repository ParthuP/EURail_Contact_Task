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
    const sortedData = userRawData.results.sort((obj1, obj2) => {
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
}

export default ContactUtil;
