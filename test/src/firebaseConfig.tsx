import {initializeApp} from "firebase/app";
import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAkTPwKPtm-6RtWu_PR3LHAuuSx2ISK8bQ",
    authDomain: "exchanges-b4fe1.firebaseapp.com",
    projectId: "exchanges-b4fe1",
    storageBucket: "exchanges-b4fe1.appspot.com",
    messagingSenderId: "306322295860",
    appId: "1:306322295860:web:ab052ff6bd340ce14a4e61"
  };

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)





// import app from 'firebase/app'
// import 'firebase/database';
// import { useDispatch } from 'react-redux';


// const dispatch = useDispatch();

// app.initializeApp(firebaseConfig);
// function getTodos(){
//     firebase.database.ref('users').on('value', (snapshot) => {
//         const vals = snapshot.val();
//         let _records = [];
//         for(var key in vals){
//             _records.push({
//                 ...vals[key],
//                 id: key
//             });
//         }
//         console.log('dispatch', _records);
//         // dispatch(setTodos(_records));
//     })
// }
