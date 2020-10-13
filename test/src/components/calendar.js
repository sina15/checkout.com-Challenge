import React, { useRef, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { drawCenter, drawLine, setStatLineCord, setTransLineCord } from '../actions/canvasHelpers'
import StatementComponent from './statement';
import TransactionComponent from './transactions';

//the container section
const Calendar = styled.section`
 min-width:${props => props.width + "px" || "100px"};
 min-height:${props => props.height + "px" || "100px"};
 border-radius:10px;
 position:relative;

 @media only screen and (max-width: 769px){
    margin-top:20px;
 }
`
//animation 
const fadeIn = keyframes`
from {opacity:0}
to {opacity:1}
`
//represent div occupied by canvas
const Canvas = styled.canvas`
 width:${props => props.width + "px" || "100px"};
 height:${props => props.height + "px" || "100px"};
 background:transparent;
 position:absolute;
 z-index:4;
 transition: all 2s ease;

`
//Calendar content
const CalendarContent = styled.section`
 width:${props => props.width + "px" || "100px"};
 height:${props => props.height + "px" || "100px"};
 position:absolute;
 left:50px;
 display:grid;
 grid-template-columns:repeat(7,1fr);
 grid-template-rows:repeat(7,1fr);
 z-index:5;
 overflow:hidden;
 div{
     border:1px solid #eeeeee;
     border-collapse: collapse;
     color:white;
     font-size:13px;
     &.calendar-title{
         grid-area:1/1/ 1/ span 5;
         p{
             margin-left:5px;
         }
     };
     &.calendar-switcher{
         grid-column-start:1;
         grid-column-start:span 3;
         hr{
             margin-top:4px;
             width:30%;
             margin-left:5px;
             font-size:3px;
            line-height:1.5;
         }
         div{
            color: green;
            margin-left: 5px;
            display: inline;
            border: none;
            position: relative;
            bottom: 5px;
         }
     }

     &.calendar-empty{
        grid-column-start:6;
        grid-column-start:span 7;
        grid-row-start: 1;
        grid-row-end: span 7;
     }
     &.calendar-date-item{
         p{  margin:0px;  
             margin-left:5px;
             cursor:pointer;
         }
         div{
            margin-left:5px;
            border:none;
            color:green;
            font-size:20px;
            cursor:pointer;
         }
     }
     
 }

 border-radius:10px; transition: all 2s ease;
animation: ${fadeIn} 300ms linear ;
`
//bacgrkound div to hold background color
const Bg = styled.div`
width: 400px;
height: 100%;
z-index: 0;
background: #12233a;
position: absolute;
left: 50px;
border-radius:10px; transition: all 2s ease-in-out;
animation: ${fadeIn} 1s linear ;

`
//inner component with calendar days
const CalendarComponent = ({ height, width }) => {
    const canvasRef = useRef();
    const [ctx, setCtx] = useState();
    const [statCordinate, setStatCordinate] = useState({ left: 0, top: 0 });
    const [transCordinate, setTransCordinate] = useState({ left: 0, top: 0 });
    const [statTop, setStatTop] = useState();
    const [showDivs, setDivs] = useState(false)
    const [dataValue,setDataValue] = useState(1);
    let timerId = useRef(undefined)

    useEffect(() => {
        const canvas = canvasRef.current;

        if (canvas.getContext) {
            const ctx = canvas.getContext('2d');
            setCtx(ctx)            
        } else {
            throw Error
        }
    }, [ctx])

    //handler for mouse over event
    const handleMouseEnter = e => {
        if (e.target.getAttribute('class') !== "calendar-date-item" && e.target.getAttribute('class') !== "date-item") {
            ctx && ctx.clearRect(0, 0, width, height);
            setDivs(false)
        } else {
            let val = e.target.getAttribute('data-value');
            let posx = e.clientX - canvasRef.current.parentNode.getBoundingClientRect().left;
            let posy = e.clientY - canvasRef.current.parentNode.getBoundingClientRect().top;
            debounce(initiateCanvas, 0, posx, posy, ctx);
            setDataValue(val);
        }

    }

    //debounce method to draw lines only when a user stopped moving ouse (performance)
    const debounce = (func, delay, x, y, ctx) => {
        clearTimeout(timerId)
        timerId = setTimeout(() => {
            func(x, y, ctx);
        }, delay);
    }

// to clear canvas and redraw new lines
    const handleClear = e => {
        e.stopPropagation();
        ctx.clearRect(0, 0, width, height);
        setDivs(false)
    }

    //canvas creation and line drawing
    const initiateCanvas = (x, y, ctx) => {
        ctx.clearRect(0, 0, width, height)
        drawCenter(x, y, ctx);
        let transLineCord = setTransLineCord(x, y, width, height);
        let statLineCord = setStatLineCord(x, y, width, height)
        drawLine(x, y, ctx, transLineCord);
        drawLine(x, y, ctx, statLineCord);
        setStatCordinate({ left: statLineCord.x - 10, top: statLineCord.y - 20 });
        setTransCordinate({ left: transLineCord.x - 165, top: transLineCord.y - 20 });
        setDivs(true)
    }

    //render calendar items 
    const renderDateItem = (n) => {
        let res = []
        for (let i = 0; i < n; i++) {
            res.push(<div key={i} data-value={i+1}  className="calendar-date-item">
                <p  data-value={i+1}className="date-item">|</p>
                <div data-value={i+1} className="date-item">.</div>
            </div>)
        }
        return res;

    }

    return (
        <Calendar onMouseMove={handleMouseEnter} onMouseLeave={handleClear} width={width} height={height} >
            <Bg></Bg>
            <CalendarContent width={400} height={height}>
                <div className="calendar-title">
                    <p>Calendar</p>
                </div>
                <div className="calendar-empty"></div>
                <div className="calendar-switcher">
                    <hr></hr>
                    <hr></hr>
                    <hr></hr>
                    <div>_________</div>
                </div>

                {renderDateItem(22)}

            </CalendarContent>
            <Canvas ref={canvasRef} width={width} height={height}></Canvas>
            {showDivs && <StatementComponent dataValue={dataValue} left={statCordinate.left} top={statCordinate.top}></StatementComponent>}
            {showDivs && <TransactionComponent dataValue={dataValue}  left={transCordinate.left} top={transCordinate.top}></TransactionComponent>}
        </Calendar>
    )
}

export default CalendarComponent