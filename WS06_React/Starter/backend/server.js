const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();


const postsRouter = require('./routes/posts');

const app = express();
const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');

// ─── TODO: Write the connectToDatabase function ──────────────────────────────
// This function should:
//   1. Check if process.env.MONGODB_URI exists
//      - If missing, warn the user and return early
//      - Message: "MONGODB_URI is missing. Create a .env file in backend/ before testing database features."
//   2. Use a try-catch block to safely connect to MongoDB with mongoose.connect()
//      - Pass options: { dbName: 'blog' }
//      - Log success: "Connected to MongoDB"
//      - Log error: "MongoDB connection error: <error.message>"
//   3. Return a Promise (async/await)
//
// Hint: See WS05 Server.js for the completed version

async function connectToDatabase() {
  // Your code here
  if (!process.env.MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined in the environment variables.');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: 'blog' });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}


app.locals.publicDir = publicDir;
app.use(express.json());
app.use(express.static(publicDir));


app.use('/api/posts', postsRouter);

app.use((req, res) => {
  res.status(404).sendFile(path.join(publicDir, '404.html'));
});

app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).sendFile(path.join(publicDir, '500.html'));
});

connectToDatabase().then(() => {
  app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
    console.log('Mounted routers:');
    console.log('  / -> routes/pages.js');
    console.log('  /api/posts -> routes/posts.js');
  });
});
