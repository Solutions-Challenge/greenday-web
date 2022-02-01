import Navbar from "./organization/navbar"

const signin = () => {
    const registerOrganization = () => {

    }

    return (
        <>
        <Navbar></Navbar>
        <ion-card>
            <ion-card-header>
                <ion-card-title>Sign Up Your Account</ion-card-title>
            </ion-card-header>
            <ion-item>
                <ion-icon name="pin" slot="start"></ion-icon>
                <ion-label>Please enter your email and password</ion-label>
                <ion-button fill="outline" slot="end">Sign Up</ion-button>
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
                <ion-item>
                    <ion-label class="ion-text-wrap" color="primary">Confirm Password: </ion-label>
                    <ion-input type="password"></ion-input>
                </ion-item>
            </ion-card-content>
        </ion-card>        
        </>
    );
}

export default signin;