<template>
    <div class="row">
      <div class="col-lg-13">
        <card card-body-classes="table-full-width">
          <h4 slot="header" class="card-title">All Feedbacks</h4>
          <div class="col-lg-10" style="display: flex; justify-content: space-between;">
          <input type="text" placeholder="Search any feedback" v-model="filter" v-on:input="searchFeedbacks" style="width: 100%; margin-right: 20px;"/>
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
          <el-table :data="feedbacksTableData" id="mainTable" class="table-responsive">
            <el-table-column
              min-width="50"
              sortable
              label="User Id"
              property="user_id"
            ></el-table-column>
            <el-table-column
              min-width="50"
              label="Device"
              property="device_type"
            ></el-table-column>
            <el-table-column
              min-width="90"
              label="Feedback"
              property="feedback"
            ></el-table-column>
            <el-table-column
              min-width="100"
              label="Comments"
              property="comments"
            ></el-table-column>
            <el-table-column
              min-width="50"
              sortable
              label="Rating"
              property="rating"
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
    name: 'All Feedbacks',
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn
    },
    async created() {
      await this.fetchAllFeedbacks(this.limit, this.skip);
    },
    data () {
      return {
        filter : "",
        limit : 50,
        skip : 0,
        isBusy : false,
        feedbacksTableData: [],
        storedTableData: []
      };
    },
    methods: {
     fetchAllFeedbacks(limit, skip) {
        this.isBusy = true;
        let getFactsApi = config.BASE_URL + "getAllFeedbacks?" + "limit=" + limit.toString() + "&offset=" + skip.toString();
        fetch(getFactsApi)
          .then(response => response.json())
          .then(data => {
            this.isBusy = false;
            this.factsTableData = data.data;
            this.storedTableData = data.data;
          })
        },
      refresh() {
        this.skip = 0
        this.fetchAllFeedbacks(this.limit, this.skip);
      },
      backLoad() {
        let newSkip = (this.skip - 50 < 0) ? 0 : (this.skip - 50);
        this.skip = newSkip
        this.fetchAllFeedbacks(this.limit, this.skip);
      },
      nextLoad() {
        this.skip = this.skip + 50;
        this.fetchAllFeedbacks(this.limit, this.skip);
      }
    },
    computed: {
      searchFeedbacks() {
        if (this.filter == "") {
          this.feedbacksTableData = this.storedTableData;
        } else {
          this.feedbacksTableData = this.storedTableData;
          this.feedbacksTableData = this.factsTableData.filter(row => {
            const userId = row.user_id.toString().toLowerCase();
            const feedback = row.feedback.toLowerCase();
            const comments = row.comments.toLowerCase();
            return feedback.includes(searchTerm) || comments.includes(searchTerm) || userId.includes(searchTerm) ;
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
  </style>
  