import React from 'react'

const Solicitud = () => {
    return (
        <>
            <br />
            <div className="container">
                <div className="col d-flex flex-wrap justify-content-around">

                    <div className="card" style={{ width: "20rem" }}>
                        <img className="card-img-top" src="https://blogs.iadb.org/conocimiento-abierto/wp-content/uploads/sites/10/2016/09/Task-Management1.jpg" alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title">SOLICITUDES</h5>
                            <p className="card-text">Aquí podrás crear tus solicitudes</p>
                            <a href="#" className="btn btn-primary">Haz click aquí!</a>
                        </div>
                    </div>

                    <div className="card" style={{ width: "20rem" }}>
                        <img className="card-img-top" src="https://static.vecteezy.com/system/resources/previews/006/409/487/non_2x/people-thinking-to-make-decision-problem-solving-and-find-creative-ideas-with-question-mark-in-flat-cartoon-background-for-poster-illustration-vector.jpg" alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title">CONSULTAS</h5>
                            <p className="card-text">¿Deseas consultar algo?</p>
                            <a href="#" className="btn btn-primary">Haz click aquí!</a>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Solicitud