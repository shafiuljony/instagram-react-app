import { db, FieldValue } from '../lib/firebase';

export async function doseUsernameExist(userName){
    const result = await db.collection('users').where('userName', '==', userName).get();

    return result.docs.map((user) => user.data().length > 0 );
    
}