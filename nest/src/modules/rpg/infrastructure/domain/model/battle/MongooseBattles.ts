import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { Either, Maybe } from 'purify-ts';
import { BaseMongooseRepository } from 'src/lib/common/infrastructure/domain/model/BaseMongooseRepository';
import { Battle } from 'src/modules/rpg/domain/model/battle/Battle';
import { Battles } from 'src/modules/rpg/domain/model/battle/Battles';
import { BattleId } from 'src/modules/rpg/domain/model/battle/value-object/BattleId';

@Injectable()
export class MongooseBattles extends BaseMongooseRepository implements Battles {
  constructor(
    @InjectModel(Battle.name) private model: Model<Battle>,
    eventBus: EventBus,
  ) {
    super(eventBus);
  }

  async get(id: BattleId): Promise<Either<BattleNotFoundError, Battle>> {
    return (await this.find(id))
      .toEither(
        new BattleNotFoundError(`Battle not found for ID ${id.toString()}`),
      )
      .ifLeft((e) => {
        throw e;
      });
  }

  async find(id: BattleId): Promise<Maybe<Battle>> {
    return Maybe.fromNullable(
      await this.model.findById(id.toString()).exec(),
    ).map((raw) => this.convertToDomainModel(raw));
  }

  async create(battle: Battle): Promise<void> {
    const createdCat = new this.model(battle);

    await createdCat.save();

    this.dispatchEvents(battle);
  }

  async update(battle: Battle): Promise<void> {
    await this.model
      .findByIdAndUpdate(battle.id.toString(), new this.model(battle))
      .exec();

    this.dispatchEvents(battle);
  }

  private convertToDomainModel(
    raw: Document<unknown, any, Battle> & Battle,
  ): Battle {
    const battle = new Battle();

    battle.id = BattleId.fromString(raw.id);
    battle.attackerId = raw.attackerId;
    battle.attackerName = raw.attackerName;
    battle.defenderId = raw.defenderId;
    battle.defenderName = raw.defenderName;
    battle.state = raw.state;
    battle.battleLog = raw.battleLog;
    battle.createdAt = raw.createdAt;

    return battle;
  }
}
