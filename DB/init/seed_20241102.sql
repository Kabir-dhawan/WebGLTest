INSERT INTO actors (name, description, gender) 
VALUES 
 ('Actor1', 'Actor1.', 0),
  ('Actor2', 'Actor2.', 0),
   ('Actor3', 'Actor3.', 0),
    ('Bride', 'This is a sample bio for the bride actor.', 1),
    ('Groom', 'This is a sample bio for the groom actor.', 2);

INSERT INTO users (username, email, password_hash) 
VALUES ('guest_user', 'shobhit.rawat@saathi.in','');

INSERT INTO scenes(title, description)
VALUES ('scene 1', 'testing')

INSERT INTO scene_actors(scene_id, actor_id)
VALUES(1,1),(1,2)