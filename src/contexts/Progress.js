import { useState, createContext } from "react";

// 로딩 진행 여부 컨텍스트 생성
const ProgressContext = createContext({
    inProgress: false,
    spinner: { start: () => { }, stop: () => { } }
});

// 현재 로딩이 필요한지 state에 저장하고
// 로딩 시작, 끝에 대한 함수를 정의한다
const ProgressProvider = ({ children }) => {
    const [inProgress, setInProgress] = useState(false);
    const spinner = {
        start: () => setInProgress(true),
        stop: () => setInProgress(false)
    };

    // 현재 로딩 state 값과 스피너 제어 함수를 전달
    const value = { inProgress, spinner };
    return (
        <ProgressContext.Provider value={value}>
            {children}
        </ProgressContext.Provider>
    );
};

export { ProgressContext, ProgressProvider };