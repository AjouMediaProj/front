import types from 'src/utils/types';

class common {
    /**
     *
     * @param {Number} start
     * @param {Number} end
     * @returns {String}
     */

    changeDate(start, end) {
        const startTime = new Date(start);
        const endTime = new Date(end);

        let startDate = '';
        startDate += startTime.getFullYear() + '.';
        startDate += this.changeDateFomat(startTime.getMonth() + 1);
        startDate += '.' + this.changeDateFomat(startTime.getDate());

        let endDate = '';
        endDate += endTime.getFullYear() + '.';
        endDate += this.changeDateFomat(endTime.getMonth() + 1);
        endDate += '.' + this.changeDateFomat(endTime.getDate());

        return startDate + ' ~ ' + endDate;
    }

    /**
     *
     * @param {String} time
     * @returns {String}
     */
    changeDateFomat(time) {
        if (time < 10) return '0' + time;
        else return time;
    }

    errorHandler(err) {
        if (err.response == null) {
            console.log(err);
        } else if (err.response.status === types.HttpStatus.Unauthorized) {
            alert('세션 만료, 새로고침됩니다.');
            sessionStorage.clear();
            window.location.href = '/vote';
        } else {
            throw err;
        }
    }
}

export default new common();
