new Vue({
  el: '#app',
  data: {
    colsnum: 'col-2',
    photos: [],
    params: {
      query: '',
      page: 1,
      per_page: '20'
    },
    total:100,
    apiData: {
      clientId: 'HrSY0RwaTj1v150hN9eW61KC66echBUwOHy_LPvjoVU',
      path: 'https://api.unsplash.com/'
    }
  },

  
  computed: {
    currentUrl() {
      if (!this.params.query) return 'photos';
      return 'search/photos';
    }
  },

  
  methods: {
    getRequest() {
      const query = Object.entries(this.params)
        .filter(([, value]) => value)
        .map(entry => entry.join('='))
        .join('&');

      const request = [this.apiData.path + this.currentUrl, query]
        .filter(Boolean)
        .join('?');

      return request;
    },

    addPhotos() {
      this.params.page++;
      this.fetchPhotos();
    },

    pageChange(page){
      console.log(page)
      this.params.page = page;
      this.photos = [];
      this.fetchPhotos();
    },

    searchPhotos() {
      this.photos = [];
      this.fetchPhotos();
    },

    fetchPhotos() {
      fetch(this.getRequest(), {
        headers: { Authorization: `Client-ID ${this.apiData.clientId}` }
      })
        .then(response => response.json())
        .then((data) => {

          console.log(data);

          if (data.constructor.name === 'Object') {
            this.photos = this.photos.concat(data.results);
            this.total = data.total;
            console.log(this.photos);
          } else {
            this.photos = this.photos.concat(data);
            console.log(this.photos);
          }
        });
    }
  },

  created() {
    this.fetchPhotos();
  }
});
