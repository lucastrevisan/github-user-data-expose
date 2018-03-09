<template>
	<div class="app-user">
		<div class="app-user__info">
			<img class="app-user__image" v-bind:src="userData.avatar_url" v-bind:alt="userData.avatar_url">
			<span class="app-user__back" title="voltar" v-on:click="goToHome"><i class="fa fa-angle-left"></i></span>
			<ul class="app-user__data">
				<li>
					<h2 class="app-user__name">{{userData.name}}</h2>
					<p class="app-user__user-name">{{userData.login}}</p>
				</li>
				<li v-if="userData.email"><h3>{{userData.email}}</h3></li>
				<li><span>{{userData.bio}}</span></li>
				<li class="app-user__compl-info">
					<span>Seguidores<b>{{userData.followers}}</b></span>
					<span>Seguindo<b>{{userData.following}}</b></span>
				</li>
			</ul>
		</div>
		<div class="app-repos">
			<h3 class="app-repos__title">
				{{userData.public_repos}}
				Repositórios
				<div class="app-repos__filter">
					<label>ordenar lista por:</label>
					<select v-model="sortType" v-on:change="sort">
						<option v-for="option in selectOptions" :value="option">
						  {{option.label}}
						</option>
					</select>
				</div>
			</h3>
			<ul class="app-repos__list">
				<li class="app-repos__item" v-for="repo in userRepos">
					<h3>
						<a v-bind:href="repo.html_url" target="_blank">{{repo.name}}</a>
					</h3>
					<p>{{repo.description}}</p>
					<div class="app-repos__info">
						<span><i class="fa fa-star"></i>{{repo.stargazers_count}}</span>
						<span><i class="fa fa-code"></i>{{repo.language}}</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import router from '../router'
import axios from 'axios';
import _ from 'lodash';

export default {
  name: 'UserData',
	data () {
		return {
			userData: this.$route.params.data,
			userRepos: [],
			selectOptions: [{
				label: 'Nome',
				field: 'name',
				sort: 'asc'
			}, {
				label: 'Número de Estrelas',
				field: 'stargazers_count',
				sort: 'desc'
			}, {
				label: 'Linguagem',
				field: 'language',
				sort: 'asc'
			}],
			sortType: {},
		}
	},
	created () {
		this.sortType = this.selectOptions[1];
	},
  beforeCreate () {
		let vm = this;
		axios.get("https://api.github.com/users/" + this.$route.params.user + '/repos')
		.then( (response) => {
			let sortedData = _.orderBy(response.data, vm.sortType.field, vm.sortType.sort);
			vm.userRepos = vm.userRepos.concat(sortedData);
		})
  },
	methods: {
		sort () {
			this.userRepos = _.orderBy(this.userRepos, this.sortType.field, this.sortType.sort);
		},
		goToHome () {
			router.push({ name: 'Home' });
		}
	}
}
</script>

<style>
.app-user {
	padding: 20px 20px 0 0;
	height: calc(100% - 40px);
}
.app-user__info {
	background: var(--almost-white);
	margin: 0 0 20px 20px;
	padding: 20px;
	display: flex;
	position: relative;
}
.app-user__back {
	position: absolute;
	right: 10px;
	top: 0px;
	font-size: 3em;
	padding: 5px 20px;
	cursor: pointer;
}
.app-user__image {
	/*width: 50%;*/
	margin-right: 20px;
	max-height: 200px;
	max-width: 200px;
}
.app-user__data {
	text-align: left;
	flex-grow: 1;
	flex-direction: column;
	display: flex;
}
.app-repos {
	flex-grow: 1;
}
.app-repos__title {
	margin-left: 20px;
	font-family: arial;
	display: flex;
	text-transform: uppercase;
	align-items: center;
	color: var(--mid-grey);
}
.app-repos__title:after {
	content: "";
	display: block;
	clear: both;
}
.app-repos__filter {
	margin-left: auto;
	text-transform: none;
}
.app-repos__filter label {
	font-size: .9em;
	margin-right: 4px;
}
.app-repos__filter select {
	padding: 10px;
	box-shadow: 0px 0px 2px #ccc;
	border: none;
}
.app-repos__list {
	display: flex;
	flex-wrap: wrap;
}
.app-repos__item {
	background: var(--almost-white);
	margin: 0 0 20px 20px;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	width: calc( 50% - 20px);
	min-width: 300px;
	padding: 15px;
	box-shadow: 0px 0px 2px #ccc;
}
.app-repos__item p {
	flex-grow: 1;
	margin: 5px 0 10px 10px;
}
.app-repos__item h3 {
	margin: 5px 0;
}
.app-repos__item a {
	color: var(--app-green);
	text-decoration: none;
	text-transform: uppercase;
}
.app-repos__item a:hover {
	text-decoration: underline;
}
.app-repos__info {
	text-align: right;
}
.app-repos__info span {
	margin: 0 10px;
}
.app-repos__info i {
	margin-right: 4px;
}
.app-user__name {
	border-bottom: solid 1px rgba(0,0,0,.1);
	padding: 10px 0;
	margin: 0;
	color: var(--app-green);
}
.app-user__user-name {
	margin: 5px 0 15px 0;
	color: var(--app-green);
}
.app-user__compl-info {
	justify-content: flex-end;
	flex-grow: 1;
	display: flex;
	align-items: flex-end;
	flex-wrap: wrap;
}
.app-user__compl-info span {
	display: inline-block;
	margin-left: 2em;
	color: var(--mid-grey);
}
.app-user__compl-info b {
	margin-left: 6px;
	padding: 5px;
	color: var(--almost-white);
	background: var(--app-green);
}
</style>
