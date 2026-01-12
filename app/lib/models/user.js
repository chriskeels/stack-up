const prisma = require('@/app/lib/prisma');

const User = {
  async create({ name, email, passwordHash }) {
    const user = await prisma.users.create({
      data: { name, email, password_hash: passwordHash },
      select: { id: true, name: true, email: true, created_at: true },
    });
    return user;
  },

  async findOne({ email }) {
    const user = await prisma.users.findUnique({
      where: { email },
      select: { id: true, name: true, email: true, password_hash: true, created_at: true },
    });
    return user;
  },

  async findById(id) {
    const user = await prisma.users.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, created_at: true },
    });
    return user;
  },
};

module.exports = User;
