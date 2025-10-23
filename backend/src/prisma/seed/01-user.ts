import { Prisma, PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt';
import { cpf } from "cpf-cnpj-validator";

export const users: Prisma.UserCreateInput[] = [
  {
    name: 'gabs',
    nickname: 'Ghost',
    email: 'ghost@gmail.com',
    password: 'Pxl@4568#',
    cpf: '278.442.374-30',
    isAdmin: true,
  },
  {
    name: 'gabs',
    nickname: 'Destino_veleiro',
    email: 'destino@gmail.com',
    password: 'Pa44528033#',
    cpf: '518.842.108-99',
    isAdmin: true,
  },
  {
    name: 'gaas',
    nickname: 'gaaa',
    email: 'gaaa@gmail.com',
    password: 'Lzra@16376',
    cpf: '480.712.615-64',
    isAdmin: false,
  },
  {
    name: 'Gabriel',
    nickname: 'GabsRoblox',
    email: 'gabs@hotmail.com',
    password: 'Gab@6367#Roblox',
    cpf: '119.116.050-54',
    isAdmin: true,
  },
  {
    name: 'ga',
    nickname: 'tt',
    email: 'tt@gmail.com',
    password: 'Vio#255CODE*',
    cpf: '363.155.000-64',
    isAdmin: false,
  }  
]

export const user = async (prisma: PrismaClient) => {
  for (const obj of Object.values(users)) {
    const existing = await prisma.user.findFirst({
      where: { email: obj.email },
    });

    if (!existing) {
      await prisma.user.create({
        data: {
          ...obj,
          password: await bcrypt.hash(obj.password, 10),
          cpf: cpf.format(obj.cpf)
        }
      });
    }
  }
  console.log("✅ Users seeded successfully!")
}
