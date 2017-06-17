<script>
export default {
    name: 'v-pviewer',
    props: {
        list: {
            type: Array,
            default: () => []
        },
        value: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            imgList: [],
            show: false,
            boxWidth: 0,
            sliderMargin: 30,
            opacity: 1,
            count: 0,
            activeIndex: 0,
            activeImg: false,
            activeNode: false,
            startPosition: {
                x: 0,
                y: 0
            },
            position: {
                x: 0,
                y: 0
            },
            startZoomPosition: {
                x: 0,
                y: 0
            },
            zoomPosition: {
                x: 0,
                y: 0
            },
            zoomSize: 1,
            startDire: false,//方向锁定
            moving: false,
            zoom: false,
            step: 50
        }
    },
    methods: {
        tstart(evt) {
            if (!evt.touches) return;
            // console.log(evt);
            let now = Date.now();
            this.tap = true;
            this.x1 = evt.touches[0].clientX;
            this.y1 = evt.touches[0].clientY;
            this.startDire = false;
            if (this.zoom === false) {
                this.startPosition.x = this.position.x;
                this.startPosition.y = this.position.y;
            } else {
                this.startZoomPosition.x = this.zoomPosition.x;
                this.startZoomPosition.y = this.zoomPosition.y;
                if (this.overflow === true) {
                    this.overflowed = true;
                }
            }
        },
        tmove(evt) {
            if (!evt.touches) return;
            this.x2 = evt.touches[0].clientX;
            this.y2 = evt.touches[0].clientY;
            let xd = this.x2 - this.x1;
            let yd = this.y2 - this.y1;
            let absYd = Math.abs(yd);
            if (Math.abs(xd) > 5 || absYd > 5) {
                this.tap = false;
            } else {
                return;
            }
            // console.log(xd, this.tap);
            if (this.zoom === false || this.overflowed === true) {
                if (this.count <= 1) {
                    return;
                }
                if (this.startDire === false) {
                    this.startDire = this._swipeDirection(this.x1, this.x2, this.y1, this.y2);
                }
                if (this.zoom === false && (this.startDire === 'Up' || this.startDire === 'Down')) {
                    this.opacity = 1 - (absYd / 300);
                    this.$refs.box.style.opacity = this.opacity;
                    // console.log(yd);
                    this.position.y = this.startPosition.y + yd;
                    if (this.activeNode === false) {
                        this.activeNode = evt.target;
                    }
                    this._tranform(this.activeNode, { x: 0, y: this.position.y });
                    // this.activeNode.style.transform = 'translate3d(0,' + this.position.y + 'px,0)';
                } else {
                    this.position.x = this.startPosition.x + xd;
                    this.$refs.list.style.transition = '';
                    this.moveWrap();
                }
            } else {
                let px = this.startZoomPosition.x + xd;
                let py = this.startZoomPosition.y + yd;
                if (px > this.zoomMaxWidth.left) {
                    px = this.zoomMaxWidth.left;
                    this.overflow = true;
                } else if (px < this.zoomMaxWidth.right) {
                    px = this.zoomMaxWidth.right;
                    this.overflow = true;
                } else {
                    this.reSetOverflow();
                }
                // console.log(this.overflow);
                this.zoomPosition.x = px;
                this.zoomPosition.y = py;
                this._tranform(this.activeImg, { x: px, y: py }, { x: this.zoomSize, y: this.zoomSize });
            }
        },
        tend(evt) {
            if (!evt.changedTouches) return;
            if (this.opacity !== 1) {
                if (this.opacity < 0.65) {
                    this.hide();
                    setTimeout(() => {
                        this.reSetActiveNode();
                    }, 400);
                } else {
                    this.reSetActiveNode();
                }
            }
            if (this.show === false) {
                return;
            }
            let now = Date.now();
            let speed = now - this.now;
            if (this.tap === true && this.moving === false && now - this.lastEndNow < 300 && evt.target.className === 'v-pviewer-img') {
                this.activeImg = evt.target;
                this.zoomImg(evt.changedTouches[0]);
            } else if (this.tap === false && (this.zoom === false || this.overflowed === true)) {
                let moveLen = this.position.x - this.startPosition.x;
                // let step = this.overflowed === true ? 120 : this.step;
                let step = this.step;
                this.$refs.list.style.transition = 'all .3s ease';
                if (speed < 300 && moveLen < 0 || moveLen <= -(step)) {
                    this.goNext();
                } else if (speed < 300 && moveLen > 0 || moveLen >= step) {
                    this.goPre();
                } else {
                    this.reSetPosition();
                }
            }
            this.lastEndNow = now;
        },
        moveWrap(isTmove) {
            if (this.position.x > 0) {
                this.startPosition.x = 0;
            } else if (this.position.x < -(this.maxPosition)) {
                this.position.x = -(this.maxPosition);
            } else {
                this.moving = true;
                this._tranform(this.$refs.list, { x: this.position.x, y: 0 });
                if (isTmove) return;
                this.moving = false;
            }
        },
        goNext() {
            if (this.activeIndex < this.count - 1) {
                this.activeIndex++;
                this.position.x = this.boxWidth * this.activeIndex * -1;
            }
            let activeImgData = this.imgList[this.activeIndex];
            this._emit('slide-next', activeImgData);
            this.moveWrap();
            this.reSetZoom();
            this._emit('slide-end', activeImgData);
        },
        goPre() {
            if (this.activeIndex === 0) {
                this.position.x = 0;
            } else {
                this.activeIndex--;
                this.position.x = this.boxWidth * this.activeIndex * -1;
            }
            let activeImgData = this.imgList[this.activeIndex];
            this._emit('slide-next', activeImgData);
            this.moveWrap();
            this.reSetZoom();
            this._emit('slide-end', activeImgData);
        },
        reSetPosition(jump) {
            this.reSetOverflow();
            if (jump === true) {
                this.position.x = this.boxWidth * this.activeIndex * -1;
            } else {
                this.moving = true;
                this.position.x = this.startPosition.x;
            }
            let activeImgData = this.imgList[this.activeIndex];
            this.moveWrap();
            this._emit('slide-end', activeImgData);
        },
        reSetOverflow() {
            this.overflow = false;
            this.overflowed = false;
        },
        reSetZoom() {
            this.reSetOverflow();
            setTimeout(() => {
                if (this.zoom === true) {
                    this.zoomImg();
                }
            });
        },
        zoomImg() {
            let img = this.activeImg;
            if (!img) {
                return;
            }
            img.style.transition = 'all .3s ease';
            this.overflow = false;
            if (this.zoom === false) {
                let clientRect = img.getBoundingClientRect();
                let boxWidth = this.boxWidth - this.sliderMargin;
                let width = clientRect.width;
                let height = clientRect.height;
                let rate = boxWidth / width;
                let _rate = parseInt(rate + 3);
                let cx = parseInt((this.x1 - clientRect.left) / width * 100);
                let _cx = rate > 1 ? 50 : cx;
                let cy = parseInt((this.y1 - clientRect.top) / clientRect.height * 100);
                let zoomMaxWidth = (width * _rate - boxWidth);
                let leftMaxWidth = zoomMaxWidth * (_cx / 100);
                // console.log(rate, clientRect.width, boxWidth);
                this.zoomSize = _rate;
                this.zoomMaxWidth = {
                    left: leftMaxWidth,
                    right: -(zoomMaxWidth - leftMaxWidth)
                };
                // console.log(this.zoomMaxWidth);
                img.style.transformOrigin = _cx + '%' + cy + '% 0';
                this._tranform(img, false, { x: _rate, y: _rate });
                this.zoom = true;
            } else {
                img.style.transform = '';
                img.style.transformOrigin = '';
                this.zoom = false;
                this.zoomSize = 1;
                this.zoomPosition.x = this.startZoomPosition.x = 0;
                this.zoomPosition.y = this.startZoomPosition.y = 0;
                this.activeImg = false;
            }
            setTimeout(() => {
                img.style.transition = '';
            }, 300);
        },
        clicked(evt) {
            let className = evt.target.className;
            if (className.indexOf('v-pviewer-zoom') !== -1) {
                this.show = false;
            }
        },
        hide() {
            this.show = false;
            this.zoom = false;
            this.overflow = false;
            this.moving = false;
        },
        reSetActiveNode() {
            this.$refs.box.style.opacity = this.opacity = 1;
            if (this.activeNode !== false) {
                this.activeNode.style.transform = '';
                this.activeNode = false;
            }
            if (this.zoom === false) {
                this.position.y = this.startPosition.y = 0;
            }
        },
        getListFromImg(callback) {
            let container = this.$slots.default[0];
            if (!container) return;
            let imgs = container.elm.getElementsByTagName('img');
            let imgArr = [];
            if (!imgs.length) return;
            this.count += imgs.length;
            this.maxPosition = (this.boxWidth) * (this.count - 1);
            Array.prototype.forEach.call(imgs, (img, index) => {
                let item = {
                    img: img.getAttribute('src'),
                    title: img.getAttribute('title'),
                    desc: img.getAttribute('desc')
                };
                img.setAttribute('v-index', index);
                imgArr.push(item);
                this.bindClick(img);
            });
            this.imgList = imgArr;
            if (callback && callback instanceof Function) {
                callback();
            }
        },
        bindClick(img) {
            img.addEventListener('click', e => {
                this.activeIndex = e.target.getAttribute('v-index') * 1;
                this.reSetPosition(true);
                this.show = true;
            });
        },
        _tranform(node, t, s) {
            let T = t || { x: 0, y: 0 };
            let S = s || { x: 1, y: 1 };
            let value = `matrix(${S.x},0,0,${S.y},${T.x},${T.y})`;
            node.style.transform = value;
            node.style.WebkitTransform = value;
        },
        updateList() {
            this.count = this.imgList.length;
            this.maxPosition = (this.boxWidth) * (this.count - 1);
        },
        _swipeDirection: function (x1, x2, y1, y2) {
            return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
        },
        _emit(eventName, data) {
            this.$emit(eventName, { value: data, index: this.activeIndex });
        }
    },
    computed: {
        desc: function () {
            let item = this.imgList[this.activeIndex];
            return item ? item.desc : '';
        }
    },
    watch: {
        zoom: function (val) {
            this._emit('zoom', val);
        },
        list: function (val) {
            // console.log(val);
            this.imgList.push(val[val.length - 1]);
            this.updateList()
        },
        value: function (val) {
            this.show = val;
        },
        show: function (val) {
            this.show = val;
            this.$emit('input', val);
        }
    },
    created() {
        this.position.x = 0;
        this.boxWidth = window.innerWidth + this.sliderMargin;
        this.boxHeight = window.innerHeight;
    },
    mounted() {
        this.getListFromImg(() => {
            this.show = this.value;
            this.imgList = this.imgList.concat(this.list);
            console.log(this.imgList, this.list);
            this.updateList()
        });
    }
}

