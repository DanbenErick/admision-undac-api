CREATE
OR REPLACE VIEW vista_obtener_vacantes_proceso_ult_activo AS
select
    procesos.NOMBRE AS NOMBRE_PROCESO,
    carreras.ESCUELA_COMPLETA AS NOMBRE_ESCUELA,
    vacantes.CANTIDAD AS CANTIDAD,
    carreras.AREA AS AREA,
    vacantes.ID_PROCESO as ID_PROCESO,
    procesos.ESTADO as ESTADO
from
    vacantes
    left join procesos on procesos.ID = vacantes.ID_PROCESO
    left join carreras on carreras.ID = vacantes.ID_CARRERA