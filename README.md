<div style="justify-content:center; display:flex;"><img src="./img/osm-logo-small.png" alt="origami-state-manager-logo"/></div>

# **Origami-State-Manager (OSM)**

**Origami-State-Manager (OSM)**, pronounced _"awesome,"_ is a lightweight state management library that requires minimal boilerplate. OSM stands out for its ability to seamlessly access and update global states from both React and non-React environments.

### **Why the Name “Origami”?**

Origami is the Japanese art of paper folding, known for transforming a simple sheet into intricate designs. Just like Origami, **OSM** is flexible, scalable, and adaptable, allowing you to effortlessly shape your global state. And, just like paper, it’s incredibly lightweight.

⚠️ **Disclaimer:** OSM is in its early stages and hasn’t been fully tested. Be cautious as you might encounter some **Oopsies** along the way.

---

## **Installation**

Ready to add some **OSM-ness** to your project? Install the library using npm:

```bash
npm install origami-state-manager
```

---

## **Creating a Store**

A store is where all OSM states are stored. To create a store, pass the initial states to the `createStore` method and export the newly created store:

```javascript
// store.ts
import { createStore } from "origami-state-manager";

const initialValues = {
  origami: 0,
  osmness: 0,
};

export const store = createStore(initialValues);
```

### **Making the Store Persistent**

By default, the store is not persistent. To make a store persistent, pass a store name as the second argument to the `createStore` method:

```javascript
export const store = createStore(initialValues, "myOSMness");
```

---

## **Usage**

### **React Hook: `useStateListener`**

This hook allows you to access and listen to state changes within a React component:

```javascript
import { useStateListener } from "origami-state-manager";
import { store } from "./store";

function ExampleComponent() {
  const origami = useStateListener("origami", store);

  return <div>Origami Count: {origami}</div>;
}
```

The hook takes two arguments: the state name and the store instance.

### **Accessing State Properties**

Each state provides the following methods:

- **`value`**: Current value.
- **`subscribe`**: Registers a callback function that triggers when the state changes. The `useStateListener` hook uses this method internally.

Example:

```javascript
import { useEffect, useState } from "react";
import { store } from "./store";

function ExampleComponent() {
  const [origamiValue, setOrigamiValue] = useState(store["origami"].value);

  useEffect(() => {
    const unsubscribe = store["origami"].subscribe((newState) => {
      setOrigamiValue(newState);
    });
    return unsubscribe;
  }, []);

  return <div>Origami Value: {origamiValue}</div>;
}
```

---

## **Examples: Accessing & Updating State**

### **Updating a State**

To update a state, assign a new value to the `value` property:

```javascript
import { store } from "./store";

function UpdateOrigami() {
  return (
    <button onClick={() => (store["origami"].value = new Date().getSeconds())}>
      Update Origami
    </button>
  );
}
```

### **Accessing State in a React Component**

Use the `useStateListener` hook to access state values in another component:

```javascript
import { store } from "./store";
import { useStateListener } from "origami-state-manager";

function DisplayCounts() {
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

### **Accessing and Updating State from Non-React Files**

You can access and update state values from non-React files or functions as well:

```javascript
// utils.js

function getUserProfile() {
  let profile = store["profile"].value;
  if (!profile) {
    store["profile"].value = {};
  }

  return store["profile"].value;
}
```

---

## **Background**

The development of the OSM library began as a research project aimed at creating a lightweight global state management solution with minimal boilerplate. The goal was to enable seamless state updates and access across both React and non-React functions while keeping the setup simple, easy, and lightweight.

Given that OSM is still in its early stages, it is best suited for smaller projects or applications with straightforward state management needs.

---

## **Contributing to Origami-State-Manager**

Contributions are welcome! Check out the [contribution guidelines](https://github.com/azee-rajput/origami-state-manager/blob/HEAD/CONTRIBUTING.md) to learn more.

---

## **Changelog**

Stay up-to-date with the latest changes by visiting the [changelog](https://github.com/azee-rajput/origami-state-manager/blob/HEAD/CHANGELOG.md), which is regularly updated with new releases.

---
