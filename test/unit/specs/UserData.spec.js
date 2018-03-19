import Vue from 'vue';
import UserData from '@/components/UserData';
import chai from 'chai';
import sinon from 'sinon';
import axios from 'axios';
import router from '@/router'

describe('UserData.vue', () => {
	let Constructor; let vm;

	beforeEach(() => {
		Constructor = Vue.extend(UserData);
    vm = new Constructor({router}).$mount();
  });

	// it('should init component select options', () => {
	// 	//vm.$options.data()
	// 	chai.assert.deepEqual(vm.$options.data().selectOptions, [{
	// 		label: 'Nome',
	// 		field: 'name',
	// 		sort: 'asc'
	// 	}, {
	// 		label: 'Número de Estrelas',
	// 		field: 'stargazers_count',
	// 		sort: 'desc'
	// 	}, {
	// 		label: 'Linguagem',
	// 		field: 'language',
	// 		sort: 'asc'
	// 	}]);
	// });

	it('should create component with correct sort type', () => {
		vm.$options.created()
		chai.assert.equal(this.sortType, {
			label: 'Número de Estrelas',
			field: 'stargazers_count',
			sort: 'desc'
		});
  });

})
