# Weather App React + TypeScript + Vite + Axios + SASS
This template provides a minimal setup to get React working in Vite with HMR, Axios for HTTP requests, SASS for styling, and some ESLint rules.

This document contains information on how to create, pages, components, how to utilize SASS with BEM pattern, react hooks and how to setup a service call with Axios.

## Getting Started

To get started, first make sure to install node.js, then run the following commands:

```sh
npm install
npm run dev
```



## Create new react component

```sh
npm run generate component <ComponentName>
```

## Create new react page

```sh 
npm run generate page <PageName>
```

## Using React Hooks

To use React Hooks in your components, follow these steps:

1. Import the necessary hooks from React:
   ```typescript
   import { useState, useEffect } from 'react';import React, { useState, useEffect } from 'react';
   
   const ExampleComponent: React.FC = () => {
     const [count, setCount] = useState(0); //THIS IS A HOOK THE VALUE CHANGES WITH USESTATE
   
     useEffect(() => {
       document.title = `You clicked ${count} times`;
   
       return () => {
         document.title = 'React App';
       };
     }, [count]);
   
     return (
       <div>
         <p>You clicked {count} times</p>
         <button onClick={() => setCount(count + 1)}>Click me</button>
       </div>
     );
   };
   
   export default ExampleComponent;

## Setup styles with BEM pattern using SASS

To set up styles using the BEM (Block Element Modifier) pattern with SASS, follow these steps:

1. Create a `styles` directory in your `src` folder.
2. Inside the `styles` directory, create a `main.scss` file.
3. Import your component-specific SASS files into `main.scss`.

Example directory structure:Example `main.scss`:
```scss
@import 'button';
@import 'header';

.button {
  &__element {
    // styles for element
  }
  &--modifier {
    // styles for modifier
  }
}
```

## Setup service to API with Axios

To set up a service to interact with an API using Axios, follow these steps:

1. Install Axios if you haven't already:
```sh
npm install axios
```

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getExampleData = async () => {
  try {
    const response = await api.get('/example-endpoint');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
```

## Example Component with API call

```typescript
// Add more API methods as neededimport React, { useEffect, useState } from 'react';
import { getExampleData } from './services/apiService';

const ExampleComponent: React.FC = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getExampleData();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
    </div>
  );
};

export default ExampleComponent;
```