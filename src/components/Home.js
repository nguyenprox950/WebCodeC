import React, { Component } from 'react'
import Carousel from './Carousel'
import Welcome from './Welcome'

export default class Home extends Component {
    render() {
        return (
            <div>
                <Carousel/>
                <Welcome/>
            </div>
        )
    }
}
