const { MongoClient } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'slacktest';
const client = new MongoClient(url);

const SlackBot = require('slackbots');
// const axios = require('axios');



const finddob=async(users)=>{
  const dobdata = await users.aggregate([
    { 
      $match: {
        $expr: {
          $and: [
            { $eq: [{ $dayOfMonth: '$empDob' }, { $dayOfMonth: new Date() }] },
            { $eq: [{ $month: '$empDob' }, { $month: new Date() }] },
          ],
        },
      }
    }
  ]).toArray()
  return dobdata
}

async function ReadUser(){
  let data;
    try{
        await client.connect()
        const database= client.db(dbName)
        const rewards = database.collection('rewards');
        const users = database.collection('employees');
        // const value=await users.find({}).toArray();
        // console.log(value)
        const names =[]
        const reward = rewards.find().toArray()
        .then(()=>{
          console.log(reward)
        })
        // data=await finddob(users);
        // reward.map(reward=>{
        //   if(reward.reward_type==="birthday" && reward.recepients.includes("Employee"))
        //   {
        //     data.map(user=>{
        //       names.push({name:user.empName,manager:user.empReportingManager})
        //     })
        //   }
        // })
        // console.log(reward,data)
        // console.log(names)

    //     const request =require('request-promise')
    //   const axios = require('axios');

    // const user="Anivesh Bhadauriya"

    //     // const bot = new SlackBot({
    //     //       token:"xoxb-2723242021222-2728503775286-VkhxIgNryDI8vgsOayPjau26",
    //     //       usertoken:"xoxp-2723242021222-2726994179717-2735210921602-1738f6b4628233441010b2cd280b800d",
    //     //       singingSecret:"24e3446bf93a083b9f35c974ded37226",
    //     //       name: 'Team_Valuebound'
              
    //     //   });

          
    //       names.map(i=>{
    //         const res= request({
    //           url:"https://hooks.slack.com/services/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",
    //           method:"POST",
    //           body:{"text":`Happy Birthday to ${i.name} from ${i.manager}`},
    //           json:true
    //         })
    //     })
          
          
        //   bot.on('error', err => console.log(err));
          
          
          
          

      



    }
    catch(e){
        console.log(e)
    }
    finally{
        console.log("done")
        await client.close();
    }
}
ReadUser().catch(console.dir);












// const fetch = require("node-fetch");

// const SLACK_BOT_TOKEN = "xoxb-2723242021222-2728503775286-VkhxIgNryDI8vgsOayPjau26";

// const payload = {
//   channel: "Bhadauriya",
//   attachments: [
//     {
//       title: "My first Slack Message",
//       text: "Random example message text",
//       author_name: "alejandrogonzalez3",
//       color: "#00FF00",
//     },
//   ],
// };

// fetch("https://slack.com/api/chat.postMessage", {
//   method: "POST",
//   body: JSON.stringify(payload),
//   headers: {
//     "Content-Type": "application/json; charset=utf-8",
//     "Content-Length": payload.length,
//     Authorization: `Bearer ${SLACK_BOT_TOKEN}`,
//     Accept: "application/json",
//   },
// })
//   .then((res) => {
//     if (!res.ok) {
//       throw new Error(`Server error ${res.status}`);
//     }

//     return res.json();
//   })
//   .catch((error) => {
//     console.log(error);
//   });