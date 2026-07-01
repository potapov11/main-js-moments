function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React" },
    { id: 2, text: "Pass interview" },
  ]);

  const addTodo = () => {
    const newTodo = { id: Date.now(), text: "New task" };
    //Мутация так нельзя
    // todos.push(newTodo);
    // setTodos(todos);

    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleTodo = (id) => {
    // const todo = todos.find((t) => t.id === id);
    //Тоже мутация
    // todo.done = !todo.done;
    // setTodos(todos);

    const mappedTodos = todos.map((todo, index) => {
      if (id === todo.id) {
        return {
          ...todo,
          done: !todo.done,
        };
      }

      return todo;
    });

    setTodos(mappedTodos);
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} onClick={() => toggleTodo(todo.id)}>
          {todo.text}
        </li>
      ))}
      <button onClick={addTodo}>Add</button>
    </ul>
  );
}
