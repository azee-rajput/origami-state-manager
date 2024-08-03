# Oopsies-State-Manager

**Oopsies-State-Manager** is, as its acronym suggests - **OSM**, an **awesome** state management library because it is a simple, easy, and lightweight state management solution with _VERY_ little boilerplate.

There are other lightweight libraries as well but **OSM** has an advantage over them and that is ... **States can be accessed and updated from non-react files as well.**

**Disclaimer**: OSM is not fully tested so be careful, you might run into **Oopsies**.

## Installing **OSM**:

Enough **AWESOMENESS** of **OSM** and let's install the **OSM-ness** in your app and make your work more **OSM**

- Copy `tarball` _(Oopsies-State-Manager-xx.xx.xx.tgz)_ into the root of your project
- Add following line in the project package.json in dependencies
- - `"oopsies-state-master": "./oopsies-state-master-x.x.x.tgz"`
- Run `npm i`

## Creating Store

Store is an object where all the **OSM** states are stored. To create a store, pass initial states to the `createStore` method and export the newly created store.

```
// store.ts
import { createStore } from "oopsies-state-master";

const initialValues = {
  oopsies: 0,
  osmness:0,
};

export const store = createStore(initialValues);
```

The store is not persistent by default. To make a store persistent, pass store name as string to the second argument of `createStore` method.

`export const store = createStore(initialValues, 'myOSMness');`

### Usage

- `useStateListener` : A react hook to get updated state from store.

```
const {stateValue, setLocalState} = useStateListener("oopsies", store);
```

- `stateValue` : A react state which get updated when its store state is updated.
- `setLocalState` : A react state dispatch method to update the store and react state

A brief example is of the usage of `useStateListener` is given in examples section.

Store states provide following methods:

- `value` : Current value
- `getValue` : Get current value
- `setValue` : Set/update value in the store state
- `registerListener` : Register your own callback function. `useStateListener` uses this method to register state change listener.

```
  const [stateValue, setStateValue] = useState(store[stateName].getValue());

  store[stateName].registerListener((val: any) => setStateValue(val));
```

## Examples: Accessing & Updating State

Let's start with updating a state. To update the state, store provides `setValue` method.

```
import store from './store'

function OopsiesA(){
    return(
        <button onClick={()=>store["oopsies"].setValue(new Date().getSeconds())}>Oopsies</button>
    )
}
```

Use the `useStateListener` hook to access the state in another component. This hook takes two arguments, first the state name and second store.

```
import store from './store'
import { useStateListener } from "oopsies-state-master";

function OopsiesB(){
    const {stateValue: oopsies} = useStateListener("oopsies", store);
    const {stateValue: osmness} = useStateListener("osmness", store);

    return(
        <>
        <h1>OSM-ness Count: {osmness}</h1>
        <h2>Oopsies Count: {oopsies}</h2>
        </>
    )
}
```

But sometimes `setValue` method does not behave as expected. It happens usually when multiple components using `useStateListener` hook with the same state name. To avoid these unexpected behaviors, `useStateListener` also provides `setLocalState` method to update the state in the store

```
import store from './store'
import { useStateListener } from "oopsies-state-master";

function OopsiesA(){
   const {setLocalState} = useStateListener('oopsies', store)
    return(
        <button onClick={()=>setLocalState(new Date().getSeconds())}>Oopsies</button>
    )
}
```

We can access and update the states from non-react files/methods as well. Updating value is same as we did before by using the `setValue` method provided by store object. Similarly, to access the value, we can use `getValue` provided by store object.

```
// utils.js

function getUserProfile(){
    let user = store["user"].getValue()
    if(!user){
        store["profile"].setValue({})
    }

    return store["profile"].getValue()
}

```

## Why use OSM?

The idea behind developing this library was to have global states that can be accessed and updated from non-react functions with as minimum boilerplate as it could be. As this library is immature, it is advised to use it in projects where states are not complex, UI is not complex, is a small project, or projects where you want to have states globally available in react and non-react functions alike.

**Disclaimer**: OSM is not fully tested so be careful, you might run into **Oopsies**. Open issue, if you run into oopsies (bug).

### Keywords

react state management store redux non-react simple easy lightweight
