import React from 'react'

import './Segments.css'

export default function Segment(props) {
    return (
        <div className='segment leftSegment'>
            {props.children}
        </div>
    )
}
