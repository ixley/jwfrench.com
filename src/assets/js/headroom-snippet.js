// if you're using a bundler, first import:
import Headroom from "headroom.js";
// grab an element
var myElement = document.querySelector("site-header__container");
// construct an instance of Headroom, passing the element
var headroom = new Headroom(myElement);
// initialise
headroom.init();
