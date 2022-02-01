import Navbar from "./organization/navbar";

const login = () => {
    const loginOrganization = () => {

    }

    const handleChange = () => {

    }

    return (
        <>
        <Navbar></Navbar>
        <ion-card>
            <ion-card-header>
                <ion-card-title>Log In Your Account</ion-card-title>
            </ion-card-header>
            <ion-item>
                <ion-icon name="pin" slot="start"></ion-icon>
                <ion-label>Please log in your existed account</ion-label>
                <ion-button fill="outline" slot="end">Log In</ion-button>
            </ion-item>
            <ion-card-content>
                <ion-item>
                    <ion-label class="ion-text-wrap" color="primary">Email: </ion-label>
                    <ion-input type="email"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label class="ion-text-wrap" color="primary">Password: </ion-label>
                    <ion-input type="password"></ion-input>
                </ion-item>
            </ion-card-content>
        </ion-card>        
        </>
    );
}

export default login;