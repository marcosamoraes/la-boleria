import db from '../config/database.js';
import validateStoreCakeSchema from '../schemas/storeCakeSchema.js';

export default async function store(req, res) {
  const {
    name,
    price,
    image,
    description,
    flavourId,
    error,
  } = await validateStoreCakeSchema(req.body);

  if (error) return res.status(error.code).send(error.message);

  try {
    const nameExists = await db.query('SELECT id FROM cakes WHERE "name" = $1', [name]);
    if (nameExists.rows.length > 0) return res.sendStatus(409);

    if (flavourId) {
      const flavourExists = await db.query('SELECT id FROM flavours WHERE "id" = $1', [flavourId]);
      if (flavourExists.rows.length <= 0) return res.sendStatus(404);
    }

    await db.query('INSERT INTO cakes ("flavourid", "name", "price", "image", "description") VALUES ($1, $2, $3, $4, $5)', [flavourId, name, price, image, description]);

    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err);
  }
}
