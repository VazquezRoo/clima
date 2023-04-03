    import React, { useEffect, useState } from 'react'
    import './text.css'
    // import 'App.jsx'
    import Loader from './Loader'

import axios from 'axios'


    function Weather() {



        const [changeTheme, setChangeTheme] = useState(true)

        const theme = () =>{
            setChangeTheme(!changeTheme)
        }


        //calculo y usesnipet de cambio de cambio de temperatura

        const [far, setFar] = useState(true)

        const changeTemperature = () => {
            setFar(!far)
        }

        const cel = (f) => {
            const c = (f - 32) * 5 / 9 
            return c.toFixed(1)       
        }

        //tema dark y ligth

        const bgDark = [
            'bg-black bg-slate-900/80',
            'text-white',
            'bg-white',
            'white',
            'bg-black',
            'opacity-[.4]',
            '../components/images/aire.png',
            "/images/agua.png",
            "./images/pres.png",
            'bg-black',
        ]
        const bgLight = [
            'bg-white opacity-[.9]',
            'text-black',
            'bg-blue-700',
            'black',
            'opacity-[0]',
            '/src/assets/components/images/wind.png',
            "/src/assets/components/images/humidity.jpg",
            "./images/pressure.png",
            'bg-black',
        ]

      

        // usesnipet de las coordenadas
     const [coords, setCoords] = useState()

        //usesnipet de la informacion 

     const [weather, setWeather] = useState()

    const success = (pos) => {
        const currenCoords = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
        }
        setCoords(currenCoords)
    
      } 

