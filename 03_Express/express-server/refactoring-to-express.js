const url = require('url');
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.listen(port, ()=>{
    console.log("Router Refactoring to Express")
})

app.get("/", (_, res) => {
    res.end("HOME");
});

app.get("/user", user);
app.get("/laftel", laftel);
app.get("/laftel/ranking", getLaftelRanking);
app.get("/feed", feed);

async function laftel (req, res){
        res.set({ "Content-Type": "text/html; charset=utf-8" });
        res.end(`
            <ul>
            <li><a href="/laftel/ranking?type=4hr">실시간</a></li>
            <li><a href="/laftel/ranking?type=weekly">1주일</a></li>
            <li><a href="/laftel/ranking?type=quater">분기</a></li>
            </ul>
        `);
    
}

async function getLaftelRanking(req, res){
    const { pathname, query } = url.parse(req.url, true)
    const json = await getRanking(query.type);
        res.json(json);
}

function user(req, res){
    const {query} = url.parse(req.url, true);
    if(Object.keys(query).length > 0)
        res.json(`[user] name: ${query.name}, age: ${query.age}`);
    else
        res.json(`[user] name: JOHN DOE age: 130`);
}


function feed(req, res){
    res.json(`
        <ul>
            <li>Picture1</li>
            <li>Picture2</li>
            <li>Picture3</li>
        </ul>
        `)
}

async function getRanking(type) {

    
    try {
        const filePath = path.join(__dirname, '..', 'laftel', `recommend_ranking_${type}.json`);
        const data = fs.readFileSync(filePath, {
            encoding: 'utf-8',
            flag: 'r'
        })

        return JSON.parse(data);
    } catch (err) {
        console.log(err);
        return err;
    }

}