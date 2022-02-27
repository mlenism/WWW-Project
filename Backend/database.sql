--
-- PostgreSQL database dump
--

CREATE FUNCTION public.calculafactor(tiempoturno double precision, tiempomasviejo double precision, prioridad double precision) RETURNS double precision
    LANGUAGE plpgsql
    AS $_$
DECLARE
    f_tiempoturno ALIAS FOR $1;
	f_tiempomasviejo ALIAS FOR $2;
	f_prioridad ALIAS FOR $3;
	f_ahora double precision;
    f_factor double precision;
	f_tiempoespera double precision;
	i_tiempobloque bigint;
	f_prioridadfinal double precision;
BEGIN
	f_ahora=extract(epoch from now());
	f_tiempoespera=f_ahora-f_tiempoturno;
	
	i_tiempobloque=floor(f_tiempoespera/600.0);
	f_prioridadfinal=f_prioridad+i_tiempobloque*0.15;
	
	f_factor=(f_tiempoespera)*f_prioridadfinal/(f_ahora-f_tiempomasviejo);
	
	
	return f_factor;
    
END;
$_$;

CREATE VIEW public.vw_turnos AS
 SELECT t.turno_codigo,
    t.persona_nombre,
    t.persona_documento,
    t.servicio_codigo_id,
    t.servicio_nombre,
    t.consecutivo,
    t.turno_fecha,
    t.turno_hora,
    t.prioridadservicio,
    t.estado_codigo,
    t.estado_nombre,
    t.primero,
    t.ahora,
    t.tiempoturno,
    public.calculafactor(t.tiempoturno, t.primero, t.prioridadservicio) AS prioridad,
    ((t.ahora - t.tiempoturno) / (60.0)::double precision) AS tiempominutos
   FROM ( SELECT u.turno_codigo,
            p.persona_nombre,
            p.persona_documento,
            u.servicio_codigo_id,
            s.servicio_nombre,
            (((s.servicio_prefijo)::text || '-'::text) || lpad(((u.turno_consecutivo)::character varying)::text, 3, '0'::text)) AS consecutivo,
            u.turno_fecha,
            u.turno_hora,
            s.servicio_prioridad AS prioridadservicio,
            e.estado_codigo,
            e.estado_nombre,
            ( SELECT min(date_part('epoch'::text, ((("UserApp_turno".turno_fecha || ' '::text) || "UserApp_turno".turno_hora))::timestamp with time zone)) AS min
                   FROM public."UserApp_turno"
                  WHERE ("UserApp_turno".estado_codigo_id = '1')) AS primero,
            date_part('epoch'::text, now()) AS ahora,
            date_part('epoch'::text, (((u.turno_fecha || ' '::text) || u.turno_hora))::timestamp with time zone) AS tiempoturno
           FROM public."UserApp_turno" u,
            public."UserApp_persona" p,
            public."UserApp_servicio" s,
            public."UserApp_estado" e
          WHERE ((u.estado_codigo_id = e.estado_codigo) AND (u.persona_codigo_id = p.persona_codigo) AND (u.servicio_codigo_id = s.servicio_codigo))) t;


INSERT INTO public."UserApp_estado" (estado_nombre) VALUES ('PENDIENTE');
INSERT INTO public."UserApp_estado" (estado_nombre) VALUES ('EJECUTADO');
INSERT INTO public."UserApp_estado" (estado_nombre) VALUES ('SALTADO');
INSERT INTO public."UserApp_estado" (estado_nombre) VALUES ('LLAMADO');


INSERT INTO public."UserApp_servicio" (servicio_nombre, servicio_prefijo, servicio_prioridad, servicio_consecutivoactual) VALUES ('GENERAL', 'GN', 0.1, 0);
INSERT INTO public."UserApp_servicio" (servicio_nombre, servicio_prefijo, servicio_prioridad, servicio_consecutivoactual) VALUES ('IMPORTACION Y EXPORTACION', 'IE', 0.2, 0);
INSERT INTO public."UserApp_servicio" (servicio_nombre, servicio_prefijo, servicio_prioridad, servicio_consecutivoactual) VALUES ('SEGUROS', 'SE', 0.3, 0);
INSERT INTO public."UserApp_servicio" (servicio_nombre, servicio_prefijo, servicio_prioridad, servicio_consecutivoactual) VALUES ('TRANSACCION DOLARES', 'DO', 0.4, 0);
INSERT INTO public."UserApp_servicio" (servicio_nombre, servicio_prefijo, servicio_prioridad, servicio_consecutivoactual) VALUES ('VIP', 'VI', 0.5, 0);