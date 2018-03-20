import Vue from 'vue';
import Home from '@/components/Home';
import chai from 'chai';
import sinon from 'sinon';
import axios from 'axios';
import router from '@/router'

describe('Home.vue', () => {
	let Constructor; let vm; let routerSpy;

	beforeEach(() => {
		routerSpy = sinon.spy(router, 'push');
		Constructor = Vue.extend(Home);
    vm = new Constructor().$mount();
  });

	afterEach(() => {
		router.push.restore();
  });

  it('should set correct component name', () => {
		chai.assert.equal(vm.$options.name, 'Home');
  });

	it('should init component data', () => {
		chai.assert.deepEqual(vm.$options.data(), {
			user: '',
			loading: false,
			error: false,
		});
  });

	describe('Success Go to User', () => {
		before(function () {
			const resolved = new Promise((resolve) => resolve({data: 'mock'}));
	    sinon.stub(axios, 'get').returns(resolved);
		});

		after(function () {
			axios.get.restore();
		});

		it('should trigger user data route', () => {
			return vm.$options.methods.goToUser().then(() => {
				chai.assert.isFalse(vm.loading);
				chai.assert(routerSpy.calledOnce);
			});
		});
	});

	describe('Fail to Go to User', () => {
		before(function () {
			const sandbox = sinon.sandbox.create()
			const rejected = new Promise((resolve, reject) => reject({}));
	    sinon.stub(axios, 'get').returns(rejected);
		});

		after(function () {
			axios.get.restore();
		});

		it('should get an error', () => {
			return vm.$options.methods.goToUser().catch(() => {
				chai.assert.isFalse(vm.loading);
				chai.assert.isTrue(vm.error);
			});
		});
	});

})
