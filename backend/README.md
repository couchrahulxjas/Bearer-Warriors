# Warriors Backend - MongoDB Psychiatrist Database Setup

## Overview
This backend provides a Node.js/Express API server for managing psychiatrist data stored in MongoDB.

## Features
✅ 20 real psychiatrist records with complete professional information
✅ REST API endpoints to retrieve psychiatrist data
✅ MongoDB integration with indexes
✅ CORS enabled for frontend integration
✅ Health check endpoint

## Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure MongoDB
Update `.env` file with your MongoDB connection string:
```env
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB_NAME=warriors_db
PORT=5000
```

**MongoDB Setup Options:**
- **Local**: Install MongoDB Community Edition from https://www.mongodb.com/try/download/community
- **Cloud**: Use MongoDB Atlas (free tier available at https://www.mongodb.com/cloud/atlas)

### 3. Seed the Database with 20 Psychiatrists
```bash
npm run seed
```

This will:
- Create a collection called `psychiatrists`
- Insert 20 realistic psychiatrist records with:
  - Professional information (name, email, phone)
  - Medical credentials (license number, education)
  - Specialization details
  - Ratings and reviews
  - Availability schedule
  - Languages spoken
  - Profile images

### 4. Start the Server
```bash
npm run dev      # Development mode with auto-reload
# or
npm start        # Production mode
```

The server will run on `http://localhost:5000`

## Available API Endpoints

### Get All Psychiatrists
```
GET /api/psychiatrists
```
Returns all 20 psychiatrist records with full details.

### Get Specific Psychiatrist
```
GET /api/psychiatrists/:id
```
Returns a single psychiatrist by MongoDB ObjectID.

### Get Psychiatrists by Specialization
```
GET /api/psychiatrists/specialization/:spec
```
Examples:
- `/api/psychiatrists/specialization/Depression%20%26%20Anxiety`
- `/api/psychiatrists/specialization/PTSD%20%26%20Trauma`

### Health Check
```
GET /api/health
```

### Add New Psychiatrist
```
POST /api/psychiatrists
Content-Type: application/json

{
  "name": "Dr. Name",
  "email": "email@example.com",
  "specialization": "Specialization",
  ...
}
```

## Sample Psychiatrist Data Structure
```json
{
  "_id": "ObjectId",
  "name": "Dr. Sarah Mitchell",
  "email": "sarah.mitchell@psychiatry.com",
  "phone": "+1-202-555-0142",
  "specialization": "Depression & Anxiety",
  "yearsOfExperience": 15,
  "education": "M.D. from Harvard Medical School",
  "licenseNumber": "PSY-2008-MA-001",
  "bio": "Specializes in cognitive behavioral therapy...",
  "ratePerHour": 150,
  "languages": ["English", "Spanish"],
  "availability": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  "rating": 4.8,
  "reviewCount": 127,
  "imageUrl": "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
}
```

## Psychiatrist Data Included (20 Specialists)

1. **Dr. Sarah Mitchell** - Depression & Anxiety (4.8 ⭐)
2. **Dr. James Chen** - Bipolar Disorder (4.9 ⭐)
3. **Dr. Emily Rodriguez** - PTSD & Trauma (4.7 ⭐)
4. **Dr. Michael O'Brien** - Schizophrenia & Psychosis (4.6 ⭐)
5. **Dr. Priya Patel** - Child & Adolescent Psychiatry (4.9 ⭐)
6. **Dr. David Thompson** - Addiction & Substance Abuse (4.8 ⭐)
7. **Dr. Maria Gonzalez** - Geriatric Psychiatry (4.7 ⭐)
8. **Dr. Robert Chang** - OCD & Anxiety Disorders (4.8 ⭐)
9. **Dr. Jennifer Williams** - Women's Mental Health (4.9 ⭐)
10. **Dr. Alexander Kowalski** - Sleep Disorders & Psychiatry (4.7 ⭐)
11. **Dr. Lisa Anderson** - Eating Disorders (4.8 ⭐)
12. **Dr. Christopher Moore** - Personality Disorders (4.6 ⭐)
13. **Dr. Natasha Volkov** - Psychosis & Schizophrenia (4.8 ⭐)
14. **Dr. Marcus Johnson** - Trauma & PTSD (4.9 ⭐)
15. **Dr. Sophia Leoni** - Depression (4.7 ⭐)
16. **Dr. Vincent Park** - Anxiety Disorders (4.8 ⭐)
17. **Dr. Eleanor Hunt** - Psychotherapy & Mood Disorders (4.9 ⭐)
18. **Dr. Hassan Mustafa** - Psychotic Disorders (4.7 ⭐)
19. **Dr. Rachel Green** - Integrative & Holistic Psychiatry (4.8 ⭐)
20. **Dr. William Stewart** - Substance Use Disorders (4.9 ⭐)

## Frontend Integration

Update your frontend to call the backend API:

```typescript
// Example: Fetch all psychiatrists
const response = await fetch('http://localhost:5000/api/psychiatrists');
const data = await response.json();
console.log(data.data); // Array of psychiatrists
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check `MONGODB_URI` in `.env`
- For MongoDB Atlas, ensure IP whitelist includes your connection

### Port Already in Use
Change `PORT` in `.env` to an available port (e.g., 5001)

### Seed Script Fails
- Verify MongoDB is running
- Check database connection string
- Ensure write permissions to database

## Development

```bash
# Install dependencies
npm install

# Run in development mode (auto-reload on file changes)
npm run dev

# Run production server
npm start

# Seed database
npm run seed
```

## Architecture

```
backend/
├── server.js          # Express server & API routes
├── seed.js            # Database seeding script
├── package.json       # Dependencies
├── .env               # Configuration
└── .env.example       # Example configuration
```

## Database Indexes
- `psychiatrists.email` (unique)
- `psychiatrists.specialization` (for faster filtering)

## License
MIT

## Support
For issues or questions, contact the development team.
