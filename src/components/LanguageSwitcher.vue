<template>
    <label class="language-switcher">
        <input @change="getvalue" type="checkbox"  v-model="lang">
        <span class="slider round"></span>
        <span class="select-ru">RU</span>
        <span class="select-uz">UZ</span>
    </label>
</template>
<script>

    export default{
        data() {
            return {
                lang:'ru',
            }
        },
        methods: {
            getvalue(){
                if(this.lang){
                        this.$i18n.locale  = 'uz';
                }else{
                        this.$i18n.locale  = 'ru';
                }
            }
        },
    }
</script>
<style scoped>

.language-switcher {
  position: relative;
  display: inline-block;
  width: 68px;
  height:  34px;
  transition: transform 0.17s cubic-bezier(0.26, 0.48, 0.08, 0.9);
  }

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .select-ru,
  .select-uz {
    position: absolute;
    font-size: 15px;
    top: 7px;
    color: #fff;
    mix-blend-mode: difference;    
  }
  .select-ru {
    left: 6px;
  }
  .select-uz {
    right: 8px;
  }


/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #1e3470;
  box-shadow: 0 3px 34px rgba(#1e3470, .1);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 34px;
  width: 34px;
  left: 0;
  bottom: 0;
  background-color: white;
    box-shadow: 0 3px 34px rgba(#1e3470, .16);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #1e3470;
}

input:focus + .slider {
  box-shadow: none;
}

input:checked + .slider:before {
  -webkit-transform: translateX(34px);
  -ms-transform: translateX(34px);
  transform: translateX(34px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

</style>