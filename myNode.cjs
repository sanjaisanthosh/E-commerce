const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken')
const mongoose = require('mongoose')
const { MongoClient } = require('mongodb');
const moment = require('moment');
const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
const users = [{ username: 'sanjai', password: 1722 }]
const url = "mongodb+srv://sanjai:ss7708402001@nodeapicluster0.h6mud9z.mongodb.net/?retryWrites=true&w=majority&appName=nodeAPICluster0";
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
const database = client.db('nodeAPIDB');

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const data = [
    {
        "Name": "Sanjai",
        "Age": 18,
        "Product_by": "Mobile phone",
        "delivery_date": "16-03-2024",
        "ordered_date": "10-03-2024",
        "return-status": false
    },
    {
        "Name": "John",
        "Age": 25,
        "Product_by": "Laptop",
        "delivery_date": "20-01-2023",
        "ordered_date": "15-01-2023",
        "return-status": true
    },
    {
        "Name": "Emily",
        "Age": 30,
        "Product_by": "Tablet",
        "delivery_date": "27-11-2022",
        "ordered_date": "21-11-2022",
        "return-status": false
    },
    {
        "Name": "Michael",
        "Age": 22,
        "Product_by": "Smartwatch",
        "delivery_date": "22-02-2021",
        "ordered_date": "18-02-2021",
        "return-status": true
    },
    {
        "Name": "Sophia",
        "Age": 35,
        "Product_by": "Headphones",
        "delivery_date": "11-06-2020",
        "ordered_date": "05-06-2020",
        "return-status": false
    },
    {
        "Name": "Daniel",
        "Age": 28,
        "Product_by": "Camera",
        "delivery_date": "20-10-2019",
        "ordered_date": "14-10-2019",
        "return-status": true
    },
    {
        "Name": "Olivia",
        "Age": 20,
        "Product_by": "Smartphone",
        "delivery_date": "02-09-2018",
        "ordered_date": "30-08-2018",
        "return-status": false
    },
    {
        "Name": "William",
        "Age": 27,
        "Product_by": "Speaker",
        "delivery_date": "01-06-2022",
        "ordered_date": "26-05-2022",
        "return-status": true
    },
    {
        "Name": "Ava",
        "Age": 32,
        "Product_by": "Printer",
        "delivery_date": "09-04-2017",
        "ordered_date": "03-04-2017",
        "return-status": false
    },
    {
        "Name": "James",
        "Age": 24,
        "Product_by": "Earphones",
        "delivery_date": "02-08-2019",
        "ordered_date": "29-07-2019",
        "return-status": true
    },
    {
        "Name": "Isabella",
        "Age": 29,
        "Product_by": "Smart TV",
        "delivery_date": "12-12-2018",
        "ordered_date": "08-12-2018",
        "return-status": false
    },
    {
        "Name": "Ethan",
        "Age": 26,
        "Product_by": "Gaming console",
        "delivery_date": "26-09-2020",
        "ordered_date": "20-09-2020",
        "return-status": true
    },
    {
        "Name": "Emma",
        "Age": 23,
        "Product_by": "Fitness tracker",
        "delivery_date": "06-03-2021",
        "ordered_date": "01-03-2021",
        "return-status": false
    },
    {
        "Name": "Alexander",
        "Age": 31,
        "Product_by": "External hard drive",
        "delivery_date": "02-07-2022",
        "ordered_date": "25-06-2022",
        "return-status": true
    },
    {
        "Name": "Mia",
        "Age": 21,
        "Product_by": "Virtual reality headset",
        "delivery_date": "14-11-2019",
        "ordered_date": "11-11-2019",
        "return-status": false
    },
    {
        "Name": "Benjamin",
        "Age": 33,
        "Product_by": "Wireless charger",
        "delivery_date": "03-02-2020",
        "ordered_date": "29-01-2020",
        "return-status": true
    },
    {
        "Name": "Charlotte",
        "Age": 19,
        "Product_by": "Smart speaker",
        "delivery_date": "15-04-2018",
        "ordered_date": "15-04-2018",
        "return-status": false
    },
    {
        "Name": "Jacob",
        "Age": 28,
        "Product_by": "E-reader",
        "delivery_date": "21-08-2018",
        "ordered_date": "17-08-2018",
        "return-status": true
    },
    {
        "Name": "Madison",
        "Age": 25,
        "Product_by": "Bluetooth headset",
        "delivery_date": "06-05-2019",
        "ordered_date": "02-05-2019",
        "return-status": false
    },
    {
        "Name": "Liam",
        "Age": 30,
        "Product_by": "Drone",
        "delivery_date": "26-02-2017",
        "ordered_date": "21-02-2017",
        "return-status": true
    },
    {
        "Name": "Grace",
        "Age": 22,
        "Product_by": "Smartwatch",
        "delivery_date": "09-10-2018",
        "ordered_date": "06-10-2018",
        "return-status": false
    },
    {
        "Name": "Michael",
        "Age": 26,
        "Product_by": "Tablet",
        "delivery_date": "29-06-2019",
        "ordered_date": "25-06-2019",
        "return-status": true
    },
    {
        "Name": "Sofia",
        "Age": 27,
        "Product_by": "Camera",
        "delivery_date": "18-01-2021",
        "ordered_date": "13-01-2021",
        "return-status": false
    },
    {
        "Name": "Logan",
        "Age": 29,
        "Product_by": "Smartphone",
        "delivery_date": "07-08-2017",
        "ordered_date": "02-08-2017",
        "return-status": true
    }
]

