<template>
  <div v-for="todo in todoLists" :key="todo.id" class="todo-item-container">
    <div class="todo-item">
      <todo-item :todo="todo"></todo-item>
    </div>
  </div>

  <div class="content-bottom" v-if="totalNumber">
    <todo-footer></todo-footer>
  </div>
</template>

<script>
import {useStore} from 'vuex'
import {computed} from "vue";
import TodoItem from "@/components/TodoItem";
import TodoFooter from "@/components/TodoFooter";

export default {
  name: "TodoContent",
  components: {TodoItem, TodoFooter},
  setup() {
    const store = useStore()
    const todoLists = computed(() => {
      return store.state.todoLists
    })
    // 总共Todo个数
    const totalNumber = computed(() => {
      return todoLists.value.length;
    })

    return {
      todoLists,
      totalNumber
    }
  }
}
</script>

<style scoped lang="scss">
.todo-item-container{
  border-bottom: 1px solid #ddd;
  margin-bottom: 1px;
}
.todo-item{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.todo-item:first-child{
  margin-top: 1rem;
}
</style>
