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
import { Character } from 'src/modules/rpg/domain/model/character/Character';
import { CreateCharacterCommand } from 'src/modules/rpg/domain/model/character/command/CreateCharacterCommand';
import { FindCharacterQuery } from 'src/modules/rpg/domain/model/character/query/FindCharacterQuery';
import { CharacterId } from 'src/modules/rpg/domain/model/character/value-objects/CharacterId';
import { CharacterJob } from 'src/modules/rpg/domain/model/character/value-objects/CharacterJob';
import { CharacterName } from 'src/modules/rpg/domain/model/character/value-objects/CharacterName';
import { CreateCharacterDTO } from './dto/CreateCharacterDTO';
import { CharacterView } from './view/CharacterView';
import { Maybe } from 'purify-ts';
import { SearchCharactersQuery } from 'src/modules/rpg/domain/model/character/query/SearchCharactersQuery';

@ApiTags('character')
@ApiExtraModels(CharacterView)
@Controller('character')
export class CharacterController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Jaina',
        },
        job: {
          type: 'string',
          example: 'mage',
          enum: Object.values(CharacterJob),
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(CharacterView),
    },
  })
  @ApiResponse({
    status: 400,
    description: [
      'name must contain letters or _ (underscore) characters and have a length between 4 and 15 characters inclusive',
      'job must be one of warrior, thief, mage',
    ].join('<br>'),
    schema: {
      example: {
        message: [
          'name must match /^[a-zA-Z_]{4,15}$/ regular expression',
          'job must be one of the following values: warrior, thief, mage',
        ],
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'job must be one of warrior, thief, mage',
    schema: {
      example: {
        message: [
          'job must be one of the following values: warrior, thief, mage',
        ],
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @Post()
  @HttpCode(200)
  async create(@Body() body: CreateCharacterDTO): Promise<CharacterView> {
    validateOrReject(body);

    const characterId = CharacterId.generate();

    return this.commandBus
      .execute(
        new CreateCharacterCommand(
          characterId,
          new CharacterName(body.name),
          CharacterJob[
            body.job.charAt(0).toUpperCase() + body.job.slice(1).toLowerCase()
          ],
        ),
      )
      .then(() => this.findCharacter(characterId));
  }

  @ApiResponse({
    status: 200,
    schema: {
      type: 'array',
      items: {
        $ref: getSchemaPath(CharacterView),
      },
    },
  })
  @Get()
  async findAll(): Promise<CharacterView[]> {
    return this.queryBus
      .execute(new SearchCharactersQuery())
      .then((characters: Character[]) =>
        characters.map((character: Character) => this.convertToView(character)),
      );
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    example: '7431f870-1b32-4acd-9aa9-17edce6570e2',
  })
  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(CharacterView),
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
  async find(@Param('id', ParseUUIDPipe) id: string): Promise<CharacterView> {
    // @TODO check that id param is a valid UUIDv4 string
    return this.findCharacter(CharacterId.fromString(id));
  }

  private async findCharacter(id: CharacterId): Promise<CharacterView> {
    return this.queryBus
      .execute(new FindCharacterQuery(id))
      .then((maybeCharacter: Maybe<Character>) =>
        // @TODO use serializer
        maybeCharacter
          .map(
            (character: Character): CharacterView =>
              this.convertToView(character),
          )
          .orDefaultLazy(() => {
            throw new NotFoundException();
          }),
      );
  }

  private convertToView(character: Character): CharacterView {
    return new CharacterView(
      character.id.toString(),
      character.name.toString(),
      character.job.toString(),
      character.maximumHealthPoints.toNumber(),
      character.currentHealthPoints.toNumber(),
      character.baseStrength.toNumber(),
      character.baseDexterity.toNumber(),
      character.baseIntelligence.toNumber(),
      character.damageModifier.toString(),
      character.speedModifier.toString(),
      character.isAlive,
      character.createdAt.toString(),
    );
  }
}
