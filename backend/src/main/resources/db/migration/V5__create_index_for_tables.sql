-- Creating an index on the 'username' column of the 'USUARIO' table
-- This index will speed up login queries
CREATE UNIQUE INDEX idx_usuario_username ON USUARIO(username);

-- Creating a composite index on the 'user' and 'card' columns of the 'PERTENENCIA' table
-- This index will speed up queries related to a user's album
CREATE INDEX idx_pertenencia_user_card ON PERTENENCIA("user", card);

-- Creating an index on the 'id_usuario_offer' column of the 'OFERTA' table
-- This index will speed up queries that filter by 'id_usuario_offer'
CREATE INDEX idx_oferta_id_usuario_offer ON OFERTA(id_usuario_offer);

-- Creating an index on the 'id_usuario_recieve' column of the 'OFERTA' table
-- This index will speed up queries that filter by 'id_usuario_receive'
CREATE INDEX idx_oferta_id_usuario_receive ON OFERTA(id_usuario_receive);

-- Creating an index on the 'id_barajita_offer' column of the 'OFERTA' table
-- This index will speed up queries that filter by 'id_barajita_offer'
CREATE INDEX idx_oferta_id_barajita_offer ON OFERTA(id_barajita_offer);

-- Creating an index on the 'id_barajita_recieve' column of the 'OFERTA' table
-- This index will speed up queries that filter by 'id_barajita_receive'
CREATE INDEX idx_oferta_id_barajita_receive ON OFERTA(id_barajita_receive);

-- Creating an index on the 'status' column of the 'OFERTA' table
-- This index will speed up queries that filter by 'status'
CREATE INDEX idx_oferta_status ON OFERTA(status);

-- Creating an index on the 'id_usuario' column of the 'COMPRA' table
-- This index will speed up queries that filter by 'id_usuario'
CREATE INDEX idx_compra_id_usuario ON COMPRA(id_usuario);

-- Creating an index on the 'dte' column of the 'COMPRA' table
-- This index will speed up queries that filter by 'date'
CREATE INDEX idx_compra_dte ON COMPRA(dte);