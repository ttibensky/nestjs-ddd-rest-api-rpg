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
        _id: '86d1bb24-e9fa-499e-a7c0-881138038e35',
        attackerId: '7431f870-1b32-4acd-9aa9-17edce6570e2',
        attackerName: 'Jaina',
        defenderId: '492e0894-4b8d-46c7-888c-bd3535e5fbc3',
        defenderName: 'Garona',
        state: 'ended',
        createdAt: ISODate('2024-06-15T21:02:28.000Z'),
        battleLog: [
            {
                eventId: {
                    uuid: '02c93654-93f9-4cc7-9afb-9ca0ee8f75e0'
                },
                createdAt: {
                    date: ISODate('2024-06-15T21:02:28.547Z')
                },
                eventName: 'BattleWasCreated',
                battleId: {
                    uuid: '86d1bb24-e9fa-499e-a7c0-881138038e35'
                },
                attackerId: {
                    uuid: '7431f870-1b32-4acd-9aa9-17edce6570e2'
                },
                attackerName: {
                    value: 'Jaina'
                },
                defenderId: {
                    uuid: '492e0894-4b8d-46c7-888c-bd3535e5fbc3'
                },
                defenderName: {
                    value: 'Garona'
                }
            },
            {
                eventId: {
                    uuid: '6fc25a6c-7318-43e0-8717-849221bbc5f7'
                },
                createdAt: {
                    date: ISODate('2024-06-15T21:02:28.559Z')
                },
                eventName: 'CharacterPreparedForAttack',
                characterId: {
                    uuid: '7431f870-1b32-4acd-9aa9-17edce6570e2'
                },
                characterName: {
                    value: 'Jaina'
                },
                characterSpeed: {
                    value: 0.42
                }
            },
            {
                eventId: {
                    uuid: 'b30fa684-b8d0-4acf-9004-2d754a902826'
                },
                createdAt: {
                    date: ISODate('2024-06-15T21:02:28.565Z')
                },
                eventName: 'CharacterPreparedForAttack',
                characterId: {
                    uuid: '492e0894-4b8d-46c7-888c-bd3535e5fbc3'
                },
                characterName: {
                    value: 'Garona'
                },
                characterSpeed: {
                    value: 1.7
                }
            },
            {
                eventId: {
                    uuid: '74e7ea4d-1fa4-4b24-87ca-fd1cbc14cd99'
                },
                createdAt: {
                    date: ISODate('2024-06-15T21:02:28.570Z')
                },
                eventName: 'CharacterWasAttacked',
                attackerId: {
                    uuid: '492e0894-4b8d-46c7-888c-bd3535e5fbc3'
                },
                attackerName: {
                    value: 'Garona'
                },
                attackerHealthPoints: {
                    value: 15
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
                    uuid: '533e6cbf-cd95-465b-89ce-498dd961818d'
                },
                createdAt: {
                    date: ISODate('2024-06-15T21:02:28.574Z')
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
                    uuid: '492e0894-4b8d-46c7-888c-bd3535e5fbc3'
                },
                defenderName: {
                    value: 'Garona'
                },
                defenderHealthPoints: {
                    value: 6
                },
                damage: {
                    value: 9
                }
            },
            {
                eventId: {
                    uuid: '2e5a46a0-396d-43e0-9a3e-caac0149c9ea'
                },
                createdAt: {
                    date: ISODate('2024-06-15T21:02:28.578Z')
                },
                eventName: 'CharacterPreparedForAttack',
                characterId: {
                    uuid: '7431f870-1b32-4acd-9aa9-17edce6570e2'
                },
                characterName: {
                    value: 'Jaina'
                },
                characterSpeed: {
                    value: 2.2
                }
            },
            {
                eventId: {
                    uuid: '1856190d-4ef9-4b1b-88dd-7635a5e9a219'
                },
                createdAt: {
                    date: ISODate('2024-06-15T21:02:28.581Z')
                },
                eventName: 'CharacterPreparedForAttack',
                characterId: {
                    uuid: '492e0894-4b8d-46c7-888c-bd3535e5fbc3'
                },
                characterName: {
                    value: 'Garona'
                },
                characterSpeed: {
                    value: 1.35
                }
            },
            {
                eventId: {
                    uuid: 'f00fc9c2-39fa-46f0-999a-1dda7f2bfa3a'
                },
                createdAt: {
                    date: ISODate('2024-06-15T21:02:28.586Z')
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
                    uuid: '492e0894-4b8d-46c7-888c-bd3535e5fbc3'
                },
                defenderName: {
                    value: 'Garona'
                },
                defenderHealthPoints: {
                    value: 4
                },
                damage: {
                    value: 2
                }
            },
            {
                eventId: {
                    uuid: '51a36ef2-6010-49a8-87b9-d8174f129889'
                },
                createdAt: {
                    date: ISODate('2024-06-15T21:02:28.590Z')
                },
                eventName: 'CharacterWasAttacked',
                attackerId: {
                    uuid: '492e0894-4b8d-46c7-888c-bd3535e5fbc3'
                },
                attackerName: {
                    value: 'Garona'
                },
                attackerHealthPoints: {
                    value: 4
                },
                defenderId: {
                    uuid: '7431f870-1b32-4acd-9aa9-17edce6570e2'
                },
                defenderName: {
                    value: 'Jaina'
                },
                defenderHealthPoints: {
                    value: 5
                },
                damage: {
                    value: 5
                }
            },
            {
                eventId: {
                    uuid: '47c73c86-2cd9-4b5a-aea6-44cc1f1ec1e0'
                },
                createdAt: {
                    date: ISODate('2024-06-15T21:02:28.592Z')
                },
                eventName: 'CharacterPreparedForAttack',
                characterId: {
                    uuid: '7431f870-1b32-4acd-9aa9-17edce6570e2'
                },
                characterName: {
                    value: 'Jaina'
                },
                characterSpeed: {
                    value: 2.14
                }
            },
            {
                eventId: {
                    uuid: '0a061267-e364-42b3-8125-6c41998b2dc2'
                },
                createdAt: {
                    date: ISODate('2024-06-15T21:02:28.594Z')
                },
                eventName: 'CharacterPreparedForAttack',
                characterId: {
                    uuid: '492e0894-4b8d-46c7-888c-bd3535e5fbc3'
                },
                characterName: {
                    value: 'Garona'
                },
                characterSpeed: {
                    value: 0.11
                }
            },
            {
                eventId: {
                    uuid: 'c76520f4-cd1c-445b-825c-94458b6576d4'
                },
                createdAt: {
                    date: ISODate('2024-06-15T21:02:28.597Z')
                },
                eventName: 'CharacterWasAttacked',
                attackerId: {
                    uuid: '7431f870-1b32-4acd-9aa9-17edce6570e2'
                },
                attackerName: {
                    value: 'Jaina'
                },
                attackerHealthPoints: {
                    value: 5
                },
                defenderId: {
                    uuid: '492e0894-4b8d-46c7-888c-bd3535e5fbc3'
                },
                defenderName: {
                    value: 'Garona'
                },
                defenderHealthPoints: {
                    value: 0
                },
                damage: {
                    value: 6
                }
            },
            {
                eventId: {
                    uuid: '9381a207-eb1a-4d17-9cc7-d35438721d00'
                },
                createdAt: {
                    date: ISODate('2024-06-15T21:02:28.605Z')
                },
                eventName: 'CharacterWasAttacked',
                attackerId: {
                    uuid: '492e0894-4b8d-46c7-888c-bd3535e5fbc3'
                },
                attackerName: {
                    value: 'Garona'
                },
                attackerHealthPoints: {
                    value: 0
                },
                defenderId: {
                    uuid: '7431f870-1b32-4acd-9aa9-17edce6570e2'
                },
                defenderName: {
                    value: 'Jaina'
                },
                defenderHealthPoints: {
                    value: 0
                },
                damage: {
                    value: 11
                }
            }
        ],
        __v: 0
    }
]);
