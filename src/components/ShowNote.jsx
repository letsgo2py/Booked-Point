import React from 'react'

function ShowNote({content}) {
  return (
    <div className='show-content'>
        <p className='content-text'>{content}</p>
    </div>
  )
}

export default ShowNote