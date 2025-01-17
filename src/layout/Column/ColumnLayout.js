import { ColumnHeader } from '../../components/Column/ColumnHeader.js';
import { handleColumn, handleMoveCard, showCardList } from '../../utils/cardUtils.js';
import { loadCss } from '../../utils/loadcss.js'

export function ColumnLayout({todoModel,progressModel,doneModel}) {
    const columnLayout = document.createElement('div')
    columnLayout.className = "column-layout"

   // 각각의 Column에 들어갈 컴포넌트 생성
   const todoColumn = ColumnHeader({
    title: "해야할 일",
    badgeContent: todoModel.tasks.length,
    addId: "card-add-toggle",
    closeId: "card-close-toggle",
    model:todoModel
});

const inProgressColumn = ColumnHeader({
    title: "하고 있는 일",
    badgeContent: progressModel.tasks.length,
    addId: "card-add-toggle",
    closeId: "card-close-toggle",
    model:progressModel
});

const doneColumn = ColumnHeader({
    title: "완료한 일",
    badgeContent: doneModel.tasks.length,
     addId: "card-add-toggle",
    closeId: "card-close-toggle",
    model:doneModel
});

    columnLayout.innerHTML=`
        <div class="column-container">
            <div class="column-box" id="todo-column">
                <ol class="column-card-box"></ol>
            </div>
            <div class="column-box" id="in-progress-column">
                <ol class="column-card-box"></ol>
            </div>
            <div class="column-box" id="done-column">
                <ol class="column-card-box"></ol>
            </div>            
        </div>
    `;
    
     // 각 column-box에 컴포넌트를 추가
    const columnBoxes = columnLayout.querySelectorAll('.column-box');
    columnBoxes[0].insertAdjacentElement("afterbegin",todoColumn);
    columnBoxes[1].insertAdjacentElement("afterbegin",inProgressColumn);
    columnBoxes[2].insertAdjacentElement("afterbegin",doneColumn);




    const columnCardBoxes=columnLayout.querySelectorAll('.column-card-box');

    handleShowCardModel({columnBox:columnCardBoxes[0],model:todoModel});
    handleShowCardModel({columnBox:columnCardBoxes[1],model:progressModel});
    handleShowCardModel({columnBox:columnCardBoxes[2],model:doneModel});
    
    showCardList(columnCardBoxes[0],todoModel.tasks);
    showCardList(columnCardBoxes[1],progressModel.tasks);
    showCardList(columnCardBoxes[2],doneModel.tasks);


    loadCss('../src/layout/Column/Column.css')

    columnCardBoxes.forEach((column)=>column.addEventListener("dragover", (e) => {
        handleMoveCard({column,e});
    }));

    columnCardBoxes.forEach((column)=>column.addEventListener("dragend", (e) => {
        const afterColumn = e.target.closest('.column-box')
        const afterCardArray =Array.from(afterColumn.querySelectorAll('.column-card-container'));
    
        const tasksData=JSON.parse(localStorage.getItem('tasks'))
        
        let prevColumn =''
        let task =null 
        Object.entries(tasksData).forEach(([key, taskArray]) => {
            taskArray.forEach((item) => {
              if (item.id === Number(e.target.id)) {
                task=item
                prevColumn = getColumnId(key);
              }
            });
          });
        

        

        


        const [afterModel, afterColumnSort]=handleColumn(afterColumn.id);
        const [prevModel, prevColumnSort]=handleColumn(prevColumn);

        prevModel.deleteTask(task.id);
    
        const insertIndex = afterCardArray.findIndex((item) => Number(item.id) === task.id);
        if (insertIndex === -1) {    
            afterModel.tasks.push(task);
        } else {
            afterModel.tasks.splice(insertIndex, 0, task);
        }
        const updatedTasks = {
            ...tasksData,
            [prevColumnSort]: prevModel.tasks,
            [afterColumnSort]: afterModel.tasks,
          };
          localStorage.setItem("tasks", JSON.stringify(updatedTasks));
          
          afterModel.notify(afterModel.tasks);

    }));

    return columnLayout 
}



export function handleShowCardModel({columnBox,model}){
    model.subscribe((task)=>{

        showCardList(columnBox,task);
    }   
    )
}


export function getColumnId(key) {
  switch (key) {
    case "todos":
      return "todo-column";
    case "progress":
      return "in-progress-column";
    case "done":
      return "done-column";
    default:
      return null;
  }
}