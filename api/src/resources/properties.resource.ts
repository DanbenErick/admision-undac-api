export const Properties = {
    secret: '12345678D3rt34n0vStuck3r12345678',
    saltRound: 10
};

export const ConnectionMongodb = {
    desarrollo: '192.168.13.7',
    produccion: '192.168.13.228'
}

export const DBMongodb = {
    desarrollo: 'mongodb://dest:desa@',
    produccion: 'mongodb://@',
    port: ':27017',
    database: '/phoenix'
}

export const ConnectionDesaOracle = {
    user: 'dest',
    pass: 'oracle',
    cadena: '192.168.1.30:32124/XE',
    poolMin: 1,
    poolMax: 2
}

export const ConnectionProdOracle = {
    user: 'dest',
    pass: 'oracle',
    cadena: '209.126.82.179:32124/XE',
    poolMin: 10,
    poolMax: 20
}

export const ConnectionDesaBizlinks = {
    user: 'bizlinks',
    pass: 'P4$$w0rd',
    cadena: '192.168.1.30:32123/XE',
    poolMin: 5,
    poolMax: 10
}

export const ConnectionProdBizlinks = {
    user: 'bizlinks',
    pass: 'P4$$w0rd',
    cadena: '172.17.0.4:32123/XE',
    poolMin: 5,
    poolMax: 10
}