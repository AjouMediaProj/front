import utils from 'src/utils';

class Request {
    /**
     *
     *
     * @returns {Promise<String>}
     */
    async getList() {
        try {
            const response = await utils.axios.post('/vote/getVoteList');
            console.log(response);
            return response;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async getOverview(voteIdx) {
        try {
            const response = await utils.axios.post('/vote/getVoteOverview', { voteIdx });
            console.log(response);
            return response;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}

export default new Request();
