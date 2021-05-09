import React from 'react';

export default function Imagenes(props){
    return(
        <div>
            <img src={props.url} className="imagen-personas" alt='img'></img>
        </div>
    )
}