"use strict";(self.webpackChunksimple_chat=self.webpackChunksimple_chat||[]).push([[308],{41055:function(e,n,a){a.d(n,{I:function(){return i}});var r=a(1413),s=a(44925),t=a(80184),o=["value","onChange","name","errorText","type","placeholder"],i=function(e){var n=e.value,a=e.onChange,i=e.name,u=e.errorText,l=void 0===(l=e.type)?"text":l,c=e.placeholder;e=(0,s.Z)(e,o);return(0,t.jsxs)("label",{className:"input-content",children:[(0,t.jsx)("span",{className:"error-input",children:u}),(0,t.jsx)("input",(0,r.Z)({autoComplete:"off",className:"input ".concat(n&&"input-not-empty"),name:i,type:l,onChange:a,value:n},e)),(0,t.jsx)("span",{className:"placeholder",children:c})]})}},80308:function(e,n,a){a.r(n),a.d(n,{Login:function(){return x}});var r=a(1413),s=a(74165),t=a(15861),o=a(55705),i=a(57689),u=a(41055),l=a(13294),c=a(9911),d=a(49565),m=a(46732),p=a(50312),h=a(80184),x=function(){var e,n=(0,i.s0)(),a=(0,c.T)(),x=(0,d.C)((function(e){return e.auth.status})),f=(0,o.TA)({initialValues:{username:"",password:""},validationSchema:m.x,onSubmit:(e=(0,t.Z)((0,s.Z)().mark((function e(r){var t,o;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=r.username,t=r.password,o={username:o,password:t},e.next=4,a((0,p.gd)(o));case 4:e.sent.payload&&n(l.m.CHAT);case 6:case"end":return e.stop()}}),e)}))),function(n){return e.apply(this,arguments)})});return(0,h.jsx)("div",{className:"login-container",children:(0,h.jsxs)("div",{className:"login-content",children:[(0,h.jsx)("h2",{className:"login-title",children:"Login temporarily unavailable"}),(0,h.jsxs)("form",{className:"login-form",onSubmit:f.handleSubmit,children:[(0,h.jsx)(u.I,(0,r.Z)((0,r.Z)({placeholder:"Username",errorText:f.touched.username&&f.errors.username||""},f.getFieldProps("username")),{},{value:f.values.username,onChange:f.handleChange})),(0,h.jsx)(u.I,(0,r.Z)((0,r.Z)({placeholder:"Password",type:"password",errorText:f.touched.password&&f.errors.password||""},f.getFieldProps("password")),{},{value:f.values.password,onChange:f.handleChange})),(0,h.jsxs)("div",{className:"buttons-container",children:[(0,h.jsx)("button",{type:"submit",className:"primary-button ".concat("loading"===x?"disabled":""),children:"Sign in"}),(0,h.jsx)("button",{type:"button",className:"secondary-button ".concat("loading"===x?"disabled":""),onClick:function(){return n(l.m.SIGNUP)},children:"Sign up"})]})]})]})})}},46732:function(e,n,a){a.d(n,{I:function(){return i},x:function(){return o}});a=(n=a(62797)).Z_().max(100,"Name should be less then 100 characters").required("Username is required");var r=n.Z_().min(6,"Password must contain at least 6 characters").max(30,"Password is too long").required("Password is required"),s=n.Z_().max(200,"URL is too long"),t=n.Z_().oneOf([n.iH("password")],"Password does not match").required("Confirm your password"),o=n.Ry({username:a,password:r}),i=n.Ry({username:a,password:r,avatarURL:s,confirmPassword:t})}}]);