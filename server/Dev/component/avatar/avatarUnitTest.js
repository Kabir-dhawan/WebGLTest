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