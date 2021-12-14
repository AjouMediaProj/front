const HttpStatus = Object.freeze({
    // 2XX: Successful
    OK: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,

    // 3XX: Redirection
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,

    // 4XX: Client Error
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,

    // 5XX: Server Error
    InternalServerError: 500,
    NotImplemented: 501,
});

const Category = Object.freeze({
    1: '총학생회',
    101: '정보통신대학',
    10101: '미디어학과',
    10102: '전자공학과',
    10103: '소프트웨어학과',
    10104: '국방디지털융합학과',
    10105: '사이버보안학과',
    10106: '인공지능융합학과',
    102: '공과대학',
    10201: '기계공학과',
    10202: '환경안전공학과',
    10203: '산업공학과',
    10204: '건설시스템공학과',
    10205: '화학공학과',
    10206: '교통시스템공학과',
    10207: '신소재공학과',
    10208: '건축학과',
    10209: '응용화학생명공학과',
    10210: '융합시스템공학과',
    103: '자연과학대학',
    10301: '수학과',
    10302: '화학과',
    10303: '물리학과',
    10304: '생명과학과',
    104: '경영대학',
    10401: '경영학과',
    10402: '금융공학과',
    10403: 'e-비즈니스학과',
    10404: '글로벌경영학과',
    105: '인문대학',
    10501: '국어국문학과',
    10502: '사학과',
    10503: '영어영문학과',
    10504: '문화콘텐츠학과',
    10505: '불어불문학과',
    106: '사회과학대학',
    10601: '경제학과',
    10602: '사회학과',
    10603: '행정학과',
    10604: '정치외교학과',
    10605: '심리학과',
    10606: '스포츠레저학과',
    10701: '의학과',
    10801: '간호학과',
    10901: '약학과',
});

class Type {
    get HttpStatus() {
        return HttpStatus;
    }

    get Category() {
        return Category;
    }
}

export default new Type();
