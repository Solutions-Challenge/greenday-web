import Head from "next/head";
import Navbar from "./organization/navbar";
import Info from "./organization/info";

const organization = () => {
    return (
        <div>
            <Head>
                <title>Organization Page</title>
            </Head>
            <body>
                <Navbar></Navbar>
                <Info></Info>
            </body>
        </div>
    );
}

export default organization;