</script>
<template>
    <div class="v-pviewer-wrap" ref="wrap">
        <slot></slot>
        <transition name="v-pviewer">
            <div class="v-pviewer-box" ref="box" v-show="show" @touchstart="tstart" @touchmove.prevent="tmove" @touchend="tend" @click="clicked">
                <slot name="header">
                    <div class="v-pviewer-header" v-show="!zoom" @click="show = false">
                        <span class="v-pviewer-index">
                            <a>{{activeIndex+1}}</a>/{{count}}</span>
                    </div>
                </slot>
                <ul class="v-pviewer-list" ref="list">
                    <li class="v-pviewer-slider" v-for="(item,$index) in imgList" :style="{'transform':'translate3d(' + (boxWidth)*$index + 'px,0,0)'}">
                        <div class="v-pviewer-zoom">
                            <img class="v-pviewer-img" :src="item.img" :alt="item.title">
                        </div>
                    </li>
                </ul>
                <slot name="footer">
                    <div class="v-pviewer-footer" v-show="desc&&!zoom">
                        <p class="v-pviewer-desc">{{desc}}</p>
                    </div>
                </slot>
            </div>
        </transition>
    </div>
</template>
<style lang="less">
.v-pviewer-wrap {
    .v-pviewer-box {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        background: #353535;
        z-index: 1000;
        width: 100%;
        height: 100%;
        width: 100vw;
        height: 100vh;
    }
    .v-pviewer-list {
        position: relative;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        li {
            list-style-type: none;
        }
    }
    .v-pviewer-slider {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .v-pviewer-zoom {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            // display: block;
            max-width: 100%;
            max-height: 100%; // position: absolute;
            // top: 50%;
            // left: 50%;
            // transform: translate(-50%, -50%);
        }
    }
    .v-pviewer-header {
        color: #fff;
        position: absolute;
        z-index: 10;
        top: 0;
        left: 0;
        right: 0;
        text-align: center;
        .v-pviewer-index {
            line-height: 2;
            font-size: 12px;
        }
    }
    .v-pviewer-footer {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 10;
        color: #fff;
        width: 100%;
        height: 80px;
        padding: 3px 5px;
        box-sizing: border-box;
        background: rgba(0, 0, 0, .5);
    }
    .v-pviewer-desc {
        font-size: 12px;
        padding: 0 5px;
        margin: 0;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
    }
}

.v-pviewer-moving {
    transition: all .4s ease;
}

.v-pviewer-enter {
    opacity: 0;
    transform: translate3d(105%, 0, 0);
    -webkit-transform: translate3d(105%, 0, 0);
}

.v-pviewer-leave-active {
    opacity: 0;
    transform-origin: 50% 50%;
    transform: matrix(.1, 0, 0, .1, 0, 0);
    -webkit-transform: matrix(.1, 0, 0, .1, 0, 0);
}

.v-pviewer-enter-active,
.v-pviewer-leave-active {
    transition: all .3s ease;
}
</style>
