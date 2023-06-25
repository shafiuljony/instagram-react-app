import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import FirebaseContext from './context/firebase.js';
import { db, FieldValue } from './lib/firebase.js';

ReactDOM.createRoot(document.getElementById('root')).render( 
<FirebaseContext.Provider value={{ db, FieldValue}}>
    <App />
</FirebaseContext.Provider>
)
