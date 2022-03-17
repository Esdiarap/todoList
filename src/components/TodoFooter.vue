<template>
  <div class="todo-footer-container">
    <!--左边-->
    <div class="todo-footer-left">
      <input type="checkbox" @change="changeAll" :checked="isAll" id="checkAllBox">
      <label for="checkAllBox"></label>
      <p>已完成<strong>{{ doneTodoNumber }}</strong>个任务 | 总共<strong>{{ totalNumber }}</strong>个任务</p>
    </div>
    <!--右边-->
    <div>
      <button @click="deleteCompletedTodo" id="removeCompletedBox">点击删除所有已完成的</button>
    </div>
  </div>
</template>

<script>
import {computed} from "vue";
import {useStore} from "vuex";

export default {
  name: "TodoFooter",
  setup() {
    const store = useStore();
    const searchedTodoLists = computed(() => {
      return store.getters.searchedTodoLists;
    })

    // Footer
    // 完成Todo个数
    const doneTodoNumber = computed(() => {
      return store.getters.doneTodoNumber;
    })

    // 总共Todo个数
    const totalNumber = computed(() => {
      return searchedTodoLists.value.length;
    })

    // 是否全选了
    const isAll = computed(() => {
      return doneTodoNumber.value === totalNumber.value;
    })


    //改全部,要么全选要么全不选
    function changeAll(e) {
      store.commit('changeAll', e.target.checked)
    }

    // 删完成的
    function deleteCompletedTodo() {
      store.commit('deleteCompletedTodo');
    }

    return {

      doneTodoNumber,
      totalNumber,
      isAll,
      changeAll,
      deleteCompletedTodo
    }
  }
}
</script>

<style scoped lang="scss">
.todo-footer-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0;

  .todo-footer-left {
    display: flex;

    label {
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
      background-color: #ddd;
    }
  }

  #removeCompletedBox {
    height: 2rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: rgb(189, 186, 189);
    padding: 5px 10px;
    text-align: center;
  }
}
</style>
