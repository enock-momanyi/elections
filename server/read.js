const router2 = require('express').Router();
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
router2.get('/api/user', async (req, res) => {
    const cookie  = req.cookies.jwt
    if(cookie){
        const claims = jwt.verify(cookie,'secret')
        if(!claims){
            res.status(401).send('Invalid Credential')
        }else{
        console.log(claims)
        const user = await prisma.candidate.findUnique({
            where:{userId:Number(claims)}
        });
        res.json(user)
        }
    }else{
        res.status(401).send('Not Signed in!')
    }
})

router2.get('/counties/:id',async (req, res) => {
    const id = Number(req.params.id);
    if(Number.isNaN(id)){
        res.sendStatus(400);
    }else{
    const names = await prisma.county.findFirst({
        where:{
            id:Number(id)
        },
        include:{constituency:true}
    }).catch(err =>{
        res.sendStatus(500);
    });
    res.json(names)
}
})

router2.get('/api/counties',async (req, res) => {
    const names = await prisma.county.findMany({
        include:{
            constituency:{ include:{
                candidates:true
            }
        }
        }
    }).catch(err => {
        res.sendStatus(500);
    });
    res.json(names);
})

router2.get('/constituencies/:id', async (req, res) => {
    const id = Number(req.params.id);
    if(Number.isNaN(id)){
        res.sendStatus(400);
    }else{
    const names = await prisma.constituency.findMany({
        where:{
            countyId:id
        }
    }).catch(err=>{
        res.sendStatus(500);
    });
    res.json(names)
}
})

router2.get('/api/:position/:countyId', async (req, res) => {
    const countId = Number(req.params.countyId);
    const position = req.params.position;
    if(Number.isNaN(countId)){
        res.sendStatus(400);
    }
    const candidates = await prisma.candidate.findMany({
        where:{
            position:position,
            countyId:countId
        }
    }).catch(err=>{
        res.sendStatus(500);
    })
    res.json(candidates)
})

router2.get('/api/mp/:countyId', async (req, res) => {
    const countyId = Number(req.params.countyId);
    if(Number.isNaN(countyId)){
        res.sendStatus(400);
    }
    const areas = await prisma.county.findMany({
        include:{
            constituency:{
                include: {
                    candidates:true
                }
            }
        }
    }).catch(err => {
        res.sendStatus(500);
    })
    res.json(areas)

})
router2.get('/api/constituency/:id', async (req, res) =>{
    const areaId = Number(req.params.id);
    if(Number.isNaN(areaId)){
        res.sendStatus(400);
    }
    const aspirants = await prisma.candidate.findMany({
        where:{
            constituencyId:areaId
        },
        include:{
            user:true
        }
    })
})

module.exports = router2;