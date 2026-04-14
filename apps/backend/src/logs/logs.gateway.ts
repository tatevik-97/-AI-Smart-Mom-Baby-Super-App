import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class LogsGateway {
  @WebSocketServer()
  server: Server;

  sendLogUpdate(data: any) {
    this.server.emit('logCreated', data);
  }
}
