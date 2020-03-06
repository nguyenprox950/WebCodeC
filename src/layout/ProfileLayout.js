import React from 'react'
import ProfileMenu from '../components/ProfileMenu'

const ProfileLayout = (props) => {
    return (
        <React.Fragment>
            <ProfileMenu/>
            {props.children}
        </React.Fragment>
    )
}

export default ProfileLayout
