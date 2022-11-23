import React from 'react'
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase"

const requerimientos = [
    {
        "categoria": "Mantenimiento Inmuebles",
        "servicios": ["Baños", "Cielo Raso", "Eléctrico", "Pared", "Puerta"]
    },
    {
        "categoria": "Mantenimiento Muebles",
        "servicios": ["Aire acondicionado", "Archivador", "Puesto de trabajo", "Silla"]
    },
    {
        "categoria": "Servicios",
        "servicios": ["Aseo", "Transporte", "Vigilancia"]
    }
]

const Solicitud = () => {
    const navigate = useNavigate();
    const [user, setUser] = React.useState(null)
    const [idArticulos, setIdArticulos] = React.useState(-1)
    const cargarServicios = (e) => {
        const opcion = e.target.value;
        console.log(opcion)
        setIdArticulos(opcion)
    }

    React.useEffect(() => {
        (auth.currentUser) ? setUser(auth.currentUser) : navigate('/login')
    }, [navigate])

    return (
        <div className="container">
            {user && 
            (
                <div className="col d-flex flex-wrap justify-content-around">
                <div className="card" style={{ width: "20rem", height: '20rem' }}>
                    <img className="card-img-top" height="180rem" src="https://blogs.iadb.org/conocimiento-abierto/wp-content/uploads/sites/10/2016/09/Task-Management1.jpg" alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">SOLICITUDES</h5>
                        <p className="card-text">Aquí podrás crear tus solicitudes</p>
                        <button type='button' className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#solicitudModal">Haz click aquí!</button>
                    </div>
                </div>

                <div className="card" style={{ width: "20rem", height: '20rem' }}>
                    <img className="card-img-top" height="180rem" src="https://static.vecteezy.com/system/resources/previews/006/409/487/non_2x/people-thinking-to-make-decision-problem-solving-and-find-creative-ideas-with-question-mark-in-flat-cartoon-background-for-poster-illustration-vector.jpg" alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">CONSULTAS</h5>
                        <p className="card-text">¿Deseas consultar algo?</p>
                        <a href="#" className="btn btn-primary">Haz click aquí!</a>
                    </div>
                </div>

                {/* Modal  */}
                <div className="modal fade" id="solicitudModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <select className="form-select mb-3" aria-label="Default select example" onClick={cargarServicios}>
                                    <option value={-1}>Categoria principal:</option>
                                    {
                                        requerimientos.map((item, i) => (
                                            <option key={i} value={i}>{item.categoria}</option>
                                        ))
                                    }
                                </select>
                                <select className="form-select" aria-label="Default select example" >
                                    {
                                        idArticulos > -1 &&
                                        (
                                            requerimientos[idArticulos].servicios.map((item, i) => (
                                                <option key={i} value={i}>{item}</option>
                                            ))
                                        )
                                    }
                                </select>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" className="btn btn-primary">Enviar</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            )
            }
        </div>
    )
}

export default Solicitud