import { Mage } from 'src/modules/rpg/domain/model/character/Mage';
import { Warrior } from 'src/modules/rpg/domain/model/character/Warrior';
import { CharacterPreparedForAttack } from 'src/modules/rpg/domain/model/character/event/CharacterPreparedForAttack';
import { CharacterWasAttacked } from 'src/modules/rpg/domain/model/character/event/CharacterWasAttacked';
import { CharacterWasCreated } from 'src/modules/rpg/domain/model/character/event/CharacterWasCreated';
import { CharacterId } from 'src/modules/rpg/domain/model/character/value-objects/CharacterId';
import { CharacterJob } from 'src/modules/rpg/domain/model/character/value-objects/CharacterJob';
import { CharacterName } from 'src/modules/rpg/domain/model/character/value-objects/CharacterName';

describe('Character', () => {
  it('create', () => {
    const characterId = CharacterId.generate();
    const character = Warrior.create(characterId, new CharacterName('Cairne'));

    expect(character.id.toString()).toStrictEqual(characterId.toString());
    expect(character.name.toString()).toStrictEqual('Cairne');
    expect(character.job).toStrictEqual(CharacterJob.Warrior);

    const generator = character.shiftEvents();
    const event = generator.next().value;

    expect(event).toBeInstanceOf(CharacterWasCreated);
    expect(event.characterId.toString()).toStrictEqual(characterId.toString());
    expect(event.characterName.toString()).toStrictEqual('Cairne');
    expect(event.characterJob).toStrictEqual(CharacterJob.Warrior);
  });

  it('prepareForAttack', () => {
    const characterId = CharacterId.generate();
    const character = Warrior.create(characterId, new CharacterName('Cairne'));
    character.prepareForAttack();

    const generator = character.shiftEvents();
    generator.next();
    const event = generator.next().value;

    expect(event).toBeInstanceOf(CharacterPreparedForAttack);
    expect(event.characterId.toString()).toStrictEqual(characterId.toString());
    expect(event.characterName.toString()).toStrictEqual('Cairne');
  });

  it('attack', () => {
    const defenderId = CharacterId.generate();
    const defender = Mage.create(defenderId, new CharacterName('Jaina'));

    const characterId = CharacterId.generate();
    const character = Warrior.create(characterId, new CharacterName('Cairne'));
    character.prepareForAttack();
    defender.attack(character);

    const generator = defender.shiftEvents();
    generator.next();
    const event = generator.next().value;

    expect(event).toBeInstanceOf(CharacterWasAttacked);
    expect(event.attackerId.toString()).toStrictEqual(characterId.toString());
    expect(event.attackerName.toString()).toStrictEqual('Cairne');
    expect(event.defenderId.toString()).toStrictEqual(defenderId.toString());
    expect(event.defenderName.toString()).toStrictEqual('Jaina');
  });
});
