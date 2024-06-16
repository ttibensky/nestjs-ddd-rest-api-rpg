import { Controller, Get } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { CharacterFactory } from 'src/modules/rpg/domain/model/character/CharacterFactory';
import { CharacterJobStats } from 'src/modules/rpg/domain/model/character/CharacterJobStats';
import { CharacterJobStatsView } from './view/CharacterJobStatsView';

@ApiTags('job')
@ApiExtraModels(CharacterJobStatsView)
@Controller('job')
export class JobsController {
  @ApiResponse({
    status: 200,
    schema: {
      type: 'array',
      items: {
        $ref: getSchemaPath(CharacterJobStatsView),
      },
    },
  })
  @Get()
  findAll(): CharacterJobStatsView[] {
    return Array.from(CharacterFactory.jobs(), ([, character]) =>
      character.stats(),
    ).map((jobStats: CharacterJobStats) => ({
      job: jobStats.job,
      maximumHealthPoints: jobStats.maximumHealthPoints.toString(),
      baseStrength: jobStats.baseStrength.toString(),
      baseDexterity: jobStats.baseDexterity.toString(),
      baseIntelligence: jobStats.baseIntelligence.toString(),
      damageModifier: jobStats.damageModifier.toString(),
      speedModifier: jobStats.speedModifier.toString(),
    }));
  }
}
