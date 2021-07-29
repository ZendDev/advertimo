<template>
<div class="panel-page">
  <div class="users-page-panel">
    <ul>
      <!-- <li>
        <vx-tooltip color="primary" text="Tags" position="bottom">
          <vs-button :disabled="count == 0" size="small" icon-pack="feather" icon="icon-tag" />
        </vx-tooltip>      
      </li>
      <li>
        <vx-tooltip color="primary" text="Share" position="bottom">
          <vs-button  @click="share = true" :disabled="count == 0" size="small" icon-pack="feather" icon="icon-share-2" />
        </vx-tooltip>
      </li> -->
      <li>
        <vx-tooltip color="primary" text="Selected accounts" position="bottom">
          <span class="countcheckusers"><vs-icon size="small" icon-pack="feather" icon="icon-book" color="rgb(115,103,240)" /> {{ count }}</span>
        </vx-tooltip>
      </li>
    </ul>
    <ul>
      <li>
        <vs-button size="small" icon-pack="feather" icon="icon-plus">ADD VOCABULARY</vs-button>
      </li>
      <!-- <li>
        <vs-button size="small" icon-pack="feather" icon="icon-filter">FILTERS</vs-button>
      </li> -->
      <!-- <li>
        <vx-tooltip color="primary" text="Columns" position="bottom">
          <vs-button size="small" icon-pack="feather" icon="icon-columns" />
        </vx-tooltip>
      </li> -->
      <!-- <li>
        <vs-select autocomplete class="curr-select" v-model="select2">
          <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in options2" />
        </vs-select>
      </li> -->
      <!-- <li class="date">
        <flat-pickr class="date-icons" :config="configdateTimePicker" v-model="date" placeholder="Choose date" />
      </li> -->
      <li>
        <vs-input icon-pack="feather" icon="icon-search" placeholder="Search" v-model="search" class="is-label-placeholder" />
      </li>
    </ul>
  </div>
  <vs-table multiple v-model="selected" pagination max-items="10" :data="$store.state.accounts">

    <template slot="thead">
      <vs-th sort-key="name">Name</vs-th>  
      <vs-th sort-key="spend">Settings</vs-th> 
    </template>

    <template slot-scope="{data}">
      <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

        <vs-td :data="data[indextr].name">
          <div class="flex align-center account-name accn">
            <div class="name-user"> {{ data[indextr].name }}</div>
          </div>
        </vs-td>

        <vs-td :data="data[indextr].spend">
          0
        </vs-td>

      </vs-tr>
    </template>
  </vs-table>
</div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
export default {
  data() {
    return {
      search: '',
      selected: [],
      selectedId: [],
      count: 0,
      'tableList': [
        'vs-th: Component',
        'vs-tr: Component',
        'vs-td: Component',
        'thread: Slot',
        'tbody: Slot',
        'header: Slot'
      ],
      submenu: [

      ],
    }
  },
  mounted(){
    this.$store.commit('SUBMENU_CHANGE', this.submenu)
  }, 
  methods: {
    task(idtype, title, data){
      this.$store.dispatch('acc/task', {
          selectedId: this.selectedId,
          idtype, 
          title,
          data
      })
      this.selected = []     
    },
  },
  components: {
      flatPickr
  },
  watch: {
    selected: function (val) {
      this.count = val.length
      this.selectedId = this.selected.map(account => account.id)
    }
  }
}
</script>
