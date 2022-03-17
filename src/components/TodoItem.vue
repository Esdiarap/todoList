<template>
  <div class="todo-left-container">
    <!--勾选-->
    <input type="checkbox" :checked="todo.completed" @change="toggleCompleted(todo.id)" :id="checkboxId">
    <label :for="checkboxId" class="checkbox-label"></label>
    <!--<input type="checkbox" v-model="todo.completed">-->
    <!--Todo内容-->
    <div class="todo-show">
      <span v-show="!todo.isEdit">{{ todo.value }}</span>
      <input v-show="todo.isEdit" type="text" ref="todoInput" @blur="changeTodoValue(todo.id, $event)"
             placeholder="不可以将Todo内容设置为空">
    </div>

  </div>
  <div class="todo-right-container">

    <div @click="changeImportant(todo.id)" class="important-icon-container">
      <img src="../assets/images/important.svg" alt="星星" class="importantIcon" ref="importantIcon">
    </div>

    <!--编辑-->
    <button @click="changeEdit(todo.id)" class="todo-item-right-button">
      编辑
    </button>
    <!--删除-->
    <button @click="deleteTodo(todo.id)" class="todo-item-right-button">删除</button>
  </div>
</template>

<script>
import {nextTick, ref} from "vue";
import {useStore} from "vuex";
import {nanoid} from 'nanoid'

export default {
  name: "TodoItem",
  props: ['todo'],
  setup() {
    const store = useStore();
    // Content
    // 改是否成功,点了就成功咯
    function toggleCompleted(id) {
      store.commit('toggleCompleted', id);
    }

    // 获取输入框
    const todoInput = ref(null);

    // 修改是否编辑状态
    function changeEdit(id) {
      store.commit('changeEdit', id)
      // 点了编辑之后按钮变没
      // event.target.style.display = 'none'
      nextTick(() => {
        // 获取焦点
        todoInput.value.focus();
      })
    }

    // 修改Todo里面的内容
    function changeTodoValue(id, event) {
      store.dispatch('updateTodoValue', {id: id, value: event.target.value})
    }

    // 删普通的
    function deleteTodo(id) {
      store.commit('deleteTodo', id)
    }

    // 添加重要
    const importantIcon = ref(null);
    function changeImportant(id){
      store.commit('changeImportant', id)
      nextTick(() => {
        importantIcon.value.classList.toggle('important')
      })
    }

    const checkboxId = nanoid()
    return {
      todoInput,
      toggleCompleted,
      changeEdit,
      changeTodoValue,
      deleteTodo,
      changeImportant,
      importantIcon,
      checkboxId
    }
  }
}
</script>

<style scoped lang="scss">
$right-container-width: 135px;
$border-color: #ddd;
.todo-left-container {
  flex: 1 1 auto;
  display: flex;
  align-items: center;


  .checkbox-label {
    display: inline-block;
    width: 25px;
    height: 25px;
    border: 1px solid black;
    border-radius: 50%;
    transition: all .2s linear;
    cursor: pointer;
    margin-right: 1rem;
  }

  input[type = 'checkbox'] {
    visibility: hidden;
  }

  input[type = 'checkbox']:checked + label:before {
    content: '\2713';
    text-align: center;
    font-size: 18px;
    margin-left: 5px;
  }

  input[type = 'checkbox']:checked + label {
    background-color: $border-color;
  }

  .todo-show, .todo-show input {

    line-height: 1.8rem;
    font-size: 1.3rem;

    input {
      height: 1.8rem;
      font-size: 1.3rem;
    }
  }

  .todo-show {
    flex: 1 0 auto;

    input {
      width: 100%;
      outline: none;
    }
  }

}

.todo-right-container {
  width: $right-container-width;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  .important-icon-container{
    width: 23px;
    height: 23px;
    cursor: pointer;
    margin-right: 3px;
  }
  .importantIcon {
    max-width: 100%;
    transform: translateX($right-container-width);
    filter: drop-shadow(-$right-container-width 0 0 black);
  }

  .important{
    filter: drop-shadow(-$right-container-width 0 0 red);
  }

  .todo-item-right-button{
    cursor: pointer;
    width: 40px;
    height: 27px;
    border: 1px solid $border-color;
    border-radius: 20px;
  }
}

</style>
