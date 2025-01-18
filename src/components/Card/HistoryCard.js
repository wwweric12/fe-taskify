import { loadCss } from '../../utils/loadcss.js';

export function HistoryCard({username,title,column,afterColumn,timeStamp,type,action}){
    const historyCard = document.createElement('div');
    historyCard.className = 'historyCard-container';
    const tempContainer = document.createElement('div');

    if(type==='add-card'){
        tempContainer.innerHTML =`
                <span class='strong-content'>${title}</span>
                을(를) <span class='strong-content'>${column}</span>
                에서 <span>${action}</span>하였습니다.
        `
    }else if (type === 'move-card'){
        tempContainer.innerHTML =`
        <span class='strong-content'>${title}</span>
        을(를) <span class='strong-content'>${column}</span>
        에서 <span class='strong-content'>${afterColumn}</span>
        으로 <span class='strong-content'>${action}</span>하였습니다.
`

    }
    else if (type === 'edit-card' || type === 'delete-card'){
        tempContainer.innerHTML =`
        <span class='strong-content'>${title}</span> 을(를) ${action}</span>하였습니다.`
    }  


    historyCard.innerHTML =`
        <div class='profile-img'></div>
        <div class='history-content-box'>
            <div class='history-username'>${username}</div>
            <div class='history-content'></div>
            <div class='history-timestamp'>${timeStamp}</div>
        </div>
        </div>
    `
    const historyContent = historyCard.querySelector('.history-content')
    historyContent.appendChild(tempContainer);


    loadCss('../src/components/Card/historyCard.css')
    return historyCard;
}


