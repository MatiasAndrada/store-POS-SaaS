import React from 'react'

const page = ({ searchParams }: { searchParams?: { token: string } }) => {
    const token = searchParams?.token || ""
    return (
        <div>{token}</div>
    )
}

export default page