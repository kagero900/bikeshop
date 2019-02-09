jQuery(document).ready(function($){

  'use strict';
  var slider=function(e){
    const ClassName = {INDICATOR_ACTIVE: 'slider_indicator_active',ITEM: 'slider_item',ITEM_LEFT: 'slider_item_left',ITEM_RIGHT: 'slider_item_right',ITEM_PREV: 'slider_item_prev',ITEM_NEXT: 'slider_item_next',ITEM_ACTIVE: 'slider_item_active'}
    var d=!1,u=0,i={},v={},I={},f={selector:"",isCycling:!0,direction:"next",interval:5e3,pause:!0},r=function(s){var n;return v.forEach(function(e,t){e===s&&(n=t)}),n},l=function(e,t,s){var n,a,i=ClassName.ITEM_RIGHT,r=ClassName.ITEM_PREV,l=v[t],c=v[s],o=function(){l.classList.remove(ClassName.ITEM_ACTIVE),l.classList.remove(i),c.classList.remove(r),c.classList.remove(i),c.classList.add(ClassName.ITEM_ACTIVE),window.setTimeout(function(){f.isCycling&&(clearInterval(u),C()),d=!1,l.removeEventListener("transitionend",o)},700)};d||(d=!0,"next"===e&&(i=ClassName.ITEM_LEFT,r=ClassName.ITEM_NEXT),c.classList.add(r),n=t,a=s,I.length===v.length&&(I[n].classList.remove(ClassName.INDICATOR_ACTIVE),I[a].classList.add(ClassName.INDICATOR_ACTIVE)),window.setTimeout(function(){c.classList.add(i),l.classList.add(i),l.addEventListener("transitionend",o)},0))},a=function(e){var t=i.querySelector("."+ClassName.ITEM_ACTIVE),s=r(t),n=v.length-1,a=0===s?n:s-1;"next"===e&&(a=s==n?0:s+1),l(e,s,a)},C=function(){f.isCycling&&(u=window.setInterval(function(){a(f.direction)},f.interval))},t=function(e){var t=i.querySelector("."+ClassName.ITEM_ACTIVE),s=r(t),n=e.target.getAttribute("data-slide-to");if(e.target.hasAttribute("data-slide-to")||e.target.classList.contains("slider_control"))if(e.target.hasAttribute("data-slide-to")){if(s===n)return;l(s<n?"next":"prev",s,n)}else e.preventDefault(),a(e.target.classList.contains("slider_control_next")?"next":"prev")};for(var s in e)s in f&&(f[s]=e[s]);return i="string"==typeof f.selector?document.querySelector(f.selector):f.selector,v=i.querySelectorAll("."+ClassName.ITEM),I=i.querySelectorAll("[data-slide-to]"),C(),i.addEventListener("click",t),f.pause&&f.isCycling&&(i.addEventListener("mouseenter",function(e){clearInterval(u)}),i.addEventListener("mouseleave",function(e){clearInterval(u),C()})),{next:function(){a("next")},prev:function(){a("prev")},stop:function(){clearInterval(u)},cycle:function(){clearInterval(u),C()}}}({
    selector:".slider",
    isCycling:true,
    direction:"next",
    interval:5000,
    pause:false
  });

});
