<template>
  <div class="app-home">
		<div class="app-logo">
			<img class="app-logo__github" src="../assets/git.svg" alt="github">
			<h3 class="app-logo__title">User Data Viewer</h3>
		</div>
		<div class="app-form">
			<div class="app-form__field">
				<input id="name" class="app-form__text" v-model="user" autocomplete="off" v-on:keyup.enter="goToUser">
		    <label for="name" class="app-form__label" v-bind:class="{'app-form__label--filled': user.length}">github.com/</label>
			</div>
		  <button v-on:click="goToUser" class="app-button"><i class=" fa fa-github"></i>buscar usuário</button>
			<span v-if="loading" class="app-loader"></span>
		</div>
		<p class="app-warning" v-if="error">Usuário inexistente. Favor efetuar nova busca.</p>
  </div>
</template>

<script>
import axios from "axios";
import router from '../router'

export default {
  name: "Home",
  data () {
		return {
      user: '',
			loading: false,
			error: false,
    };
	},
	methods: {
		goToUser () {
			let vm = this;
			vm.loading = true;
			vm.error = false;
			return axios.get("https://api.github.com/users/" + vm.user )
	    .then( (response) => {
				vm.loading = false;
				router.push({ name: 'UserData', params: { user: vm.user, data: response.data }})
	    })
	    .catch( (error) => {
				vm.loading = false;
				vm.error = true;
	    });
		}
	}
}
</script>

<style>
.app-home {
  background-color: var(--app-green);
  display: flex;
	flex-direction: column;
  justify-content: center;
  min-height: 100vh;
	padding-bottom: 100px;
}
.app-form {
	padding: 40px;
	display: flex;
	justify-content: center;
	background: var(--almost-white)
}
.app-form__field {
	position: relative;
	display: inline-block;
	width: 300px;
	margin: 0 10px;
}
.app-form__text {
	padding: 1.2em 1em .5em 1em;
	display: block;
	width: 100%;
	background: var(--app-green);
	opacity: .8;
	border: none;
	font-size: var(--large-font-size);
	color: var(--almost-white);
	transition: all .2s linear;
}
.app-form__text:focus {
	opacity: 1;
}
.app-form__label {
	position: absolute;
	font-size: var(--large-font-size);
	top: 50%;
	left: 1em;
	color: var(--almost-white);
	margin: -.6em 0 0 0;
	transition: all .2s linear;
}
.app-form__text:focus + .app-form__label,
.app-form__label--filled {
	top: .7em;
	left: 1.1em;
	color: var(--mid-white);
	font-size: 1.3em;
}
.app-button {
	display: block;
	border: solid 1px var(--app-green);
	padding: 0 1em;
	cursor: pointer;
	font-size: var(--large-font-size);
	color: var(--app-green);
	background: none;
	margin: 0 20px;
}
.app-button i {
	margin-right: 10px;
}
.app-logo {
	text-align: center;
	margin: 0 auto;
	width: 80%;
	max-width: 600px;
}
.app-logo__github {
	width: 100%;
}
.app-logo__title {
	color: var(--dark-green);
	font-weight: bold;
	font-size: 2.5em;
	margin: 10px 15px 30px 0;
	text-align: right;
}
.app-warning {
	background: var(--dark-green);
	color: var(--almost-white);
	margin: 0;
	font-size: 1.5em;
	padding: 10px;
	text-align: center;
}
@media (max-width: 750px) {
	.app-form {
		flex-direction: column;
		align-items: center;
	}
	.app-logo__title {
		font-size: 1.7em;
	}
	.app-button {
		width: 300px;
		margin-top: 20px;
		padding: .8em 0;
	}
}
@media (max-height: 500px) {
	.app-home {
		padding-bottom: 0;
	}
}
</style>
