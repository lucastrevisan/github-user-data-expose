import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import UserData from "@/components/UserData";

import "font-awesome/css/font-awesome.css";

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: "/",
			name: "Home",
			component: Home
		},
		{
			path: "/:user",
			name: "UserData",
			props: true,
			component: UserData
		}
	]
});
