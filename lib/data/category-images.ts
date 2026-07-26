/**
 * Product imagery, keyed by PRODUCT TYPE first and category second.
 *
 * Replaces the original `picsum.photos` placeholders, which served a random
 * unrelated photo per SKU. Every URL here was pulled from Unsplash with
 * type-specific search terms, filtered on its alt-text so the subject actually
 * matches, and checked to return a real image.
 *
 * Photos showing meat, seafood, egg or dairy are excluded throughout — those
 * products are not in the catalogue (see the import screen in README) and the
 * imagery should not imply otherwise.
 *
 * ⚠️  These are type-representative, NOT per-SKU pack shots: a soy sauce SKU
 * gets a photo of soy sauce, not its own label. Swap in supplier photography
 * before going live.
 */

/** Narrow pools matched on the product name, e.g. "sesame-oil", "tapioca". */
export const SUBTYPE_IMAGES: Record<string, string[]> = {
  "sesame-oil": [
    // oil dispenser bottle
    "https://images.unsplash.com/photo-1552592074-ea7a91b851b3",
    // a row of bottles of oil sitting on a shelf
    "https://images.unsplash.com/photo-1654245495489-6616a6ca252e",
    // a bottle of oil
    "https://images.unsplash.com/photo-1666694890460-37ec16b0df47",
    // a bottle of oil sitting next to two gold bars
    "https://images.unsplash.com/photo-1640884058588-17b316023084",
  ],
  "chilli-oil": [
    // a pile of spices next to a red chili pepper
    "https://images.unsplash.com/photo-1678019964614-a6515d5efd44",
    // a couple of red peppers sitting on top of a cutting board
    "https://images.unsplash.com/photo-1601876818790-33a0783ec542",
    // a glass jar filled with red sauce next to a bowl of chili pepper
    "https://images.unsplash.com/photo-1692302756206-3dd7506cb8f0",
    // a jar of chili seasoning sitting on a table
    "https://images.unsplash.com/photo-1698557048177-a460bb415177",
    // a wooden spoon filled with granola next to a red pepper
    "https://images.unsplash.com/photo-1643316002385-d6aca11ce753",
    // coconut sweet chilli
    "https://images.unsplash.com/photo-1565310022174-df1ff17791e1",
    // a person pouring sauce into a black bowl
    "https://images.unsplash.com/photo-1676124880241-90901711316a",
    // red chili on red ceramic bowl
    "https://images.unsplash.com/photo-1615810227931-4d9f62fd02aa",
  ],
  "soy-sauce": [
    // a bottle of sauce sitting on top of a table
    "https://images.unsplash.com/photo-1697026993856-261121bb5025",
    // Two ceramic soy sauce dispensers on a wooden surface.
    "https://images.unsplash.com/photo-1766752632455-8465aab4f4be",
    // A bowl of sauce with a spoon in it
    "https://images.unsplash.com/photo-1737199391604-f0098d42ba7a",
    // A chopping board with chopsticks and a small bowl of sauce
    "https://images.unsplash.com/photo-1724705341602-92b4be2626f4",
    // Gourmet dish with dark sauce, sesame seeds, and microgreens.
    "https://images.unsplash.com/photo-1783682333545-955e28852c2e",
    // black liquid-filled cup on saucer
    "https://images.unsplash.com/photo-1565275369836-d86de057255a",
  ],
  "vinegar": [
    // clear glass bottle on brown wooden table
    "https://images.unsplash.com/photo-1610612528257-b05c8d680b02",
    // white and yellow labeled bottle
    "https://images.unsplash.com/photo-1598191392914-c6b3616f6369",
    // yellow lemon fruit beside clear glass bottle
    "https://images.unsplash.com/photo-1583907659441-addbe699e921",
    // Table setting with oil and vinegar dispensers.
    "https://images.unsplash.com/photo-1784406149878-31b2070a662b",
  ],
  "plum-sauce": [
    // A single plum rests in a decorative bowl.
    "https://images.unsplash.com/photo-1766570075572-3cc719c1204b",
    // A bowl of sauce with a spoon in it
    "https://images.unsplash.com/photo-1737199391604-f0098d42ba7a",
    // red plum fruits on round brown wooden plate
    "https://images.unsplash.com/photo-1485814439394-ca57872604ec",
    // Plums and apple in a crystal bowl with flowers.
    "https://images.unsplash.com/photo-1767050241769-e74b812e537a",
    // sauce on bowl
    "https://images.unsplash.com/photo-1541690325738-d4ba017004b6",
    // a white plate topped with sauce and a spoon
    "https://images.unsplash.com/photo-1682482003050-49c10c481a44",
    // a spoon is pouring sauce on a white plate
    "https://images.unsplash.com/photo-1682482003091-d7d6427041fa",
  ],
  "hoisin": [
    // black liquid-filled cup on saucer
    "https://images.unsplash.com/photo-1565275369836-d86de057255a",
    // Bowl of red sauce next to patterned plate on tray
    "https://images.unsplash.com/photo-1757693393341-43d6509f03ec",
  ],
  "bean-paste": [
    // clear glass jar on gray surface
    "https://images.unsplash.com/photo-1519623286359-e9f3cbef015b",
    // a spoon full of food sitting on top of a jar
    "https://images.unsplash.com/photo-1675950786654-14cf38121796",
    // brown powder in clear glass jar
    "https://images.unsplash.com/photo-1605448303981-f2425c544299",
    // Large jar with purple lid containing fermented food.
    "https://images.unsplash.com/photo-1757756166847-6351f684453d",
    // A table topped with lots of jars filled with food
    "https://images.unsplash.com/photo-1723910065933-1b997fbd19b0",
    // A jar of peanut butter sitting on top of a wooden fence
    "https://images.unsplash.com/photo-1719956797343-41110e42ade6",
    // green plant in clear glass jar
    "https://images.unsplash.com/photo-1621427017774-f0e7ebbda11f",
    // A table topped with lots of jars filled with food
    "https://images.unsplash.com/photo-1723910065919-d3b858c6392c",
  ],
  "hotpot-soup": [
    // a bowl of soup is being served with chopsticks
    "https://images.unsplash.com/photo-1677030137853-03a83b0bd630",
    // brown wooden bowl with soup
    "https://images.unsplash.com/photo-1584509171119-9054d2d7d9a7",
    // Spicy hot pot broth with various ingredients on a table.
    "https://images.unsplash.com/photo-1784429611794-aecb6ebaef48",
    // cooked soup dish in gray stainless steel bowl
    "https://images.unsplash.com/photo-1551084883-e7b09585df25",
    // A brass hot pot with ingredients on a table
    "https://images.unsplash.com/photo-1777557888437-a017aaef828a",
    // a bowl of soup with chopsticks on a table
    "https://images.unsplash.com/photo-1709433420624-832e2264c346",
    // Steaming hot pot dish served at a restaurant table.
    "https://images.unsplash.com/photo-1758762972966-c7d0eecd09d2",
    // soup in white ceramic bowl
    "https://images.unsplash.com/photo-1620418025834-f4379baf1de9",
  ],
  "garlic-ginger": [
    // Garlic cloves and bulbs on a wooden cutting board.
    "https://images.unsplash.com/photo-1760445529964-4f084f5d1b38",
    // a ginger root and a piece of ginger on a white surface
    "https://images.unsplash.com/photo-1630623093145-f606591c2546",
    // brown garlic on black plastic container
    "https://images.unsplash.com/photo-1603431777782-912e3b76f60d",
    // a close up of a bunch of ginger roots
    "https://images.unsplash.com/photo-1635843104103-ddd88e1c5141",
    // a close up of a bunch of ginger roots
    "https://images.unsplash.com/photo-1635008388183-04ea0313c5d1",
    // a glass of orange juice next to sliced lemons and ginger
    "https://images.unsplash.com/photo-1682530016814-6a1c1311cd6e",
    // Fresh ginger root is shown up close.
    "https://images.unsplash.com/photo-1741517802684-ba07c444a5d2",
    // white garlic on brown wooden table
    "https://images.unsplash.com/photo-1589707790848-9097c28e8569",
  ],
  "peanut-sauce": [
    // high angle photography of mug filled with peanut butter
    "https://images.unsplash.com/photo-1548438208-fad1dda98477",
    // a white plate topped with sliced apples and a bowl of peanut but
    "https://images.unsplash.com/photo-1642339800118-eb551cfa1434",
  ],
  "rice-cracker": [
    // A plate of crackers on a white background
    "https://images.unsplash.com/photo-1737092684423-03ee785a6ff6",
    // a plate of crackers sitting on top of a table
    "https://images.unsplash.com/photo-1612740005009-98eaff469844",
    // A pile of savory herb crackers
    "https://images.unsplash.com/photo-1764025262245-8fc7d2d72c15",
    // a wooden table topped with bowls of crackers
    "https://images.unsplash.com/photo-1701341404788-b85484ca379e",
  ],
  "curry-paste": [
    // a glass jar filled with red sauce next to a bowl of chili pepper
    "https://images.unsplash.com/photo-1692302756206-3dd7506cb8f0",
    // A small plastic container of red chunky sauce on white.
    "https://images.unsplash.com/photo-1779939855596-8506096e2ebe",
    // red chili and white garlic
    "https://images.unsplash.com/photo-1612192666439-e94eaf8083bd",
    // red chili on white ceramic bowl
    "https://images.unsplash.com/photo-1623905011826-5bf831708fde",
    // red chili on brown wooden chopping board
    "https://images.unsplash.com/photo-1612192666621-a46f074abb4d",
    // red chili on white ceramic plate
    "https://images.unsplash.com/photo-1623905011820-b49ebb93b5c8",
    // red chili on white ceramic bowl
    "https://images.unsplash.com/photo-1612192666292-eb84a6b74e79",
    // red chili pepper and green chili on white ceramic bowl
    "https://images.unsplash.com/photo-1612192666309-f2da37265a8a",
  ],
  "vermicelli": [
    // A white plate topped with noodles and vegetables
    "https://images.unsplash.com/photo-1719784521218-20f9b07f43e8",
    // A close up of a plate of noodles
    "https://images.unsplash.com/photo-1722032393693-691b59565eaf",
    // noodle dish in white bowl
    "https://images.unsplash.com/photo-1565976469618-061774653bee",
    // a bowl filled with noodles and vegetables next to a pot of soup
    "https://images.unsplash.com/photo-1705915892511-489717576b1f",
  ],
  "udon": [
    // a bowl of noodle soup with chopsticks on the side
    "https://images.unsplash.com/photo-1631709497146-a239ef373cf1",
    // noodle soup on black bowl
    "https://images.unsplash.com/photo-1558985212-324add95595a",
    // a person holding chopsticks over a bowl of noodles
    "https://images.unsplash.com/photo-1679279726940-be5ce80c632c",
    // a bowl of soup with noodles and vegetables
    "https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3",
    // a close up of a bunch of noodles
    "https://images.unsplash.com/photo-1633352615955-f0c99e8b7e5a",
    // a bowl of noodles
    "https://images.unsplash.com/photo-1664079555522-e3c96c0242f0",
    // a close up of a plate of food with noodles
    "https://images.unsplash.com/photo-1700323467210-9f9019cdbfd4",
    // a close up of a plate of noodles
    "https://images.unsplash.com/photo-1700323861852-069271b695b3",
  ],
  "instant-noodle": [
    // noodles with sliced lemon on black ceramic bowl
    "https://images.unsplash.com/photo-1612927601601-6638404737ce",
    // a bowl of noodles
    "https://images.unsplash.com/photo-1664337873053-840ea51d271d",
    // a white bowl filled with noodles on top of a table
    "https://images.unsplash.com/photo-1681136851377-420455dd3f98",
    // white and red noodle cup
    "https://images.unsplash.com/photo-1591874879354-bf0a6e982c60",
    // a bowl of ramen noodles on a table
    "https://images.unsplash.com/photo-1637056930239-3b56a2034cb8",
    // Assorted instant noodle packets in plastic containers.
    "https://images.unsplash.com/photo-1762898842219-ca8136061b76",
    // Shelves stocked with various instant noodle cups and snacks.
    "https://images.unsplash.com/photo-1766871139455-e71da53674fb",
    // Assortment of instant noodle cups on a store shelf.
    "https://images.unsplash.com/photo-1766871138961-908ba932bd47",
  ],
  "sunflower-seeds": [
    // a close up of a pile of sunflower seeds
    "https://images.unsplash.com/photo-1635843111961-06c71c3ed8cf",
    // Sunflower seeds in a bowl and on a spoon.
    "https://images.unsplash.com/photo-1740993384743-dc8f2879f398",
    // Sunflower seeds in a wooden bowl and spoon.
    "https://images.unsplash.com/photo-1740993383025-4e3aa7e9d7fe",
    // a large pile of sunflower seeds is shown
    "https://images.unsplash.com/photo-1706961089562-217ab7d06dfd",
    // a pile of sunflower seeds sitting on top of a table
    "https://images.unsplash.com/photo-1715865989413-d69314ac1902",
    // Sunflower seeds in a wooden bowl and spoon.
    "https://images.unsplash.com/photo-1740993384303-2481620a0277",
    // Sunflower seeds are in a bowl and on a spoon.
    "https://images.unsplash.com/photo-1740993384336-5c842bb76129",
    // A pile of sunflower seeds on a yellow background
    "https://images.unsplash.com/photo-1731970820339-e725b78f55e4",
  ],
  "peanuts": [
    // a close up of a pile of nuts
    "https://images.unsplash.com/photo-1635843122601-f09e510f17f7",
    // Peanuts spilling out of a glass bowl.
    "https://images.unsplash.com/photo-1742524252643-d1f3fddd8cca",
    // a bucket full of peanuts sitting on a table
    "https://images.unsplash.com/photo-1697468921924-1d113bf7ba06",
    // a bowl filled with nuts next to a spoon
    "https://images.unsplash.com/photo-1716500100106-466b3d6064df",
    // a bowl of nuts with a spoon in it
    "https://images.unsplash.com/photo-1636785348848-2ee5782485db",
    // a close up of nuts in a bowl
    "https://images.unsplash.com/photo-1717002997856-8f68e644fbd2",
    // a bowl filled with nuts covered in powdered sugar
    "https://images.unsplash.com/photo-1717003007151-bcfa0d0e1709",
    // a close up of a bowl of nuts
    "https://images.unsplash.com/photo-1648473546648-4d493a5779f6",
  ],
  "popcorn": [
    // a wooden bowl filled with popcorn on a yellow background
    "https://images.unsplash.com/photo-1642520075943-b5ca77921357",
    // cooked popcorn
    "https://images.unsplash.com/photo-1578849278619-e73505e9610f",
    // a yellow and white striped cup filled with popcorn
    "https://images.unsplash.com/photo-1691480213129-106b2c7d1ee8",
    // photo of popcorn kernels
    "https://images.unsplash.com/photo-1512149177596-f817c7ef5d4c",
    // a bowl filled with popcorn sitting on top of a table
    "https://images.unsplash.com/photo-1707063017149-a3cd268776c4",
    // popcorns on clear glass bowl
    "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330",
    // a bunch of popcorn sitting on top of a red table
    "https://images.unsplash.com/photo-1675419941589-b78380f724f8",
    // a close up of a bowl of popcorn
    "https://images.unsplash.com/photo-1682970468815-0db201b7804d",
  ],
  "tofu": [
    // A pile of tofu cubes sitting on top of a cutting board
    "https://images.unsplash.com/photo-1722635940350-d1b2e5129379",
    // Steaming tofu topped with green onions in a bowl.
    "https://images.unsplash.com/photo-1758293121435-396ed31ebcf4",
    // A block of tofu topped with sliced green onions.
    "https://images.unsplash.com/photo-1765295138774-5e1ae99b2103",
    // Assortment of fresh vegetables and tofu for hot pot.
    "https://images.unsplash.com/photo-1768203627399-53932b2baed2",
    // Fresh vegetables and tofu arranged in a wooden tray.
    "https://images.unsplash.com/photo-1768203631965-d0b2c030bae9",
  ],
  "bamboo": [
    // green bamboo stick on brown wooden surface
    "https://images.unsplash.com/photo-1599403516947-eef21d54ec99",
    // A plate of stir-fried mushrooms and bamboo shoots.
    "https://images.unsplash.com/photo-1756139700718-b6c3c0d2b616",
    // green bamboo shoots
    "https://images.unsplash.com/photo-1438755582627-221038b62986",
    // green bamboo on buckets
    "https://images.unsplash.com/photo-1495399928872-a0e98ecad434",
    // a close up of a green bamboo plant
    "https://images.unsplash.com/photo-1697800538824-76837aeac703",
    // a group of green bamboo sticks with a white stripe
    "https://images.unsplash.com/photo-1653748112903-f2a5c5077d65",
    // brown bamboo sticks on brown wooden table
    "https://images.unsplash.com/photo-1585155113372-6c1808141bf3",
    // Close-up of a textured bamboo trunk with mossy roots.
    "https://images.unsplash.com/photo-1765112777225-1168d6c0e551",
  ],
  "corn": [
    // yellow corn in close up photography
    "https://images.unsplash.com/photo-1578652903016-b78571b87410",
    // a close up of corn on the cob
    "https://images.unsplash.com/photo-1641914086759-6f76fae98cd9",
    // corn on brown wooden table
    "https://images.unsplash.com/photo-1629570585008-27e194a5d0f8",
    // a bunch of corn in a basket
    "https://images.unsplash.com/photo-1651667343378-4c5131206c5a",
    // Three ears of fresh corn on a wooden surface
    "https://images.unsplash.com/photo-1760361571822-1984e9a5887d",
    // person holding corn during daytime
    "https://images.unsplash.com/photo-1629570584174-68e31742f48c",
    // two ears of corn sitting on top of a metal plate
    "https://images.unsplash.com/photo-1633345817529-cca176575d34",
    // a close up of a corn on the cob
    "https://images.unsplash.com/photo-1649251037566-6881b4956615",
  ],
  "porridge": [
    // a white bowl filled with rice on top of a wooden table
    "https://images.unsplash.com/photo-1680137248876-6ad53db8caef",
    // white ceramic bowl with white rice
    "https://images.unsplash.com/photo-1600676626897-eb2fb18a21e0",
    // a bowl of rice and other food on a table
    "https://images.unsplash.com/photo-1653038803524-9804e372d04e",
  ],
  "rock-sugar": [
    // a pile of sugar cubes sitting on top of each other
    "https://images.unsplash.com/photo-1709651808265-977ed7ef78c6",
    // a wooden bowl filled with sugar on top of a wooden table
    "https://images.unsplash.com/photo-1634612831148-03a8550e1d52",
    // sugar cubes and a spoon on a red surface
    "https://images.unsplash.com/photo-1685967836908-7d3b4921a670",
    // a pile of white sugar cubes sitting on top of a table
    "https://images.unsplash.com/photo-1641679103706-fc8542e2a97a",
    // white sugar cube on white ceramic plate
    "https://images.unsplash.com/photo-1593692554229-26fa20f87fcb",
    // white sugar on gray bowl
    "https://images.unsplash.com/photo-1602634893456-d54178fa543a",
    // a bowl of sugar cubes sitting on a table
    "https://images.unsplash.com/photo-1714178998112-90893515cfa4",
    // white sugar cubes in black bowl
    "https://images.unsplash.com/photo-1602634896158-b9b4e3381304",
  ],
  "canned-fruit": [
    // A glass of fresh lychee fruit with some peeled.
    "https://images.unsplash.com/photo-1783749924332-f8e0b74c04ec",
    // Several lychees, one peeled, on a white background.
    "https://images.unsplash.com/photo-1783749924201-6253a9d202da",
    // Fresh lychees, one peeled, on a white background.
    "https://images.unsplash.com/photo-1783749924208-9eeebd1972f9",
    // Red lychee fruits in a clear glass, one peeled.
    "https://images.unsplash.com/photo-1783749924314-9d6f2871ae1a",
    // Bunch of fresh longan fruits spilling from a wooden bowl
    "https://images.unsplash.com/photo-1755971103481-3fd82333a80a",
    // Bunch of ripe longan fruits on a light background
    "https://images.unsplash.com/photo-1755971103490-a70bf35f8a4f",
    // A pile of ripe longan fruits spilling from a pot.
    "https://images.unsplash.com/photo-1755971103909-c2710ea5aad8",
    // Bunch of ripe longan fruits in a wooden bowl.
    "https://images.unsplash.com/photo-1755971103542-c95429c8c0f2",
  ],
  "mushroom": [
    // brown and white mushrooms on brown wooden surface
    "https://images.unsplash.com/photo-1620582708067-9f6ba1e2fc1c",
    // brown and white mushrooms on brown woven basket
    "https://images.unsplash.com/photo-1629665001701-a232a0ba4eec",
    // A cutting board with a bunch of mushrooms on it
    "https://images.unsplash.com/photo-1726998814976-f24cf7919217",
    // A pile of fresh shiitake mushrooms
    "https://images.unsplash.com/photo-1755108906864-fdaadb8ab5f1",
    // a bunch of mushrooms sitting on top of a pan
    "https://images.unsplash.com/photo-1676140382464-83cd80afc22b",
    // a box filled with lots of mushrooms on top of a table
    "https://images.unsplash.com/photo-1703015640430-b262cd3d10a4",
    // a bag full of mushrooms sitting on top of a table
    "https://images.unsplash.com/photo-1649825080587-cb51ca993e05",
    // a close up of a pile of mushrooms
    "https://images.unsplash.com/photo-1675326985436-7ec878e574cb",
  ],
  "mixed-veg": [
    // a hand holding a plate of vegetables
    "https://images.unsplash.com/photo-1659822887922-c1386185cc6b",
    // person holding vegetable salad in clear glass bowl
    "https://images.unsplash.com/photo-1606757819934-d61a9f7279d5",
    // orange tomatoes and green vegetable in stainless steel bowl
    "https://images.unsplash.com/photo-1626788460425-80be45dd088d",
    // green and orange vegetable dish
    "https://images.unsplash.com/photo-1587996552544-3e908482da64",
    // cooked rice with sliced carrots and green vegetable in clear gla
    "https://images.unsplash.com/photo-1587996428538-71d66749a5cb",
    // sliced vegetables in white ceramic bowl
    "https://images.unsplash.com/photo-1607264021653-0a884a9740cd",
    // sliced vegetables on white ceramic bowl
    "https://images.unsplash.com/photo-1585285072892-a52481577926",
    // green and orange vegetable salad in white ceramic bowl
    "https://images.unsplash.com/photo-1592578630143-fac65cda7a67",
  ],
  "snack-cake": [
    // white and red strawberry cake
    "https://images.unsplash.com/photo-1602663491496-73f07481dbea",
    // strawberry cake on white surface
    "https://images.unsplash.com/photo-1611293388250-580b08c4a145",
    // white and red strawberry cake
    "https://images.unsplash.com/photo-1627308595171-d1b5d67129c4",
    // a piece of cake with white frosting and strawberries on top
    "https://images.unsplash.com/photo-1641848421644-a1603f016f51",
    // three square pastry with strawberries on top platter
    "https://images.unsplash.com/photo-1530648672449-81f6c723e2f1",
    // a pink cake with white frosting and strawberries on top
    "https://images.unsplash.com/photo-1677840147140-252adb9ca347",
    // brown and white cake with strawberry on top
    "https://images.unsplash.com/photo-1587306433591-aa6a074982f1",
    // baked cake with sliced strawberries on top
    "https://images.unsplash.com/photo-1519197462-7755f76e6fbd",
  ],
  "spoon": [
    // white spoon
    "https://images.unsplash.com/photo-1579028017684-1c828c18b5f6",
    // black spoon and fork on white surface
    "https://images.unsplash.com/photo-1611091025025-f77ada738688",
    // pink plastic spoon on pink and white polka dot textile
    "https://images.unsplash.com/photo-1591872203534-278fc084969e",
    // gray and white spoon and fork lot closeup photo
    "https://images.unsplash.com/photo-1535449975615-18b00a0019ce",
    // assorted-color plastic spoons and forks packs
    "https://images.unsplash.com/photo-1549194455-7b5676683b9f",
    // white ceramic bowls and spoons
    "https://images.unsplash.com/photo-1570292311918-eb353472c06b",
    // Three wooden spoons and a spoon rest on a white surface
    "https://images.unsplash.com/photo-1723879682981-7b574da346ae",
    // white plastic spoon on blue textile
    "https://images.unsplash.com/photo-1590483086217-d372d5dbb6ae",
  ],
  "tapioca": [
    // Hand holding a refreshing bubble tea.
    "https://images.unsplash.com/photo-1745883949374-baeba0ed57c3",
    // Four colorful boba teas with straws.
    "https://images.unsplash.com/photo-1747016804753-866c3ed6b3b7",
    // Hand holding a green matcha drink with boba outdoors.
    "https://images.unsplash.com/photo-1780542888193-81e577fac283",
    // Hand holding a cup of bubble tea with tapioca pearls.
    "https://images.unsplash.com/photo-1774979300682-f92e5988d55b",
  ],
  "preserved-fruit": [
    // Vendors sell dried fruits and nuts at a market.
    "https://images.unsplash.com/photo-1770124129809-fe1fe6b7c23e",
    // orange fruits on stainless steel tray
    "https://images.unsplash.com/photo-1615478441828-1b28a6115394",
    // a pile of dried tobacco sitting on top of a white table
    "https://images.unsplash.com/photo-1715663844617-d2fcd2f12902",
    // Frozen plums covered in ice crystals
    "https://images.unsplash.com/photo-1756312887076-615f04c55e77",
    // A basket filled with lots of plums next to a yellow sign
    "https://images.unsplash.com/photo-1720240464116-d4eec4fceac5",
    // a bowl of dates sitting on top of a checkered cloth
    "https://images.unsplash.com/photo-1711360688154-f4f12bfa9807",
    // a close up of a mixture of fruit and nuts
    "https://images.unsplash.com/photo-1641291361624-38b69b86b1cf",
    // a display of dried fruits and nuts for sale
    "https://images.unsplash.com/photo-1710857397974-f0617001c39e",
  ],
  "gummy": [
    // a lot of gummy bears that are all different colors
    "https://images.unsplash.com/photo-1635342219731-4ae2bf39e1e9",
    // a pile of gummy bears sitting on top of a table
    "https://images.unsplash.com/photo-1682941232184-9879161901e0",
    // A colorful assortment of various candies and sweets.
    "https://images.unsplash.com/photo-1770021999036-53291a3a6596",
    // a bunch of gummy bears sitting on top of each other
    "https://images.unsplash.com/photo-1682941232611-ee199377a12a",
    // three assorted-colored gummy bears
    "https://images.unsplash.com/photo-1476401113995-b136bdfce591",
    // Three gummy bears sitting next to each other on a yellow backgro
    "https://images.unsplash.com/photo-1720924256541-0cdbc6726e1e",
    // a group of gummy bears sitting on top of a table
    "https://images.unsplash.com/photo-1682941379468-c42a219c0376",
    // clear glass candy dish on white table
    "https://images.unsplash.com/photo-1629960914424-e4d437d58874",
  ],
  "biscuit": [
    // brown cookies on white ceramic plate
    "https://images.unsplash.com/photo-1625876981820-be17a6807189",
    // A stack of cookies sitting on top of a wooden table
    "https://images.unsplash.com/photo-1726733995322-13779de0111f",
    // brown cookies on brown wooden table
    "https://images.unsplash.com/photo-1605243614624-277f48f46d52",
    // stack of brown cookies on black ceramic plate
    "https://images.unsplash.com/photo-1520736362510-dda15d2c3086",
    // A stack of cookies sitting on top of a table
    "https://images.unsplash.com/photo-1738101840141-59f84501bdd8",
    // a stack of cookies that are stacked on top of each other
    "https://images.unsplash.com/photo-1633111855870-ce0a28539ae1",
    // A stack of cookies sitting on top of a wooden plate
    "https://images.unsplash.com/photo-1726733969863-c5544cde7186",
    // A stack of cookies sitting on top of a wooden table
    "https://images.unsplash.com/photo-1737063989846-1b6931922da5",
  ],
  "soy-powder": [
    // white powder in bowl
    "https://images.unsplash.com/photo-1555465083-a845797ef750",
    // white beans on gray scraper
    "https://images.unsplash.com/photo-1515347272087-685ce5a1fc8b",
  ],
};

