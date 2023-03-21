CREATE TABLE IF NOT EXISTS flavours (
  id serial PRIMARY KEY,
  name VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS cakes (
  id serial PRIMARY KEY,
  flavourId INT NOT NULL,
  name VARCHAR NOT NULL,
  price NUMERIC NOT NULL,
  image VARCHAR NOT NULL,
  description TEXT NOT NULL,
  FOREIGN KEY (flavourId) REFERENCES flavours (id)
);

CREATE TABLE IF NOT EXISTS clients (
  id serial PRIMARY KEY,
  name VARCHAR NOT NULL,
  address VARCHAR NOT NULL,
  phone VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
  id serial PRIMARY KEY,
  clientId INT NOT NULL,
  cakeId INT NOT NULL,
  quantity INT NOT NULL DEFAULT 0,
  createdAt TIMESTAMP NOT NULL,
  totalPrice NUMERIC NOT NULL,
  isDelivered BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (clientId) REFERENCES clients (id),
  FOREIGN KEY (cakeId) REFERENCES cakes (id)
);