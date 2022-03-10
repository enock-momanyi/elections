// import express from 'express';
// import pkg from '@prisma/client';
// import bodyParser from 'body-parser';
// import bcrt from 'bcryptjs';
import {PrismaClient} from '@prisma/client';
const express = require('express');
//const pkg = require('@prisma/client');
const bodyParser = require('body-parser');
const bcrt = require('bcryptjs'); 
const app = express();
//const {PrismaClient} = pkg;
const prisma = new PrismaClient();
const cors = require('cors');
const cookierParser = require('cookie-parser');
const sessions = require('express-session');
const pg = require('pg');
const jwt = require('jsonwebtoken');
const {upload} = require('./server/upload');
const path = require('path');

const twohour = 1000 * 60 * 60 * 2;
var session;

const {hashSync} = bcrt;
// app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use(cookierParser())
app.use(cors({
    credentials:true,
    origin:['electionske.herokuapp.com']
}))
// app.use(router);
// app.post('/addCounties', async (req, res) => {
//     const {countyList} = req.body;
//     for(elem in countyList){
//         await prisma.county.create({data:countyList[elem]});
//     }
//     const addedCounties = await prisma.county.findMany();
//     res.json(addedCounties)
// });
// app.post('/addConstituencies', async (req, res) => {
//     const {constList} = req.body;
//     for(elem in constList){
//         await prisma.constituency.create({data:constList[elem]});
//     }
//     const addedAreas = await prisma.constituency.findMany();
//     res.json(addedAreas)
// })

app.get('/api/user', async (req, res) => {
    const cookie  = req.cookies.jwt;
    if(cookie){
        const claims = jwt.verify(cookie,'secret');
        if(!claims){
            res.status(401).send('Invalid Credential');
        }else{
        const user = await prisma.user.findUnique({
            where:{id:Number(claims.id)},
            select:{
                username:true,
                email:true,
                candidates:true
            }
        }).catch(err => {
            res.sendStatus(500);
        }).then(val => {
            res.json(val);
        });
        }
    }else{
        res.status(401).send('Not Signed in!')
    }
});
app.get('/api/account', async (req, res) => {
    const cookie  = req.cookies.jwt;
    if(cookie){
        const claims = jwt.verify(cookie,'secret');
        if(!claims){
            res.status(401).send('Invalid Credential');
        }else{
        const user = await prisma.user.findUnique({
            where:{id:Number(claims.id)},
            select:{
                username:true,
                email:true
            }
        }).catch(err=>{
            res.sendStatus(500);
        }).then(val=>{
            res.json(val);
        });
        }
    }else{
        res.status(401).send('Not Signed in!');
    }
});

