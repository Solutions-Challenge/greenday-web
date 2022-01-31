const login = () => {
    const loginOrganization = () => {

    }

    return (
        <form onSubmit={loginOrganization}>
            <label className="formLabel" htmlFor="name">Name: </label>
            <input className="formInput" id="name" type="text" required />
            <br></br>
            <label className="formLabel" htmlFor="number">Number: </label>
            <input className="formInput" id="number" type="text" required />
            <br></br>
            <label className="formLabel" htmlFor="email">Email: </label>
            <input className="formInput" id="email" type="text" required />
            <br></br>
            <button className="formButton" type="submit">Log In</button>
        </form>
    );
}

export default login;