# useReducer Hook - State Management

## What is a Reducer?

A **reducer** is a pure function that takes the current state and an action, and returns a new state. The name comes from the JavaScript `Array.reduce()` method, which combines values into a single result.

```javascript
reducer(currentState, action) => newState
```

## Why Use useReducer?

### 1. **Complex State Logic**
When you have multiple related state variables that depend on each other, `useReducer` consolidates them into one cohesive state object.

**Before (multiple useState):**
```javascript
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
```

**After (single useReducer):**
```javascript
const [state, dispatch] = useReducer(authReducer, initialState);
// state = { user: null, loading: false, error: null }
```

### 2. **Predictable State Transitions**
All state updates go through the reducer, making it easier to understand and debug state changes. You have a single source of truth for how state transforms.

### 3. **Easier to Test**
Reducers are pure functions with no side effects, making them simple to unit test.

```javascript
// Easy to test - just call the function
const newState = authReducer(currentState, { type: 'LOGIN_SUCCESS', payload: userData });
expect(newState.user).toBe(userData);
```

### 4. **Performance Optimization**
You can pass `dispatch` down to child components instead of multiple callback functions, reducing re-renders.

### 5. **Async Operations Management**
Reducers excel at managing loading and error states alongside the actual data.

---

## Example 1: Counter with Steps

Simple example showing how reducers work:

```javascript
import { useReducer } from 'react';

// Define the reducer function
function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + action.payload;
    case 'DECREMENT':
      return state - action.payload;
    case 'RESET':
      return 0;
    default:
      return state;
  }
}

function Counter() {
  const [count, dispatch] = useReducer(counterReducer, 0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT', payload: 1 })}>+1</button>
      <button onClick={() => dispatch({ type: 'INCREMENT', payload: 5 })}>+5</button>
      <button onClick={() => dispatch({ type: 'DECREMENT', payload: 1 })}>-1</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
    </div>
  );
}
```

---

## Example 2: Shopping Cart

A more realistic example showing complex state management:

```javascript
import { useReducer } from 'react';

const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const newItems = [...state.items, action.payload];
      return {
        items: newItems,
        total: state.total + action.payload.price,
        itemCount: state.itemCount + 1,
      };
    
    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      const removedItem = state.items.find(item => item.id === action.payload);
      return {
        items: filteredItems,
        total: state.total - (removedItem ? removedItem.price : 0),
        itemCount: state.itemCount - 1,
      };
    
    case 'APPLY_DISCOUNT':
      return {
        ...state,
        total: state.total * (1 - action.payload / 100),
      };
    
    case 'CLEAR_CART':
      return initialState;
    
    default:
      return state;
  }
}

function ShoppingCart() {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeItem = (productId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  return (
    <div>
      <p>Items: {cart.itemCount}</p>
      <p>Total: ${cart.total.toFixed(2)}</p>
      <button onClick={() => dispatch({ type: 'APPLY_DISCOUNT', payload: 10 })}>
        Apply 10% Discount
      </button>
      <button onClick={() => dispatch({ type: 'CLEAR_CART' })}>
        Clear Cart
      </button>
    </div>
  );
}
```

---

## Example 3: Form State Management

Managing multiple form fields with validation:

```javascript
import { useReducer } from 'react';

const initialFormState = {
  values: { email: '', password: '', name: '' },
  errors: { email: '', password: '', name: '' },
  touched: { email: false, password: false, name: false },
  isSubmitting: false,
};

function formReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_FIELD':
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: action.value,
        },
      };
    
    case 'TOUCH_FIELD':
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.field]: true,
        },
      };
    
    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.error,
        },
      };
    
    case 'SUBMIT_START':
      return { ...state, isSubmitting: true };
    
    case 'SUBMIT_SUCCESS':
      return { ...state, isSubmitting: false };
    
    case 'SUBMIT_ERROR':
      return { ...state, isSubmitting: false, errors: action.payload };
    
    case 'RESET':
      return initialFormState;
    
    default:
      return state;
  }
}

function LoginForm() {
  const [form, dispatch] = useReducer(formReducer, initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'CHANGE_FIELD', field: name, value });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    dispatch({ type: 'TOUCH_FIELD', field: name });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_START' });
    
    try {
      // API call here
      dispatch({ type: 'SUBMIT_SUCCESS' });
    } catch (err) {
      dispatch({ type: 'SUBMIT_ERROR', payload: err.errors });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" value={form.values.email} onChange={handleChange} onBlur={handleBlur} />
      {form.touched.email && form.errors.email && <p>{form.errors.email}</p>}
      
      <input name="password" type="password" value={form.values.password} onChange={handleChange} onBlur={handleBlur} />
      {form.touched.password && form.errors.password && <p>{form.errors.password}</p>}
      
      <button type="submit" disabled={form.isSubmitting}>
        {form.isSubmitting ? 'Submitting...' : 'Login'}
      </button>
    </form>
  );
}
```

---

## useState vs useReducer Comparison

| Feature | useState | useReducer |
|---------|----------|-----------|
| Best for | Simple state (boolean, string, number) | Complex, related state |
| Learning curve | Easier | Steeper |
| Code complexity | Simple | More boilerplate |
| State updates | Multiple setters | Single dispatch |
| Debugging | Harder (multiple updates) | Easier (centralized logic) |
| Testing | Harder | Easier (pure functions) |
| Performance | OK for simple cases | Better for complex logic |
| Async operations | Can get messy | Cleaner |

---

## When to Use useReducer

**Use useReducer when:**
- You have multiple state variables that change together
- You have complex state logic with many actions
- You want to optimize performance (pass dispatch to children)
- You need to manage loading, error, and data states together
- You want easier debugging and testing

**Use useState when:**
- You have simple state (single boolean, string, or number)
- Each state variable is independent
- Your component is simple and small
- You don't need complex update logic

---


