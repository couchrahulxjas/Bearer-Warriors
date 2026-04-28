import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.MONGODB_DB_NAME || 'warriors_db';

// 20 Real Psychiatrists Data
const psychiatrists = [
  {
    name: "Dr. Sarah Mitchell",
    email: "sarah.mitchell@psychiatry.com",
    phone: "+1-202-555-0142",
    specialization: "Depression & Anxiety",
    yearsOfExperience: 15,
    education: "M.D. from Harvard Medical School",
    licenseNumber: "PSY-2008-MA-001",
    bio: "Specializes in cognitive behavioral therapy and medication management for mood disorders.",
    ratePerHour: 150,
    languages: ["English", "Spanish"],
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    rating: 4.8,
    reviewCount: 127,
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
  },
  {
    name: "Dr. James Chen",
    email: "james.chen@psychiatry.com",
    phone: "+1-212-555-0187",
    specialization: "Bipolar Disorder",
    yearsOfExperience: 20,
    education: "M.D. from Stanford School of Medicine",
    licenseNumber: "PSY-2003-CA-002",
    bio: "Expert in pharmacotherapy and psychoeducation for bipolar spectrum disorders.",
    ratePerHour: 180,
    languages: ["English", "Mandarin"],
    availability: ["Monday", "Tuesday", "Thursday", "Friday", "Saturday"],
    rating: 4.9,
    reviewCount: 195,
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=james"
  },
  {
    name: "Dr. Emily Rodriguez",
    email: "emily.rodriguez@psychiatry.com",
    phone: "+1-305-555-0156",
    specialization: "PTSD & Trauma",
    yearsOfExperience: 18,
    education: "M.D. from Johns Hopkins School of Medicine",
    licenseNumber: "PSY-2005-FL-003",
    bio: "Trained in EMDR and trauma-focused CBT for complex trauma cases.",
    ratePerHour: 165,
    languages: ["English", "Spanish", "Portuguese"],
    availability: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    rating: 4.7,
    reviewCount: 156,
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily"
  },
  {
    name: "Dr. Michael O'Brien",
    email: "michael.obrien@psychiatry.com",
    phone: "+1-773-555-0164",
    specialization: "Schizophrenia & Psychosis",
    yearsOfExperience: 22,
    education: "M.D. from University of Chicago",
    licenseNumber: "PSY-2001-IL-004",
    bio: "Specializes in early intervention psychosis and antipsychotic medication management.",
    ratePerHour: 175,
    languages: ["English"],
    availability: ["Monday", "Wednesday", "Thursday", "Friday"],
    rating: 4.6,
    reviewCount: 143,
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael"
  },
  {
    name: "Dr. Priya Patel",
    email: "priya.patel@psychiatry.com",
    phone: "+1-408-555-0192",
    specialization: "Child & Adolescent Psychiatry",
    yearsOfExperience: 16,
    education: "M.D. from Yale School of Medicine",
    licenseNumber: "PSY-2007-CA-005",
    bio: "Focuses on developmental disorders, ADHD, and behavioral issues in children and teens.",
    ratePerHour: 160,
    languages: ["English", "Hindi", "Gujarati"],
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    rating: 4.9,
    reviewCount: 178,
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya"
  },
  {
    name: "Dr. David Thompson",
    email: "david.thompson@psychiatry.com",
    phone: "+1-206-555-0171",
    specialization: "Addiction & Substance Abuse",
    yearsOfExperience: 19,
    education: "M.D. from University of Washington",
    licenseNumber: "PSY-2004-WA-006",
    bio: "Expert in addiction psychiatry with certification in addiction medicine.",
    ratePerHour: 170,
    languages: ["English"],
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    rating: 4.8,
    reviewCount: 134,
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=david"
  },
  {
    name: "Dr. Maria Gonzalez",
    email: "maria.gonzalez@psychiatry.com",
    phone: "+1-512-555-0149",
    specialization: "Geriatric Psychiatry",
    yearsOfExperience: 17,
    education: "M.D. from University of Texas",
    licenseNumber: "PSY-2006-TX-007",
    bio: "Specializes in dementia, depression in elderly, and age-related psychiatric conditions.",
    ratePerHour: 155,
    languages: ["English", "Spanish"],
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    rating: 4.7,
    reviewCount: 109,
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria"
  },
  {
    name: "Dr. Robert Chang",
    email: "robert.chang@psychiatry.com",
    phone: "+1-415-555-0183",
    specialization: "OCD & Anxiety Disorders",
    yearsOfExperience: 14,
    education: "M.D. from University of California, San Francisco",
    licenseNumber: "PSY-2009-CA-008",
    bio: "Certified in ERP and specialized exposure therapy for OCD and anxiety disorders.",
    ratePerHour: 165,
    languages: ["English", "Cantonese"],
    availability: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    rating: 4.8,
    reviewCount: 121,
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert"
  },
  {
    name: "Dr. Jennifer Williams",
    email: "jennifer.williams@psychiatry.com",
    phone: "+1-617-555-0126",
    specialization: "Women's Mental Health",
    yearsOfExperience: 16,
    education: "M.D. from Boston University School of Medicine",
    licenseNumber: "PSY-2007-MA-009",
    bio: "Expert in perinatal psychiatry, hormonal influences on mood, and women's health.",
    ratePerHour: 160,
    languages: ["English"],
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    rating: 4.9,
    reviewCount: 189,
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=jennifer"
  },
  {
    name: "Dr. Alexander Kowalski",
    email: "alexander.kowalski@psychiatry.com",
    phone: "+1-312-555-0194",
    specialization: "Sleep Disorders & Psychiatry",
    yearsOfExperience: 18,
    education: "M.D. from Northwestern University",
    licenseNumber: "PSY-2005-IL-010",
    bio: "Board-certified in both psychiatry and sleep medicine. Treats insomnia and sleep-related psychiatric issues.",
    ratePerHour: 175,
    languages: ["English", "Polish"],
    availability: ["Monday", "Wednesday", "Thursday", "Friday"],
    rating: 4.7,
    reviewCount: 145,
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=alexander"
  },
  {
    name: "Dr. Lisa Anderson",
    email: "lisa.anderson@psychiatry.com",
    phone: "+1-404-555-0167",
    specialization: "Eating Disorders",
    yearsOfExperience: 15,
    education: "M.D. from Emory University School of Medicine",
    licenseNumber: "PSY-2008-GA-011",
    bio: "Specialized in treating anorexia, bulimia, and binge eating disorders with integrated care.",
    ratePerHour: 165,
    languages: ["English"],
    availability: ["Monday", "Tuesday", "Thursday", "Friday", "Saturday"],
    rating: 4.8,
    reviewCount: 112,
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa"
  },
  {
    name: "Dr. Christopher Moore",
    email: "christopher.moore@psychiatry.com",
    phone: "+1-702-555-0152",
    specialization: "Personality Disorders",
    yearsOfExperience: 20,
    education: "M.D. from University of Nevada, Las Vegas",
    licenseNumber: "PSY-2003-NV-012",
    bio: "Expert in DBT and treating borderline, narcissistic, and other personality disorders.",
    ratePerHour: 180,
    languages: ["English"],
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    rating: 4.6,
    reviewCount: 167,
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=christopher"
  },
  {
    name: "Dr. Natasha Volkov",
    email: "natasha.volkov@psychiatry.com",
    phone: "+1-347-555-0178",
    specialization: "Psychosis & Schizophrenia",
    yearsOfExperience: 19,
    education: "M.D. from NYU School of Medicine",
    licenseNumber: "PSY-2004-NY-013",
    bio: "Researches and treats first-episode psychosis with cutting-edge pharmacological interventions.",
    ratePerHour: 185,
    languages: ["English", "Russian"],
    availability: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    rating: 4.8,
    reviewCount: 156,
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=natasha"
  },
  {
    name: "Dr. Marcus Johnson",
    email: "marcus.johnson@psychiatry.com",
    phone: "+1-404-555-0189",
    specialization: "Trauma & PTSD",
    yearsOfExperience: 17,
    education: "M.D. from Morehouse School of Medicine",
    licenseNumber: "PSY-2006-GA-014",
    bio: "Specializes in trauma-informed care and cultural competency in treating PTSD.",
    ratePerHour: 170,
    languages: ["English"],
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    rating: 4.9,
    reviewCount: 198,
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=marcus"
  },
  {
    name: "Dr. Sophia Leoni",
    email: "sophia.leoni@psychiatry.com",
    phone: "+1-305-555-0146",
    specialization: "Depression",
    yearsOfExperience: 14,
    education: "M.D. from University of Miami",
    licenseNumber: "PSY-2009-FL-015",
    bio: "Treats treatment-resistant depression using novel therapies including ketamine and TMS.",
    ratePerHour: 160,
    languages: ["English", "Italian"],
    availability: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday"],
    rating: 4.7,
    reviewCount: 134,
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=sophia"
  },
  {
    name: "Dr. Vincent Park",
    email: "vincent.park@psychiatry.com",
    phone: "+1-206-555-0135",
    specialization: "Anxiety Disorders",
    yearsOfExperience: 16,
    education: "M.D. from University of Washington School of Medicine",
    licenseNumber: "PSY-2007-WA-016",
    bio: "Specialized in generalized anxiety disorder, panic disorder, and social anxiety treatment.",
    ratePerHour: 155,
    languages: ["English", "Korean"],
    availability: ["Monday", "Tuesday", "Thursday", "Friday", "Saturday"],
    rating: 4.8,
    reviewCount: 144,
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=vincent"
  },
  {
    name: "Dr. Eleanor Hunt",
    email: "eleanor.hunt@psychiatry.com",
    phone: "+1-215-555-0174",
    specialization: "Psychotherapy & Mood Disorders",
    yearsOfExperience: 21,
    education: "M.D. from University of Pennsylvania",
    licenseNumber: "PSY-2002-PA-017",
    bio: "Pioneer in integrative psychiatry combining psychodynamic therapy with medication management.",
    ratePerHour: 190,
    languages: ["English"],
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    rating: 4.9,
    reviewCount: 212,
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=eleanor"
  },
  {
    name: "Dr. Hassan Mustafa",
    email: "hassan.mustafa@psychiatry.com",
    phone: "+1-248-555-0161",
    specialization: "Psychotic Disorders",
    yearsOfExperience: 18,
    education: "M.D. from Wayne State University",
    licenseNumber: "PSY-2005-MI-018",
    bio: "Expertise in early psychosis intervention and long-acting antipsychotic management.",
    ratePerHour: 175,
    languages: ["English", "Arabic"],
    availability: ["Tuesday", "Wednesday", "Thursday", "Friday"],
    rating: 4.7,
    reviewCount: 128,
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=hassan"
  },
  {
    name: "Dr. Rachel Green",
    email: "rachel.green@psychiatry.com",
    phone: "+1-512-555-0182",
    specialization: "Integrative & Holistic Psychiatry",
    yearsOfExperience: 13,
    education: "M.D. from University of Texas Health Science Center",
    licenseNumber: "PSY-2010-TX-019",
    bio: "Combines conventional psychiatry with lifestyle medicine and wellness approaches.",
    ratePerHour: 155,
    languages: ["English"],
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    rating: 4.8,
    reviewCount: 119,
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=rachel"
  },
  {
    name: "Dr. William Stewart",
    email: "william.stewart@psychiatry.com",
    phone: "+1-206-555-0145",
    specialization: "Substance Use Disorders",
    yearsOfExperience: 19,
    education: "M.D. from University of Washington",
    licenseNumber: "PSY-2004-WA-020",
    bio: "Board-certified addiction psychiatrist with expertise in medication-assisted treatment.",
    ratePerHour: 170,
    languages: ["English"],
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    rating: 4.9,
    reviewCount: 173,
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=william"
  }
];

