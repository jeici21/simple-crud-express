import express from "express";
import { usersController } from "../controllers/users";

const usersRoutes = express.Router();

usersRoutes.get('/', usersController.getAll);
usersRoutes.get('/:id', usersController.getById);
usersRoutes.post('/', usersController.create);
usersRoutes.put('/:id', usersController.update);
usersRoutes.delete('/:id', usersController.delete);

export default usersRoutes;