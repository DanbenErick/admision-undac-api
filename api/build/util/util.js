"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerQuery = void 0;
const manager_log_resource_1 = require("../resources/manager-log.resource");
class SeguridadUtil {
    constructor() {
        this.fetchRowsFromRS = (resultSet, numRows) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                if ((resultSet)) {
                    resultSet.getRows(numRows, (err, rows) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            manager_log_resource_1.logger.log("error in fetchRowsFromRS", err);
                            reject(err);
                        }
                        else if (rows.length > 0) {
                            //_this.fetchRowsFromRS(resultSet, numRows);
                            resolve(rows);
                        }
                        else {
                            resolve([]);
                        }
                    }));
                }
                else {
                    resolve(null);
                }
            }));
        });
        this.fetchRows = (resultSet) => __awaiter(this, void 0, void 0, function* () {
            let row;
            let resultRows = [];
            while ((row = yield resultSet.getRow())) {
                resultRows.push(row);
            }
            yield resultSet.close();
            return resultRows;
        });
    }
}
exports.default = SeguridadUtil;
const obtenerQuery = (accion, tabla, campos, where) => __awaiter(void 0, void 0, void 0, function* () {
    let resultado = '';
    //
    let queryTabla = tabla;
    let queryCampos = '';
    let queryParametros = '';
    let queryWhere = ' WHERE 1=1 ';
    //
    switch (accion) {
        case 'UPDATE':
            queryTabla = 'UPDATE ' + tabla + ' SET ';
            queryCampos = '';
            queryWhere = ' WHERE 1=1 ';
            for (let key of Object.keys(campos)) {
                //console.log('key', key);
                const existe = where.filter(f => f.ID.toUpperCase() == key.toUpperCase()).length;
                if (existe == 0)
                    queryCampos += key.toLowerCase() + '=' + ':' + key + ',';
            }
            queryCampos = queryCampos.substring(0, queryCampos.length - 1);
            for (let t of where) {
                queryWhere += ' AND ' + t.ID + ' = ' + ':' + t.ID;
            }
            ;
            resultado = queryTabla + queryCampos + queryWhere;
            break;
        case 'INSERT':
            queryTabla = 'INSERT INTO ' + tabla + ' ';
            queryCampos = '';
            queryWhere = ' WHERE 1=1 ';
            for (let key of Object.keys(campos)) {
                queryCampos += key.toLowerCase() + ',';
                queryParametros += ':' + key + ',';
            }
            queryCampos = queryCampos.substring(0, queryCampos.length - 1);
            queryParametros = queryParametros.substring(0, queryParametros.length - 1);
            resultado = queryTabla + '(' + queryCampos + ') VALUES (' + queryParametros + ')';
            break;
    }
    return resultado;
});
exports.obtenerQuery = obtenerQuery;
