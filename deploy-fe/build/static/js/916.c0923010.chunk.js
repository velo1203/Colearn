"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[916],{4916:function(e,t,s){s.r(t),s.d(t,{default:function(){return f}});var r=s(9439),a={pbHeader:"Problem_pbHeader__K1m5Z",pbContainer:"Problem_pbContainer__IN-ra"},l=s(2791),o={headerSearchbox:"searchbox_headerSearchbox__oJVpN",searchInput:"searchbox_searchInput__6kWDz",searchIcon:"searchbox_searchIcon__NacT4",searchCategory:"searchbox_searchCategory__3RPGj",searchForm:"searchbox_searchForm__P25fD"},n=s(9806),c=s(184);var i=function(e){var t=(0,l.useState)(!1),s=(0,r.Z)(t,2),a=s[0],n=s[1],i=(0,l.useState)(null),d=(0,r.Z)(i,2);return d[0],d[1],(0,l.useEffect)((function(){var e=function(e){a&&null===e.target.closest(".".concat(o.categoryContainer))&&n(!1)};return document.addEventListener("mousedown",e),function(){document.removeEventListener("mousedown",e)}}),[a]),(0,c.jsxs)("div",{className:o.headerSearchbox,children:[(0,c.jsxs)("h1",{children:[e.ic_book," \ud30c\uc774\uc36c \uae30\ubcf8 \ubb38\uc81c"]}),(0,c.jsx)("div",{className:o.headerSearch})]})};var d=s(3433),h=s(7689),b={noproblem:"problemlist_noproblem__uGOFj",table:"problemlist_table__pxU48",tableHead:"problemlist_tableHead__rynMw",tableBody:"problemlist_tableBody__2fpHD",tableTitle:"problemlist_tableTitle__iYZUC",tableDescription:"problemlist_tableDescription__UVCQ1",tableId:"problemlist_tableId__VrKRr",solvedBadge:"problemlist_solvedBadge__kS7+8"},u=s(1632),_=s(9548),m=s(1243);function p(e){var t=e.i,s=e.rowData,r=e.solvedProblems,a=(0,h.s0)(),l=r&&r.includes(s.id);return(0,c.jsxs)("tr",{children:[(0,c.jsxs)("td",{className:b.tableTitle,onClick:function(){a("/codespace/"+s.id)},children:[(0,c.jsx)(n.G,{icon:u.FL8})," ",t+1,". ",s.title," ",l&&(0,c.jsx)(n.G,{icon:u.f8k,className:b.solvedBadge})]}),(0,c.jsx)("td",{className:b.tableDescription,children:s.description}),(0,c.jsx)("td",{className:b.tableId,children:s.id})]})}var x=function(e){var t=e.problemlist,s=(0,_.Z)(),a=s.isLoggedIn,o=(s.role,(0,l.useState)([])),n=(0,r.Z)(o,2),i=n[0],h=n[1];(0,l.useEffect)((function(){a&&m.Z.get("http://localhost:5000/user/info",{withCredentials:!0}).then((function(e){var t=e.data.user_info.solved_problem;h(t)})).catch((function(){console.log("Failed to fetch solved problem list.")}))}),[a]),console.log(t);var u=(0,d.Z)(t).sort((function(e,t){return e.order-t.order}));return(0,c.jsx)("div",{children:0===t.length?(0,c.jsx)("p",{className:b.noproblem,children:"\ubb38\uc81c\uac00 \uc5c6\uc2b5\ub2c8\ub2e4"}):(0,c.jsxs)("table",{className:b.table,children:[(0,c.jsxs)("colgroup",{children:[(0,c.jsx)("col",{style:{width:"25%"}}),(0,c.jsx)("col",{style:{width:"55%"}}),(0,c.jsx)("col",{style:{width:"20%"}})]}),(0,c.jsx)("thead",{className:b.tableHead,children:(0,c.jsxs)("tr",{children:[(0,c.jsx)("th",{children:"\ubb38\uc81c \uc774\ub984/\uc544\uc774\ub514"}),(0,c.jsx)("th",{children:"\ubb38\uc81c \uc124\uba85"}),(0,c.jsx)("th",{children:"\uc544\uc774\ub514"})]})}),(0,c.jsx)("tbody",{className:b.tableBody,children:u.map((function(e,t){return(0,c.jsx)(p,{i:t,rowData:e,solvedProblems:i},t)}))})]})})};var f=function(){var e=(0,l.useState)([]),t=(0,r.Z)(e,2),s=t[0],o=t[1],n=(0,l.useState)(1),d=(0,r.Z)(n,2),h=d[0];return d[1],(0,l.useEffect)((function(){m.Z.get("http://localhost:5000/user/show_problemlist").then((function(e){o(e.data)})).catch((function(){console.log("\ubb38\uc81c\uac00 \uc5c6\uc2b5\ub2c8\ub2e4"),o([])}))}),[h]),(0,c.jsxs)("div",{className:a.problempage,children:[(0,c.jsx)("div",{className:a.pbHeader,children:(0,c.jsx)("div",{className:a.pbContainer,children:(0,c.jsx)(i,{})})}),(0,c.jsx)("div",{className:a.pbContainer,children:(0,c.jsx)(x,{problemlist:s})})]})}}}]);
//# sourceMappingURL=916.c0923010.chunk.js.map