import db from '../config/database.js';
import validateStoreFlavourSchema from '../schemas/storeFlavourSchema.js';

export default async function store(req, res) {
  const {
    name,
    error,
  } = await validateStoreFlavourSchema(req.body);

  if (error) return res.status(error.code).send(error.message);

  try {
    const flavourExists = await db.query('SELECT id FROM flavours WHERE "name" = $1', [name]);

    if (flavourExists.rows.length > 0) return res.sendStatus(409);

    await db.query('INSERT INTO flavours ("name") VALUES ($1)', [name]);

    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err);
  }
}
