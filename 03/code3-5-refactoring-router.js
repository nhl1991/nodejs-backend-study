
const http = require('http');
const url = require('url');

http.createServer((req, res) => {

    const { pathname, query } = url.parse(req.url, true);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    if(pathname in urlMap){
        urlMap[pathname](req,res, query);
    }else {
        notFound(req,res);
    }

}).listen("3000", ()=> console.log('Router Refactoring.'));

const user =  (req, res, query) => {
    if(Object.keys(query).length > 0)
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

const notFound = (req, res) => {
    res.statusCode = 404;
    res.end("404 Page not found");
}

// 라우터 규칙 매핑 키로 path가 들어가고 값에 함수 할당.
// 함수 초기화 전에 실행되면 에러 발생.
const urlMap = {
    "/": (req,res) => res.end("HOME"),
    "/user": user,
    "/feed": feed,
}