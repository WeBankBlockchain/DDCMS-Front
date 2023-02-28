import service from './service';


export const RegisterApi = (params) => service.post('/user/register', params);

export const LoginApi = (params) => service.post('user/login', params);

export const LogoutApi = (params) => service.post('user/logout', params);

export const PageQuerySchemaApi = (params) => service.post('schema/pageQuerySchema', params);
