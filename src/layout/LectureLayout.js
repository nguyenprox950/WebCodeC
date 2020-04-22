import React from 'react'
import StudyCMenu from '../components/StudyCMenu'

const ProfileLayout = (props) => {
    return (
        <React.Fragment>
            <StudyCMenu/>
            {props.children}
        </React.Fragment>
    )
}

export default ProfileLayout
