const { PrismaClient } = require("@prisma/client");
const { organizationData } = require("../data/organizationData");
const { itemData } = require("../data/itemData");
const { pricingData } = require("../data/pricingData");

const prisma = new PrismaClient();

async function seed() {
    for (const org of organizationData) {
        await prisma.organization.create({
            data: org,
        });
    }

    for (const item of itemData) {
        await prisma.item.create({
            data: item,
        });
    }

    for (const price of pricingData) {
        await prisma.pricing.create({
            data: price,
        });
    }
}

seed()
    .then(() => console.log("All data added!"))
    .catch(error => {
        console.log(error);
        process.exit(1);
    })
    .finally(async () => await prisma.$disconnect());