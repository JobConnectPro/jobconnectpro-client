import Header from '@/components/Header'
import Footer from '@/components/homepage/Footer'
import JobList from '@/components/jobs/JobList'
import Layout from "@/components/layout/Dashboard";


import React from 'react'
const jobList = () => {
  return (
    <Layout>
        <JobList/>
    </Layout>
  )
}

export default jobList