/** Fallback pools, one per catalogue category. */
export const CATEGORY_IMAGES: Record<string, string[]> = {
  "chips": [
    // Crispy snacks piled in a black bowl with cups.
    "https://images.unsplash.com/photo-1761321626747-a2da185beab3",
    // Savory shredded meat dish with crispy crackers
    "https://images.unsplash.com/photo-1761166638721-5783a5b1f815",
    // Premium soup & oyster crackers with pack
    "https://images.unsplash.com/photo-1556910320-2552847059df",
    // a bowl of crackers with a fork in it
    "https://images.unsplash.com/photo-1697155836253-9e957b4d01b1",
    // a bag of crackers next to garlic on a pink background
    "https://images.unsplash.com/photo-1677735299527-af32313d74c7",
    // A pile of savory herb crackers
    "https://images.unsplash.com/photo-1764025262245-8fc7d2d72c15",
    // a pile of crackers sitting on top of a white table
    "https://images.unsplash.com/photo-1637017246450-47f40b9a089b",
    // A plate of crackers on a white background
    "https://images.unsplash.com/photo-1737092684423-03ee785a6ff6",
  ],
  "instant-noodles": [
    // noodles with sliced lemon on black ceramic bowl
    "https://images.unsplash.com/photo-1612927601601-6638404737ce",
    // white ceramic bowl with noodles
    "https://images.unsplash.com/photo-1628610688436-e635552020fc",
    // a bowl of noodles
    "https://images.unsplash.com/photo-1664337873053-840ea51d271d",
    // a white bowl filled with noodles on top of a table
    "https://images.unsplash.com/photo-1681136851377-420455dd3f98",
    // white and red noodle cup
    "https://images.unsplash.com/photo-1591874879354-bf0a6e982c60",
    // a bowl of ramen with an egg on top
    "https://images.unsplash.com/photo-1644082653870-3eaacc76c5c2",
    // a bowl of ramen noodles on a table
    "https://images.unsplash.com/photo-1637056930239-3b56a2034cb8",
    // Assorted instant noodle packets in plastic containers.
    "https://images.unsplash.com/photo-1762898842219-ca8136061b76",
  ],
  "candy": [
    // assorted candies
    "https://images.unsplash.com/photo-1515007917921-cad9bf0e2e87",
    // a close up of a pile of colorful candies
    "https://images.unsplash.com/photo-1633158832466-be592c721217",
    // pink green and white candies
    "https://images.unsplash.com/photo-1588756264692-d396bca41fb1",
    // a pile of colorful candies sitting on top of a table
    "https://images.unsplash.com/photo-1588755821761-a4d1eafe2b19",
    // pink and white heart shaped candies
    "https://images.unsplash.com/photo-1588756164640-a9f10546e1b3",
    // a pile of colorful candies
    "https://images.unsplash.com/photo-1664850315047-061924d6cd0d",
    // a pile of colorful candy sitting on top of a white table
    "https://images.unsplash.com/photo-1641420421863-4b7f0940f287",
    // A colorful assortment of various candies and sweets.
    "https://images.unsplash.com/photo-1770021999036-53291a3a6596",
  ],
  "chocolate": [
    // chocolate bars on white table
    "https://images.unsplash.com/photo-1610450949065-1f2841536c88",
    // chocolate bar on white table
    "https://images.unsplash.com/photo-1623660053975-cf75a8be0908",
    // brown and white chocolate bar
    "https://images.unsplash.com/photo-1627647227768-705244233b56",
    // chocolate bars
    "https://images.unsplash.com/photo-1575377427642-087cf684f29d",
    // brown chocolate bar on black table
    "https://images.unsplash.com/photo-1626697556651-67ebdcb8cbd6",
    // A pile of chocolate with nuts on top of it
    "https://images.unsplash.com/photo-1720029106261-0d0396bb270d",
    // chocolate bar on white plate
    "https://images.unsplash.com/photo-1587271644048-2fbb187de8d8",
    // four pieces of chocolate sitting on top of each other
    "https://images.unsplash.com/photo-1646303339019-a57056b180ae",
  ],
  "mochi": [
    // Hand holding dango with two drinks on a table.
    "https://images.unsplash.com/photo-1783311403226-daaf67f4869b",
    // A pink mochi and a bowl of food
    "https://images.unsplash.com/photo-1769123279121-eb3479ba3531",
    // Sweet dumplings on wooden skewers, arranged in rows.
    "https://images.unsplash.com/photo-1761095596630-0fb9536d4a08",
    // Green dessert with white mochi balls and nuts
    "https://images.unsplash.com/photo-1763469024755-a19c6a13ef11",
    // Four skewers of white mochi grilling on a small barbecue.
    "https://images.unsplash.com/photo-1775492477980-abad58a1b52b",
    // Japanese street food stall with dango and mochi
    "https://images.unsplash.com/photo-1759928255044-0996087c10ca",
  ],
  "jelly": [
    // a table topped with desserts and fruit on top of it
    "https://images.unsplash.com/photo-1697615205933-3827e5f00676",
    // a white plate topped with three small desserts
    "https://images.unsplash.com/photo-1697345964530-032f1713dedb",
    // a couple of desserts with fruit on top
    "https://images.unsplash.com/photo-1670225078962-0c3490641003",
    // Three colorful gummy candies arranged vertically
    "https://images.unsplash.com/photo-1766185387587-531a5f992940",
    // Blackberries floating in orange jelly
    "https://images.unsplash.com/photo-1761038681993-e77fd9c773bd",
  ],
  "bubble-tea": [
    // Four colorful boba teas with straws.
    "https://images.unsplash.com/photo-1747016804753-866c3ed6b3b7",
    // Three tiger sugar drinks lined up.
    "https://images.unsplash.com/photo-1741243038487-1d835e67bcbf",
    // a person holding up a cup of bubble tea
    "https://images.unsplash.com/photo-1653403743596-a5dac6a5e82b",
    // Hand holds a purple "fairy tea" drink with pearls.
    "https://images.unsplash.com/photo-1756969953423-2c199c6dbd79",
    // A creamy beverage with caramel swirls and tapioca pearls.
    "https://images.unsplash.com/photo-1756132539966-8d65f7a9eed8",
    // Hand holds a refreshing bubble tea.
    "https://images.unsplash.com/photo-1751199956820-ecb919004024",
    // Hand holding a green matcha drink with boba outdoors.
    "https://images.unsplash.com/photo-1780542888193-81e577fac283",
    // Two bubble tea drinks with straws on a stroller.
    "https://images.unsplash.com/photo-1762459365184-04ba41e26027",
  ],
  "drinks": [
    // a can of soda on a white background
    "https://images.unsplash.com/photo-1696739696220-8d2e27465662",
    // a large group of cans of soda
    "https://images.unsplash.com/photo-1674176508097-463b009c6004",
    // blue and orange labeled bottles
    "https://images.unsplash.com/photo-1588238142232-7108fb7dcbb6",
    // a shelf with cans of soda on it
    "https://images.unsplash.com/photo-1665359045452-bfa257a2a6bf",
    // clear plastic bottle
    "https://images.unsplash.com/photo-1560653265-bbf94ac68a2a",
    // a person holding a bottle of sake in a store
    "https://images.unsplash.com/photo-1708861617671-0d201a7b0ca8",
    // grayscale photo of glass bottles
    "https://images.unsplash.com/photo-1520185925492-cfafae0693a5",
    // Three dark drinks and bottled water on counter
    "https://images.unsplash.com/photo-1764032757567-231d0e210201",
  ],
  "cookies": [
    // a stack of cookies sitting on top of each other
    "https://images.unsplash.com/photo-1672753261221-608b9d15d597",
    // brown cookies on white table
    "https://images.unsplash.com/photo-1621353354739-1420ff28ead9",
    // brown cookies on white table
    "https://images.unsplash.com/photo-1588070141852-b6bed371e15f",
    // stack of brown cookies on black ceramic plate
    "https://images.unsplash.com/photo-1520736362510-dda15d2c3086",
    // pile of cookies
    "https://images.unsplash.com/photo-1574156754673-0b54b2934ded",
    // brown cookies on white plate
    "https://images.unsplash.com/photo-1582385760710-4300982782c1",
    // a stack of cookies that are stacked on top of each other
    "https://images.unsplash.com/photo-1633111855870-ce0a28539ae1",
    // A stack of cookies sitting on top of a wooden plate
    "https://images.unsplash.com/photo-1726733969863-c5544cde7186",
  ],
  "gift-boxes": [
    // Gourmet snack box with pastries, fruit, and chocolates
    "https://images.unsplash.com/photo-1773450269672-8075682144a6",
    // Gourmet food gift box with fruits, cookies, and cheese.
    "https://images.unsplash.com/photo-1773450935809-512f3b662fe1",
    // a wooden table topped with a gift box filled with candy
    "https://images.unsplash.com/photo-1647168672642-695e96782922",
    // a box filled with a variety of baked goods
    "https://images.unsplash.com/photo-1623313622825-3db2b60faa70",
    // A box of food sitting on top of a wooden table
    "https://images.unsplash.com/photo-1723040218402-1e8da1efa7f7",
    // a box filled with food sitting on top of a wooden table
    "https://images.unsplash.com/photo-1637087788835-4f051e32bfa1",
    // box of food
    "https://images.unsplash.com/photo-1571510028795-ed27f9b4fa4b",
    // A chinese new year's gift with a red box
    "https://images.unsplash.com/photo-1736482002168-153edd469de0",
  ],
  "sauces": [
    // a bottle of sauce sitting on top of a table
    "https://images.unsplash.com/photo-1697026993856-261121bb5025",
    // a close up of a jar of food on a table
    "https://images.unsplash.com/photo-1654245137394-1de7e1e16f6f",
    // Two ceramic soy sauce dispensers on a wooden surface.
    "https://images.unsplash.com/photo-1766752632455-8465aab4f4be",
    // Bottles of oil and jars of food stacked
    "https://images.unsplash.com/photo-1760368104122-2d7917d9f8ef",
    // Bottles and jars displayed on wooden shelves.
    "https://images.unsplash.com/photo-1775138175039-2bad86263ddf",
    // clear glass condiments container on black wooden board
    "https://images.unsplash.com/photo-1461869668403-2a6ec0cdd0c9",
    // black and white labeled bottle on brown textile
    "https://images.unsplash.com/photo-1591496534942-8ea0cb46182b",
    // three clear glass jars on brown wooden table
    "https://images.unsplash.com/photo-1598103466091-d1e35f5822c7",
  ],
  "pantry": [
    // a sack full of seeds sitting on top of a table
    "https://images.unsplash.com/photo-1645331465778-eb409d112198",
    // brown printed sack lot
    "https://images.unsplash.com/photo-1457414104202-9d4b4908f285",
    // Sacks of flour with arabic and french labels.
    "https://images.unsplash.com/photo-1760727466909-a73872aeecda",
    // three bags of rice sitting on top of a shelf
    "https://images.unsplash.com/photo-1633536706496-873ce0d46277",
    // a bunch of bags filled with different types of rice
    "https://images.unsplash.com/photo-1644377949116-c4a6b529241c",
    // a close up of three baskets filled with rice
    "https://images.unsplash.com/photo-1676619357571-b4f086f81299",
    // Sacks of grain in a dimly lit storage area.
    "https://images.unsplash.com/photo-1764070254247-351def349875",
    // A bag of mexican rice sitting on top of a table
    "https://images.unsplash.com/photo-1722390305694-bc6a61433bca",
  ],
};

