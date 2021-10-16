import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const RecetasContext = createContext();

const RecetasProvider = (props) => {

    const [ busqueda , buscarRecetas ] = useState({
        ingrediente:"",
        categoria:""
    })

    const [ recetas, guardarRecetas ] = useState([]);

    const [ consultar, guardarConsultar ] = useState(false);
    
    useEffect(() => {
        if(consultar){
            const obtenerRecetas = async () =>{
                const { ingrediente, categoria } = busqueda;
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}&c=${categoria}`;
                const resultado = await axios.get(url);
                guardarRecetas(resultado.data.drinks);
            }
            obtenerRecetas();
        }
    }, [busqueda, consultar])

    return (
        <RecetasContext.Provider
        value={{
        recetas,    
        buscarRecetas, 
        guardarConsultar}}>
            {props.children}
        </RecetasContext.Provider>
      );
}
 
export default RecetasProvider;

