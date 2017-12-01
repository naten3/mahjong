"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var config_1 = require("./config");
var cookieParser = require("cookie-parser");
var express = require("express");
var logger = require("morgan");
var path = require("path");
var proxy = require("http-proxy-middleware");
function default_1(db) {
    var app = express();
    var apiProxy = proxy('!/api/**', { target: 'http://localhost:3001' });
    //Models
    for (var _i = 0, _a = config_1.default.globFiles(config_1.default.models); _i < _a.length; _i++) {
        var model = _a[_i];
        require(path.resolve(model));
    }
    // view engine setup
    app.set("views", path.join(__dirname, "../../src/views"));
    app.set("view engine", "jade");
    //app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
    app.use(logger("dev"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, "../../src/public")));
    app.use('/', apiProxy);
    //Routes
    for (var _b = 0, _c = config_1.default.globFiles(config_1.default.routes); _b < _c.length; _b++) {
        var route = _c[_b];
        require(path.resolve(route)).default(app);
    }
    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error("Not Found");
        next(err);
    });
    // production error handler
    app.use(function (err, req, res, next) {
        res.status(err.status || 500).render("error", {
            message: err.message,
            error: {}
        });
    });
    if (app.get("env") === "development") {
        app.use(function (err, req, res, next) {
            res.status(500).render("error", {
                message: err.message,
                error: err
            });
        });
    }
    return app;
}
exports.default = default_1;
;
//# sourceMappingURL=express.js.map