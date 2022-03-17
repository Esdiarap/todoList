import {createStore} from "vuex";
const store = createStore({
    state: {
        todoLists: [
            {id:'001', value: 'Todo数据1', completed: true, important: false, isEdit: false},
            {id:'002', value: 'Todo数据2', completed: false, important: false, isEdit: false},
            {id:'003', value: 'Todo数据3', completed: true, important: false, isEdit: false},
            {id:'999', value: 'Todo数据4', completed: true, important: false, isEdit: false},
            {id:'998', value: 'Todo数据5', completed: false, important: false, isEdit: false},
        ],
        searchKey: ''
    },
    actions: {
        // 更新TodoValue
        updateTodoValue(context, newTodoValue){
            // newTodoValue是一个字符串, 或者是空值
            if (newTodoValue.value && newTodoValue.value.trim().length > 0) {
                context.commit('changeTodoValue', newTodoValue)
                context.commit('changeEdit', newTodoValue.id)
            }else{// 如果是空白则不变原来的值
                context.commit('changeEdit', newTodoValue.id)
            }
        },
        addTodo(context, todoValue){
            // 没有输入内容或者内容为空字符串
            if (!todoValue.value || todoValue.value.trim().length === 0) return Promise.reject('输入内容不要为空');
            else {
                // 如果有重复的
                if(context.state.todoLists.find(todo => todo.value === todoValue.value)){
                    context.dispatch('removeDuplicatedTodo', todoValue.value).then(() => context.commit('addTodo', todoValue))
                }else {
                    context.commit('addTodo', todoValue)
                }
            }
        },
        removeDuplicatedTodo(context, value){
            context.state.todoLists = context.state.todoLists.filter(todo => todo.value !== value);
        }
    },
    mutations: {
        toggleCompleted(state, id){
            state.todoLists.forEach(todo => {
                if (todo.id === id) todo.completed = !todo.completed;
            })
        },
        addTodo(state, value){
            state.todoLists.unshift(value)
        },
        deleteTodo(state, id){
            state.todoLists = state.todoLists.filter(todo => todo.id !== id);
        },
        deleteCompletedTodo(state){
            state.todoLists = state.todoLists.filter(todo => !todo.completed)
        },
        changeAll(state, done){
            state.todoLists.forEach(todo => todo.completed = done);
        },
        changeEdit(state, id){
            state.todoLists.forEach(todo => {
                // if (todo.id === id) todo.isEdit = true;
                if (todo.id === id) todo.isEdit = !todo.isEdit;
            })
        },
        changeTodoValue(state, newTodoValue){
            state.todoLists.forEach(todo => {
                if (todo.id === newTodoValue.id) {
                    todo.value = newTodoValue.value
                }
            })
        },
        changeImportant(state, id){
            state.todoLists.forEach(todo => {
                if (todo.id === id) {
                    todo.important = !todo.important
                }
            })
        },
        getSearchKey(state, searchKey){
            state.searchKey = searchKey;
        }

    },
    getters: {
        // return: searchedTodoLists
        searchedTodoLists(state){
            const searchKey = state.searchKey;
            return state.todoLists.filter(todo => {
                return todo.value.indexOf(searchKey) !== -1
            })
        },
        doneTodoNumber(state, getters) {
            // return state.todoLists.reduce((pre, todo) => {
            //     return pre + (todo.completed ? 1 : 0);
            // }, 0)
            return getters.searchedTodoLists.reduce((pre, todo) => {
                return pre + (todo.completed ? 1 : 0);
            }, 0)
        },
        importantTodo(state, getters){
            return getters.searchedTodoLists.filter(todo => todo.important)
        },
        simpleTodoNumber(state, getters){
            return getters.searchedTodoLists.reduce((pre, todo) => {
                return pre + (todo.important ? 0 : 1);
            }, 0)
        },

    }
})
export default store
