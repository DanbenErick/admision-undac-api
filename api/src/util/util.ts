import { logger } from "../resources/manager-log.resource";

export default class SeguridadUtil {
    public fetchRowsFromRS = async (resultSet: any, numRows: any) => {
        return new Promise(async (resolve: any, reject: any) => {
            if ((resultSet)) {
                resultSet.getRows(
                    numRows,
                    async (err: any, rows: any) => {
                        if (err) {
                            logger.log("error in fetchRowsFromRS", err);
                            reject(err);
                        } else if (rows.length > 0) {
                            //_this.fetchRowsFromRS(resultSet, numRows);
                            resolve(rows);
                        } else {
                            resolve([]);
                        }
                    });
            } else {
                resolve(null);
            }
        });
    }

    public fetchRows = async (resultSet: any) => {
        let row: any;
        let resultRows: any[] = [];
        while ((row = await resultSet.getRow())) {
            resultRows.push(row);
        }
        await resultSet.close();
        return resultRows;
    }
}

export const generarConsulta = async (tabla: string, valores: any, condicion: any) => {
    if (condicion) {
        // Generar consulta UPDATE
        const actualizaciones = Object.entries(valores).map(([columna, valor]) => `${columna} = ?`).join(', ');
        return `UPDATE ${tabla} SET ${actualizaciones} WHERE ${condicion}`;
    } else {
        // Generar consulta INSERT
        const columnas = Object.keys(valores).join(', ');
        const marcadores = Object.values(valores).map(() => '?').join(', ');
        return `INSERT INTO ${tabla} (${columnas}) VALUES (${marcadores})`;
    }
}

export const obtenerQuery = async (accion: string, tabla: string, campos: any, where: any[]) => {
    let resultado: string = '';
    let queryTabla: string = tabla;
    let queryCampos: string = '';
    let queryParametros: string = '';
    let queryWhere: string = ' WHERE 1=1 ';
    switch (accion) {
        case 'UPDATE':
            queryTabla = 'UPDATE ' + tabla + ' SET ';
            queryCampos = '';
            queryWhere = ' WHERE 1=1 ';
            for (let key of Object.keys(campos)) {
                // console.log('key', key);
                const existe = where.filter(f => f.ID.toUpperCase() == key.toUpperCase()).length;
                if (existe == 0) queryCampos += key.toLowerCase() + '=' + ':' + key + ',';
            }
            queryCampos = queryCampos.substring(0, queryCampos.length - 1);
            for (let t of where) {
                queryWhere += ' AND ' + t.ID + ' = ' + ':' + t.ID;
            };
            resultado = queryTabla + queryCampos + queryWhere;
            break;
        case 'INSERT':
            queryTabla = 'INSERT INTO ' + tabla + ' ';
            queryCampos = '';
            queryWhere = ' WHERE 1=1 ';
            for (let key of Object.keys(campos)) {
                queryCampos += key.toLowerCase() + ','
                queryParametros += ':' + key + ',';
            }
            queryCampos = queryCampos.substring(0, queryCampos.length - 1);
            queryParametros = queryParametros.substring(0, queryParametros.length - 1);
            resultado = queryTabla + '(' + queryCampos + ') VALUES (' + queryParametros + ')';
            break;
    }
    return resultado;
}