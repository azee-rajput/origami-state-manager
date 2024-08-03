# Oopsies-State-Manager

**Oopsies-State-Manager** (OSM), pronounced _"awesome"_ is a simple, lightweight state management library that requires minimal boilerplate. OSM stands out because it allows states to be accessed and updated from both React and non-React files.

**Disclaimer**: OSM is not fully tested, so be cautious as you might encounter some **Oopsies**.

## Installation

Enough **AWESOMENESS** of **OSM** and let's install the **OSM-ness** in your app and make your work more **OSM**

Follow these steps to install OSM in your project:

1. Copy the `tarball` file (_Oopsies-State-Manager-xx.xx.xx.tgz_) into the root of your project.
2. Add the following line to the `dependencies` section of your project's `package.json`:

   ```json
   "oopsies-state-manager": "./oopsies-state-manager-x.x.x.tgz"
   ```

3. Run `npm i` to install.

## Creating a Store

A store is an object where all OSM states are stored. To create a store, pass the initial states to the `createStore` method and export the newly created store.

```javascript
// store.ts
import { createStore } from "oopsies-state-manager";

const initialValues = {
  oopsies: 0,
  osmness: 0,
};

export const store = createStore(initialValues);
```

By default, the store is not persistent. To make a store persistent, pass the store name as a string to the second argument of the `createStore` method.

```javascript
export const store = createStore(initialValues, "myOSMness");
```

### Usage

- **`useStateListener`**: A React hook to get updated state from the store.

  ```javascript
  const { stateValue, setLocalState } = useStateListener("oopsies", store);
  ```

  - **`stateValue`**: A React state that updates when its store state is updated.
  - **`setLocalState`**: A React state dispatch method to update the store and React state.

  A brief example of using `useStateListener` is given in the examples section.

Store states provide the following methods:

- **`value`**: Current value.
- **`getValue`**: Get the current value.
- **`setValue`**: Set/update value in the store state.
- **`registerListener`**: Register your callback function. `useStateListener` uses this method to register a state change listener.

  ```javascript
  const [stateValue, setStateValue] = useState(store[stateName].getValue());

  store[stateName].registerListener((val: any) => setStateValue(val));
  ```

## Examples: Accessing & Updating State

### Updating a State

To update a state, use the `setValue` method provided by the store.

```javascript
import { store } from "./store";

function OopsiesA() {
  return (
    <button onClick={() => store["oopsies"].setValue(new Date().getSeconds())}>
      Oopsies
    </button>
  );
}
```

### Accessing State in a React Component

Use the `useStateListener` hook to access the state in another component. This hook takes two arguments: the state name and the store.

```javascript
import { store } from "./store";
import { useStateListener } from "oopsies-state-manager";

function OopsiesB() {
  const { stateValue: oopsies } = useStateListener("oopsies", store);
  const { stateValue: osmness } = useStateListener("osmness", store);

  return (
    <>
      <h1>OSM-ness Count: {osmness}</h1>
      <h2>Oopsies Count: {oopsies}</h2>
    </>
  );
}
```

Sometimes the `setValue` method may not behave as expected, especially when multiple components use the `useStateListener` hook with the same state name. To avoid these issues, use the `setLocalState` method provided by `useStateListener` to update the state in the store.

```javascript
import { store } from "./store";
import { useStateListener } from "oopsies-state-manager";

function OopsiesA() {
  const { setLocalState } = useStateListener("oopsies", store);
  return (
    <button onClick={() => setLocalState(new Date().getSeconds())}>
      Oopsies
    </button>
  );
}
```

### Accessing and Updating States from Non-React Files

You can access and update states from non-React files/methods as well. Use the `setValue` method to update values and the `getValue` method to access them.

```javascript
// utils.js

function getUserProfile() {
  let user = store["user"].getValue();
  if (!user) {
    store["profile"].setValue({});
  }

  return store["profile"].getValue();
}
```

## Why Use OSM?

The idea behind OSM is to provide global states that can be accessed and updated from both React and non-React functions with minimal boilerplate. As this library is still in its early stages, it is advised to use it in projects where states are not complex, the UI is not complex, or in small projects where you want to have states globally available.

**Disclaimer**: OSM is not fully tested, so you might encounter some **Oopsies**. Please open an issue if you encounter any bugs.

### Keywords

[react](https://www.npmjs.com/search?q=keywords:react) [state management](https://www.npmjs.com/search?q=keywords:state-management) [store](https://www.npmjs.com/search?q=keywords:store) [redux ](https://www.npmjs.com/search?q=keywords:redux) [zustand](https://www.npmjs.com/search?q=keywords:zustand) [mobx](https://www.npmjs.com/search?q=keywords:mobx) [state](https://www.npmjs.com/search?q=keywords:state) [global-state](https://www.npmjs.com/search?q=keywords:global-state) [react-state](https://www.npmjs.com/search?q=keywords:react-state) [react-component](https://www.npmjs.com/search?q=keywords:react-component)

---
