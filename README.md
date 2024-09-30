<div style="text-align:center"><img src="./img/osm-logo-small.png" alt="origami-state-manager-logo"/></div>

# **Origami-State-Manager (OSM)**

**Origami-State-Manager (OSM)** (pronounced _"awesome"_) is a lightweight, flexible, and simple state management library designed to work seamlessly in both React and non-React environments with minimal boilerplate.

Jump to:

- [Motivation](#motivation) for the development of OSM.
- [Comparison with other libraries](#comparison-with-other-libraries) for benchmark results.

---

## **Why the Name “Origami”?**

Origami is the Japanese art of paper folding, where a simple sheet of paper transforms into complex designs. Similarly, **OSM** is flexible, scalable, and lightweight, enabling developers to easily shape and manage global state in their applications.

⚠️ **Disclaimer:** OSM is in its early stages and may have some rough edges. Use cautiously, and feel free to contribute if you encounter issues!

---

## **Installation**

To install **Origami-State-Manager**, simply use npm:

```bash
npm install origami-state-manager
```

---

## **Creating a Store**

A store in OSM holds your global states. To create one, pass the initial states to the `createStore` method:

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

To make a store persistent, provide a unique store name as the second argument:

```javascript
export const store = createStore(initialValues, "myOSMness");
```

---

## **Usage**

### **React Hook: `useStateListener`**

The `useStateListener` hook allows you to access and listen to state changes within your React components:

```javascript
import { useStateListener } from "origami-state-manager";
import { store } from "./store";

function ExampleComponent() {
  const origami = useStateListener("origami", store);
  return <div>Origami Count: {origami}</div>;
}
```

For accessing deeply nested properties, use dot notation:

```javascript
const deepOrigami = useStateListener("level1.level2.deepOrigami", store);
```

### **Accessing State in Non-React Files**

OSM supports state access in non-React environments using `stateValue`:

```javascript
const count = stateValue("count", store);
```

For deeply nested states:

```javascript
const deepCount = stateValue("level1.level2.deepCount", store);
```

### **Updating State from React/Non-React Files**

Use `stateValue` to update the state by passing an updater function as the third argument:

```javascript
<button onClick={stateValue("count", store, () => 0)}>Reset</button>
```

You can also update the state based on the current value:

```javascript
<button onClick={stateValue("count", store, (prev) => prev + 1)}>
  Increment
</button>
```

---

## **Motivation**

OSM was developed with the goal of creating a simple, lightweight global state management solution with minimal setup. It allows for effortless state management across React and non-React functions, making it suitable for applications that need an uncomplicated and efficient state management system.

---

## **Comparison with Other Libraries**

As of September 30, 2024:

OSM stands out due to its minimal boilerplate and a build size. A performance comparison project is included in the repository to benchmark OSM against popular state management libraries.

### **Running Performance Tests**

Performance and benchmark tests are included in the `performance-test` folder. You can run them as follows:

1. **Install dependencies:**

   ```bash
   cd performance-test
   npm install
   ```

2. **Run Jest tests for state updates:**

   ```bash
   npm test
   ```

3. **Run benchmark tests:**
   ```bash
   npm start
   ```

The Jest tests will output complex and simple state update results, while the `react-component-benchmark` will run more detailed benchmarks.

---

## **Contributing to Origami-State-Manager**

Contributions are highly appreciated! Please review the [contribution guidelines](https://github.com/azee-rajput/origami-state-manager/blob/HEAD/CONTRIBUTING.md) for more details on how to get involved.

---

## **Changelog**

Stay updated on new releases and features by visiting the [changelog](https://github.com/azee-rajput/origami-state-manager/blob/HEAD/CHANGELOG.md), which is updated regularly.

---
