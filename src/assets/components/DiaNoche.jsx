import React, { useState } from 'react'

const sunset = (e) => {
    const salidaSol = e?.sys.sunrise
    const entradaSol = e?.sys.sunset
    const horaToma = e?.dt
    let diaNoche = true

    if(horaToma < entradaSol && horaToma > salidaSol){
    diaNoche = true
    }
    else{
    diaNoche = false

    }

    console.log(salidaSol)
    console.log(entradaSol)
    console.log(horaToma)
return diaNoche
}


const [changeTheme, setChangeTheme] = useState(sunset())

const theme = () =>{
    setChangeTheme(!changeTheme)
}

export default sunset;theme