<template>
<div class="panel-page">

        <div class="vx-row">
            <div class="vx-col w-full sm:w-1/2 lg:w-1/3 mb-base">
                <vx-card>
                    <div slot="no-body">
                        <img src="@/assets/images/add.jpg" alt="content-img" class="responsive card-img-top">
                    </div>
                    <h5 class="mb-2">Test Test</h5>
                    <p class="text-grey">Описание</p>
                    <p class="text-grey">:)</p>
                    <div class="flex justify-between flex-wrap">
                        <vs-button class="mt-4" type="border" color="#b9b9b9">View</vs-button>
                    </div>
                </vx-card>
            </div>
            <div class="vx-col w-full sm:w-1/2 lg:w-1/3 mb-base">
                <vx-card>
                    <div slot="no-body">
                        <img src="@/assets/images/add.jpg" alt="content-img" class="responsive card-img-top">
                    </div>
                    <h5 class="mb-2">Test Test</h5>
                    <p class="text-grey">Описание</p>
                    <p class="text-grey">:)</p>
                    <div class="flex justify-between flex-wrap">
                        <vs-button class="mt-4" type="border" color="#b9b9b9">View</vs-button>
                    </div>
                </vx-card>
            </div>
            <div class="vx-col w-full sm:w-1/2 lg:w-1/3 mb-base">
                <vx-card>
                    <div slot="no-body">
                        <img src="@/assets/images/add.jpg" alt="content-img" class="responsive card-img-top">
                    </div>
                    <h5 class="mb-2">Test Test</h5>
                    <p class="text-grey">Описание</p>
                    <p class="text-grey">:)</p>
                    <div class="flex justify-between flex-wrap">
                        <vs-button class="mt-4" type="border" color="#b9b9b9">View</vs-button>
                    </div>
                </vx-card>
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
import VxTimeline          from '@/components/timeline/VxTimeline.vue'
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
      submenu: [

      ],
      card_1: {

      },
      card_2: {},
      card_3: {},
      card_4: {},
      card_5: {},
      card_6: {},
      card_7: {},
      card_8: {},

      chatLog: [],
      chatMsgInput: '',

      card_9: {},

      timelineData: [
        {
          color : 'primary',
          icon  : 'PlusIcon',
          title : 'New Task Added',
          desc  : 'Bonbon macaroon jelly beans gummi bears jelly lollipop apple',
          time  : '25 Days Ago'
        },
        {
          color : 'warning',
          icon  : 'AlertCircleIcon',
          title : 'Task Update Found',
          desc  : 'Cupcake gummi bears soufflé caramels candy',
          time  : '15 Days Ago'
        },
        {
          color : 'success',
          icon  : 'CheckIcon',
          title : 'Task Finished',
          desc  : 'Candy ice cream cake. Halvah gummi bears',
          time  : '20 mins ago'
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
  }
}
</script>