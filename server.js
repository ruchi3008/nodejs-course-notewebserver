const express =  require('express');
const hbs = require('hbs');
const fs = require('fs');
hbs.registerPartials(__dirname+'/views/partials');
var app = express();
app.use(express.static(__dirname+'/public'));
app.set('view engine','hbs');

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}:${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err)=>{
    if(err){
      console.log('Unable to update log file');
    }
  });
  next();
});

app.use((req,res,next)=>{
    res.render('maintenance.hbs');
});
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
})

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})
app.get('/',(req,res)=>{
res.render('welcome.hbs',{
  pageTitle : 'Welcome Page',
  welcomeText : 'You are welcome to Nodejs Project'
})
});
app.listen(3000,()=>{
  console.log('Server started on port 3000');
});


app.get('/bad',(req,res)=>{
  res.send({
    errorMessage: 'Bad Request'
  });
})
