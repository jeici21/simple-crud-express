import { db } from "..";

export const createTableUsers = () => {
    db.none(/*sql*/`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            nombre VARCHAR(100),
            correo VARCHAR(100)
        )
    `).then(() => {
        console.log('Tabla de usuarios creada exitosamente');
    }).catch((error: Error) => {
        console.error('Error al crear la tabla:', error);
    });
}

export const users = {
    create: (nombre: string, correo: string) =>
        db.one('INSERT INTO users(nombre, correo) VALUES($1, $2) RETURNING id', [nombre, correo]),
    getById: (id: string) =>
        db.oneOrNone('SELECT * FROM users WHERE id = $1', id),
    getAll: () =>
        db.any('SELECT * FROM users'),
    update: (id: string, nombre: string, correo: string) =>
        db.none('UPDATE users SET nombre=$1, correo=$2 WHERE id=$3', [nombre, correo, id]),
    delete: (id: string) =>
        db.none('DELETE FROM users WHERE id=$1', id)
};