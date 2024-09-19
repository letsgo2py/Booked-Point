import React from 'react'

function DoEdit({content, setContent}) {
  return (
    <>
        <div className='text-area'>
            <label id="note-label" htmlFor="content">Note:</label>
            <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            ></textarea>
        </div>
    </>
  )
}

export default DoEdit