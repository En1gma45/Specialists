import React, { useEffect, useState } from "react";
import firebase from "../firebase/firebase";
import 'bootstrap/dist/css/bootstrap.min.css';
import man from '../assets/man.png'
import woman from '../assets/woman.png'
import slider from '../assets/slider.png'
import calendar from '../assets/calendar.png'
import './Main.css'



const Main: React.FC = () => {

    //Creating variables
    const [specs, setSpecs]: any[] = useState([])
    const [id, setId] = useState()
    const [date, setDate] = useState()
    const [time, setTime] = useState()
    const [index, setIndex] = useState(0)
    const [scroll, setScroll] = useState({
        isScrolling: false,
        clientX: 0,
        scrollX: 0
    })


// Fetching data from database
    useEffect(()=>{
        
        const fetchData = async () =>{
            const db = firebase.firestore()
            const data = await db.collection("specialists").get()
            setSpecs(data.docs.map( (doc:any) => doc.data()))
            
        }
        fetchData()
    }, [])

    //Writing data to variables
    useEffect(()=>{
        setTime({...specs[index]}.currentTime)
        setDate({...specs[index]}.currentDate)
        setId({...specs[index]}.id?.trim())
    }, [specs, index])

    //Generating array of DataItems
    const DateItems = (activeDate:any) =>{
        let items: any[] = []
        let names: Array<string> = ['сегодня', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']
        for (let i = 1; i < 8; i++) {
            items.push(
                i.toString() === activeDate ?
                <button className="date_item active" key={`${i}`} onClick={(e)=>ToggleHandler(e)} value={i}>
                    {`${names[i-1]} \n ${i}`}
                </button>
                :
                <button className="date_item" key={`${i}`} onClick={(e)=>ToggleHandler(e)} value={i}>
                    {`${names[i-1]} \n ${i}`}
                </button>
            )
        }
        return items
    }

    //Adding class to chosen element
    const ToggleHandler = (e:any) =>{
        let list = Array.from(document.getElementsByClassName(e.target.classList))
        list.map((item:any)=>{
            item.classList.remove('active')
        })
        
        e.target.classList.add('active')
        e.target.classList.contains('time_item') ? setTime(e.target.value): setDate(e.target.value)
    }

    //Updating data
    const UploadData = () => {
        let db = firebase.firestore()
        db.collection("specialists").doc(id).update({
            currentDate: date,
            currentTime: time
        })
    }

    //Adding function to make items scrollable
    const MouseDownHandler = (e:any) =>{
        if(!e) return

        setScroll({
            ...scroll,
            isScrolling: true,
            clientX: e.clientX
        })
    }

    //Adding function to make items scrollable
    const MouseUpHandler = (e:any) =>{
        if(!e) return
        setScroll({
            ...scroll,
            isScrolling: false,
        })
    }

    //Adding function to make items scrollable
    const MouseMoveHandler = (e:any) =>{
        if(!e) return

        const {scrollX, clientX, isScrolling} = scroll
        console.log(e.target.parentElement.classList);
        if(isScrolling){

            if(e.target.parentElement.classList.contains('specialists')){
                
                e.clientX<900 ? setIndex(1) : setIndex(0)
            }

            e.target.parentNode.scrollLeft = -(scrollX + e.clientX - clientX)
        }
        
    }
    
    //Adding EventListener for scrollable items
    useEffect(()=>{
        document.addEventListener('mousedown', MouseDownHandler)
        document.addEventListener('mouseup', MouseUpHandler)
        return ()=>{
            document.removeEventListener('mousedown', MouseDownHandler)
            document.removeEventListener('mouseup', MouseUpHandler)
        }
    })
    
    //Rendering component
    return (
        <div className='page'>
            <div className='specialists'>
                {specs.map( (el:any)=>{
                    return (
                            <div key={el.id} className='card_container' onMouseDown={(e)=>MouseDownHandler(e)} onMouseUp={(e)=>MouseUpHandler(e)} onMouseMove={(e)=>MouseMoveHandler(e)} > 
                                <div className='card_title bold' onMouseDown={(e)=>MouseDownHandler(e)} onMouseUp={(e)=>MouseUpHandler(e)} onMouseMove={(e)=>MouseMoveHandler(e)} >
                                    {el.name}
                                </div>
                                <div className='card_body' onMouseDown={(e)=>MouseDownHandler(e)} onMouseUp={(e)=>MouseUpHandler(e)} onMouseMove={(e)=>MouseMoveHandler(e)} >
                                    <img alt='specialist' src={el.img==='man'? man : woman}/>
                                    <div className='card_description' onMouseDown={(e)=>MouseDownHandler(e)} onMouseUp={(e)=>MouseUpHandler(e)} onMouseMove={(e)=>MouseMoveHandler(e)} >
                                        <p>{`Длительность \n консультации`}</p>
                                        <p className='bold'>{el.length}</p>
                                    </div>
                                </div>
                            </div>
                    )
                })}
            </div>
            <div className='date_container'>
                <div className='date_title'>
                    <p className='bold'>Возможная дата</p>
                    <div className='date_img'>
                        <img alt='slider' src={slider}/>
                        <img alt='calendar' src={calendar}/>
                    </div>
                </div>
                <div className="date_items" onMouseDown={(e)=>MouseDownHandler(e)} onMouseUp={(e)=>MouseUpHandler(e)} onMouseMove={(e)=>MouseMoveHandler(e)}>
                    {DateItems(date)}
                </div>
            </div>
            <div className="time_container">
                <div className="time_title">Свободное время</div>
                <div className="time_items" onClick={(e)=>ToggleHandler(e)} onMouseDown={(e)=>MouseDownHandler(e)} onMouseUp={(e)=>MouseUpHandler(e)} onMouseMove={(e)=>MouseMoveHandler(e)}>
                    { {...specs[index]}.time ? {...specs[index]}.time.map( (item:any,i:number = 0)=>{
                        ++i
                        if(item===time){
                            return(
                                <button className="time_item active" id={`${i}`} key={`${item}`} value={item}>
                                    {item}
                                </button>
                            )
                        }
                        else {
                            return(
                                <button className="time_item" id={`${i}`} key={`${item}`} value={item}>
                                    {item}
                                </button>
                            )
                        }
                    }) : null}
                </div>
            </div>
            <div className="form_container">
                <div className="form_title">
                    <div className="form_time">
                        <p>Дата</p>
                        <p className='bold'>{date}</p>
                    </div>
                    <div className='form_border'></div>
                    <div className="form_date">
                        <p>Время</p>
                        <p className='bold'>{time}</p>
                    </div>
                </div>
                <button className="form_submit" onClick={()=>UploadData()}>ЗАПИСАТЬСЯ НА БЕСПЛАТНУЮ ВСТРЕЧУ</button>
            </div>
        </div>
    )
}

export default Main