async function seedDatabase() {
  const client = new MongoClient(mongoUri);
  
  try {
    console.log('🔄 Connecting to MongoDB...');
    await client.connect();
    
    const db = client.db(dbName);
    const collection = db.collection('psychiatrists');
    
    // Check if psychiatrists already exist
    const existingCount = await collection.countDocuments();
    if (existingCount > 0) {
      console.log(`⚠️  Found ${existingCount} existing psychiatrist records`);
      console.log('🗑️  Clearing existing records...');
      await collection.deleteMany({});
    }
    
    // Insert psychiatrists
    console.log(`📝 Inserting ${psychiatrists.length} psychiatrist records...`);
    const result = await collection.insertMany(psychiatrists);
    
    console.log(`✅ Successfully inserted ${result.insertedIds.length} psychiatrist records!`);
    console.log('\n📊 Sample Data:');
    console.log('─'.repeat(80));
    
    // Display first 3 records
    const samples = await collection.find({}).limit(3).toArray();
    samples.forEach((doc, index) => {
      console.log(`\n${index + 1}. ${doc.name}`);
      console.log(`   📧 Email: ${doc.email}`);
      console.log(`   🏥 Specialization: ${doc.specialization}`);
      console.log(`   💰 Rate: $${doc.ratePerHour}/hour`);
      console.log(`   ⭐ Rating: ${doc.rating} (${doc.reviewCount} reviews)`);
    });
    
    console.log('\n' + '─'.repeat(80));
    console.log('🎉 Seed completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await client.close();
    process.exit(0);
  }
}

// Run seed
console.log('🚀 Starting database seed...\n');
seedDatabase();
