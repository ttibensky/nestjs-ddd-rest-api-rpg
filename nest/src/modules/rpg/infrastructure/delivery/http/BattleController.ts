import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { validateOrReject } from 'class-validator';
import { CreateBattleCommand } from 'src/modules/rpg/domain/model/battle/command/CreateBattleCommand';
import { CharacterId } from 'src/modules/rpg/domain/model/character/value-objects/CharacterId';
import { CreateBattleDTO } from './dto/CreateBattleDTO';
import { Battle } from 'src/modules/rpg/domain/model/battle/Battle';
import { BattleId } from 'src/modules/rpg/domain/model/battle/value-object/BattleId';
import { FindBattleQuery } from 'src/modules/rpg/domain/model/battle/query/FindBattleQuery';

@ApiTags('battle')
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
          example: 'cfdaf776-6600-47a2-993b-9621f3aa6843',
        },
        defenderId: {
          type: 'string',
          example: '2119c00f-070c-459d-8161-94bc4fde6b4f',
        },
      },
    },
  })
  @Post()
  @HttpCode(200)
  async create(@Body() body: CreateBattleDTO): Promise<Battle> {
    validateOrReject(body);

    const battleId = BattleId.generate();

    await this.commandBus.execute(
      new CreateBattleCommand(
        battleId,
        CharacterId.fromString(body.attackerId),
        CharacterId.fromString(body.defenderId),
      ),
    );

    // @TODO map aggregate properties into a view model, do not use the aggregate as a view
    return this.queryBus.execute(new FindBattleQuery(battleId));
  }

  @Get(':id')
  find(@Param('id') id: string): Promise<Battle> {
    // @TODO map aggregate properties into a view model, do not use the aggregate as a view
    return this.queryBus.execute(new FindBattleQuery(BattleId.fromString(id)));
  }
}
