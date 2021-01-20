Vue.component('pagination', {
  template: `
    <div class="row px-2 d-flex justify-content-center mt-3">
     
        <button v-if="hasPrev()" @click.prevent="changePage(prevPage)" class="btn btn-sm btn-outline-primary mr-1"><</button>
        
        <ul class="d-inline-flex list-unstyled m-0">
          <li v-if="hasFirst()"><button @click.prevent="changePage(1)" class="btn btn-sm btn-outline-primary mr-1">1</button></li>
          <li v-if="hasFirst()">...</li>
          <li v-for="page in pages"><button @click.prevent="changePage(page)" :class="pageClass(page)" class="btn btn-sm mx-1">{{ page }}</button></li>
          <li v-if="hasLast()">...</li>
          <li v-if="hasLast()"><button href="#" @click.prevent="changePage(totalPages)" class="btn btn-sm btn-outline-primary ml-1">{{ totalPages }}</button></li>
        </ul>

        <button v-if="hasNext()" @click.prevent="changePage(nextPage)" class="btn btn-sm btn-outline-primary ml-1">></button>

    </div>
  `,
  props: {
    current: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    perPage: {
      type: String,
      default: '10'
    },
    pageRange: {
      type: Number,
      default: 2
    },
  },

  computed: {
    pages: function() {
      const pages = []

      for(let i = this.rangeStart; i <= this.rangeEnd; i++) {
        pages.push(i)
      }

      return pages
    },

    rangeStart: function() {
      const start = this.current - this.pageRange

      return (start > 0) ? start : 1
    },

    rangeEnd: function() {
      const end = this.current + this.pageRange

      return (end < this.totalPages) ? end : this.totalPages
    },

    totalPages: function() {
      return Math.ceil(this.total/this.perPage)
    },

    nextPage: function() {
      return this.current + 1
    },

    prevPage: function() {
      return this.current - 1
    }
  },

  methods: {
    hasFirst: function() {
      return this.rangeStart !== 1
    },

    hasLast: function() {
      return this.rangeEnd < this.totalPages
    },

    hasPrev: function() {
      return this.current > 1
    },

    hasNext: function() {
      return this.current < this.totalPages
    },

    changePage(page) {
      this.$emit('page-changed', page)
    },

    pageClass(page) {
      console.log(page)
      if (page === this.current) return 'btn-primary';
      return 'btn-outline-primary';
    }

  }
})
