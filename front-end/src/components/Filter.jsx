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
    <div className='container-fluid filter-div my-3 py-3 px-4'>
      <div className='row'>

        <div className='col-3 d-flex align-items-center bl-1'>
          <i className="bi bi-search search me-2"></i>
          <input
            type='text'
            placeholder='Search By Job Title, Role'
            className='filter-1 flex-grow-1 px-3'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className='col-3 d-flex align-items-center position-relative bl-1'>
          <i className="bi bi-geo-alt search me-2"></i>
          {/* <input
            type='text'
            placeholder='Preferred Location'
            className='filter-1 flex-grow-1 px-3'
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          /> */}
          <select className="form-select border-0 input-pop custom-select2" onChange={(e) => setLocationFilter(e.target.value)}>
              <option value="">Preferred Location</option>
              <option value="Chennai">Chennai</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Banglore">Banglore</option>
          </select>
          
        </div>

        <div className='col-3 d-flex align-items-center font-color-filter bl-1'>
          <i className="bi bi-person search me-2"></i>
          <select
            className="form-select border-0 input-pop custom-select2"
            value={jobTypeFilter}
            onChange={(e) => setJobTypeFilter(e.target.value)}
          >
            <option value="">Job type</option>
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
