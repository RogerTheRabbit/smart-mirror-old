import React from 'react'

import './Segments.css'

export default function RightSegment(props) {
    return (
        <div className='segment rightSegment'>
            {props.children}
        </div>
    )
}
