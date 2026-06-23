// // backend/src/prisma.ts
// // import { PrismaClient } from "@prisma/client";
// import { PrismaClient } from "../node_modules/.prisma/client"

// const prisma = new PrismaClient();

// export default prisma;


import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'

import { PrismaClient } from "@prisma/client";
console.log("DataBase Connected")
const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })


const prisma = new PrismaClient({});

export default prisma;
