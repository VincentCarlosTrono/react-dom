import axios from "axios";
import React, { useState, useEffect } from "react";
import { Route, Switch, Link } from "react-router-dom";
import Contact from "./Contact";
import Home from "./Home";
import About from "./About";

export default function Counter() {
  let [count, setCount] = useState(0);
  const [todos, setTodos] = useState();
  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => setCount(count - 1);
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => {
      const responseTodos = res.data;
      setTodos(responseTodos);
    });
  }, []);
  console.log(todos);

  return (
    <div>
      <button>
        <Link to="/about">About us</Link>
      </button>
      <button>
        <Link to="/contact">Contact us</Link>
      </button>
      <button>
        <Link to="/">Home</Link>
      </button>
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/" component={Home} />
      </Switch>
      <h1>The count is: {count} </h1>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
      {todos &&
        todos.map((todo) => {
          const { userid, title, id } = todo;
          return (
            <div key={id}>
              <h5>{title}</h5>
              <h6> Assigned to user: {userid} </h6>
            </div>
          );
        })}
    </div>
  );
}
