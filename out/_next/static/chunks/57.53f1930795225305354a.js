(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[57],{PePI:function(e,t,c){"use strict";c.r(t);var n=c("nKUr"),a=c("1OyB"),i=c("vuIU"),s=c("Ji7U"),r=c("md7G"),l=c("foSv"),o=c("q1tI"),d=c("/MKj"),u=c("Ty5D"),h=c("s/m+"),j=(c("4t4X"),c("JX7q")),b=c("rePB"),f=c("KQm4"),p=c("wd/R"),v=c.n(p),m=c("55Ip"),O=c("e+cM"),y=c("ZpDd"),x=c("LADp");c("drvi");function g(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var c,n=Object(l.a)(e);if(t){var a=Object(l.a)(this).constructor;c=Reflect.construct(n,arguments,a)}else c=n.apply(this,arguments);return Object(r.a)(this,c)}}var N=function(e){Object(s.a)(c,e);var t=g(c);function c(e){var n;return Object(a.a)(this,c),n=t.call(this,e),Object(b.a)(Object(j.a)(n),"trackScroll",(function(){n.$elem&&n.$elem.scrollTop+n.$elem.clientHeight>=n.$elem.scrollHeight&&n.runNextPage()})),Object(b.a)(Object(j.a)(n),"doCancel",(function(e){n.props.dispatch(Object(y.Z)("cancel-active-survey",{id:e}))})),n.state={loading:!1,data:[],sort_key:"",sort_direction:"desc",search:"",page_id:1,calling:!1,finished:!1},n.$elem=null,n.timer=null,n}return Object(i.a)(c,[{key:"componentDidMount",value:function(){var e=this.props.authUser;e&&e.id&&this.startTracking(),this.getData()}},{key:"componentWillUnmount",value:function(){this.$elem&&this.$elem.removeEventListener("scroll",this.trackScroll)}},{key:"componentDidUpdate",value:function(e){var t=this.props.authUser;e.authUser&&e.authUser.id||!t||!t.id||this.startTracking(),this.props.reloadActiveSurveyTable&&this.props.reloadActiveSurveyTable!==e.reloadActiveSurveyTable&&(this.props.dispatch(Object(y.Q)(!1)),this.reloadTable())}},{key:"reloadTable",value:function(){var e=this;this.setState({page_id:1,data:[],finished:!1},(function(){e.getData()}))}},{key:"startTracking",value:function(){this.$elem=document.getElementById("milestone-in-review-scroll-track"),this.$elem&&this.$elem.addEventListener("scroll",this.trackScroll)}},{key:"runNextPage",value:function(){var e=this,t=this.state,c=t.calling,n=t.loading,a=t.finished,i=t.page_id;c||n||a||this.setState({page_id:i+1},(function(){e.getData(!1)}))}},{key:"getData",value:function(){var e=this,t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],c=this.state,n=c.calling,a=c.loading,i=c.finished,s=c.sort_key,r=c.sort_direction,l=c.search,o=c.page_id,d=c.data;if(!(a||n||i)){var u={sort_key:s,sort_direction:r,search:l,page_id:o,limit:1,status:"active"};this.props.dispatch(Object(x.gc)(u,(function(){t?e.setState({loading:!0,calling:!0}):e.setState({loading:!1,calling:!0})}),(function(t){var c=t.surveys||[],n=t.finished||!1;e.setState({loading:!1,calling:!1,finished:n,data:[].concat(Object(f.a)(d),Object(f.a)(c))})})))}}},{key:"renderResult",value:function(){var e=this,t=this.state.data,c=[];return t&&t.length?(t.forEach((function(t){c.push(Object(n.jsx)("li",{children:Object(n.jsxs)("div",{className:"infinite-row align-items-center d-flex py-3 font-size-14 font-weight-700",children:[Object(n.jsx)("div",{className:"c-col-1 c-cols",children:Object(n.jsx)(m.b,{to:"/app/surveys/".concat(t.id),children:Object(n.jsxs)("p",{children:["S",t.id]})})}),Object(n.jsx)("div",{className:"c-col-2 c-cols",children:Object(n.jsx)("p",{children:v()(t.created_at).local().format("M/D/YYYY HH:mm A")})}),Object(n.jsx)("div",{className:"c-col-3 c-cols",children:Object(n.jsx)("p",{children:v()(t.end_time).local().format("M/D/YYYY HH:mm A")})}),Object(n.jsx)("div",{className:"c-col-4 c-cols",children:Object(n.jsx)("p",{children:t.user_responded})}),Object(n.jsx)("div",{className:"c-col-5 c-cols",children:Object(n.jsx)("p",{children:t.total_member})}),Object(n.jsx)("div",{className:"c-col-9 c-cols",children:Object(n.jsx)("button",{className:"btn btn-primary-outline extra-small btn-fluid-small",onClick:function(){return e.doCancel(t.id)},children:"Cancel Survey"})})]})},"mile_".concat(t.id)))})),Object(n.jsx)("ul",{children:c})):Object(n.jsx)("div",{id:"infinite-no-result",children:Object(n.jsx)("label",{className:"font-size-14",children:"No Results Found"})})}},{key:"render",value:function(){var e=this.state.loading;return Object(n.jsx)("div",{className:"active-surveys-table infinite-content",children:Object(n.jsxs)("div",{className:"infinite-contentInner",children:[Object(n.jsx)("div",{className:"infinite-header",children:Object(n.jsxs)("div",{className:"infinite-headerInner",children:[Object(n.jsx)("div",{className:"c-col-1 c-cols",children:Object(n.jsx)("label",{className:"font-size-14",children:"Survey Number"})}),Object(n.jsx)("div",{className:"c-col-2 c-cols",children:Object(n.jsx)("label",{className:"font-size-14",children:"Start date"})}),Object(n.jsx)("div",{className:"c-col-3 c-cols",children:Object(n.jsx)("label",{className:"font-size-14",children:"End date"})}),Object(n.jsx)("div",{className:"c-col-4 c-cols",children:Object(n.jsx)("label",{className:"font-size-14",children:"User Responded"})}),Object(n.jsx)("div",{className:"c-col-5 c-cols",children:Object(n.jsx)("label",{className:"font-size-14",children:"Users eligible"})}),Object(n.jsx)("div",{className:"c-col-6 c-cols",children:Object(n.jsx)("label",{className:"font-size-14",children:"Action"})})]})}),Object(n.jsx)("div",{className:"infinite-body",id:"milestone-in-review-scroll-track",children:e?Object(n.jsx)(O.k,{}):this.renderResult()})]})})}}]),c}(o.Component),k=Object(d.b)((function(e){return{authUser:e.global.authUser,reloadActiveSurveyTable:e.admin.reloadActiveSurveyTable}}))(N),S=c("XqUm");c("v0Wc");function _(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var c,n=Object(l.a)(e);if(t){var a=Object(l.a)(this).constructor;c=Reflect.construct(n,arguments,a)}else c=n.apply(this,arguments);return Object(r.a)(this,c)}}var D=function(e){Object(s.a)(c,e);var t=_(c);function c(e){var n;return Object(a.a)(this,c),n=t.call(this,e),Object(b.a)(Object(j.a)(n),"startNewSurvey",(function(){var e=n.state.isActiveSurveyExisted;(e&&n.props.dispatch(Object(y.Bb)("You cannot begin a new survey while a survey is active.","warning")),!1===e)&&n.props.history.push("/app/surveys/start")})),n.state={isActiveSurveyExisted:null},n}return Object(i.a)(c,[{key:"componentDidMount",value:function(){this.getData()}},{key:"componentDidUpdate",value:function(e){this.props.reloadGuardStartSurvey&&this.props.reloadGuardStartSurvey!==e.reloadGuardStartSurvey&&(this.props.dispatch(Object(y.S)(!1)),this.getData())}},{key:"getData",value:function(){var e=this;this.props.dispatch(Object(x.gc)({limit:1,status:"active"},(function(){}),(function(t){var c=t.surveys||[];e.setState({isActiveSurveyExisted:c.length>0})})))}},{key:"render",value:function(){return Object(n.jsx)("div",{className:"survey-page",children:Object(n.jsxs)(h.Fade,{distance:"20px",bottom:!0,duration:300,delay:600,children:[Object(n.jsxs)("section",{className:"active-section app-infinite-box mb-4",children:[Object(n.jsxs)("div",{className:"app-infinite-search-wrap",children:[Object(n.jsx)("label",{children:"Active Surveys"}),Object(n.jsx)("button",{onClick:this.startNewSurvey,className:"btn btn-primary less-small",children:"Start New Survey"})]}),Object(n.jsx)(k,{})]}),Object(n.jsx)("section",{className:"discussion-table app-infinite-box mb-4",children:Object(n.jsx)(S.a,{})})]})})}}]),c}(o.Component),w=Object(d.b)((function(e){return{authUser:e.global.authUser,reloadGuardStartSurvey:e.admin.reloadGuardStartSurvey}}))(Object(u.g)(D));c("7FkZ"),c("1hUG");function R(e,t){var c=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),c.push.apply(c,n)}return c}function U(e){for(var t=1;t<arguments.length;t++){var c=null!=arguments[t]?arguments[t]:{};t%2?R(Object(c),!0).forEach((function(t){Object(b.a)(e,t,c[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(c)):R(Object(c)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(c,t))}))}return e}function P(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var c,n=Object(l.a)(e);if(t){var a=Object(l.a)(this).constructor;c=Reflect.construct(n,arguments,a)}else c=n.apply(this,arguments);return Object(r.a)(this,c)}}var C=function(e){Object(s.a)(c,e);var t=P(c);function c(e){var n;return Object(a.a)(this,c),n=t.call(this,e),Object(b.a)(Object(j.a)(n),"trackScroll",(function(){n.$elem&&n.$elem.scrollTop+n.$elem.clientHeight>=n.$elem.scrollHeight&&n.runNextPage()})),n.state={params:{},loading:!1,data:[],sort_key:"rank",sort_direction:"asc",page_id:1,calling:!1,finished:!1},n.$elem=null,n.timer=null,n}return Object(i.a)(c,[{key:"componentDidMount",value:function(){var e=this.props.authUser;e&&e.id&&this.startTracking(),this.getData()}},{key:"componentWillUnmount",value:function(){this.$elem&&this.$elem.removeEventListener("scroll",this.trackScroll)}},{key:"componentDidUpdate",value:function(e){var t=this,c=this.props.authUser;e.authUser&&e.authUser.id||!c||!c.id||this.startTracking();var n=this.props.params;e.params!==n&&(this.setState({params:U({},n)}),setTimeout((function(){return t.reloadTable()})))}},{key:"reloadTable",value:function(){var e=this;this.setState({page_id:1,data:[],finished:!1},(function(){e.getData()}))}},{key:"startTracking",value:function(){this.$elem=document.getElementById("milestone-in-review-scroll-track"),this.$elem&&this.$elem.addEventListener("scroll",this.trackScroll)}},{key:"runNextPage",value:function(){var e=this,t=this.state,c=t.calling,n=t.loading,a=t.finished,i=t.page_id;c||n||a||this.setState({page_id:i+1},(function(){e.getData(!1)}))}},{key:"getData",value:function(){var e=this,t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],c=this.state,n=c.calling,a=c.loading,i=c.finished,s=c.sort_key,r=c.sort_direction,l=c.page_id,o=c.data,d=c.params;if(!(a||n||i)){var u=U({sort_key:s,sort_direction:r,page_id:l,limit:1},d);this.props.dispatch(Object(x.oc)(u,(function(){t?e.setState({loading:!0,calling:!0}):e.setState({loading:!1,calling:!0})}),(function(t){var c=t.proposals||[],n=t.finished||!1;e.setState({loading:!1,calling:!1,finished:n,data:[].concat(Object(f.a)(o),Object(f.a)(c))})})))}}},{key:"renderResult",value:function(){var e=this.state.data,t=[];return e&&e.length?(e.forEach((function(e){t.push(Object(n.jsx)("li",{children:Object(n.jsxs)("div",{className:"infinite-row align-items-center d-flex py-3 font-size-14 font-weight-700",children:[Object(n.jsx)("div",{className:"c-col-1 c-cols",children:Object(n.jsx)("p",{children:v()(e.end_time).local().format("M/D/YYYY")})}),Object(n.jsx)("div",{className:"c-col-2 c-cols",children:Object(n.jsx)("p",{children:e.rank})}),Object(n.jsx)("div",{className:"c-col-3 c-cols",children:Object(n.jsx)(m.b,{to:"/app/proposal/".concat(e.id),children:Object(n.jsxs)("p",{children:["S",e.id]})})}),Object(n.jsx)("div",{className:"c-col-4 c-cols",children:Object(n.jsx)(m.b,{to:"/app/proposal/".concat(e.id),children:Object(n.jsxs)("p",{children:["S",e.title]})})}),Object(n.jsx)("div",{className:"c-col-5 c-cols",children:Object(n.jsx)("p",{className:"In Discussion"===e.status.label?"text-danger":"text-success",children:e.status.label})})]})},"mile_".concat(e.id)))})),Object(n.jsx)("ul",{children:t})):Object(n.jsx)("div",{id:"infinite-no-result",children:Object(n.jsx)("label",{className:"font-size-14",children:"No Results Found"})})}},{key:"render",value:function(){var e=this.state.loading;return Object(n.jsx)("div",{className:"winners-table infinite-content",children:Object(n.jsxs)("div",{className:"infinite-contentInner",children:[Object(n.jsx)("div",{className:"infinite-header",children:Object(n.jsxs)("div",{className:"infinite-headerInner",children:[Object(n.jsx)("div",{className:"c-col-1 c-cols",children:Object(n.jsx)("label",{className:"font-size-14",children:"Survey End"})}),Object(n.jsx)("div",{className:"c-col-2 c-cols",children:Object(n.jsx)("label",{className:"font-size-14",children:"Spot #"})}),Object(n.jsx)("div",{className:"c-col-3 c-cols",children:Object(n.jsx)("label",{className:"font-size-14",children:"Proposal #"})}),Object(n.jsx)("div",{className:"c-col-4 c-cols",children:Object(n.jsx)("label",{className:"font-size-14",children:"Title"})}),Object(n.jsx)("div",{className:"c-col-5 c-cols",children:Object(n.jsx)("label",{className:"font-size-14",children:"Current Status"})})]})}),Object(n.jsx)("div",{className:"infinite-body",id:"milestone-in-review-scroll-track",children:e?Object(n.jsx)(O.k,{}):this.renderResult()})]})})}}]),c}(o.Component),T=Object(d.b)((function(e){return{authUser:e.global.authUser,reloadActiveSurveyTable:e.admin.reloadActiveSurveyTable}}))(C),$=c("Iowh"),E=c.n($);function Y(e,t){var c=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),c.push.apply(c,n)}return c}function A(e){for(var t=1;t<arguments.length;t++){var c=null!=arguments[t]?arguments[t]:{};t%2?Y(Object(c),!0).forEach((function(t){Object(b.a)(e,t,c[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(c)):Y(Object(c)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(c,t))}))}return e}function I(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var c,n=Object(l.a)(e);if(t){var a=Object(l.a)(this).constructor;c=Reflect.construct(n,arguments,a)}else c=n.apply(this,arguments);return Object(r.a)(this,c)}}var z=function(e){Object(s.a)(c,e);var t=I(c);function c(e){var n;return Object(a.a)(this,c),n=t.call(this,e),Object(b.a)(Object(j.a)(n),"handleParams",(function(e,t){var c=n.state.params;if(["start_date","end_date"].includes(e))if(t){var a=v()(t).local().format("YYYY-MM-DD");c[e]=a}else delete c[e];else t?c[e]=t:delete c[e];n.setState({params:A({},c)})})),n.state={params:{},statuses:[{label:"In Discussion",key:"in_discussion"},{label:"Informal Voting Failed",key:"informal_voting_failed"},{label:"Informal Voting No Quorum",key:"informal_voting_no_quorum"},{label:"Informal Voting Passed",key:"informal_voting_passed"},{label:"Informal Voting Live",key:"informal_voting_live"},{label:"Formal Voting Failed",key:"formal_voting_failed"},{label:"Formal Voting No Quorum",key:"formal_voting_no_quorum"},{label:"Formal Voting Passed",key:"formal_voting_passed"},{label:"Formal Voting Live",key:"formal_voting_live"},{label:"Completed",key:"completed"}]},n}return Object(i.a)(c,[{key:"downloadCSV",value:function(){var e=this;this.props.dispatch(Object(x.W)(this.state.params,(function(){e.props.dispatch(Object(y.Cb)())}),(function(t){var c=window.URL.createObjectURL(new Blob([t])),n=document.createElement("a");n.href=c,n.setAttribute("download","winners.csv"),document.body.appendChild(n),n.click(),e.props.dispatch(Object(y.U)())})))}},{key:"render",value:function(){var e=this,t=this.state,c=t.statuses,a=t.params;return Object(n.jsx)("div",{className:"h-100 winner-page",children:Object(n.jsx)(h.Fade,{distance:"20px",bottom:!0,duration:300,delay:600,children:Object(n.jsxs)("section",{className:"h-100 app-infinite-box mb-4",children:[Object(n.jsxs)("div",{className:"app-infinite-search-wrap",children:[Object(n.jsx)("label",{children:"Survey Winners"}),Object(n.jsxs)("div",{className:"d-flex align-items-center",children:[Object(n.jsx)("button",{className:"mr-4 btn btn-primary btn-download small ml-2",onClick:function(){return e.downloadCSV()},children:"Download"}),Object(n.jsxs)("div",{className:"c-form-row mr-4 d-flex flex-column",children:[Object(n.jsx)("label",{className:"pb-2",children:"Filter by Spot #"}),Object(n.jsxs)("select",{value:(null===a||void 0===a?void 0:a.spot_rank)||"",onChange:function(t){e.handleParams("spot_rank",t.target.value)},children:[Object(n.jsx)("option",{value:"",children:"Spot #"}),[1,2,3,4,5].map((function(e,t){return Object(n.jsx)("option",{value:e,children:e},"option1_".concat(t))}))]})]}),Object(n.jsxs)("div",{className:"c-form-row mr-4 d-flex flex-column",children:[Object(n.jsx)("label",{className:"pb-2",children:"Filter by Status"}),Object(n.jsxs)("select",{value:(null===a||void 0===a?void 0:a.current_status)||"",onChange:function(t){e.handleParams("current_status",t.target.value)},children:[Object(n.jsx)("option",{value:"",children:"Status"}),c.map((function(e,t){return Object(n.jsx)("option",{value:e.key,children:e.label},"option1_".concat(t))}))]})]}),Object(n.jsxs)("div",{className:"mr-4 d-flex flex-column",children:[Object(n.jsx)("label",{className:"pb-2",children:"Start date"}),Object(n.jsx)(E.a,{format:"M/d/yyyy",value:a.start_date?new Date(a.start_date):null,onChange:function(t){return e.handleParams("start_date",t)},onCalendarClose:function(){},calendarIcon:"",clearIcon:""})]}),Object(n.jsxs)("div",{className:"mr-4 d-flex flex-column",children:[Object(n.jsx)("label",{className:"pb-2",children:"End date"}),Object(n.jsx)(E.a,{format:"M/d/yyyy",value:a.end_date?new Date(a.end_date):null,onChange:function(t){return e.handleParams("end_date",t)},onCalendarClose:function(){},calendarIcon:"",clearIcon:""})]})]})]}),Object(n.jsx)(T,{params:a})]})})})}}]),c}(o.Component),F=Object(d.b)((function(e){return{authUser:e.global.authUser}}))(Object(u.g)(z));c("3wzc"),c("fLBi");function H(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var c,n=Object(l.a)(e);if(t){var a=Object(l.a)(this).constructor;c=Reflect.construct(n,arguments,a)}else c=n.apply(this,arguments);return Object(r.a)(this,c)}}var M=function(e){Object(s.a)(c,e);var t=H(c);function c(e){var n;return Object(a.a)(this,c),n=t.call(this,e),Object(b.a)(Object(j.a)(n),"trackScroll",(function(){n.$elem&&n.$elem.scrollTop+n.$elem.clientHeight>=n.$elem.scrollHeight&&n.runNextPage()})),Object(b.a)(Object(j.a)(n),"doCancel",(function(e){n.props.dispatch(Object(y.Z)("cancel-active-survey",{id:e}))})),n.state={loading:!1,data:[],sort_key:"",sort_direction:"desc",search:"",page_id:1,calling:!1,finished:!1},n.$elem=null,n.timer=null,n}return Object(i.a)(c,[{key:"componentDidMount",value:function(){var e=this.props.authUser;e&&e.id&&this.startTracking(),this.getData()}},{key:"componentWillUnmount",value:function(){this.$elem&&this.$elem.removeEventListener("scroll",this.trackScroll)}},{key:"componentDidUpdate",value:function(e){var t=this.props.authUser;e.authUser&&e.authUser.id||!t||!t.id||this.startTracking(),this.props.reloadActiveSurveyTable&&this.props.reloadActiveSurveyTable!==e.reloadActiveSurveyTable&&(this.props.dispatch(Object(y.Q)(!1)),this.reloadTable())}},{key:"reloadTable",value:function(){var e=this;this.setState({page_id:1,data:[],finished:!1},(function(){e.getData()}))}},{key:"startTracking",value:function(){this.$elem=document.getElementById("completed-surveys-scroll-track"),this.$elem&&this.$elem.addEventListener("scroll",this.trackScroll)}},{key:"runNextPage",value:function(){var e=this,t=this.state,c=t.calling,n=t.loading,a=t.finished,i=t.page_id;c||n||a||this.setState({page_id:i+1},(function(){e.getData(!1)}))}},{key:"getData",value:function(){var e=this,t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],c=this.state,n=c.calling,a=c.loading,i=c.finished,s=c.sort_key,r=c.sort_direction,l=c.search,o=c.page_id,d=c.data;if(!(a||n||i)){var u={sort_key:s,sort_direction:r,search:l,page_id:o,status:"completed"};this.props.dispatch(Object(x.gc)(u,(function(){t?e.setState({loading:!0,calling:!0}):e.setState({loading:!1,calling:!0})}),(function(t){var c=t.surveys||[],n=t.finished||!1;e.setState({loading:!1,calling:!1,finished:n,data:[].concat(Object(f.a)(d),Object(f.a)(c))})})))}}},{key:"renderResult",value:function(){var e=this.state.data,t=[];return e&&e.length?(e.forEach((function(e){t.push(Object(n.jsx)("li",{children:Object(n.jsxs)("div",{className:"infinite-row align-items-center d-flex py-3 font-size-14 font-weight-700",children:[Object(n.jsx)("div",{className:"c-col-1 c-cols",children:Object(n.jsx)(m.b,{to:"/app/surveys/".concat(e.id),children:Object(n.jsxs)("p",{children:["S",e.id]})})}),Object(n.jsx)("div",{className:"c-col-2 c-cols",children:Object(n.jsx)("p",{children:v()(e.created_at).local().format("M/D/YYYY HH:mm A")})}),Object(n.jsx)("div",{className:"c-col-3 c-cols",children:Object(n.jsx)("p",{children:v()(e.end_time).local().format("M/D/YYYY HH:mm A")})}),Object(n.jsx)("div",{className:"c-col-4 c-cols",children:Object(n.jsx)("p",{children:e.user_responded})})]})},"mile_".concat(e.id)))})),Object(n.jsx)("ul",{children:t})):Object(n.jsx)("div",{id:"infinite-no-result",children:Object(n.jsx)("label",{className:"font-size-14",children:"No Results Found"})})}},{key:"render",value:function(){var e=this.state.loading;return Object(n.jsx)("div",{className:"completed-surveys-table infinite-content",children:Object(n.jsxs)("div",{className:"infinite-contentInner",children:[Object(n.jsx)("div",{className:"infinite-header",children:Object(n.jsxs)("div",{className:"infinite-headerInner",children:[Object(n.jsx)("div",{className:"c-col-1 c-cols",children:Object(n.jsx)("label",{className:"font-size-14",children:"Survey Number"})}),Object(n.jsx)("div",{className:"c-col-2 c-cols",children:Object(n.jsx)("label",{className:"font-size-14",children:"Start date"})}),Object(n.jsx)("div",{className:"c-col-3 c-cols",children:Object(n.jsx)("label",{className:"font-size-14",children:"End date"})}),Object(n.jsx)("div",{className:"c-col-4 c-cols",children:Object(n.jsx)("label",{className:"font-size-14",children:"User Responded"})})]})}),Object(n.jsx)("div",{className:"infinite-body",id:"completed-surveys-scroll-track",children:e?Object(n.jsx)(O.k,{}):this.renderResult()})]})})}}]),c}(o.Component),L=Object(d.b)((function(e){return{authUser:e.global.authUser,reloadActiveSurveyTable:e.admin.reloadActiveSurveyTable}}))(M);function V(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var c,n=Object(l.a)(e);if(t){var a=Object(l.a)(this).constructor;c=Reflect.construct(n,arguments,a)}else c=n.apply(this,arguments);return Object(r.a)(this,c)}}var B=function(e){Object(s.a)(c,e);var t=V(c);function c(e){return Object(a.a)(this,c),t.call(this,e)}return Object(i.a)(c,[{key:"render",value:function(){return Object(n.jsx)("div",{className:"h-100 milestones-page",children:Object(n.jsx)(h.Fade,{distance:"20px",bottom:!0,duration:300,delay:600,children:Object(n.jsxs)("section",{className:"h-100 app-infinite-box mb-4",children:[Object(n.jsx)("div",{className:"app-infinite-search-wrap",children:Object(n.jsx)("label",{children:"Completed Surveys"})}),Object(n.jsx)(L,{})]})})})}}]),c}(o.Component),G=Object(d.b)((function(e){return{authUser:e.global.authUser}}))(Object(u.g)(B));function W(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var c,n=Object(l.a)(e);if(t){var a=Object(l.a)(this).constructor;c=Reflect.construct(n,arguments,a)}else c=n.apply(this,arguments);return Object(r.a)(this,c)}}var q=function(e){Object(s.a)(c,e);var t=W(c);function c(e){var n;return Object(a.a)(this,c),(n=t.call(this,e)).state={tab:"active"},n}return Object(i.a)(c,[{key:"render",value:function(){var e=this,t=this.state.tab,c=this.props.authUser;return c&&c.id?Object(n.jsxs)("div",{id:"app-survey-page",children:[Object(n.jsx)(h.Fade,{distance:"20px",bottom:!0,duration:400,delay:600,children:Object(n.jsxs)("ul",{id:"app-discussions-pageHeader",children:[Object(n.jsx)("li",{className:"active"==t?"active":"",onClick:function(){return e.setState({tab:"active"})},children:"Active"}),Object(n.jsx)("li",{className:"completed"==t?"active":"",onClick:function(){return e.setState({tab:"completed"})},children:"Completed"}),Object(n.jsx)("li",{className:"winners"==t?"active":"",onClick:function(){return e.setState({tab:"winners"})},children:"Winners"})]})}),"active"===t&&Object(n.jsx)(w,{}),"completed"===t&&Object(n.jsx)(G,{}),"winners"===t&&Object(n.jsx)(F,{})]}):null}}]),c}(o.Component);t.default=Object(d.b)((function(e){return{authUser:e.global.authUser}}))(Object(u.g)(q))}}]);