//useEfecc de la posicion actual

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)

  }, [])

  //useEfecc de tomar de informacion 

  useEffect(() =>{
    if(coords){
      console.log(coords)
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=3ec60ed64cc35a68ecdacf6e598344b8`

      axios.get(URL)
      .then((res) => setWeather(res.data))
      .catch(err => console.log(err))

      console.log(weather?.sys.sunrise)
      
    //   const sunset = () => {
    //     const salidaSol = weather.sys.sunrise
    //     const entradaSol = weather.sys.sunset
    //     const horaToma = weather.dt
    //     let diaNoche = true

    //     if(horaToma < entradaSol && horaToma > salidaSol){
    //     diaNoche = true
    //     }
    //     else{
    //     diaNoche = false

    //     } 

    //     console.log(salidaSol)
    //     console.log(entradaSol)
    //     console.log(diaNoche)
    // return diaNoche
        
    // }
    
    // sunset()
    setChangeTheme(true)

    }
    console.log(weather?.sys.sunrise)
    

  },[coords])

  //useSnnipet del cambio de bg

  const [bgChange, setBgChange] = useState()

  const printBg = (e) => {
    setBgChange(e)
  }


// variables de los bg de clima

  const bg1 = "bg-[url('/public/bg/neblina.jpg')]"
  const bg2 = "bg-[url('/public/bg/lluvia.jpg')]"
  const bg3 = "bg-[url('/public/bg/cielo-despejado.jpg')]"
  const bg4 = "bg-[url('/public/bg/tormenta-electrica.jpg')]"
  const bg5 = "bg-[url('/public/bg/pocas-nubes.jpg')]"
  // const bg6 = "bg-[url('/public/bg/poca lluvia.jpg')]"
  const bg7 = "bg-[url('/public/bg/nieve.jpg')]"


//cambiar bg de cada tipo de clima

  useEffect(() =>{
    if(weather?.weather[0].main === 'Rain'){
        // sunset(weather)
       printBg(bg2)   
    }
    else if(weather?.weather[0].main === 'Thunderstorm'){
      // sunset(weather)
      printBg(bg4)
      
    }
    else if(weather?.weather[0].main === 'Clear'){
      // sunset(weather)
      printBg(bg3)
    }
    else if(weather?.weather[0].main === 'Clouds'){
      // sunset(weather)
      printBg(bg5)
    }
    else if(weather?.weather[0].main === 'Snow'){
      // sunset(weather)
      printBg(bg7)
    }
    else {
      // sunset(weather)
      printBg(bg1)
    }
    
  },[weather])

  //tomar informacion y cambiar la ciudad que se checa clima

  const positionAdd = (e) =>{
    e.preventDefault()
    const newCity = e.target.searchCity.value

    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=3ec60ed64cc35a68ecdacf6e598344b8`

    axios.get(URL)  
    .then((res) => setWeather(res.data))
    .catch(err => console.log(err))
    

}

    //cambio de tema si es de dia o noche

    useEffect(()=> {
        if(weather?.sys.sunrise){
            const salidaSol = weather.sys.sunrise
            const entradaSol = weather.sys.sunset
            const horaToma = weather.dt
            let diaNoche = true
    
            if(horaToma < entradaSol && horaToma > salidaSol){
            diaNoche = true
            }
            else{
            diaNoche = false
    
            } 
            
           
            setChangeTheme(diaNoche)
        }

    },[weather])




    return (

        (
        <div className={`flex  h-[100vh]  mt-[0px]  justify-center z-10`}>

            

             
    {
        weather ? (
          <div className={`h-[100vh] ${bgChange} w-full bg-cover  grid font-lato`}>

            <form onSubmit={positionAdd} className=' mt-[-30px] relative h-[30px] justify-self-center  gap-3 min-[720px]:w-[600px] min-[720px]:mt-[15px] z-20'>
            <input id='searchCity' type="text" placeholder="Find another city" className=' w-[200px] h-[30px] mt-[-100px] rounded-[10px] text-center min-[720px]:ml-[-20px] placeholder:text-center min-[720px]:w-[300px] min-[720px]:text-[20px] '/>
           
            <button   className='mt-[100px] ml-[20px] w-[100px] rounded-[10px] h-[30px] bg-[#dbd3d3]'>Search</button>
            </form>


            <div className={`absolute h-[100vh] w-full my-auto bg-black bg-blue ${changeTheme ? bgLight[4] : bgDark[5]} `}></div>
        
           
        
        <section className='grid  grid-rows-[200px 300px 50px 20px] bg-blac bg-b z-30 grid-cols-3 w-[300px] justify-self-center h-[500px] self-center min-[720px]:w-[600px] min-[720px]:grid-rows-[200px 500px 100px]'>
        
            <div className='absolute flex justify-between w-[35px] h-[20px] bg-black rounded-[25px] transition-[5s] mt-[-15px] ml-[130px] min-[720px]:mt-[-55px] min-[720px]:ml-[480px] min-[720px]:w-[40px] min-[720px]:h-[25px]'>
            
                {changeTheme ?           
            <input onClick={theme} type="radio"  className='bg-white rounded-[50%] w-[20px] h-[20px] appearance-none min-[720px]:w-[25px] min-[720px]:h-[25px] z-40'/> :
            <input onClick={theme}  type="radio"  className='bg-white rounded-[50%] w-[20px] h-[20px] ml-[15px] appearance-none min-[720px]:w-[25px] min-[720px]:h-[25px] min-[720px]:ml-[15px] z-40'/>
                }
            </div>


            <div className='grid col-start-1 col-span-3 row-start-1 h-[50px] mb-[20px] min-[720px]:col-start-1 min-[720px]:col-span-3'>
            <h2 className= {`col-start-1 col-span-3 self-center justify-self-center text-[25px] min-[720px]:text-[50px] text-${changeTheme ? bgLight[3] : bgDark[3]}`}><b>{weather?.name}, {weather?.sys.country}</b></h2>
            </div>
            
        
            <div className= {`grid col-start-1 col-span-3 grid-rows-[100px 200px] grid-cols-2 self-center justify-self-center  ${changeTheme ? bgLight[0] : bgDark[0]} rounded-[25px]  p-3 min-[720px]:row-star-2 min-[720px]:row-span-2 min-[720px]:col-start-1 min-[720px]:col-span-2 min-[720px]:h-[300px] min-[720px]:w-[450px]`}>
            
                <div id='weatherDescription' className=' justify-self-center row-start-1 col-start-1 col-span-2 self-center text-[20px] min-[720px]:text-[30px]'>
                <h3 className={`text__title ${changeTheme ? bgLight[1] : bgDark[1]}`}><b>{weather.weather[0].description}</b></h3>
                </div>
                
                {
                far ? (<div className='  row-start-2 col-start-1 self-center w-[200px] mb-[60px] ml-[10px] '>
                    <h2 className={`text-[40px]  ${changeTheme ? bgLight[1] : bgDark[1]} drop-shadow-xl     min-[720px]:text-[60px] min-[720px]:w-[300px]`}>{weather.main.temp} °K</h2>
                </div> )
                : (<div className=' row-start-2 col-start-1 self-center w-[200px] mb-[80px] ml-[10px] '>
                    <h2 className={`text-[40px]  ${changeTheme ? bgLight[1] : bgDark[1]}  min-[720px]:text-[60px] min-[720px]:w-[300px] mt- [50px]`}>{(cel(weather.main.temp))} °C</h2>
                </div>)
                }
                

                <div className=' justify-self-center row-start-2 col-start-2 h-[100px] w-[100px] self-center mb-[80px] ml-[40px] min-[720px]:h-[200px] min-[720px]:w-[200px]'>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" className='min-[720px]:h-[150px] min-[720px]:w-[150px] min-[720px]:ml-[40px] min-[720px]:mt-[30px]' />
            
            </div>
            </div>
            
        
            <div className= {`grid  mt-[20px] col-start-1 col-span-3 row-start-3  grid-cols-3 ${changeTheme ? bgLight[0] : bgDark[0]} rounded-[25px] h-[100px]  min-[720px]:row-star-2 min-[720px]:row-span-2 min-[720px]:col-start-3 min-[720px]:grid-cols-1 min-[720px]:h-[300px] min-[720px]:w-[150px] min-[720px]:ml-[40px] `}>
            
            <div className= {`flex gap-2 justify-self-center self-center border-r-2  border-r-[${changeTheme ? bgLight[3] : bgDark[3]}] w-[80px] h-[50px] min-[720px]:h-[70px] min-[720px]:w-[70px] min-[720px]:border-b-2 min-[720px]:border-b-[${changeTheme ? bgLight[3] : bgDark[3]}] min-[720px]:border-r-0 `}>
                <img src= {changeTheme ? bgLight[5] : bgDark[6]} alt="wind"  className='w-[18px] h-[16px] mt-[10px]'/>
                <h5 className={`mt-[10px] ${changeTheme ? bgLight[1] : bgDark[1]} `}><b>{weather.wind.speed}</b></h5>
            </div>
            
            <div className= {`flex self-center justify-self-center gap-2 border-r-2 border-r-[${changeTheme ? 'black' : bgDark[3]}] w-[80px] h-[50px] min-[720px]:h-[70px] min-[720px]:w-[70px] min-[720px]:border-b-2 min-[720px]:border-b-[${changeTheme ? bgLight[3] : bgDark[3]}] min-[720px]:border-r-0 `}>
              <div className='w-[18px] h-[16px] mt-[10px] bg-[url("/public/bg/neblina.jpg")] '></div>
                
                <h5 className={`mt-[10px] ${changeTheme ? bgLight[1] : bgDark[1]} `}><b>{weather.main.humidity}%</b></h5>
            </div>
            
            <div className= ' flex self-center justify-self-center gap-2 mr-[10px]'>
                <img src='../components/images/pressure.png' alt="pressure"  className='w-[18px] h-[16px]'/>
                <h5 className={`${changeTheme ? bgLight[1] : bgDark[1]} `}><b>{weather.main.pressure}</b></h5>
            
            </div>

            </div>

            {
            far ? (<div className= 'grid col-start-1 col-span-3 row-start-4 justify-self-center self-center mt-[10px] min-[720px]:row-star-6 min-[720px]:row-span-1 min-[720px]:col-start-1 min-[720px]:col-span-3 min-[720px]:w-[500px] min-[720px]:ml-[-40px]' >
            <button onClick={changeTemperature} className={`${changeTheme ? bgLight[2] : bgDark[2]} py-2 px-6 text-[#75cbd1] font-bold rounded-[25px] hover:${changeTheme ? bgLight[8] : bgDark[9]} duration-200 min-[720px]:w-[300px] min-[720px]:text-[20px]  min-[720px]:justify-self-center`}>Change a ° C</button>
        </div>) :
    
        <div className= {`grid col-start-1 col-span-3 row-start-4 justify-self-center self-center mt-[10px] min-[720px]:row-star-6 min-[720px]:row-span-1 min-[720px]:col-start-1 min-[720px]:col-span-3  min-[720px]:w-[500px] min-[720px]:ml-[-40px]`} >
            
            <button onClick={changeTemperature} className={`${changeTheme ? bgLight[2] : bgDark[2]} py-2 px-6 text-[#75cbd1] font-bold rounded-[25px] hover:${changeTheme ? bgLight[8] : bgDark[9]}  duration-200 min-[720px]:w-[300px] min-[720px]:text-[20px]  min-[720px]:justify-self-center`}>Change a ° F</button>

        </div>

            }  
            

            
        </section>

          </div>

        ) : (
          <div className={`h-[100vh] bg-white bg-cover grid font-lato`}>           
          <Loader/>
          </div>
        )
      }  
 
        </div>)
    
    )
    }

    export default Weather
