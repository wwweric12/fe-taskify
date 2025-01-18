import { HistoryModel, TaskModel } from '../observer/observer.js';

export function loadLocalStorage({type,initialData}){
  let data = JSON.parse(localStorage.getItem(type));
  if(!data){
    localStorage.setItem(type,JSON.stringify(initialData));
    return initialData;
  }
  return data;
}



const taskData =loadLocalStorage({type:'tasks', initialData:{ 
  'todos': [],'progress': [],'done': []
}})

const historyData =loadLocalStorage({type:'history', initialData:[]})


export const todoModel = new TaskModel(taskData.todos);
export const progressModel = new TaskModel(taskData.progress);
export const doneModel = new TaskModel(taskData.done);

export const historyModel = new HistoryModel(historyData);






