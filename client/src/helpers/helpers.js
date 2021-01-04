import { useEffect } from 'react';

const textFilter = (email, num) => {
    if (email.length > num) {
      // removing 17 characters from end
      let newEmail = email.split("");
      let remove = newEmail.length - num;
      newEmail.splice(-remove);

      return newEmail;
    } else {
      return email;
    }
}

const copyToClipboard = (value) => {
  let tempInput = document.createElement("input");
  tempInput.value = value;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
};

export {
  textFilter, 
  copyToClipboard
};