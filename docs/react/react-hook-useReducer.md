---
title: 'React Hook - useReducer'
sidebar_label: '[React] useReducer'
---

# [React] React Hook - useReducer

> `useReducer` is a React Hook that lets you add a [reducer](https://react.dev/learn/extracting-state-logic-into-a-reducer) to your component.
>
> React 官方文件：[useReducer － React](https://react.dev/reference/react/useReducer)

在 React 中我們會使用 `useState` 來管理 state（狀態），但當一個頁面需要許多 state 同時存在，而且 state 之間存在邏輯關聯的情況時，可以改用 React 的另一個 hook — `useReducer` 來集中管理狀態與邏輯。

## 基本用法

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

- `reducer` - 一個純函數，接收當前狀態並返回最新的狀態
- `initialState` - 初始狀態值
- `state` - 當前狀態
- `dispatch` - 用來發送 action 的函數

## useState 與 useReducer

假設我們有一個包含多個欄位的表單，使用者可以輸入名字、電子郵件和電話號碼等資訊。我們想要在 React 中管理這些表單的狀態。

### 使用 `useState`

當我們使用 `useState` 來管理每個表單欄位的狀態：

```jsx
import React, { useState } from 'react';

const FormWithState = () => {
  // 定義每個欄位會用到的 state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // 用來操作 state 的 handler functions
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, phone });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Email"
      />
      <input
        type="tel"
        value={phone}
        onChange={handlePhoneChange}
        placeholder="Phone"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormWithState;
```

這邊可以看到，每個欄位都有自己的 state、每個 state 也需要有對應的 `event handler function` 來操作，這些狀態與邏輯分散在多個地方，當狀態與操作變得大量且複雜時，將會變得更難以閱讀與管理。

#### 使用 `useState` 的問題

1. **狀態分散**：每個欄位有自己的 `useState`，狀態更新邏輯分散在多個地方。
2. **複雜的狀態更新邏輯**：隨著表單欄位的增加，狀態管理變得更加複雜。
3. **重複代碼**：需要為每個欄位編寫類似的狀態更新函數（如 `handleNameChange`、`handleEmailChange`）。

### 使用 `useReducer`

當我們改用 `useReducer` 來管理表單狀態：

```jsx
import React, { useReducer } from 'react';

// 定義初始狀態
const initialState = {
  name: '',
  email: '',
  phone: '',
};

// 定義 reducer 函數
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_PHONE':
      return { ...state, phone: action.payload };
    default:
      return state;
  }
};

const FormWithReducer = () => {
  // 使用 useReducer，將先定義好的 reducer 以及 initialState 傳入
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (field) => (e) => {
    // 使用 dispatch(action) 呼叫 reducer，夾帶 action object（包含 type 與 payload）
    dispatch({ type: `SET_${field.toUpperCase()}`, payload: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={state.name}
        onChange={handleChange('name')}
        placeholder="Name"
      />
      <input
        type="email"
        value={state.email}
        onChange={handleChange('email')}
        placeholder="Email"
      />
      <input
        type="tel"
        value={state.phone}
        onChange={handleChange('phone')}
        placeholder="Phone"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormWithReducer;
```

#### 使用 `useReducer` 的優點

1. **集中管理狀態**：所有的狀態更新邏輯可以從元件中分離出來，並集中在 `reducer` 函數中，方便理解和維護，達到**關注點分離** (SOC, separation of concerns)
2. **減少重複程式碼**：避免在一個元件中使用多個 `useState` 並且透過一個 `dispatch` 函數就可以處理所有狀態的更新，不需要為每個欄位分別定義 handler function
3. **更好的擴展性**：隨著表單欄位的增加，只需在 `reducer` 函數中添加新的 case，而不必增加更多的 `useState` 和 handler 函數
4. **狀態變化更加可預測**：由於所有的狀態變化都通過 `dispatch` 和 `reducer` 進行管理，因此可以更清晰地看到每一個 action 是如何改變狀態的

### 使用情境

- 當 state 的更新邏輯比較複雜，或涉及多個子值時
- 當下一個 state 依賴於前一個 state 的值時
- 想要避免在組件中使用多個 `useState`，將邏輯集中在一個地方
