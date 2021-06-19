<template>
<div class="panel-page">
  <div class="users-page-panel">
    <ul>
      <li>
        <vx-tooltip color="primary" text="Delete" position="bottom">
          <vs-button :disabled="count == 0" size="small" icon-pack="feather" icon="icon-trash-2" />
        </vx-tooltip>
      </li>
      <li>
        <vx-tooltip color="primary" text="Selected users" position="bottom">
          <span class="countcheckusers"><vs-icon size="small" icon-pack="feather" icon="icon-user-check" color="rgb(115,103,240)"></vs-icon> {{ count }}</span>
        </vx-tooltip>
      </li>
    </ul>
  </div>
  <vs-table multiple v-model="selected" pagination max-items="10" :data="users">

    <template slot="thead">
      <vs-th sort-key="id">ID</vs-th> 
      <vs-th sort-key="extid">EXT ID</vs-th> 
      <vs-th sort-key="adid">Ad ID</vs-th>
      <vs-th sort-key="time">Time</vs-th> 
      <vs-th sort-key="status">Status</vs-th>
      <vs-th sort-key="sum">Sum</vs-th>  
      <vs-th sort-key="sumusd">Sum USD</vs-th>  
      <vs-th sort-key="anid">AN ID</vs-th> 
    </template>

    <template slot-scope="{data}">
      <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

        <vs-td :data="data[indextr].id">
          <div class="flex align-center account-name">
            <div class="name-user"> {{ data[indextr].id}}</div>
          </div>
        </vs-td>

        <vs-td :data="data[indextr].extid">
          {{ data[indextr].extid }}
        </vs-td>

        <vs-td :data="data[indextr].adid">
          {{ data[indextr].adid }}
        </vs-td>

        <vs-td :data="data[indextr].time">
          {{ data[indextr].time }}
        </vs-td>

        <vs-td :data="data[indextr].status">
          {{ data[indextr].status }}
        </vs-td>

        <vs-td :data="data[indextr].sum">
          {{ data[indextr].sum }}
        </vs-td>

        <vs-td :data="data[indextr].sumusd">
          {{ data[indextr].sumusd }}
        </vs-td>

        <vs-td :data="data[indextr].anid">
          {{ data[indextr].anid }}
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

      ],
      submenu: [
        {
          name: 'Conversions',
          link: '/tracker/conversions'
        },
        {
          name: 'Postback url',
          link: '/tracker/postback'
        }
      ],
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