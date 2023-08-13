
// Данные пользователя
export interface IUserData {
    email: string;
    login: string;
    fio: string;
    password: string;
}

// Данные, передаваемые при авторизации
export interface ILoginData {
    login: string;
    password: string;
}

// Данные, возвращаемые как информация о пользователе
export interface IUserInfo {
    id: number;
    login: string;
    fio: string;
}

// Данные, хранимые в сессии
export interface ISessionData {
    id: number;
    email: string;
    login: string;
}