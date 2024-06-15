import { Module } from '@nestjs/common';
import { RpgModule } from './modules/rpg/rpg.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    RpgModule,
    // @TODO move to .env
    MongooseModule.forRoot('mongodb://root:GSgVAm73urNv@mongo:27017', {
      dbName: 'rpg',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
