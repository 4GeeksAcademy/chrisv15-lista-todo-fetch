import React, { useState, useEffect } from "react";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(
        "https://assets.breatheco.de/apis/fake/todos/user/chrisv15"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      const todosData = await response.json();
      setTodos(todosData);
    } catch (error) {
      await initializeTodos();
    }
  };

  const initializeTodos = async () => {
    try {
      const response = await fetch(
        "https://assets.breatheco.de/apis/fake/todos/user/chrisv15",
        {
          method: "POST",
          body: JSON.stringify([]),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to initialize todo list");
      }
      setTodos([]);
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async () => {
    if (!inputValue) return;
    const newTodo = { label: inputValue, done: false };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    setInputValue("");

    try {
      const response = await fetch(
        "https://assets.breatheco.de/apis/fake/todos/user/chrisv15",
        {
          method: "PUT",
          body: JSON.stringify(updatedTodos),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update todo list");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (todoIndex) => {
    const updatedTodos = todos.filter((_, index) => index !== todoIndex);
    setTodos(updatedTodos);

    try {
      const response = await fetch(
        "https://assets.breatheco.de/apis/fake/todos/user/chrisv15",
        {
          method: "PUT",
          body: JSON.stringify(updatedTodos),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update todo list");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clearAllTodos = async () => {
    const updatedTodos = [];
    setTodos(updatedTodos);

    try {
      const response = await fetch(
        "https://assets.breatheco.de/apis/fake/todos/user/chrisv15",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete all todos");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container p-5">
      <h1 className="d-flex justify-content-center align-items-center">TODOs</h1>
      <div className="card bg-light">
        <input
          type="text"
          className="card"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              addTodo();
            }
          }}
          placeholder="What do you need to do? "
        ></input>
        <div>
          {todos.map((item, index) => {
            return (
              <div className="card text-grey" key={index}>
                <div>
                  {item.label}
                  <button
                    type="button"
                    className="btn btn-light float-end"
                    onClick={() => deleteTodo(index)}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {todos.length > 0 && (
          <button
            type="button"
            className="btn btn-light"
            onClick={clearAllTodos}
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
