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
        <vx-tooltip color="primary" text="Check tokens" position="bottom">
          <vs-button :disabled="count == 0" size="small" icon-pack="feather" icon="icon-code" />
        </vx-tooltip>
      </li>
      <li>
        
        <vs-dropdown :disabled="count == 0" vs-trigger-click>
          
          <vs-button :disabled="count == 0" size="small" icon-pack="feather" icon="icon-more-vertical" />
    
          <vs-dropdown-menu>

            <vs-dropdown-item>Init personal ad account</vs-dropdown-item>
            <vs-dropdown-item @click="acceptRules">Accept rules</vs-dropdown-item>
            <vs-dropdown-item>Change proxy</vs-dropdown-item>
            <vs-dropdown-item divider>Create fan page</vs-dropdown-item>
            <!-- <vs-dropdown-item>Create BM</vs-dropdown-item>
            <vs-dropdown-item divider>Move accounts to another user</vs-dropdown-item> -->
            <!-- <vs-dropdown-item>Archive</vs-dropdown-item>
            <vs-dropdown-item>Unarchive</vs-dropdown-item> -->
            <vs-dropdown-item divider>Delete</vs-dropdown-item>
            <!-- <vs-dropdown-item>Data export</vs-dropdown-item> -->
          </vs-dropdown-menu>
        </vs-dropdown>
      </li>
      <li>
        <vx-tooltip color="primary" text="Selected accounts" position="bottom">
          <span class="countcheckusers"><vs-icon size="small" icon-pack="feather" icon="icon-book" color="rgb(115,103,240)" /> {{ count }}</span>
        </vx-tooltip>
      </li>
    </ul>
    <ul>
      <li>
        <vs-button @click="popupCreate = true; tabs = 0" size="small" icon-pack="feather" icon="icon-plus">ADD ACCOUNT</vs-button>
      </li>
      <!-- <li>
        <vs-button size="small" icon-pack="feather" icon="icon-filter">FILTERS</vs-button>
      </li> -->
      <!-- <li>
        <vx-tooltip color="primary" text="Columns" position="bottom">
          <vs-button size="small" icon-pack="feather" icon="icon-columns" />
        </vx-tooltip>
      </li> -->
      <li>
        <vx-tooltip color="primary" text="Update FB data" position="bottom">
          <vs-button size="small" icon-pack="feather" icon="icon-refresh-ccw" />
        </vx-tooltip>
      </li>
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
      <vs-th sort-key="name">Account</vs-th> 
      <vs-th sort-key="status">Status</vs-th>
      <vs-th sort-key="impressions">Impressions</vs-th> 
      <vs-th sort-key="linkCliks">Link Clicks</vs-th> 
      <vs-th sort-key="results">Results</vs-th> 
      <vs-th sort-key="spend">Spend</vs-th> 
    </template>

    <template slot-scope="{data}">
      <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

        <vs-td :data="data[indextr].name">
          <div class="flex align-center account-name accn">
            <vs-icon size="small" icon-pack="feather" icon="icon-book" color="rgb(115,103,240)" />
            <div class="name-user"> {{ data[indextr].name }}</div>
          </div>
          <div class="login-user">Owner: {{ data[indextr].user.username }}</div>
          <div class="login-user">
            Rules accepted: 
            <template v-if="data[indextr].activeTasks > 0">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="background: rgb(255, 255, 255); display: block; shape-rendering: auto;" width="20px" height="20px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                  <path d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="#7367f0" stroke="none">
                  <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 51;360 50 51"></animateTransform>
                  </path>
                </svg>
            </template>
            <template v-else>
              <vs-icon size="small" icon-pack="feather" :icon="data[indextr].rulesAccepted ? 'icon-check' : 'icon-x'" :color="data[indextr].rulesAccepted ? 'rgb(40,199,111)' : 'rgb(234,84,85)'" />
            </template>
          </div>
        </vs-td>

        <vs-td :data="data[indextr].status">  
            <div class="flex">
              <div class="success">success</div>
            </div>
        </vs-td>

        <vs-td :data="data[indextr].impressions">
          0
        </vs-td>

        <vs-td :data="data[indextr].linkCliks">
          0
        </vs-td>

        <vs-td :data="data[indextr].results">
          0
        </vs-td>

        <vs-td :data="data[indextr].spend">
          0
        </vs-td>

      </vs-tr>
    </template>
  </vs-table>
  <vs-popup fullscreen title="Добавить аккаунт" :active.sync="popupCreate">
    <vs-tabs v-model="tabs" alignment="center">
      <vs-tab label="Single Add">
        <div class="con-tab-ejemplo">
          <div class="vx-row">
            <div class="vx-col w-full md:w-1/2 mb-base">
              <div class="centerx">
                <vs-input class="inputx w-full" placeholder="Name" label="Name" v-model="add.name"/>
              </div>
              <div class="centerx mt-base">
                <vs-textarea label="Access token" v-model="add.accessToken" />
              </div>
            </div>
            <div class="vx-col w-full md:w-1/2 mb-base">
              <div class="centerx flex align-center mt-base">
                <vs-switch v-model="add.useragent">
                  <span slot="on">On</span>
                  <span slot="off">Off</span>
                </vs-switch>
                <label class="label">Useragent</label>
              </div>
              <div v-if="add.useragent" class="centerx mt-base">
                <vs-input class="inputx w-full" placeholder="Useragent" v-model="add.useragentData"/>
              </div>
              <div class="centerx flex align-center mt-base">
                <vs-switch v-model="add.proxy">
                  <span slot="on">On</span>
                  <span slot="off">Off</span>
                </vs-switch>
                <label class="label">Proxy</label>
              </div>
              <div v-if="add.proxy" class="centerx">
                <div class="vx-row">
                  <div class="vx-col w-full md:w-1/2 mb-base">
                    <div class="centerx mt-base">
                      <v-select v-model="proxySelected" placeholder="Existing Proxy" :options="$store.state.proxy" />
                    </div>
                    <div class="centerx mt-base">
                      <vs-input class="inputx w-full" placeholder="Name" v-model="add.proxyData.name"/>
                    </div>
                    <div class="centerx mt-base">
                      <vs-input class="inputx w-full" placeholder="Host" v-model="add.proxyData.host"/>
                    </div>
                    <div class="centerx mt-base">
                      <vs-input class="inputx w-full" placeholder="Login" v-model="add.proxyData.login"/>
                    </div>
                  </div>
                  <div class="vx-col w-full md:w-1/2 mb-base">
                    <div class="centerx mt-base">
                      <vs-input class="inputx w-full" placeholder="Quick input" v-model="add.proxyData.quickInput"/>
                    </div>
                    <div class="centerx mt-base">
                      <vs-input class="inputx w-full" placeholder="Type" v-model="add.proxyData.type"/>
                    </div>
                    <div class="centerx mt-base">
                      <vs-input class="inputx w-full" placeholder="Port" v-model="add.proxyData.port"/>
                    </div>
                    <div class="centerx mt-base">
                      <vs-input class="inputx w-full" placeholder="Password" v-model="add.proxyData.password"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-btn">
            <vs-button color="success">Add</vs-button>
          </div>
        </div>
      </vs-tab>
      <vs-tab label="Bulk Add">
        <div class="con-tab-ejemplo">
          Service
        </div>
      </vs-tab>
      <vs-tab label="Login / Password">
        <div class="con-tab-ejemplo">
          login
        </div>
      </vs-tab>
    </vs-tabs>
  </vs-popup>
