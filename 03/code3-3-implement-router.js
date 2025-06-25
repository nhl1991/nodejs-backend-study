
const http = require('http');
const url = require('url');
http.createServer(async (req, res) => {
    const { pathname, query } = url.parse(req.url, true) // second parameter is boolean that deciding whether parse the query string with url or not.
    res.setHeader("Content-Type", "text/html; charset=utf-8");

    if (pathname === "/user") {
        user(req, res, query);

    } else if (pathname === "/feed") {
        feed(req, res);
    } else if (pathname === '/laftel') {
        laftel(req, res);
    } else if (pathname === '/laftel/ranking' && query.type) {
        getLaftelRanking(req, res, query);
    } else {
        notFound(req, res);
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


const notFound = (req, res) => {
    res.statusCode = 404;
    res.end("404 Page not found");
}

const laftel = async (req, res) => {
    const { pathname, query } = url.parse(req.url, true)

    if (pathname === '/laftel/ranking' && query.type) {

    } else {

        res.end(`
            <ul>
            <li><a href="/laftel/ranking?type=4hr">실시간</a></li>
            <li><a href="/laftel/ranking?type=weekly">1주일</a></li>
            <li><a href="/laftel/ranking?type=quater">분기</a></li>
            </ul>
        `);
    }
}

const user = (req, res, query) => {
    // console.log(query) ==> [Object: null prototype]
    // query 객체가 Object.create(null) 또는 쿼리스트링 파싱 결과로 만들어져서, 일반 객체랑은 다르게 prototype이 없음 ([Object: null prototype]) 형태이다.
    console.log(Object.keys(query).length);
    if (Object.keys(query).length > 0)
        res.end(`[user] name: ${query.name} age: ${query.age}`);
    else
        res.end("[user] name: andy, age: 30");

}

const feed = (req, res) => {
    res.end(`<ul>
            <li>picture1</li>
            <li>picture2</li>
            <li>picture3</li>
            </ul>`
    );
}

const getLaftelRanking = async (req, res, query) => {
    const json = await getRanking(query.type)

    res.setHeader('Content-Type', 'application/json');

    res.end(JSON.stringify(json));
}