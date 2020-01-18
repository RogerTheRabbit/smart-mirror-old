import React from 'react'

import './Segments.css'

export default function CenterSegment(props) {
    return (
        <div className='segment CenterSegment'>
            {props.children}
        </div>
    )
}
