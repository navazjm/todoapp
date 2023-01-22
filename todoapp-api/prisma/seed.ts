import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    const task1 = await prisma.task.create({
        data: {
            content: "Wash the car"
        }
    });
    const task2 = await prisma.task.create({
        data: {
            content: "Unload the dishwasher"
        }
    });
    const task3 = await prisma.task.create({
        data: {
            content: "Take out the trash"
        }
    });

    console.log({ task1, task2, task3 });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
