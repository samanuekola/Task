import React from 'react';
import jobimage1 from '../images/image 77.png';

const Jobs = ({ jobs, setJobs }) => {
  return (
    <div className='container-fluid my-5 px-4'>
      <div className='row p-2 g-4'>
        {jobs.map((job, index) => (
          <div className='col-3 job-card  shadow-sm' key={index}>
            <div className='p-3 rounded  '> 
              <div className='d-flex justify-content-between'>
                <div>
                  <img src={jobimage1} className='job-img' alt="Job" />
                </div>
                <div>
                  <button className='time-job-btn btn btn-light'>{job.time}</button>
                </div>
              </div>
              <div className='my-3 py-3'>
                <h6 className='font2-job'>{job.jobtitle}</h6>
              </div>
              <div className='d-flex justify-content-between'>
                <div>
                  <i className="bi bi-person-plus search font1-job px-1"></i>
                  <p className='d-inline search font1-job'>{job.exp}</p>
                </div>
                <div>
                  <i className="bi bi-buildings search font1-job px-1"></i>
                  <p className='d-inline search font1-job'>Onsite</p>
                </div>
                <div>
                  <i className="bi bi-layers search font1-job px-1"></i>
                  <p className='d-inline search font1-job'>{job.package}</p>
                </div>
              </div>
              <div className='py-4'>
                <p className='p-points m-0 font3-job'>{job.des}</p>

              </div>
              <div>
                <button className='btn-apply btn btn-primary w-100'>Apply Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