app.get('/customerdetails', (req, res) => {
    // res.setHeader('Content-Type', 'application/json');
    if (tokenValidation(req, res)) {
        res.json(data);
    }
});

app.post('/login', (req, res) => {
    userPwdValidation(req, res)
    // insertData()
});
app.post('/logout', (req, res) => {
    logout(req, res)
});

async function logout(req, res) {
    try {
        await client.connect();
        const invalidToken = req.body
        const decodedToken = JWT.decode(invalidToken.token);
        const collection = database.collection('invalidToken');
        const data = {
            "username": decodedToken.username,
            "token": invalidToken.token,
            "iat": decodedToken.iat,
            "exp": decodedToken.exp,

        }
        console.log("sanjai ss", data);
        await collection.insertOne(data)
        res.status(200).json({ message: 'Logout sucessfully!' })
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(401).json({ message: 'Invalid token!' })
    } finally {
        await client.close()
    }

}

async function userPwdValidation(req, res) {
    console.log("requst", req.body);
    const userPwd = req.body
    const collection = database.collection('loginData');
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    datavalidate = await collection.findOne(userPwd);
    console.log("Valiadtion", userPwd);
    if (userPwd) {
        const jwtToken = JWT.sign({ username: userPwd.username }, 'secret', { expiresIn: '1h' })
        res.json({ jwtToken });
    } else {
        return res.status(401).json({ message: 'Credentitals not valid!' });
    }
}


async function tokenValidation(request, response) {
    const accessToken = request.header('Authorization').split(' ')
    if (!accessToken[1]) {
        return response.status(401).json({ error: 'Access denied!' })
    }
    try {
        const decode = JWT.decode(accessToken[1])

        if (decode.exp) {
            var currentTime = moment().format('HH:mm')
            var currentDate = moment().format('YYYY-MM-DD')
            var expirationTime = decode.exp
            const expirationDate = moment(expirationTime * 1000);
            var expDate = expirationDate.format('YYYY-MM-DD')
            var expTime = expirationDate.format('HH:mm')
            console.log('Expiration date:', expDate, expTime); 
            console.log('currentTime date:', currentDate, currentTime);
            if (expDate == currentDate && (expTime > currentTime)) {
                console.log('ss');
                const collection = database.collection('invalidToken');
                await client.connect();
                const tokenIsValid=await collection.findOne(accessToken[1])
                if(tokenIsValid){
                    await client.close();
                    return true
                }
               
            } else {
                return false
            }
        } else {
            return response.status(401).json({ error: 'Invalid token' });
        }
    } catch (error) {
        return response.status(401).json({ error: 'Invalid token' });
    }

}
// async function main() {
// mongoose.connect(url,{ useNewUrlParser: true })
//     .then( () => {

//         console.log('Connected to the database ')
//     })
//     .catch( (err) => {
//         console.error(`Error connecting to the database. n${err}`);
//     })
//   }
async function insertData() {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Connected to MongoDB Atlas');
        const database = client.db('nodeAPIDB');
        const collection = database.collection('loginData');
        const data = { username: 'santhosh', password: '2003' }
        const result = await collection.insertOne(data);
        console.log(`${result.insertedCount} document inserted`);
    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        await client.close();
        console.log('Connection closed');
    }
}
app.listen(8081, () => {
    console.log('Backend server is running on port 8081');
});
