import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../Components/Layout'

export default function unauthorized() {
    const router = useRouter();
    const { message } = router.query;
    return (
        <Layout title="Unauthorized Page">
            <h1 className='text-xl'>Access Denied</h1>
            {message && <div className='text-red-500 mb-4 '> {message} </div>}

        </Layout>
    )
}