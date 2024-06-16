db.auth('root', 'GSgVAm73urNv');
db = db.getSiblingDB('rpg');
db.createCollection('characters', { capped: false });
db.characters.insert([
    {
        _id: '7431f870-1b32-4acd-9aa9-17edce6570e2',
        name: 'Jaina',
        job: 'mage',
        maximumHealthPoints: 12,
        currentHealthPoints: 12,
        baseStrength: 5,
        baseDexterity: 6,
        baseIntelligence: 10,
        damageModifier: '20% of strength, 20% of dexterity, 120% of intelligence',
        speedModifier: '40% of dexterity, 10% of strength',
        isAlive: true,
        createdAt: ISODate('2024-06-15T20:48:28.000Z'),
        __v: 0
    },
    {
        _id: '24ed098d-2adc-4b1f-99d1-6455a6e273d3',
        name: 'Cairne',
        job: 'warrior',
        maximumHealthPoints: 20,
        currentHealthPoints: 20,
        baseStrength: 10,
        baseDexterity: 5,
        baseIntelligence: 5,
        damageModifier: '80% of strength, 20% of dexterity',
        speedModifier: '60% of dexterity, 20% of intelligence',
        isAlive: true,
        createdAt: ISODate('2024-06-15T20:49:57.000Z'),
        __v: 0
    },
    {
        _id: '492e0894-4b8d-46c7-888c-bd3535e5fbc3',
        name: 'Garona',
        job: 'thief',
        maximumHealthPoints: 15,
        currentHealthPoints: 15,
        baseStrength: 4,
        baseDexterity: 10,
        baseIntelligence: 4,
        damageModifier: '25% of strength, 100% of dexterity, 25% of intelligence',
        speedModifier: '80% of dexterity',
        isAlive: true,
        createdAt: ISODate('2024-06-15T20:50:59.000Z'),
        __v: 0
    }
]);

