/**
 * Util class to help in user component
 */
class UserUtil {
    /**
     * Method to return asked property nested inside provided object with safetey check
     * @param   {string} [givenObj]  Object to read property from
     * @param   {Array} [path]  Array with level of nested property
     * Eg: [a,b,c] - expected to retun givenObj.a.b.c
     * @returns {Object}
     */
    static getProperty(givenObj, path) {
      return path.reduce(
        (obj, key) => (obj && obj[key] !== undefined ? obj[key] : undefined),
        givenObj
      );
    }
  
    /**
     * Method used to get user phone - checks for phone value and fallbacks to cell value
     * @param {Object} user User object
     * @return {String} Phone (or) Cell number
     */
    static getUserPhone(user = {}) {
      let phoneNum;
      if (user.phone) {
        phoneNum = user.phone;
      } else {
        phoneNum = user.cell;
      }
      return phoneNum;
    }
  
    /**
     * Method used to get formatted address - concatenates different address fields in user object
     * @param {Object} user User object
     * @return {String} Concatenated user object
     */
    static getFormattedAddress(user) {
      let address = '';
      address += UserUtil.getProperty(user, ['location', 'street', 'number']);
      address +=
        ', ' + UserUtil.getProperty(user, ['location', 'street', 'name']);
      address += ', ' + UserUtil.getProperty(user, ['location', 'city']);
      address += ', ' + UserUtil.getProperty(user, ['location', 'state']);
      address += ', ' + UserUtil.getProperty(user, ['location', 'country']);
      address += ', ' + UserUtil.getProperty(user, ['location', 'postcode']);
      return address;
    }
  }
  
  export default UserUtil;
  