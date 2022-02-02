import React from "react";
import { FormEvent, useState } from "react";

const SignIn = () => {
    var email:string = "";
    var password:string = "";
    var confirmPassword:string = "";
    var haveEmpty:boolean = false;
    var samePassword = true;

    const handleSubmit = () => {
        console.log("Submit to Firebase");
    }

    const handleSignUp = () => {
        if (email === "" || email === undefined || password === "" || password === undefined || confirmPassword === "" || confirmPassword === undefined) {
            alert("Please fill in all blanks.");
        }
        else if (password !== confirmPassword) {
            alert("The passwords you entered don't match. Please try again.");
        }
        else {
            handleSubmit();
        }
    }

    return (
        <>
        <ion-card>
            <ion-card-header>
                <ion-card-title>Sign Up Your Account</ion-card-title>
            </ion-card-header>
            <ion-item>
                <ion-icon name="pin" slot="start"></ion-icon>
                <ion-label>Please enter your email and password</ion-label>
                <ion-button fill="outline" slot="end" onClick={handleSignUp}>Sign Up</ion-button>
            </ion-item>
            <ion-card-content>
                <ion-item>
                    <ion-label class="ion-text-wrap" color="primary">Email: </ion-label>
                    <ion-input type="email" id="email" required={true} onMouseLeave={e => email = (e.target as HTMLInputElement).value}></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label class="ion-text-wrap" color="primary">Password: </ion-label>
                    <ion-input type="password" id="password" required={true} onMouseLeave={e => password = (e.target as HTMLInputElement).value}></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label class="ion-text-wrap" color="primary">Confirm Password: </ion-label>
                    <ion-input type="password" id="confirmPassword" required={true} onMouseLeave={e => confirmPassword = (e.target as HTMLInputElement).value}></ion-input>
                </ion-item>
            </ion-card-content>
        </ion-card>
        </>
    );
}

export default SignIn;