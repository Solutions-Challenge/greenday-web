import '../styles/globals.css'
import "../firebase.config";
import type { AppProps } from 'next/app'
import React, { ReactText, useEffect } from 'react'
import { defineCustomElements as ionDefineCustomElements } from '@ionic/core/loader';
import { home, map } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/core/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/core/css/normalize.css';
import '@ionic/core/css/structure.css';
import '@ionic/core/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/core/css/padding.css';
import '@ionic/core/css/float-elements.css';
import '@ionic/core/css/text-alignment.css';
import '@ionic/core/css/text-transformation.css';
import '@ionic/core/css/flex-utils.css';
import '@ionic/core/css/display.css';

import { JSX as LocalJSX} from '@ionic/core'
import {JSX as IoniconsJSX} from 'ionicons'
import { HTMLAttributes } from 'react'
import Router from 'next/router';

type ToReact<T> = {
  [P in keyof T]?: T[P] & Omit<HTMLAttributes<Element>, 'className'> & {
    class?: string;
    key?: ReactText;
  }
}

declare global {
  export namespace JSX {
    interface IntrinsicElements extends ToReact<LocalJSX.IntrinsicElements & IoniconsJSX.IntrinsicElements> {
      key?: string;
    }
  }
}

function MyApp({ Component, pageProps }:AppProps) {
  useEffect(() => {
    ionDefineCustomElements(window)
  })
  return (
    <ion-app>
      <ion-header translucent>
        <ion-toolbar id='green-day-header'>
          <ion-title color='dark' size='large'>Green Day</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content fullscreen>
        <Component {...pageProps} />
      </ion-content>

      <ion-footer>
        <ion-tab-bar id='green-day-footer'>
          <ion-tab-button tab="home" selected={false} onClick={() => Router.push('/home')}>
            <ion-icon icon={home} />
            <ion-label>Home</ion-label>
          </ion-tab-button>
          <ion-tab-button tab="map" selected={false} onClick={() => Router.push('/map')}>
            <ion-icon icon={map} />
            <ion-label>Map</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-footer>
    </ion-app>
  )
}

export default MyApp
