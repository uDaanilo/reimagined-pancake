USE node-app;

CREATE TABLE peoples(
  id    int   not null    auto_increment,
  name    varchar(255),
  primary key(id)
);

INSERT INTO peoples(name) VALUES("Danilo")