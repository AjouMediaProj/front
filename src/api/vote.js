import utils from 'src/utils';

class Request {
    /**
     *
     *
     * @returns {Promise<String>}
     */
    async getList() {
        try {
            const response = await utils.axios.get('/vote/list');
            return response;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}

export default new Request();
