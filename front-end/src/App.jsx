import { useState, useEffect } from 'react';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Filter from './components/Filter';
import Jobs from './components/Jobs';
import Popup from './components/Popup';
import jobimage1 from './images/image 77.png';
import axios from 'axios';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [jobtitle, setJobtitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobType, setJobType] = useState('');
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [errors, setErrors] = useState({});
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('');
  const [salaryRangeFilter, setSalaryRangeFilter] = useState(0);

  const API_URL = 'https://task-api-lime.vercel.app/';

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setErrors({});
    setShowModal(false);
    resetFormFields();
  };

  const resetFormFields = () => {
    setJobtitle('');
    setCompanyName('');
    setJobType('');
    setSalaryMin('');
    setSalaryMax('');
    setDeadline('');
    setDescription('');
    setNewLocation('');
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(API_URL);
        const fetchedJobs = response.data.map(job => ({
          id: job._id,
          image: jobimage1,
          time: new Date(job.createdAt).toLocaleDateString(),
          jobtitle: job.jobtitle,
          exp: job.experience || 'Not specified',
          location: job.location,
          salaryMin: job.salaryMin,
          salaryMax: job.salaryMax,
          package: `₹${(job.salaryMax)/100000}LPA`,
          jobType: job.jobType,
          des: job.description
        }));
        setJobs(fetchedJobs);
        setFilteredJobs(fetchedJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    let currentFilteredJobs = jobs;

    if (searchQuery) {
      currentFilteredJobs = currentFilteredJobs.filter(job =>
        job.jobtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.des.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (locationFilter) {
      currentFilteredJobs = currentFilteredJobs.filter(job =>
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (jobTypeFilter) {
      currentFilteredJobs = currentFilteredJobs.filter(job =>
        job.jobType && job.jobType.toLowerCase() === jobTypeFilter.toLowerCase()
      );
    }

    if (salaryRangeFilter > 0) {
      currentFilteredJobs = currentFilteredJobs.filter(job =>
        (typeof job.salaryMin === 'number' && (job.salaryMin/12) >= salaryRangeFilter) ||
        (typeof job.salaryMax === 'number' && (job.salaryMax/12) >= salaryRangeFilter)
      );
    }

    setFilteredJobs(currentFilteredJobs);
  }, [jobs, searchQuery, locationFilter, jobTypeFilter, salaryRangeFilter]);

  const handlePublish = async () => {
    const validationErrors = {};

    if (!jobtitle.trim()) validationErrors.jobtitle = 'Job title is required';
    if (!companyName.trim()) validationErrors.companyName = 'Company name is required';
    if (!newLocation.trim()) validationErrors.location = 'Location is required';
    if (!jobType) validationErrors.jobType = 'Job type is required';
    if (!salaryMin || isNaN(salaryMin) || parseFloat(salaryMin) <= 0) validationErrors.salaryMin = 'Enter a valid minimum salary';
    if (!salaryMax || isNaN(salaryMax) || parseFloat(salaryMax) <= 0) validationErrors.salaryMax = 'Enter a valid maximum salary';
    if (parseFloat(salaryMin) > parseFloat(salaryMax)) validationErrors.salaryMax = 'Max salary cannot be less than min salary';
    if (!description.trim()) validationErrors.description = 'Job description is required';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const newJobData = {
        jobtitle,
        companyName,
        jobType,
        salaryMin: parseFloat(salaryMin),
        salaryMax: parseFloat(salaryMax),
        deadline,
        description,
        location: newLocation,
      };

      const response = await axios.post(API_URL, newJobData);

      const createdJob = response.data;
      const formattedJob = {
        id: createdJob._id,
        image: jobimage1,
        time: new Date(createdJob.createdAt).toLocaleDateString(),
        jobtitle: createdJob.jobtitle,
        exp: createdJob.experience || '1-3 yr Exp',
        location: createdJob.location,
        salaryMin: createdJob.salaryMin,
        salaryMax: createdJob.salaryMax,
        package: `₹${(createdJob.salaryMax)/100000}LPA`,
        des: createdJob.description
      };

      setJobs(prev => [...prev, formattedJob]);
      handleClose();
    } catch (error) {
      console.error('Error publishing job:', error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert('Failed to publish job. Please try again.');
      }
    }
  };

  return (
    <div className='container-fluid'>
      <Header onCreateJobClick={handleShow} />
      <Filter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        jobTypeFilter={jobTypeFilter}
        setJobTypeFilter={setJobTypeFilter}
        salaryRangeFilter={salaryRangeFilter}
        setSalaryRangeFilter={setSalaryRangeFilter}
      />
      <Jobs jobs={filteredJobs} setJobs={setJobs} />
      <Popup
        show={showModal}
        handleClose={handleClose}
        setJobtitle={setJobtitle}
        setCompanyName={setCompanyName}
        setJobType={setJobType}
        setSalaryMin={setSalaryMin}
        setSalaryMax={setSalaryMax}
        setDeadline={setDeadline}
        setDescription={setDescription}
        setNewLocation={setNewLocation}
        jobtitle={jobtitle}
        companyName={companyName}
        jobType={jobType}
        salaryMin={salaryMin}
        salaryMax={salaryMax}
        deadline={deadline}
        description={description}
        newLocation={newLocation}
        handlePublish={handlePublish}
        errors={errors}
      />
    </div>
  );
}

export default App;
