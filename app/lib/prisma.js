
// Prisma 7+ best practice: import from custom output and use Neon adapter
const { PrismaClient } = require('../../prisma/generated/client');
const { PrismaNeonHttp } = require('@prisma/adapter-neon');

const adapter = new PrismaNeonHttp(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });

module.exports = prisma;


