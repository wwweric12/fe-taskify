import { HistoryCard } from '../components/Card/HistoryCard.js';
import { HistoryModal } from '../components/Modal/HistoryModal.js';

export function showHistoryList({element,historyList}){
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    const fragment = document.createDocumentFragment();
    historyList.map((item)=>{
        fragment.appendChild(HistoryCard({
            username:item.username ,
            title: item.title,
            column: item.column,
            afterColumn: item.afterColumn,
            timeStamp:item.timeStamp,
            type: item.type,
            action: item.action,
        }))
        
    })
    element.appendChild(fragment);
}

export function historyToggle({app,historyModalState,historyData}){
    if(!historyModalState.state){
        app.appendChild(HistoryModal({title:historyModalState.title,content:historyModalState.content,historyData}))
        historyModalState.state=true;
    }
    else{
        historyModalState = historyCloseModal({app,historyModalState});
    }
    return historyModalState; 
    
}

export function historyCloseModal({app,historyModalState}){
    const historModal=app.querySelector('.history-modal-container');
    historModal.remove()
    historyModalState.state=false;
    return historyModalState; 
}
