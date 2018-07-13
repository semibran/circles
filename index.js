"use strict";var _slicedToArray=function(i,t){if(Array.isArray(i))return i;if(Symbol.iterator in Object(i))return function(i,t){var o=[],r=!0,e=!1,n=void 0;try{for(var c,l=i[Symbol.iterator]();!(r=(c=l.next()).done)&&(o.push(c.value),!t||o.length!==t);r=!0);}catch(i){e=!0,n=i}finally{try{!r&&l.return&&l.return()}finally{if(e)throw n}}return o}(i,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")};!function(){var t={size:[256,256],bodies:[{circle:{radius:64,position:[192,192]},velocity:[.5,1]},{circle:{radius:32,position:[64,192]},velocity:[2,1]},{circle:{radius:16,position:[192,64]},velocity:[2,4]},{circle:{radius:8,position:[64,64]},velocity:[8,4]}]},i=document.createElement("canvas"),n=i.getContext("2d");function _(i){return i.circle.radius}function j(i,t){return[i[0]*t,i[1]*t]}function k(i,t){return[i[0]-t[0],i[1]-t[1]]}function F(i,t){return i[0]*t[0]+i[1]*t[1]}function O(i){return Math.sqrt(Math.pow(i[0],2)+Math.pow(i[1],2))}function R(i,t){return Math.pow(t[0]-i[0],2)+Math.pow(t[1]-i[1],2)}function B(i){return i.size[0]}function D(i){return i.size[1]}function G(i,t){if(void 0===t)return c(i)-a(i);c(i,t+a(i))}function H(i,t){if(void 0===t)return c(i)+a(i);c(i,t-a(i))}function J(i,t){if(void 0===t)return l(i)-a(i);l(i,t+a(i))}function K(i,t){if(void 0===t)return l(i)+a(i);l(i,t-a(i))}function c(i,t){if(void 0===t)return i.position[0];i.position[0]=t}function l(i,t){if(void 0===t)return i.position[1];i.position[1]=t}function a(i){return i.radius}i.width=B(t),i.height=D(t),document.body.appendChild(i),function i(){!function(i){var t=["red","lime","blue","yellow","cyan","magenta"];n.fillStyle="black",n.fillRect(0,0,B(i),D(i));for(var o=0;o<i.bodies.length;o++){var r=i.bodies[o],e=r.circle;n.beginPath(),n.fillStyle=t[o],n.arc(c(e),l(e),a(e),0,2*Math.PI),n.fill()}}(t);!function(i){var t=!0,o=!1,r=void 0;try{for(var e,n=i.bodies[Symbol.iterator]();!(t=(e=n.next()).done);t=!0){var c=e.value,l=c.circle;l.position[0]+=c.velocity[0],l.position[1]+=c.velocity[1],G(l)<0?(G(l,0),c.velocity[0]*=-1):H(l)>B(i)&&(H(l,B(i)),c.velocity[0]*=-1),J(l)<0?(J(l,0),c.velocity[1]*=-1):K(l)>D(i)&&(K(l,D(i)),c.velocity[1]*=-1)}}catch(i){o=!0,r=i}finally{try{!t&&n.return&&n.return()}finally{if(o)throw r}}for(var a=0;a<i.bodies.length-1;a++)for(var u=i.bodies[a],v=u.circle.position,s=[v[0]-u.velocity[0],v[1]-u.velocity[1]],f=a+1;f<i.bodies.length;f++){var d=i.bodies[f],y=d.circle.position,p=[y[0]-d.velocity[0],y[1]-d.velocity[1]];if(P=d,R((I=u).circle.position,P.circle.position)<Math.pow(I.circle.radius+P.circle.radius,2)&&R(v,y)<R(s,p)){var h=(g=d,void 0,A=(M=u).circle.position,S=g.circle.position,x=M.velocity,z=g.velocity,T=_(M),q=_(g),C=k(x,j(k(A,S),2*q/(T+q)*(F(k(x,z),k(A,S))/Math.pow(O(k(A,S)),2)))),E=k(z,j(k(S,A),2*T/(T+q)*(F(k(z,x),k(S,A))/Math.pow(O(k(S,A)),2)))),[C,E]),b=_slicedToArray(h,2),w=b[0],m=b[1];u.velocity=w,d.velocity=m}}var M,g,A,S,x,z,T,q,C,E;var I,P}(t);requestAnimationFrame(i)}()}();