import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Dummy Psychiatrists Data (20 psychiatrists)
const psychiatristsData = [
  {
    id: "1",
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
    id: "2",
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
    id: "3",
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
    id: "4",
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
    id: "5",
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
    id: "6",
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
    id: "7",
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
    id: "8",
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
    id: "9",
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
    id: "10",
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
    id: "11",
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
    id: "12",
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
    id: "13",
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
    id: "14",
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
    id: "15",
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
    id: "16",
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
    id: "17",
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
    id: "18",
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
    id: "19",
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
    id: "20",
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


// Routes

// Get all psychiatrists
app.get('/api/psychiatrists', (req, res) => {
  res.json({
    success: true,
    count: psychiatristsData.length,
    data: psychiatristsData
  });
});

// Get psychiatrist by ID
app.get('/api/psychiatrists/:id', (req, res) => {
  const psychiatrist = psychiatristsData.find(p => p.id === req.params.id);
  
  if (!psychiatrist) {
    return res.status(404).json({
      success: false,
      error: 'Psychiatrist not found'
    });
  }
  
  res.json({
    success: true,
    data: psychiatrist
  });
});

// Get psychiatrists by specialization
app.get('/api/psychiatrists/specialization/:spec', (req, res) => {
  const psychiatrists = psychiatristsData.filter(
    p => p.specialization.toLowerCase().includes(req.params.spec.toLowerCase())
  );
  
  res.json({
    success: true,
    count: psychiatrists.length,
    data: psychiatrists
  });
});

// Create new psychiatrist (for future use)
app.post('/api/psychiatrists', (req, res) => {
  try {
    const newPsychiatrist = {
      id: String(psychiatristsData.length + 1),
      ...req.body
    };
    psychiatristsData.push(newPsychiatrist);
    res.status(201).json({
      success: true,
      id: newPsychiatrist.id,
      message: 'Psychiatrist added successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Warriors Backend is running',
    environment: 'Dummy Data Mode'
  });
});

// In-memory data stores (replacing database)
let sessions = [];
let stories = [];
let rooms = [];
let messages = [];
let users = {};
let comments = [];

// ============ USER ENDPOINTS ============

// Register/Create User
app.post('/api/users/register', (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    if (users[email]) {
      return res.status(400).json({
        success: false,
        error: 'User already exists'
      });
    }
    
    const userId = Date.now().toString();
    users[email] = {
      id: userId,
      email,
      password, // In production, hash this!
      name: name || 'Anonymous User',
      bio: '',
      stories: [],
      bookings: [],
      createdAt: new Date()
    };
    
    res.status(201).json({
      success: true,
      data: { id: userId, email, name }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Login
app.post('/api/users/login', (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users[email];
    
    if (!user || user.password !== password) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }
    
    res.json({
      success: true,
      data: { 
        id: user.id, 
        email: user.email, 
        name: user.name 
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get User Profile
app.get('/api/users/:id', (req, res) => {
  try {
    const user = Object.values(users).find(u => u.id === req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        bio: user.bio,
        email: user.email,
        stories: user.stories,
        bookings: user.bookings,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Update User Profile
app.put('/api/users/:id', (req, res) => {
  try {
    const user = Object.values(users).find(u => u.id === req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    const { name, bio } = req.body;
    if (name) user.name = name;
    if (bio) user.bio = bio;
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ============ STORIES/POSTS ENDPOINTS ============

// Create Story
app.post('/api/stories', (req, res) => {
  try {
    const { title, content, tags, authorId, isAnonymous } = req.body;
    
    const story = {
      id: Date.now().toString(),
      title,
      content,
      tags: tags || [],
      authorId,
      author: isAnonymous ? 'Anonymous' : Object.values(users).find(u => u.id === authorId)?.name || 'Anonymous',
      isAnonymous,
      upvotes: 0,
      upvoters: [],
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    stories.push(story);
    
    // Add to user's stories
    const user = Object.values(users).find(u => u.id === authorId);
    if (user) user.stories.push(story.id);
    
    res.status(201).json({
      success: true,
      data: story
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get All Stories
app.get('/api/stories', (req, res) => {
  try {
    const sorted = stories.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json({
      success: true,
      count: sorted.length,
      data: sorted
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get Story by ID
app.get('/api/stories/:id', (req, res) => {
  try {
    const story = stories.find(s => s.id === req.params.id);
    
    if (!story) {
      return res.status(404).json({
        success: false,
        error: 'Story not found'
      });
    }
    
    res.json({
      success: true,
      data: story
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Upvote Story
app.post('/api/stories/:id/upvote', (req, res) => {
  try {
    const story = stories.find(s => s.id === req.params.id);
    
    if (!story) {
      return res.status(404).json({
        success: false,
        error: 'Story not found'
      });
    }
    
    const { userId } = req.body;
    
    if (!story.upvoters.includes(userId)) {
      story.upvoters.push(userId);
      story.upvotes++;
    }
    
    res.json({
      success: true,
      data: { upvotes: story.upvotes }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ============ CHAT ROOMS ENDPOINTS ============

// Create Chat Room
app.post('/api/rooms', (req, res) => {
  try {
    const { name, description, isPrivate, createdBy } = req.body;
    
    const room = {
      id: Date.now().toString(),
      name,
      description,
      isPrivate,
      createdBy,
      participants: [createdBy],
      messages: [],
      createdAt: new Date()
    };
    
    rooms.push(room);
    
    res.status(201).json({
      success: true,
      data: room
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get All Rooms
app.get('/api/rooms', (req, res) => {
  try {
    const roomsWithStats = rooms.map(room => ({
      ...room,
      participants: room.participants.length,
      lastActive: room.messages.length > 0 ? room.messages[room.messages.length - 1].createdAt : room.createdAt
    }));
    
    res.json({
      success: true,
      count: roomsWithStats.length,
      data: roomsWithStats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get Room by ID
app.get('/api/rooms/:id', (req, res) => {
  try {
    const room = rooms.find(r => r.id === req.params.id);
    
    if (!room) {
      return res.status(404).json({
        success: false,
        error: 'Room not found'
      });
    }
    
    res.json({
      success: true,
      data: room
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ============ MESSAGES ENDPOINTS ============

// Send Message to Room
app.post('/api/rooms/:roomId/messages', (req, res) => {
  try {
    const room = rooms.find(r => r.id === req.params.roomId);
    
    if (!room) {
      return res.status(404).json({
        success: false,
        error: 'Room not found'
      });
    }
    
    const { content, sender, senderName, isAnonymous } = req.body;
    
    const message = {
      id: Date.now().toString(),
      roomId: req.params.roomId,
      content,
      sender,
      senderName: isAnonymous ? `Anonymous ${String(sender).substring(0, 3)}` : senderName,
      isAnonymous,
      createdAt: new Date()
    };
    
    messages.push(message);
    room.messages.push(message.id);
    
    // Add participant if not already in room
    if (!room.participants.includes(sender)) {
      room.participants.push(sender);
    }
    
    res.status(201).json({
      success: true,
      data: message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get Messages for Room
app.get('/api/rooms/:roomId/messages', (req, res) => {
  try {
    const room = rooms.find(r => r.id === req.params.roomId);
    
    if (!room) {
      return res.status(404).json({
        success: false,
        error: 'Room not found'
      });
    }
    
    const roomMessages = messages.filter(m => m.roomId === req.params.roomId);
    
    res.json({
      success: true,
      count: roomMessages.length,
      data: roomMessages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ============ SESSION BOOKING ENDPOINTS ============

// Book Session with Psychiatrist
app.post('/api/sessions/book', (req, res) => {
  try {
    const { userId, psychiatristId, date, time, notes } = req.body;
    
    const session = {
      id: Date.now().toString(),
      userId,
      psychiatristId,
      psychiatrist: psychiatristsData.find(p => p.id === psychiatristId),
      date,
      time,
      notes: notes || '',
      status: 'confirmed',
      createdAt: new Date()
    };
    
    sessions.push(session);
    
    // Add to user's bookings
    const user = Object.values(users).find(u => u.id === userId);
    if (user) user.bookings.push(session.id);
    
    res.status(201).json({
      success: true,
      data: session
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get User's Sessions
app.get('/api/sessions/user/:userId', (req, res) => {
  try {
    const userSessions = sessions.filter(s => s.userId === req.params.userId);
    
    res.json({
      success: true,
      count: userSessions.length,
      data: userSessions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Cancel Session
app.post('/api/sessions/:id/cancel', (req, res) => {
  try {
    const session = sessions.find(s => s.id === req.params.id);
    
    if (!session) {
      return res.status(404).json({
        success: false,
        error: 'Session not found'
      });
    }
    
    session.status = 'cancelled';
    
    res.json({
      success: true,
      data: session
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ============ COMMENTS ENDPOINTS ============

// Add Comment to Story
app.post('/api/stories/:storyId/comments', (req, res) => {
  try {
    const story = stories.find(s => s.id === req.params.storyId);
    
    if (!story) {
      return res.status(404).json({
        success: false,
        error: 'Story not found'
      });
    }
    
    const { content, authorId, isAnonymous } = req.body;
    
    const comment = {
      id: Date.now().toString(),
      storyId: req.params.storyId,
      content,
      authorId,
      author: isAnonymous ? 'Anonymous' : Object.values(users).find(u => u.id === authorId)?.name || 'Anonymous',
      isAnonymous,
      upvotes: 0,
      createdAt: new Date()
    };
    
    comments.push(comment);
    story.comments.push(comment.id);
    
    res.status(201).json({
      success: true,
      data: comment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get Comments for Story
app.get('/api/stories/:storyId/comments', (req, res) => {
  try {
    const storyComments = comments.filter(c => c.storyId === req.params.storyId);
    
    res.json({
      success: true,
      count: storyComments.length,
      data: storyComments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ============ ADMIN ENDPOINTS ============

// Get Platform Stats
app.get('/api/admin/stats', (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        totalUsers: Object.keys(users).length,
        totalStories: stories.length,
        totalRooms: rooms.length,
        totalMessages: messages.length,
        totalSessions: sessions.length,
        activeSessions: sessions.filter(s => s.status === 'confirmed').length,
        reportedContent: 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get All Users (Admin)
app.get('/api/admin/users', (req, res) => {
  try {
    const userData = Object.values(users).map(u => ({
      id: u.id,
      email: u.email,
      name: u.name,
      storiesCount: u.stories.length,
      bookingsCount: u.bookings.length,
      joinedAt: u.createdAt
    }));
    
    res.json({
      success: true,
      count: userData.length,
      data: userData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Delete Story (Moderation)
app.delete('/api/admin/stories/:id', (req, res) => {
  try {
    const index = stories.findIndex(s => s.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({
        success: false,
        error: 'Story not found'
      });
    }
    
    stories.splice(index, 1);
    
    res.json({
      success: true,
      message: 'Story deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Loaded ${psychiatristsData.length} psychiatrist records from dummy data`);
  console.log(`💾 Database: In-Memory (Dummy Data)`);
  console.log(`✅ New Features Available: Users, Stories, Rooms, Messages, Bookings, Comments, Admin`);
});
