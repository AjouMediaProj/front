import utils from 'src/utils';

class Request {
    /**
     *
     * @param {String} email
     * @param {String} password
     * @returns {Promise<String>}
     */
    async login(email, password) {
        try {
            const response = await utils.axios.post('/auth', { email, password });
            return response.data.message;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     *
     * @param {String} email
     * @returns
     */
    async sendEmail(email) {
        try {
            const response = await utils.axios.post('/auth/send-mail', { email });
            return true;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     *
     * @param {String} email
     * @param {String} password
     * @param {String} authCode
     * @param {String} name
     * @param {Number} studentID
     * @param {Number} major
     * @returns
     */
    async sendAccount(email, password, authCode, name, studentID, major) {
        try {
            const response = await utils.axios.post('/auth/sign-up', { email, password, authCode, name, studentID, major });
            return true;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     *
     * @param {String} email
     * @param {String} password
     * @returns
     */
    async sendSignIn(email, password) {
        try {
            const response = await utils.axios.post('/auth/sign-in', { email, password });
            if (response.data.data == null) {
                throw response.data.url;
            }
            return response.data.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}

export default new Request();
