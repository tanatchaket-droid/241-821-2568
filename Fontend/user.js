//1. load user ทั้งหมดจาก api /users
const BASE_URL = 'http://localhost:8000';
window.onload = async () => {
    await loadData();
}
const loadData = async () => {
    const response = await axios.get(`${BASE_URL}/users`);
    console.log(response.data); 
    //2.นำข้อมูลusersที่ได้มาแสดงในหน้าเว็บ
    const userDom = document.getElementById('user');
    let htmlData = '<div>'
    for (let i = 0; i < response.data.length; i++){
        let user = response.data[i];
        htmlData += `<div>
    ${user.id} ${user.firstName} ${user.lastName} 
    <button >Edit</button>
    <button class="delete-btn" data-id="${user.id}">Delete</button>
    </div>`
    }
    htmlData += '<div>'
    userDom.innerHTML = htmlData;
    const deleteDOMs = document.getElementsByClassName('delete');
    for (let i = 0; i < deleteDOMs.length; i++){
        deleteDOMs[i].addEventListener('click', async (event) => {
            const id = event.target.dataset.id;
            try {
                await axios.delete(`${BASE_URL}/users/${id}`);
                loadData();
             } catch (error) {
                console.error(error);
            }
        })
    }
}

