/* eslint-disable import/no-anonymous-default-export */
import constants from "../constants/constants";

function currentAccount() {
  const userName = localStorage.getItem("userName");
  const did = localStorage.getItem("did");
  const accountTypeCode = localStorage.getItem("accountType");
  const token = localStorage.getItem("token");
  return {
    exist: userName != null,
    userName: userName,
    did: did,
    accountRoleCode: accountTypeCode,
    accountRoleName: constants.accountRoleCodeToNames[accountTypeCode],
    token: token,
  };
}

export default {
  currentAccount,
};
