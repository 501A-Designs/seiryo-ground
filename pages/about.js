import { useRouter } from 'next/router'
import React from 'react'
import Button from '../lib/Button'

export default function About() {
    const router = useRouter();
    
    return (
        <main>
            <Button onClick={()=> router.push('/')}>戻る</Button>
            <h1 className="seiryoGroundFont">
                ABOUT
            </h1>
        </main>
    )
}
