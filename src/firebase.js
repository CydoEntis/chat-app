import firebase from 'firebase/app';
import 'firebase/auth';

export const auth = firebase
	.initializeApp({
		apiKey: 'AIzaSyALGYgnOMRiyqvEsHfbuxmAyIneii1oYFA',
		authDomain: 'discube-f61f7.firebaseapp.com',
		projectId: 'discube-f61f7',
		storageBucket: 'discube-f61f7.appspot.com',
		messagingSenderId: '144292887760',
		appId: '1:144292887760:web:ae5c97ab7e47de8344f2d5',
	})
	.auth();
