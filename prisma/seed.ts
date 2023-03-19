import { PrismaClient, Prisma } from '@prisma/client'
import { hash } from 'bcryptjs'


const prisma = new PrismaClient()
let password;
const hashPassword = hash("12345", 10).then(hash => {
  password = hash;
})
const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Tim',
    email: 'tim@prisma.io',
    password: password,
    profile: {
      create: {
        bio: 'tim bio',
        imageUrl: 'tim/image.png',
      }
    },
    posts: {
      create: [
        {
          title: 'tims post one title',
          body: 'tim post one body',
          url: 'post one url'
        },
      ],
    },
    
  },
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    password: password,
    profile: {
      create: {
        bio: 'alice bio',
        imageUrl: 'alice/image.png',
      }
    },
    posts: {
      create: [
        {
          title: 'alices post one title',
          body: 'alices post one body',
          url: 'post one url'
        },
      ],
    },
    
  },
  {
    name: 'Nilu',
    email: 'nilu@prisma.io',
    password: 'nilu',
    profile: {
      create: {
        bio: 'nilu bio',
        imageUrl: 'nilu/image.png',
      }
    },
    posts: {
      create: [
        {
          title: 'Follow Prisma on Twitter',
          body: 'https://www.twitter.com/prisma',
          url: 'twitter url'
        },
      ],
    },
  },
  {
    name: 'Mahmoud',
    email: 'mahmoud@prisma.io',
    password: 'mahmoud',
    profile: {
      create: {
        bio: 'mahmoud bio',
        imageUrl: 'mahmoud/image.png',
      }
    },
    posts: {
      create: [
        {
          title: 'Ask a question about Prisma on GitHub',
          body: 'https://www.github.com/prisma/prisma/discussions',
          url: 'github url'
        },

        {
          title: 'Prisma on YouTube',
          body: 'https://pris.ly/youtube',
          url: 'youtube url'
        },
      ],
    },
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    // process.exit(1)
  })