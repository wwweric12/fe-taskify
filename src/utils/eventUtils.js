import { addCard, addCardToggle, createOrder, deleteCard, deleteCardToggle, editCard, editCardToggle, latestOrder } from './cardUtils.js';
import { historyCloseModal, historyToggle } from './historyUtils.js';
import { loadLocalStorage } from './mockup.js';




export function handleEventListener(e) {
    const app =document.querySelector('#app')
    const target = e.target;
    // 각각의 Column
    const parentColumn = target.closest('.column-box');
    const cardColumn = parentColumn?.querySelector('.column-card-box');

    // 각 컬럼의 이름
    const columnName = parentColumn?.id || ' ';

    // 컬럼의 header
    const headerColumn =parentColumn?.querySelector('.column-header')
    
    // card 
    const columnCard= target.closest('.column-card-container');
    // 카드 추가 card
    const addForm = parentColumn?.querySelector("#add-card");
    // 카드 추가 title
    const titleInput = parentColumn?.querySelector("#card-title");
    // 카드 추가 content
    const contentInput = parentColumn?.querySelector("#card-content");
    // 카드 수정 card
    const editForm =parentColumn?.querySelector("#edit-card")
    // chip 
    const  chipContainer =target.closest('.chip-container')


    const tasksData = loadLocalStorage({type:"tasks"});
    const historyData =loadLocalStorage({type:"history"});
    
    if (target.closest('#history-toggle')) {
        historyModalState = historyToggle({app,historyModalState,historyData})
        return;
    }
    else if (target.closest('#history-close-modal')) {
        historyModalState =historyCloseModal({app,historyModalState})
        return;
    }

    else if (target.closest('#history-delete-toggle')) {
        return;   
    }

    else if (target.closest('#history-delete')) {
        return;   
    }

    else if (target.closest('#card-add-toggle')) {    
        addCardToggle({addForm,cardColumn});
        return;
    }

    else if (target.closest('#card-close-toggle')) {
        return;
    }

    else if (target.closest('#card-add')) {
        addCard({titleInput,contentInput,addForm,columnName,tasksData});
        return;
    }
    else if (target.closest('#card-delete-toggle')) {
        deleteCardToggle({columnCard});
        return;
    }

    else if (target.closest('#card-delete')) {
        deleteCard({columnCard,columnName,tasksData});
        return;
    }

    else if (target.closest('#card-edit-toggle')) {
        editCardToggle({editForm,columnCard});
        return;
    }

    else if (target.closest('#card-edit')) {
        editCard({editForm,columnName,tasksData});
        return;
    }
    else if (target.closest('#createOrder')) {
        latestOrder({chipContainer,tasksData});
        return;
    }
    else if (target.closest('#latestOrder')) {
        createOrder({chipContainer,tasksData});
        return;
    }
}


let historyModalState= {
    title: "사용자 활동기록",
    content: "사용자 활동 기록이 없습니다.",
    state: false
}
