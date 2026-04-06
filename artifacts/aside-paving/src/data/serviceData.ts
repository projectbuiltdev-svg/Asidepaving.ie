export type ServiceData = {
  title: string
  slug: string
  features: string[]
  descriptions: [string, string, string]
  benefits: string[]
  faqs: { question: string; answer: string }[]
  relatedServices: { name: string; slug: string }[]
}

export const serviceData: Record<string, ServiceData> = {
  "driveways": {
    title: "Driveways", slug: "driveways",
    features: ["Block Paving","Cobblelock","Tarmac","Gravel","Resin Bound","Pattern Imprinted"],
    descriptions: ["Aside Paving specialises in premium driveway installation across Dublin, Kildare and Meath. From traditional cobblelock to modern resin bound surfaces, we deliver driveways built to last the Irish climate for decades.","Our experienced team has been installing driveways since 1985. We use only quality materials and proven techniques ensuring your driveway stands up to heavy use year after year.","Whether replacing an old driveway or installing a new one, Aside Paving provides expert advice, competitive pricing and a finish your neighbours will envy."],
    benefits: ["40+ years experience","Fully insured","Free no-obligation quotes","Quality materials guaranteed","Clean and tidy workmanship","Written guarantee on all work"],
    faqs: [{ question: "How long does a driveway installation take?", answer: "Most standard driveway installations take 2-4 days depending on size and material chosen." },{ question: "What driveway materials do you offer?", answer: "We offer block paving, cobblelock, tarmac, gravel, resin bound and pattern imprinted concrete." },{ question: "Do you provide a warranty?", answer: "Yes, all our driveway installations come with a written workmanship guarantee." },{ question: "How much does a new driveway cost?", answer: "Costs vary depending on size and material. Contact us for a free, no-obligation quote." }],
    relatedServices: [{ name: "Patios", slug: "patios" },{ name: "Block Paving", slug: "block-paving" },{ name: "Garden Walls", slug: "garden-walls" }]
  },
  "patios": {
    title: "Patios", slug: "patios",
    features: ["Natural Sandstone","Porcelain","Limestone","Concrete Paving","Indian Stone","Cobblelock Patios"],
    descriptions: ["Transform your outdoor space with a beautifully designed patio from Aside Paving. We install natural stone, porcelain and concrete patios across Dublin, Kildare and Meath.","Our patio specialists have been creating stunning outdoor living spaces since 1985. We help you choose the right material and design to complement your home and garden perfectly.","From intimate courtyard patios to large entertaining areas, Aside Paving delivers quality patio installations with attention to detail and a perfect finish every time."],
    benefits: ["Bespoke design service","Premium materials only","Fully insured team","40+ years experience","Free quotes","Satisfaction guaranteed"],
    faqs: [{ question: "What patio materials do you install?", answer: "We install natural sandstone, limestone, porcelain, concrete paving and more." },{ question: "How long does patio installation take?", answer: "Most patios take 2-3 days to install depending on size and preparation required." },{ question: "Can you match my existing paving?", answer: "We'll do our best to source matching materials — contact us with photos for advice." },{ question: "Do patios need planning permission?", answer: "Generally no, but we'll advise on any specific requirements during your free consultation." }],
    relatedServices: [{ name: "Driveways", slug: "driveways" },{ name: "Block Paving", slug: "block-paving" },{ name: "Garden Walls", slug: "garden-walls" }]
  },
  "block-paving": {
    title: "Block Paving", slug: "block-paving",
    features: ["Concrete Blocks","Clay Pavers","Tegula Blocks","Tumbled Blocks","Permeable Paving","Kerbing & Edging"],
    descriptions: ["Block paving is one of Ireland's most popular driveway and patio surfaces. Aside Paving has been installing beautiful block paved areas across Dublin, Kildare and Meath since 1985.","Our block paving specialists are experts in pattern design, edging and drainage. We ensure your block paved driveway or patio is installed to the highest standard with a solid sub-base.","Durable, low maintenance and attractive — block paving from Aside Paving adds real kerb appeal. Available in dozens of colours and patterns to suit every home."],
    benefits: ["Expert pattern laying","Long-lasting results","Low maintenance","Kerb appeal boost","Free design consultation","Individual blocks replaceable"],
    faqs: [{ question: "How long does block paving last?", answer: "Quality block paving can last 20-30 years with basic maintenance." },{ question: "What block paving patterns are available?", answer: "We offer herringbone, basketweave, stretcher bond and more." },{ question: "Can block paving be repaired?", answer: "Yes, individual blocks can be replaced easily — a great advantage of block paving." },{ question: "Is block paving suitable for heavy vehicles?", answer: "Yes, when installed with the right sub-base, block paving handles heavy traffic well." }],
    relatedServices: [{ name: "Driveways", slug: "driveways" },{ name: "Patios", slug: "patios" },{ name: "Garden Walls", slug: "garden-walls" }]
  },
  "garden-walls": {
    title: "Garden Walls", slug: "garden-walls",
    features: ["Brick Walls","Block Walls","Stone Walls","Capped Walls","Retaining Walls","Rendered Walls"],
    descriptions: ["Garden walls add structure, privacy and value to your property. Aside Paving builds beautiful brick, block and stone walls for homes across Dublin, Kildare and Meath.","From low decorative walls to full boundary walls, our experienced team delivers quality garden wall construction with clean finishes and solid foundations every time.","Whether you need a retaining wall, boundary wall or decorative garden feature, Aside Paving brings 40 years of expertise to every project."],
    benefits: ["Solid foundations","Clean finishes","Fully insured","40+ years experience","Free quotes","All wall types covered"],
    faqs: [{ question: "What types of garden walls do you build?", answer: "We build brick, block, stone and rendered walls including retaining, boundary and decorative walls." },{ question: "Do garden walls need planning permission?", answer: "Walls under 1m on road boundaries generally don't need permission — we'll advise." },{ question: "How long do garden walls take to build?", answer: "Most garden walls take 1-3 days depending on length and complexity." },{ question: "Can you match my existing wall?", answer: "We'll source matching brick or block — send us photos and we'll advise." }],
    relatedServices: [{ name: "Driveways", slug: "driveways" },{ name: "Patios", slug: "patios" },{ name: "Artificial Grass", slug: "artificial-grass" }]
  },
  "artificial-grass": {
    title: "Artificial Grass", slug: "artificial-grass",
    features: ["Premium Turf","Child Safe","Pet Friendly","UV Resistant","Full Ground Prep","10 Year Guarantee"],
    descriptions: ["Aside Paving supplies and installs premium artificial grass across Dublin, Kildare and Meath. Enjoy a lush green lawn all year round with zero maintenance.","Our artificial grass installations include full ground preparation, weed membrane, drainage layer and professional laying. The result looks and feels like real grass.","Say goodbye to mowing, watering and muddy patches. Aside Paving's artificial grass transforms gardens into beautiful low-maintenance outdoor spaces."],
    benefits: ["Zero maintenance","Year-round green","Child and pet friendly","UV resistant","10-year product guarantee","Full installation service"],
    faqs: [{ question: "How long does artificial grass last?", answer: "Our premium artificial grass comes with a 10-year guarantee and typically lasts 15-20 years." },{ question: "Is artificial grass suitable for children?", answer: "Yes, all our products are child and pet safe." },{ question: "Does artificial grass drain well?", answer: "Yes, we install with a proper drainage layer to ensure water drains freely." },{ question: "How is artificial grass installed?", answer: "We remove existing grass, prepare the sub-base, lay weed membrane, add aggregate and professionally fit the turf." }],
    relatedServices: [{ name: "Patios", slug: "patios" },{ name: "Garden Walls", slug: "garden-walls" },{ name: "Driveways", slug: "driveways" }]
  }
}
