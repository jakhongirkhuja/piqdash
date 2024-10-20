<script>
import { useRoute } from 'vue-router'
export default {
    
    created() {
       const route = useRoute();
       if(route.query.token){
            localStorage.setItem('token', route.query.token);
            this.$emit('NewType_1',route.query.token);
          let self = this;
          try {
            const url = 'https://api.pharmiq.uz/api/v1/user';
            const options = {
                    method: 'GET',
                    headers: new Headers({
                    'Authorization': 'Bearer '+route.query.token, 
                    'Content-Type': 'application/json'
                }), 
            };

            fetch(url, options)
              .then((response) => {
                
                  if(response.status==401){
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href='https://go.pharmiq.uz/';
                  }
                    return response.json();
                })
              .then((json)=>{

                localStorage.setItem('user', JSON.stringify(json));
               
                
            })
              
            
          } catch (error) {
            console.error('Ошибка:', error);
          }
          
            
            this.$router.replace({ name: 'Dashboard'});
            
       }else{
        alert('not auth');
       }
       
    }
}
</script>