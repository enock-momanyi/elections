const router1 = require('express').Router();
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const bcrt = require('bcryptjs');

router1.post('/api/logout', (req,res) => {
    res.cookie('jwt','',{
        maxAge:0
    })
    res.sendStatus(200); 
})
router1.post('/api/login', async (req, res) => {
    const {email, password} = req.body;
    const findUser = await prisma.user.findUnique({
        where:{
            email: String(email)
        }
    });
    if(findUser){
        bcrt.compare(password, findUser.password, (err, success) =>{
            if(err){
                res.sendStatus(500)
            }else{
                if(success){
                    const token = jwt.sign(findUser.id,'secret')
                    res.cookie('jwt',token,{ 
                        httpOnly:true,
                        maxAge: 24*60*60*1000,
                    })
                    res.json({message:'success'})
                }else{
                    res.status(401).json({message:'Invalid username or password'})
                }
            }
        })
    }else{
        res.sendStatus(401) 
    }
})
//add an admin
router1.post('/api/admin', async (req, res) => {
    const {email, password} = req.body;
    const admin = await prisma.admin.create({
        data:{
            email:email,
            password: bcrt(password,10)
        }
    }).catch(err => {
        res.sendStatus(500)
    })
    if(admin){
        res.sendStatus(201)
    }else{
        res.sendStatus(500)
    }
})
//create a candidate's profile
router1.post('/api/candidate', async (req, res) => {
    const {username,email,password,firstname, middlename,lastname,alias,party,
        position,deputy,countyId, constituencyId} = req.body;
    // const {username,email,password} = req.body;

        const user = await prisma.user.create({
            data:{
                username: username,
                email: email,
                password: bcrt.hashSync(password,10)
            }
        }).catch((err)=>{
            res.send('username or email exists')
        }).then(async (value)=>{
            if(value){
            if(Object.keys(value).length !== 0){
                const id = Number(value['id']);
                try{
                    const newCand =await prisma.candidate.create({
                        data:{
                            firstname:firstname,
                            middlename:middlename,
                            lastname:lastname,
                            alias:alias,
                            party:party,
                            position:position,
                            deputy:deputy,
                            countyId:Number(countyId),
                            constituencyId:Number(constituencyId),
                            userId: id
                        }
                    })
                    res.sendStatus(201)
                }
                catch(err){
                    res.status(500).send(err.mesage)
                }
            }else{
                res.sendStatus(500);
            }
        }
        
        })

})

module.exports = router1;