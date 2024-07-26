import axios from 'axios'
import React, { useState } from 'react'

const GetLocationPage = () => {
    const [userLocation, setUserLocation] = useState(null)
    const [address, setAddress] = useState('')
    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords
                    setUserLocation({ latitude, longitude })

                    getAddressFromCoordinates(latitude, longitude)
                },
                (error) => {
                    console.error('Error getting user location:', error)
                }
            )
        } else {
            console.error('Geolocation is not supported by this browser.')
        }
    }
    const getAddressFromCoordinates = async (latitude, longitude) => {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`

        try {
            const response = await axios.get(url)
            const data = response.data
            if (data && data.address) {
                console.log(data)
                const { road, hamlet, village, county, state } = data.address
                const fullAddress = `${road},${village}, ${county}, ${state}`
                setAddress(fullAddress)
            } else {
                console.error('No address found')
            }
        } catch (error) {
            console.error('Error fetching address:', error)
        }
    }

    return (
        <div>
            <h1>Geolocation App</h1>
            {/* create a button that is mapped to the function which retrieves the users location */}
            <button onClick={getUserLocation}>Get User Location</button>
            {/* if the user location variable has a value, print the users location */}
            {userLocation && (
                <div>
                    <h2>User Location</h2>
                    <p>Latitude: {userLocation.latitude}</p>
                    <p>Longitude: {userLocation.longitude}</p>
                </div>
            )}
            {/* if the user location variable has a value, print the users location */}
            {address && (
                <div>
                    <h2>Address</h2>
                    <p>{address}</p>
                </div>
            )}
        </div>
    )
}

export default GetLocationPage
