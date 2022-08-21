import errorImg from './error.gif'

const ErrorMessage = () => {
    return (
        <img src={errorImg} alt="error" style={{height: "250px", margin: "0 auto", display: "block"}}/>
    )
}

export default ErrorMessage