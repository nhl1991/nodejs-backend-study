

const url = require('url');
const express = require("express");

const app = express();
const port = 3000;


app.listen(port, () => {
    console.log('Express is on the way.');
})

app.get("/", (_, response) => {
    response.end("HOME");
})

app.get("/user", user);

app.get("/feed", feed);

app.get("/ranking", ranking);

// What is the difference between res.end() & res.send() 
// https://stackoverflow.com/questions/29555290/what-is-the-difference-between-res-end-and-res-send
app.get("/send-text", (_, response) => {
    response.send("HELLO SEND");
});
app.get("/send-json", (_, response) => {
    response.send({ message: "HELLO SEND" });
});


function user(request, response) {
    const user = url.parse(request.url, true).query;

    response.json(`[user ] name: ${user.name}, age: ${user.age}`);
}


// Function Declarations are hoisted, but Function Expressions must be declared before use.
async function ranking(request, response) {
    const {ranking_type, offset, limit} = url.parse(request.url, true).query;

    const axios = require("axios");
    try {
        const data = await axios.get(`https://api.myanimelist.net/v2/anime/ranking?ranking_type=${ranking_type}&offset=${offset}&limit=${limit}`, {
            headers: {
                "X-MAL-CLIENT-ID": "93aa982946934e6773009c6350188796"
            }
        }).then((res) => res.data)
        response.json(data);
    }
    catch (err) {
        console.log(err);
    }
}

function feed(_, response) {
    response.json(`
        <ul>
        <li>list-1</li>
        <li>list-2</li>
        <li>list-3</li>
        <li>list-4</li>
        </ul>
        `)
}

