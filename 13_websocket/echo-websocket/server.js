
const WebSocket = require('ws');

const server = new WebSocket.Server({port: 3000});

server.on('connection', ws => {
    ws.send('[서버 접속 완료!]');

    // 이벤트를 받는 함수. on(event: "message", listener: (this: WebSocket, data: WebSocket.RawData, isBinary: boolean) => void): WebSocket (+8 overloads)
    ws.on('message', message => {
        ws.send(`서버로부터 응답 : ${message}`);
    });


    ws.on('close', () => {
        console.log('클라이언트 접속 해제');
    });
})



/**
 * WebSocket Events
 * close                    |   연결을 닫을 때 발생하는 이벤트
 * error                    |   에러가 나면 발생하는 이벤트
 * message                  |   메세지 수신
 * open                     |   서버 연결
 * ping                     |   서버에서 ping 수신
 * pong                     |   서버에서 pong 수신
 * redirect                 |   리다이렉션 실행하기 직전
 * unexpected-response      |   서버 응답이 예상한 응답이 아닐때 (ex: 401)
 * upgrade                  |   핸드셰이크의 일부러 서버에서 응답 헤더를 수신할때
 */