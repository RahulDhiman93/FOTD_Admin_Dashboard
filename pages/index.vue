<template>
  <div class="row">
    <div class="col-lg-13">
      <card card-body-classes="table-full-width">
        <h4 slot="header" class="card-title">Users</h4>
        <div class="col-lg-10">
          <input type="text" placeholder="Search any user" v-model="filter" v-on:input="searchUsers"/>
        </div>
        <el-table :data="usersTableData" class="table-responsive">
          <el-table-column
            min-width="65"
            sortable
            label="UserId"
            property="user_id"
          ></el-table-column>
          <el-table-column
            min-width="150"
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
            min-width="100"
            label="Last Login"
            property="last_login"
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
      usersTableData: [],
      storedTableData: []
    };
  },
  methods: {
    fetchAllUsers() {
      fetch(config.BASE_URL + "getAllUsers")
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
          const name = row.name.toLowerCase();
          const email = row.email.toLowerCase();
          const searchTerm = this.filter.toLowerCase();
          return email.includes(searchTerm) || name.includes(searchTerm);
        });
      }
    }
  }
}
</script>
<style>
#mainTable table thead tr th:nth-child(2) {
  background: red;
}
</style>
