import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const Popup = ({
  show,
  handleClose,
  setJobtitle,
  setCompanyName,
  setJobType,
  setSalaryMin,
  setSalaryMax,
  setDeadline,
  setDescription,
  setNewLocation,
  handlePublish,
  errors
}) => {
  return (
    <Modal show={show} onHide={handleClose} className='model-width'>
      <Modal.Header className='align-items-center justify-content-center'>
        <Modal.Title>Create Job Opening</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='row my-3'>
          <div className='col'>
            <label>Job Title</label>
            <input type='text' className='form-control border input-pop' placeholder='Full Stack Developer'
              onChange={(e) => setJobtitle(e.target.value)} />
            {errors.jobtitle && <small className="text-danger">{errors.jobtitle}</small>}
          </div>
          <div className='col'>
            <label>Company Name</label>
            <input type='text' className='form-control border input-pop' placeholder='Amazon, Microsoft, Swiggy'
              onChange={(e) => setCompanyName(e.target.value)} />
            {errors.companyName && <small className="text-danger">{errors.companyName}</small>}
          </div>
        </div>

        <div className='row my-3'>
          <div className='col'>
            <label>Location</label>
            <input type='text' className='form-control border input-pop' placeholder='Choose Preferred Location'
              onChange={(e) => setNewLocation(e.target.value)} />
            {errors.location && <small className="text-danger">{errors.location}</small>}
          </div>
          <div className='col'>
            <label>Job Type</label>
            <select className="form-select border input-pop" onChange={(e) => setJobType(e.target.value)}>
              <option value="">Select</option>
              <option value="FullTime">FullTime</option>
              <option value="PartTime">PartTime</option>
              <option value="Contract">Contract</option>
            </select>
            {errors.jobType && <small className="text-danger">{errors.jobType}</small>}
          </div>
        </div>

        <div className='row my-3'>
          <div className='col'>
            <label>Salary Range</label>
            <div className='d-flex'>
              <input type='text' className='form-control me-2 input-pop' placeholder='₹ 0'
                onChange={(e) => setSalaryMin(e.target.value)} />
              <input type='text' className='form-control input-pop' placeholder='₹ 12,00,000'
                onChange={(e) => setSalaryMax(e.target.value)} />
            </div>
            {errors.salaryMin && <small className="text-danger d-block">{errors.salaryMin}</small>}
            {errors.salaryMax && <small className="text-danger d-block">{errors.salaryMax}</small>}
          </div>
          <div className='col'>
            <label>Application Deadline</label>
            <input type='date' className='form-control input-pop'
              onChange={(e) => setDeadline(e.target.value)} />
          </div>
        </div>

        <div className='row'>
          <div className='col-12'>
            <label className='d-block'>Job Description</label>
            <textarea className='form-control' rows="8" placeholder='Please share a description...'
              onChange={(e) => setDescription(e.target.value)} />
            {errors.description && <small className="text-danger">{errors.description}</small>}
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className='justify-content-between'>
        <Button variant="secondary" onClick={handleClose} className='btn-draft'>
          Save Draft
        </Button>
        <Button variant="primary" onClick={handlePublish} className='btn-submit'>
          Publish
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Popup;
