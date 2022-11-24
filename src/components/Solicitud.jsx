import React from 'react'
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"
import {firebase} from '../firebase';

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
    const [lista, setLista] = React.useState([])
    const [idArticulos, setIdArticulos] = React.useState(-1)
    const [categ, setCateg] = React.useState(-1)
    const [fecha, setFecha] = React.useState('')
    const [descripcion, setDescripcion] = React.useState('')
    const [categoria, setCategoria] = React.useState('')
    const [ubicacion, setUbicacion] = React.useState('')
    const [articulo, setArticulo] = React.useState('')
    const [editar, setEditar] = React.useState(true)
    const [id, setId] = React.useState('')

    const cargarServicios = (e) => {
        const opcion = e.target.value;
        switch (opcion) {
            case '0':
                setCategoria('Mantenimiento Inmuebles')
                break;
            case '1':
                setCategoria('Mantenimiento Muebles')
                break;
            case '2':
                setCategoria('Servicios')
                break;
        }
        setIdArticulos(opcion)
    }

    const cargarArticulos = (e)=>{
        setArticulo(e.target.value);
    }

    const guardarDatos = async (e)=>{
        e.preventDefault();
        if (!categoria || categoria == -1){
            alert("Seleccione una categoria")
            return
        }
        if (!articulo || articulo == -1){
            alert("Seleccione un servicio")
            return
        }
        if (!descripcion.trim()) {
          alert("Ingrese la descripción de la petición")
          return
        }
        if (!ubicacion.trim()) {
          alert("Ingrese la ubicación de la incidencia")
          return
        }
        if(!fecha){
            alert("Ingrese una fecha")
            return
        }
        
        try {
            const db = firebase.firestore()
            const email = user.email;
            const idUser = user.uid;
            const nuevoDescripcion = {idUser ,descripcion, ubicacion, fecha, email, categoria, articulo}
            await db.collection('Solicitudes').add(nuevoDescripcion)
            setDescripcion('')
            setUbicacion('')
            setCategoria(-1)
            setIdArticulos(-1)
            setFecha('')
            setCateg(-1)

        } catch (error) {
            alert(error)
        }
       
        }
    
    const Modoeditar = () =>{
        setEditar(!editar)
    }

    const actualizar = (elemento)=>{
        setId(elemento.id)
        actualizarDato()
    }

    const actualizarDato = async (e)=>{
        e.preventDefault();
        if (!categoria || categoria == -1){
            alert("Seleccione una categoria")
            return
        }
        if (!articulo || articulo == -1){
            alert("Seleccione un servicio")
            return
        }
        if (!descripcion.trim()) {
          alert("Ingrese la descripción de la petición")
          return
        }
        if (!ubicacion.trim()) {
          alert("Ingrese la ubicación de la incidencia")
          return
        }
        if(!fecha){
            alert("Ingrese una fecha")
            return
        }
        try {
            const db = firebase.firestore()
            await db.collection('Solicitudes').doc(id).update({descripcion, ubicacion, fecha, categoria, articulo})
            const listaEdit = lista.map((elemnto)=>elemnto.id === id? {id, descripcion, ubicacion, fecha, categoria, articulo}: elemnto)
            setLista(listaEdit)
        } catch (error) {
            alert(error)
        }
    }

    const eliminarDato = async (id) =>{
        try {
            const db = firebase.firestore()
            await db.collection('Solicitudes').doc(id).delete()
            const filterList = lista.filter((i)=>i.id !== id)
            setLista(filterList)
        } catch (error) {
            alert(error)
        }
    }

    React.useEffect(()=>{
        const obtDatos = async ()=>{
            try {
                const db = firebase.firestore();
                const data = await db.collection('Solicitudes').get()
                const arraydata = data.docs.map((doc)=>({id:doc.id,...doc.data()}))
                const filtro = [];
                for (let i = 0; i < arraydata.length; i++) {
                    if(arraydata[i].idUser === auth.currentUser.uid){
                        filtro.push(arraydata[i])
                    }
                }
                setLista(filtro)
            } catch (error) {
                alert(error)
            }
        }
        obtDatos()
    },[])

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
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalConsulta">
                            Haz click aquí!
                        </button>
                    </div>
                </div>

                {/* Modal Solicitudes */}
                <div className="modal fade" id="solicitudModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">SOLICITUDES</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <select className="form-select mb-3" aria-label="Default select example" onClick={cargarServicios}>
                                    <option value={categ}>Categoria principal:</option>
                                    {
                                        requerimientos.map((item, i) => (
                                            <option key={i} value={i} >{item.categoria}</option>
                                        ))
                                    }
                                </select>
                                <select className="form-select mb-3" aria-label="Default select example" onClick={cargarArticulos} >
                                    <option value={-1}>Servicios:</option>
                                    {
                                        idArticulos > -1 &&
                                        (
                                            requerimientos[idArticulos].servicios.map((item, i) => (
                                                <option key={i} value={item}>{item}</option>
                                            ))
                                        )
                                    }
                                </select>
                                <div className="input-group">
                                    <span className="input-group my-1">Descripción de la solicitud:</span>
                                    <textarea className="form-control mb-2" onChange={(e)=>{setDescripcion(e.target.value)}} 
                                    value={descripcion} aria-label="With textarea"></textarea>
                                </div>
                                <div className='input-group'>
                                    <span className="input-group my-1">Ubicación dentro de la empresa:</span>
                                    <textarea className="form-control mb-2" onChange={(e)=>{setUbicacion(e.target.value)}} 
                                    value={ubicacion} aria-label="With textarea" placeholder='donde será prestado el servicio'></textarea>
                                </div>
                                <span className="input-group my-2">Fecha:</span>
                                <input className='form-control' type="date" value={fecha} name="fecha" onChange={(e)=>{setFecha(e.target.value)}} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" onClick={guardarDatos} className="btn btn-primary">Enviar</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Modal Consultas */}
                <div className="modal fade" id="modalConsulta" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Consultas</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <table className="table table-hover table-primary">
                                <thead>
                                    <tr>
                                        <th scope='col'>Categoria</th>
                                        <th scope='col'>Servicio</th>
                                        <th scope='col'>Descripción</th>
                                        <th scope='col'>Ubicación</th>
                                        <th scope='col'>Fecha</th>
                                        <th scope='col'>
                                            <button className="btn btn-sm btn-outline-dark float-end" onClick={()=>Modoeditar()} ><i className="bi bi-pencil p-1"></i></button>
                                            </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        lista.map((element, i)=>(
                                            <tr key={i}>
                                                <td>
                                                    {
                                                        editar?
                                                        <input className='form-control form-control-sm' value={element.categoria} disabled = {editar}/>
                                                        :
                                                        <select className="form-select-sm" aria-label="Default select example" onClick={cargarServicios}>
                                                            <option value={categ}>Categoria principal:</option>
                                                            {
                                                                requerimientos.map((item, i) => (
                                                                    <option key={i} value={i} >{item.categoria}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        editar?
                                                        <input className='form-control form-control-sm' value={element.articulo} disabled = {editar} />:
                                                        <select className="form-select-sm " aria-label="Default select example" onClick={cargarArticulos} >
                                                            <option value={-1}>Servicios:</option>
                                                            {
                                                                idArticulos > -1 &&
                                                                (
                                                                    requerimientos[idArticulos].servicios.map((item, i) => (
                                                                        <option key={i} value={item}>{item}</option>
                                                                    ))
                                                                )
                                                            }
                                                        </select>
                                                    }
                                                </td>
                                                <td>
                                                    <input className='form-control form-control-sm' value={element.descripcion} disabled = {editar} />
                                                </td>
                                                <td>
                                                    <input className='form-control form-control-sm' value={element.ubicacion} disabled = {editar} />
                                                </td>
                                                <td>
                                                    <input className='form-control form-control-sm' type="date" value={element.fecha} name="fecha" onChange={(e)=>{setFecha(e.target.value)}} disabled = {editar} />
                                                    
                                                </td>
                                                <td>
                                                <button className="btn btn-sm btn-outline-info ms-1 float-end" onClick={()=>actualizar(element)}><i className="bi bi-check-lg"></i></button>
                                                <button className="btn btn-sm btn-outline-danger ms-1 float-end"
                                                    onClick={()=>eliminarDato(element.id)}><i className="bi bi-trash3"></i></button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" className="btn btn-primary">Aceptar</button>
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