import React from 'react';
import image1 from '../images/Frame 54.png'
const Header = ({ onCreateJobClick }) => {
  return (
    <div className='container-fluid py-2'>
        <div className='row'>
            <div className='col-2'></div>
            <div className='col-8 d-flex align-items-center justify-content-between p-3 border rounded-pill '>
                    <img src={image1} className='image-fluid'/>
                    <h6 className="h4-header" >Home</h6 >
                    <h6 className="h4-header">Find Jobs</h6>
                    <h6 className="h4-header">Find Talents</h6>
                    <h6 className="h4-header">About us</h6>
                    <h6 className="h4-header">Testimonials</h6>
                    <button className='btn-create' onClick={onCreateJobClick}>Create Jobs</button>
            </div>
            <div className='col-2'></div>
        </div>
    </div>
  );
}

export default Header;
