new Vue({
    el: '#app',
    data: {
        photos: [],
        params: {
            query: '',
            page: 1,
            per_page: '20'
        },
        total: 0,
        apiData: {
            clientId: 'HrSY0RwaTj1v150hN9eW61KC66echBUwOHy_LPvjoVU',
            path: 'https://api.unsplash.com/'
        }
    },

    computed: {
        currentUrl() {
            if (!this.params.query) return 'photos';
            return 'search/photos';
        },
    },

    methods: {
        getRequest() {
            if (this.params.page === 1) delete this.params.page

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
            if (!this.params.page) this.params.page = 1;
            this.params.page++
            this.fetchPhotos();
        },

        pageChange(page) {
            this.params.page = page;
            this.photos = [];
            this.fetchPhotos();
        },

        searchPhotos() {
            this.photos = [];
            this.fetchPhotos();
        },

        fetchPhotos() {
            console.log(this.getRequest())
            fetch(this.getRequest(), {
                headers: {Authorization: `Client-ID ${this.apiData.clientId}`}
            })
                .then((response) => {
                    console.log(response.headers.get('X-Total'))
                    this.total = +response.headers.get('X-Total')
                    return response.json()
                })
                .then((data) => {
                    console.log(data);

                    if (data.constructor.name === 'Object') {
                        this.photos = this.photos.concat(data.results);
                    } else {
                        this.photos = this.photos.concat(data);
                    }
                });
        }
    },

    created() {
        this.fetchPhotos();
    }
});
