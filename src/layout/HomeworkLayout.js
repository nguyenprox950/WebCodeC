import React from 'react'
import HomeworkMenu from '../components/HomeworkMenu'

const HomeworkLayout = (props) => {
    return (
        <React.Fragment>
            <HomeworkMenu/>
            {props.children}
        </React.Fragment>
    )
}

export default HomeworkLayout
