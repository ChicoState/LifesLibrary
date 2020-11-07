# LifesLibrary

A simple app to organize all your media in one place. LifesLibary allows you to add books, movies, and TV shows just by taking a picture.

## Dependencies
- Node.JS LTS (https://nodejs.org/en/)
- Expo (https://docs.expo.io/get-started/installation/)
- yarn
- An android emulator

## Install Guide
1. Fork Repo into desired location
2. $yarn install
3. Create and firebase project and init a firestore database
4. Create Firestore.js file in components folder with code below.

    import * as firebase from 'firebase';
    import firestore from 'firebase/firestore'

    const settings = {timestampsInSnapshots: true};

    const firebaseConfig = {
      apiKey: "XXXXX",
      authDomain: "XXXXX",
      databaseURL: "XXXXX",
      projectId: "XXXXX",
      storageBucket: "XXXXX",
      messagingSenderId: "XXXXXXXXXX",
      appId: "XXXXX",
      measurementId: "XXXXX"
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    export default firebase;

5. Start your android emulator
6. $expo start
7. Once it builds press 'a' to push the app to your android device
