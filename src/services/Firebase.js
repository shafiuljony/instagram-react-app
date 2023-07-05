import { db, FieldValue } from '../lib/firebase';

export async function doseUsernameExist(userName){
    const result = await db.collection('users').where('userName', '==', userName).get();

    return result.docs.map((user) => user.data().length > 0 );
    
}

export async function getUserByUserId(userId){
    const result = await db.collection('users').where('userId', '==', userId).get();

    const user = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));

    return user;
}

export async function getSuggestedProfiles(userId, following){
    const result = await db.collection('users').limit(10).get();

    return result.docs.map((user) => ({ ...user.data(), docId: user.id}))
        .filter((profile) => profile.userId !== userId && !following.includes(profile.userId));
}