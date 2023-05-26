// const express = require('express')
// const app = express()
// app.get('/', function (req, res){
//     res.send('Hello')
// })
// app.put('/h', function(req, res) {
//     res.send("Hello")
// })
// app.listen(3000)

const express = require('express'); //Import Express
const Joi = require('joi'); //Import Joi
const app = express(); //Create Express Application on the app variable
app.use(express.json()); //used the json file


//Give data to the server
const carData = [
    { id: 1, make: 'Tata', model: 'Altroz', color: 'red' },
    { id: 2, make: 'Maruti', model: 'zusuki', color: 'black' },
    { id: 3, make: 'Tata', model: 'Tiago', color: 'blue' },
    { id: 4, make: 'Honda', model: 'City', color: 'white' },
    { id: 5, make: 'Tata', model: 'nexon', color: 'grey' }
]

//Read Request Handlers
// Display the Message when the URL consist of '/'
app.get('/', (req, res) => {
    res.send('Welcome to KBA-Automobile Consortium!');
});
// Display the List Of Cars when URL consists of api 
//http://localhost:8080/api/carData
app.get('/api/carData', (req, res) => {
    res.send(carData);
});
// Display the Information Of Specific Car when you mention the id.
//http://localhost:8080/api/carData/4
app.get('/api/carData/:id', (req, res) => {
    const car = carData.find(c => c.id === parseInt(req.params.id));
    //If there is no valid car ID, then display an error with the following message
    if (!car) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>');
    res.send(car);
});

//CREATE Request Handler
//CREATE New car Information
//http://localhost:8080/api/carData
//body-raw-text-json
//{
//     "make": "Honda",
//     "model": "City",
//     "color": "white"
// }
app.post('/api/carData', (req, res) => {

    const { error } = validateCar(req.body);
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }
    //Increment the car id
    const car = {
        id: carData.length + 1,
        make: req.body.make,
        model: req.body.model,
        color: req.body.color
    };
    carData.push(car);
    res.send(car);
});

//Update Request Handler
// Update Existing Car Information
//http://localhost:8080/api/carData/4
//body-raw-text-specify the model to be updated with all other details
//{"make":"eeeeeee","model":"City" ,"color": "white"}

app.put('/api/carData/:id', (req, res) => {
    const car = carData.find(c => c.id === parseInt(req.params.id));
    if (!car) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!! </h2>');

    const { error } = validateCar(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    car.make = req.body.make;
    car.color = req.body.color;
    res.send(car);
});


//Delete Request Handler
// Delete Car Details
//http://localhost:8080/api/carData/1
app.delete('/api/carData/:id', (req, res) => {

    const car = carData.find(c => c.id === parseInt(req.params.id));
    if (!car) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!!</h2>');

    const index = carData.indexOf(car);
    carData.splice(index, 1);

    res.send(car);
});
//Validate Information
function validateCar(car) {
    const schema = Joi.object({
        make: Joi.string().required(),
        model: Joi.string().required(),
        color: Joi.string().required()
    });

    const validation = schema.validate(car);
    return validation
}


//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));




