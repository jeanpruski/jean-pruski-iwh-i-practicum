require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const hubspot_service = require('./services/hubspot_service');
const tools_service = require('./services/tools_service');

const SUPER_HEROS_ID = process.env.SUPER_HEROS_ID;

app.get('/', async (req, res) => res.render('homepage', {
    title: tools_service.page_names.home,
    data: await hubspot_service.getObjects(SUPER_HEROS_ID)
  }
));

app.get('/update-cobj', async (req, res) => res.render('update', {
    title: tools_service.page_names.update
  }
));

app.post('/update-cobj', async (req, res) => {
  const request = await hubspot_service.updateObjects(SUPER_HEROS_ID, req.body);
  if(request.result)  res.redirect('/');  
  else res.status(500).send(request.error.response ? request.error.response.data : 'Error...');
});

app.listen(port, () => console.log(`Listening on ${port}`));