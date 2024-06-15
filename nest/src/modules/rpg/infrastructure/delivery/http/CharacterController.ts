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
import { ApiBody, ApiTags } from '@nestjs/swagger';
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
@Controller('character')
export class CharacterController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  // @TODO document response body
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Jaina Proudmoore',
        },
        job: {
          type: 'string',
          example: 'mage',
          enum: Object.values(CharacterJob),
        },
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

  // @TODO document response body
  @Get()
  async findAll(): Promise<CharacterView[]> {
    return this.queryBus
      .execute(new SearchCharactersQuery())
      .then((characters: Character[]) =>
        characters.map((character: Character) => this.convertToView(character)),
      );
  }

  // @TODO document response body
  @Get(':id')
  async find(@Param('id') id: string): Promise<CharacterView> {
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
    return {
      id: character.id.toString(),
      name: character.name.toString(),
      job: character.job.toString(),
      healthPoints: character.healthPoints.toNumber(),
      strength: character.strength.toNumber(),
      dexterity: character.dexterity.toNumber(),
      intelligence: character.intelligence.toNumber(),
      isAlive: character.isAlive,
      createdAt: character.createdAt.toString(),
    };
  }
}
