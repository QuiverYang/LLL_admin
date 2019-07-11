<template>
  <div class="hello">
  
    <button @click="toggle()" class="btn btn-primary">toggle</button>
    <!-- <ul id="">
      <li v-for="(item) in object" :key="item.title">
         {{item.title}}
      </li>
    </ul> -->
    <div v-for="(value, name, index) in object" :key="value">
      {{ index }}. {{ name }}: {{ value }}
    </div>
  </div>
</template>

<script>
var m1 = '页面加载于 ' + new Date().toLocaleString();
var obj = {
  foo: 'bar'
}
// Object.freeze(obj); --> to make obj  'read only'
export default {
  data () {
    return {
      question: '',
      answer: 'I cannot give you an answer until you ask a question!',
      object: {
        title: 'How to do lists in Vue',
        author: 'Jane Doe',
        publishedAt: '2016-04-10'
      },
      isShow:true,
      items: [
        { message: 'Foo' },
        { message: 'Bar' }
      ],

    }
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    question: function (newQuestion, oldQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.debouncedGetAnswer()
    }
  },
  created: function () {
    // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
    // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
    // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
    // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
    // 请参考：https://lodash.com/docs#debounce
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
  },
  methods: {
    getAnswer: function () {
      if (this.question.indexOf('?') === -1) {
        this.answer = 'Questions usually contain a question mark. ;-)'
        return
      }
      this.answer = 'Thinking...'
      var vm = this
      axios.get('https://yesno.wtf/api')
        .then(function (response) {
          vm.answer = _.capitalize(response.data.answer)
        })
        .catch(function (error) {
          vm.answer = 'Error! Could not reach the API. ' + error
        })
    },
    toggle(){
      var vm =this;
      vm._data.items[0].message = 'test'
      // this.items.push({ message: 'Baz' });
      vm.$set(vm.object, 'age', 27);
    }
  }
}
</script>