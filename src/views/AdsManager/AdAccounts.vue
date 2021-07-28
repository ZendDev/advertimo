<template>
<div class="panel-page">
  <div class="users-page-panel">
    <ul>
      <!-- <li>
        <vx-tooltip color="primary" text="Tags" position="bottom">
          <vs-button :disabled="count == 0" size="small" icon-pack="feather" icon="icon-tag" />
        </vx-tooltip>      
      </li> -->
      <!-- <li>
        <vx-tooltip color="primary" text="Archive" position="bottom">
          <vs-button :disabled="count == 0" size="small" icon-pack="feather" icon="icon-archive" />
        </vx-tooltip>
      </li> -->
      <li>
        
        <vs-dropdown :disabled="count == 0" vs-trigger-click>
          
          <vs-button :disabled="count == 0" size="small" icon-pack="feather" icon="icon-more-vertical" />
    
          <vs-dropdown-menu>

            <vs-dropdown-item @click="popupCard = true">Attach bank card</vs-dropdown-item>
            <vs-dropdown-item @click="popupCountry = true">Change billing country</vs-dropdown-item>
            <vs-dropdown-item @click="changeName">Rename</vs-dropdown-item>
            <vs-dropdown-item @click="task('CabId', 'UpdateCab', 'Create Pixel', [])" divider>Create pixel</vs-dropdown-item>
            <!-- <vs-dropdown-item>Create BM</vs-dropdown-item>
            <vs-dropdown-item divider>Move accounts to another user</vs-dropdown-item> -->
            <!-- <vs-dropdown-item>Archive</vs-dropdown-item>
            <vs-dropdown-item>Unarchive</vs-dropdown-item> -->
            <!-- <vs-dropdown-item>Data export</vs-dropdown-item> -->
          </vs-dropdown-menu>
        </vs-dropdown>
      </li>
      <li>
        <vx-tooltip color="primary" text="Selected ad accounts" position="bottom">
          <span class="countcheckusers"><vs-icon size="small" icon-pack="feather" icon="icon-user-check" color="rgb(115,103,240)"></vs-icon> {{ count }}</span>
        </vx-tooltip>
      </li>
    </ul>
    <ul>
      <!-- <li>
        <vs-switch v-model="deleted" />
        <label>Only selected</label>        
      </li> -->
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
          <vs-button @click="task('CabId', 'Update FB Data', [{'type': 'GetCabs'},{'type': 'GetCampaigns'},{'type': 'GetAdsets'},{'type': 'GetAds'}])" size="small" icon-pack="feather" icon="icon-refresh-ccw" />
        </vx-tooltip>
      </li>
      <!-- <li>
        <vs-select autocomplete class="curr-select" v-model="select2">
          <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in options2" />
        </vs-select>
      </li>
      <li class="date">
        <flat-pickr class="date-icons" :config="configdateTimePicker" v-model="date" placeholder="Choose date" />
      </li> -->
      <li>
        <vs-input icon-pack="feather" icon="icon-search" placeholder="Search" v-model="value1" class="is-label-placeholder" />
      </li>
    </ul>
  </div>
  <vs-table multiple v-model="selected" pagination max-items="10" :data="$store.state.adaccounts">

    <template slot="thead">
      <vs-th sort-key="adaccount">Ad account</vs-th> 
      <vs-th sort-key="billing">Ad account billing</vs-th> 
      <vs-th sort-key="status">Status</vs-th> 
      <vs-th sort-key="impressions">impressions</vs-th> 
      <vs-th sort-key="clicks">Link Clicks</vs-th> 
      <vs-th sort-key="results">Results</vs-th> 
      <vs-th sort-key="spend">Spend</vs-th>
    </template>

    <template slot-scope="{data}">
      <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

        <vs-td :data="data[indextr].adaccount">
          <div class="flex align-center account-name">
            <div class="name-user accname">{{ data[indextr].businessCabName}}</div>
            <div class="accicons">

              <vx-tooltip color="primary" text="Notification are enabled" position="bottom">
                <vs-icon size="small" icon-pack="feather" icon="icon-bell" color="rgb(115,103,240)" />
              </vx-tooltip>
              <vx-tooltip color="primary" text="Ad acoount`s billings" position="bottom">
                <vs-icon size="small" icon-pack="feather" icon="icon-file-text" color="rgb(115,103,240)" />
              </vx-tooltip>
              <vs-icon size="small" icon-pack="feather" icon="icon-clock" color="rgb(115,103,240)" />
              {{ data[indextr].timezoneOffsetHoursUtc }}
            </div>
            <div class="name-user dataad">ID: {{ data[indextr].cabinetId}}</div>
            <div class="name-user dataad">Account: {{ data[indextr].account.name }}</div>
            <div class="name-user dataad">Pixel: {{ data[indextr].pixels }}</div>
          </div>
        </vs-td>

        <vs-td :data="data[indextr].billing">
          <div class="card-acc">
            <div class="card-number">
              <vs-icon size="small" icon-pack="feather" icon="icon-credit-card" color="rgb(115,103,240)" />
              <template v-if="data[indextr].isAttachCard">
                {{ data[indextr].billing[0] }}
              </template>
              <template v-else>
                not card
              </template>

              <span :class="`lang-`+data[indextr].businessCountryCode" />
            </div>
            <div class="card-count">
              0 / 2 {{ data[indextr].currency }}
            </div>
          </div>
          <vs-progress :percent="data[indextr].proccent" color="success"></vs-progress>
          <div class="card-acc card-acc_bottom">
            <span class="card-count">Spend: 10</span>
            <span class="card-count">Limit: {{ data[indextr].limit }}</span>
          </div>
        </vs-td>

        <vs-td :data="data[indextr].status">
          <div class="flex">
            <div class="success">{{ data[indextr].accountStatus }}</div>
          </div>
          <span class="date-status">{{ data[indextr].date}}</span>
          <span @click="data[indextr].notes = ' '" v-if="!data[indextr].notes" class="acc-notes">notes</span>
          <div v-else class="notes-wrap">
            <vs-input :disabled="false" :class="{'inputx': true, 'status-notes': true}" v-model="data[indextr].notes" />
          </div>
        </vs-td>

        <vs-td :data="data[indextr].impressions">
          0
        </vs-td>

        <vs-td :data="data[indextr].clicks">
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
  <vs-popup title="Attach Card" :active.sync="popupCard">
    <div class="centerx">
      <div class="vx-row">
        <div class="vx-col w-full md:full mb-base">
          <div class="centerx mt-base">
            <vs-input class="inputx w-full" placeholder="Card Number" v-model="addCard.CardNumber"/>
          </div>
          <div class="centerx mt-base">
            <vs-input class="inputx w-full" placeholder="Card Expiry Month" v-model="addCard.CardExpiryMonth"/>
          </div>
          <div class="centerx mt-base">
            <vs-input class="inputx w-full" placeholder="Card Expiry Year" v-model="addCard.CardExpiryYear"/>
          </div>
          <div class="centerx mt-base">
            <vs-input class="inputx w-full" placeholder="Card CVC" v-model="addCard.CardCsc"/>
          </div>
        </div>
        <div class="modal-btn">
          <vs-button @click="task('CabId', 'AttachCard', 'Attach Card', addCard);popupCard = false" color="success">Update</vs-button>
        </div>
      </div>
    </div>
  </vs-popup>
  <vs-popup title="Change billing country" :active.sync="popupCountry">
    <div class="centerx">
      <div class="vx-row">
        <div class="vx-col w-full md:full mb-base">
          <div class="centerx mt-base">
            <v-select v-model="BusinessInfo.BusinessCountryCode" placeholder="Existing Proxy" :options="country" />
          </div>
        </div>
        <div class="modal-btn">
          <vs-button @click="task('CabId', 'UpdateCab', 'Change billing country', BusinessInfo);popupCountry = false" color="success">Update</vs-button>
        </div>
      </div>
    </div>
  </vs-popup>
  <vs-popup title="Rename" :active.sync="popupRename">
    <div class="centerx">
      <div class="vx-row">
        <div class="vx-col w-full md:full mb-base">
          <div class="centerx mt-base">
            <vs-input class="inputx w-full" placeholder="Name" v-model="BusinessInfo.BusinessName"/>
          </div>
        </div>
        <div class="modal-btn">
          <vs-button @click="task('CabId', 'UpdateCab', 'Rename', BusinessInfo);popupRename = false" color="success">Update</vs-button>
        </div>
      </div>
    </div>
  </vs-popup>
