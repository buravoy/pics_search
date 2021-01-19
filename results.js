Vue.component('results', {
    template: `
                <div class="row px-2">
                    <div v-for="photo in photos" class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 p-2">
                        <div  class="shadow rounded overflow-hidden h-100 d-flex flex-column justify-content-between">
                            <div class="h-100 d-flex align-items-center justify-content-center position-relative img-hover">
                                <div class="bg-img">
                                    <img :src="photo.urls.small" class="">
                                </div>
                                <a :href="photo.urls.full" target="_blank">
                                    <img :src="photo.urls.small" class="img-fluid img-hover-target" :alt="photo.alt_description" :title="photo.alt_description">
                                </a>
                            </div>
                            <div class="d-flex align-items-center py-1 justify-content-center bg-white author">
                                <img :src="photo.user.profile_image.small" alt="" class="circle mr-2">
                                <a v-if="photo.user.portfolio_url" :href="photo.user.portfolio_url" target="_blank">{{ photo.user.name }}</a>
                                <span v-else>{{ photo.user.name }}</span>
                            </div>
                        </div>
                    </div>
                </div>
  `,

    props: {
        photos: {
            type: Array,
            default: []
        }
    }
});
