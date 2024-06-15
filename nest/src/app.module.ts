import { Module } from '@nestjs/common';
import { RpgModule } from './modules/rpg/rpg.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    MongooseModule.forRoot(process.env.MONGOOSE_ROOT, {
      dbName: 'rpg',
    }),
    RpgModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
