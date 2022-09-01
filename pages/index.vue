<template>
  <div class="row">
    <div class="col-lg-13">
      <card card-body-classes="table-full-width">
        <h4 slot="header" class="card-title">All Users</h4>
        <el-table :data="usersTableData">
          <el-table-column
            min-width="60"
            sortable
            label="UserId"
            property="user_id"
          ></el-table-column>
          <el-table-column
            min-width="180"
            sortable
            label="Name"
            property="name"
          ></el-table-column>
          <el-table-column
            min-width="180"
            sortable
            label="Email"
            property="email"
          ></el-table-column>
          <el-table-column
            min-width="60"
            sortable
            label="Source"
            property="signup_from"
          ></el-table-column>
          <el-table-column
            min-width="60"
            sortable
            label="Rewards"
            property="reward_points"
          ></el-table-column>
          <el-table-column
            min-width="60"
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
      usersTableData: [],
    };
  },
  methods: {
    fetchAllUsers() {
      fetch(config.BASE_URL + "getAllUsers")
        .then(response => response.json())
        .then(data => {
          this.usersTableData = data
          this.$forceUpdate();
        })
    }
  }
}
</script>
<style></style>
