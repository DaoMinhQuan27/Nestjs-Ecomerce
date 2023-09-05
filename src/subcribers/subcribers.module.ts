import { Module } from '@nestjs/common';
import { SubcribersController } from './subcribers.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SUBCRIBERS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://enttqokc:t1MDVX2UBTP-kZIZtyLz4ZVUUR5tMjTX@armadillo.rmq.cloudamqp.com/enttqokc'],
          queue: 'subcribers_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [SubcribersController],
})
export class SubcribersModule {}
