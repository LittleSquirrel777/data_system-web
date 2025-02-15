<template>
  <div>
    <el-form style="margin-top:30px">
      <el-row>
        <el-col :span="6">
          <el-form-item label-width="90px" label="选择数据库" class="postInfo-container-item">
            <el-select v-model="selectedDatabase" placeholder="请选择">
              <el-option
                v-for="item in databases"
                :key="item.value"
                :label="item.label"
                :value="item.value" @click="deleteLastAudit">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item>
            <el-button type="primary" @click="audit">审计</el-button>
            <el-button type="primary" @click="destroy">破坏</el-button>
            <el-button type="primary" @click="destroy_location">定位</el-button>
            <el-button type="primary" @click="recovery">恢复</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label-width="90px" label="块的数量" class="postInfo-container-item">
            <el-input v-model="blockCount" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label-width="90px" label="审计结果" class="postInfo-container-item">
            <el-input v-model="auditResult" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label-width="90px" label="总审计时间" class="postInfo-container-item">
            <el-input v-model="totalAuditTime" disabled />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <el-form-item label-width="90px" label="服务端:" class="postInfo-container-item">
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label-width="90px" label="读取时间" class="postInfo-container-item">
            <el-input v-model="readTime" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label-width="90px" label="计算时间" class="postInfo-container-item">
            <el-input v-model="computeTime" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label-width="90px" label="准备时间" class="postInfo-container-item">
            <el-input v-model="preparationTime" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label-width="90px" label="证明时间" class="postInfo-container-item">
            <el-input v-model="proveTime" disabled />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div style="margin-left: 30px; margin-top: 50px; margin-right: 50px">
      <div v-if="isReloadData" v-for="square in visibleSquares" :key="square.id" class="square" :style="getSquareStyle(square)" @mouseenter="square.showTooltip = true"
           @mouseleave="square.showTooltip = false">
        <div v-if="square.showTooltip & this.destroy_location_flag" class="hover_container1" color="red">
          <div>id:{{square.id}}</div>
          <div>pre_hash:{{square.pre_hash}}</div>
          <div>des_hash:{{square.des_hash}}</div>
        </div>
        <div v-if="square.showTooltip & !this.destroy_location_flag" class="hover_container2" color="red">
          id:{{square.id}}
        </div>
      </div>
      <div v-if="showLoadMore" class="load-more" @click="More">加载更多</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
