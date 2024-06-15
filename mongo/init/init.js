db.auth('root', 'GSgVAm73urNv');
db = db.getSiblingDB('rpg');

db.createCollection('battles', { capped: false });
db.createCollection('characters', { capped: false });
db.characters.insert([
    {
        _id: '7699057a-c525-45fc-b4ec-6d457925b15a',
        name: 'Jaina Proudmoore',
        job: 'mage',
        healthPoints: 12,
        strength: 4,
        dexterity: 10,
        intelligence: 4,
        isAlive: true,
        createdAt: ISODate('2024-06-15T16:38:26.000Z'),
        __v: 0
    },
    {
        _id: 'ba8a892b-9f21-406f-879a-00b54d0e98ae',
        name: 'Thrall',
        job: 'warrior',
        healthPoints: 20,
        strength: 10,
        dexterity: 5,
        intelligence: 5,
        isAlive: true,
        createdAt: ISODate('2024-06-15T16:38:34.000Z'),
        __v: 0
    }
]);
