import { Global, Module } from '@nestjs/common';
import { Client } from 'pg';

const client = new Client({
  user: 'root',
  host: 'localhost',
  database: 'my_db',
  password: '12345678',
  port: 5432,
});

client.connect();
// client.query('SELECT * FROM public.task', (err, res) => {
//   console.error(err);
//   console.log(res.rows);
// });

@Global()
@Module({
  providers: [
    {
      provide: 'PG_CLIENT',
      useValue: client,
    },
  ],
  exports: ['PG_CLIENT'],
})
export class DatabaseModule {}
