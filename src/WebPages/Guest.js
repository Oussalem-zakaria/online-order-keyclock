import React from 'react'
import Header from '../Components/Essentiel/Header'
import Welcome from './Welcome'

function Guest() {
    return (
        <>
            <Header userType={"guest"} />
            <Welcome />
        </>
    )
}

export default Guest