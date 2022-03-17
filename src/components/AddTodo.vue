<template>
  <teleport to="body">
    <div class="add-todo-mask">
      <div class="add-todo-card">
        <h1>请输入待办事项</h1>
        <input type="text" placeholder="待办事项不可以是空"
               v-model="todoData"
               @keyup.enter="addTodo"
               @keyup.esc="closeAdd"
               v-focus

        >

        <div class="add-todo-button-container">
          <button @click="addTodo" class="universal add-button">点我添加</button>
          <button @click="closeAdd" class="universal close-button">点我关闭</button>
        </div>

      </div>
    </div>
  </teleport>
</template>

<script>
import {useStore} from "vuex";
import {nanoid} from "nanoid";
import {ref} from "vue";
export default {
  name: "AddTodo",
  emits:['close'],
  directives:{
    focus(el){
      el.focus()
    }
  },
  setup(props, context) {
    const store = useStore();
    const todoData = ref('');
    const {emit} = context;

    function addTodo() {
      store.dispatch('addTodo', {
        id: nanoid(),
        value: todoData.value,
        completed: false,
        important: false,
        isEdit: false
      }).then(() => {
        closeAdd()
      }).catch(error => {
        console.log(error)
        closeAdd()
      })

    }
    function closeAdd(){
      emit('close');
    }

    return {
      addTodo,
      closeAdd,
      todoData
    }
  }
}
</script>

<style scoped lang="scss">
.add-todo-mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, .2);
}
.add-todo-card{
  // 定位
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 50vw;
  height: 50vh;
  background-image: linear-gradient(to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%);

  //
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 20px;

  input{
    width: 80%;
    height: 3rem;
    border: 1px solid transparent;
    border-radius: 20px;
    padding-left: 1rem;
    font-size: 2rem;
  }

  .add-todo-button-container{
    width: 80%;
    display: flex;
    justify-content: space-evenly;

    .universal{
      height: 3rem;
      width: 6rem;
      border: 1px solid transparent;
      border-radius: 10px;
      font-size: 1.3rem;
      cursor: pointer;
    }

    .add-button{
      background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
    }

    .close-button{
      background-image: linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%);
    }
  }
}

</style>
