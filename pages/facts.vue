<template>
    <div class="row">
      <div class="col-lg-13">
        <card card-body-classes="table-full-width">
          <h4 slot="header" class="card-title">All Facts</h4>
          <div class="col-lg-10" style="display: flex; justify-content: space-between;">
          <input type="text" placeholder="Search any fact" v-model="filter" v-on:input="searchFacts" style="width: 100%; margin-right: 20px;"/>
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
          <el-table :data="factsTableData" id="mainTable" class="table-responsive">
            <el-table-column
              min-width="65"
              sortable
              label="Fact Id"
              property="fact_id"
            ></el-table-column>
            <el-table-column
              min-width="65"
              sortable
              label="Fact Status"
              property="fact_status"
            ></el-table-column>
            <el-table-column
              min-width="65"
              sortable
              label="User Id"
              property="user_id"
            ></el-table-column>
            <el-table-column
              min-width="100"
              label="Fact"
              property="fact"
            ></el-table-column>
            <el-table-column
              min-width="65"
              sortable
              label="Fact Type"
              property="fact_type"
            ></el-table-column>
            <el-table-column
              min-width="65"
              label="FOTD Date"
              property="fact_stamp"
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
    name: 'All facts',
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn
    },
    async created() {
      await this.fetchAllFacts(this.limit, this.skip);
    },
    data () {
      return {
        filter : "",
        limit : 50,
        skip : 0,
        isBusy : false,
        factsTableData: [],
        storedTableData: []
      };
    },
    methods: {
     fetchAllFacts(limit, skip) {
        this.isBusy = true;
        let getFactsApi = config.BASE_URL + "getAllFacts?" + "limit=" + limit.toString() + "&offset=" + skip.toString();
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
        this.fetchAllFacts(this.limit, this.skip);
      },
      backLoad() {
        let newSkip = (this.skip - 50 < 0) ? 0 : (this.skip - 50);
        this.skip = newSkip
        this.fetchAllFacts(this.limit, this.skip);
      },
      nextLoad() {
        this.skip = this.skip + 50;
        this.fetchAllFacts(this.limit, this.skip);
      }
    },
    computed: {
      searchFacts() {
        if (this.filter == "") {
          this.factsTableData = this.storedTableData;
        } else {
          this.factsTableData = this.storedTableData;
          this.factsTableData = this.factsTableData.filter(row => {
            const factId = row.fact_id.toString().toLowerCase();
            const fact = row.fact.toLowerCase();
            const searchTerm = this.filter.toLowerCase();
            return fact.includes(searchTerm) || factId.includes(searchTerm) ;
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
  