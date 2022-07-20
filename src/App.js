// Importing React, hooks, components, and styles
//=======================================================================
import React, { useEffect, useState, createContext } from 'react';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import './App.css';
//=======================================================================

//* Imports for basic Firebase usage: initializeApp, getFirestore, etc.
//*=======================================================================
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  addDoc,
  getDoc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';
//*=======================================================================

//* Once you create a project online in the Firebase console, you can c&p this config object and pass it to the initializeApp function to connect your code.
//! IF YOU ARE USING YOUR OWN FIREBASE ACCOUNT, CHANGE THIS CONFIG
//*=======================================================================
const firebaseConfig = {
  apiKey: 'AIzaSyBnRaQg2HwJPF7iITq4ZxxzVtR8ofaZdSI',
  authDomain: 'todo-test-c1f07.firebaseapp.com',
  projectId: 'todo-test-c1f07',
  storageBucket: 'todo-test-c1f07.appspot.com',
  messagingSenderId: '234230973429',
  appId: '1:234230973429:web:9fd0598ed08eafa91f96bc',
};

initializeApp(firebaseConfig);
//*=======================================================================

//* Use getFirestore and collection to setup/reference a collection of docs in the Firestore database.
const db = getFirestore();
const todosRef = collection(db, 'todos');

export const DeleteContext = createContext();

function App() {
  const [todos, setTodos] = useState([]);

  //* Get data from database
  const renderTodos = () => {
    //* getDocs takes a collection and returns a promise...
    getDocs(todosRef).then((snapshot) => {
      //*...from which individual docs can be extracted
      const todos = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      // This is so React will render the new data
      setTodos(todos);
    });
  };

  // Format form submission event into todo object
  const createTodo = (e) => {
    return {
      title: e.target.title.value,
      content: e.target.content.value,
    };
  };

  // Clear form inputs and focus first input
  const formReset = (form) => {
    form.reset();
    form.title.focus();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    //* Add a doc to a collection by passing the collection reference and the doc
    addDoc(todosRef, createTodo(e))
      //* once the doc has been added, we get the data again (refresh)
      .then(renderTodos)
      .then(() => formReset(e.target));
  };

  //* To delete from a collection...
  const deleteTodo = (id) => {
    //* ...first get a reference to the specific doc with database, collection, and id...
    const todo = doc(db, 'todos', id);
    //* ...then pass that reference to deleteDoc and get the data again (refresh)
    deleteDoc(todo).then(renderTodos);
  };

  //* You can listen for changes to a collection in database rather than going step by step (like above)
  // onSnapshot(todosRef, (snapshot) => {
  //   const todos = snapshot.docs.map((doc) => {
  //     return { ...doc.data(), id: doc.id };
  //   });
  //   setTodos(todos);
  // });

  useEffect(() => {
    renderTodos();
  }, []);

  return (
    <div className='App'>
      <h1>Todos</h1>
      <AddTodoForm handleFormSubmit={handleFormSubmit} />
      <DeleteContext.Provider value={deleteTodo}>
        <TodoList todos={todos} />
      </DeleteContext.Provider>
    </div>
  );
}

export default App;
