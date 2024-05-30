import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"care-assistant-caa3f","appId":"1:835973821037:web:c36eb4e2a58759171dc564","storageBucket":"care-assistant-caa3f.appspot.com","apiKey":"AIzaSyB_ny7bqf0dQz8qifB_6Q9Pc-GPz909xWI","authDomain":"care-assistant-caa3f.firebaseapp.com","messagingSenderId":"835973821037","measurementId":"G-LND2G64LH1"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),
  ],
});
