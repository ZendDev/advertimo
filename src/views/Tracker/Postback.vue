<template>
<div class="panel-page">
<div class="postback-content">
  <vx-input-group class="mb-base">
    <vs-input label-placeholder="Postback URL" v-model="user.login" size="large" />
    <template slot="append">
        <div class="append-text btn-addon">
            <vs-button color="primary">
                <vs-icon size="small" icon-pack="feather" icon="icon-copy" color="rgb(225,225,225)" />
            </vs-button>
        </div>
    </template>
  </vx-input-group> 
    <div class="vx-row">
        <div class="vx-col w-full sm:w-1/2 lg:w-1/2 mb-base">
            <vx-input-group class="mb-base">
                <vs-input label-placeholder="Macros with ad_id data" size="medium" />
            </vx-input-group> 
            <vx-input-group class="mb-base">
                <vs-input label-placeholder="Status" size="medium" />
            </vx-input-group> 
            <vx-input-group class="mb-base">
                <vs-input label-placeholder="Lead ID macros" size="medium" />
            </vx-input-group> 
            <vx-input-group class="mb-base">
                <vs-input label-placeholder="Payout macros" size="medium" />
            </vx-input-group> 
            <vx-input-group class="mb-base">
                <vs-input label-placeholder="Currency macros" size="medium" />
            </vx-input-group> 
        </div>
        <div class="vx-col w-full sm:w-1/2 lg:w-1/2 mb-base">
            <vx-input-group class="mb-base">
                <vs-input label-placeholder="Affilate Network" size="medium" />
            </vx-input-group> 
            <vx-input-group class="mb-base">
                <vs-input label-placeholder="AN status (new)" size="medium" />
            </vx-input-group> 
            <vx-input-group class="mb-base">
                <vs-input label-placeholder="AN status (approved)" size="medium" />
            </vx-input-group> 
            <vx-input-group class="mb-base">
                <vs-input label-placeholder="AN status (rejected)" size="medium" />
            </vx-input-group> 
            <vx-input-group class="mb-base">
                <vs-input label-placeholder="AN status (trash)" size="medium" />
            </vx-input-group>
        </div>
    </div>  
</div>   
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
          login: 'http://localhost/postback?ad_id=&lead_status=&sale_status=&declined_status=&trash_status=&status=&ext_id=&sum=&currency=&pp=',
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