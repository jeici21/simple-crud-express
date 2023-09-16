import { Request, Response } from 'express';
import { users } from "../models/Users";

interface UsersBody { nombre: string, correo: string }
interface Users extends UsersBody { id: string }

export const usersController = {
    getAll: (req: Request, res: Response) => {
        users.getAll().then((data: Users[]) => {
            if (data) {
                res.json(data)
            } else {
                res.status(404).json({ message: 'No hay registros' });
            }
        }).catch((error: Error) => {
            res.status(500).json({ error: error.message });
        });
    },
    getById: (req: Request, res: Response) => {
        const id = req.params.id;

        users.getById(id).then((data: Users) => {
            if (data) {
                res.json(data)
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        }).catch((error: Error) => {
            res.status(500).json({ error: error.message });
        });
    },
    create: (req: Request, res: Response) => {
        const { nombre, correo }: UsersBody = req.body;

        users.create(nombre, correo).then((newUser: UsersBody) => {
            res.json(newUser);
        }).catch((error: Error) => {
            res.status(500).json({ error: error.message });
        });
    },
    update: (req: Request, res: Response) => {
        const id = req.params.id;
        const { nombre, correo }: UsersBody = req.body;

        users.getById(id).then((data: Users) => {
            if (!data) return res.status(404).json({ message: 'Usuario no encontrado' });

            users.update(id, nombre, correo).then(() => {
                res.json({ message: 'Usuario actualizado' });
            }).catch((error: Error) => {
                res.status(500).json({ error: error.message });
            });
        }).catch((error: Error) => {
            res.status(500).json({ error: error.message });
        });
    },
    delete: (req: Request, res: Response) => {
        const id = req.params.id;

        users.getById(id).then((data: Users) => {
            if (!data) return res.status(404).json({ message: 'Usuario no encontrado' });

            users.delete(id).then(() => {
                res.json({ message: 'Usuario eliminado' });
            }).catch((error: Error) => {
                res.status(500).json({ error: error.message });
            });
        }).catch((error: Error) => {
            res.status(500).json({ error: error.message });
        });
    }
};