db.createCollection('battles', { capped: false });
db.battles.insert([
    {
        _id: '066c0485-5408-4902-b06f-85dcbf89dcd7',
        attackerId: '7431f870-1b32-4acd-9aa9-17edce6570e2',
        attackerName: 'Jaina',
        defenderId: '24ed098d-2adc-4b1f-99d1-6455a6e273d3',
        defenderName: 'Cairne',
        state: 'ended',
        createdAt: ISODate('2024-06-16T15:08:43.000Z'),
        battleLog: [
            {
                eventId: {
                    uuid: '02fafa2b-700f-4db9-be9d-e499bf0ba199'
                },
                createdAt: {
                    date: ISODate('2024-06-16T15:08:43.407Z')
                },
                eventName: 'BattleWasCreated',
                battleId: {
                    uuid: '066c0485-5408-4902-b06f-85dcbf89dcd7'
                },
                attackerId: {
                    uuid: '7431f870-1b32-4acd-9aa9-17edce6570e2'
                },
                attackerName: {
                    value: 'Jaina'
                },
                defenderId: {
                    uuid: '24ed098d-2adc-4b1f-99d1-6455a6e273d3'
                },
                defenderName: {
                    value: 'Cairne'
                }
            },
            {
                eventId: {
                    uuid: 'e8c6eb25-3787-416a-9593-f3bdf3e948ae'
                },
                createdAt: {
                    date: ISODate('2024-06-16T15:08:43.424Z')
                },
                eventName: 'CharacterPreparedForAttack',
                characterId: {
                    uuid: '7431f870-1b32-4acd-9aa9-17edce6570e2'
                },
                characterName: {
                    value: 'Jaina'
                },
                characterSpeed: {
                    value: 1.03
                }
            },
            {
                eventId: {
                    uuid: 'caf87700-c1bd-4271-aaf7-9dfe2ad88ee9'
                },
                createdAt: {
                    date: ISODate('2024-06-16T15:08:43.433Z')
                },
                eventName: 'CharacterPreparedForAttack',
                characterId: {
                    uuid: '24ed098d-2adc-4b1f-99d1-6455a6e273d3'
                },
                characterName: {
                    value: 'Cairne'
                },
                characterSpeed: {
                    value: 1.4
                }
            },
            {
                eventId: {
                    uuid: 'fb888f95-63cf-4c48-b114-a6ec18b8b7ab'
                },
                createdAt: {
                    date: ISODate('2024-06-16T15:08:43.438Z')
                },
                eventName: 'CharacterWasAttacked',
                attackerId: {
                    uuid: '24ed098d-2adc-4b1f-99d1-6455a6e273d3'
                },
                attackerName: {
                    value: 'Cairne'
                },
                attackerHealthPoints: {
                    value: 20
                },
                defenderId: {
                    uuid: '7431f870-1b32-4acd-9aa9-17edce6570e2'
                },
                defenderName: {
                    value: 'Jaina'
                },
                defenderHealthPoints: {
                    value: 10
                },
                damage: {
                    value: 2
                }
            },
            {
                eventId: {
                    uuid: 'adbee67b-3cf4-4c6b-8a6d-9df391c6b328'
                },
                createdAt: {
                    date: ISODate('2024-06-16T15:08:43.443Z')
                },
                eventName: 'CharacterWasAttacked',
                attackerId: {
                    uuid: '7431f870-1b32-4acd-9aa9-17edce6570e2'
                },
                attackerName: {
                    value: 'Jaina'
                },
                attackerHealthPoints: {
                    value: 10
                },
                defenderId: {
                    uuid: '24ed098d-2adc-4b1f-99d1-6455a6e273d3'
                },
                defenderName: {
                    value: 'Cairne'
                },
                defenderHealthPoints: {
                    value: 9
                },
                damage: {
                    value: 11
                }
            },
            {
                eventId: {
                    uuid: '4aa6e8cf-7e04-41af-a55b-738cede1d8e9'
                },
                createdAt: {
                    date: ISODate('2024-06-16T15:08:43.448Z')
                },
                eventName: 'CharacterPreparedForAttack',
                characterId: {
                    uuid: '7431f870-1b32-4acd-9aa9-17edce6570e2'
                },
                characterName: {
                    value: 'Jaina'
                },
                characterSpeed: {
                    value: 1.98
                }
            },
            {
                eventId: {
                    uuid: 'e3a3d12a-272e-46ed-82ce-26d4e47db0fe'
                },
                createdAt: {
                    date: ISODate('2024-06-16T15:08:43.452Z')
                },
                eventName: 'CharacterPreparedForAttack',
                characterId: {
                    uuid: '24ed098d-2adc-4b1f-99d1-6455a6e273d3'
                },
                characterName: {
                    value: 'Cairne'
                },
                characterSpeed: {
                    value: 3.32
                }
            },
            {
                eventId: {
                    uuid: 'e1ef414c-aafc-4d30-8f07-7d9f29cf80e3'
                },
                createdAt: {
                    date: ISODate('2024-06-16T15:08:43.455Z')
                },
                eventName: 'CharacterWasAttacked',
                attackerId: {
                    uuid: '24ed098d-2adc-4b1f-99d1-6455a6e273d3'
                },
                attackerName: {
                    value: 'Cairne'
                },
                attackerHealthPoints: {
                    value: 9
                },
                defenderId: {
                    uuid: '7431f870-1b32-4acd-9aa9-17edce6570e2'
                },
                defenderName: {
                    value: 'Jaina'
                },
                defenderHealthPoints: {
                    value: 4
                },
                damage: {
                    value: 6
                }
            },
            {
                eventId: {
                    uuid: '4609a43c-fc15-45e5-9763-bba0e6c34ef0'
                },
                createdAt: {
                    date: ISODate('2024-06-16T15:08:43.457Z')
                },
                eventName: 'CharacterWasAttacked',
                attackerId: {
                    uuid: '7431f870-1b32-4acd-9aa9-17edce6570e2'
                },
                attackerName: {
                    value: 'Jaina'
                },
                attackerHealthPoints: {
                    value: 4
                },
                defenderId: {
                    uuid: '24ed098d-2adc-4b1f-99d1-6455a6e273d3'
                },
                defenderName: {
                    value: 'Cairne'
                },
                defenderHealthPoints: {
                    value: 0
                },
                damage: {
                    value: 10
                }
            }
        ],
        __v: 0
    }
]);
