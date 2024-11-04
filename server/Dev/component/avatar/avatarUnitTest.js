const db = require('../../lib/db_connection');
const avatarService = require('./avatarService');

// async function  test(){
//     const result = await db.query('SELECT * FROM actors', (  res, err)=>{
//         console.log( res);
//         if(err){
//             console.log( err);
//         }
//     });
//     return result;
// }
// async function  test(){
//     const result = await db.query('SELECT * FROM actors');
//     return result;
// }

async function test(){
    const res =await avatarService.createAvatar({
        actor_id:"1",
         image_url:"https://models.readyplayer.me/671783714282a03a4e713737.png", 
         rpm_id:"671783714282a03a4e713737", 
         file_name:"671783714282a03a4e713737"
    });
    return res;
}
test().then(( res)=>{
             console.log( "test",res);
        });


// async function testQuery() {
//     try {
//         const result = await db.query(
//             `INSERT INTO avatars (actor_id, image_url, rpm_id, file_name) 
//             VALUES ($1, $2, $3, $4) `,
//             [1, 'http://example.com/avatar.glb', 'some_rpm_id', 'avatar.glb']
//             , (error, results) => {
//                 if (error) {
//                   throw error
//                 }
//                 response.status(201).send(`User added with ID: ${results.rows[0].id}`)
//               });
//         console.log('Query Result:', result.rows[0]);
//     } catch (error) {
//         console.error('Test Query Error:', error.message);
//     }
// }
// testQuery().then(( res, err)=>{
//              console.log( "test",res, err);
//         });

