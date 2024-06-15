import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Either, Maybe } from 'purify-ts';
import { CharacterFactory } from 'src/modules/rpg/domain/model/CharacterFactory';
import { Character } from 'src/modules/rpg/domain/model/character/Character';
import { Characters } from 'src/modules/rpg/domain/model/character/Characters';
import { CharacterId } from 'src/modules/rpg/domain/model/character/value-objects/CharacterId';
import { CharacterJob } from 'src/modules/rpg/domain/model/character/value-objects/CharacterJob';

@Injectable()
export class MongooseCharacters implements Characters {
  constructor(@InjectModel(Character.name) private model: Model<Character>) {}

  async get(id: CharacterId): Promise<Either<Error, Character>> {
    return (await this.find(id)).toEither(
      new Error(`Character not found for ID ${id.toString()}`),
    );
  }

  async find(id: CharacterId): Promise<Maybe<Character>> {
    return Maybe.fromNullable(
      await this.model.findById(id.toString()).exec(),
    ).map((raw) => {
      const characterJob =
        CharacterJob[
          raw.job.charAt(0).toUpperCase() + raw.job.slice(1).toLowerCase()
        ];
      const characterClass = CharacterFactory.getClass(characterJob);
      const character = new characterClass();

      character.id = CharacterId.fromString(raw.id);
      character.name = raw.name;
      character.job = characterJob;
      character.healthPoints = raw.healthPoints;
      character.strength = raw.strength;
      character.dexterity = raw.dexterity;
      character.intelligence = raw.intelligence;
      character.isAlive = raw.isAlive;
      character.createdAt = raw.createdAt;

      return character;
    });
  }

  async create(character: Character): Promise<void> {
    const createdCat = new this.model(character);

    await createdCat.save();
  }

  async update(character: Character): Promise<void> {
    await this.model
      .findByIdAndUpdate(character.id.toString(), new this.model(character))
      .exec();
  }
}
