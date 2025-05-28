import React from 'react'
import Container from './components/Container'
import AdminNav from './components/AdminNav'
import Footer from './components/Footer'
import SideBar from './components/SideBar'
import Content from './components/Content'

function page() {
  return (
        <Container>
            <AdminNav />
            <div className='flex-grow'>
              <div className='container mx-auto'>
                 <div className='flex justify-between mt-10'>
                    <SideBar />
                    <Content />
                 </div>
              </div>
            </div>
            <Footer />
        </Container>
  )
}

export default page
