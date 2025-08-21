const plants = [
  {
    id: 1,
    name: "Tulsi (Holy Basil)",
    scientificName: "Ocimum sanctum",
    description: "Tulsi is revered as the 'Queen of Herbs' in Ayurveda. It is known for its spiritual significance and is commonly used in herbal teas and remedies.",
    category: "Ayurveda",
    model: "https://ybouzuswyfixyzyewepw.supabase.co/storage/v1/object/public/models/tulsi.glb",
    image: "https://ybouzuswyfixyzyewepw.supabase.co/storage/v1/object/public/images/tulsi.jpg",
    medicinalProperties: [
      "Anti-inflammatory",
      "Antioxidant",
      "Antimicrobial",
      "Adaptogenic",
      "Immunity booster"
    ],
    uses: [
      "Relieves cough and cold",
      "Reduces stress",
      "Supports respiratory health",
      "Improves digestion"
    ],
    funFacts: [
      "Tulsi is considered sacred and is often grown in Indian households.",
      "Its leaves are used in religious rituals and herbal teas.",
      "Tulsi tea is a popular beverage for boosting immunity."
    ]
  },
  {
    id: 2,
    name: "Ashwagandha",
    scientificName: "Withania somnifera",
    description: "Ashwagandha, also known as Indian ginseng, is a powerful adaptogen that helps the body manage stress and promotes overall vitality.",
    category: "Ayurveda",
    model: "https://ybouzuswyfixyzyewepw.supabase.co/storage/v1/object/public/models/ashwagandha.glb",
    image: "https://ybouzuswyfixyzyewepw.supabase.co/storage/v1/object/public/images/ashwagandha.jpg",
    medicinalProperties: [
      "Adaptogenic",
      "Anti-stress",
      "Anti-inflammatory",
      "Immunity booster",
      "Energy enhancer"
    ],
    uses: [
      "Reduces anxiety and stress",
      "Improves energy and stamina",
      "Enhances memory and cognition",
      "Supports restful sleep"
    ],
    funFacts: [
      "The name Ashwagandha means 'smell of horse', referring to its unique smell and traditional belief that it imparts the strength of a horse.",
      "Its roots are commonly used in Ayurvedic medicine."
    ]
  },
  {
    id: 3,
    name: "Neem",
    scientificName: "Azadirachta indica",
    description: "Neem is a versatile tree known for its powerful antibacterial and antifungal properties. Every part of the tree is used in traditional medicine.",
    category: "Ayurveda",
    model: "https://ybouzuswyfixyzyewepw.supabase.co/storage/v1/object/public/models/neem.glb",
    image: "https://ybouzuswyfixyzyewepw.supabase.co/storage/v1/object/public/images/neem.jpg",
    medicinalProperties: [
      "Antibacterial",
      "Antifungal",
      "Antiviral",
      "Blood purifier",
      "Skin healer"
    ],
    uses: [
      "Treats skin disorders",
      "Used in dental care (neem twigs as toothbrushes)",
      "Blood purification",
      "Natural pesticide"
    ],
    funFacts: [
      "Neem oil is a natural pesticide and insect repellent.",
      "Neem leaves are used in traditional Indian sweets during festivals.",
      "Neem is called the 'Village Pharmacy' in India."
    ]
  },
  {
    id: 4,
    name: "Amla (Indian Gooseberry)",
    scientificName: "Phyllanthus emblica",
    description: "Amla is a superfruit rich in vitamin C and antioxidants. It is a key ingredient in many Ayurvedic formulations for rejuvenation and immunity.",
    category: "Ayurveda",
    model: "https://ybouzuswyfixyzyewepw.supabase.co/storage/v1/object/public/models/amla.glb",
    image: "https://ybouzuswyfixyzyewepw.supabase.co/storage/v1/object/public/images/amla.jpg",
    medicinalProperties: [
      "Rich in Vitamin C",
      "Antioxidant",
      "Immunity booster",
      "Digestive aid",
      "Hair tonic"
    ],
    uses: [
      "Promotes hair and skin health",
      "Boosts immunity",
      "Improves digestion",
      "Slows aging process"
    ],
    funFacts: [
      "Amla is a key ingredient in the Ayurvedic tonic Chyawanprash.",
      "The fruit is sour but highly nutritious.",
      "Amla trees can live for over 100 years!"
    ]
  },
  {
    id: 5,
    name: "Brahmi",
    scientificName: "Bacopa monnieri",
    description: "Brahmi is a renowned brain tonic in Ayurveda, known for enhancing memory, focus, and cognitive function.",
    category: "Ayurveda",
    model: "https://ybouzuswyfixyzyewepw.supabase.co/storage/v1/object/public/models/brahmi.glb",
    image: "https://ybouzuswyfixyzyewepw.supabase.co/storage/v1/object/public/images/brahmi.jpg",
    medicinalProperties: [
      "Memory enhancer",
      "Anti-anxiety",
      "Neuroprotective",
      "Antioxidant",
      "Cognitive booster"
    ],
    uses: [
      "Improves memory and concentration",
      "Reduces anxiety and stress",
      "Supports brain health",
      "Promotes relaxation"
    ],
    funFacts: [
      "Brahmi is often used in Ayurvedic brain tonics and herbal teas.",
      "It grows in wetlands and is used in salads in some cultures.",
      "Brahmi is sometimes called 'herb of grace'."
    ]
  },
  {
    id: 6,
    name: "Giloy",
    scientificName: "Tinospora cordifolia",
    description: "Giloy is a powerful immune-boosting herb used in Ayurveda for its detoxifying and rejuvenating properties.",
    category: "Ayurveda",
    model: "https://ybouzuswyfixyzyewepw.supabase.co/storage/v1/object/public/models/giloy.glb",
    image: "https://ybouzuswyfixyzyewepw.supabase.co/storage/v1/object/public/images/giloy.jpg",
    medicinalProperties: [
      "Immunity booster",
      "Antipyretic",
      "Anti-inflammatory"
    ],
    uses: [
      "Reduces fever",
      "Detoxifies the body",
      "Improves digestion"
    ],
    funFacts: [
      "Also called 'Guduchi' in Sanskrit.",
      "Known as 'Amrita' meaning nectar of immortality."
    ]
  },
  {
    id: 7,
    name: "Shankhpushpi",
    scientificName: "Convolvulus pluricaulis",
    description: "Shankhpushpi is a traditional herb used to enhance memory and reduce stress.",
    category: "Ayurveda",
    model: "https://ybouzuswyfixyzyewepw.supabase.co/storage/v1/object/public/models/Shankhpushpi.glb",
    image: "https://ybouzuswyfixyzyewepw.supabase.co/storage/v1/object/public/images/Shankhpushpi.webp",
    medicinalProperties: [
      "Memory enhancer",
      "Anti-anxiety",
      "Neuroprotective"
    ],
    uses: [
      "Improves cognitive function",
      "Reduces anxiety",
      "Promotes restful sleep"
    ],
    funFacts: [
      "Often used in Ayurvedic syrups for children.",
      "Its name means 'conch-shaped flower'."
    ]
  },
  {
    id: 8,
    name: "Mulethi (Licorice)",
    scientificName: "Glycyrrhiza glabra",
    description: "Mulethi is a sweet-tasting root used for soothing sore throats and boosting immunity.",
    category: "Ayurveda",
    model: "https://ybouzuswyfixyzyewepw.supabase.co/storage/v1/object/public/models/Mulethi.glb",
    image: "https://ybouzuswyfixyzyewepw.supabase.co/storage/v1/object/public/images/Mulethi.jpg",
    medicinalProperties: [
      "Expectorant",
      "Anti-inflammatory",
      "Immunity booster"
    ],
    uses: [
      "Soothes sore throat",
      "Relieves cough",
      "Supports respiratory health"
    ],
    funFacts: [
      "Used as a natural sweetener.",
      "Popular in herbal teas."
    ]
  },
  {
    id: 9,
    name: "Haritaki",
    scientificName: "Terminalia chebula",
    description: "Haritaki is known as the 'king of medicines' in Ayurveda, used for digestive and detoxifying benefits.",
    category: "Ayurveda",
    model: "https://ybouzuswyfixyzyewepw.supabase.co/storage/v1/object/public/models/Haritaki.glb",
    image: "https://ybouzuswyfixyzyewepw.supabase.co/storage/v1/object/public/images/Haritaki.jpg",
    medicinalProperties: [
      "Digestive aid",
      "Detoxifier",
      "Antioxidant"
    ],
    uses: [
      "Improves digestion",
      "Promotes detoxification",
      "Supports weight loss"
    ],
    funFacts: [
      "One of the three fruits in Triphala.",
      "Used in traditional hair care."
    ]
  },
  {
    id: 10,
    name: "Arjuna",
    scientificName: "Terminalia arjuna",
    description: "Arjuna bark is a heart tonic in Ayurveda, supporting cardiovascular health.",
    category: "Ayurveda",
    model: "https://example.com/models/arjuna.glb",
    image: "https://example.com/images/arjuna.jpg",
    medicinalProperties: [
      "Cardioprotective",
      "Antioxidant",
      "Anti-inflammatory"
    ],
    uses: [
      "Supports heart health",
      "Reduces blood pressure",
      "Improves circulation"
    ],
    funFacts: [
      "Named after the hero Arjuna from Mahabharata.",
      "Bark is the main medicinal part."
    ]
  },
  {
    id: 11,
    name: "Manjistha",
    scientificName: "Rubia cordifolia",
    description: "Manjistha is a blood purifier and skin health herb in Ayurveda.",
    category: "Ayurveda",
    model: "https://example.com/models/manjistha.glb",
    image: "https://example.com/images/manjistha.jpg",
    medicinalProperties: [
      "Blood purifier",
      "Anti-inflammatory",
      "Skin healer"
    ],
    uses: [
      "Improves skin complexion",
      "Detoxifies blood",
      "Supports lymphatic system"
    ],
    funFacts: [
      "Roots yield a red dye.",
      "Used in Ayurvedic skincare."
    ]
  },
  {
    id: 12,
    name: "Guggul",
    scientificName: "Commiphora mukul",
    description: "Guggul resin is used for its anti-inflammatory and cholesterol-lowering effects.",
    category: "Ayurveda",
    model: "https://example.com/models/guggul.glb",
    image: "https://example.com/images/guggul.jpg",
    medicinalProperties: [
      "Anti-inflammatory",
      "Cholesterol-lowering",
      "Weight management"
    ],
    uses: [
      "Reduces joint pain",
      "Supports weight loss",
      "Lowers cholesterol"
    ],
    funFacts: [
      "Resin is collected from the bark.",
      "Used in traditional incense."
    ]
  },
  {
    id: 13,
    name: "Punarnava",
    scientificName: "Boerhavia diffusa",
    description: "Punarnava is a rejuvenating herb used for kidney and liver health.",
    category: "Ayurveda",
    model: "https://example.com/models/punarnava.glb",
    image: "https://example.com/images/punarnava.jpg",
    medicinalProperties: [
      "Diuretic",
      "Liver tonic",
      "Anti-inflammatory"
    ],
    uses: [
      "Supports kidney health",
      "Reduces water retention",
      "Improves liver function"
    ],
    funFacts: [
      "Name means 'renewed again'.",
      "Used in Ayurvedic detox formulas."
    ]
  },
  {
    id: 14,
    name: "Bhringraj",
    scientificName: "Eclipta alba",
    description: "Bhringraj is known as the 'king of hair' for promoting hair growth and scalp health.",
    category: "Ayurveda",
    model: "https://example.com/models/bhringraj.glb",
    image: "https://example.com/images/bhringraj.jpg",
    medicinalProperties: [
      "Hair tonic",
      "Liver tonic",
      "Anti-inflammatory"
    ],
    uses: [
      "Promotes hair growth",
      "Prevents hair loss",
      "Improves liver health"
    ],
    funFacts: [
      "Used in Ayurvedic hair oils.",
      "White flowers are characteristic."
    ]
  },
  {
    id: 15,
    name: "Vasaka",
    scientificName: "Justicia adhatoda",
    description: "Vasaka is a respiratory herb used to relieve cough and asthma.",
    category: "Ayurveda",
    model: "https://example.com/models/vasaka.glb",
    image: "https://example.com/images/vasaka.jpg",
    medicinalProperties: [
      "Expectorant",
      "Bronchodilator",
      "Anti-inflammatory"
    ],
    uses: [
      "Relieves cough",
      "Eases asthma symptoms",
      "Clears respiratory tract"
    ],
    funFacts: [
      "Also called 'Malabar nut'.",
      "Leaves are the main medicinal part."
    ]
  },
  {
    id: 16,
    name: "Kutki",
    scientificName: "Picrorhiza kurroa",
    description: "Kutki is a bitter herb used for liver protection and detoxification.",
    category: "Ayurveda",
    model: "https://example.com/models/kutki.glb",
    image: "https://example.com/images/kutki.jpg",
    medicinalProperties: [
      "Liver tonic",
      "Digestive aid",
      "Anti-inflammatory"
    ],
    uses: [
      "Protects liver",
      "Improves digestion",
      "Reduces inflammation"
    ],
    funFacts: [
      "Grows in the Himalayas.",
      "Roots are used medicinally."
    ]
  },
  {
    id: 17,
    name: "Shatavari",
    scientificName: "Asparagus racemosus",
    description: "Shatavari is a rejuvenating herb for female health and hormonal balance.",
    category: "Ayurveda",
    model: "https://example.com/models/shatavari.glb",
    image: "https://example.com/images/shatavari.jpg",
    medicinalProperties: [
      "Hormone balancer",
      "Rejuvenative",
      "Digestive aid"
    ],
    uses: [
      "Supports female reproductive health",
      "Improves lactation",
      "Boosts immunity"
    ],
    funFacts: [
      "Name means 'one with a hundred husbands'.",
      "Roots are used in tonics."
    ]
  },
  {
    id: 18,
    name: "Yashtimadhu",
    scientificName: "Glycyrrhiza glabra",
    description: "Yashtimadhu, or licorice, is used for soothing the throat and digestive tract.",
    category: "Ayurveda",
    model: "https://example.com/models/yashtimadhu.glb",
    image: "https://example.com/images/yashtimadhu.jpg",
    medicinalProperties: [
      "Soothing",
      "Anti-inflammatory",
      "Expectorant"
    ],
    uses: [
      "Soothes sore throat",
      "Relieves cough",
      "Aids digestion"
    ],
    funFacts: [
      "Sweet-tasting root.",
      "Used in herbal candies."
    ]
  },
  {
    id: 19,
    name: "Gudmar",
    scientificName: "Gymnema sylvestre",
    description: "Gudmar is known as the 'sugar destroyer' for its use in managing diabetes.",
    category: "Ayurveda",
    model: "https://example.com/models/gudmar.glb",
    image: "https://example.com/images/gudmar.jpg",
    medicinalProperties: [
      "Antidiabetic",
      "Digestive aid",
      "Anti-inflammatory"
    ],
    uses: [
      "Reduces sugar absorption",
      "Supports weight loss",
      "Improves digestion"
    ],
    funFacts: [
      "Chewing leaves suppresses sweet taste.",
      "Used in diabetes management."
    ]
  },
  {
    id: 20,
    name: "Bael",
    scientificName: "Aegle marmelos",
    description: "Bael fruit is used for digestive health and to treat diarrhea.",
    category: "Ayurveda",
    model: "https://example.com/models/bael.glb",
    image: "https://example.com/images/bael.jpg",
    medicinalProperties: [
      "Digestive aid",
      "Antidiarrheal",
      "Antimicrobial"
    ],
    uses: [
      "Treats diarrhea",
      "Improves digestion",
      "Supports gut health"
    ],
    funFacts: [
      "Fruit shell is very hard.",
      "Leaves are used in Shiva worship."
    ]
  },
  {
    id: 21,
    name: "Triphala",
    scientificName: "Emblica officinalis, Terminalia bellirica, Terminalia chebula",
    description: "Triphala is a blend of three fruits used for detoxification and digestive health.",
    category: "Ayurveda",
    model: "https://example.com/models/triphala.glb",
    image: "https://example.com/images/triphala.jpg",
    medicinalProperties: [
      "Digestive aid",
      "Detoxifier",
      "Antioxidant"
    ],
    uses: [
      "Improves digestion",
      "Promotes detoxification",
      "Supports eye health"
    ],
    funFacts: [
      "A combination of amla, haritaki, and bibhitaki.",
      "Popular in Ayurvedic cleansing routines."
    ]
  },
  {
    id: 22,
    name: "Nagarmotha",
    scientificName: "Cyperus rotundus",
    description: "Nagarmotha is used for digestive and skin health in Ayurveda.",
    category: "Ayurveda",
    model: "https://example.com/models/nagarmotha.glb",
    image: "https://example.com/images/nagarmotha.jpg",
    medicinalProperties: [
      "Digestive aid",
      "Skin healer",
      "Anti-inflammatory"
    ],
    uses: [
      "Improves digestion",
      "Treats skin disorders",
      "Reduces inflammation"
    ],
    funFacts: [
      "Also called 'nut grass'.",
      "Used in perfumes and incense."
    ]
  },
  {
    id: 23,
    name: "Chitrak",
    scientificName: "Plumbago zeylanica",
    description: "Chitrak is a digestive stimulant and metabolism booster.",
    category: "Ayurveda",
    model: "https://example.com/models/chitrak.glb",
    image: "https://example.com/images/chitrak.jpg",
    medicinalProperties: [
      "Digestive stimulant",
      "Metabolism booster",
      "Anti-inflammatory"
    ],
    uses: [
      "Improves appetite",
      "Aids weight loss",
      "Reduces inflammation"
    ],
    funFacts: [
      "Roots are used in Ayurveda.",
      "Flowers are white or blue."
    ]
  },
  {
    id: 24,
    name: "Pippali",
    scientificName: "Piper longum",
    description: "Pippali, or long pepper, is used for respiratory and digestive health.",
    category: "Ayurveda",
    model: "https://example.com/models/pippali.glb",
    image: "https://example.com/images/pippali.jpg",
    medicinalProperties: [
      "Expectorant",
      "Digestive aid",
      "Metabolism booster"
    ],
    uses: [
      "Relieves cough",
      "Improves digestion",
      "Boosts metabolism"
    ],
    funFacts: [
      "Related to black pepper.",
      "Used in the famous Trikatu formula."
    ]
  },
  {
    id: 25,
    name: "Vidanga",
    scientificName: "Embelia ribes",
    description: "Vidanga is used as an anthelmintic and digestive herb.",
    category: "Ayurveda",
    model: "https://example.com/models/vidanga.glb",
    image: "https://example.com/images/vidanga.jpg",
    medicinalProperties: [
      "Anthelmintic",
      "Digestive aid",
      "Antioxidant"
    ],
    uses: [
      "Expels intestinal worms",
      "Improves digestion",
      "Supports gut health"
    ],
    funFacts: [
      "Berries are the medicinal part.",
      "Used in traditional deworming formulas."
    ]
  },
  {
    id: 26,
    name: "Daruharidra",
    scientificName: "Berberis aristata",
    description: "Daruharidra is a yellow-rooted herb used for liver and skin health.",
    category: "Ayurveda",
    model: "https://example.com/models/daruharidra.glb",
    image: "https://example.com/images/daruharidra.jpg",
    medicinalProperties: [
      "Liver tonic",
      "Skin healer",
      "Antimicrobial"
    ],
    uses: [
      "Improves liver function",
      "Treats skin disorders",
      "Reduces infections"
    ],
    funFacts: [
      "Also called 'Indian barberry'.",
      "Roots are bright yellow."
    ]
  },
  {
    id: 27,
    name: "Tagara",
    scientificName: "Valeriana wallichii",
    description: "Tagara is a calming herb used for sleep and relaxation.",
    category: "Ayurveda",
    model: "https://example.com/models/tagara.glb",
    image: "https://example.com/images/tagara.jpg",
    medicinalProperties: [
      "Sedative",
      "Calming",
      "Anti-anxiety"
    ],
    uses: [
      "Promotes restful sleep",
      "Reduces anxiety",
      "Calms the mind"
    ],
    funFacts: [
      "Roots are aromatic.",
      "Used in herbal sleep formulas."
    ]
  },
  {
    id: 28,
    name: "Agnimantha",
    scientificName: "Clerodendrum phlomidis",
    description: "Agnimantha is used for joint health and as a diuretic.",
    category: "Ayurveda",
    model: "https://example.com/models/agnimantha.glb",
    image: "https://example.com/images/agnimantha.jpg",
    medicinalProperties: [
      "Anti-inflammatory",
      "Diuretic",
      "Analgesic"
    ],
    uses: [
      "Reduces joint pain",
      "Promotes urination",
      "Relieves swelling"
    ],
    funFacts: [
      "Part of the Dashamoola group.",
      "Used in pain relief oils."
    ]
  },
  {
    id: 29,
    name: "Bala",
    scientificName: "Sida cordifolia",
    description: "Bala is a strengthening and rejuvenating herb in Ayurveda.",
    category: "Ayurveda",
    model: "https://example.com/models/bala.glb",
    image: "https://example.com/images/bala.jpg",
    medicinalProperties: [
      "Strengthening",
      "Rejuvenative",
      "Anti-inflammatory"
    ],
    uses: [
      "Improves strength",
      "Reduces inflammation",
      "Supports nerve health"
    ],
    funFacts: [
      "Name means 'strength'.",
      "Used in herbal massage oils."
    ]
  },
  {
    id: 30,
    name: "Dashamoola",
    scientificName: "Group of 10 roots",
    description: "Dashamoola is a classical Ayurvedic formula of ten roots for inflammation and pain relief.",
    category: "Ayurveda",
    model: "https://example.com/models/dashamoola.glb",
    image: "https://example.com/images/dashamoola.jpg",
    medicinalProperties: [
      "Anti-inflammatory",
      "Analgesic",
      "Rejuvenative"
    ],
    uses: [
      "Reduces pain",
      "Relieves inflammation",
      "Supports nervous system"
    ],
    funFacts: [
      "Means 'ten roots'.",
      "Used in many classical formulas."
    ]
  },
  {
    id: 31,
    name: "Chandan (Sandalwood)",
    scientificName: "Santalum album",
    description: "Chandan is a cooling and aromatic wood used for skin and mind.",
    category: "Ayurveda",
    model: "https://example.com/models/chandan.glb",
    image: "https://example.com/images/chandan.jpg",
    medicinalProperties: [
      "Cooling",
      "Aromatic",
      "Skin healer"
    ],
    uses: [
      "Soothes skin",
      "Calms the mind",
      "Reduces inflammation"
    ],
    funFacts: [
      "Used in religious rituals.",
      "Wood is highly valued."
    ]
  },
  {
    id: 32,
    name: "Kumari (Aloe Vera)",
    scientificName: "Aloe barbadensis miller",
    description: "Kumari is a succulent used for skin, digestion, and wound healing.",
    category: "Ayurveda",
    model: "https://example.com/models/kumari.glb",
    image: "https://example.com/images/kumari.jpg",
    medicinalProperties: [
      "Skin healer",
      "Digestive aid",
      "Anti-inflammatory"
    ],
    uses: [
      "Soothes burns",
      "Improves digestion",
      "Hydrates skin"
    ],
    funFacts: [
      "Gel is used in cosmetics.",
      "Popular as a houseplant."
    ]
  },
  {
    id: 33,
    name: "Guduchi",
    scientificName: "Tinospora cordifolia",
    description: "Guduchi is a powerful adaptogen and immunity booster.",
    category: "Ayurveda",
    model: "https://example.com/models/guduchi.glb",
    image: "https://example.com/images/guduchi.jpg",
    medicinalProperties: [
      "Immunity booster",
      "Adaptogenic",
      "Detoxifier"
    ],
    uses: [
      "Boosts immunity",
      "Reduces fever",
      "Detoxifies the body"
    ],
    funFacts: [
      "Also called 'Amrita'.",
      "Used in many classical formulas."
    ]
  },
  {
    id: 34,
    name: "Jatamansi",
    scientificName: "Nardostachys jatamansi",
    description: "Jatamansi is a calming herb for mind and sleep.",
    category: "Ayurveda",
    model: "https://example.com/models/jatamansi.glb",
    image: "https://example.com/images/jatamansi.jpg",
    medicinalProperties: [
      "Calming",
      "Sedative",
      "Neuroprotective"
    ],
    uses: [
      "Promotes restful sleep",
      "Reduces anxiety",
      "Supports brain health"
    ],
    funFacts: [
      "Roots are aromatic.",
      "Used in perfumes."
    ]
  },
  {
    id: 35,
    name: "Musta",
    scientificName: "Cyperus rotundus",
    description: "Musta is a digestive and antipyretic herb.",
    category: "Ayurveda",
    model: "https://example.com/models/musta.glb",
    image: "https://example.com/images/musta.jpg",
    medicinalProperties: [
      "Digestive aid",
      "Antipyretic",
      "Anti-inflammatory"
    ],
    uses: [
      "Improves digestion",
      "Reduces fever",
      "Relieves pain"
    ],
    funFacts: [
      "Also called 'nut grass'.",
      "Used in fever remedies."
    ]
  },
  {
    id: 36,
    name: "Amalaki",
    scientificName: "Phyllanthus emblica",
    description: "Amalaki is a rejuvenating fruit rich in vitamin C.",
    category: "Ayurveda",
    model: "https://example.com/models/amalaki.glb",
    image: "https://example.com/images/amalaki.jpg",
    medicinalProperties: [
      "Rich in Vitamin C",
      "Antioxidant",
      "Immunity booster"
    ],
    uses: [
      "Boosts immunity",
      "Improves skin health",
      "Supports digestion"
    ],
    funFacts: [
      "Also called 'Indian Gooseberry'.",
      "Used in Chyawanprash."
    ]
  },
  {
    id: 37,
    name: "Bibhitaki",
    scientificName: "Terminalia bellirica",
    description: "Bibhitaki is one of the three fruits in Triphala, used for detox and respiratory health.",
    category: "Ayurveda",
    model: "https://example.com/models/bibhitaki.glb",
    image: "https://example.com/images/bibhitaki.jpg",
    medicinalProperties: [
      "Detoxifier",
      "Respiratory aid",
      "Antioxidant"
    ],
    uses: [
      "Supports lung health",
      "Promotes detoxification",
      "Improves digestion"
    ],
    funFacts: [
      "Fruit is used in Triphala.",
      "Large deciduous tree."
    ]
  },
  {
    id: 38,
    name: "Shalparni",
    scientificName: "Desmodium gangeticum",
    description: "Shalparni is a rejuvenative and anti-inflammatory herb.",
    category: "Ayurveda",
    model: "https://example.com/models/shalparni.glb",
    image: "https://example.com/images/shalparni.jpg",
    medicinalProperties: [
      "Rejuvenative",
      "Anti-inflammatory",
      "Analgesic"
    ],
    uses: [
      "Reduces pain",
      "Supports immunity",
      "Improves strength"
    ],
    funFacts: [
      "Part of Dashamoola group.",
      "Used in classical formulas."
    ]
  },
  {
    id: 39,
    name: "Prishnaparni",
    scientificName: "Uraria picta",
    description: "Prishnaparni is used for pain relief and as a rejuvenative.",
    category: "Ayurveda",
    model: "https://example.com/models/prishnaparni.glb",
    image: "https://example.com/images/prishnaparni.jpg",
    medicinalProperties: [
      "Analgesic",
      "Rejuvenative",
      "Anti-inflammatory"
    ],
    uses: [
      "Reduces pain",
      "Improves strength",
      "Supports immunity"
    ],
    funFacts: [
      "Part of Dashamoola group.",
      "Used in pain relief oils."
    ]
  },
  {
    id: 40,
    name: "Brihati",
    scientificName: "Solanum indicum",
    description: "Brihati is used for respiratory and urinary health.",
    category: "Ayurveda",
    model: "https://example.com/models/brihati.glb",
    image: "https://example.com/images/brihati.jpg",
    medicinalProperties: [
      "Respiratory aid",
      "Diuretic",
      "Anti-inflammatory"
    ],
    uses: [
      "Relieves cough",
      "Promotes urination",
      "Reduces swelling"
    ],
    funFacts: [
      "Part of Dashamoola group.",
      "Small purple flowers."
    ]
  },
  {
    id: 41,
    name: "Kantakari",
    scientificName: "Solanum xanthocarpum",
    description: "Kantakari is used for respiratory and urinary health.",
    category: "Ayurveda",
    model: "https://example.com/models/kantakari.glb",
    image: "https://example.com/images/kantakari.jpg",
    medicinalProperties: [
      "Respiratory aid",
      "Diuretic",
      "Anti-inflammatory"
    ],
    uses: [
      "Relieves cough",
      "Promotes urination",
      "Reduces swelling"
    ],
    funFacts: [
      "Part of Dashamoola group.",
      "Yellow-green berries."
    ]
  },
  {
    id: 42,
    name: "Patala",
    scientificName: "Stereospermum suaveolens",
    description: "Patala is a rejuvenative and anti-inflammatory herb.",
    category: "Ayurveda",
    model: "https://example.com/models/patala.glb",
    image: "https://example.com/images/patala.jpg",
    medicinalProperties: [
      "Rejuvenative",
      "Anti-inflammatory",
      "Analgesic"
    ],
    uses: [
      "Reduces pain",
      "Supports immunity",
      "Improves strength"
    ],
    funFacts: [
      "Part of Dashamoola group.",
      "Fragrant flowers."
    ]
  },
  {
    id: 43,
    name: "Gokshura",
    scientificName: "Tribulus terrestris",
    description: "Gokshura is used for urinary and reproductive health.",
    category: "Ayurveda",
    model: "https://example.com/models/gokshura.glb",
    image: "https://example.com/images/gokshura.jpg",
    medicinalProperties: [
      "Diuretic",
      "Aphrodisiac",
      "Anti-inflammatory"
    ],
    uses: [
      "Promotes urination",
      "Supports reproductive health",
      "Reduces inflammation"
    ],
    funFacts: [
      "Spiny fruit is characteristic.",
      "Used in classical formulas."
    ]
  },
  {
    id: 44,
    name: "Eranda",
    scientificName: "Ricinus communis",
    description: "Eranda, or castor, is used for joint pain and as a laxative.",
    category: "Ayurveda",
    model: "https://example.com/models/eranda.glb",
    image: "https://example.com/images/eranda.jpg",
    medicinalProperties: [
      "Laxative",
      "Anti-inflammatory",
      "Analgesic"
    ],
    uses: [
      "Relieves constipation",
      "Reduces joint pain",
      "Promotes hair growth"
    ],
    funFacts: [
      "Seeds yield castor oil.",
      "Used in pain relief oils."
    ]
  },
  {
    id: 45,
    name: "Haridra (Turmeric)",
    scientificName: "Curcuma longa",
    description: "Haridra, or turmeric, is a golden spice with anti-inflammatory and antioxidant properties.",
    category: "Ayurveda",
    model: "https://example.com/models/haridra.glb",
    image: "https://example.com/images/haridra.jpg",
    medicinalProperties: [
      "Anti-inflammatory",
      "Antioxidant",
      "Digestive aid"
    ],
    uses: [
      "Reduces inflammation",
      "Improves digestion",
      "Supports skin health"
    ],
    funFacts: [
      "Used in cooking and rituals.",
      "Rhizome is the medicinal part."
    ]
  },
  {
    id: 46,
    name: "Moringa",
    scientificName: "Moringa oleifera",
    description: "Moringa is a superfood rich in vitamins and minerals.",
    category: "Ayurveda",
    model: "https://example.com/models/moringa.glb",
    image: "https://example.com/images/moringa.jpg",
    medicinalProperties: [
      "Nutrient-rich",
      "Antioxidant",
      "Anti-inflammatory"
    ],
    uses: [
      "Boosts nutrition",
      "Reduces inflammation",
      "Supports immunity"
    ],
    funFacts: [
      "Also called 'drumstick tree'.",
      "Leaves are highly nutritious."
    ]
  },
  {
    id: 47,
    name: "Neem Patra",
    scientificName: "Azadirachta indica",
    description: "Neem leaves are used for skin, dental, and immune health.",
    category: "Ayurveda",
    model: "https://example.com/models/neempatra.glb",
    image: "https://example.com/images/neempatra.jpg",
    medicinalProperties: [
      "Antibacterial",
      "Antifungal",
      "Immunity booster"
    ],
    uses: [
      "Treats skin disorders",
      "Used in dental care",
      "Boosts immunity"
    ],
    funFacts: [
      "Leaves are very bitter.",
      "Used in traditional sweets."
    ]
  },
  {
    id: 48,
    name: "Tulsi Patra",
    scientificName: "Ocimum sanctum",
    description: "Tulsi leaves are used for respiratory, immune, and stress relief.",
    category: "Ayurveda",
    model: "https://example.com/models/tulsipatra.glb",
    image: "https://example.com/images/tulsipatra.jpg",
    medicinalProperties: [
      "Immunity booster",
      "Adaptogenic",
      "Antioxidant"
    ],
    uses: [
      "Relieves cough",
      "Reduces stress",
      "Boosts immunity"
    ],
    funFacts: [
      "Leaves are used in teas.",
      "Sacred in Indian culture."
    ]
  },
  {
    id: 49,
    name: "Amla Patra",
    scientificName: "Phyllanthus emblica",
    description: "Amla leaves are used for hair, skin, and digestive health.",
    category: "Ayurveda",
    model: "https://example.com/models/amlaPatra.glb",
    image: "https://example.com/images/amlaPatra.jpg",
    medicinalProperties: [
      "Rich in Vitamin C",
      "Antioxidant",
      "Digestive aid"
    ],
    uses: [
      "Promotes hair health",
      "Improves digestion",
      "Boosts immunity"
    ],
    funFacts: [
      "Leaves are sour and astringent.",
      "Used in hair oils."
    ]
  },
  {
    id: 50,
    name: "Ashoka",
    scientificName: "Saraca asoca",
    description: "Ashoka is used for female reproductive health and as a uterine tonic.",
    category: "Ayurveda",
    model: "https://example.com/models/ashoka.glb",
    image: "https://example.com/images/ashoka.jpg",
    medicinalProperties: [
      "Uterine tonic",
      "Anti-inflammatory",
      "Astringent"
    ],
    uses: [
      "Supports female reproductive health",
      "Reduces menstrual pain",
      "Improves skin complexion"
    ],
    funFacts: [
      "Flowers are bright orange-red.",
      "Sacred in Indian mythology."
    ]
  }
];

export default plants; 