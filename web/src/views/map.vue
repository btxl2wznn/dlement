<!--  -->
<template>
  <div class="map">
    <div class="navbar w-100">
      <img class="login" src="../assets/img/dlm.png" alt />
      <div class="search">
        <img src="../assets/img/search.svg" alt />
        <input ref="input" @keyup.13="handleKeyUp" v-model="search" class="f-md ml-1" type="text" />
      </div>
      <router-link :to="toProfile()" tag="div">
        <img v-show="!isAvatar" class="avatar ml-2" src="../assets/img/头像.svg" alt />
        <img v-show="isAvatar" class="avatar ml-2" :src="avatar" alt />
      </router-link>
    </div>
    <scroll
      class="mapContent"
      ref="scroll"
      @scroll="contScroll"
      @pullDown="loadmore"
      :pull-upLoad="false"
      :scrollX="true"
    >
      <!-- <div v-show="beforePullDown" class="pulldown-wrapper">
        <div v-show="!beforePullDown">
          <div v-show="isPullingDown">
            <span>Loading...</span>
          </div>
          <div v-show="!isPullingDown"><span>Refresh success</span></div>
        </div>
      </div>-->
      <div class="kdmap">
        <div ref="pullDown" class="pulldown-bswrapper f-md">
          <div v-show="beforePullDown">
            <span v-show="!loading">下拉刷新</span>
          </div>
          <div v-show="!beforePullDown">
            <div v-show="isPullingDown">
              <span v-show="!loading">释放刷新</span>
            </div>
          </div>
          <div v-show="loading">
            <span v-show="!isFinish">
              <van-loading type="spinner" size="16" />
            </span>
            <span v-show="isFinish">加载成功</span>
          </div>
        </div>

        <div class="allI">
          <div v-if="isIf('七区食堂')" style="pointerEvents: none !important" class="aixin qiqushitang">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('七区')" style="pointerEvents: none !important" class="aixin qiqu">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>

          <div v-if="isIf('外语楼')" style="pointerEvents: none !important" class="aixin waiyulou">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div
            v-if="isIf('国际教育楼')"
            style="pointerEvents: none !important"
            class="aixin guojijiaoyu"
          >
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('美术楼')" style="pointerEvents: none !important" class="aixin meishulou">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('第一田径场')" style="pointerEvents: none !important" class="aixin diyitian">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('体育楼')" style="pointerEvents: none !important" class="aixin tiyulou">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('训练馆')" style="pointerEvents: none !important" class="aixin xunlianguan">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('第一体育馆')" style="pointerEvents: none !important" class="aixin diyiti">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div
            v-if="isIf('六区一食堂')"
            style="pointerEvents: none !important"
            class="aixin liuquyishitang"
          >
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div
            v-if="isIf('六区二食堂')"
            style="pointerEvents: none !important"
            class="aixin liuquershitang"
          >
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('六区')" style="pointerEvents: none !important" class="aixin liuqu">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('十教')" style="pointerEvents: none !important" class="aixin shijiao">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('第二图书馆')" style="pointerEvents: none !important" class="aixin diertu">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('化学楼')" style="pointerEvents: none !important" class="aixin huaxuelou">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('化工楼')" style="pointerEvents: none !important" class="aixin huagonglou">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('七区食堂')" style="pointerEvents: none !important" class="aixin wulilou">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('物理楼')" style="pointerEvents: none !important" class="aixin dujuanyuan">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('八区食堂')" style="pointerEvents: none !important" class="aixin baqushitang">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('八区')" style="pointerEvents: none !important" class="aixin baqu">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('五区食堂')" style="pointerEvents: none !important" class="aixin wuqushitang">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('五区')" style="pointerEvents: none !important" class="aixin wuqu">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('第二田径场')" style="pointerEvents: none !important" class="aixin diertian">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('樱花园')" style="pointerEvents: none !important" class="aixin yinghuayuan">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div
            v-if="isIf('校园卡中心')"
            style="pointerEvents: none !important"
            class="aixin xiaoyuankazhongxin"
          >
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('桂花园')" style="pointerEvents: none !important" class="aixin guihuayuan">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('明湖')" style="pointerEvents: none !important" class="aixin minhu">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('九教')" style="pointerEvents: none !important" class="aixin jiujiao">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('含笑园')" style="pointerEvents: none !important" class="aixin hanxiaoyuan">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('八教')" style="pointerEvents: none !important" class="aixin bajiao">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('北门')" style="pointerEvents: none !important" class="aixin beimen">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('月湖')" style="pointerEvents: none !important" class="aixin yuehu">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('立功楼')" style="pointerEvents: none !important" class="aixin ligonglou">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('立言楼')" style="pointerEvents: none !important" class="aixin liyanlou">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('立志楼')" style="pointerEvents: none !important" class="aixin lizhilou">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('立德楼')" style="pointerEvents: none !important" class="aixin lideilou">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('东门')" style="pointerEvents: none !important" class="aixin dongmen">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div
            v-if="isIf('实验中心')"
            style="pointerEvents: none !important"
            class="aixin shiyanzhongxin"
          >
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('逸夫楼')" style="pointerEvents: none !important" class="aixin yifulou">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('土木楼')" style="pointerEvents: none !important" class="aixin tumulou">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('信息楼')" style="pointerEvents: none !important" class="aixin xinxilou">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('资安楼')" style="pointerEvents: none !important" class="aixin zianlou">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('五教')" style="pointerEvents: none !important" class="aixin wujiao">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('第三体育馆')" style="pointerEvents: none !important" class="aixin disanti">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('四区')" style="pointerEvents: none !important" class="aixin siqu">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('第三田径场')" style="pointerEvents: none !important" class="aixin disantian">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('三区')" style="pointerEvents: none !important" class="aixin sanqu">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div
            v-if="isIf('创新研究院办公楼')"
            style="pointerEvents: none !important"
            class="aixin chuanxinyanjiu"
          >
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('四教')" style="pointerEvents: none !important" class="aixin sijiao">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('档案馆')" style="pointerEvents: none !important" class="aixin danganguan">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div
            v-if="isIf('三区食堂')"
            style="pointerEvents: none !important"
            class="aixin sanqushitang"
          >
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('第二体育馆')" style="pointerEvents: none !important" class="aixin dierti">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div
            v-if="isIf('南校医院')"
            style="pointerEvents: none !important"
            class="aixin nanxiaoyiyuan"
          >
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div
            v-if="isIf('北校医院')"
            style="pointerEvents: none !important"
            class="aixin beixiaoyiyuan"
          >
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('科大食府')" style="pointerEvents: none !important" class="aixin kedashifu">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div
            v-if="isIf('南校俱乐部')"
            style="pointerEvents: none !important"
            class="aixin nanxiaojuleibu"
          >
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div
            v-if="isIf('创新创业基地')"
            style="pointerEvents: none !important"
            class="aixin chuangxinjidi"
          >
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('三教')" style="pointerEvents: none !important" class="aixin sanjiao">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('二区')" style="pointerEvents: none !important" class="aixin erqu">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('收发室')" style="pointerEvents: none !important" class="aixin shoufashi">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('招待所')" style="pointerEvents: none !important" class="aixin zhaodaisuo">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('第一图书馆')" style="pointerEvents: none !important" class="aixin diyitu">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('一教')" style="pointerEvents: none !important" class="aixin yijiao">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('二教')" style="pointerEvents: none !important" class="aixin erjiao">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div
            v-if="isIf('一区篮球场')"
            style="pointerEvents: none !important"
            class="aixin yiqunanqiuchang"
          >
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('一区')" style="pointerEvents: none !important" class="aixin yiqu">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('一区食堂')" style="pointerEvents: none !important" class="aixin yiqushitang">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('潇湘楼')" style="pointerEvents: none !important" class="aixin xiaoxianglou">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('音乐楼')" style="pointerEvents: none !important" class="aixin yingyuelou">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div
            v-if="isIf('南校活动中心')"
            style="pointerEvents: none !important"
            class="aixin nanxiaohuodong"
          >
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
          <div v-if="isIf('南门')" style="pointerEvents: none !important" class="aixin nanmen">
            <i v-show="isShow == true" :class="aixinIcon" class="iconfont"></i>
          </div>
        </div>
        <img
          src="../assets/img/kd.jpg"
          width="100%"
          height="100%"
          usemap="#kdmap"
          alt
          style="border-style:none;"
          ref="kdimg"
          @load="upload()"
        />
        <map id="kdmap" name="kdmap" ref="kdmap">
          <area
            shape="poly"
            alt
            coords="301, 253, 239, 315, 247, 340, 300, 355, 355, 286"
            @click="goDetils(place['六区'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="237, 68, 208, 82, 204, 124, 215, 151, 235, 149, 253, 128, 261, 124, 267, 90, 259, 73, 248, 63"
            @click="goDetils(place['七区食堂'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="282, 96, 254, 130, 238, 150, 245, 196, 291, 198, 311, 169, 331, 131, 377, 100, 370, 82, 332, 82, 297, 101"
            @click="goDetils(place['七区'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="344, 133, 322, 170, 330, 194, 364, 195, 389, 194, 390, 151, 375, 131"
            @click="goDetils(place['外语楼'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="302, 203, 269, 217, 298, 255, 347, 267, 377, 243, 369, 216, 340, 207"
            @click="goDetils(place['国际教育楼'].id)"
            title
          />
          <area
            shape="rect"
            alt
            coords="404, 99, 513, 208"
            @click="goDetils(place['第一田径场'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="388, 217, 443, 223, 426, 257, 384, 256"
            @click="goDetils(place['美术楼'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="210, 245, 214, 280, 229, 293, 264, 284, 267, 250"
            @click="goDetils(place['六区一食堂'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="158, 281, 151, 307, 203, 345, 232, 345, 233, 313, 215, 293"
            @click="goDetils(place['六区二食堂'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="58, 306, 33, 369, 32, 389, 77, 394, 88, 356, 87, 326"
            @click="goDetils(place['五区食堂'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="107, 335, 66, 424, 59, 445, 115, 449, 170, 368, 169, 339"
            @click="goDetils(place['五区'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="199, 350, 144, 467, 231, 491, 289, 358"
            @click="goDetils(place['第二田径场'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="50, 457, 33, 525, 104, 511, 119, 464"
            @click="goDetils(place['北校医院'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="307, 356, 267, 417, 454, 421, 436, 390, 378, 365"
            @click="goDetils(place['樱花园'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="363, 277, 338, 334, 377, 358, 407, 328, 404, 298"
            @click="goDetils(place['第二图书馆'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="382, 265, 379, 283, 423, 295, 488, 300, 507, 291, 523, 286, 542, 270, 533, 263, 495, 255, 470, 235, 441, 233, 441, 250, 424, 255"
            @click="goDetils(place['十教'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="505, 55, 505, 82, 512, 97, 552, 88, 544, 64, 526, 54"
            @click="goDetils(place['体育楼'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="516, 108, 524, 134, 562, 123, 552, 92, 524, 95"
            @click="goDetils(place['训练馆'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="521, 141, 534, 206, 596, 191, 590, 151, 586, 127"
            @click="goDetils(place['第一体育馆'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="543, 221, 578, 227, 579, 247, 571, 265, 564, 271, 550, 272, 534, 255, 540, 233"
            @click="goDetils(place['化学楼'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="543, 277, 563, 304, 590, 302, 593, 290, 599, 268, 573, 267"
            @click="goDetils(place['化工楼'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="520, 293, 521, 314, 538, 320, 561, 316, 550, 294"
            @click="goDetils(place['物理楼'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="469, 310, 412, 355, 481, 413, 503, 402, 471, 350, 505, 316, 501, 302"
            @click="goDetils(place['桂花园'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="504, 335, 484, 353, 496, 385, 516, 398, 588, 406, 606, 357, 596, 344, 569, 333, 527, 326"
            @click="goDetils(place['明湖'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="308, 431, 436, 430, 380, 515, 256, 478, 299, 430"
            @click="goDetils(place['校园卡中心'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="254, 494, 231, 541, 267, 567, 314, 530, 303, 496"
            @click="goDetils(place['校园食堂'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="444, 425, 384, 527, 433, 548, 500, 474, 469, 427"
            @click="goDetils(place['九教'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="500, 410, 495, 458, 554, 521, 590, 525, 604, 502, 623, 399, 565, 413"
            @click="goDetils(place['八教'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="494, 511, 503, 568, 557, 554, 553, 533, 522, 498, 503, 489"
            @click="goDetils(place['含笑园'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="454, 545, 469, 641, 568, 695, 651, 666, 584, 612, 565, 556, 573, 533, 530, 578"
            @click="goDetils(place['北门'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="586, 235, 628, 375, 798, 324, 768, 257, 687, 227, 601, 220"
            @click="goDetils(place['杜鹃园'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="763, 177, 714, 213, 738, 245, 810, 246, 825, 207"
            @click="goDetils(place['八区食堂'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="896, 147, 785, 275, 872, 437, 955, 415, 893, 273, 974, 172"
            @click="goDetils(place['八区'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="805, 517, 766, 557, 766, 606, 865, 656, 928, 608, 912, 554, 868, 520"
            @click="goDetils(place['立德楼'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="706, 488, 679, 549, 722, 582, 761, 546, 752, 500"
            @click="goDetils(place['立功楼'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="751, 427, 723, 470, 765, 514, 794, 487, 797, 446"
            @click="goDetils(place['立言楼'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="827, 422, 802, 458, 825, 493, 865, 502, 905, 487, 893, 457"
            @click="goDetils(place['立志楼'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="698, 603, 653, 630, 664, 667, 653, 683, 743, 712, 829, 717, 935, 688, 990, 654, 1009, 602, 997, 564, 937, 503, 886, 496, 876, 516, 917, 555, 928, 589, 930, 611, 910, 627, 871, 659, 794, 636, 731, 603"
            @click="goDetils(place['月湖'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="1056, 503, 1018, 581, 1004, 669, 1142, 666, 1179, 581, 1115, 503"
            @click="goDetils(place['东门'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="631, 689, 592, 743, 586, 776, 678, 812, 772, 809, 784, 755, 763, 721, 687, 697"
            @click="goDetils(place['实验中心'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="790, 725, 800, 768, 828, 761, 849, 742, 843, 723"
            @click="goDetils(place['逸夫楼'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="857, 708, 848, 747, 887, 756, 915, 731, 899, 710"
            @click="goDetils(place['土木楼'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="846, 751, 818, 770, 834, 810, 876, 812, 888, 768, 866, 750"
            @click="goDetils(place['信息楼'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="893, 770, 918, 775, 908, 851, 894, 863, 813, 854, 818, 833, 891, 807"
            @click="goDetils(place['资安楼'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="912, 696, 917, 745, 972, 735, 966, 699, 936, 687"
            @click="goDetils(place['五教'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="988, 675, 998, 738, 1050, 749, 1071, 732, 1067, 694, 1047, 676"
            @click="goDetils(place['四区'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="922, 751, 944, 825, 946, 855, 1011, 858, 995, 766, 976, 741"
            @click="goDetils(place['第三体育馆'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="938, 862, 934, 896, 990, 910, 1018, 881, 1011, 867, 991, 860"
            @click="goDetils(place['档案馆'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="1008, 760, 1015, 799, 1070, 792, 1066, 757, 1011, 744"
            @click="goDetils(place['第三田径场'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="1018, 804, 1038, 865, 1086, 839, 1073, 798"
            @click="goDetils(place['三区'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="1042, 868, 1049, 925, 1104, 929, 1113, 841"
            @click="goDetils(place['三区食堂'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="1043, 949, 1047, 1038, 1133, 1044, 1119, 976, 1103, 947"
            @click="goDetils(place['二区'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="840, 875, 807, 986, 924, 980, 910, 881, 867, 860"
            @click="goDetils(place['四教'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="776, 865, 781, 904, 829, 919, 842, 865, 799, 862"
            @click="goDetils(place['创新研究院办公楼'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="636, 826, 560, 944, 586, 1026, 715, 1021, 766, 823"
            @click="goDetils(place['第二体育馆'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="812, 994, 754, 1039, 767, 1098, 839, 1091, 855, 1010, 874, 1006, 879, 991"
            @click="goDetils(place['南校俱乐部'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="772, 954, 796, 959, 798, 991, 800, 1003, 759, 1021, 754, 1016"
            @click="goDetils(place['科大食府'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="687, 1032, 643, 1030, 648, 1060, 704, 1100, 725, 1102, 740, 1031, 717, 1028"
            @click="goDetils(place['南校医院'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="938, 1012, 915, 1040, 955, 1098, 1018, 1071, 1008, 1009"
            @click="goDetils(place['三教'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="899, 1115, 859, 1167, 862, 1226, 872, 1241, 959, 1239, 967, 1149, 937, 1124"
            @click="goDetils(place['第一图书馆'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="771, 1106, 709, 1138, 736, 1185, 837, 1189"
            @click="goDetils(place['收发室'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="840, 1099, 803, 1115, 828, 1162, 848, 1168, 874, 1116"
            @click="goDetils(place['招待所'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="794, 1191, 781, 1247, 775, 1257, 833, 1262, 858, 1257, 850, 1187, 787, 1192"
            @click="goDetils(place['二教'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="973, 1181, 966, 1235, 1006, 1247, 1037, 1247, 1042, 1223, 1033, 1183, 1005, 1172"
            @click="goDetils(place['一教'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="1106, 1221, 1106, 1268, 1149, 1290, 1194, 1253, 1179, 1214, 1138, 1189"
            @click="goDetils(place['一区食堂'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="968, 1257, 980, 1318, 1073, 1309, 1071, 1255"
            @click="goDetils(place['一区篮球场'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="978, 1329, 1005, 1410, 1086, 1390, 1077, 1326"
            @click="goDetils(place['潇湘楼'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="1077, 1268, 1104, 1274, 1147, 1295, 1200, 1277, 1228, 1336, 1246, 1367, 1221, 1386, 1204, 1384, 1170, 1354, 1162, 1348, 1117, 1352, 1101, 1364, 1090, 1338, 1084, 1325, 1076, 1301, 1074, 1278"
            @click="goDetils(place['一区'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="1100, 1384, 1128, 1433, 1188, 1430, 1195, 1395, 1163, 1356, 1112, 1357"
            @click="goDetils(place['南校活动中心'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="998, 1424, 1029, 1456, 1088, 1429, 1078, 1408, 1053, 1399"
            @click="goDetils(place['音乐楼'].id)"
            title
          />
          <area
            shape="poly"
            alt
            coords="867, 1261, 824, 1313, 810, 1490, 872, 1576, 994, 1483, 983, 1364, 958, 1260, 908, 1249, 860, 1263, 860, 1265"
            @click="goDetils(place['南门'].id)"
            title
          />
          <area shape="default" nohref="nohref" alt />
        </map>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "../components/scroll/scroll";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Scroll,
  },
  name: "kdmap",
  data() {
    //这里存放数据
    return {
      saveX: 0,
      saveY: 0,
      isShow: false,
      isNone: "none",
      aixinIcon: " icon-xinaixin1",
      place: {},
      search: "",
      beforePullDown: true,
      isPullingDown: false,
      loading: false,
      isFinish: false,
      avatar: "",
      isAvatar: false,
    };
  },
  computed: {},
  methods: {
    toProfile() {
      if (localStorage.usertoken) {
        return "/profile";
      } else {
        return "/login";
      }
    },
    contScroll(position) {
      this.$refs.pullDown.style.marginLeft = -position.x + "px";
      //1.判断Backtop是否显示
      this.beforePullDown = position.y < 80;
      //2.判断tabcontrol是否吸顶
      this.isPullingDown = position.y > 80;
      this.istabshow = -position.y > this.tabOffsetTop;
    },
    loadmore() {
      this.fetch();
      this.isPullingDown = false;
      this.loading = true;
      setTimeout(() => {
        this.isFinish = true;
      }, 700);
      setTimeout(() => {
        this.$refs.scroll.scroll.finishPullDown();
      }, 1500);
      setTimeout(() => {
        this.loading = false;
        this.isFinish = false;
      }, 1600);
    },
    isIf(item) {
      // setTimeout(() => {
      //   return this.place[item].id == "T";
      // }, 1000);
      if (this.place[item] == undefined) {
        return true;
      } else {
        return this.place[item].contain == "T";
      }
    },
    upload() {
      this.isShow = true;
    },
    adjust() {
      let map = document.getElementById("kdmap");
      var element = map.childNodes;
      var itemNumber = element.length;
      for (var i = 0; i < itemNumber - 1; i++) {
        var oldCoords = element[i].coords;
        var newcoords = this.adjustPosition(oldCoords);
        element[i].setAttribute("coords", newcoords);
      }
      var test = element;
    },
    adjustPosition(position) {
      var pageWidth = this.$refs.kdimg.clientWidth; //获取页面宽度
      var pageHeith = this.$refs.kdimg.clientHeight; //获取页面高度

      var imageWidth = 1280; //图片的长宽
      var imageHeigth = 1592;

      var each = position.split(",");
      //获取每个坐标点
      for (var i = 0; i < each.length; i++) {
        each[i] = Math.round(
          (parseInt(each[i]) * pageWidth) / imageWidth
        ).toString(); //x坐标
        i++;
        each[i] = Math.round(
          (parseInt(each[i]) * pageHeith) / imageHeigth
        ).toString(); //y坐标
      }
      //生成新的坐标点
      var newPosition = "";
      for (var i = 0; i < each.length; i++) {
        newPosition += each[i];
        if (i < each.length - 1) {
          newPosition += ",";
        }
      }
      return newPosition;
    },
    goDetils(id) {
      this.$router.push({
        path: "/area",
        query: {
          id: id,
        },
      });
    },
    async fetch() {
      const res = await this.$http.get("rest/allPlace");
      let obj = new Object();
      new Promise((resolve, reject) => {
        res.data.forEach((i) => {
          obj[i.pname] = new Object();
          obj[i.pname].id = i.id;
          obj[i.pname].contain = i.contain;
        });
        resolve();
      }).then(() => {
        this.place = obj;
        this.$set(this.place, obj);
      });

      // console.log(this.place);
    },
    handleKeyUp() {
      if (this.search == "") {
        this.$toast("请先输入内容");
      } else {
        this.$router.push(`allArt/${this.search}`);
      }
    },
  },
  created() {
    this.fetch();
  },
  activated() {
    this.$refs.input.value = "";
    this.search = "";
    // this.$refs.scroll.refresh();
    //console.log(JSON.parse(sessionStorage.getItem("userInfo")));

    if (JSON.parse(localStorage.getItem("userInfo"))) {
      let info = JSON.parse(localStorage.getItem("userInfo"));
      this.avatar = info.avatar;
      this.isAvatar = true;
    }
    this.$refs.scroll.scroll.scrollTo(this.saveX, this.saveY, 0);
  },
  deactivated() {
    //1.保存y值 x值
    this.saveX = this.$refs.scroll.scroll.x;
    this.saveY = this.$refs.scroll.scroll.y;
  },
  mounted() {
    //解决map area自适应图片大小
    this.adjust();
  },
  watch: {
    place: {
      handler() {},
      immediate: true,
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.map {
  width: 100%;
  height: 100%;
}
.kdmap {
  width: 230%;
  height: 1100px;
  position: relative;
}

.mapContent {
  position: absolute;
  overflow: hidden;
  top: 50px;
  bottom: 0;
  left: 0;
  right: 0;

  -webkit-overflow-scrolling: touch;
}

.aixin {
  z-index: 100;
  position: absolute;
  color: rgb(250, 8, 8);
  opacity: 0.8;
  animation: aixin 1s cubic-bezier(0.42, 0, 1, 1) 0s infinite;
}

.noneClick {
  pointer-events: none；;
}
@keyframes aixin {
  0% {
    transform: rotate(0.1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: rotate(0.1);
  }
}
</style>
