function formValidation(
  form,
  fileSize=2,
  fileType = ["image/jpeg", "image/jpg", "image/png"],
) {
  !!document.querySelector(".form-error") &&
    [...document.querySelectorAll(".form-error")].map((e) => e.remove());

  let formData = new FormData(form);
  let status = [];
  for (var key of formData.keys()) {
    var element = form.querySelector(`input[name="${key}"]`);
    if(element.value===''){
      if(element.hasAttribute('required')){
        status.push({
          success: false,
          message: `Filed is required.`,
          element,
        });
      }
    }else{
      switch (element.type) {
        case "text":
          {
            let pattern = /^\w+[\s?\w]*$/g;
            let result = pattern.test(element.value.trim());
  
            if(element.value.length>15){
              status.push({
                success: false,
                message: `Sorry! Too long text.`,
                element,
              });
  
            }else if(!result){
              console.log('pass'+result);
              status.push({
                success: false,
                message: `Sorry! No charter allow.`,
                element,
              });
            }
          }
          break;
        case "file":
          {
            if (!fileType.includes(formData.get(key).type)) {
              status.push({
                success: false,
                message: `Sorry! ${formData.get(key).type} doesn't support.`,
                element,
              });
            }else if(formData.get(key).size>=fileSize*1000000){
                  status.push({
                      success: false,
                      message: `Sorry! File Size is more then ${fileSize}MB`,
                      element,
                    });
              }
            
          }
          break;
        case "tel":{
          let pattern=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3,4}[-\s\.]?[0-9]{4,6}$/;
          let result=pattern.test(element.value.trim());
          if(!result){
            status.push({
              success: false,
              message: `Sorry! Invalid Phone Number.`,
              element,
            });
          }
        }
        break;
        case 'email':{
          let pattern=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
          if(!pattern.test(element.value.trim())){
            status.push({
              success: false,
              message: `Sorry! Invalid Email id.`,
              element,
            });
          }
        }
        break;
  
      }
    }
  }

  for (var i = 0; i != status.length; i++) {
    if (!status[i].success) {
      status[i].element.insertAdjacentHTML(
        "afterend",
        `<p class='form-error'> ${status[i].message}</p>`,
      );
    }
  }
  for (var i = 0; i != status.length; i++) {
    if (!status[i].success) {
      return false;
      break;
    }
  }
  return true;
}
