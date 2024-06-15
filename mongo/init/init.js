db.auth('root', 'GSgVAm73urNv');
db = db.getSiblingDB('rpg');

db.createCollection('characters', { capped: false });
db.createCollection('battles', { capped: false });
