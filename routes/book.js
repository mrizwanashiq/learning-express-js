var express = require("express");
var router=express.Router();
const bookModel = require("../models/book");

router.get("/", async (req,res) => {
    const books = await bookModel.find();
    res.render("book/table",{data:books});
})

router.post("/", async (req,res) => {
    await bookModel.create();
    const books = await bookModel.find();
    res.render("book/table",{data:books});
})

router.post("/update", async (req,res) => {
    await bookModel.findByIdAndUpdate(req.body.id,req.body);
    res.redirect("/book");
})
router.get('/rizwan/:id?', (req, res) => {
    studentBal.getById(req.params.id, (data, doc) => {
        if (data.message == "success") {
            res.render("addOrUpdate", {data: data.data});
        }
    });
});
router.get('/delete/:id?', async (req, res) => {
    await bookModel.findByIdAndDelete(req.params.id);
    res.redirect("/book");
});


router.get('/ajax/:id?', async (req, res) => {
    const student = await bookModel.findById(req.params.id);
    res.status(200).json(student);
});

router.get("/serverside", async (req,res) => {
    var search=body["search[value]"]
    var reg=new RegExp(search,"g");
    var sortOrder=body["order[0][dir]"];
    var columnNumber=body["order[0][column]"]
    var columnName=body["columns["+columnNumber+"][data]"]
    var sortCol=sortOrder=="asc"?1:-1
    var sortObj={};
    sortObj[columnName]=sortCol
        
    const books = await bookModel.aggregate([
        { $sort : sortObj },
        { $skip : parseInt(body.start) },
        { $limit : parseInt(body.length) },
    ]);
    const count = await bookModel.count();
    const obj={
        "draw": req.body.draw,
        "recordsTotal": count,
        "recordsFiltered": count,
        "data": books
    }

    res.status(200).json(obj);
})

module.exports=router;
