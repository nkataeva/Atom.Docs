
// Данные пользователя
export interface IUserData {
    email: string;
    login: string;
    fio: string;
    password: string;
}

// Данные, передаваемые при авторизации
export interface ILoginData {
    login: string,
    password: string
}