/** Ordered most-specific-first; the first match wins. */
const SUBTYPE_MATCHERS: { key: string; match: RegExp }[] = [
  { key: "sesame-oil", match: /sesame oil|oil blended sesame/i },
  { key: "chilli-oil", match: /chilli oil|chili oil|crispy chilli|chilli in oil|beans in chilli|peanuts in chilli|peanut tofu in chilli/i },
  { key: "soy-sauce", match: /soy sauce|soy \(yellow\) bean|honey soy|sweet soy/i },
  { key: "vinegar", match: /vinegar/i },
  { key: "plum-sauce", match: /plum sauce|sweet & sour plum/i },
  { key: "hoisin", match: /hoisin|char siu|red braising/i },
  { key: "bean-paste", match: /bean paste|bean sauce|soya bean|black bean|chu hou|toban|fermented soybean|sweet paste/i },
  { key: "hotpot-soup", match: /hot pot|soup base|mushroom soup|mushroom seasoning|umami/i },
  { key: "garlic-ginger", match: /minced garlic|minced ginger|chilli ginger/i },
  { key: "peanut-sauce", match: /peanut sauce|satay/i },
  { key: "rice-cracker", match: /rice crust|rice cracker|senbei|rice pop|rice cake/i },
  { key: "curry-paste", match: /curry paste|kung pao|dan dan|szechuan|sichuan|chongging|spicy hot|ma po|stir[- ]?fry|marinade|o sauce|black pepper sauce|garlic sauce|sweet & sour|chineat|spicy$/i },
  { key: "vermicelli", match: /vermicell|vemicell|glass noodle/i },
  { key: "udon", match: /udon/i },
  { key: "instant-noodle", match: /noodle/i },
  { key: "sunflower-seeds", match: /sunflower seed/i },
  { key: "peanuts", match: /peanut/i },
  { key: "popcorn", match: /popcorn/i },
  { key: "tofu", match: /tofu|bean curd|beancurd|soybean roll|soybean curd/i },
  { key: "bamboo", match: /bamboo/i },
  { key: "corn", match: /corn/i },
  { key: "porridge", match: /porridge/i },
  { key: "rock-sugar", match: /rock sugar/i },
  { key: "canned-fruit", match: /longan|syrup/i },
  { key: "mushroom", match: /mushroom|shiitake/i },
  { key: "mixed-veg", match: /chop suey|lo han|vegetarian/i },
  { key: "snack-cake", match: /mount fuji|snowflake|small cake/i },
  { key: "spoon", match: /spoon/i },
  { key: "tapioca", match: /tapioca|sago/i },
  { key: "preserved-fruit", match: /preserved plum|hawthorn|jujube/i },
  { key: "gummy", match: /gummy|candy/i },
  { key: "biscuit", match: /biscuit/i },
  { key: "soy-powder", match: /soybean powder/i },
];

