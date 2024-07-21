import React from 'react'
import isbn_list from './isbn.js'

function ISBN(props) {
    const bName = props.bName;
    const isbn = props.B_isbn;

    const handleClick = (e) => {
        const isbn_Num = e.target.id;
        isbn_list.push(isbn_Num)
    }

  return (
    <div>
        <div className='isbn-data'>
            <div>
                <h1>{bName}</h1>
                <p>{isbn}</p>
            </div>
            <div>
                <button id = {isbn} className='isbn-btn' onClick={handleClick}>Add</button>
            </div>
        </div>
    </div>
  )
}

export default ISBN