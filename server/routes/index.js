const router = require("express").Router()
//import models from /db
const {db, Apartment} = require ("../db")
//routes go here

router.get('/api/apartments', async (req,res,next)=>{
  try{
    const apartments = await Apartment.findAll();
    res.send(apartments);
  }
  catch(err){
    next(err)
  }
})

router.get('/api/apartments/:id', async (req,res,next)=>{
  try{
    const apartment = await Apartment.findByPk(req.params.id);

    res.send(apartment);
  }
  catch(err){
    next(err)
  }
})

router.post('/api/apartments', async (req, res, next) =>{
  try {
    const response = await Apartment.create(req.body);
    res.send(response)
  }
  catch (err) {
    next(err)
  }
})

router.delete('/api/apartments/:id', async(req, res, next) => {
  try {
    const apartment = await Apartment.findByPk(req.params.id)
    await apartment.destroy();
    res.sendStatus(204)
  }
  catch (err){
    next(err)
  }
})

// ###################### fix for automatically updating the data
router.put('/api/apartments/:id', async(req,res,next) => {
  try {
    const apartment = await Apartment.findByPk(req.params.id);
    await apartment.update(req.body)

    // send apartment (previously, it was apartment.data);
    res.send(apartment)
  }
  catch(err){
    next(err)
  }
})



module.exports = router
