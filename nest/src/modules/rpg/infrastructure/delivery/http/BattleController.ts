import {
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBody,
  ApiExtraModels,
  ApiParam,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { validateOrReject } from 'class-validator';
import { Maybe } from 'purify-ts';
import { Battle } from 'src/modules/rpg/domain/model/battle/Battle';
import { CreateBattleCommand } from 'src/modules/rpg/domain/model/battle/command/CreateBattleCommand';
import { BattleHasEnded } from 'src/modules/rpg/domain/model/battle/event/BattleHasEnded';
import { BattleWasCreated } from 'src/modules/rpg/domain/model/battle/event/BattleWasCreated';
import { FindBattleQuery } from 'src/modules/rpg/domain/model/battle/query/FindBattleQuery';
import { BattleId } from 'src/modules/rpg/domain/model/battle/value-object/BattleId';
import { CharacterPreparedForAttack } from 'src/modules/rpg/domain/model/character/event/CharacterPreparedForAttack';
import { CharacterWasAttacked } from 'src/modules/rpg/domain/model/character/event/CharacterWasAttacked';
import { CharacterId } from 'src/modules/rpg/domain/model/character/value-objects/CharacterId';
import { CharacterNotFoundError } from '../../domain/model/character/error/CharacterNotFoundError';
import { CreateBattleDTO } from './dto/CreateBattleDTO';
import { BattleView } from './view/BattleView';

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
          example: '7431f870-1b32-4acd-9aa9-17edce6570e2',
        },
        defenderId: {
          type: 'string',
          example: '24ed098d-2adc-4b1f-99d1-6455a6e273d3',
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
  @ApiResponse({
    status: 400,
    description: 'both IDs must be a valid UUIDv4 strings',
    schema: {
      example: {
        message: [
          'attackerId must match /^[\\d\\w]{8}-[\\d\\w]{4}-[\\d\\w]{4}-[\\d\\w]{4}-[\\d\\w]{12}$/ regular expression',
          'defenderId must match /^[\\d\\w]{8}-[\\d\\w]{4}-[\\d\\w]{4}-[\\d\\w]{4}-[\\d\\w]{12}$/ regular expression',
        ],
        error: 'Bad Request',
        statusCode: 400,
      },
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
  @Post()
  @HttpCode(200)
  async create(@Body() body: CreateBattleDTO): Promise<BattleView> {
    // @TODO validate whether the characters are alive when creating new battle
    validateOrReject(body);

    const battleId = BattleId.generate();

    return this.commandBus
      .execute(
        new CreateBattleCommand(
          battleId,
          CharacterId.fromString(body.attackerId),
          CharacterId.fromString(body.defenderId),
        ),
      )
      .catch((e) => {
        switch (true) {
          case e instanceof CharacterNotFoundError:
            throw new NotFoundException();
          default:
            throw e;
        }
      })
      .then(() => this.findBattle(battleId));
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    example: '86d1bb24-e9fa-499e-a7c0-881138038e35',
  })
  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(BattleView),
    },
  })
  @ApiResponse({
    status: 400,
    schema: {
      example: {
        message: 'Validation failed (uuid is expected)',
        error: 'Bad Request',
        statusCode: 400,
      },
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
  find(@Param('id', ParseUUIDPipe) id: string): Promise<BattleView> {
    // @TODO check that id param is a valid UUIDv4 string
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
