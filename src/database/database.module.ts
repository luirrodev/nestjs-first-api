import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'pg';

import config from 'src/config';

// client.query('SELECT * FROM public.task', (err, res) => {
//   console.error(err);
//   console.log(res.rows);
// });

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, database, password, port } = configService.postgres;
        return {
          type: 'postgres',
          username: user,
          host,
          database,
          password,
          port,
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'PG_CLIENT',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, database, password, port } = configService.postgres;

        const client = new Client({
          user,
          host,
          database,
          password,
          port,
        });

        client.connect();

        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['PG_CLIENT', TypeOrmModule],
})
export class DatabaseModule {}
