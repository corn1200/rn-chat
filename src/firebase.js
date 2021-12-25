import * as firebase from 'firebase';
import config from '../firebase.json';

// 파이어베이스 설정을 불러온다
const app = firebase.initializeApp(config);