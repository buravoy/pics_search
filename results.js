Vue.component('results', {
  template: `
    <div class="row">
    
    
    
      <div class="col-2" v-for="photo in photos">
        
        
        
        <div class="d-flex ">
          <img :src="photo.urls.small" class="img-fluid" alt="">
        </div>
        <div class="">
          <img :src="photo.user.profile_image.small" alt="" class="">
          <div class="">
            <a :href="photo.user.portfolio_url" target="_blank">{{ photo.user.name }}</a>
          </div>
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
  },

  methods: {
    colset(){
      return '1';
    }
  }
});
