(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[20],{H11B:function(e,t,s){"use strict";s.r(t);var c=s("nKUr"),a=s("KQm4"),n=s("1OyB"),i=s("vuIU"),r=s("JX7q"),l=s("Ji7U"),o=s("md7G"),d=s("foSv"),j=s("rePB"),u=s("q1tI"),h=s("/MKj"),b=s("s/m+"),p=s("e+cM"),m=s("YW6W"),f=s("ahwF"),O=s("syaQ"),v=s("LADp"),x=(s("f87r"),s("Ty5D"));function g(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var s,c=Object(d.a)(e);if(t){var a=Object(d.a)(this).constructor;s=Reflect.construct(c,arguments,a)}else s=c.apply(this,arguments);return Object(o.a)(this,s)}}var N=s("wd/R"),k=function(e){Object(l.a)(s,e);var t=g(s);function s(e){var c;return Object(n.a)(this,s),c=t.call(this,e),Object(j.a)(Object(r.a)(c),"trackScroll",(function(){c.$elem&&c.$elem.scrollTop+c.$elem.clientHeight>=c.$elem.scrollHeight&&c.runNextPage()})),Object(j.a)(Object(r.a)(c),"handleSearch",(function(e){c.setState({search:e.target.value},(function(){c.timer&&(clearTimeout(c.timer),c.timer=null),c.timer=setTimeout((function(){c.reloadTable()}),500)}))})),c.state={loading:!1,proposals:[],sort_key:"proposal.id",sort_direction:"desc",search:"",page_id:1,calling:!1,finished:!1},c}return Object(i.a)(s,[{key:"componentDidMount",value:function(){this.getProposals()}},{key:"componentWillUnmount",value:function(){this.$elem&&this.$elem.removeEventListener("scroll",this.trackScroll)}},{key:"startTracking",value:function(){this.$elem=document.getElementById("app-all-proposals-sectionBody"),this.$elem&&this.$elem.addEventListener("scroll",this.trackScroll)}},{key:"reloadTable",value:function(){var e=this;this.setState({page_id:1,proposals:[],finished:!1},(function(){e.getProposals()}))}},{key:"runNextPage",value:function(){var e=this,t=this.state,s=t.calling,c=t.loading,a=t.finished,n=t.page_id;s||c||a||this.setState({page_id:n+1},(function(){e.getProposals(!1)}))}},{key:"getProposals",value:function(){var e=this,t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],s=this.state,c=s.calling,n=s.loading,i=s.finished,r=s.sort_key,l=s.sort_direction,o=s.search,d=s.page_id,j=s.proposals;if(!(n||c||i)){var u={sort_key:r,sort_direction:l,search:o,page_id:d,limit:20};this.props.dispatch(Object(v.ab)(u,(function(){t?e.setState({loading:!0,calling:!0}):e.setState({loading:!1,calling:!0})}),(function(t){var s=t.proposals||[],c=t.finished||!1;1===d&&e.startTracking(),e.setState({loading:!1,calling:!1,finished:c,proposals:[].concat(Object(a.a)(j),Object(a.a)(s))})})))}}},{key:"clickRow",value:function(e){this.props.history.push("/public-proposals/".concat(e.id))}},{key:"renderTitle",value:function(e){return e.title}},{key:"renderStatusLabel",value:function(e,t){return Object(c.jsx)("label",{className:"font-size-14 color-".concat(t),children:e})}},{key:"renderStatus",value:function(e){var t=e.dos_paid;if("payment"==e.status)return t?this.renderStatusLabel("Payment Clearing","info"):this.renderStatusLabel("Payment Waiting","info");if("pending"==e.status)return this.renderStatusLabel("Pending","primary");if("denied"==e.status)return this.renderStatusLabel("Denied","danger");if("completed"==e.status)return this.renderStatusLabel("Completed","");if("approved"==e.status){if(e.votes&&e.votes.length){if(e.votes.length>1){var s=e.votes[1];return"active"==s.status?this.renderStatusLabel(Object(c.jsxs)(c.Fragment,{children:["Formal Voting",Object(c.jsx)("br",{}),"Live"]}),"success"):"success"==s.result?this.renderStatusLabel(Object(c.jsxs)(c.Fragment,{children:["Formal Voting",Object(c.jsx)("br",{}),"Passed"]}),"success"):"no-quorum"==s.result?this.renderStatusLabel(Object(c.jsxs)(c.Fragment,{children:["Formal Voting",Object(c.jsx)("br",{}),"No Quorum"]}),"danger"):this.renderStatusLabel(Object(c.jsxs)(c.Fragment,{children:["Formal Voting",Object(c.jsx)("br",{}),"Failed"]}),"danger")}var a=e.votes[0];return"active"==a.status?this.renderStatusLabel(Object(c.jsxs)(c.Fragment,{children:["Informal Voting",Object(c.jsx)("br",{}),"Live"]}),"success"):"success"==a.result?this.renderStatusLabel(Object(c.jsxs)(c.Fragment,{children:["Informal Voting",Object(c.jsx)("br",{}),"Passed"]}),"success"):"no-quorum"==a.result?this.renderStatusLabel(Object(c.jsxs)(c.Fragment,{children:["Informal Voting",Object(c.jsx)("br",{}),"No Quorum"]}),"danger"):this.renderStatusLabel(Object(c.jsxs)(c.Fragment,{children:["Informal Voting",Object(c.jsx)("br",{}),"Failed"]}),"danger")}return this.renderStatusLabel("In Discussion","success")}return null}},{key:"renderProposals",value:function(){var e=this,t=this.state.proposals,s=[];return t&&t.length?(t.forEach((function(t){s.push(Object(c.jsx)("li",{children:Object(c.jsxs)("div",{className:"infinite-row",onClick:function(){return e.clickRow(t)},children:[Object(c.jsx)("div",{className:"c-col-0 c-cols",children:Object(c.jsx)("label",{className:"font-size-14 d-block",children:t.id})}),Object(c.jsxs)("div",{className:"c-col-1 c-cols",children:[Object(c.jsx)("label",{className:"font-size-14 font-weight-700",children:e.renderTitle(t)}),Object(c.jsx)("p",{className:"font-size-12",children:m.a.getExcerpt(t.short_description||t.member_reason)})]}),Object(c.jsx)("div",{className:"c-col-2 c-cols",children:Object(c.jsx)("label",{className:"font-size-14 d-block",children:t.forum_name})}),Object(c.jsx)("div",{className:"c-col-3 c-cols",children:Object(c.jsx)("label",{className:"font-size-14 d-block",children:t.telegram})}),Object(c.jsx)("div",{className:"c-col-4 c-cols",children:Object(c.jsx)("label",{className:"font-size-14",children:"grant"==t.type?"Grant":"Simple"})}),Object(c.jsx)("div",{className:"c-col-5 c-cols",children:e.renderStatus(t)}),Object(c.jsx)("div",{className:"c-col-6 c-cols",children:Object(c.jsxs)("div",{className:"c-image-wrap",children:[Object(c.jsx)("div",{children:Object(c.jsx)(f.a,{size:20})}),Object(c.jsx)("span",{className:"font-size-12",children:t.comments})]})}),Object(c.jsx)("div",{className:"c-col-7 c-cols",children:Object(c.jsxs)("div",{className:"c-image-wrap",children:[Object(c.jsx)("div",{children:Object(c.jsx)(O.a,{size:20})}),Object(c.jsx)("span",{className:"font-size-12",children:t.changes})]})}),Object(c.jsx)("div",{className:"c-col-8 c-cols",children:Object(c.jsxs)("label",{className:"font-size-14",children:[N(t.created_at).local().format("M/D/YYYY")," ",N(t.created_at).local().format("h:mm A")]})})]})},"proposal_".concat(t.id)))})),Object(c.jsx)("ul",{children:s})):Object(c.jsx)("div",{id:"infinite-no-result",children:Object(c.jsx)("label",{className:"font-size-14",children:"No Results Found"})})}},{key:"renderTriangle",value:function(e){var t=this.state,s=t.sort_key,a=t.sort_direction;return s!=e?Object(c.jsx)("span",{className:"inactive",children:"\u25b2"}):"asc"==a?Object(c.jsx)("span",{children:"\u25b2"}):Object(c.jsx)("span",{children:"\u25bc"})}},{key:"clickHeader",value:function(e){var t=this,s=this.state,c=s.sort_key,a=s.sort_direction;c==e?a="asc"==a?"desc":"asc":(c=e,a="desc"),this.setState({sort_key:c,sort_direction:a},(function(){t.reloadTable()}))}},{key:"renderHeader",value:function(){var e=this;return Object(c.jsx)("div",{className:"infinite-header",children:Object(c.jsxs)("div",{className:"infinite-headerInner",children:[Object(c.jsxs)("div",{className:"c-col-0 c-cols",onClick:function(){return e.clickHeader("proposal.id")},children:[Object(c.jsx)("label",{className:"font-size-14",children:"#"}),this.renderTriangle("proposal.id")]}),Object(c.jsxs)("div",{className:"c-col-1 c-cols",onClick:function(){return e.clickHeader("proposal.title")},children:[Object(c.jsx)("label",{className:"font-size-14",children:"Title"}),this.renderTriangle("proposal.title")]}),Object(c.jsx)("div",{className:"c-col-2 c-cols",children:Object(c.jsx)("label",{className:"font-size-14",children:"Forum Name"})}),Object(c.jsx)("div",{className:"c-col-3 c-cols",children:Object(c.jsx)("label",{className:"font-size-14",children:"Telegram"})}),Object(c.jsxs)("div",{className:"c-col-4 c-cols",onClick:function(){return e.clickHeader("proposal.type")},children:[Object(c.jsx)("label",{className:"font-size-14",children:"Type"}),this.renderTriangle("proposal.type")]}),Object(c.jsx)("div",{className:"c-col-5 c-cols",children:Object(c.jsx)("label",{className:"font-size-14",children:"Status"})}),Object(c.jsxs)("div",{className:"c-col-6 c-cols",onClick:function(){return e.clickHeader("proposal.comments")},children:[Object(c.jsx)("label",{className:"font-size-14",children:"Comments"}),this.renderTriangle("proposal.comments")]}),Object(c.jsxs)("div",{className:"c-col-7 c-cols",onClick:function(){return e.clickHeader("proposal.changes")},children:[Object(c.jsx)("label",{className:"font-size-14",children:"Changes"}),this.renderTriangle("proposal.changes")]}),Object(c.jsxs)("div",{className:"c-col-8 c-cols",onClick:function(){return e.clickHeader("proposal.created_at")},children:[Object(c.jsx)("label",{className:"font-size-14",children:"Date"}),this.renderTriangle("proposal.created_at")]})]})})}},{key:"render",value:function(){var e=this.state,t=e.loading,s=e.search;return Object(c.jsx)("div",{id:"public-proposals-page",children:Object(c.jsx)(b.Fade,{children:Object(c.jsxs)("section",{id:"app-all-proposals-section",className:"app-infinite-box",children:[Object(c.jsxs)("div",{className:"app-infinite-search-wrap",children:[Object(c.jsx)("label",{children:"All Proposals"}),Object(c.jsx)("input",{type:"text",value:s,onChange:this.handleSearch,placeholder:"Search..."})]}),Object(c.jsx)("div",{className:"infinite-content",children:Object(c.jsxs)("div",{className:"infinite-contentInner",children:[this.renderHeader(),Object(c.jsx)("div",{className:"infinite-body",id:"app-all-proposals-sectionBody",children:t?Object(c.jsx)(p.f,{}):this.renderProposals()})]})})]})})})}}]),s}(u.Component);t.default=Object(h.b)((function(){return{}}))(Object(x.g)(k))}}]);