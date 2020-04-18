import React from 'react'
import TestMenu from '../components/TestMenu'

const TestLayout = (props) => {
    return (
        <React.Fragment>
            <TestMenu/>
            {props.children}
        </React.Fragment>
    )
}

export default TestLayout
