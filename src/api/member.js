import utils from 'src/utils';

class Request {
    async login(email, password) {
        try {
            const response = await utils.axios.post('member/login', { email, password });
            return response.data.message;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}

export default new Request();