// import { audit } from '@/api/index.ts'
export default {
  name: 'Network',
  data() {
    return {
      selectedDatabase: '',
      databases: [
        { value: 'email_txt', label: 'email_txt' },
        { value: 'img_m', label: 'img_m' },
        { value: 'img_million', label: 'img_million' },
        { value: 'text', label: 'text' },
      ],
      blockCount: '',
      auditResult: '',
      totalAuditTime: '',
      readTime: "",
      computeTime: "",
      preparationTime: "",
      proveTime: "",
      dialog_show: false,
      node_num: '',
      destroy_flag: false,
      destroy_location_flag: false,
      num: 0,
      Width: { 'width': '0px' },
      squares: [],
      visibleSquares: [],
      destroySquares: [],
      pageSize: 500,
      currentPage: 1,
      showLoadMore: true,
      showTooltip: false, // 控制提示框的显示与隐藏
      isReloadData: true,  //动态刷新展示的div
      recovery_flag: true,
    }
  },
  // mounted() {
  //   this.generateSquares()
  //   this.loadVisibleSquares()
  // },
  created() {

  },
  methods: {
    generateSquares() {
      // 生成所有的正方形数据
      this.squares = []
      let nums = 450000
      if (this.blockCount < nums) {
        nums = this.blockCount
      }
      for (let i = 0; i < nums; i++) {
        this.squares.push({ id: i, color: 'rgb(144, 238, 144)', showTooltip: false})
      }
    },
    loadVisibleSquares(squares) {
      //先刷新 在加载
      this.visibleSquares = []
      this.reload()
      // 加载当前页可见的正方形数据
      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize - 1
      this.visibleSquares = squares.slice(0, endIndex + 1)
      // this.visibleSquares =this.squares.slice(startIndex, endIndex + 1)
      console.log('-------Vis--------')
      console.log(startIndex)
      console.log(endIndex)
    },
    getSquareStyle(square) {
      // 获取正方形的样式
      return {
        width: '30px',
        height: '30px',
        background: square.color,
        margin: '10px'
      }
    },
    More() {
      // 加载更多的正方形数据
      if (!this.destroy_flag && this.currentPage * this.pageSize >= this.squares.length) {
        this.showLoadMore = false
        return
      }
      if (this.destroy_flag && this.currentPage * this.pageSize >= this.destroySquares.length) {
        this.showLoadMore = false
        return
      }
      this.currentPage++
      if (this.destroy_flag) {
        this.loadVisibleSquares(this.destroySquares)
      } else {
        this.loadVisibleSquares(this.squares)
      }
    },
    changecolor(squares) {
      for (let i = 0; i < squares.length; i++) {
        squares[i].color = 'rgb(251,180,183)'
      }
      // this.generateSquares()
    },
    deleteLastAudit() {
      this.blockCount = ""
      this.auditResult = ""
      this.totalAuditTime = ""
      this.readTime = ""
      this.computeTime = ""
      this.preparationTime = ""
      this.proveTime = ""
      this.visibleSquares = []
      this.squares = []
      this.destroySquares = []
      this.destroy_flag = false
      // this.loadVisibleSquares(this.squares)
      // this.loadVisibleSquares(this.squares)
    },
    // audit() {
    //   // Simulate an audit process
    //   this.blockCount = 1000; // replace with actual logic to get block count
    //   this.auditResult = '通过'; // replace with actual audit result
    //   this.auditTime = new Date().toLocaleString(); // replace with actual audit time
    // }
    audit() {
      if (!this.selectedDatabase) {
        this.$notify({
          title: '错误',
          message: '请选择数据库',
          type: 'error',
          duration: 2000
        });
        return;
      }
      this.destroy_location_flag = false;
      axios({
        method: 'post',
        url: 'http://localhost:7002/audit',
        responseType: 'json',
        data: {
          databaseName: this.selectedDatabase
        },
        timeout: 10 * 60 * 1000
      })
        .then(response => {
          this.blockCount = response.data.blockCount;
          this.auditResult = response.data.auditResult;
          this.totalAuditTime = response.data.totalAuditTime;
          this.readTime = response.data.readTime;
          this.computeTime= response.data.computeTime;
          this.preparationTime = response.data.preparationTime;
          this.proveTime = response.data.proveTime;
          if (this.auditResult == "Success") {
            this.visibleSquares = []
            this.generateSquares();
            this.loadVisibleSquares(this.squares);
            this.$notify({
              title: '成功',
              message: '审计成功',
              type: 'success',
              duration: 2000
            });
          } else {
            throw new Error("audit failed")
          }
        })
        .catch(error => {
          this.$notify({
            title: '错误',
            message: '审计失败',
            type: 'error',
            duration: 2000
          });
          console.error(error);
          // if (this.squares) {
          this.generateSquares();
          this.changecolor(this.squares)
          this.loadVisibleSquares(this.squares)
          // }
        });
    },
    destroy() {
      if (!this.selectedDatabase) {
        this.$notify({
          title: '错误',
          message: '请选择数据库',
          type: 'error',
          duration: 2000
        });
        return;
      }
      axios({
        method: 'post',
        url: 'http://localhost:7002/destroy',
        responseType: 'json',
        data: {
          databaseName: this.selectedDatabase,
        },
        timeout: 10 * 60 * 1000
      })
        .then(response => {
          this.destroy_flag = true
          this.visibleSquares = []
          // const destroy_locations = response.data.location;
          // const pre_hashs = response.data.pre_hash;
          // const des_hashs = response.data.des_hash;
          // this.destroySquares = []
          // for (let i = 0; i < destroy_locations.length; i++) {
          //   // this.destroySquares.push({ id: destroy_locations[i], color: 'rgb(141,170,220)'})
          //   this.destroySquares.push({ id: destroy_locations[i], color: 'rgb(220,20,60)', pre_hash: pre_hashs[i], des_hash: des_hashs[i], showTooltip: false})
          //   // this.destroySquares[i].color = 'darked'
          // }
          this.$notify({
            title: '成功',
            message: '破坏成功',
            type: 'success',
            duration: 2000
          })
        }).catch(err => {
        this.$notify({
          title: '失败',
          message: '破坏失败',
          ype: 'warning',
          duration: 1000
        })
      })
    },
    destroy_location() {
      if (!this.selectedDatabase) {
        this.$notify({
          title: '错误',
          message: '请选择数据库',
          type: 'error',
          duration: 2000
        });
        return;
      }
      axios({
        method: 'post',
        url: 'http://localhost:7002/destroy_location',
        responseType: 'json',
        data: {
          databaseName: this.selectedDatabase,
        },
        timeout: 10 * 60 * 1000
      })
        .then(response => {
          const destroy_locations = response.data.location;
          const pre_hashs = response.data.pre_hash;
          const des_hashs = response.data.des_hash;
          if (destroy_locations.length == 0) {
            this.$notify({
              title: '错误',
              message: '数据库未被破坏',
              type: 'error',
              duration: 2000
            });
          } else {
            this.destroySquares = []
            this.destroy_flag = true
            this.destroy_location_flag = true
            for (let i = 0; i < destroy_locations.length; i++) {
              // this.destroySquares.push({ id: destroy_locations[i], color: 'rgb(141,170,220)'})
              this.destroySquares.push({ id: destroy_locations[i], color: 'rgb(220,20,60)', pre_hash: pre_hashs[i], des_hash: des_hashs[i], showTooltip: false})
              // this.destroySquares[i].color = 'darked'
            }
            this.loadVisibleSquares(this.destroySquares)
            this.$notify({
              title: '成功',
              message: '定位成功',
              type: 'success',
              duration: 2000
            })
          }
        }).catch(err => {
        this.$notify({
          title: '失败',
          message: '定位失败',
          type: 'warning',
          duration: 1000
        })
      })
    },
    recovery() {
      if (!this.selectedDatabase) {
        this.$notify({
          title: '错误',
          message: '请选择数据库',
          type: 'error',
          duration: 2000
        });
        return;
      }
      axios({
        method: 'post',
        url: 'http://localhost:7002/recovery',
        responseType: 'json',
        data: {
          databaseName: this.selectedDatabase,
        },
        timeout: 10 * 60 * 1000
      }).then(response => {
        if (response.data.state == "success") {
          this.visibleSquares = []
          this.destroySquares = []
          this.destroy_flag = false
          // this.loadVisibleSquares(self.destroySquares)
          this.$notify({
            title: '成功',
            message: '恢复成功',
            type: 'success',
            duration: 2000
          })
        } else if (response.data.state == "failed") {
          this.$notify({
            title: '错误',
            message: '数据库未被破坏',
            type: 'error',
            duration: 2000
          });
        } else {
          throw new Error("recovery failed")
        }
      }).catch(err => {
        this.$notify({
          title: '失败',
          message: '恢复失败',
          type: 'warning',
          duration: 1000
        })
      })
    },
    reload () {
      this.isReloadData = false;
      this.$nextTick(() => {
        this.isReloadData = true;
      })
    }
  }
}
</script>

