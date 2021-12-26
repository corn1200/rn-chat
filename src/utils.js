// 입력 값이 이메일 형식과 맞는지 확인하는 함수
export const validateEmail = email => {
    const regex = /^[0-9?A-z0-9?]+(\.)?[0-9?A-z0-9?]+@[0-9?A-z]+\.[A-z]{2}.?[A-z]{0,3}$/;
    return regex.test(email);
};

// 입력 값이 비밀번호 형식과 맞는지 확인하는 함수
export const removeWhitespace = text => {
    const regex = /\s/g;
    return text.replace(regex, '');
};