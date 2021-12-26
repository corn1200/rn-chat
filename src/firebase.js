import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import config from '../firebase.json';

// 파이어베이스 설정을 불러온다
const app = initializeApp(config);
const auth = getAuth(app);

// 이메일과 비밀번호로 로그인하고 유저 오브젝트 반환
export const signin = async ({ email, password }) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
};