app.get('/api/allcandidates', async (req, res)=>{
    const cookie = req.cookies.jwt;
    if(cookie){
        const claim = jwt.verify(cookie,'secret');

        if(claim){
            const candidates = await prisma.candidate.findMany().catch(err=>{
                res.sendStatus(500);
            }).then(val=>{
                if(val){
                    res.json(val);
                }else{
                    res.sendStatus(404);
                }
            });
        }else{
            res.sendStatus(403);
        }
    }else{
        res.sendStatus(403);
    }
});
app.get('/api/allcounties', async(req,res) => {
    const counties = await prisma.county.findMany({
        include:{constituency:{select:{id:true,name:true}}}
    }).catch(()=>{
        res.sendStatus(500);
    }).then(val=>{
        res.json(val);
    });
});
app.get('/api/isloggedin', async (req, res) => {
    const cookie = req.cookies.jwt;
    if(cookie){
        const creds = jwt.verify(cookie,'secret');
        const findUser = await prisma.user.findUnique({
            where:{
                email: creds.mail
            }
        }).then(val => {
            if(val){
                res.json({status:true});
            }else{
                res.json({status:false});
            }
        }).catch(()=>{
            res.json({status:false});
        });
    }else{
        res.json({status:false});
    }
});
app.get('/api/adminloggedin', async (req, res) => {
    const cookie = req.cookies.jwt;
    if(cookie){
        const creds = jwt.verify(cookie,'secret');
        const findUser = await prisma.admin.findUnique({
            where:{
                email: creds.mail
            }
        }).then(val => {
            if(val){
                res.json({status:true});
            }else{
                res.json({status:false});
            }
        }).catch(()=>{
            res.json({status:false});
        });
    }else{
        res.json({status:false});
    }
});
app.get('/api/president', async (req, res) => {
    const president = await prisma.candidate.findMany({
        where:{
            position:'PRESIDENT'
        }
    }).catch(err=>{
        res.sendStatus(500);
    }).then(val => {
        res.json(val);
    });
});
app.get('/api/profile/:userId', async (req, res) => {
    const userId = Number(req.params.userId);
    if(Number.isNaN(userId)){
        res.sendStatus(404);
    }
    const prof = await prisma.extendedProfile.findUnique({
        where:{userId: userId},
        include:{
            user:{select:{email:true,username:true,candidates:true}}
        }
    }).catch(()=>{
        res.sendStatus(500);
    }).then(val => {
        res.json(val);
    });
});
app.get('/api/counties',async (req, res) => {
    const names = await prisma.county.findMany({
        include:{
            constituency:{
                include:{
                    candidates:true
                }
            }
        }
        
    }).catch(err => {
        res.sendStatus(500);
    }).then(val =>{
        res.json(val);
    });
});
app.get('/api/governors/:countyId', async (req, res) => {
    const areaId = Number(req.params.countyId);
    if(Number.isNaN(areaId)){
        res.sendStatus(400);
    }
    const aspirants = await prisma.candidate.findMany({
        where:{
            countyId:areaId,
            position:'GOVERNOR'
        }
        
    }).then(val=>{
        res.json(val);
    }).catch(()=>{
        res.sendStatus(500);
    });
});
app.get('/api/senators/:countyId', async (req, res) => {
    const areaId = Number(req.params.countyId);
    if(Number.isNaN(areaId)){
        res.sendStatus(400);
    }else{
    const aspirants = await prisma.candidate.findMany({
        where:{
            countyId:areaId,
            position:'SENATOR'
        }
        
    }).then(val=>{
        res.json(val);
    }).catch(()=>{
        res.sendStatus(500);
    });
}
});
app.get('/api/wr/:countyId', async (req, res) => {
    const areaId = Number(req.params.countyId);
    if(Number.isNaN(areaId)){
        res.sendStatus(400);
    }else{
    const aspirants = await prisma.candidate.findMany({
        where:{
            countyId:areaId,
            position:'WOMEN REP'
        }
        
    }).then(val=>{
        res.json(val)
    }).catch(()=>{
        res.sendStatus(500);
    });
}
});
app.get('/api/constituency/:id', async (req, res) =>{
    const areaId = Number(req.params.id);
    if(Number.isNaN(areaId)){
        res.sendStatus(400);
    }else{
    const aspirants = await prisma.candidate.findMany({
        where:{
            constituencyId:areaId,
            position:'MP'
        }
        
    }).then(val=>{
        res.json(val);
    }).catch(()=>{
        res.sendStatus(500);
    });
}
});
app.get('/constituencies/:id', async (req, res) => {
    const id = Number(req.params.id);
    if(Number.isNaN(id)){
        res.sendStatus(400);
    }else{
    const names = await prisma.constituency.findMany({
        where:{
            countyId:id
        }
    }).catch(()=>{
        res.sendStatus(500);
    }).then(val=>{
        res.json(val);
    });
}
})

app.get('/api/:position/:countyId', async (req, res) => {
    const countId = Number(req.params.countyId);
    const position = req.params.position;
    if(Number.isNaN(countId)){
        res.sendStatus(400);
    }else{
    const candidates = await prisma.candidate.findMany({
        where:{
            position:position,
            countyId:countId
        }
    }).catch(err=>{
        res.sendStatus(500);
    }).then(val=>{
        res.json(val);
    });
}
});

