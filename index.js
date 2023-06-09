const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const _ = require("lodash");
const {v4: uuid} = require("uuid");

const dotenv = require('dotenv');
dotenv.config();


const app = express();
app.use(express.json());
//app.use(express.cors());

// GET Restaurants
app.get("/restaurants", (req, res) =>  {

    var restaurant_1 = {
        "id" : 1,
        "name" : "KFC restaurant",
        "address" : "Gurgaon",
        "email" : "kfc@gmail.com"
    }

    var restaurant_2 = {
        "id"	    :	2,
        "name"	    :	"Manchanta restaurant",
        "address"	:	"Gurgaon",
        "email"	    :	"ryankamboj07@gmail.com"
    }

    var restaurant_3 = {
        "id"	    :	3,
        "name"	    :	"Manchanta restaurant",
        "address"	:	"Gurgaon",
        "email"	    :	"ryankamboj07@gmail.com"
    }

    res.status(201).json({
        restaurants: [restaurant_1, restaurant_2]
    });
});

// GET Endpoint-1
app.get("/endpoint-1", (req, res) =>  {
    res.status(200).json({
        success: true,

        data: {
            message: "Hello from endpoint-1"
        }
    });
});

// GET Endpoint-2
app.get("/endpoint-2", (req, res) =>  {
    res.status(200).json({
        success: true,

        data: {
            message: "Hello from endpoint-2"
        }
    });
});
   
// POST Comments
app.post("/comments", async (req, res) => {
    const id = uuid();
    const content = req.body.content;

    if(!content) {
        return res.sendStatus(400);
    } 

    await fs.mkdir("data/comments", {recursive: true});
    await fs.writeFile(`data/comments/${id}.txt`, content);

    res.status(201).json({
        id: id
    });

});

// GET Comments
app.get("/comments/:id", async (req, res) =>  {
    const id = req.params.id;
    let content;

    try { 
        content =  await fs.readFile(`data/comments/${id}.txt`, "utf-8");
    } catch (error) {
        return res.sendStatus(404);
    }

    res.json({
        content: content
    });

});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>  console.log(`Server is running on this port ${PORT}`));
