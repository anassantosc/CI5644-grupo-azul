CREATE TABLE USUARIO (
    id       SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    psswd    VARCHAR(50) NOT NULL
);

CREATE TABLE BARAJITA (
    id          INT         NOT NULL PRIMARY KEY,
    player_name VARCHAR(50) NOT NULL,
    height      FLOAT,
    weight      FLOAT,
    country     VARCHAR(50) NOT NULL,
    position    VARCHAR(50) NOT NULL
);

CREATE TABLE PERTENENCIA (
    id_usuario  INT     NOT NULL REFERENCES USUARIO (id),
    id_barajita INT     NOT NULL REFERENCES BARAJITA (id),
    visibilidad BOOLEAN NOT NULL,
    quantity    INT     NOT NULL,
    PRIMARY KEY (id_usuario, id_barajita)
);

CREATE TABLE TRADE (
    id                  SERIAL PRIMARY KEY,
    id_usuario_offer    INT         NOT NULL REFERENCES USUARIO (id),
    id_usuario_recieve  INT         NOT NULL REFERENCES USUARIO (id),
    id_barajita_offer   INT         NOT NULL REFERENCES BARAJITA (id_barajita),
    id_barajita_recieve INT         NOT NULL REFERENCES BARAJITA (id_barajita),
    status              VARCHAR(50) NOT NULL CHECK (status IN ('PENDING', 'ACEPTED', 'CANCELLED', 'COUNTEROFFER'))
);

CREATE TABLE COMPRA (
    id         SERIAL PRIMARY KEY,
    id_usuario INT  NOT NULL REFERENCES USUARIO (id),
    dte        DATE NOT NULL,
    price      FLOAT
);
