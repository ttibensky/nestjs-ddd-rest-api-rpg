import {
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBody,
  ApiExtraModels,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { validateOrReject } from 'class-validator';
import { CreateBattleCommand } from 'src/modules/rpg/domain/model/battle/command/CreateBattleCommand';
import { CharacterId } from 'src/modules/rpg/domain/model/character/value-objects/CharacterId';
import { CreateBattleDTO } from './dto/CreateBattleDTO';
import { Battle } from 'src/modules/rpg/domain/model/battle/Battle';
import { BattleId } from 'src/modules/rpg/domain/model/battle/value-object/BattleId';
import { FindBattleQuery } from 'src/modules/rpg/domain/model/battle/query/FindBattleQuery';
import { BattleView } from './view/BattleView';
import { Maybe } from 'purify-ts';
import { BattleWasCreated } from 'src/modules/rpg/domain/model/battle/event/BattleWasCreated';
import { BattleHasEnded } from 'src/modules/rpg/domain/model/battle/event/BattleHasEnded';
import { CharacterPreparedForAttack } from 'src/modules/rpg/domain/model/character/event/CharacterPreparedForAttack';
import { CharacterWasAttacked } from 'src/modules/rpg/domain/model/character/event/CharacterWasAttacked';

@ApiTags('battle')
@ApiExtraModels(
  BattleView,
  BattleWasCreated,
  CharacterPreparedForAttack,
  CharacterWasAttacked,
  BattleHasEnded,
)
@Controller('battle')
export class BattleController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        attackerId: {
          type: 'string',
          example: '7699057a-c525-45fc-b4ec-6d457925b15a',
        },
        defenderId: {
          type: 'string',
          example: 'ba8a892b-9f21-406f-879a-00b54d0e98ae',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(BattleView),
    },
  })
  @Post()
  @HttpCode(200)
  async create(@Body() body: CreateBattleDTO): Promise<BattleView> {
    validateOrReject(body);

    const battleId = BattleId.generate();

    // @TODO handle Error: Character 5b444ca5-1e5c-4fb0-aa55-8ac3a4278181 is dead
    // @TODO handle Error: Character not found
    return this.commandBus
      .execute(
        new CreateBattleCommand(
          battleId,
          CharacterId.fromString(body.attackerId),
          CharacterId.fromString(body.defenderId),
        ),
      )
      .then(() => this.findBattle(battleId));
  }

  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(BattleView),
    },
  })
  @ApiResponse({
    status: 404,
    schema: {
      example: {
        message: 'Not Found',
        statusCode: 404,
      },
    },
  })
  @Get(':id')
  find(@Param('id') id: string): Promise<BattleView> {
    return this.findBattle(BattleId.fromString(id));
  }

  private async findBattle(id: BattleId): Promise<BattleView> {
    return this.queryBus
      .execute(new FindBattleQuery(id))
      .then((maybeBattle: Maybe<Battle>) =>
        // @TODO use serializer
        maybeBattle
          .map((battle: Battle): BattleView => this.convertToView(battle))
          .orDefaultLazy(() => {
            throw new NotFoundException();
          }),
      );
  }

  private convertToView(battle: Battle): BattleView {
    return {
      id: battle.id.toString(),
      attackerId: battle.attackerId.toString(),
      attackerName: battle.attackerName.toString(),
      defenderId: battle.defenderId.toString(),
      defenderName: battle.defenderName.toString(),
      state: battle.state.toString(),
      createdAt: battle.createdAt.toString(),
      battleLog: battle.battleLog,
    };
  }
}
