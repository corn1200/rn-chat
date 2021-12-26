import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getStorage, uploadBytes, getDownloadURL, ref } from 'firebase/storage';
import config from '../firebase.json';

// 파이어베이스 설정을 불러온다
const app = initializeApp(config);
const auth = getAuth(app);

// 이메일과 비밀번호로 로그인하고 유저 오브젝트 반환
export const signin = async ({ email, password }) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
};

// 이미지 업로드 함수
const uploadImage = async uri => {
    // 이미지가 https로 시작할 경우 바로 반환
    if (uri.startsWith('https')) {
        return uri;
    }

    // 이미지 작업
    const reponse = await fetch(uri);
    const blob = await reponse.blob();

    const { uid } = auth.currentUser;
    const storage = getStorage(app);
    const storageRef = ref(storage, `/profile/${uid}/photo.png`);
    await uploadBytes(storageRef, blob, {
        contentType: 'image/png',
    });

    // 이미지 url로 변환 후 반환
    return await getDownloadURL(storageRef);
};

// 회원 정보를 받아서 파이어베이스에 등록한다
export const signup = async ({ name, email, password, photo }) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    const photoURL = await uploadImage(photo);
    await updateProfile(auth.currentUser, { displayName: name, photoURL });
    return user;
};