</div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import vSelect from 'vue-select'
export default {
  data() {
    return {
      search: '',
      popupCreate: false,
      proxySelected: null,
      tabs: 2,
      add:{
        name: '',
        accessToken: '',
        useragent: true,
        useragentData: navigator.userAgent,
        proxy: false,
        proxyData: {
          name: '',
          host: '',
          login: '',
          password: '',
          quickInput: '',
          type: '',
          port: ''
        }
      },
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
        {
          name: 'Users',
          link: '/ads-manager/users'
        },
        {
          name: 'Accounts',
          link: '/ads-manager/accounts'
        },
        {
          name: 'Dates',
          link: '/ads-manager/dates'
        },
        {
          name: 'BMS',
          link: '/ads-manager/bms'
        },
        {
          name: 'Ad accounts',
          link: '/ads-manager/ad-accounts'      
        },
        {
          name: 'Campaigns',
          link: '/ads-manager/campaigns'      
        },
        {
          name: 'Adsets',
          link: '/ads-manager/adsets'      
        },
        {
          name: 'Ads',
          link: '/ads-manager/ads'      
        }
      ],
    }
  },
  mounted(){
    this.$store.commit('SUBMENU_CHANGE', this.submenu)
    this.$store.dispatch('accounts')
    this.$store.dispatch('proxies')
  }, 
  methods: {
    userInfo(name, login){
      this.userinfo = true
      this.user.name = name
      this.user.login = login
    },
    acceptRules(){
      this.$store.dispatch('acc/acceptRules', this.selectedId)
      this.selected = []
    },
    loading(id){

     //console.log(this.$store.state.acc.process.status.find(item => item.accountId == id))
    }
  },
  components: {
      flatPickr,
      'v-select': vSelect,
  },
  watch: {
    selected: function (val) {
      this.count = val.length
      this.selectedId = this.selected.map(account => account.id)
    },
    proxySelected: function (val){
      console.log(val)
      this.add.proxyData.name = val.name
      this.add.proxyData.host = val.host
      this.add.proxyData.login = val.username
      this.add.proxyData.type = val.proxyType
      this.add.proxyData.port = val.port
      this.add.proxyData.password = val.password
    }
  }
}
</script>
