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
        <vs-button @click="popupVocabulary = true" size="small" icon-pack="feather" icon="icon-plus">ADD VOCABULARY</vs-button>
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
  <vs-table multiple v-model="selected" pagination max-items="10" :data="$store.state.vocabularies">

    <template slot="thead">
      <vs-th sort-key="name">Name</vs-th> 
      <vs-th sort-key="user">User</vs-th> 
      <vs-th sort-key="settings">Settings</vs-th> 
    </template>

    <template slot-scope="{data}">
      <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
        <vs-td :data="data[indextr].name">
            {{ data[indextr].name }}
        </vs-td>

        <vs-td :data="data[indextr].user">
          {{ data[indextr].user.username }}
        </vs-td>

        <vs-td :data="data[indextr].settings">
            <div class="flex">
              <vs-button class="mr-2" @click="editVocabulary(data[indextr])" size="small" icon-pack="feather" icon="icon-edit" />
              <vs-button @click="removeVocabulary(data[indextr].id)" size="small" icon-pack="feather" icon="icon-trash-2" />
            </div>
        </vs-td>
      </vs-tr>
    </template>
  </vs-table>
  <vs-popup title="Добавить словарь" :active.sync="popupVocabulary">
    <div class="centerx">
      <div class="vx-row">
        <div class="vx-col w-full md:full mb-base">
          <div class="centerx mt-base">
            <vs-input class="inputx w-full" placeholder="Название словаря" v-model="vocabulary.name"/>
          </div>
          <div class="centerx mt-base">
            <vs-textarea label="Access token" v-model="vocabulary.area" />
          </div>
        </div>
        <div class="modal-btn">
          <vs-button @click="addVocabulary" color="success">Add</vs-button>
        </div>
      </div>
    </div>
  </vs-popup>
  <vs-popup title="Редактировать словарь" :active.sync="popupVocabularyedit">
    <div class="centerx">
      <div class="vx-row">
        <div class="vx-col w-full md:full mb-base">
          <div class="centerx mt-base">
            <vs-input class="inputx w-full" placeholder="Название словаря" v-model="vocabulary.name"/>
          </div>
          <div class="centerx mt-base">
            <vs-textarea label="Access token" v-model="vocabulary.area" />
          </div>
        </div>
        <div class="modal-btn">
          <vs-button @click="updateVocabulary" color="success">Edit</vs-button>
        </div>
      </div>
    </div>
  </vs-popup>
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
      popupVocabulary: false,
      popupVocabularyedit: false,
      vocedit: [],
      vocabulary:{
        id: null,
        area:'',
        name: '',
        wordList: []
      },
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
    this.$store.dispatch('vocabulary')
  }, 
  methods: {
    addVocabulary(){
      let arr = this.vocabulary.area.split('\n');
      this.vocabulary.wordList = arr
      this.$store.dispatch('addVocabulary', this.vocabulary)
      this.popupVocabulary = false
    },
    editVocabulary(data){
      this.vocabulary.name = data.name
      this.vocabulary.area = data.wordList.join('\n');
      this.vocabulary.id = data.id
      this.popupVocabularyedit = true
    },
    updateVocabulary(){
      let arr = this.vocabulary.area.split('\n');
      this.vocabulary.wordList = arr
      this.$store.dispatch('updateVocabulary', this.vocabulary)
      this.popupVocabularyedit = false     
    },
    removeVocabulary(id){
      this.$store.dispatch('removeVocabulary', id)
    }
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
