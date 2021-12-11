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

class Type {
    get HttpStatus() {
        return HttpStatus;
    }
}

export default new Type();
