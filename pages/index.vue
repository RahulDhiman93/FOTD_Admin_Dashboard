<template>
  <div class="row">
    <div class="col-lg-13">
      <card card-body-classes="table-full-width">
        <h4 slot="header" class="card-title">All Users</h4>
        <el-table :data="usersTableData">
          <el-table-column
            min-width="150"
            sortable
            label="UserId"
            property="user_id"
          ></el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Name"
            property="name"
          ></el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Email"
            property="email"
          ></el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Source"
            property="signup_from"
          ></el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Rewards"
            property="reward_points"
          ></el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Popularity"
            property="popularity"
          ></el-table-column>
        </el-table>
      </card>
    </div>
  </div>
</template>

<script>
import config from '@/config';
import { Table, TableColumn } from 'element-ui';

export default {
  name: 'Users',
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  created() {
    this.fetchAllUsers();
  },
  data () {
    return {
      usersTableData: [{
            "user_id": 45,
            "access_token": "7b37ed964f6057180c9e62d8175a7628",
            "name": "Ankitt",
            "password": "25213dd301e38ee2e77a11562216bd44",
            "email": "innocent4257@gmail.com",
            "signup_from": 2,
            "is_guest": 0,
            "notification_enabled": 1,
            "reward_points": 0,
            "popularity": 0,
            "timezone": 330,
            "timezone_info": "libcore.util.ZoneInfo[id=\"Asia/Kolkata\",mRawOffset=19800000,mEarliestRawOffset=19800000,mUseDst=false,mDstSavings=0,transitions=5]",
            "last_login": "2022-09-01T05:10:41.000Z",
            "profile_image": null,
            "otp": null
        },
        {
            "user_id": 44,
            "access_token": "559e17dfba76937b807e05de0697f0ac",
            "name": "Samson Omotoyinbo",
            "password": "e1cf66d869fe4376fa92b0142d9489ec",
            "email": "samsonom48@gmail.com",
            "signup_from": 2,
            "is_guest": 0,
            "notification_enabled": 1,
            "reward_points": 0,
            "popularity": 0,
            "timezone": 60,
            "timezone_info": "libcore.util.ZoneInfo[id=\"Africa/Lagos\",mRawOffset=3600000,mEarliestRawOffset=815000,mUseDst=false,mDstSavings=0,transitions=4]",
            "last_login": "2022-09-01T02:27:01.000Z",
            "profile_image": null,
            "otp": null
        }],
    };
  },
  computed: {
    enableRTL () {
      return this.$route.query.enableRTL;
    },
    isRTL () {
      return this.$rtl.isRTL;
    }
  },
  methods: {
    fetchAllUsers() {
      fetch(config.BASE_URL + "getAllUsers")
        .then(response => response.json())
        .then(data => {
          this.usersTableData = data
        })
    }
  }
}
</script>
<style></style>
