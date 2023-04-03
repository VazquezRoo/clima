import React from 'react'
import './Loader.css'

function Loader() {

  return (
    
    <div className="lds-default self-center justify-self-center">
        <div>
            <h1 className='self-center'></h1>
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>

    </div>
  )
}

export default Loader