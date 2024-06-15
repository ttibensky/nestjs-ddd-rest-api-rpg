import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Either, Maybe } from 'purify-ts';
import { Battle } from 'src/modules/rpg/domain/model/battle/Battle';
import { Battles } from 'src/modules/rpg/domain/model/battle/Battles';
import { BattleId } from 'src/modules/rpg/domain/model/battle/value-object/BattleId';

@Injectable()
export class MongooseBattles implements Battles {
  constructor(@InjectModel(Battle.name) private model: Model<Battle>) {}

  async get(id: BattleId): Promise<Either<Error, Battle>> {
    return (await this.find(id)).toEither(
      new Error(`Battle not found for ID ${id.toString()}`),
    );
  }

  async find(id: BattleId): Promise<Maybe<Battle>> {
    return Maybe.fromNullable(await this.model.findById(id.toString()).exec());
  }

  async create(battle: Battle): Promise<void> {
    const createdCat = new this.model(battle);

    await createdCat.save();
  }

  async update(battle: Battle): Promise<void> {
    await this.model
      .findByIdAndUpdate(battle.id.toString(), new this.model(battle))
      .exec();
  }
}
