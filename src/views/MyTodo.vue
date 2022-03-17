<template>
  <!--router-view整个容器-->
  <div class="home">
    <!--左边主容器-->
    <div class="left-container">
      <!--上方导航条-->
      <div class="todo-title">
        <h2 class="title">我的待办</h2>
        <!--点击-->
        <div class="button-box">
          <!--<button @click="openWindow('todo', 'create')" class="add-todo-button">-->
          <button @click="toggleIsShow" class="add-todo-button">
            新建待办
          </button>
        </div>
      </div>
      <div class="todo-content-container">
        <todo-content></todo-content>
      </div>
    </div>
    <!--右边多的选项-->
    <div class="right-container">
      <todo-graph></todo-graph>
    </div>
  </div>
  <!--添加Todo的选项框-->
  <teleport to="body">
    <add-todo v-if="isShowAddTodo" @close="toggleIsShow"></add-todo>
  </teleport>
</template>

<script>
import {ref} from "vue";
// import TodoCalendar from "@/components/TodoCalendar";
import TodoContent from "@/components/TodoContent";
import TodoGraph from "@/components/TodoGraph";
import AddTodo from "@/components/AddTodo";

export default {
  name: "MyTodo",
  components: {TodoContent, AddTodo, TodoGraph},

  setup() {
    const isShowAddTodo = ref(false);

    function toggleIsShow() {
      isShowAddTodo.value = !isShowAddTodo.value;
    }

    return {
      toggleIsShow,
      isShowAddTodo
    }
  }
}
</script>

<style scoped lang="scss">
$border-color: #f5edee;
$font-color: #d4cccd;
$title-color: #100000;
$element-background-color: rgb(245, 245, 245);
$add-button-background-color: #b345d2;
.home {
  display: flex;

  .left-container {
    flex: 1 1 auto;
    padding-left: 32px;

    .todo-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 3rem;
      background-color: $element-background-color;
      border-radius: 20px;
      padding-left: 5px;

      .title {
        color: $title-color;
      }

      .button-box {
        display: flex;
        justify-content: flex-end;

        .back-today-button, .add-todo-button {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 7rem;
          height: 2rem;
          border: none;
          color: $font-color;
          font-size: 0.75rem;
          line-height: 1rem;
          border-radius: 2rem;
          background-color: $element-background-color;
          cursor: pointer;

          img {
            width: 1rem;
            height: 1rem;
            margin-right: .5rem;
          }
        }

        .add-todo-button {
          width: 10rem;
          margin-left: 1.5rem;
          background-color: $add-button-background-color;
        }
      }
    }

    //.calendar-container{
    //  z-index: 10;
    //  position: relative;
    //  display: flex;
    //  justify-content: center;
    //  //min-width: 44.5rem;
    //  height: 7rem;
    //  border-radius: 16px;
    //  background-color: $element-background-color;
    //}

    .todo-content-container {
      overflow: auto;
      //min-width: 44.5rem;
      //height: 46rem;
      margin: 1.5rem 0 2rem 0;
      border-radius: 16px;
      background-color: $element-background-color;
      display: flex;
      flex-direction: column;
      padding-right: 10px;
    }
  }

  .right-container {
    flex: 0 0 360px;
    padding: 10px;

    //.bottom-graph {
    //
    //}
  }
}

@media screen and (max-width: 1200px) {
  .right-container {
    display: none;
  }
}
</style>
