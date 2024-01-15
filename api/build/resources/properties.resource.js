"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionProdBizlinks = exports.ConnectionDesaBizlinks = exports.ConnectionProdOracle = exports.ConnectionDesaOracle = exports.DBMongodb = exports.ConnectionMongodb = exports.Properties = exports.CredentialsMysqlDev = void 0;
exports.CredentialsMysqlDev = {
    host: 'localhost',
    user: 'danben',
    password: '',
    database: 'admision_undac'
};
exports.Properties = {
    secret: '12345678D3rt34n0vStuck3r12345678',
    saltRound: 10
};
exports.ConnectionMongodb = {
    desarrollo: '192.168.13.7',
    produccion: '192.168.13.228'
};
exports.DBMongodb = {
    desarrollo: 'mongodb://dest:desa@',
    produccion: 'mongodb://@',
    port: ':27017',
    database: '/phoenix'
};
exports.ConnectionDesaOracle = {
    user: 'dest',
    pass: 'oracle',
    cadena: '192.168.1.30:32124/XE',
    poolMin: 1,
    poolMax: 2
};
exports.ConnectionProdOracle = {
    user: 'dest',
    pass: 'oracle',
    cadena: '209.126.82.179:32124/XE',
    poolMin: 10,
    poolMax: 20
};
exports.ConnectionDesaBizlinks = {
    user: 'bizlinks',
    pass: 'P4$$w0rd',
    cadena: '192.168.1.30:32123/XE',
    poolMin: 5,
    poolMax: 10
};
exports.ConnectionProdBizlinks = {
    user: 'bizlinks',
    pass: 'P4$$w0rd',
    cadena: '172.17.0.4:32123/XE',
    poolMin: 5,
    poolMax: 10
};
