const mongoose = require("mongoose");
const rewardModal=require("./model/rewardsmodal");
const employeeModal=require("./model/employeeModel");
const request =require('request-promise')
const axios = require('axios');
const db = mongoose.connection;


const connectdb=async()=>{
    await mongoose.connect("mongodb://127.0.0.1:27017/slacktest");
}

const findworkanniversary=async()=>{
    const workAnniversarydata = await employeeModal.aggregate([
        { 
          $match: {
            $expr: {
              $and: [
                { $eq: [{ $dayOfMonth: '$empDoj' }, { $dayOfMonth: new Date() }] },
                { $eq: [{ $month: '$empDoj' }, { $month: new Date() }] },
              ],
            },
          }
        }
      ])
    return workAnniversarydata;
}

const finddob=async()=>{
    const dobdata = await employeeModal.aggregate([
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
    ])
    return dobdata;
  }
const names=[];const work=[]
  const checkreward=async()=>{
      try {
        await connectdb()
        console.log("connected")
        await rewardModal.find({}).exec()
        .then(rewards=>{
            rewards.map(reward=>{
                if(reward.reward_type==="birthday" && reward.recepients.includes("Employee")){
                    finddob().then(users=>{
                        users.map(user=>{
                            // const res= request({
                            //     url:"https://hooks.slack.com/services/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",
                            //     method:"POST",
                            //     body:{"text":`Happy Birthday to ${user.empName} from ${user.empReportingManager}`},
                            //     json:true
                            // })
                            names.push({name:user.empName,manager:user.empReportingManager})
                            //   slack msg for birthday here
                        })
                        console.log(names)
                    })
                }
                 else if (reward.reward_type==="work anniversary" && reward.recepients.includes("Employee")){
                    findworkanniversary().then(work_anniversary=>{
                        work_anniversary.map(i=>{
                            // const res= request({
                            //     url:"https://hooks.slack.com/services/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",
                            //     method:"POST",
                            //     body:{"text":`work anniversary to ${i.empName} from ${i.empReportingManager}`},
                            //     json:true
                            // });
                            work.push({name:i.empName,manager:i.empReportingManager})
                        })
                        console.log(work)
                    })
                }
                else if(reward.reward_type==="" && reward.recepients.includes("Selected")){
                    
                }   
            })
        }
        )
        
    } catch (error) {
        console.log(error)
    }
   
}
checkreward()

