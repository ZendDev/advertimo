<template>
<div class="panel-page">
  <div class="users-page-panel">
    <ul>
      <li>
        <vx-tooltip color="primary" text="Copy" position="bottom">
          <vs-button :disabled="count == 0" size="small" icon-pack="feather" icon="icon-copy" />
        </vx-tooltip>      
      </li>
      <li>
        <vx-tooltip color="primary" text="Delete" position="bottom">
          <vs-button :disabled="count == 0" size="small" icon-pack="feather" icon="icon-trash-2" />
        </vx-tooltip>
      </li>
      <li>
        <vx-tooltip color="primary" text="Share" position="bottom">
          <vs-button :disabled="count == 0" size="small" icon-pack="feather" icon="icon-share-2" />
        </vx-tooltip>
      </li>
      <li>
        <vx-tooltip color="primary" text="Selected users" position="bottom">
          <span class="countcheckusers"><vs-icon size="small" icon-pack="feather" icon="icon-user-check" color="rgb(115,103,240)"></vs-icon> {{ count }}</span>
        </vx-tooltip>
      </li>
    </ul>
    <ul>
      <li>
        <vx-tooltip color="primary" text="Columns" position="bottom">
          <vs-button size="small" icon-pack="feather" icon="icon-plus">Add proxy</vs-button>
        </vx-tooltip>
      </li>
      <li>
        <vs-input icon-pack="feather" icon="icon-search" placeholder="Search" v-model="value1" class="is-label-placeholder" />
      </li>
    </ul>
  </div>
  <vs-table multiple v-model="selected" pagination max-items="10" :data="users">

    <template slot="thead">
      <vs-th sort-key="id">ID</vs-th> 
      <vs-th sort-key="name">Name</vs-th> 
      <vs-th sort-key="type">Type</vs-th> 
      <vs-th sort-key="host">Host</vs-th>
      <vs-th sort-key="port">Port</vs-th>
      <vs-th sort-key="login">Login</vs-th>
      <vs-th sort-key="password">Password</vs-th>
      <vs-th sort-key="extip">External IP</vs-th>
      <vs-th sort-key="acccount">Accounts count</vs-th>
      <vs-th sort-key="status">Status</vs-th>
      <vs-th sort-key="accounts">Accounts</vs-th>
      <vs-th sort-key="lastcheck">Last check</vs-th>
      <vs-th sort-key="exp">Expirity</vs-th>
    </template>

    <template slot-scope="{data}">
      <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

        <vs-td :data="data[indextr].id">
          <div class="flex align-center account-name">
            <div class="name-user"> {{ data[indextr].id}}</div>
          </div>
        </vs-td>

        <vs-td :data="data[indextr].name">
          {{ data[indextr].name }}
        </vs-td>

        <vs-td :data="data[indextr].type">
          {{ data[indextr].type }}
        </vs-td>

        <vs-td :data="data[indextr].host">
          {{ data[indextr].host }}
        </vs-td>

        <vs-td :data="data[indextr].port">
          {{ data[indextr].port }}
        </vs-td>

        <vs-td :data="data[indextr].login">
          {{ data[indextr].login }}
        </vs-td>

        <vs-td :data="data[indextr].password">
          {{ data[indextr].password }}
        </vs-td>

        <vs-td :data="data[indextr].extip">
          {{ data[indextr].extip }}
        </vs-td>

        <vs-td :data="data[indextr].account">
          {{ data[indextr].account }}
        </vs-td>

        <vs-td :data="data[indextr].status">
          <div :class="data[indextr].status[0]">{{ data[indextr].status[1] }}</div>
        </vs-td>

        <vs-td :data="data[indextr].accounts">
          {{ data[indextr].accounts }}
        </vs-td>

        <vs-td :data="data[indextr].lastcheck">
          {{ data[indextr].lastcheck }}
        </vs-td>

        <vs-td :data="data[indextr].exp">
          {{ data[indextr].exp }}
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
  <vs-popup classContent="share-acc" title="Share multiple accounts" :active.sync="share">
    <ul class="centerx">
      <li>
        <vs-radio v-model="radios1" vs-value="1">Add permissions</vs-radio>
      </li>
      <li>
        <vs-radio v-model="radios1" vs-value="2">Remove permissions</vs-radio>
      </li>
    </ul>
    <div class="modal-btn">
      <vs-button color="danger" type="flat">Close</vs-button>
      <vs-button color="success" type="flat">Save</vs-button>
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
      radios1: '1',
      value1:'',
      addUser: false,
      share: false,
      select2:2,
      userinfo: false,
      changePass: false,
      user: 
        {
          name: '',
          login: '',
          password: '',
          confirm: ''
        },
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
      users: [
          // {
          // "id": 1,
          // "name": 'bel onee',
          // "type": 'SOCKS5',
          // "host": '194.156.27.217',
          // "port": '53362',
          // "login": 'hcdKqGjxwV',
          // "password": 'sOtCeDIQou',
          // "extip": '-',
          // "account": 0,
          // "status": ['success', 'active'],
          // "accounts": 0,
          // "lastcheck": '17 May, 14:28',
          // "exp": '-'
          // }
      ],
      submenu: [

      ],
    }
  },
  mounted(){
    this.$store.commit('SUBMENU_CHANGE', this.submenu)
    this.$http.get(process.env.VUE_APP_API_ROOT + '/proxies', { 'headers': { Authorization: localStorage.accessToken } })
    .then((response) => {
        console.log(response)
    }) 
    .catch((error) => {
        console.log(error)
    })
  },
  methods: {
    userInfo(name, login){
      this.userinfo = true
      this.user.name = name
      this.user.login = login
    },
    validated(val){
      console.log('sda')
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