app.get('/api/mp/:countyId', async (req, res) => {
    const countyId = Number(req.params.countyId);
    if(Number.isNaN(countyId)){
        res.sendStatus(400);
    }else{
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
    }).then(val=>{
        res.json(val);
    });
}

});
app.post('/api/logout', (req,res) => {
    res.cookie('jwt','',{
        maxAge:0
    })
    res.status(200).send(true); 
});
app.post('/api/login', async (req, res) => {
    const {email, password} = req.body;
    const findUser = await prisma.user.findUnique({
        where:{
            email: String(email)
        }
    });
    if(findUser){

        bcrt.compare(password, findUser.password, (err, success) =>{
            if(err){
                res.sendStatus(500);
            }else{
                if(success){
                    const token = jwt.sign({id:findUser.id,mail:findUser.email},'secret')
                    res.cookie('jwt',token,{ 
                        httpOnly:true,
                        maxAge: 24*60*60*1000,
                    })
                    res.json({message:'success'});
                }else{
                    res.status(401).json({message:'Invalid username or password'});
                }
            }
        });
    }else{
        res.sendStatus(403); 
    }
});
//add an admin
app.post('/api/admin', async (req, res) => {
    // if(admin){
    //     const cookie = res.cookie.jwt;
    //     if(cookie){
    //         if(cookie.role === 'admin'){
    //             const {email, password} = req.body;
    //             const admin = await prisma.admin.create({
    //                 data:{
    //                     email:email,
    //                     password: bcrt(password,10)
    //                 }
    //             }).catch(err => {
    //                 res.sendStatus(500)
    //             }).then(val=>{
    //                 if(val){
    //                     res.sendStatus(201)
    //                 }else{
    //                     res.sendStatus(500)
    //                 }
    //             })
                  
    //         }
    //     }
    // }else{
    const {email, password} = req.body;
    const admin = await prisma.admin.create({
        data:{
            email:email,
            password: hashSync(password,10)
        }
    }).catch(err => {
        res.sendStatus(500);
    }).then(val=>{
        if(val){
            res.sendStatus(201);
        }else{
            res.sendStatus(500);
        }
    });
//}
});
app.post('/api/admin/login', async (req, res) =>{
    const {email, password} = req.body;
    const findAdmin = await prisma.admin.findUnique({
        where:{
            email: email
        }
    }).then(admin=>{
        bcrt.compare(password, admin.password, (err, success) =>{
            if(err){
                res.sendStatus(500);
            }else{
                if(success){
                    const token = jwt.sign({id:admin.id,mail:admin.email},'secret')
                    res.cookie('jwt',token,{ 
                        httpOnly:true,
                        maxAge: 24*60*60*1000,
                    })
                    res.json({message:'success'});
                }else{
                    res.status(401).json({message:'Invalid username or password'});
                }
            }
        });
    }).catch(()=>{
        res.sendStatus(403);
    });
});
//create a candidate's profile
app.post('/api/candidate',upload.single('file'), async (req, res) => {
    const {username,email,password,firstname, middlename,lastname,alias,party,
        position,deputy,countyId, constituencyId, bio} = req.body;
    // const {username,email,password} = req.body; 
    const file = req.file;
    let file_location = '';
    if (file){
        file_location = file.path.slice(4);
    }

        const user = await prisma.user.create({
            data:{
                username: username,
                email: email,
                password: hashSync(password,10)
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
                            bio:bio,
                            photo:file_location,
                            party:party,
                            position:position,
                            deputy:deputy,
                            countyId:Number(countyId),
                            constituencyId:Number(constituencyId),
                            userId: id
                        }
                    })
                    res.sendStatus(201);
                }
                catch(err){
                    res.status(500).send(err.mesage)
                }
            }else{
                res.sendStatus(500);
            }
        }
        
        });

});
//update a candidate's info
app.put('/api/user', async (req, res) => {
    const {firstname, middlename,lastname,alias,party,
        position,deputy,countyId, constituencyId,bio} = req.body;
        const cookie  = req.cookies.jwt;
        if(cookie){
            const claims = jwt.verify(cookie,'secret');
            if(!claims){
                res.status(401).send('Invalid Credential');
            }else{
            const user = await prisma.candidate.update({
                where:{userId:Number(claims)},
                data:{
                    firstname:firstname,
                    middlename:middlename,
                    lastname:lastname,
                    alias:alias,
                    bio:bio,
                    party:party,
                    position:position,
                    deputy:deputy,
                    countyId:Number(countyId),
                    constituencyId:Number(constituencyId)
                }
            }).catch(()=>{
                res.sendStatus(500);
            }).then(val=>{
                res.json(val);
            });
            }
        }else{
            res.status(401).send('Not Signed in!');
        }
});
//update user info
app.put('/api/account', async (req, res) => {
    const {username, email} = req.body;
    const cookie  = req.cookies.jwt
    if(cookie){
        const claims = jwt.verify(cookie,'secret');
        if(!claims){
            res.status(401).send('Invalid Credential');
        }else{
        const user = await prisma.user.update({
            where:{id:Number(claims)},
            data:{
                username: username,
                email:email
            }
        }).catch(()=>{
            res.sendStatus(500);
        }).then(val=>{
            res.json(val);
        });
        }
    }else{
        res.status(401).send('Not Signed in!');
    }
});

