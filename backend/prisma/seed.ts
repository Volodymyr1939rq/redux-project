import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const rootCategories = [
    "Ноутбуки та комп'ютери",
    "Смартфони, ТВ і електроніка",
    "Товари для геймерів",
    "Побутова техніка",
    "Товари для дому",
    "Авто і мото",
    "Інструменти та обладнання",
    "Сантехніка та ремонт",
    "Дача, сад і город",
    "Спорт і захоплення",
    "Одяг, взуття та прикраси",
    "Краса та здоров'я",
    "Дитячі товари",
    "Зоотовари",
    "Офіс, школа, книги",
    "Алкогольні напої та продукти",
    "Побутова хімія",
    "Енергонезалежність",
    "Подарунки та сувеніри",
    "Топи продажів",
    "Всі акції"
];

async function main() {
  
    await prisma.category.deleteMany();

    const rootIds: Record<string, string> = {};

    for (const title of rootCategories) {
        const createdCategory = await prisma.category.create({
            data: { title: title }
        });
       
        rootIds[title] = createdCategory.id;
    }

    const computersId = rootIds["Ноутбуки та комп'ютери"];

    const hardwareCategory = await prisma.category.create({
        data: {
            title: "Комп'ютерні комплектуючі",
            parentId: computersId,
            image: "https://placehold.co/120x120/f5f5f5/a0a0a0?text=Hardware",
        }
    });

    const networkCategory = await prisma.category.create({
        data: {
            title: "Мережеве обладнання",
            parentId: computersId,
            image: "https://placehold.co/120x120/f5f5f5/a0a0a0?text=Network",
        }
    });

    await prisma.category.createMany({
        data: [
            { title: "Ноутбуки", parentId: computersId, image: "https://placehold.co/120x120/f5f5f5/a0a0a0?text=Laptop" },
            { title: "Комп'ютери, неттопи, моноблоки", parentId: computersId, image: "https://placehold.co/120x120/f5f5f5/a0a0a0?text=PC" },
            { title: "Монітори", parentId: computersId, image: "https://placehold.co/120x120/f5f5f5/a0a0a0?text=Monitor" },
            { title: "Gaming", parentId: computersId, image: "https://placehold.co/120x120/f5f5f5/a0a0a0?text=Gaming" },
            { title: "Планшети", parentId: computersId, image: "https://placehold.co/120x120/f5f5f5/a0a0a0?text=Tablet" },
            { title: "Кабелі та перехідники", parentId: computersId, image: "https://placehold.co/120x120/f5f5f5/a0a0a0?text=Cables" },
        ]
    });
    await prisma.category.createMany({
        data: [
            { title: "SSD", parentId: hardwareCategory.id },
            { title: "Системи охолодження", parentId: hardwareCategory.id },
            { title: "Відеокарти", parentId: hardwareCategory.id },
            { title: "Оперативна пам'ять", parentId: hardwareCategory.id },
        ]
    });
    await prisma.category.createMany({
        data: [
            { title: "Маршрутизатори", parentId: networkCategory.id },
            { title: "Комутатори", parentId: networkCategory.id },
            { title: "Мережеві адаптери", parentId: networkCategory.id },
            { title: "Пасивне мережеве", parentId: networkCategory.id },
        ]
    });

}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });