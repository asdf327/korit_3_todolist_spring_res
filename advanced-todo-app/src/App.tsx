import './App.css'
import { useEffect, useState } from 'react';
import type { Todo } from './types/Todo';
import TodoForm from "./components/TodoForm"
import {TodoList} from "./components/TodoList"
import { getAllTodo, addTodoApi, toggleTodoApi, deleteTodoApi } from './services/todoService';
import axios from 'axios';
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';


function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authToken, setAuthToken] = useState<string | null>(() => localStorage.getItem('authToken'));

  const handleLoginSuccess = (credentalResponse: CredentialResponse) => {
    const idToken = credentalResponse.credential;
    if(idToken) {
      setAuthToken(idToken);
      localStorage.setItem('authToken', idToken);
    }
  }

  const handleLoginError = () => {
    console.log('로그인 실패');
    
  }

  const handleLogout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');
    setTodos([]);
  }

  useEffect(() => {
    const fetchTodosFromServer = async () : Promise<void> => {
      if(authToken) {
        try {
          setIsLoading(true);
          const serverTodos = await getAllTodo();
          setTodos(serverTodos);
        }
        catch (error) {
          console.log('서버에서 데이터를 가지고 오는 데 실패했습니다 : ', error);
            if(axios.isAxiosError(Error) && (error.rrsponse?.state === 401 || error.response?.this.state === 403)) {
              handleLogout();
            }
          } 
          finally {
            setIsLoading(false);
        }
      }
    };
    fetchTodosFromServer();
  }, [authToken]);

  const handleAddTodo = async (text: string): Promise<void> => {
    if(!authToken) return
    try {
      setIsLoading(true);
      const newTodo = await addTodoApi(text);
      setTodos(prevTodos => [...prevTodos, newTodo]);
      setIsLoading(false);
    } catch (error) {
      console.log('todo룰 추가하는 데 실패했습니다. : ', error);
      
    }
  }  

  const handToggleComplete = async (id: number): Promise<void> => {
    if(!authToken) return
    try {
      const todoToToggle = todos.find(todo => todo.id === id);
      if(!todoToToggle) return;
      const updatedTodo = await toggleTodoApi(id, todoToToggle.completed);
      setTodos(prevTodos =>
        prevTodos.map(todo => (todo.id === id ? updatedTodo:todo))
      );
    } catch (error) {
      console.log("완료 상태 변경에 실패했습니다. : ", error);
    }
  };

  const handleDeketeTodo = async (id: number) :  Promise<void> => {
    if(!authToken) return
    try {
      await deleteTodoApi(id);
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
    } catch (error) {
      console.log('todo를 지우는 데 실패했습니다. : ', error);
    }
  }

  return (
    <div>
      <header style={{display: 'fiex', justifyContent: 'space-between', alignItems: 'center', padding: 'lrem'}}>
        <h1>Todo List</h1>
        <div>
          {
            authToken ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <GoogleLogin onSuccess={handleLoginSuccess} onError= {handleLoginError} />
            )
          }
        </div>
      </header>
      <main>
        {
          authToken ? (
            isLoading ? (
              <p>목록을 불러오는 중...</p>
            ) : (
              <>
              <TodoForm onAddTodo={handleAddTodo}/>
              <TodoList todos={todos} onToggleComplete={handToggleComplete} onDeleteTodo={handleDeketeTodo}/>
              </>
            )
          ) : (
            <h2>로그인하여 Todo List를 작성해보시오</h2>
          )
        }
      </main>
    </div>
  )
}

export default App
