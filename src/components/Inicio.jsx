import React from 'react'

const Inicio = () => {
  return (
    <div className='container'>
        <div className='row mt-3    '>
            <div className='col-sm-12 col-lg-4'>
                <div className='m-2'>
                    <h1 className='align-items-center mr-5'>Nuestra historia</h1>
                    <div className='border-bottom border-warning border-5 me-5 mb-5'></div>
                </div>
                <div className='text-center'>
                    <img src="https://sfingenieria.com.co/wp-content/uploads/2019/10/foto_bloq_11.png" 
                        width='300px' height='200px' alt="bloque 11" />
                </div>
            </div>
            <div className='col bg-primary col-sm-12 col-lg-4'>
                col 2
                https://www.cuc.edu.co/la-universidadc
            </div>
            <div className='col bg-warning col-sm-12 col-lg-4'>
                col 2
            </div>

        </div>
    </div>
  )
}

export default Inicio