app.put('/api/photo', upload.single('file'),async(req,res)=>{
    const cookie = req.cookies.jwt;
    if(cookie){
        const claims = jwt.verify(cookie,'secret');
        if(!claims){
            res.status(401).send('Invalid Credential');
        }else{
            const file = req.file;

            if(file){
                const user = await prisma.candidate.update({
                    where:{id: Number(claims)},
                    data:{photo:file.path.slice(4)}
                }).catch(()=>{
                    res.sendStatus(500);
                }).then((val)=>{
                    if(val){
                    res.status(201).json({message:'Successfuly updated the picture!'});
                    }
                })
            }else{
                res.sendStatus(404);
            }
        }
    }else{
        res.status(401).send('Invalid Credential');
    }
})
app.put('/api/password', async(req, res) => {
    const {oldPass, newPas} = req.body;
    const cookie  = req.cookies.jwt;
    if(cookie){
        const claims = jwt.verify(cookie,'secret');
        if(!claims){
            res.status(401).send('Invalid Credential');
        }else{
        const user = await prisma.user.findUnique({
            where:{id:Number(claims)},
        }).then(val => {
            if(val){
                bcrt.compare(oldPass,val.password, async (err,succ)=>{
                    if(err){
                        res.sendStatus(401);
                    }else{
                    if(succ){
                        const newPass = await prisma.user.update({
                            where:{id:Number(claims)},
                            data:{password: hashSync(newPas,10)}
                        })
                        res.send({message:'updated password successfully'});
                    }else{
                        res.status(400).json({message: 'Unknown error'});
                    }
                }
                });
            }
        }).catch(()=>{
            res.sendStatus(500);
        });

        }
    }else{
    res.sendStatus(401);
    }
})
//Delete a user - admin
app.delete('/api/candidate/:id', async (req, res) => {
    const cookie = res.cookie.jwt;
    if(cookie){
        const cred = jwt.verify(cookie,'secret');
        const getAdmin = await prisma.admin.findUnique({
            where:{
                email:cred.mail
            }
        }).then(async (val) =>{
            if(val){
                const id = req.params.id;
                const deletedUser = await prisma.user.delete({
                    where:{id:Number(id)}
                }).catch(()=>{
                    res.sendStatus(500);
                }).then(val => {
                    res.json(val);
                });
            }else{
                res.sendStatus(403);
            }
        }).catch(()=>{
            res.sendStatus(500);
        });
    }else{
        res.sendStatus(403);
    }
})

function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}
app.use(requireHTTPS)
app.use(express.static(__dirname + '/dist/elections'));
app.use(express.static(__dirname + '/dist/prisma'));
app.get('/*', function(req,res) {res.sendFile(path.join(__dirname+'/dist/elections/index.html'));});
app.listen(process.env.PORT || 8080);
