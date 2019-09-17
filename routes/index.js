var express = require('express');
var router = express.Router();
const Watson = require("./watson")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post("/chatfuel/credit_score",(req,res,next)=>{
  if(req.body.credit_score>600){
    res.send({
      messages:[{
        text:"Thats's fine"
      }]
    });

  }else{
    res.send({
      messages:[{
        text:"I will mail you"
      }]
    });

  }
})

router.post('/chatfuel', async function(req, res, next) {
  // console.log(req.body);
  const reply=await Watson.sendMessage(req.body.text);

  const payload={
    "messages": [
    ]
  }

  // console.log(reply.output.generic[1].options[0].value.input.text)

  reply.output.generic.map(item=>{

    if(item.response_type==="text"){
      // Send Message 
      payload.messages.push({
        "text":item.text
      });

      if(reply.output.generic[1]){
        payload.messages.push({
          "attachment": {
            "type": "template",
            "payload": {
              "template_type": "button",
              "text": reply.output.generic[1].title,
              "buttons": [
                {
                  "type": "show_block",
                  "block_names": [reply.output.generic[1].options[0].value.input.text],
                  "title": "YES"
                },
                {
                  "type": "show_block",
                  "block_names": [reply.output.generic[1].options[1].value.input.text],
                  "title": "No"
                }
              ]
            }
          }
        })

      }

      
    

    };
  
    

  });
  res.send(payload);

});
module.exports = router;
