(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[48],{Lph7:function(e,t,s){"use strict";s.r(t);var r=s("nKUr"),a=s("1OyB"),c=s("vuIU"),o=s("JX7q"),n=s("Ji7U"),p=s("md7G"),i=s("foSv"),l=s("rePB"),u=s("q1tI"),d=s.n(u),f=s("/MKj"),b=s("Ty5D"),h=(s("fVC1"),s("xDwY")),j=s("e+cM"),O=s("ZpDd"),m=s("LADp"),v=s("Qyje"),y=s.n(v);function g(e,t){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),s.push.apply(s,r)}return s}function D(e){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{};t%2?g(Object(s),!0).forEach((function(t){Object(l.a)(e,t,s[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):g(Object(s)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(s,t))}))}return e}function w(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var s,r=Object(i.a)(e);if(t){var a=Object(i.a)(this).constructor;s=Reflect.construct(r,arguments,a)}else s=r.apply(this,arguments);return Object(p.a)(this,s)}}var S=function(e){Object(n.a)(s,e);var t=w(s);function s(e){var r;return Object(a.a)(this,s),r=t.call(this,e),Object(l.a)(Object(o.a)(r),"create",(function(e,t){r.props.dispatch(Object(m.Yc)(D(D({},e),{},{proposal_draft_id:r.state.draftId}),(function(){r.props.dispatch(Object(O.Cb)())}),(function(e){var s=r.props.history;if(e.success&&e.proposal&&e.proposal.id)if(t&&t.length){var a=new FormData;t.forEach((function(e){a.append("files[]",e),a.append("names[]",e.name)})),a.append("proposal",e.proposal.id),r.props.dispatch(Object(m.xd)(a,(function(){r.props.dispatch(Object(O.Cb)())}),(function(e){e.success&&(s.push("/app/proposals"),r.props.dispatch(Object(O.Bb)("You have successfully submitted your proposal. We will review it and keep you posted.","success")),r.props.dispatch(Object(O.U)()))})))}else s.push("/app/proposals"),r.props.dispatch(Object(O.Bb)("You have successfully submitted your proposal. We will review it and keep you posted.","success")),r.props.dispatch(Object(O.U)());else r.props.dispatch(Object(O.U)())})))})),Object(l.a)(Object(o.a)(r),"saveDraft",(function(){r.proposalForm.current.saveDraft(!1)})),Object(l.a)(Object(o.a)(r),"getDraft",(function(e){r.props.dispatch(Object(m.Pb)(e,(function(){r.props.dispatch(Object(O.Cb)())}),(function(e){if(r.props.dispatch(Object(O.U)()),e.success){var t,s,a=e.proposal;a.milestones=JSON.parse(a.milestones),a.members=JSON.parse(a.members),a.grants=JSON.parse(a.grants),a.member_required=(null===(t=a.members)||void 0===t?void 0:t.length)>0,a.tags=null===(s=JSON.parse(a.tags))||void 0===s?void 0:s.join(","),a.citations=JSON.parse(a.citations),a.include_membership=+a.include_membership,r.setState({proposal:a,checkedDraft:!0})}})))})),Object(l.a)(Object(o.a)(r),"saveDone",(function(){r.setState({isSaved:!0}),setTimeout((function(){r.setState({isSaved:!1})}),3e3)})),r.state={proposal:null,checkedDraft:!1,isSaved:!1,draftId:null},r.proposalForm=d.a.createRef(),r}return Object(c.a)(s,[{key:"componentDidMount",value:function(){var e=this.props.location.search,t=y.a.parse(e,{ignoreQueryPrefix:!0});t.draft?(this.getDraft(t.draft),this.setState({draftId:t.draft})):this.setState({checkedDraft:!0})}},{key:"render",value:function(){var e=this.props.authUser;return e&&e.id?e.is_admin?Object(r.jsx)(b.a,{to:"/"}):Object(r.jsxs)("div",{id:"app-new-proposal-page",children:[Object(r.jsxs)("div",{className:"d-flex",style:{marginTop:"50px"},children:[Object(r.jsx)(j.m,{title:"New Proposal",link:"/app/proposals"}),Object(r.jsxs)("div",{className:"ml-3 d-flex align-items-center",style:{marginBottom:"20px"},children:[Object(r.jsx)("button",{className:"mr-2 btn btn-primary less-small",onClick:this.saveDraft,children:"Save and finish later"}),this.state.isSaved&&Object(r.jsx)("span",{children:"save successful!"})]})]}),Object(r.jsxs)("p",{children:["Please read"," ",Object(r.jsx)("a",{href:"https://dxdstage.ledgerleap.com/guide.pdf",target:"_blank",rel:"noreferrer",className:"dynamic-color",children:Object(r.jsx)("u",{children:"the guide"})})," ","first to understand this form."]}),this.state.checkedDraft&&Object(r.jsx)(h.a,{allowAutoSave:!0,ref:this.proposalForm,proposal:this.state.proposal,onChange:this.create,onSaved:this.saveDone})]}):null}}]),s}(u.Component);t.default=Object(f.b)((function(e){return{authUser:e.global.authUser}}))(Object(b.g)(S))}}]);