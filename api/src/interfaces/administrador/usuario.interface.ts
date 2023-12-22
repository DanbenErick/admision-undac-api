export interface Usuario{
    ID_USUA: number;
    CO_USUA: string;
    DE_PASS_USUA: string;
    IN_REGI_ACTI: string;
    CO_USUA_CREA: string;
    FE_CREA: Date;
    IP_TERM_CREA: string;
    CO_USUA_MODI: string;
    FE_MODI: Date;
    IP_TERM_MODI: string;
    NO_USUA: string;
    AP_PATE: string;
    AP_MATE: string;
    ID_SESN: string;
    IP_TERM_SESN: string;
    FE_LOGN: Date;
    IN_CAMB_PASS: string;
    IN_TIPO_USUA: string;
    DE_CORREO: string;
    IN_ENV_CORR: string;
    NU_INTE_FALL: number;
    IN_USUA_BLOQ: string;
    IN_REST_PASS: string;
    FE_EXPI_PASS: Date;
}

export interface UsuarioComprador{
    ID_USUA?: number;
    ID_AGNT?: number;
    IN_ESTA_ACTI?: string;
    ID_UNID_OPER?: number;
}
