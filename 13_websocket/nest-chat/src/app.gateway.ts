import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'chat' }) // (), (port), (option), (port, option)
export class ChatGateway {
  @WebSocketServer() server: Server; // 웹 소켓 인스턴스

  @SubscribeMessage('message') // message 이벤트 구독. message 이벤트로 전송되면 data 인수에 데이터가 담김.
  handleMessage(socket: Socket, data: any): void {
    // https://socket.io/docs/v4/
    const { message, nickname } = data;

    socket.broadcast.emit('message', `${nickname}: ${message}`);
  }
}

@WebSocketGateway({ namespace: 'room' })
export class RoomGateway {
  constructor(private readonly chatGateway: ChatGateway) {}

  rooms: string[] = [];

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createRoom')
  handleMessage(@MessageBody() data) {
    console.log(data);
    const { nickname, room } = data;

    this.chatGateway.server.emit('notice', {
      message: `${nickname}님이 ${room}방을 만들었습니다.`,
    });
    this.rooms.push(room);
    this.server.emit('rooms', this.rooms);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(socket: Socket, data) {
    const { nickname, room, toLeaveRoom } = data;
    socket.leave(toLeaveRoom);
    this.chatGateway.server.emit('notice', {
      message: `${nickname}님이 ${room}방에 입장했습니다.`,
    });
    socket.join(room);
  }

  @SubscribeMessage('message')
  handleMessageToRoom(socket: Socket, data) {
    const { nickname, room, message } = data;
    console.log(data);

    socket.broadcast.to(room).emit('message', {
      message: `${nickname} : ${message}`,
    });
  }
}
