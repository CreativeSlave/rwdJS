# rwdjs
Responsive Web Design for JS


### Table of Contents

-   [RWD](#rwd)
-   [rwd](#rwd-1)
-   [RWDjs is a Singleton](#rwdjs-is-a-singleton)
    -   -   [KISS - Keep It Simple](#kiss---keep-it-simple)
    -   [events](#events)
    -   [on](#on)
-   ["rwd.on(String, Function)" Event](#rwdonstring-function-event)
    -   [getSize](#getsize)
-   [Get Size (String)](#get-size-string)
    -   [onload](#onload)
-   [getInstance](#getinstance)
-   [RWDjs is a Singleton](#rwdjs-is-a-singleton-1)

## RWD

## rwd

## RWDjs is a Singleton

Responsive Events to complement Bootstrap

It's amazing how many times I needed to invoke an event based on the
media query styles found in TW Bootstrap to accompany CSS changes to achieve
user interface goals. One might not think they need it unil they do, and then
they just find an ugly work around. BUT, this is so simple it's hard to believe
this was not included with bootstrap.

Events use the following keys: ["xs", "sm", "md", "lg", "lx"];
I hope you notice the simularity in Bootstrap's column css classNames.
The intention is to keep this VERY simple, and easy to remember.

#### KISS - Keep It Simple
**Meta**
**author**: Drew Ambrose
 MIT License
 
 ## Usage
 ```javascript

let rwd = RWD.getInstance(); // Singleton
// Create an Event for Phones
rwd.on("xs", function () {
    console.log("RWD: Mobile; This fires if and when the screen is set for Mobile Phones, just like media queries.");
})
// Create an Event for Tablets
    .on("sm", function () {
    console.log("RWD: Tablets; This fires if and when the screen is set for Tablets, just like media queries.");
});
```

### events

Object Map of Events
Keys: "xs", "sm", "md", "lg", "lx"

## rwd.on()
`rwd.on(String, Function)` Event
Using any of these keys ("xs", "sm", "md", "lg", "lx") you can create an event that will be invoked onLoad, and on window.resize for the given size.
 - "xs": Extra Small Screen
 - "sm": Small Screen
 - "md": Medium Screen
 - "lg": Large Screen
 - "lx": Extra Large Screen

**Parameters**

-   `size`  
-   `func`  
-   `args`  

### getSize()
Get Size (String)

Returns **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### rwd.onload

OnLoad

# Main
`rwd.getInstance()`

RWDjs is a Singleton class that can be used anywhere. 

**Meta**

-   **author**: Drew Ambrose

    MIT
    