<style>
.square {
  position: relative;
  display: inline-block;
}
.load-more {
  text-align: center;
  margin-top: 10px;
  cursor: pointer;
}
.tooltip {
  position: absolute;
  top: 100%; /* 根据需要调整位置 */
  left: 50%; /* 居中显示 */
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  /* 其他样式，如箭头、阴影等 */
  /* 注意：你可能需要添加z-index以确保提示框在其他内容之上 */
  z-index: 10;
  /* 隐藏直到需要显示 */
  opacity: 0;
  transition: opacity 0.3s ease; /* 添加过渡效果 */
}
.hover_container1 {
  width: 700px;
  height: 150px;
  border: 1px solid aliceblue;
  border-radius: 8px;
  background-color: aliceblue;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 10px;
  position: absolute;
  left: 50px;
  top: 50%;
  z-index: 99;
  transform: translateY(-50%);
}

.hover_container1 div {
  margin: 5px 0; /* 在垂直方向上留一些间距 */
  padding: 2px;
  width: 100%; /* 子元素宽度 */
  text-align: left;
}

.hover_container2 {
  width: 100px;
  height: 100px;
  border: 1px solid aliceblue;
  border-radius: 8px;
  background-color: aliceblue;
  text-align: center;
  line-height: 98px;
  position: absolute;
  left: 50px;
  top: 50%;
  z-index: 99;
  transform: translateY(-50%);
}

#loadingBar {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 900px;
  width: 100%;
  background-color: gainsboro;
  transition: all 0.5s ease;
  opacity: 1;
}
#wrapper {
  position: relative;
  height: 800px;
  width: 100%;
}
#text {
  position: absolute;
  top: 8px;
  left: 530px;
  width: 30px;
  height: 50px;
  margin: auto;
  font-size: 22px;
  color: #000000;
}
div.outerBorder {
  position: relative;
  top: 400px;
  width: 600px;
  height: 44px;
  margin: auto;
  border: 8px solid rgba(0, 0, 0, 0.1);
  background: white;
  background: linear-gradient(to bottom, rgba(252, 252, 252, 1) 0%, rgba(237, 237, 237, 1) 100%);
  border-radius: 72px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}
#border {
  position: absolute;
  top: 5px;
  left: 10px;
  bottom: 2px;
  width: 500px;
  height: 25px;
  margin: auto;
  border-radius: 10px;
}
#bar {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 20px;
  height: 20px;
  margin: auto;
  border-radius: 11px;
  border: 2px solid rgba(30, 30, 30, 0.05);
  background: rgb(0, 173, 246);
}
</style>
