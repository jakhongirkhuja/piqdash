
function checkToken() {
    if(localStorage.getItem('token') && localStorage.getItem('token').length>12){
        return true;
    }else{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href='https://go.pharmiq.uz/';
    }
    
}   
export {checkToken};