import React from 'react';

const Filter = ({
  searchQuery,
  setSearchQuery,
  locationFilter,
  setLocationFilter,
  jobTypeFilter,
  setJobTypeFilter,
  salaryRangeFilter,
  setSalaryRangeFilter
}) => {
  return (
    <div className='container-fluid filter-div my-3'>
      <div className='row'>

        <div className='col-3 d-flex align-items-center'>
          <i className="bi bi-search search me-2"></i>
          <input
            type='text'
            placeholder='Search By Job Title, Role'
            className='filter-1 flex-grow-1 px-3'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className='col-3 d-flex align-items-center position-relative'>
          <i className="bi bi-geo-alt search me-2"></i>
          <input
            type='text'
            placeholder='Preferred Location'
            className='filter-1 flex-grow-1 px-3'
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
          <i className="bi bi-chevron-compact-down position-absolute end-0 pe-3"></i>
        </div>

        <div className='col-3 d-flex align-items-center font-color-filter'>
          <i className="bi bi-person search me-2"></i>
          <label className="me-auto">Job type</label>
          <select
            className="form-select w-auto border-0 ms-2"
            value={jobTypeFilter}
            onChange={(e) => setJobTypeFilter(e.target.value)}
          >
            <option value=""></option>
            <option value="FullTime">FullTime</option>
            <option value="PartTime">PartTime</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        <div className='col-3 d-flex flex-column align-items-start salary-slider-container'>
          <div className="d-flex justify-content-between w-100 mb-1">
            <label htmlFor="salaryRange" className="form-label mb-0">Salary Per Month</label>
            <span className="salary-value">₹{(salaryRangeFilter / 1000).toFixed(0)}k</span>
          </div>
          <input
            type="range"
            id="salaryRange"
            className="form-range styled-range"
            min="100"
            max="100000"
            step="100"
            value={salaryRangeFilter}
            onChange={(e) => setSalaryRangeFilter(parseFloat(e.target.value))}
          />
        </div>

      </div>
    </div>
  );
}

export default Filter;
