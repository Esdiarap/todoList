<template>
  <input type="text" placeholder="请输入你要搜索的Todo" v-model.lazy="inputValue" @blur="search">
  <div class="profile">U</div>
</template>

<script>
import {ref} from "vue";
import {useStore} from "vuex";
export default {
  name: "TopBar",
  setup() {
    const store = useStore()
    const inputValue = ref('')
    function search(){
      store.commit('getSearchKey', inputValue.value)
    }
    return {
      inputValue,
      search
    }
  }
}
</script>

<style scoped lang="scss">
$input-color: 'black';
$profile-color: rgb(255, 235, 205);
$element-background-color: rgb(245, 245, 245);
input{
  width: 19.5rem;
  height: 2.5rem;
  padding: 0 1.5rem;
  border: none;
  color: $input-color;
  border-radius: 2.5rem;
  background-color: $element-background-color;
}

.profile {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 3rem;
  width: 2rem;
  height: 2rem;
  color: $profile-color;
  border-radius: 50%;
  background-color: powderblue;
}
</style>
