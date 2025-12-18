import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
export default function NotFound() {
  return (
    <div className='px-3 '>
      <div className='row min-vh-100 align-items-center justify-content-center p-5'>
        <div className='col-12 col-xl-10 col-xxl-8'>
          <div className='row justify-content-center align-items-center g-5'>
            <div className='col-12 col-lg-6 text-center d-none d-lg-block order-lg-1'>
              <Image src="https://prium.github.io/phoenix/v1.24.0/assets/img/spot-illustrations/404-illustration.png" width={400} height={400} alt='404 not found' className='img-fluid w-lg-100 ' quality={100} />
            </div>
            <div className='col-12 col-lg-6 text-center text-lg-start'>
              <Image src="https://prium.github.io/phoenix/v1.24.0/assets/img/spot-illustrations/404.png" width={500} height={350} alt='logo' className='mb-4 w-75 h-auto' quality={100} />
              <h2 className='text-body-secondary fw-bolder mb-3'>Page Missing!</h2>
              <p className='text-body mb-5'>But no worries! Our ostrich is looking everywhere <br /> while you wait safely. </p>
              <Link href="/" className='btn btn-lg btn-primary' >Go Home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const metadata = {
  title: '404 Not Found'
}