(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,i){e.exports=i(20)},16:function(e,t,i){},18:function(e,t,i){},20:function(e,t,i){"use strict";i.r(t);var s=i(0),n=i.n(s),l=i(1),a=i.n(l),o=(i(16),i(5)),r=i(6),c=i(8),d=i(7),u=i(9),v=i(2),p=(i(18),i(3)),f=p.b.div({hidden:{opacity:0},visible:{opacity:1}}),h=p.b.div({pressable:!0,hoverable:!0,init:{scale:1},press:{scale:.6},hover:{scale:1.2},hidden:{opacity:0,transition:{duration:1e3}},visible:{opacity:.8,transition:{duration:2e3}}}),b=p.b.div({pressable:!0,hoverable:!0,init:{scale:1},press:{scale:.6},hover:{scale:1.2},hidden:{opacity:0,transition:{duration:1e3}},visible:{opacity:.7,transition:{duration:2e3}}}),y=p.b.li({hidden:{opacity:0,transition:{duration:1e3}},visible:{opacity:.8,transition:{duration:5e3}},pressable:!0,hoverable:!0,init:{scale:1},press:{scale:.6},hover:{scale:1.1}}),m=[{id:1,display:"",val:""},{id:2,display:"",val:""},{id:3,display:"",val:""},{id:4,display:"",val:""},{id:5,display:"",val:""},{id:6,display:"",val:""}],S=function(e){function t(e,i){var s;return Object(o.a)(this,t),(s=Object(c.a)(this,Object(d.a)(t).call(this,e,i))).state={isVisibleDots:!0,isVisibleStartBtn:!1,isVisibleShuffle:!1,items:m,points:6,totalScore:0,playing:!1,isVisibleNextLevelBtn:!1,level:1},s.onClickStartBtn=s.onClickStartBtn.bind(Object(v.a)(Object(v.a)(s))),s.onClickShuffledItem=s.onClickShuffledItem.bind(Object(v.a)(Object(v.a)(s))),s.onClickNextLevelBtn=s.onClickNextLevelBtn.bind(Object(v.a)(Object(v.a)(s))),s}return Object(u.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.boxesInterval=setInterval(function(){e.setState({isVisibleDots:!e.state.isVisibleDots})},500),this.setState({isVisibleNextLevelBtn:!0}),setTimeout(function(){var t=a.a.findDOMNode(e);t.querySelector(".boxesContainer").style.display="none",t.querySelector(".startBtn").style.display="flex",clearInterval(e.boxesInterval),e.setState({isVisibleStartBtn:!0})},3e3)}},{key:"prepCards",value:function(e){var t=this;this.setState(function(e){return{list:e.items.map(function(t,i){return i===e.level?(t.display="x",t.val="x"):t.display="",t})}});var i=600;setTimeout(function(){t.setState(function(e){return 2===e.level?(i=170,e.points=12):3===e.level&&(i=100,e.points=18),{list:e.items.map(function(e,t){return e.display="?",e})}})},3e3),setTimeout(function(){t.shuffleInterval=setInterval(function(){t.setState(function(e){var t=function(e){for(var t,i=e.length,s=0;0!==i;)s=Math.floor(Math.random()*i),t=e[i-=1],e[i]=e[s],e[s]=t;return e}(e.items);return e.playing=!0,{items:t}})},i)},5e3),setTimeout(function(){clearInterval(t.shuffleInterval),a.a.findDOMNode(t).querySelector(e).style.display="none"},7e3)}},{key:"onClickStartBtn",value:function(){this.setState({isVisibleStartBtn:!1,isVisibleShuffle:!0}),a.a.findDOMNode(this).querySelector(".ul-shuffle").style.display="flex";this.prepCards(".startBtn")}},{key:"onClickNextLevelBtn",value:function(){this.setState(function(e){return{isVisibleNextLevelBtn:!1,level:e.level+1}}),console.log(this.state.items),a.a.findDOMNode(this).querySelector(".score").style.display="none";this.prepCards(".nextLevelBtn")}},{key:"onClickShuffledItem",value:function(e,t){var i=this;this.setState(function(t){if(console.log("level: "+t.level),t.playing)return{list:t.items.map(function(s){return s.id===e&&(s.display=s.val,""===s.val?t.points>1&&(1===t.level?t.points=t.points-1:2===t.level?t.points=t.points-2:3===t.level&&(t.points=t.points-3)):(t.playing=!1,a.a.findDOMNode(i).querySelector(".score").style.display="flex",t.totalScore=t.totalScore+t.points,t.level<3?(a.a.findDOMNode(i).querySelector(".nextLevelBtn").style.display="flex",t.isVisibleNextLevelBtn=!0):3===t.level&&(a.a.findDOMNode(i).querySelector(".score").style.display="none",a.a.findDOMNode(i).querySelector(".totalScore").style.display="flex"),console.log(t.totalScore+" :"+t.points))),s})}})}},{key:"render",value:function(){var e=this,t=this.state.isVisibleDots,i=this.state.isVisibleStartBtn,s=this.state.isVisibleShuffle,l=this.state.items,a=this.state.points,o=this.state.isVisibleNextLevelBtn,r=this.state.level,c=this.state.totalScore;return n.a.createElement("div",{className:"App"},n.a.createElement("div",{className:"boxesContainer"},n.a.createElement(f,{className:"box",pose:t?"visible":"hidden"}),n.a.createElement(f,{className:"box",pose:t?"visible":"hidden"}),n.a.createElement(f,{className:"box",pose:t?"visible":"hidden"})),n.a.createElement(h,{className:"startBtn",onPressEnd:this.onClickStartBtn,pose:i?"visible":"hidden"}," Start"),n.a.createElement("ul",{className:"ul-shuffle"},n.a.createElement(p.a,{pose:s?"visible":"hidden"},l.map(function(t){return n.a.createElement(y,{key:t.id,onPressEnd:e.onClickShuffledItem.bind(e,t.id)},t.display)}))),n.a.createElement("div",{className:"score"},"Score: ",a,"/",6*r," "),n.a.createElement(b,{className:"nextLevelBtn",onPressEnd:this.onClickNextLevelBtn,pose:o?"visible":"hidden"}," Next Level"),n.a.createElement("div",{className:"totalScore"},"Total Score: ",(c/36*100).toFixed(2),"% "))}}]),t}(s.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a.a.render(n.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[10,2,1]]]);
//# sourceMappingURL=main.95f9effb.chunk.js.map