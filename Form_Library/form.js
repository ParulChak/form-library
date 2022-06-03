class Form {
 errMessage = '';
 form ;
 submitBtn ;
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
            massage:''  // message to show after form submission
        }
    }

 constructor(init) {
     Object.assign(this.config, init);
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
     this.errMessage='';
     this.submitBtn.innerHTML = 'Please Wait...';
     let data = this.fetchOrResetFormFieldsValue(true);
     if(this.errMessage==='' && data) {
        this.sendData('POST', data);
     }
}

// validation file should be different with validations
 checkValidation(field) {
    for(let i of this.config.fieldValidation) {
        if (i.fieldName === field.name) {
            for (let j of i.validators) {
                if (j.name === 'required' && field.value === '') {
                    this.errMessage += '\n'+j.message;
                }
                if (j.name === 'minLength' && field.value < j.value) {
                    this.errMessage += '\n' + j.message + j.value;
                }
                if (j.name === 'maxLength' && field.value > j.value) {
                    this.errMessage += '\n' + j.message + j.value;
                }
            }

            if(this.config.validationType === 'inline') {
                this.showErrorMessageInline(field, this.errMessage, i)
            } else {
                this.showMessageOther(this.errMessage, i)
            }
        }
    }

}

 showErrorMessageInline(element, message, i) {
    let temp = '';
    if(i.selector) {
        temp = document.getElementById(i.selector);
        temp.innerHTML = message;
    } else {
        temp = document.createElement('div');
        temp.style.color = 'red';
        temp.innerHTML = message;
        element.appendChild(temp);
    }
    this.submitBtn.innerHTML='Send Email';
    this.fadeOutEffect(temp);
}

 showMessageOther(message, ele) {

    let temp = '';
    if(ele.selector) {
        temp = document.getElementById(ele.selector);
        temp.innerHTML = message;
    } else {
        temp = document.createElement('div');
        temp.style.color = 'red';
        temp.innerText = message;
        this.form.appendChild(temp);
        console.log(this.form);
    }
    this.submitBtn.innerHTML='Send Email';
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
        .then(function() {
            // for success or failure message need to create different function
            this.showMessageOther(this.config.formSubmit.massage, this.config.formSubmit);
            this.fadeOutEffect(document.getElementById(this.config.formSubmit.selector), 2000);
            this.fetchOrResetFormFieldsValue(false);
            this.submitBtn.innerHTML = 'SUBMITTED';
            setTimeout(function() {
                this.submitBtn.innerHTML = 'SEND EMAIL';
            }, 5000);
        }).catch((err) => {
            console.log(this.submitBtn, '123');
            this.submitBtn.innerHTML = 'SEND EMAIL';
            this.showMessageOther(err, this.config.formSubmit);
    });

}

 fadeOutEffect(temp, time) {
    setTimeout(()=> {
        var fadeTarget = temp;
        var fadeEffect = setInterval(function () {
            if (!fadeTarget.style.opacity) {
                fadeTarget.style.opacity = "1";
            }
            if (fadeTarget.style.opacity > "0") {
                fadeTarget.style.opacity -= "0.1";
            } else {
                clearInterval(fadeEffect);
            }
        }, 1000);
    }, time);
}

/// added css using style is not working
}
