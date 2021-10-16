import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

//crear el context
export const ModalContext = createContext();

const ModalProvider = (props) => {


    //state del provider
    const [ idReceta, guardarIdReceta ] = useState(null); 
    const [ recetaDesc, guardarReceta ] = useState({});
    
    //Una vez que tenemos una receta llamar la API
    useEffect(() => {
        if(!idReceta) return;
        const obtenerReceta = async () => {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`;
            const resultado = await axios.get(url);
            guardarReceta(resultado.data.drinks[0]);
        }
        obtenerReceta();
    }, [idReceta])

    return (
        <ModalContext.Provider
            value={{
                recetaDesc,
                guardarReceta,
                guardarIdReceta
            }}
        >
            {props.children}
        </ModalContext.Provider>
    );
}

export default ModalProvider;