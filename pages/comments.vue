<template>
    <div class="row">
      <div class="col-lg-13">
        <card card-body-classes="table-full-width">
          <h4 slot="header" class="card-title">All Comments</h4>
          <div class="col-lg-10" style="display: flex; justify-content: space-between;">
          <input type="text" placeholder="Search any comment" v-model="filter" v-on:input="searchComments" style="width: 100%; margin-right: 20px;"/>
          <div>
            <button @click="refresh">Reload</button>
          </div>
          <div>
            <button @click="backLoad">Previous</button>
          </div>
          <div>
            <button @click="nextLoad">Next</button>
          </div>
          </div>
          <br>
          <el-table :data="commentsTableData" id="mainTable" class="table-responsive">
            <el-table-column
              min-width="50"
              sortable
              label="Id"
              property="id"
            ></el-table-column>
            <el-table-column
              min-width="50"
              sortable
              label="Fact Id"
              property="fact_id"
            ></el-table-column>
            <el-table-column
              min-width="50"
              sortable
              label="User Id"
              property="user_id"
            ></el-table-column>
            <el-table-column
              min-width="80"
              label="User"
              property="user_name"
            ></el-table-column>
            <el-table-column
              min-width="150"
              sortable
              label="Comment"
              property="comment_text"
            ></el-table-column>
            <el-table-column
              min-width="50"
              label="Visible"
              property="is_active"
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
    name: 'All Comments',
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn
    },
    async created() {
      await this.fetchAllComments(this.limit, this.skip);
    },
    data () {
      return {
        filter : "",
        limit : 50,
        skip : 0,
        isBusy : false,
        commentsTableData: [],
        storedTableData: []
      };
    },
    methods: {
     fetchAllComments(limit, skip) {
        this.isBusy = true;
        let getFactsApi = config.BASE_URL + "fact/getAllComments?" + "limit=" + limit.toString() + "&offset=" + skip.toString();
        fetch(getFactsApi)
          .then(response => response.json())
          .then(data => {
            this.isBusy = false;
            this.commentsTableData = data.data;
            this.storedTableData = data.data;
          })
        },
      refresh() {
        this.skip = 0
        this.fetchAllComments(this.limit, this.skip);
      },
      backLoad() {
        let newSkip = (this.skip - 50 < 0) ? 0 : (this.skip - 50);
        this.skip = newSkip
        this.fetchAllComments(this.limit, this.skip);
      },
      nextLoad() {
        this.skip = this.skip + 50;
        this.fetchAllComments(this.limit, this.skip);
      }
    },
    computed: {
     searchComments() {
        if (this.filter == "") {
          this.commentsTableData = this.storedTableData;
        } else {
          this.commentsTableData = this.storedTableData;
          this.commentsTableData = this.commentsTableData.filter(row => {
            const userId = row.user_id.toString().toLowerCase();
            const userName = row.user_name.toString().toLowerCase();
            const factId = row.fact_id.toString().toLowerCase();
            const commentText = row.comment_text.toString().toLowerCase();
            const searchTerm = this.filter.toLowerCase();
            return userId.includes(searchTerm) || factId.includes(searchTerm) || userName.includes(searchTerm) || commentText.includes(searchTerm);
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
  </style>
  