</div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import vSelect from 'vue-select'

export default {
  data() {
    return {
      radios1: '1',
      value1:'',
      popupCountry: false,
      popupRename: false,
      BusinessInfo: {
        BusinessCountryCode: null,
        BusinessName: null
      },
      countrydata:null,
      country:[
        {
        'label': 'Russia',
        'id': 1
        }
      ],
      cardfull: null,
      addCard:{
        CardNumber: null,
        CardExpiryMonth: null,
        CardExpiryYear: null,
        CardCsc: null,
      },
      addUser: false,
      share: false,
      select2:2,
      userinfo: false,
      changePass: false,
      popupCard: false,
      user: 
        {
          name: '',
          login: '',
          password: '',
          confirm: ''
        }
      ,
      deleted:false,
      selectedId: null,
      selected: [],
      date: null,
      configdateTimePicker: {
        inline: false,
      },
      options2:[
        {text: 'USD', value: 1},
        {text: 'RUB', value: 2}
      ],
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
    this.$store.dispatch('adAccounts')
  },
  methods: {
    userInfo(name, login){
      this.userinfo = true
      this.user.name = name
      this.user.login = login
    },
    changeName(){
      this.BusinessInfo.BusinessName = this.selected[0].account.facebookName
      this.popupRename = true

    },
    task(idtype, title, data){
      this.$store.dispatch('acc/task', {
          selectedId: this.selectedId,
          idtype,      
          title,
          data
      })
    }
  },
  watch: {
    selected: function (val) {
      this.count = val.length
      this.selectedId = this.selected.map(account => account.id)
      console.log(this.selectedId)
    },
  },
  components: {
      flatPickr,
      vSelect
  },
  watch: {
    selected: function (val) {
      this.count = val.length
      this.selectedId = this.selected.map(account => account.id)
    }
  }
}
</script>