const signin = () => {
    const registerOrganization = () => {

    }

    return (
        <form onSubmit={registerOrganization}>
            <label className="formLabel" htmlFor="name">Name: </label>
            <input className="formInput" id="name" type="text" required />
            <br></br>
            <label className="formLabel" htmlFor="number">Number: </label>
            <input className="formInput" id="number" type="text" required />
            <br></br>
            <label className="formLabel" htmlFor="email">Email: </label>
            <input className="formInput" id="email" type="text" required />
            <br></br>
            <label className="formLabel" htmlFor="address">Address: </label>
            <input className="formInput" id="address" type="text" required />
            <br></br>
            <button className="formButton" type="submit">Sign In</button>
        </form>
    );
}

export default signin;