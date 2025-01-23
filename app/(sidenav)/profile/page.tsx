import React from 'react'
import ProfileGrid from '@/components/profile/profile-grid'
//TODO: Socials account linked, password change, email change, delete account, alerts & notifications, email notifications, language, timezone, sessions 
import { lusitana } from '@/components/fonts'

export default function Page() {
    return (
        <main className='space-y-4'>
            <h1 className={`${lusitana.className} text-4xl `}>Profile page</h1>
            <ProfileGrid />
        </main>
    )
}