import React, { useEffect, useState } from 'react';
import styled ,{keyframes} from 'styled-components';
import { fetchProducts } from '../actions/api'

const myfadeIn = keyframes`
from {opcaity:0}
to {opacity:1}
`
const Intro = styled.section`
width:${props => props.width + "px"};
height:${props => props.height + "px"};
background:transparent;
transition: all 300ms ease-in-out;
animation ${myfadeIn} 300ms linear;
@media only screen and (max-width :1025px){
    margin-left:20px;
}
`
const Title = styled.h4``

const Description = styled.p`
width:70%;
line-height: 1.5;
font-size:15px;
`
//containing features lists
const FeatureList = styled.ul`
 list-style:none;
 padding:0;
 position:relative;
 font-size:15px;
 li{
     ::before{
         content:"";
         width:${props => props?.icon?.dimensions?.width + "px"};
         height:${props => props?.icon?.dimensions?.height + "px"};
         display: inline-block;
         position:relative;
         background-repeat:no-repeat;
         background-image:url(${props => props?.icon?.url});
         background-position:left;
         background-size:15px;
         top:10px;
     }
 }

 @media only screen and (max-width : 769px){
    font-size:13px;
 }
 @media only screen and (max-width : 769px){
     font-size:12px;
     margin-left:0;
 }

`
const IntroComponent = ({ width, height, apiData }) => {

    let [title, setTitle] = useState("")
    let [body, setBody] = useState({})

    useEffect(() => {
        apiData && fetchProducts(apiData.action, apiData.ref, apiData.enctype).then(data => {
            setTitle(data.title[0].text);
            setBody(data.body[0].primary);
            console.log(data.body[0].primary)
        })
    }, [apiData])

    return (

        <Intro width={width} height={height} >
            <Title>{title}</Title>
            <Description>{body && body.description && body.description[0] && body.description[0].text || ""}</Description>
            <FeatureList icon={body.features_list_icon || {}}>
                {body?.features_list?.map((item, index) => {
                    return (<li key={index} data-type={item.type}>{item.text}</li>)
                })}

            </FeatureList>
        </Intro>
    )
}

export default IntroComponent