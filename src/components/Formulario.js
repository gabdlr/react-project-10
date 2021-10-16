import React, { useContext, useState } from 'react'
import { CategoriasContext } from '../context/CategoriasContext';
import { RecetasContext } from '../context/RecetasContext';

const Formulario = () => {

    //Utilizamos el context y extraemos los valores que vienen de el
    const context = useContext(CategoriasContext);
    const { categorias } = context;
    const { buscarRecetas, guardarConsultar } = useContext(RecetasContext);

    //Creamos un state local para leer la seleccion/input del usuario
    const [ busqueda, guardarBusqueda ] = useState({
        ingrediente:"",
        categoria:""
    })

    //funcion para leer los inputs
    const obtenerDatosReceta = e => {
           guardarBusqueda({
               ...busqueda,
               [e.target.name]: e.target.value
           });        
    }
    return ( 
        <form 
            className="col"
            onSubmit={ e => {
                e.preventDefault();
                buscarRecetas(busqueda);
                guardarConsultar(true);
                }
            }
        >
            <fieldset className="text-center">
                <legend>Busca bébidas por categoría o ingrediente</legend>
            </fieldset>
            <div className="row mt-4">
                <div className="col-md-4">
                    <input 
                    type="text"
                    name="ingrediente"
                    className="form-control"
                    onChange={obtenerDatosReceta}
                    placeholder="Buscar por ingrediente" 
                    />
                </div>
                <div className="col-md-4">
                    <select 
                    className="form-control"
                    name="categoria" 
                    id=""
                    onChange={obtenerDatosReceta}
                    >
                        <option value="">-- Selecciona la categoría --</option>
                        {categorias.map(categoria => (
                           <option 
                                key={categoria.strCategory}
                                value={categoria.strCategory}>
                               {categoria.strCategory}
                            </option> 
                        ))}
                    </select>
                </div>
                <div className="col-md-4">
                    <input 
                    type="submit"
                    className="btn btn-block btn-primary"
                    value="Buscar bébidas" 
                    />
                </div>
            </div>
        </form>
     );
}
 
export default Formulario;