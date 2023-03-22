import dayjs from 'dayjs';
import db from '../config/database.js';
import validateStoreOrderSchema from '../schemas/storeOrderSchema.js';

export async function list(req, res) {
  const { date } = req.query;

  try {
    let query = `
      SELECT
        json_build_object(
          'id', cl.id,
          'name', cl.name,
          'address', cl.address,
          'phone', cl.phone
        ) AS client,
        json_build_object(
          'id', ca.id,
          'name', ca.name,
          'price', ca.price,
          'description', ca.description,
          'image', ca.image
        ) AS cake,
        CASE WHEN (ca.flavourid IS NOT NULL) THEN
        json_build_object(
          'id', f.id,
          'name', f.name
        )
        ELSE NULL END AS flavour,
        o.id AS "orderId",
        TO_CHAR(o.createdat, 'yyyy-mm-dd hh24:mi') AS "createdAt",
        o.quantity AS quantity,
        o.totalprice AS "totalPrice",
        o.isdelivered AS "isDelivered"
      FROM orders o
      INNER JOIN clients cl on o.clientid = cl.id
      INNER JOIN cakes ca on o.cakeid = ca.id
      LEFT JOIN flavours f on ca.flavourid = f.id
    `;
    const params = [];

    if (date) {
      query += `
        WHERE createdat::date = $1
      `;
      params.push(date);
    }

    const orders = await db.query(query, params);
    return res.send(orders.rows);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function show(req, res) {
  const { id } = req.params;

  try {
    const query = `
      SELECT
        json_build_object(
          'id', cl.id,
          'name', cl.name,
          'address', cl.address,
          'phone', cl.phone
        ) AS client,
        json_build_object(
          'id', ca.id,
          'name', ca.name,
          'price', ROUND(ca.price, 2),
          'description', ca.description,
          'image', ca.image
        ) AS cake,
        CASE WHEN (ca.flavourid IS NOT NULL) THEN
        json_build_object(
          'id', f.id,
          'name', f.name
        )
        ELSE NULL END AS flavour,
        o.id AS "orderId",
        TO_CHAR(o.createdat, 'yyyy-mm-dd hh24:mi') AS "createdAt",
        o.quantity AS quantity,
        ROUND(o.totalprice, 2) AS "totalPrice",
        o.isdelivered AS "isDelivered"
      FROM orders o
      INNER JOIN clients cl on o.clientid = cl.id
      INNER JOIN cakes ca on o.cakeid = ca.id
      LEFT JOIN flavours f on ca.flavourid = f.id
      WHERE o.id = $1
    `;

    const order = await db.query(query, [id]);

    if (order.rows.length === 0) return res.sendStatus(404);

    return res.send(order.rows[0]);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function store(req, res) {
  const {
    clientId,
    cakeId,
    quantity,
    totalPrice,
    error,
  } = await validateStoreOrderSchema(req.body);

  if (error) return res.status(error.code).send(error.message);

  try {
    const clientExists = await db.query('SELECT id FROM clients WHERE "id" = $1', [clientId]);
    if (clientExists.rows.length <= 0) return res.sendStatus(404);

    const cakeExists = await db.query('SELECT id FROM cakes WHERE "id" = $1', [cakeId]);
    if (cakeExists.rows.length <= 0) return res.sendStatus(404);

    const createdAt = dayjs().format();

    await db.query('INSERT INTO orders ("clientid", "cakeid", "quantity", "totalprice", "createdat") VALUES ($1, $2, $3, $4, $5)', [clientId, cakeId, quantity, totalPrice, createdAt]);

    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function updateDelivered(req, res) {
  let { id } = req.params;
  id = Number(id);

  if (Number.isNaN(id)) return res.sendStatus(400);

  try {
    const order = await db.query('SELECT id FROM orders WHERE "id" = $1', [id]);
    if (order.rows.length <= 0) return res.sendStatus(404);

    await db.query('UPDATE orders SET isdelivered = true WHERE "id" = $1', [id]);

    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).send(err);
  }
}
