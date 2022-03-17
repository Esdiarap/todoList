<template>
  <div class="top-graph" id="topGraph"></div>
  <div class="bottom-graph">

  </div>
</template>

<script>
import * as echarts from 'echarts'
import {useStore} from "vuex";
import {computed, onMounted, onUnmounted, watch} from "vue";

export default {
  name: "TodoGraph",
  setup() {
    const store = useStore()
    let echart = echarts;
    const completedTodoNumber = computed(() => store.getters.doneTodoNumber)
    const importantTodo = computed(() => store.getters.importantTodo)
    // console.log('importantTodo', importantTodo, 'value', importantTodo.value) // importantTodo是一个ComputedRef, value是一个数组
    const simpleTodoNumber = computed(() => store.getters.simpleTodoNumber)

    function initChart(chart) {
      chart.setOption({
        angleAxis: {},
        radiusAxis: {
          type: 'category',
          data: ['important/simple', 'done/total'],
          z: 10
        },
        polar: {},
        series: [
          {
            // 重要
            type: 'bar',
            data: [importantTodo.value.length],
            coordinateSystem: 'polar',
            name: 'important',
            stack: 'a',
            emphasis: {
              focus: 'series'
            }
          },
          {
            // simple
            type: 'bar',
            data: [simpleTodoNumber.value],
            coordinateSystem: 'polar',
            name: 'simple',
            stack: 'a',
            emphasis: {
              focus: 'series'
            }
          },
          {
            // done
            type: 'bar',
            data: [0, completedTodoNumber.value],
            coordinateSystem: 'polar',
            name: 'done',
            stack: 'a',
            emphasis: {
              focus: 'series'
            }
          },
          {
            // total 2
            type: 'bar',
            data: [0, simpleTodoNumber.value + importantTodo.value.length - completedTodoNumber.value],
            coordinateSystem: 'polar',
            name: 'not done',
            stack: 'a',
            emphasis: {
              focus: 'series'
            }
          }
        ],
        legend: {
          show: true,
          data: ['important', 'simple', 'done', 'not done']
        }
      })
    }

    onMounted(() => {
      let chart = echart.init(document.getElementById("topGraph"));
      // 初始化视图
      initChart(chart);

      // vuex修改数据的时候更新视图
      watch([importantTodo, simpleTodoNumber, completedTodoNumber], () => {
        initChart(chart);
      })

      // 填充
      window.onresize = function () {
        chart.resize()
      }

    })

    onUnmounted(() => {
      echart.dispose();
    })


    return {
      initChart,
    }
  }
}
</script>

<style scoped lang="scss">
.top-graph, .bottom-graph {
  width: 100%;
  height: 360px;
}

.top-graph {
  margin-bottom: 30px;
}
</style>
