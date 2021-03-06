import utils from 'src/utils';

class Request {
    /**
     *
     * @param {String} email
     * @returns
     */
    async sendEmail(email) {
        try {
            const response = await utils.axios.post('/auth/send-auth-mail', { email });
            return true;
        } catch (e) {
            utils.common.errorHandler(e);
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
            utils.common.errorHandler(e);
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
            return response.data.data;
        } catch (e) {
            utils.common.errorHandler(e);
        }
    }

    async sendSignOut() {
        try {
            await utils.axios.post('/auth/sign-out');
            return true;
        } catch (e) {
            utils.common.errorHandler(e);
        }
    }

    async sendPassword(password) {
        try {
            await utils.axios.patch('/auth/update-password', { password });
            return true;
        } catch (e) {
            utils.common.errorHandler(e);
        }
    }
}

export default new Request();
