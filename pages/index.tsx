import type { NextPage } from 'next'

import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

import { useState } from 'react';
import { useEffect } from 'react';
import { supabase } from './api/api';
import ToDo from './ToDo';

const Home: NextPage = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [displayDialog, setDisplayDialog] = useState<any>(false);
  const [todoTitle, setTodoTitle] = useState<any>("");
  const [todoDescription, setTodoDescription] = useState<any>("");

  useEffect(() => {
    fetchTodos()
  }, []);

  const fetchTodos = async () => {
    try {
      const {data, error} = await supabase
      .from("todos")
      .select("*")
      .order("id", { ascending: true });
      if (error) console.log("error", error);
      else setTodos(data ?? []);
    } catch(e) {
      console.error(e);
    }
  }

  const deleteTodo = async (id: any) => {
    try {
      await supabase.from("todos").delete().eq("id", id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch(e) {
      console.error(e);
    }
  }

  const addTodo = async () => {
    try {
      await supabase.from("todos").insert({title: todoTitle, description: todoDescription}).single();
      setDisplayDialog(false);
      fetchTodos();
    } catch (e) {
      console.error(e);
    }
  }

  const leftContents = (
    <>
      <h2>Your ToDo List</h2>
    </>
  );

  const rightContents = (
    <>
      <div className="add-button">
        <Button icon="pi pi-plus" className="right-button" onClick={() => setDisplayDialog(true)}/>
      </div>
    </>
  );
  
  return (
    <>
      <div>
        <Toolbar left={leftContents} right={rightContents} />
        {
          todos.map((todo) => <ToDo key={todo.id} todo={todo} onDelete={() => deleteTodo(todo.id)} />)
        }
      </div>
      <Dialog header="Create Todo" visible={displayDialog} position={"bottom"} onHide={() => setDisplayDialog(false)} draggable={false} resizable={false} style={{"width": "100%"}}>
        <div className="p-fluid" >
          <div className="p-field">
            <label htmlFor="todo-title">Title</label>
            <InputText id="todo-title" onChange={(e) => setTodoTitle(e.target.value)}/>
          </div>
          <div className="p-field">
            <label htmlFor="todo-description">Description</label>
            <InputText id="todo-description" onChange={(e) => setTodoDescription(e.target.value)}/>
          </div>
          <Button label="Add" className="p-button-success" onClick={() => {addTodo()}} />
        </div>
      </Dialog>
    </>
  );
}

export default Home
