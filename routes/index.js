var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var connectionString;
if (process.env.CUSTOMCONNSTR_MongoDB)
{
    connectionString=process.env.CUSTOMCONNSTR_MongoDB;
}
else{
    connectionString = 'mongodb://40.84.55.22/survey';
} 

router.get('/', function(req, res, next) {

    res.render('index');

});

router.get('/QueryGuestBook', function (req,res,next)
{
    var Messages=[];
    MongoClient.connect(connectionString, function(err, database) {
        db = database;
        var GetResults = db.collection("guestbook").find({}).sort( [['_id', -1]] ).limit(30).toArray().then(function (doc)
       {
             
        doc.forEach((item, idx, array) => 
        {       
           
           Messages.push({
                    message: item.Message,
                    created_at: item._id.getTimestamp(),
                    ip: item.UserInfo.ip,
                    city: item.UserInfo.city,
                    region: item.UserInfo.region,
                    country: item.UserInfo.country });
    

        });
        res.send(Messages);
        res.end();
        db.close();
    });
})

})

router.post('/',function (req,res,next)
{
    var Msg=req.body.MyMessage;

    MongoClient.connect(connectionString, function(err, database) {

    db = database;

    var CastVote = db.collection("guestbook").insertOne({ "Message" : Msg,"UserInfo":req.body.UserInfo} ).then(function (err)
        {
            db.close();

            if (err.result.ok!=1)
            {
                 res.send(500,err);
                 res.end();
            }
            else{
       
                res.sendStatus(200);
                res.end();
                return;
            }
    
       })
    })
   
})

module.exports = router;