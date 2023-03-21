import db from '../config/database.js';
import validateStoreOrderSchema from '../schemas/storeOrderSchema.js';
import validateUpdateOrderSchema from '../schemas/updateOrderSchema.js';

export async function list(req, res) {
  try {
    const users = await db.query('SELECT * FROM users');
    return res.send(users.rows);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function show(req, res) {
  const { id } = req.params;

  try {
    const user = await db.query('SELECT * FROM users where "id" = $1', [id]);

    if (user.rows.length === 0) return res.sendStatus(404);
    return res.send(user.rows[0]);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function store(req, res) {
  const {
    name,
    phone,
    cpf,
    birthday,
    error,
  } = await validateStoreOrderSchema(req.body);

  if (error) return res.status(error.code).send(error.message);

  try {
    const userExists = await db.query('SELECT id FROM users WHERE "cpf" = $1', [cpf]);

    if (userExists.rows.length > 0) return res.sendStatus(409);

    await db.query('INSERT INTO users ("name", "phone", "cpf", "birthday") VALUES ($1, $2, $3, $4)', [name, phone, cpf, birthday]);

    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function updateDelivered(req, res) {
  const { id } = req.params;

  const {
    name,
    phone,
    cpf,
    birthday,
    error,
  } = await validateUpdateOrderSchema(req.body);

  if (error) return res.status(error.code).send(error.message);

  try {
    const cpfIsUsed = await db.query('SELECT id FROM users WHERE "cpf" = $1 AND "id" != $2', [cpf, id]);

    if (cpfIsUsed.rows.length > 0) return res.sendStatus(409);

    await db.query('UPDATE users SET "name" = $1, "phone" = $2, "cpf" = $3, "birthday" = $4 WHERE "id" = $5', [name, phone, cpf, birthday, id]);

    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).send(err);
  }
}
