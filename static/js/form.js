
const setError = (elementSelector,errorMessage,inputSelector='',initValue='',focus=false) => {
    error = `<p class="error">${errorMessage}</p>`
    if (!document.querySelector(elementSelector).innerHTML.endsWith(error)) document.querySelector(elementSelector).innerHTML += error
    initValue ? document.querySelector(inputSelector).value = initValue: null
    inputSelector && focus?document.querySelector(inputSelector).focus():null
}
const deleteError = selector =>{
    if ( document.querySelector(selector).children[document.querySelector(selector).children.length - 1] == document.querySelector(selector + ' .error') )
        document.querySelector(selector).removeChild(document.querySelector(selector + ' .error'))
}
/********************************************************* */
r = null

clickedElement = ""
products = document.querySelector('.productDetails') ? document.querySelectorAll('.productDetails') : document.querySelectorAll('.product')
products ? products.forEach(form=>{
    form.addEventListener('submit',e=>{
        e.preventDefault()
        var form = e.target
        var formData = new FormData(form);
        // console.log(formData.get("id"))
        var data = [];
        for ( var i = 0; i < form.elements.length; i++ ) {
            var name = form.elements[i].name;
            if (name === clickedElement || formData.get(name) != null ){
                data.push(name + "=" + encodeURIComponent(formData.get(name)));                
            } 
        }
        var queryString = data.join("&");
        
        const xhttp = new XMLHttpRequest
        
        xhttp.open("POST", e.target.action);
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status){    
                if ( (clickedElement === "love" && window.location.href.endsWith("/accounts/wishes") ) || (clickedElement === "addToCart" && window.location.href.endsWith("/accounts/cart") ) ) {
                    e.target.remove(e.target)
                }
                
                if (clickedElement === "love"){
                    el = document.querySelector(`#${e.target.getAttribute("id")} #${clickedElement}`)
                    svg = document.querySelector(`#${e.target.getAttribute("id")} #${clickedElement} svg`)
                    if (svg.classList.contains('bi-heart-fill')){
                        newElement=`
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
                        </svg>
                    `
                    }else if (svg.classList.contains('bi-heart')){
                        newElement = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"></path>
                        </svg>
                    `
                    }
                    el.innerHTML = (newElement)
                }else if(clickedElement === "addToCart") {
                    el = document.querySelector(`#${e.target.getAttribute("id")} #${clickedElement}`)
                    svg = document.querySelector(`#${e.target.getAttribute("id")} #${clickedElement} svg`)
                    if (svg.classList.contains('bi-cart-x-fill')){
                        newElement=`
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
                            <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
                            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                        </svg>
                    `
                    }else if (svg.classList.contains('bi-cart-plus')){
                        newElement = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart-x-fill" viewBox="0 0 16 16">
                            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7.354 5.646 8.5 6.793l1.146-1.147a.5.5 0 0 1 .708.708L9.207 7.5l1.147 1.146a.5.5 0 0 1-.708.708L8.5 8.207 7.354 9.354a.5.5 0 1 1-.708-.708L7.793 7.5 6.646 6.354a.5.5 0 1 1 .708-.708z"/>
                        </svg>
                    `
                    }
                    el.innerHTML = (newElement)
                }
            }
        }
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(queryString);
        
        /********************************************** */
        
    })
}) : null

signUp = document.querySelector("#signUp")
signUp ? signUp.addEventListener("submit",e=>{
    
    e.preventDefault()

    form = e.target
    firstNameInput = form.first_name
    lastNameInput = form.last_name
    usernameInput = form.username
    watermarkInput = form.watermark
    emailInput = form.email
    passwordInput = form.password
    phoneNumberInput = form.phoneNumber
    address1Input = form.address1
    address2Input = form.address2
    csrfToken = form.csrfmiddlewaretoken.value
    image = form.image.files[0]
    
    if (firstNameInput.value.length >= 3){
        first_name = firstNameInput.value
        deleteError('#first_name')
    }else{ 
        first_name = null
        setError('#first_name',"خطأ!... يجب ان يكون الاسم الاول اكبر من او يساوي 3 حروف",'#id_first_name',firstNameInput.value)
    }
    
    if(lastNameInput.value.length >= 3){
        last_name = lastNameInput.value 
        deleteError('#last_name')
    }else{ 
        last_name = null
        setError('#last_name',"خطأ!... يجب ان يكون الاسم الأخير اكبر من او يساوي 3 حروف",'#id_last_name',lastNameInput.value)
    }
    
    if(usernameInput.value.length > 3){
        username = usernameInput.value 
        deleteError('#username')
    }else{ 
        username = null
        setError('#username',"خطأ!... يجب ان يكون اسم المستخدم اكبر من 3 حروف",'#id_username',usernameInput.value)
    }
    
    if(watermarkInput.value.length >= 3){
        watermark = watermarkInput.value 
        deleteError('#watermark')
    }else{ 
        watermark = null
        setError('#watermark',"خطأ!... يجب ان تكون العلامة المائية اكبر من او تساوي 3 حروف",'#id_watermark',watermarkInput.value)
    }
    
    if((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput.value))){
        email = emailInput.value 
        deleteError('#email')
    }else{ 
        email = null
        setError('#email',"خطأ!... يجب كتابة الايمبل بشكل صحيح",'#id_email',emailInput.value)
    }
    
    if(passwordInput.value.length >= 8){
        password = passwordInput.value 
        deleteError('#password')
    }else{ 
        password = null
        setError('#password',"خطأ!... يجب ان تكون كلمة المرور اكبر من او تساوي 8 حروف",'#id_password',passwordInput.value)
    }
    
    if(phoneNumberInput.value.length >= 11){
        phoneNumber = phoneNumberInput.value 
        deleteError('#phoneNumber')
    }else{ 
        phoneNumber = null
        setError('#phoneNumber',"خطأ!... يجب ان يكون رقم الهاتف اكبر من او يساوي 11 رقم",'#id_phoneNumber',phoneNumberInput.value)
    }
    
    if(address1Input.value){
        address1 = address1Input.value
        deleteError('#address1')
    }else{
        address1 = null
        setError('#address1',"خطأ!... يجب ادخال العنوان الاول",'#id_address1',address1Input.value)
    }
    address2 = address2Input.value ? address2Input.value : "لا يوجد!"
    
    var freshData = [csrfToken,first_name,last_name,username,watermark,email,password,phoneNumber,address1,address2,image];
    validData = freshData.filter(i=>i)
    is_valid = validData.length == freshData.length
    if (is_valid) {    
        // var data = [
        //     "csrfmiddlewaretoken="+csrfToken,
        //     "first_name="+first_name,
        //     "last_name="+last_name,
        //     "username="+username,
        //     "watermark="+watermark,
        //     "email="+email,
        //     "password="+password,
        //     "phoneNumber="+phoneNumber,
        //     "address1="+address1,
        //     "address2="+address2,
        //     "image="+image,
        // ];
        // var queryString = data.join("&");
        // console.log(queryString);
        formData = new FormData(form);
        const xhttp = new XMLHttpRequest
        xhttp.open("POST", form.action);
        // xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(formData)

        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                window.location.href='/accounts/signin'
            }
            else if (this.readyState == 4){
                errorMessage = this.response.substring(this.response.indexOf(">" , this.response.indexOf("<pre") ) + 1, this.response.indexOf("</pre>"))
                // username exsist
                errorMessage.includes("UNIQUE constraint") ? setError('#username',"خطأ!... اسم المستخدم موجود من قبل",'#id_username',username,true) : null
            }
        }
    }
}) : null

editProfile = document.querySelector("#editProfile")
editProfile ? editProfile.addEventListener("submit",e=>{
    
    e.preventDefault()

    form = e.target

    firstNameInput = form.first_name
    lastNameInput = form.last_name
    watermarkInput = form.watermark
    emailInput = form.email
    phoneNumberInput = form.phoneNumber
    address1Input = form.address1
    address2Input = form.address2
    csrfToken = form.csrfmiddlewaretoken.value
    image = form.image.files[0]
    image_clear = form['image-clear'].value 

    if (firstNameInput.value.length >= 3){
        first_name = firstNameInput.value
        deleteError('#first_name')
    }else{ 
        first_name = null
        setError('#first_name',"خطأ!... يجب ان يكون الاسم الاول اكبر من او يساوي 3 حروف",'#id_first_name',firstNameInput.value)
    }
    
    if(lastNameInput.value.length >= 3){
        last_name = lastNameInput.value 
        deleteError('#last_name')
    }else{ 
        last_name = null
        setError('#last_name',"خطأ!... يجب ان يكون الاسم الأخير اكبر من او يساوي 3 حروف",'#id_last_name',lastNameInput.value)
    }
    
    if(watermarkInput.value.length >= 3){
        watermark = watermarkInput.value 
        deleteError('#watermark')
    }else{ 
        watermark = null
        setError('#watermark',"خطأ!... يجب ان تكون العلامة المائية اكبر من او تساوي 3 حروف",'#id_watermark',watermarkInput.value)
    }
    
    if((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput.value))){
        email = emailInput.value 
        deleteError('#email')
    }else{ 
        email = null
        setError('#email',"خطأ!... يجب كتابة الايمبل بشكل صحيح",'#id_email',emailInput.value)
    }
    
    if(phoneNumberInput.value.length >= 11){
        phoneNumber = phoneNumberInput.value 
        deleteError('#phoneNumber')
    }else{ 
        phoneNumber = null
        setError('#phoneNumber',"خطأ!... يجب ان يكون رقم الهاتف اكبر من او يساوي 11 رقم",'#id_phoneNumber',phoneNumberInput.value)
    }
    
    if(address1Input.value){
        address1 = address1Input.value
        deleteError('#address1')
    }else{
        address1 = null
        setError('#address1',"خطأ!... يجب ادخال العنوان الاول",'#id_address1',address1Input.value)
    }
    address2 = address2Input.value ? address2Input.value : "لا يوجد!"
    
    var freshData = [csrfToken,first_name,last_name,watermark,email,phoneNumber,address1,address2,image];
    validData = freshData.filter(i=>i)
    is_valid = validData.length == freshData.length
    if (is_valid) {    

        formData = new FormData(form);
        const xhttp = new XMLHttpRequest
        xhttp.open("POST", form.action);
        xhttp.send(formData)

        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                window.location.href='/accounts/profile'
            }
            else if (this.readyState == 4){
                errorMessage = this.response.substring(this.response.indexOf(">" , this.response.indexOf("<pre") ) + 1, this.response.indexOf("</pre>"))
                // username exsist
                errorMessage.includes("UNIQUE constraint") ? setError('#username',"خطأ!... اسم المستخدم موجود من قبل",'#id_username',username,true) : null
            }
        }
    }
}) : null