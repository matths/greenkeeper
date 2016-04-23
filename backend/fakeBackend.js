var jswiremocklib, jswiremock, stubFor, get, post, put, urlEqualTo, a_response;
jswiremocklib = require('jswiremock'),
    jswiremock = jswiremocklib.jswiremock,
    stubFor = jswiremocklib.stubFor,
    get = jswiremocklib.get,
    post = jswiremocklib.post,
    // put = jswiremocklib.put, not impl
    urlEqualTo = jswiremocklib.urlEqualTo, a_response = jswiremocklib.a_response;

var jswiremock = new jswiremock(5001); //port 

stubFor(jswiremock, get(urlEqualTo("/actor/:varying_var/"))
    .willReturn(a_response()
        .withStatus(200)
        .withHeader({"Content-Type": "application/json"})
        .withBody("some Jso fasdfkjj n")));

stubFor(jswiremock, post(urlEqualTo("/rate"), {type: "down", newsid: ":varying_var"})
    .willReturn(a_response()
        .withStatus(200)
        .withStatus(200)
        .withHeader({"Content-Type": "application/json"})
        .withBody("[{\"status\":\"success\"}]")));

stubFor(jswiremock, post(urlEqualTo("/rate/:varying_var/down/"))
    .willReturn(a_response()
        .withStatus(200)
        .withHeader({"Content-Type": "application/json"})
        .withBody("[{\"status\":\"success\"}]")));


stubFor(jswiremock, post(urlEqualTo("/rate/:varying_var/up/"))
    .willReturn(a_response()
        .withStatus(200)
        .withHeader({"Content-Type": "application/json"})
        .withBody("[{\"status\":\"success\"}]")));

stubFor(jswiremock, post(urlEqualTo("/login"), {username: "flo", password: "geheim"})
    .willReturn(a_response()
        .withStatus(200)
        .withHeader({})
        .withBody("")));

// jswiremock.stopJswiremock();

