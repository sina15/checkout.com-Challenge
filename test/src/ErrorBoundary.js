import React from 'react'
import styled from 'styled-components';

//error container
const ErrorText = styled.div`
width:100%;
height:100vh;
display:flex;
justify-content:center;
align-items:center;
background:#eeeeee;
h1{
    color:#12233a;
    font-size:2em;
}
`
//handle any javascript error that may occur in the all components

class ErrorBoundary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error(error);
        console.error(errorInfo)
    }

    render() {
        return (
            !this.state.hasError ?
                this.props.children :
                <ErrorText><h1>Sorry,Something Went Wrong!</h1></ErrorText>
        )
    }
}

export default ErrorBoundary