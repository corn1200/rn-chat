import { useState, createContext } from "react";

// 회원 정보를 저장하는 컨텍스트 생성
const UserContext = createContext({
    user: { uid: null },
    setUser: () => { }
});

// 회원 정보를 저장하는 state 생성
// 회원 정보의 state 값과 setter를 전달
const UserProvider = ({ children }) => {
    const [user, setUserInfo] = useState({});
    const setUser = ({ uid }) => {
        setUserInfo({ uid });
    };
    const value = { user, setUser };
    return (
        <UserContext.Provider
            value={value}
        >
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };