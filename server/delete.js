const router4 = require('express').Router();
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
//Delete a user - admin
router4.delete('/api/user', async (req, res) => {
    const {id} = req.body;
    const deletedUser = await prisma.user.delete({
        where:{
            id:id
        }
    }).catch(err => {
        res.sendStatus(500);
    })
    if(deletedUser){
        res.sendStatus(200);
    }else{
        res.sendStatus(500)
    }
})

module.exports = router4;