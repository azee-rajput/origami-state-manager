# Origami-State-Manager

**Origami-State-Manager** (OSM), pronounced _"awesome"_ is a simple, lightweight state management library that requires minimal boilerplate. OSM stands out because it allows states to be accessed and updated from both React and non-React files.

**Disclaimer**: **OSM** is not fully tested, so be cautious as you might encounter some **Oopsies**.

**Origami**: Origami is the Japanese art of paper folding, known for transforming a simple sheet into intricate designs. Just like Origami, **OSM** is flexible, scalable, and adaptable, allowing you to effortlessly shape your global state. And, just like paper, it’s incredibly lightweight.

## Installation

Enough **AWESOMENESS** of **OSM** and let's install the **OSM-ness** in your app and make your work more **OSM**

Follow these steps to install **OSM** in your project:

1. Copy the `tarball` file (_Origami-State-Manager-xx.xx.xx.tgz_) into the root of your project.
2. Add the following line to the `dependencies` section of your project's `package.json`:

   ```json
   "origami-state-manager": "./origami-state-manager-x.x.x.tgz"
   ```

3. Run `npm i` to install.

## Creating a Store

A store is an object where all OSM states are stored. To create a store, pass the initial states to the `createStore` method and export the newly created store.

```javascript
// store.ts
import { createStore } from "origami-state-manager";

const initialValues = {
  origami: 0,
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
  const origami = useStateListener("origami", store);
  ```

  A brief example of using `useStateListener` is given in the examples section.

Store states provide the following methods:

- **`value`**: Current value.
- **`subscribe`**: Register your callback function. `useStateListener` uses this method to register a state change listener.

  ```javascript
  const [stateValue, setStateValue] = useState(store[stateName].value);

  useEffect(() => {
    store[stateName].subscribe((state: any) => {
      setStateValue(state);
    });
  }, [stateName, store]);
  ```

## Examples: Accessing & Updating State

### Updating a State

To update a state, simply assign new value to `value` property.

```javascript
import { store } from "./store";

function OrigamiA() {
  return (
    <button
      onClick={() => {
        store["origami"].value = new Date().getSeconds();
      }}
    >
      Origami
    </button>
  );
}
```

### Accessing State in a React Component

Use the `useStateListener` hook to access the state in another component. This hook takes two arguments: the state name and the store.

```javascript
import { store } from "./store";
import { useStateListener } from "origami-state-manager";

function OrigamiB() {
  const origami = useStateListener("origami", store);
  const osmness = useStateListener("osmness", store);

  return (
    <>
      <h1>OSM-ness Count: {osmness}</h1>
      <h2>Origami Count: {origami}</h2>
    </>
  );
}
```

### Accessing and Updating States from Non-React Files

You can access and update states from non-React files/methods as well. Use the `value` property to access and update the value.

```javascript
// utils.js

function getUserProfile() {
  let user = store["user"].value;
  if (!user) {
    store["profile"].value = {};
  }

  return store["profile"].value;
}
```

## Why Use OSM?

The idea behind **OSM** is to provide global states that can be accessed and updated from both React and non-React functions with minimal boilerplate. As this library is still in its early stages, it is advised to use it in projects where states are not complex, the UI is not complex, or in small projects where you want to have states globally available.

**Disclaimer**: **OSM** is not fully tested, so you might encounter some **Oopsies**. Please open an issue if you encounter any bugs.

## Contributing to Origami State Manager

Your contributions and support are invaluable, and we appreciate everything you do to help us grow and improve.

Here is a document with a few guidelines to help you along the way.

[Contributing to OSM](https://github.com/azee-rajput/origami-state-manager/blob/develop/CONTRIBUTING.md)

### Keywords

[react](https://www.npmjs.com/search?q=keywords:react) [state management](https://www.npmjs.com/search?q=keywords:state-management) [store](https://www.npmjs.com/search?q=keywords:store) [redux ](https://www.npmjs.com/search?q=keywords:redux) [zustand](https://www.npmjs.com/search?q=keywords:zustand) [mobx](https://www.npmjs.com/search?q=keywords:mobx) [state](https://www.npmjs.com/search?q=keywords:state) [global-state](https://www.npmjs.com/search?q=keywords:global-state) [react-state](https://www.npmjs.com/search?q=keywords:react-state) [react-component](https://www.npmjs.com/search?q=keywords:react-component)

---
