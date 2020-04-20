import React from 'react'
import StudyC from '../components/StudyC'

const ProfileLayout = (props) => {
    return (
        <React.Fragment>
            <StudyC/>
            {props.children}
        </React.Fragment>
    )
}

export default ProfileLayout
