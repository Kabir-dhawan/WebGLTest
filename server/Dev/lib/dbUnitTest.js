const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'AvatarWorldDB',
  password: 'root',
  port: 5432,
});

const createUser = (request, response) => {
    //const { actor_id, image_url, rpm_id, file_name } = [1, 'http://example.com/avatar.glb', 'some_rpm_id', 'avatar.glb'];
  const actor_id = 1;
  const image_url = 'http://example.com/avatar.png';
  const avatar_url = 'http://example.com/avatar.glb';
  const rpm_id = 'some_rpm_id';
  const file_name  = 'file'; 
    pool.query('INSERT INTO avatars ( image_url, rpm_id, file_name, avatar_url) VALUES ($1, $2, $3, $4) RETURNING *', [ image_url, rpm_id, file_name, avatar_url], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
  }

  createUser();