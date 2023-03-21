import db from '../config/database.js';
import validateStoreCakeSchema from '../schemas/storeCakeSchema.js';

export default async function store(req, res) {
  const {
    name,
    phone,
    cpf,
    birthday,
    error,
  } = await validateStoreCakeSchema(req.body);

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
