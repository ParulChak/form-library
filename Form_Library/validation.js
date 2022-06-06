class Validation {

    requiredValidation(val) {
        if(val === '') {
            return true;
        }
    }

    minlengthValidation(val, minLimit) {
        if( val < minLimit) {
            return true;
        }
        return false;
    }

    maxLengthValidation(val, maxLimit) {
        if( val > maxLimit) {
            return true;
        }
        return false;
    }

    UrlValidation(val) {
        let regex = '/^(?:(?:https?|ftp):\\/\\/)(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\\.(?:[a-z\u00a1-\uffff]{2,}))\\.?)(?::\\d{2,5})?(?:[/?#]\\S*)?$/i';
        if(regex.test(val)) {
            return true;
        }
        return false;
    }

    phoneValidation(val) {
        const regex = new RegExp('^(\\d{1,20})$|^((\\+\\d{1,3}(-| )?\\(?\\d\\)?(-| )?\\d{1,5})|(\\(?\\d{2,6}\\)?))(-| )?(\\d{3,4})(-| )?(\\d{4})(-| )?((x|ext|;)(-| )?\\d{1,5}){0,1}$');
        if(regex.test(val)) {
            return true;
        }
        return false;
    }

    regexValidation(val) {
        const regex = val;
        if(regex.test(val)) {
            return true;
        }
        return false;
    }

    customValidation(val) {
        return val;
    }
}
