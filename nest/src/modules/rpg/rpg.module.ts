import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateBattleCommandHandler } from './application/handler/command/battle/CreateBattleCommandHandler';
import { EndBattleCommandHandler } from './application/handler/command/battle/EndBattleCommandHandler';
import { AttackCharacterCommandHandler } from './application/handler/command/character/AttackCharacterCommandHandler';
import { CreateCharacterCommandHandler } from './application/handler/command/character/CreateCharacterCommandHandler';
import { PrepareCharacterForAttackCommandHandler } from './application/handler/command/character/PrepareCharacterForAttackCommandHandler';
import { BattleProcess } from './application/handler/event/battle/BattleProcess';
import { FindBattleQueryHandler } from './application/handler/query/battle/FindBattleQueryHandler';
import { FindCharacterQueryHandler } from './application/handler/query/character/FindCharacerQueryHandler';
import { SearchCharactersQueryHandler } from './application/handler/query/character/SearchCharactersQueryHandler';
import { Battle } from './domain/model/battle/Battle';
import { Battles } from './domain/model/battle/Battles';
import { Character } from './domain/model/character/Character';
import { Characters } from './domain/model/character/Characters';
import { BattleController } from './infrastructure/delivery/http/BattleController';
import { CharacterController } from './infrastructure/delivery/http/CharacterController';
import { JobsController } from './infrastructure/delivery/http/JobsController';
import { MongooseBattles } from './infrastructure/domain/model/battle/MongooseBattles';
import { MongooseCharacters } from './infrastructure/domain/model/character/MongooseCharacters';
import { BattleSchema } from './infrastructure/persistence/mongoose/schema/battle.schema';
import { CharacterSchema } from './infrastructure/persistence/mongoose/schema/character.schema';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: Character.name, schema: CharacterSchema },
    ]),
    MongooseModule.forFeature([{ name: Battle.name, schema: BattleSchema }]),
  ],
  controllers: [JobsController, CharacterController, BattleController],
  providers: [
    // command handlers
    ...[
      CreateCharacterCommandHandler,
      PrepareCharacterForAttackCommandHandler,
      AttackCharacterCommandHandler,
      CreateBattleCommandHandler,
      EndBattleCommandHandler,
    ],
    // query handlers
    ...[
      SearchCharactersQueryHandler,
      FindCharacterQueryHandler,
      FindBattleQueryHandler,
    ],
    // event handlers and processes
    ...[BattleProcess],
    ...[
      {
        provide: Characters,
        useClass: MongooseCharacters,
      },
      {
        provide: Battles,
        useClass: MongooseBattles,
      },
    ],
  ],
})
export class RpgModule {}
