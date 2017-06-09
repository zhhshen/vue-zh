<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  color: #5FB878;
}
.hello {
  width: 600px;
  margin: 50px auto;
  text-align: center;
}
.ms-form {
  background: #fff;
  padding: 20px;
}

/*表单项*/
.ms-form-item {
  position: relative;
  margin-bottom: 15px;
  clear: both;
  *zoom:1;
}
.ms-form-label {
  display: block;
  position: absolute;
  padding: 8px 15px;
  width: 100px;
  font-weight: 600;
  text-align: right;
  line-height: 20px;
}
.ms-form-input-block {
  display: inline-block;
  position: relative;
  margin-left: 80px;
  min-height: 36px;
}
.form-input-text {
  display: inline-block;
  margin: 8px 10px 0 0;
  width: 300px;
  height: 38px;
  line-height: 28px;
  padding: 5px 10px;
  border: 1px solid #d6c6c6;
  border-radius: 3px;
  vertical-align: middle;
  outline: none;
}
.ms-form-input-after {
  position: absolute;
  top: 0px;
  right: 10px;
}
</style>
