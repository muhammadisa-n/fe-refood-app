import React from 'react'
import { useParams } from 'react-router-dom'

const AdminDetailProductPage = () => {
    const { id } = useParams()
    return (
        <div>
            <h1>detail {id} </h1>
        </div>
    )
}

export default AdminDetailProductPage
