<template>
  <div id="app" class="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<!-- GENERAL STYLES -->
<style>
@import url('https://fonts.googleapis.com/css?family=Roboto');
:root {
	--full-white: #fff;
	--almost-white: rgba(255, 255, 255, .9);
	--mid-white: rgba(255, 255, 255, .5);
	--quarter-white: rgba(255, 255, 255, .25);
	--large-font-size: 1.6em;
	--app-green: #0F946A;
	--dark-green: #0a3f2e;
	--light-grey: #EFEFEF;
	--mid-grey: #acadaf;
}
html, body {
  margin: 0;
  padding: 0;
	font-family: 'Roboto', sans-serif;
}
html {
	height: 100%;
}
body {
	height: auto;
	min-height: 100vh;
}
ul, li {
	list-style: none;
	padding: 0;
	margin: 0;
}
* {
	box-sizing: border-box;
}
*:focus {
	outline: none;
}
.app {
  color: #2c3e50;
  min-height: 100vh;
	background-color: var(--light-grey);
}
.app-loader {
  width: 40px;
  height: 40px;
  background-color: var(--dark-green);
  animation: rotate_plane 1.2s infinite ease-in-out;
}
@keyframes rotate_plane {
  0% {
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
  } 50% {
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
  } 100% {
    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
}
</style>
