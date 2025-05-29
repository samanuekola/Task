import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const MONGODB_URI = "mongodb+srv://samanuesam:samanue123@cluster0.jkqgpvi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const app = express();
const port = 3201;

const connectDB = async () => {
  try {
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not provided. Please set MONGODB_URI.");
    }
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};
connectDB();

app.use(express.json());
app.use(cors());

const jobSchema = new mongoose.Schema({
  jobtitle: { type: String, required: true, trim: true },
  companyName: { type: String, required: true, trim: true },
  jobType: { type: String, required: true, trim: true },
  salaryMin: { type: Number, required: true, min: 0 },
  salaryMax: { type: Number, required: true, min: 0 },
  deadline: { type: Date, default: null },
  description: { type: String, required: true },
  location: { type: String, required: true, trim: true },
  experience: { type: String, default: '1-2 Yr Exp' }
}, {
  timestamps: true
});

const Job = mongoose.model('Job', jobSchema);

app.post('/', async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    console.error('Error creating job:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Failed to create job posting', error: error.message });
  }
});

app.get('/', async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Failed to fetch job postings', error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});


