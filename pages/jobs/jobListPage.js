import Header from '@/components/Header'
import Footer from '@/components/homepage/Footer'
import JobList from '@/components/jobs/JobList'


import React from 'react'
const jobList = () => {
  return (
    <>
        <Header/>
        <JobList/>
        <Footer/>
    </>
  )
}

export default jobList