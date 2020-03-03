import { CONFIG } from './constants';
/**
 * Util class to make APIServices
 */
class APIServices {
    /**
   * Method to fetch list of users from server
   * @param   {string} [userCount]  Count to users to be fetched
   * @returns {Promise}
   */
    async getUserData(userCount = CONFIG.numberCards) {
        const response = await fetch(
            CONFIG.userUrl + `/?results=${userCount}`
        );
        if (response.status === 200) {
            return await response.json();
        } else {
            throw Error('Invalid (or) unexpected response code from server');
        }
    }
}

export default new APIServices();
