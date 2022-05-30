const express = require('express');
const router = express.Router();
const umjetnina = require('../models/Umjetnina');

router.get('/', (req,res) => {
    umjetnina.find((err, docs) => {
        res.render('home', {umjetninas: docs});   // home.ejs
    }).catch(err => {
        console.log("Something wrong with monogdb (can't retrive).");
    });
});

//ROUTER FOR CREATE
router.post('/add', (req,res,next) => {
    // const name = req.body.name;
    // const opis = req.body.opis;
    // const cijena = req.body.cijena;

    const {name,opis, cijena} = req.body;
  
    console.log(name,opis,cijena);

    const uclUmjetnina = new umjetnina ({
        name,
        opis,
        cijena
    });
    uclUmjetnina.save((err) => {
        if(err) {
            console.log('Something went wrong to save data to database!');
        }else{
            console.log('Data is recorded successfully!');
            res.redirect('/');
        }
    })
});

//ROUTE TO SHOW UPDATE ELEMENT
router.get('/edit/:id', (req, res, next) => {
    console.log(req.params.id);
    umjetnina.findOneAndUpdate({_id: req.params.id}, req.body, {new:true}, (err, docs)=> {
        if(err){
            console.log("Can't retrive data and edit because of some database problem");
            next(err);
        }else{
            res.render('edit', {umjetnina: docs});
        }
    });
});

//ROUTE TO UPDATE ELEMENT
router.post('/edit/:id', (req, res, next) => {
    umjetnina.findByIdAndUpdate({_id: req.params.id}, req.body, (err, docs) => {
        if(err){
            console.log('Something went wrong to update your data.');
            next(err);
        }else{
            console.log('Updated successfully.');
            res.redirect('/');
        }
    });
});

//ROUTE DO DELETE ITEM
router.get('/delete/:id', (req, res, next) => {
    umjetnina.findByIdAndDelete({_id: req.params.id}, (err, docs) => {
        if(err){
            console.log('Something went wrong to delete data');
            next(err);
        }else{
            console.log('Deleted successfully');
            res.redirect('/');
        }
    });
});


module.exports = router;