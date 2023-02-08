import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import config from 'src/config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { HOST, PORT, USER, PASSWORD, NAME } = configService.db;
        return {
          type: 'mysql',
          host: HOST,
          port: PORT,
          username: USER,
          password: PASSWORD,
          database: NAME,
          synchronize: true,
          autoLoadEntities: true
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
