// import {Validation} from './validation';
class Form {
 errMessage = '';
 validationFail = false;
 form ;
 submitBtn ;
 callValidator;
 config = {
        selector: '', // should be class name
        action: '',
        validationType: 'inline' || 'other',
        fieldValidation: [{
            fieldName:'',       // should be same as name of input- field
            selector: '',       // should be different id in case of inline for every object. Can be same incase of other
            validators: [
                {name: '', message:'' },
                {name: '', value: 5, message: ''}]
        }],
        formSubmit: {
            selector: '', // should be id
            message:''  // message to show after form submission
        }
 }

 constructor(init) {
     Object.assign(this.config, init);
     this.callValidator = new Validation();
 }

 initialize() {
     this.form  = document.querySelector('.'+this.config.selector);
     this.submitBtn = this.form.querySelector('[type="submit"]');
     this.createEventListener();
 }


 createEventListener() {
     this.form.addEventListener('submit', (event) => {
         event.preventDefault();
         this.submitQuery();
     });
 }

 fetchOrResetFormFieldsValue(fetch = true) {
       let formData = {};
       for (let i = 0; i < this.form.length; i++) {
           let element = this.form[i];
           if (element.name !== "" && fetch) {
               formData[element.name] = element.value;
               this.checkValidation(element);
           } else {
               element.value = '';
           }
       }
       return formData
}

 submitQuery() {
     this.validationFail= false;
     // this.errMessage='';
     this.submitBtn.innerHTML = 'Please Wait...';
     let data = this.fetchOrResetFormFieldsValue(true);
     if(!this.validationFail && data) {
        this.sendData('POST', data);
     }
}

// validation file should be different with validations
 checkValidation(field) {
     this.errMessage = '';

    for(let i of this.config.fieldValidation) {
        if (i.fieldName === field.name) {
            for (let j of i.validators) {
                if (j.name === 'required' && this.callValidator.requiredValidation(field.value)) {
                    this.errMessage += j.message;
                } else if (field.value !== '') {
                    if ((j.name === 'minLength' && this.callValidator.minlengthValidation(field.value, j.value)) ||
                        (j.name === 'maxLength' && this.callValidator.maxLengthValidation(field.value, j.value))){
                        this.errMessage += '<br>' + j.message + " " + j.value;
                    }
                   if ((j.name === 'url' && this.callValidator.UrlValidation(field.value)) ||
                        (j.name ==='phone' && this.callValidator.phoneValidation(field.value)) ||
                        (j.name === 'regex' && this.callValidator.regexValidation(j.value)) ||
                        (j.name === 'custom' && this.callValidator.customValidation(j.value))) {
                        this.errMessage +='<br>'+ j.message;
                    }
                }
            }
            if (this.errMessage) {
                this.validationFail = true;
                let place;
                if (this.config.validationType === 'inline') {
                    place = field;
                } else {
                    this.errMessage = i.fieldName + ": " + this.errMessage;
                    place = this.form;
                }
                this.showErrorMessageInline(place, this.errMessage, i);
            }
        }
    }

}

 showErrorMessageInline(element, message, i) {
    let temp;
    if(i.selector) {
        temp = document.getElementById(i.selector);
        temp.innerHTML = message;
    } else {
        temp = document.createElement('div');
        temp.style.color = 'red';
        temp.classList.add('text-left');
        temp.innerHTML = message;
        element.insertAdjacentElement("afterend", temp);
    }
    this.submitBtn.innerHTML='Send Email';
    this.fadeOutEffect(temp);
}

 showMessageOther() {
    let temp;
    if(this.config.formSubmit.selector) {
        temp = document.getElementById(this.config.formSubmit.selector);
        temp.innerHTML = this.config.formSubmit.message;
    } else {
        temp = document.createElement('div');
        temp.style.color = 'red';
        temp.classList.add('text-left');
        temp.innerText = this.config.formSubmit.message;
        this.form.insertAdjacentElement("afterend", temp);
    }
    this.submitBtn.innerHTML='SEND EMAIL';
    this.fadeOutEffect(temp);
}

 sendData(method='get', data=undefined) {
    let prepareAPi = {
        headers: {'Content-Type': 'application/json'},
        method: method
    }
    if(method !== 'get' && data) {
        prepareAPi.body = JSON.stringify(data);
    }
    fetch(this.config.action, prepareAPi)
        .then()
        .then(() => {
            // for success or failure message need to create different function
            this.showMessageOther();
            this.fadeOutEffect(document.getElementById(this.config.formSubmit.selector), 2000);
            this.fetchOrResetFormFieldsValue(false);
            this.submitBtn.innerHTML = 'SUBMITTED';
            setTimeout(() => {
                this.submitBtn.innerHTML = 'SEND EMAIL';
            }, 5000);
        }).catch(() => {
            this.submitBtn.innerHTML = 'SEND EMAIL';
            const errorMessage = "Failed to send. Please refresh page and try again."
            this.showErrorMessageInline(this.form, errorMessage, this.config.formSubmit);
    });

}

 fadeOutEffect(temp, time) {
    setTimeout(()=> {
        let fadeTarget = temp;
        let fadeEffect = setInterval(function () {
            if (!fadeTarget.style.opacity) {
                fadeTarget.style.opacity = "1";
            }
            if (fadeTarget.style.opacity > "0") {
                fadeTarget.style.opacity -= "0.1";
            } else {
                clearInterval(fadeEffect);
                fadeTarget.remove();
            }
        }, 300);
    }, time);
}

/// added css using style is not working
}

