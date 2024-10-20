<template>
  <nav aria-label="Page navigation example" class="mt-3">
    <ul class="pagination">
      <li class="page-item">
        <button 
          type="button" 
          class="page-link"
          @click="onClickFirstPage"
          :disabled="isInFirstPage"
          v-bind:class="{ 'disabled': isInFirstPage}"
          aria-label="Go to first page"
        >
          First
        </button>
      </li>

      <li class="page-item">
        <button 
          type="button "  
          class="page-link"
          @click="onClickPreviousPage"
          :disabled="isInFirstPage"
          v-bind:class="{ 'disabled': isInFirstPage}"
          aria-label="Go to previous page"
        >
          Previous
        </button>
      </li>

      <li v-for="page in pages" :key="page.name" class="page-item" :class="{ active: isPageActive(page.name) }">
        <button 
          type="button" 
          class="page-link"
          @click="onClickPage(page.name)"
          :disabled="page.isDisabled"
          :class="{ active: isPageActive(page.name) }"
          v-bind:class="{ 'disabled': page.isDisabled}"
          :aria-label="`Go to page number ${page.name}`"
        >
          {{ page.name }}
        </button>
      </li>

      <li class="page-item">
        <button 
          class="page-link"
          type="button" 
          @click="onClickNextPage"
          :disabled="isInLastPage"
          v-bind:class="{ 'disabled': isInLastPage}"
          aria-label="Go to next page"
        >
          Next
        </button>
      </li>

      <li class="page-item">
        <button 
          class="page-link"
          type="button" 
          @click="onClickLastPage"
          :disabled="isInLastPage"
          v-bind:class="{ 'disabled': isInLastPage}"
          aria-label="Go to last page"
        >
          Last
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3
    },
    totalPages: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
  },
  computed: {
    startPage() {
      if (this.currentPage <= Math.ceil(this.maxVisibleButtons / 2)) {
        return 1;
      } else if (this.currentPage > this.totalPages - Math.floor(this.maxVisibleButtons / 2)) {
        return this.totalPages - this.maxVisibleButtons + 1;
      } else {
        return this.currentPage - Math.floor(this.maxVisibleButtons / 2);
      }
    },
    endPage() {
      return Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
    },
    pages() {
      const range = [];

      for (let i = this.startPage; i <= this.endPage; i++) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage 
        });
      }

      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
    onClickFirstPage() {
      this.$emit('pagechanged', 1);
    },
    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit('pagechanged', page);
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages);
    },
    isPageActive(page) {
      return this.currentPage === page;
    },
  }
}
</script>
