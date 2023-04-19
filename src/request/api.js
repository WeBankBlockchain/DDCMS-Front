import service from "./service";

export const RegisterApi = (params) =>
  service.post("/account/register", params);

export const LoginApi = (params) => service.post("account/login", params);

export const LogoutApi = (params) => service.post("account/logout", params);

export const SearchCompanyApi = (params) =>
  service.post("account/searchCompany", params);

export const QueryCompanyByUsernameApi = (params) =>
  service.post("account/queryCompanyByUsername", params);

export const QueryCompanyByAccountIdApi = (params) =>
  service.post("account/queryCompanyByAccountId", params);

export const ApproveAccountApi = (params) =>
  service.post("account/approveAccount", params);

export const DownloadFileApi = (params) =>
  service.get("file/download", {
    responseType: "blob",
    params,
  });

export const PageQuerySchemaApi = (params) =>
  service.post("schema/pageQuerySchema", params);

export const GetHotCompaniesApi = (params) =>
  service.post("account/getHotCompanies", params);

export const GetHotProductsApi = (params) =>
  service.post("product/getHotProducts", params);

export const PageQueryProductApi = (params) =>
  service.post("product/pageQueryProduct", params);

export const PageQueryMyProductApi = (params) =>
  service.post("product/pageQueryMyProduct", params);

export const QueryProductByIdApi = (params) =>
  service.post("product/queryProductById", params);

export const CreateProductApi = (params) =>
  service.post("product/createProduct", params);

export const updateProductApi = (params) =>
  service.post("product/updateProduct", params);

export const ApproveProductApi = (params) =>
  service.post("product/approveProduct", params);

export const GetHotTagsApi = (params) => service.post("tag/getHotTags", params);

export const QueryDataSchemaApi = (params) =>
  service.post("schema/querySchemaById", params);

export const QueryDataSchemaAccessInfoApi = (params) =>
  service.post("schema/querySchemaAccessById", params);

export const NewDataSchemaApi = (params) =>
  service.post("schema/createSchema", params);

export const ApproveDataSchemaApi = (params) =>
  service.post("schema/approveDataSchema", params);

export const PageQueryMySchemaApi = (params) =>
  service.post("schema/pageQueryMySchema", params);

export const AddSchemaFavoriteApi = (params) =>
  service.post("schema/addSchemaFavorite", params);

export const DelSchemaFavoriteApi = (params) =>
  service.post("schema/delSchemaFavorite", params);


export const PageQueryMyFavSchemaApi = (params) =>
  service.post("schema/pageQueryMyFavSchema", params);

export const GetMenuByRoleApi = (params) =>
  service.post("menu/getMenuByRole", params);

export const GetProductsByProviderIdApi = (params) =>
  service.post("product/getProductsByProviderId", params);
