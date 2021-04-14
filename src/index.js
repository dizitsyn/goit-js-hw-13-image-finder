import './styles.css';
import markup from './templates/template.hbs';
import Api from './js/apiService.js';
import debounce from 'lodash.debounce'
import { Promise } from 'core-js';

const refs = {
    searchForm: document.querySelector('#search-form'),
    photoList: document.querySelector('.gallery'),
    btn: document.querySelector('button'),
}

const api = new Api();

refs.searchForm.addEventListener('input', debounce(onSerch, 500));
refs.btn.addEventListener('click', loadMore);



function onSerch(e) {
    api.input = e.target.value;
    if (api.input === '') {
        api.resetPage();
        return clean();
        
        }
    showBtn();
   
    api.fetchPhotos().then(renderPhoto);    
}

function loadMore() {
    api.increasePage()
    api.fetchPhotos().then(addPhoto);
    
   
    }

function renderPhoto(photos) {
    refs.photoList.innerHTML= markup(photos);
}

function addPhoto(photos) {
     refs.photoList.insertAdjacentHTML('beforeend', markup(photos));
    scroll();
}


function showBtn() {
    refs.btn.classList.remove('hide');
    refs.btn.classList.add('show');
    

}
function clean() {
    refs.btn.classList.add('hide');
    refs.btn.classList.remove('show');
    refs.photoList.innerHTML= '';
   
}

async function scroll()  {
  try {
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }, 500);
  } catch (error) {
    console.log(error);
  }
}
    
