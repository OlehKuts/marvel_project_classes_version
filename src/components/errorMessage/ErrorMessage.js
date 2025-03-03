import errorImg from "./error.gif"

export const ErrorMessage = () => {
    return (
        // <img src={process.env.PUBLIC_URL + '/error.gif'} alt={"Error happened"}/> // if nest img in `public` folder
        <img src={errorImg} alt="Error happened"
        style={{width: "250px", height: "250px", display:'block',
            objectFit: "contain", margin: "0 auto"
        }}
        />
    )
}