import Router from "next/router";

const Navbar = () => {
  return (
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title onClick={() => Router.push('/organization')}>Home</ion-title>
        <ion-button shape="round" strong={true} slot="end" onClick={() => Router.push ('/login')}>LOG IN</ion-button>
        <ion-button shape="round" strong={true} slot="end" onClick={() => Router.push ('/signup')}>SIGN UP</ion-button>
      </ion-toolbar>
    </ion-header>
  );
};

export default Navbar;