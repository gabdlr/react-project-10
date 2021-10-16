import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios';

//Crear el context
export const CategoriasContext = createContext();

//Crear un provider, es donde se encuentran las funciones y states

const CategoriasProvider = (props) => {

    //crear el state del Context
    const [ categorias, guardarCategorias ] = useState([]);
    
    //ejecutar el llamado a la api
    useEffect(() => {
        const obtenerCategorias = async () => {
            const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
            const categorias = await axios.get(url);
            guardarCategorias(categorias.data.drinks);
        }
        obtenerCategorias();
    }, [])

    return (
        <CategoriasContext.Provider
        value={{categorias}}
        >
            {props.children}
        </CategoriasContext.Provider>
    )
}

export default CategoriasProvider;