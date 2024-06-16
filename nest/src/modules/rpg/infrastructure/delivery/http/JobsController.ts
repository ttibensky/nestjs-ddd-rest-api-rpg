import { Controller, Get } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { CharacterFactory } from 'src/modules/rpg/domain/model/character/CharacterFactory';
import { CharacterJobStats } from 'src/modules/rpg/domain/model/character/CharacterJobStats';

@ApiTags('job')
@ApiExtraModels(CharacterJobStats)
@Controller('job')
export class JobsController {
  @ApiResponse({
    status: 200,
    schema: {
      type: 'array',
      items: {
        $ref: getSchemaPath(CharacterJobStats),
      },
    },
  })
  @Get()
  findAll(): CharacterJobStats[] {
    return Array.from(CharacterFactory.jobs(), ([, character]) =>
      character.stats(),
    );
  }
}
