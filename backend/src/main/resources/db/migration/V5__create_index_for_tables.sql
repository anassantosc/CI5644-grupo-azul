-- Creating an index on the 'username' column of the 'USUARIO' table
-- This index will speed up login queries
CREATE UNIQUE INDEX idx_usuario_username ON USUARIO(username);

-- Creating a composite index on the 'user' and 'card' columns of the 'PERTENENCIA' table
-- This index will speed up queries related to a user's album
CREATE INDEX idx_pertenencia_user_card ON PERTENENCIA("user", card);

-- Creating an index on the 'id_usuario_offer' column of the 'TRADE' table
-- This index will speed up queries that filter by 'id_usuario_offer'
CREATE INDEX idx_trade_id_usuario_offer ON TRADE(id_usuario_offer);

-- Creating an index on the 'id_usuario_recieve' column of the 'TRADE' table
-- This index will speed up queries that filter by 'id_usuario_recieve'
CREATE INDEX idx_trade_id_usuario_recieve ON TRADE(id_usuario_recieve);

-- Creating an index on the 'id_barajita_offer' column of the 'TRADE' table
-- This index will speed up queries that filter by 'id_barajita_offer'
CREATE INDEX idx_trade_id_barajita_offer ON TRADE(id_barajita_offer);

-- Creating an index on the 'id_barajita_recieve' column of the 'TRADE' table
-- This index will speed up queries that filter by 'id_barajita_recieve'
CREATE INDEX idx_trade_id_barajita_recieve ON TRADE(id_barajita_recieve);

-- Creating an index on the 'status' column of the 'TRADE' table
-- This index will speed up queries that filter by 'status'
CREATE INDEX idx_trade_status ON TRADE(status);

-- Creating an index on the 'id_usuario' column of the 'COMPRA' table
-- This index will speed up queries that filter by 'id_usuario'
CREATE INDEX idx_compra_id_usuario ON COMPRA(id_usuario);

-- Creating an index on the 'dte' column of the 'COMPRA' table
-- This index will speed up queries that filter by 'date'
CREATE INDEX idx_compra_dte ON COMPRA(dte);