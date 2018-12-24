<template>
  <div class="indicator">
    <div class="circle">
      <canvas class="canvas_1" id="canvas_1" width="132" height="132" ref="canvas_1"></canvas>
      <canvas class="canvas_2" id="canvas_2" width="132" height="132" ref="canvas_2"></canvas>
      <div class="content">
        <span class="top" :style="{color:numcolor}">{{percent}}%</span>
        <div class="line"></div>
        <span class="bottom" :style="{color:fontcolor}">{{index}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "indicator",
    props: {
      numcolor: String,
      fontcolor: String,
      percent: Number,
      index: String,
      lineFirstColor: String,
      lineEndColor: String,
      maskBackground: String
    },
    mounted(){
      this.inte(this.percent);
    },
    methods: {
      inte(percent) {
        var canvas_1=this.$refs['canvas_1']
        var canvas_2 = this.$refs['canvas_2'];
        var ctx_1 = canvas_1.getContext('2d');
        var ctx_2 = canvas_2.getContext('2d');
        ctx_1.lineWidth = 6;
        ctx_1.strokeStyle = "#DADFEC";
        //画底部的灰色圆环
        ctx_1.beginPath();
        ctx_1.arc(canvas_1.width / 2, canvas_1.height / 2, canvas_1.width / 2 - ctx_1.lineWidth / 2, 0, Math.PI * 2, false);
        ctx_1.closePath();
        ctx_1.stroke();
        if (percent < 0 || percent > 100) {
          throw new Error('percent must be between 0 and 100');
          return
        }
        ctx_2.lineWidth = 6;
        var gradient = ctx_2.createLinearGradient(canvas_2.width / 2, 0, canvas_2.width / 2, canvas_2.height);
        gradient.addColorStop("0", "#F19938");
        gradient.addColorStop("1.0", "#F9C969");
        ctx_2.strokeStyle = gradient;
        var angle = 0;
        var timer;
        (function draw() {
          timer = requestAnimationFrame(draw);
          ctx_2.clearRect(0, 0, canvas_2.width, canvas_2.height);
          //百分比圆环
          ctx_2.beginPath();
          ctx_2.arc(canvas_2.width / 2, canvas_2.height / 2, canvas_2.width / 2 - ctx_2.lineWidth / 2, 0, angle * Math.PI / 180, false);
          angle = angle + 10;
          var percentAge = parseInt((angle / 360) * 100)
          if (angle > (percent / 100 * 360)) {
            percentAge = percent;
            window.cancelAnimationFrame(timer);
          }
          ;
          ctx_2.stroke();
          ctx_2.closePath();
          ctx_2.save();
          ctx_2.beginPath();
          ctx_2.rotate(90 * Math.PI / 180)
          ctx_2.closePath();
          ctx_2.restore();
        })()
      }
    }
  }


</script>

<style lang="scss" scoped>
  .indicator {
    text-align: center;
    .circle{
      width: 264px;
      height: 264px;
      position: relative;
      background: white;
      canvas{
        display: block;
        margin: 0;
        position: absolute;
        left: 0;
        top: 0;
      }
      .canvas_1{
        z-index: 1
      }
      .canvas_2{
        z-index: 2;
        background: transparent;
        transform:rotate(-90deg);
      }
      .content{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        .top{
          font-size: 40px;
          font-weight: bold;
        }
        .line{
          border-top: 2px solid rgb(151,151,151);
          width: 208px;
          margin: 16px 0;
        }
      }
    }

  }
</style>
