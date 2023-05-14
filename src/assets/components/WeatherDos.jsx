import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './text.css'

function WeatherDos() {

        
     const [coords, setCoords] = useState() //estado para guardar coordenadas
     const [searchCity, setSearchCity] = useState()
     const [dayTheme, setDayTheme] = useState(false)
     const [dia, setDia] = useState('')
     const [darkTheme, setDarkTheme] = useState(false)
     const [bienvenida, setBienvenida] = useState(true)
     const [refresh, setRefresh] = useState(true)



    //Obtener informacion del usuario]

    const coordsUser = {}

    const success = (pos) => {
        const currenCoords = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
        }
        setCoords(currenCoords)   
      } 

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success)
    
      }, [refresh])

      const handleClickRefresh = () =>{
        setRefresh(!refresh)
      }



      //Obtener informacion de api

      const [weather, setWeather] = useState() // estado para guardar informacion de api
      
  useEffect(() =>{
    if(coords && !searchCity){
      console.log(coords)

      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=3ec60ed64cc35a68ecdacf6e598344b8`

      axios.get(URL)
      .then((res) => setWeather(res.data))
      .catch(err => console.log(err))

      console.log(weather?.sys.sunrise)
      console.log(weather)
      
 
    // setChangeTheme(true)

    }
  },[coords,searchCity])

  const climaDescription = weather?.weather[0].main



  //Obtenemos el dia 

  const getDate = ()=>{
    const months = {
        '0': 'Jane',
        '1': 'Feb',
        '2': 'Mar',
        '3': 'Apr',
        '4': 'May',
        '5': 'Jun',
        '6': 'Jul',
        '7': 'Aug',
        '8': 'Sept',
        '9': 'Oct',
        '10': 'Nov',
        '11': 'Dec',    }



    const fecha  = new Date()
    const dia = fecha.getDate()
    const mes = fecha.getMonth()
    const hora = fecha.getHours()
    const minutos = fecha.getMinutes()
    

    return dia + ' ' + months[mes]  + ', ' + hora + ':' + minutos + ' Hrs'
  }

  const day = getDate()

  //Convertimos a celsius y Faren

  const [temp, setTemp] = useState(true)

  const tempCelsius = (weather?.main.temp - 273.15).toFixed(2)

  const tempF = (tempCelsius * 1.8000+ 32.00).toFixed(2)

  const changeTemp = () =>{
    setTemp(!temp)

  }

  //Ir a Home

  const ModalOff = () =>{
        setSearch(false)
        setInformacion(false)
        setSearchCity()
  }

    // modal informacion extra
    
    const [informacion, setInformacion] = useState(false)

    const changeModal = () =>{
        setSearch(false)
        setInformacion(!informacion)
        
    }


    // modal buscar otra ciudad

    const [search, setSearch] = useState(false)

    const changeModalSearch = () =>{
        setInformacion(false)
        setSearch(!search)
    }

    // logica buscar otra ciudad


    const positionAdd = (e) =>{
        e.preventDefault()
        const newCity = e.target.searchCity.value
        setSearch(false)

        setSearchCity(newCity)
    
        // const URL = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=3ec60ed64cc35a68ecdacf6e598344b8`
    
        // axios.get(URL)  
        // .then((res) => setWeather(res.data))
        // .catch(err => console.log(err))
        // console.log(weather)
        
    }

    useEffect(()=>{
        if(searchCity){
            console.log(searchCity)
            const URL = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=3ec60ed64cc35a68ecdacf6e598344b8`

            axios.get(URL)
            .then(res=>setWeather(res.data))
            .catch(err=> console.log(err))
        }
        console.log(weather)

    },[searchCity])


    //cambio  dia o noche

    useEffect(()=> {
      if(weather?.sys.sunrise){
          const salidaSol = weather.sys.sunrise
          const entradaSol = weather.sys.sunset
          const horaToma = weather.dt
          let diaNoche = true
  
          if(horaToma < entradaSol && horaToma > salidaSol){
          diaNoche = true
          setDia('Clear')
          }
          else{
          diaNoche = false
          setDia('Clear-dos')
  
          } 
          
         
          setDayTheme(diaNoche)
      }

  },[weather])



  //Dark theme

  const changeDarkTheme = () =>{
    setDarkTheme(!darkTheme )
  }

  const dark = {
    bg: 'bg-white text-black',
    day: 'text-black/50'

  }

  const ligth = {
    bg: 'bg-black/60 text-white',
    day: 'text-white/50'
  }
  
    const goDark = () =>{
      setDarkTheme(true)
      setBienvenida(false)
    }
    const goLight = () =>{
      setDarkTheme(false)
      setBienvenida(false)

    }



  return (
    <div className={` min-w-screen  ${darkTheme?'bg-gray-200' : 'bg-black/60'} min-h-screen w-screen grid font-lato z-0 justify-center justify-items-center pt-[10px]`}>
    <main className={`w-[90%] ${darkTheme?dark.bg:ligth.bg} relative max-w-[400px] aspect-[1/1] max-h-[600px] p-3 border-[5px] ${darkTheme? 'border-red-300':' border-blue-500'} rounded-md`}>

      {/* Modal bienvenida */}
      <div className={`w-full duration-500 ${bienvenida? 'h-full z-30':'h-0'} overflow-hidden absolute top-0 left-0`}>
      <div className={`w-full h-full grid grid-cols-2  bg-blue-300 z-20`}>
        <div className='w-full h-full bg-black grid items-center'>
          <img src="/images/Clear.png" alt="" onClick={goDark} className={`animation cursor-pointer z-30 hover:opacity-70 duration-300`} />
        </div>
        <div className='w-full h-full bg-white grid justify-items-center items-center'>
        <img src="/images/Clear-dos.png" alt="" onClick={goLight} className={`animation cursor-pointer z-30 hover:opacity-70 duration-300`} />

        </div>
        <div className='absolute flex flex-col justify-between items-center w-full h-full py-20'>

        <div>
        <h3 className='shadowDos text-[30px] min-[400px]:text-[40px]'>Weather App</h3>
        <p className='shadowDos text-[15px] min-[400px]:text-[20px]'>What is your favorite color?</p>
        </div>

        <div className='text-[10px] min-[300px]:text-[20px]'>
        <p className='shadowDos'>Created by Cristian Vazquez</p>
        <p className='shadowDos'>Designer: Junior Pacheco</p> 
        </div>
        </div>
        

      </div>
      </div>

     

      

       {/* Loader */}

      <div className={`${darkTheme?'bg-white text-black/50':  'bg-neutral-800'} w-full flex flex-col justify-center gap-6 items-center overflow-hidden absolute top-0 left-0 z-20 ${!weather? 'h-0':'h-full'}`}>
        <div className='relative grid justify-items-center group refresh'>
        <p className={`${!darkTheme? 'bg-gray-200 text-black ' : 'bg-black/20 text-black'} w-[200px] absolute -top-8 h-0 overflow-hidden group-hover:h-[30px]  text-[10px] text-center`}>No se puede obtener informacion de su ubicacion, verifique su conexion</p>
        <i className='bx bxs-info-circle '></i>
        

        </div>
      <i onClick={handleClickRefresh} className='bx bx-refresh text-[30px] refresh cursor-pointer'></i>
        <h3 className='text-[30px]'>Loading</h3>
      <i className='bx bx-loader-alt text-[60px] loader'></i>
      

      </div>

      

      
        {/* Informacion */}
        <div className={`w-full absolute flex flex-col justify-center items-start pl-[10%] gap-2 min-[400px]:gap-6 top-0 left-0 ${darkTheme?'bg-white':' bg-neutral-600'} duration-500 ${informacion? 'h-[90%]': 'h-0 overflow-hidden'} `}>
            <h3 className='text-[30px] w-[90%] text-center'>More information about {weather?.name}</h3>

            <div className='w-full  flex gap-2 '>
            <i className='bx bxs-sun text-[25px] '></i>
            <p className='text-start'>Thermal sensation:</p>
            <div className={` flex overflow-hidden`}>
            <p className={`w-full overflow-hidden ${!temp? 'invisible': 'visible'}`}>{tempCelsius + '°C'}</p>
            <p className={`w-full absolute overflow-hidden  ${temp? 'invisible': 'visible'}`}>{tempF + '°F'}</p>
            </div>
            </div>
            <div className='flex gap-3'>
            <i className='bx bx-cloud  text-[25px]'></i>
            <p className='w-full text-start'>Weather: <span>{weather?.weather[0].description}</span></p>
            </div>
            <div className='flex gap-3'>
            <i className='bx bxs-droplet-half  text-[25px]'></i> 
            <p className='w-full text-start'>Humidity: <span>{weather?.main.humidity}%</span></p>
            </div>
            <div className='flex gap-3'>
            <i className='bx bxs-thermometer  text-[25px]'></i>
            <p className='w-full text-start'>Pressure: <span>{weather?.main.pressure} hPa</span></p>
            </div>
            <div className='flex gap-3'>
            <i className='bx bx-wind  text-[25px]'></i>
            <p className='w-full text-start'>Wind Speed: <span>{weather?.wind.speed} meter/sec</span></p>
            </div>

        </div>

        {/* buscar otra ciudad */}

        <section className={`w-full absolute flex flex-col justify-start  items-center top-0 left-0 ${darkTheme?'bg-white':' bg-neutral-600'} duration-500 ${search? 'h-[90%]': 'h-0 overflow-hidden'} gap-6`}>
            <h3 className='w-full text-center text-[20px] mt-[80px]'>Search by Country or City</h3>

            <form onSubmit={positionAdd} className=' w-[60%] grid gap-3 '>
                <input id='searchCity' type="text" placeholder="Find another city" className={`w-[100%] h-[30px] text-center outline-none bg-gray-100 ${darkTheme?'text-black':'text-black'}`}/>
                <button   className={`w-[45%] self-center justify-self-center  ${darkTheme?'bg-red-300 text-black hover:bg-red-200': ' bg-blue-600 text-black/40 hover:bg-blue-400 hover:text-black/70'}`}>Search</button>
            </form>


        </section>




        {/* Home */}


        <section className='grid justify-items-start min-[400px]:text-[25px] overflow-hidden'>
                <div className='grid w-full grid-cols-[auto_auto_1fr] gap-3'>
                
                {
                  dayTheme? 
                  <i className='bx bxs-sun text-yellow-400'></i>:
                  <i className={`bx bxs-moon ${darkTheme?'text-gray-800': 'text-white'}`} ></i>
                }
                <span className={`${darkTheme?dark.day:ligth.day} ${searchCity? 'opacity-0':'opacity-100'} min-[400px]:text-[20px]`}>{day}</span>
                <i onClick={changeDarkTheme} class={`${!darkTheme?'text-white': 'text-black'} bx bxs-palette text-end w-full cursor-pointer`}></i>
                </div>
                <h4 className='w-[70%]'><b>{weather?.name + ', ' + weather?.sys.country}</b></h4>
                <div className='w-[80%] aspect-[9/10] grid justify-items-center justify-self-center items-center'>
                    <img src={climaDescription === 'Clear'? `/images/${dia}.png`  :`/images/${climaDescription}.png`} alt="" className='animation' />
                </div>
                <div className='w-[200%] flex overflow-hidden'>
                <p className={`text-[50px] min-[400px]:text-[70px] w-full duration-500 ${!temp? 'ml-0':'-ml-[100%]'}`}>{tempCelsius + '°C'}</p>
                <p className='text-[50px] min-[400px]:text-[70px] w-full '>{tempF + '°F'}</p>
                </div>
                <span>{weather?.weather[0].main + ', ' + weather?.weather[0].description}</span>
         </section>

        {/* Menu */}

        
        <div className='grid grid-cols-4 w-[100%] h-[30px] mt-[20px] items-end border-t-[1px] border-black/20'>
        <i onClick={ModalOff} className='bx bx-home-alt-2 h-full text-center border-r-[1px] border-black/20 pt-[5px] cursor-pointer hover:text-blue-600 hover:pt-[10px] duration-300 hover:text-[20px]'></i>
        <i onClick={changeModalSearch} className='bx bx-search-alt-2 h-full text-center border-r-[1px] border-black/20 pt-[5px] cursor-pointer hover:text-blue-600 hover:pt-[10px] duration-300 hover:text-[20px]' ></i>
        <i onClick={changeModal} className='bx bx-food-menu h-full text-center border-r-[1px] border-black/20 pt-[5px] cursor-pointer hover:text-blue-600 hover:pt-[10px] duration-300 hover:text-[20px]' ></i>
        <p onClick={changeTemp} className='text-center h-full cursor-pointer hover:text-blue-600 hover:pt-[3px] duration-300 hover:text-[20px]'>{temp? '°C' :  '°F  '}</p>

        </div>
    

    </main>
    </div>
    )
}

export default WeatherDos