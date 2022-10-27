<template>
  <div class="row">
    <div class="col-lg-13">
      <card card-body-classes="table-full-width">
        <h4 slot="header" class="card-title">Users</h4>
        <div class="col-lg-10" style="display: flex; justify-content: space-between;">
          <input type="text" placeholder="Search any user" v-model="filter" v-on:input="searchUsers" style="width: 100%; margin-right: 20px;"/>
          <div>
            <button @click="fetchAllUsers">Reload</button>
          </div>
        </div>
        <br>
        <el-table :data="usersTableData" id="mainTable" class="table-responsive">
          <el-table-column
            min-width="65"
            sortable
            label="UserId"
            property="user_id"
          ></el-table-column>
          <el-table-column
            min-width="100"
            label="Name"
            property="name"
          ></el-table-column>
          <el-table-column
            min-width="170"
            label="Email"
            property="email"
          ></el-table-column>
          <el-table-column
            min-width="60"
            label="Source"
            property="signup_from"
          ></el-table-column>
          <el-table-column
            min-width="60"
            label="Rewards"
            property="reward_points"
          ></el-table-column>
          <el-table-column
            min-width="80"
            label="Popularity"
            property="popularity"
          ></el-table-column>
          <el-table-column
            min-width="150"
            label="AccessToken"
            property="access_token"
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
  async created() {
    await this.fetchAllUsers();
  },
  data () {
    return {
      filter : "",
      limit : 30,
      skip : 0,
      usersTableData: [],
      storedTableData: []
    };
  },
  methods: {
    fetchAllUsers() {
      fetch(config.BASE_URL + "getAllUsers?limit=$limit&offset=$skip)")
        .then(response => response.json())
        .then(data => {
          this.usersTableData = data.data;
          this.storedTableData = data.data;
        })
      }
  },
  computed: {
    searchUsers() {
      if (this.filter == "") {
        this.usersTableData = this.storedTableData;
      } else {
        this.usersTableData = this.storedTableData;
        this.usersTableData = this.usersTableData.filter(row => {
          const userId = row.user_id.toString().toLowerCase();
          const name = row.name.toLowerCase();
          const email = row.email.toLowerCase();
          const accessToken = row.access_token.toLowerCase();
          const searchTerm = this.filter.toLowerCase();
          return userId.includes(searchTerm) || email.includes(searchTerm) || name.includes(searchTerm) || accessToken.includes(searchTerm);
        });
      }
    }
  }
}
</script>
<style>
#mainTable table thead tr th:nth-child(1){
  background: #344675;
}
#mainTable table thead tr th:nth-child(2){
  background: #344675;
}
#mainTable table thead tr th:nth-child(3){
  background: #344675;
}
#mainTable table thead tr th:nth-child(4){
  background: #344675;
}
#mainTable table thead tr th:nth-child(5){
  background: #344675;
}
#mainTable table thead tr th:nth-child(6){
  background: #344675;
}
#mainTable table thead tr th:nth-child(7){
  background: #344675;
}
</style>
