import db from '../config/database.js';
import validateStoreClientSchema from '../schemas/storeClientSchema.js';

export async function listOrders(req, res) {
  const { id } = req.params;

  try {
    const clientExists = await db.query('SELECT id FROM clients WHERE "id" = $1', [id]);
    if (clientExists.rows.length <= 0) return res.sendStatus(404);

    const query = `
      SELECT
        o.id AS "orderId",
        o.quantity AS quantity,
        TO_CHAR(o.createdat, 'yyyy-mm-dd hh24:mi') AS "createdAt",
        ROUND(o.totalprice, 2) AS "totalPrice",
        ca.name AS "cakeName",
        o.isdelivered AS "isDelivered"
      FROM orders o
      INNER JOIN clients cl on o.clientid = cl.id
      INNER JOIN cakes ca on o.cakeid = ca.id
      WHERE cl.id = $1
    `;

    const orders = await db.query(query, [id]);

    return res.send(orders.rows);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function store(req, res) {
  const {
    name,
    address,
    phone,
    error,
  } = await validateStoreClientSchema(req.body);

  if (error) return res.status(error.code).send(error.message);

  try {
    await db.query('INSERT INTO clients ("name", "address", "phone") VALUES ($1, $2, $3)', [name, address, phone]);

    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err);
  }
}
