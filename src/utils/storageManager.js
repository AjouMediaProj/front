class StorageManager {
    /**
     *
     *  @returns {objUser}
     */
    get userInfo() {
        return JSON.parse(sessionStorage.getItem('user'));
    }

    /**
     *
     * @param {objUser} obj
     *
     */
    setUserInfo(obj) {
        sessionStorage.setItem('user', JSON.stringify(obj));
    }

    /**
     *
     * @returns {Boolean}
     */
    get auth() {
        return sessionStorage.getItem('auth');
    }

    /**
     *
     * @param {Boolean} status
     */
    setAuth(status) {
        sessionStorage.setItem('auth', status);
    }

    /**
     *
     * @returns {Boolean}
     */
    get back() {
        return sessionStorage.getItem('back');
    }

    /**
     *
     * @param {Boolean} status
     */
    setBack(status) {
        sessionStorage.setItem('back', status);
    }
}

export default new StorageManager();

const objUser = {
    idx: 0,
    name: '',
    studentID: 0,
    major: 0,
    email: '',
    accessLevel: 0,
};
