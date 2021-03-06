import utils from 'src/utils';

class Request {
    /**
     *
     *
     * @returns {Promise<Array<objList>}
     */
    async getList() {
        try {
            const response = await utils.axios.post('/vote/get-vote-list');
            if (response.data.data == null) {
                throw response.data.error;
            }
            return response.data.data.list;
        } catch (e) {
            utils.common.errorHandler(e);
        }
    }

    /**
     *
     * @param {Number} voteIdx
     * @returns {Promise<objVote>}
     */
    async getOverview(voteIdx) {
        try {
            const response = await utils.axios.post('/vote/get-vote-overview', { voteIdx });
            if (response.data.data == null) {
                throw response.data.error;
            }
            return response.data.data;
        } catch (e) {
            utils.common.errorHandler(e);
        }
    }

    /**
     *
     * @param {String} transactionHash
     * @returns
     */
    async getVoteReceipt(transactionHash) {
        try {
            const response = await utils.axios.post('/vote/decode-vote-receipt', { transactionHash });
            if (response.data.data == null) {
                throw response.data.error;
            }
            return response.data.data;
        } catch (e) {
            utils.common.errorHandler(e);
        }
    }

    /**
     *
     *
     * @returns
     */
    async getMyVote() {
        try {
            const response = await utils.axios.post('/vote/get-my-vote-in-progress');
            if (response.data.data == null) {
                throw response.data.error;
            }
            return response.data.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     *
     * @param {Number} page
     * @param {String} name
     * @param {Number} year
     * @returns
     */
    async getPastVote(page, name, year) {
        try {
            const response = await utils.axios.post('/vote/get-past-vote-result', { page, name, year });
            if (response.data.data == null) {
                throw response.data.error;
            }
            return response.data.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     *
     * @param {Number} voteIdx
     * @param {Number} candIdx
     * @param {Boolean} renounce
     * @returns
     */
    async sendVote(voteIdx, candIdx, renounce) {
        try {
            const response = await utils.axios.post('/vote/vote', { voteIdx, candIdx, renounce });
            if (response.data.data == null) {
                throw response.data.error;
            }
            return response.data.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}

export default new Request();

const objList = {
    idx: 0,
    name: '',
    startTime: 0,
    endTime: 0,
    category: 0,
};

const objCandidate = {
    idx: 0,
    voteIdx: 0,
    name: '',
    img: '',
    txt: '',
    count: 0,
    status: 0,
};

const objVote = {
    idx: 0,
    category: 0,
    name: '',
    totalCount: 0,
    startTime: 0,
    endTime: 0,
    status: 0,
    candidates: [objCandidate],
};
