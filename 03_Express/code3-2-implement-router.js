
const http = require('http');
const url = require('url');
http.createServer(async (req, res) => {
    const { pathname, query } = url.parse(req.url, true) // second parameter is boolean that deciding whether parse the query string with url or not.
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    if (pathname === "/user") {
        if (query)
            res.end(`[user] name: ${query.name} age: ${query.age}`);
        res.end("[user] name: andy, age: 30");
    } else if (pathname === "/feed") {
        res.end(`<ul>
            <li>picture1</li>
            <li>picture2</li>
            <li>picture3</li>
            </ul>`
        );
    } else if (pathname.startsWith('/laftel')) {
        if (pathname === '/laftel/ranking' && query.type) {
            const json = await getRanking(query.type)
            
            res.setHeader('Content-Type', 'application/json');

            res.end(JSON.stringify(json));
        } else {

            res.end(`<ul>
            <li><a href="/laftel/ranking?type=4hr">실시간</a></li>
            <li><a href="/laftel/ranking?type=weekly">1주일</a></li>
            <li><a href="/laftel/ranking?type=quater">분기</a></li>
            </ul>`);
        }

    } else {
        res.statusCode = 404;
        res.end("404 Page not found");
    }
}).listen("3000", () => {
    console.log("Create a router.");
})


async function getRanking(type) {
    console.log(type);
    const fs = require('fs');
    try {
        const data = fs.readFileSync(`./laftel/recommend_ranking_${type}.json`, {
            encoding: 'utf-8',
            flag: 'r'
        })

        return JSON.parse(data);
    } catch (err) {
        console.log(err);
        return err;
    }

}