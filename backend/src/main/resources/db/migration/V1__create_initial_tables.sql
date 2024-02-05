CREATE TABLE USUARIO (
    id       BIGINT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password    VARCHAR(50) NOT NULL
);

CREATE TABLE BARAJITA (
    id          INT         NOT NULL PRIMARY KEY,
    player_name VARCHAR(50) NOT NULL,
    height      FLOAT,
    weight      FLOAT,
    country     VARCHAR(50) NOT NULL,
    position    VARCHAR(50) NOT NULL,
    shirt_number INT
);

CREATE TABLE PERTENENCIA (
    id          BIGINT          PRIMARY KEY,
    "user" BIGINT     NOT NULL REFERENCES USUARIO (id),
    card INT     NOT NULL REFERENCES BARAJITA (id),
    visibility BOOLEAN,
    quantity    INT,
    UNIQUE ("user", card)
);

CREATE TABLE TRADE (
    id                  SERIAL PRIMARY KEY,
    id_usuario_offer    INT         NOT NULL REFERENCES USUARIO (id),
    id_usuario_recieve  INT         NOT NULL REFERENCES USUARIO (id),
    id_barajita_offer   INT         NOT NULL,
    id_barajita_recieve INT         NOT NULL,
    status              VARCHAR(50) NOT NULL CHECK (status IN ('PENDING', 'ACEPTED', 'CANCELLED', 'COUNTEROFFER'))
);

CREATE TABLE COMPRA (
    id         SERIAL PRIMARY KEY,
    id_usuario INT  NOT NULL REFERENCES USUARIO (id),
    dte        DATE NOT NULL,
    price      FLOAT
);