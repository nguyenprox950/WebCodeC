import React from 'react'
import LectureMenu from '../components/LectureMenu'

const ProfileLayout = (props) => {
    return (
        <React.Fragment>
            <LectureMenu/>
            {props.children}
        </React.Fragment>
    )
}

export default ProfileLayout
