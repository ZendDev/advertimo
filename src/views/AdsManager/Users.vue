<template>
<div class="panel-page">
  <div class="users-page-panel">
    <ul>
      <li>
        <vx-tooltip color="primary" text="Tags" position="bottom">
          <vs-button :disabled="count == 0" size="small" icon-pack="feather" icon="icon-tag" />
        </vx-tooltip>      
      </li>
      <li>
        <vx-tooltip color="primary" text="Restore" position="bottom">
          <vs-button :disabled="count == 0" size="small" icon-pack="feather" icon="icon-rotate-ccw" />
        </vx-tooltip>
      </li>
      <li>
        <vx-tooltip color="primary" text="Delete" position="bottom">
          <vs-button :disabled="count == 0" size="small" icon-pack="feather" icon="icon-trash-2" />
        </vx-tooltip>
      </li>
      <li>
        
        <vs-dropdown :disabled="count == 0" vs-trigger-click>
          
          <vs-button :disabled="count == 0" size="small" icon-pack="feather" icon="icon-more-vertical" />
    
          <vs-dropdown-menu>

            <vs-dropdown-item> Option 1 </vs-dropdown-item>
            <vs-dropdown-item> Option 2 </vs-dropdown-item>

            <vs-dropdown-group>

              <vs-dropdown-item> Option 1 </vs-dropdown-item>
              <vs-dropdown-item> Option 2 </vs-dropdown-item>

              <vs-dropdown-group>

                <vs-dropdown-item> sub Options 1 </vs-dropdown-item>
                <vs-dropdown-item> sub Options 2 </vs-dropdown-item>

              </vs-dropdown-group>
            </vs-dropdown-group>

            <vs-dropdown-item divider> Option 3 </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </li>
      <li>
        <vx-tooltip color="primary" text="Selected users" position="bottom">
          <span class="countcheckusers"><vs-icon size="small" icon-pack="feather" icon="icon-user-check" color="rgb(115,103,240)"></vs-icon> {{ count }}</span>
        </vx-tooltip>
      </li>
    </ul>
    <ul>
      <li>
        <vs-switch v-model="deleted" />
        <label>Show deleted</label>        
      </li>
      <li>
        <vx-tooltip color="primary" text="New users available" position="bottom">
          <span class="countcheckusers"><vs-icon size="small" icon-pack="feather" icon="icon-user-plus" color="rgb(115,103,240)"></vs-icon> 0</span>
        </vx-tooltip>
      </li>
      <li>
        <vs-button size="small" icon-pack="feather" icon="icon-filter">FILTERS</vs-button>
      </li>
      <li>
        <vs-button @click="addUser = true" size="small" icon-pack="feather" icon="icon-plus">ADD USER</vs-button>
      </li>
      <li>
        <vx-tooltip color="primary" text="Columns" position="bottom">
          <vs-button size="small" icon-pack="feather" icon="icon-columns" />
        </vx-tooltip>
      </li>
      <li>
        <vx-tooltip color="primary" text="Update FB data" position="bottom">
          <vs-button size="small" icon-pack="feather" icon="icon-refresh-ccw" />
        </vx-tooltip>
      </li>
      <li>
        <vs-select autocomplete class="curr-select" v-model="select2">
          <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in options2" />
        </vs-select>
      </li>
      <li class="date">
        <flat-pickr class="date-icons" :config="configdateTimePicker" v-model="date" placeholder="Choose date" />
      </li>
    </ul>
  </div>
  <vs-table multiple v-model="selected" pagination max-items="10" :data="users">

    <template slot="thead">
      <vs-th sort-key="name">User</vs-th> 
      <vs-th sort-key="status">Status</vs-th>
      <vs-th sort-key="role">Role</vs-th>
      <vs-th sort-key="impressions">Impressions</vs-th> 
      <vs-th sort-key="linkCliks">Link Clicks</vs-th> 
      <vs-th sort-key="results">Results</vs-th> 
      <vs-th sort-key="spend">Spend</vs-th> 
    </template>

    <template slot-scope="{data}">
      <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

        <vs-td :data="data[indextr].name">
          <div @click="userInfo(data[indextr].name, data[indextr].login)" class="name-user">{{ data[indextr].name }}</div>
          <div class="login-user">{{ data[indextr].login }}</div>
        </vs-td>

        <vs-td :data="data[indextr].status">  
            <div :class="data[indextr].status[0]">{{ data[indextr].status[1] }}</div>
        </vs-td>

        <vs-td :data="data[indextr].role">
          {{ data[indextr].role }}
        </vs-td>

        <vs-td :data="data[indextr].impressions">
          {{ data[indextr].impressions }}
        </vs-td>

        <vs-td :data="data[indextr].linkCliks">
          {{ data[indextr].linkCliks }}
        </vs-td>

        <vs-td :data="data[indextr].results">
          {{ data[indextr].results }}
        </vs-td>

        <vs-td :data="data[indextr].spend">
          {{ data[indextr].spend }}
        </vs-td>

      </vs-tr>
    </template>
  </vs-table>
  <vs-popup classContent="popup-example" :title="`Edit user [${user.login}]`" :active.sync="userinfo">
    <div class="centerx labelx">
      <vs-input icon-pack="feather" icon="icon-at-sign" label-placeholder="Login" v-model="user.login" />
    </div>
    <div class="centerx labelx">
      <vs-input icon-pack="feather" icon="icon-user" label-placeholder="Display name" v-model="user.name" />
    </div>
    <div class="centerx labelx">
        <vs-switch v-model="changePass" />
        <label>Change password</label>
    </div> 
    <template v-if="changePass">
      <div class="centerx labelx">
        <vs-input type="password" val-icon-pack="feather" val-icon-success="icon-check" :success="user.confirm == user.password && user.password !== ''" icon-pack="feather" icon="icon-unlock" label-placeholder="New password" v-model="user.password" />
      </div>
      <div class="centerx labelx">
        <vs-input type="password" val-icon-pack="feather" val-icon-danger="icon-x" :danger="user.confirm !== user.password && user.confirm !== ''" val-icon-success="icon-check" :success="user.confirm == user.password && user.confirm !== ''" icon-pack="feather" icon="icon-lock" label-placeholder="Confirm password" v-model="user.confirm" />
      </div>
    </template>
    <div class="modal-btn">
      <vs-button color="danger" type="flat">Close</vs-button>
      <vs-button color="success" type="flat">Save</vs-button>
    </div>
  </vs-popup>
  <vs-popup classContent="popup-example" title="Add user" :active.sync="addUser">
    <div class="centerx labelx">
      <vs-input icon-pack="feather" icon="icon-at-sign" label-placeholder="Login" v-model="user.login" />
    </div>
    <div class="centerx labelx">
      <vs-input icon-pack="feather" icon="icon-user" label-placeholder="Display name" v-model="user.name" />
    </div>
    <div class="centerx labelx">
      <vs-input type="password" val-icon-pack="feather" val-icon-success="icon-check" :success="user.confirm == user.password && user.password !== ''" icon-pack="feather" icon="icon-unlock" label-placeholder="New password" v-model="user.password" />
    </div>
    <div class="centerx labelx">
      <vs-input type="password" val-icon-pack="feather" val-icon-danger="icon-x" :danger="user.confirm !== user.password && user.confirm !== ''" val-icon-success="icon-check" :success="user.confirm == user.password && user.confirm !== ''" icon-pack="feather" icon="icon-lock" label-placeholder="Confirm password" v-model="user.confirm" />
    </div>
    <div class="modal-btn">
      <vs-button color="danger" type="flat">Close</vs-button>
      <vs-button color="success" type="flat">Add</vs-button>
    </div>
  </vs-popup>
