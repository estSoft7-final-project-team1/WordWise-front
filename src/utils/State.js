import { atom } from 'recoil';

const loginState =  atom(
    {
      key: "login",
      default: false
    }
);

const wordSearchKeyword = atom(
    {
      key: "searchKeyword",
      default: ""
    }
);


export { loginState, wordSearchKeyword };

