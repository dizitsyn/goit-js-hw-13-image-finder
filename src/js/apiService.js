export default class api {
    constructor() {
        this.serchInput = '';
        this.page = 1;
        
    
    }
    fetchPhotos() {
        
        const options = {
        headers: {
        Authorization:'21141899-d12f3e8c226ff0cb5e95b71a3',
    },
        }
        const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.serchInput}&page=${this.page}&per_page=12&key=${options.headers.Authorization}`;
        
        return fetch(url)
            .then(r => r.json())
            .then(data => data.hits)
    }

    increasePage() {
        this.page +=1
    }

    resetPage() {
        this.page = 1;
    }
    
    get input() {
        return this.serchInput;
    }
    set input(newInput) {
        this.serchInput = newInput;
    }
};