</div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
export default {
  data() {
    return {
      addUser: false,
      select2:2,
      userinfo: false,
      changePass: false,
      user: 
        {
          name: '',
          login: '',
          password: '',
          confirm: ''
        }
      ,
      deleted:false,
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
      users: [
        {
          "id": 1,
          "name": "admen",
          "login": "admen",
          "status": ['success', 'active'],
          "role": "Administrator",
          "impressions": 0,
          "linkCliks": 0,
          "results": 0,
          "spend": "0 USD"
        },
        {
          "id": 2,
          "name": "John",
          "login": "Due",
          "status": ['error', 'error'],
          "role": "Administrator",
          "impressions": 1,
          "linkCliks": 0,
          "results": 0,
          "spend": "0 USD"
        },
        {
          "id": 3,
          "name": "Leanne Graham",
          "login": "Lee",
          "status": ['warning', 'warning'],
          "role": "Moderator",
          "impressions": 0,
          "linkCliks": 0,
          "results": 0,
          "spend": "0 USD"
        },
        {
          "id": 1,
          "name": "admen",
          "login": "admen",
          "status": ['success', 'active'],
          "role": "Administrator",
          "impressions": 0,
          "linkCliks": 0,
          "results": 0,
          "spend": "0 USD"
        },
        {
          "id": 2,
          "name": "John",
          "login": "Due",
          "status": ['error', 'error'],
          "role": "Administrator",
          "impressions": 1,
          "linkCliks": 0,
          "results": 0,
          "spend": "0 USD"
        },
        {
          "id": 3,
          "name": "Leanne Graham",
          "login": "Lee",
          "status": ['warning', 'warning'],
          "role": "Moderator",
          "impressions": 0,
          "linkCliks": 0,
          "results": 0,
          "spend": "0 USD"
        },
        {
          "id": 1,
          "name": "admen",
          "login": "admen",
          "status": ['success', 'active'],
          "role": "Administrator",
          "impressions": 0,
          "linkCliks": 0,
          "results": 0,
          "spend": "0 USD"
        },
        {
          "id": 2,
          "name": "John",
          "login": "Due",
          "status": ['error', 'error'],
          "role": "Administrator",
          "impressions": 1,
          "linkCliks": 0,
          "results": 0,
          "spend": "0 USD"
        },
        {
          "id": 3,
          "name": "Leanne Graham",
          "login": "Lee",
          "status": ['warning', 'warning'],
          "role": "Moderator",
          "impressions": 0,
          "linkCliks": 0,
          "results": 0,
          "spend": "0 USD"
        },
        {
          "id": 1,
          "name": "admen",
          "login": "admen",
          "status": ['success', 'active'],
          "role": "Administrator",
          "impressions": 0,
          "linkCliks": 0,
          "results": 0,
          "spend": "0 USD"
        },
        {
          "id": 2,
          "name": "John",
          "login": "Due",
          "status": ['error', 'error'],
          "role": "Administrator",
          "impressions": 1,
          "linkCliks": 0,
          "results": 0,
          "spend": "0 USD"
        },
        {
          "id": 3,
          "name": "Leanne Graham",
          "login": "Lee",
          "status": ['warning', 'warning'],
          "role": "Moderator",
          "impressions": 0,
          "linkCliks": 0,
          "results": 0,
          "spend": "0 USD"
        }
      ]
    }
  },
  mounted(){
    this.$store.commit('SUBMENU_CHANGE', this.submenu)
  },
  methods: {
    userInfo(name, login){
      this.userinfo = true
      this.user.name = name
      this.user.login = login
    }
  },
  components: {
      flatPickr
  },
  watch: {
    selected: function (val) {
      this.count = val.length
    }
  }
}
</script>