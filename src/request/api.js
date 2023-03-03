import service from './service';


export const RegisterApi = (params) => service.post('/account/register', params);

export const LoginApi = (params) => service.post('account/login', params);

export const LogoutApi = (params) => service.post('account/logout', params);

export const PageQuerySchemaApi = (params) => service.post('schema/pageQuerySchema', params);

export const PageQueryCompanyApi = (params) => service.post('schema/pageQueryCompany', params);

export const GetHotCompaniesApi = (params) => service.post('account/getHotCompanies', params);

export const GetHotProductsApi = (params) => service.post('product/getHotProducts', params);

export const pageQueryProductApi = (params) => service.post('product/pageQueryProduct', params);

export const GetHotTagsApi = (params) => service.post('tag/getHotTags', params);
