import Header from '@/components/Header'
import Footer from '@/components/homepage/Footer'
import CreateJob from '@/components/jobs/CreateJob'

import React from 'react'
const create = () => {
  return (
    <>
        <Header/>
        <CreateJob/>
        <Footer/>
    </>
  )
}

export default create