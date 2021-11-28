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
            const response = await utils.axios.post('/auth/sendmail', { email });
            if (response.data.data == null) {
                throw response.data.error;
            }
            return response.data.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async sendAccount(email, password, authCode, name, studentID, major) {
        try {
            const response = await utils.axios.post('/auth/signup', { email, password, authCode, name, studentID, major });
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
