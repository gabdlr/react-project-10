import React,{ useContext, useState } from 'react';
import { ModalContext } from '../context/ModalContext';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';


function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 300,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        overflow: 'scroll',
        height: '100%',
        maxHeight: 500,
        display: 'block'
        },
        header: {
        padding: '12px 0',
        borderBottom: '1px solid darkgrey'
        },
        content: {
        padding: "12px 0",
        overflow: 'scroll'
        }
}));


const Receta = ({ receta }) => {

    //extraer los valores del context
    const { guardarIdReceta, recetaDesc, guardarReceta } = useContext(ModalContext);
    const { strDrink, strDrinkThumb, idDrink } = receta;

    //Enviamos el id
    const enviarIdReceta = (e) => {
        guardarIdReceta(e.target.value);
        setTimeout(() => {
            handleOpen();
        }, 600);
    }

    //Configuración del modal de material UI 🤷‍♂️
    const [ modalStyle ] = useState(getModalStyle);
    const [ open, setOpen ] = useState(false);

    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        guardarIdReceta(null);
        guardarReceta({});
    }
    
    //Muestra y formatea informacion para los ingredientes
    const mostrarIngredientes = informacion => {
        let ingredientes = [];
        for (let i = 1; i <16; i++) {
            console.log(informacion);
            if( informacion[`strIngredient${i}`] ) {
                 ingredientes.push(<li> {informacion[`strIngredient${i}`]} {informacion[`strMeasure${i}`]}</li> )
            }
        }
        return (ingredientes);
    }
    return ( 
        <div className="col-md-4 mb-3">
            <div className="card">        
                <h2 className="card-header">{strDrink}</h2>
                <img className="card-img-top" src={strDrinkThumb} alt="imagen bebida" />
                <div className="card-body">
                    <button
                    value={idDrink}
                    type="button"
                    className="btn btn-block btn-primary"
                    onClick={enviarIdReceta}
                    >Ver Receta</button>
                    <Modal
                    open={open}
                    onClose={ () => {
                        guardarIdReceta(null);
                        handleClose();
                    }}
                    >
                        <div 
                        style={modalStyle}
                        className={classes.paper}
                        >
                            <h2>{recetaDesc.strDrink}</h2>
                            <h3>Instrucciones:</h3>
                            <p>
                                {recetaDesc.strInstructions}
                            </p>
                            <img className="img-fluid" src={recetaDesc.strDrinkThumb} alt="imagen" />
                            <h3>Ingredientes y cantidades:</h3>
                            <ul>
                            {mostrarIngredientes(recetaDesc)}
                            </ul>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
     );
}

Receta.propTypes = {
    receta: PropTypes.object.isRequired
} 

export default Receta;