const FALLBACK = CATEGORY_IMAGES["pantry"]![0]!;

/** Build a sized, CDN-optimised URL from a bare Unsplash photo base. */
export function unsplashSrc(
  base: string,
  { w = 640, h = 640, crop = "entropy" }: { w?: number; h?: number; crop?: string } = {},
): string {
  return `${base}?auto=format&fit=crop&crop=${crop}&w=${w}&h=${h}&q=80`;
}

/** The subtype pool key for a product name, or null if none applies. */
export function subtypeFor(brandAndName: string): string | null {
  return SUBTYPE_MATCHERS.find((s) => s.match.test(brandAndName))?.key ?? null;
}

/**
 * Deterministically pick a photo. `index` walks the pool so neighbouring
 * products in a grid don't repeat the same shot.
 */
export function productImage(
  brandAndName: string,
  category: string,
  index = 0,
  opts?: { w?: number; h?: number; crop?: string },
): string {
  const key = subtypeFor(brandAndName);
  const pool = (key && SUBTYPE_IMAGES[key]) || CATEGORY_IMAGES[category] || [];
  const base = pool.length ? pool[index % pool.length]! : FALLBACK;
  return unsplashSrc(base, opts);
}

/** Photo for a category tile. */
export function categoryImage(category: string, index = 0, opts?: { w?: number; h?: number; crop?: string }): string {
  const pool = CATEGORY_IMAGES[category];
  const base = pool && pool.length ? pool[index % pool.length]! : FALLBACK;
  return unsplashSrc(base, opts);
}

/**
 * Four framings of the SAME photo, for the product-page gallery. Re-cropping one
 * asset keeps the gallery honest — it never implies we hold four different shots
 * of a SKU we only have one photo for.
 */
export function galleryFrames(image: string): string[] {
  const base = image.split("?")[0]!;
  return (["entropy", "edges", "top", "bottom"] as const).map((crop) =>
    unsplashSrc(base, { w: 900, h: 900, crop }),
  );
}
