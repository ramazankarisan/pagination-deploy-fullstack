import React from 'react'

function NavigationBar({title="Users App"}) {
    return (
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between p-3 px-md-4 mb-3 bg-info border-bottom shadow-sm">
         <h5 className="my-0 mr-md-auto font-weight-normal text-light">{title} </h5>
          <nav className="my-2 my-md-0 me-md-3">
              <a href="#" className="p-2 text-dark">Homepage</a>
          </nav>
         </div>  
      );
  }
 

export default NavigationBar