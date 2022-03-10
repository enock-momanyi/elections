const router3 = require('express').Router();
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
//update a candidate's info
router3.put('/api/candidate', async (req, res) => {
    const {username,email,password,firstname, middlename,lastname,alias,party,
        position,deputy,countyId, constituencyId, userId} = req.body;
    const user = await prisma.candidate.update({
        where:{userId: userId},
        data:{
            firstname:firstname,
            middlename:middlename,
            lastname:lastname,
            alias:alias,
            party:party,
            position:position,
            deputy:deputy,
            countyId:Number(countyId),
            constituencyId:Number(constituencyId)
        }
    }).catch(err => {
        res.sendStatus(500);
    })
    if(user){
        res.sendStatus(201);
    }else{
        res.sendStatus(500);
    }
})
//update user info
router3.put('/api/user', async (req, res) => {
    const {id,username, email} = req.body;
    const user = await prisma.user.update({
        where:{id:id},
        data:{
            username:username,
            email:email
        }
    }).catch(err => {
        res.sendStatus(500)
    })
    if(user){
        res.sendStatus(201);
    }else{
        res.sendStatus(500);
    }
})

module.exports = router3;