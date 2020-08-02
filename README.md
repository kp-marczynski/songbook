# Songbook
PWA songbook with auto-scroll and real time auto-sharing currently playing song with campfire participants.

## Alternative version
Second version of this app is being developed in React: https://github.com/kp-marczynski/songbook-react
## Demo
<img src="songbook-demo.gif" width="480" height="800" />

## Prerequisites
* [Node.js 10+](https://nodejs.org/) 
* [Firebase CLI](https://firebase.google.com/docs/cli)

## How to start
First run `npm install` and then `npm start` or `ionic serve`

## How to use with Firebase 
* create firebase project
* add web app to firebase project and copy firebaseConfig to [environment.ts](/src/environments/environment.ts) file
* create firestore database and add security rules:

    
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
    
        match /songs/{songId} {
        	allow read, update, delete: if resource.data.owner == request.auth.uid && request.auth.uid == <<your_firebase_uid>>;
          allow create: if request.resource.data.owner == request.auth.uid && request.auth.uid == <<your_firebase_uid>>;
        }
    
        match /campfire/{campfireId} {
        	allow update, delete: if resource.data.owner == request.auth.uid && request.auth.uid == <<your_firebase_uid>>;
          allow create: if request.resource.data.owner == request.auth.uid && request.auth.uid == <<your_firebase_uid>>;
          allow read: if true;
          allow list: if false;
        }
    
        // deny rest
        match /{document=**} {
          allow read, write: if false;
        }
      }
    }

In place of `<<your_firebase_uid>>` use your real firebase uid. 
This rules guarantees only you would be able to insert data to firebase 
which will prevent extra costs during development phase due to [Firestore pricing](https://cloud.google.com/firestore/pricing).

## How to deploy

    ionic build --prod 
    firebase login
    firebase deploy
