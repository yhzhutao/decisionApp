<template>
    <div class="conditionSelect">
      <div>品牌</div>
      <div class="brandSelect" @click="togglePanel">
        <div class="input_in">
          <input type="text" readonly value="长安轿车">
        </div>
        <div class="brandName"  v-show="visible" ref="main">
          <ul>
            <li>长安轿车</li>
            <li>长安轿车</li>
            <li>长安轿车</li>
            <li>长安轿车</li>
            <li>长安轿车</li>
            <li>长安轿车</li>
          </ul>
        </div>
      </div>
      <div>区域</div>
      <div>品牌</div>
    </div>
</template>

<script>
    export default {
        name: "conditionSelect",
       data(){
         return {
           visible:false
         }
       },
      methods:{
        togglePanel () {
          this.visible ? this.hide() : this.show()
        },
        show () {
          setTimeout(()=>{
            this.visible = true;
            console.log(this.visible)
            document.addEventListener('click', this.hidePanel, false);
          },0)
        },

        hide () {
          this.visible = false
          document.removeEventListener('click', this.hidePanel, false)
        },

        hidePanel (e) {
          if (!this.$refs.main.contains(e.target)) {
            this.hide()
          }
        }
      },
      beforeDestroy () {
        this.hide()
      }
    }
</script>

<style lang="scss" scoped>
  .layer{
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
  }
  .hide { display: none; }
  input { outline: none; }
  .select { position: relative; margin: 50px 0 0 100px; }
  .select .brandName { position: absolute; top: 40px; left: 0; }
  .select .brandName ul { width: 198px; border: 1px solid #d6d6d6; border-top: none; }
  .select .brandName ul li { padding-left: 10px; width: 188px; height: 40px; line-height: 40px; cursor: pointer; }
  .conditionSelect{
   display: flex;
   height: 88px;
   flex-direction: row;
    line-height: 88px;
   &>div:first-child{
     color: #F4A100;
     font-size: 32px;
     line-height: 88px;
     width: 20%;
     text-align: center;
   }
   .brandSelect{
     position: relative;
     width: 30%;
     input{
       width: 100%;
       height: 100%;
       color: #FFFFFF;
       background-color: rgba(255,255,255,0);
       outline: none;
       list-style: none;
       border: none;
     }
     &:after{
     content: "";
     width: 36px;
     height: 36px;
     background: url(../../image/more_option_icon.svg) no-repeat center;
     position: absolute;
     right: 40px;
     top: 25%;
     pointer-events: none;
     }
   }
 }
</style>
