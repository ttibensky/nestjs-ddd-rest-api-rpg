import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { Either, Maybe } from 'purify-ts';
import { BaseMongooseRepository } from 'src/lib/common/infrastructure/domain/model/BaseMongooseRepository';
import { Character } from 'src/modules/rpg/domain/model/character/Character';
import { CharacterFactory } from 'src/modules/rpg/domain/model/character/CharacterFactory';
import { Characters } from 'src/modules/rpg/domain/model/character/Characters';
import { SearchCharactersQuery } from 'src/modules/rpg/domain/model/character/query/SearchCharactersQuery';
import { CharacterId } from 'src/modules/rpg/domain/model/character/value-objects/CharacterId';
import { CharacterJob } from 'src/modules/rpg/domain/model/character/value-objects/CharacterJob';
import { CharacterNotFoundError } from './error/CharacterNotFoundError';

@Injectable()
export class MongooseCharacters
  extends BaseMongooseRepository
  implements Characters
{
  constructor(
    @InjectModel(Character.name) private model: Model<Character>,
    eventBus: EventBus,
  ) {
    super(eventBus);
  }

  async get(
    id: CharacterId,
  ): Promise<Either<CharacterNotFoundError, Character>> {
    return (await this.find(id))
      .toEither(
        new CharacterNotFoundError(
          `Character not found for ID ${id.toString()}`,
        ),
      )
      .ifLeft((e) => {
        throw e;
      });
  }

  async find(id: CharacterId): Promise<Maybe<Character>> {
    return Maybe.fromNullable(
      await this.model.findById(id.toString()).exec(),
    ).map((raw) => this.convertToDomainModel(raw));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async search(query: SearchCharactersQuery): Promise<Character[]> {
    // @TODO add search criteria
    return (await this.model.find().exec()).map((raw) =>
      this.convertToDomainModel(raw),
    );
  }

  async create(character: Character): Promise<void> {
    const createdCat = new this.model(character);

    await createdCat.save();

    this.dispatchEvents(character);
  }

  async update(character: Character): Promise<void> {
    await this.model
      .findByIdAndUpdate(character.id.toString(), new this.model(character))
      .exec();

    this.dispatchEvents(character);
  }

  private convertToDomainModel(
    raw: Document<unknown, any, Character> & Character,
  ): Character {
    const characterJob =
      CharacterJob[
        raw.job.charAt(0).toUpperCase() + raw.job.slice(1).toLowerCase()
      ];
    const characterClass = CharacterFactory.getClass(characterJob);
    const character = new characterClass();

    character.id = CharacterId.fromString(raw.id);
    character.name = raw.name;
    character.job = characterJob;
    character.maximumHealthPoints = raw.maximumHealthPoints;
    character.currentHealthPoints = raw.currentHealthPoints;
    character.baseStrength = raw.baseStrength;
    character.baseDexterity = raw.baseDexterity;
    character.baseIntelligence = raw.baseIntelligence;
    character.damageModifier = raw.damageModifier;
    character.speedModifier = raw.speedModifier;
    character.isAlive = raw.isAlive;
    character.createdAt = raw.createdAt;

    return character;
  }
}
