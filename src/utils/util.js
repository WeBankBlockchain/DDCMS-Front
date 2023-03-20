import constants from '../constants/constants';

function currentAccount() {
    const userName = localStorage.getItem('userName');
    const did = localStorage.getItem('did');
    const accountTypeCode = localStorage.getItem('accountType');
    const token = localStorage.getItem('token');

    return {
        exist: userName != null,
        userName: userName,
        did : did,
        accountRoleCode: accountTypeCode,
        accountRoleName: constants.accountRoleCodeToNames[accountTypeCode],
        token: token
    }   
}

function isVisibleByRoles(requiredRoleNameList) {
    return true;
    // const currentAcnt = currentAccount();
    // console.log(currentAcnt)
    // return requiredRoleNameList.some(requiredRoleName=>{
    //     const requiredRoleCode =getAccountTypeCodeByName(requiredRoleName);
    //     return currentAcnt.exist && currentAcnt.accountRoleCode == requiredRoleCode;
    // });
}

function getAccountTypeCodeByName(roleName){
    return constants.accountRoleNameToCodes[roleName];
}

export default{
    currentAccount,
    getAccountTypeCodeByName,
    isVisibleByRoles
}