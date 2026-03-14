const BASE_URL = 'http://localhost:8000';

let mode = 'CREATE';
let selectedID = ''

window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log('id', id);
    if (id){
        mode = 'EDIT';
        selectedID = id;
        //1.ดึงข้อมูล user ที่ต้องการแก้ไข
        try{
            const response = await axios.get(`${BASE_URL}/users/${id}`);
            const user = response.data;
            console.log('response', response.data);
            //2.นำข้อมูลที่ได้มาแสดงใน form
             let firstNameDOM = document.querySelector('input[name="firstname"]');
             let lastNameDOM = document.querySelector('input[name="lastname"]');
             let ageDOM = document.querySelector('input[name="age"]');
             let descriptionDOM = document.querySelector('textarea[name="description"]');

             firstNameDOM.value = user.firstName;
             lastNameDOM.value = user.lastName;
             ageDOM.value = user.age;
             descriptionDOM.value = user.description;

             let genderDOM = document.querySelector('input[name="gender"]')
             let interestsDOM = document.querySelectorAll('input[name="interests"]')

             for(let i = 0; i < genderDOM.length; i++){
                if (genderDOM[i].value == user.gender) {
                    genderDOM[i].checked = true;
                }
             }
             for(let i = 0; i < interestsDOM.length; i++){
                if (user.interests.includes(interestsDOM[i].value)) {
                    interestsDOM[i].checked = true;
                }
             }

        }catch (error){
            console.log('error', error);

        }
    }
}

const validateData = (userData) => {
    
    let errors = [];
    if (!userData.firstName) {
        errors.push('กรุณากรอกชื่อ');
    }
    if (!userData.lastName) {
        errors.push('กรุณากรอกนามสกุล');
    }
    if (!userData.age) {
        errors.push('กรุณากรอกอายุ');
    }      
    if (!userData.gender) {
        errors.push('กรุณาเลือกเพศ');
    }
    if (!userData.interests) {     
        errors.push('กรุณาเลือกความสนใจอย่างน้อย 1 อย่าง');
    }
    if (!userData.description) {
        errors.push('กรุณากรอกคำอธิบายเกี่ยวกับตัวคุณ');
    }
    return errors;

}
const submitData = async () => {
    let firstNameDOM = document.querySelector('input[name="firstname"]');
    let lastNameDOM = document.querySelector('input[name="lastname"]');
    let ageDOM = document.querySelector('input[name="age"]');
    let genderDOM = document.querySelector('input[name="gender"]:checked') || {};
    let interestsDOM = document.querySelectorAll('input[name="interests"]:checked') || {};
    let descriptionDOM = document.querySelector('textarea[name="description"]');
    let messageDOM = document.getElementById('message')

    try {
    let interest = ''
    for (let i = 0; i <interestsDOM.length; i++){
        interest += interestsDOM[i].value
        if( i != interestsDOM.length - 1){
            interest += ','
        }
    }

    let userData = {
        firstName: firstNameDOM.value,
        lastName: lastNameDOM.value,
        age: ageDOM.value,
        gender: genderDOM.value,
        description: descriptionDOM.value,
        interests : interest
    }
    const errors = validateData(userData);
    if (errors.length > 0){ 
        //ถ้ามี error
        throw{
            message : 'กรอกข้อมูลไม่ครบถ้วน',
           errors : errors
        }

    }
    if(mode == 'CREATE'){
        const response = await axios.post(`${BASE_URL}/users`, userData);
        console.log('response', response.data);
    }else {
        const response = await axios.put(`${BASE_URL}/users/${selectedID}`, userData);
        message = 'แก้ไขข้อมูลสำเร็จ';
        console.log('response', response.data);
    }
    messageDOM.innerText = message;
    messageDOM.className = 'message success'
     
    } catch (error){
        console.log('error message', error.message);
        console.log('error',error.errors);
        if (error.response) {
            console.log('Error response:', error.response);
            error.message = error.response.data.message;
            error.errors = error.response.data.error.errors;
        }
        let htmlData = '<div>'
        htmlData += `<div>${error.message}</div>`
        htmlData += '<ul>'
        for (let i = 0; i < error.errors.length; i++){
            htmlData += `<li>${error.errors[i]}</li>`
        }
        htmlData += '</ul>'
        htmlData += '<div>'

        messageDOM.innerHTML = htmlData
        messageDOM.className = 'message danger'
    }
}
