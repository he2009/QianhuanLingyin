import {lib,get,_status,ui,game,ai} from './noname.js';
import {nonameInitialized} from '../../../noname/util/index.js' 
import {skinSwitch} from './skinSwitch.js'
// 加载settings.js配置文件
            lib.init.js(lib.assetURL + 'extension/千幻聆音/settings.js', null, function() {
                // 从settings.js中读取showTopArc配置并设置到全局变量
                if (typeof showTopArc !== 'undefined') {
                    window.showTopArc = showTopArc;
                } else {
                    window.showTopArc = true; // 默认显示顶部圆弧
                }
                
                // 从扩展配置中读取showTopArc的值（优先级高于settings.js）
                if (lib.config[skinSwitch.configKey.showTopArc] !== undefined) {
                    window.showTopArc = lib.config[skinSwitch.configKey.showTopArc];
                }
            });
            
            // 添加全局错误处理器，处理千幻语音相关的文件访问错误
            if (typeof window !== 'undefined') {
                const originalError = window.onerror;
                window.onerror = function (message, source, lineno, colno, error) {
                    // 检查是否是文件访问相关的错误
                    if (message && typeof message === 'string') {
                        if (message.includes('ENOENT') && message.includes('sanguoaudio')) {
                            console.warn('捕获到千幻语音文件访问错误:', message);
                            console.warn('这通常表示千幻聆音扩展中缺少对应的语音文件');
                            console.warn('错误已被安全处理，不会影响游戏运行');
                            return true; // 阻止错误冒泡
                        }
                    }
                    // 对于其他错误，调用原始处理器
                    if (originalError) {
                        return originalError.call(this, message, source, lineno, colno, error);
                    }
                    return false;
                };
            }

            skinSwitch.lib = lib
            skinSwitch.game = game
            skinSwitch.ui = ui
            skinSwitch.get = get

            skinSwitch.dynamic.selectSkin.cd = true;

            lib.init.css(skinSwitch.url + "style", "base")
            if (lib.config[skinSwitch.configKey.useDynamic]) {
                lib.init.css(skinSwitch.url + "style", "dynamic");
            }
            lib.init.css(skinSwitch.url + "style", "edit")
            lib.init.css(skinSwitch.url + "component", "iconfont")
            lib.init.css(skinSwitch.url + "component", "message")
            lib.init.css(skinSwitch.url + "style", "light-modal")
            lib.init.js(skinSwitch.url, 'saveSkinParams', function () {
                if (typeof window.skinSwitchLoadParams === 'function') {
                    window.skinSwitchLoadParams(lib, game, ui, get, ai, _status);
                }
            }, function () {
                skinSwitch.saveSkinParams = {}
            });
            // 加载新的ani
            lib.init.js(skinSwitch.url+'/spine-lib/', 'animation')
            lib.init.js(skinSwitch.url + 'component', 'any-touch.umd.min')
            // 覆盖十周年的spine

            skinSwitch.waitUntil(() => {
                return window.spine
            }, () => {
                lib.init.js(skinSwitch.url, 'spine', function () {
                    lib.init.js(skinSwitch.url + 'spine-lib', 'spine_4_0_64', function () {
                        lib.init.js(skinSwitch.url + 'spine-lib', 'spine_3_8', function () {
                            lib.init.js(skinSwitch.url + 'spine-lib', 'spine_4_1', function () {
                                lib.init.js(skinSwitch.url + 'spine-lib', 'spine_4_2', function () {
                                    lib.init.js(skinSwitch.url+'/spine-lib/', 'animations', function () { })
                                    lib.init.js(skinSwitch.url + 'spine-lib', 'spine_3_5_35', function () { })
                                    lib.init.js(skinSwitch.url + 'spine-lib', 'spine_3_7', function () { })
                                })
                            })
                        })
                    })
                })
            })

            lib.init.js(skinSwitch.url, 'effects', function () {
                for (let k in pfqhSkillEffect) {
                    for (let i = 0; i < pfqhSkillEffect[k].length; i++) {
                        lib.skill[`__pfqh_${k}_${i}`] = pfqhSkillEffect[k][i]
                    }
                }
            })

            let editBox  // 编辑动皮参数的弹窗
            let player   // 当前角色
            let dynamic   // 当前角色的apnode对象, 包含皮肤id
            let renderer  // 当前动皮与worker的通信中继


            // 创建UI
            game.qhly_bigEdit=function(player) {
              //  if (editBox) return
                const downEvent = lib.config.touchscreen ? 'touchstart' : 'mousedown'
                const upEvent = lib.config.touchscreen ? 'touchend' : 'mouseup'
                const cancelEvent = lib.config.touchscreen ? 'touchcancel' : 'mouseleave'

                // 当前支持调整的模式
                const modes = {
                    daiji: 'daiji',
                    chukuang: 'chukuang',
                    beijing: 'beijing',
                    qianjing: 'qianjing',
                    chuchang: 'chuchang',
                    teshu: 'teshu',
                    zhishixian: 'zhishixian',
                }
                const funcs = {
                    player: 'player',
                    qhShouSha: 'qhShouSha',  // 千幻手杀大屏
                    qhDecade: 'qhDecade'  // 千幻十周年大屏
                }
                let currentFunc = funcs.player  // 定义当前正在调整的功能
                // 定义一些变量调整参数
                let currentMode = modes.daiji  // 默认调整待机模式
                let adjustX
                let adjustY   // 用于存储当前角色的位置
                let adjustScale
                let adjustAngle = 0 // 调整的角度
                
                // 用于临时存储多个调整，实现批量保存功能
                let tempAdjustments = {}

                // 循环播放功能
                let selfLoopPlay = function (mode) {
                    // 清除之前的定时器
                    if (selfLoopPlay.loopTimer) {
                        clearInterval(selfLoopPlay.loopTimer);
                        selfLoopPlay.loopTimer = null;
                    }

                    let canvas = player.getElementsByClassName("animation-player")[0];
                    let dynamicWrap
                    if (player.isQhlx) {
                        dynamicWrap = canvas.parentNode;
                    } else {
                        dynamicWrap = player.getElementsByClassName("dynamic-wrap")[0];
                    }

                    // 根据不同模式播放不同动画
                    if (mode === modes.chuchang) {
                        // 播放出场动画，添加循环播放
                        let playChuchang = () => {
                            skinSwitch.chukuangWorkerApi.chukuangAction(player, 'chuchang')
                        }
                        playChuchang(); // 立即播放一次
                        // 设置循环播放，每1秒重复一次
                        selfLoopPlay.loopTimer = setInterval(playChuchang, 1000);
                        // 等待一段时间让动画开始播放
                        setTimeout(() => {
                            initPosParams()
                        }, 300)
                    } else if (mode === modes.teshu) {
                        // 播放特殊动画，添加循环播放
                        let playTeshu = () => {
                            skinSwitch.chukuangWorkerApi.chukuangAction(player, 'TeShu')
                        }
                        playTeshu(); // 立即播放一次
                        // 设置循环播放，每1秒重复一次
                        selfLoopPlay.loopTimer = setInterval(playTeshu, 1000);
                        // 等待一段时间让动画开始播放
                        setTimeout(() => {
                            initPosParams()
                        }, 300)
                    } else if (mode === modes.zhishixian) {
                        // 播放指示线动画，添加循环播放
                        let playZhishixian = () => {
                            // 检查当前角色是否有指示线配置
                            let playerParams = player.dynamic.primary.player
                            if (!playerParams.zhishixian) {
                                return
                            }

                            // 模拟攻击事件来触发指示线
                            let targets = game.players.filter(p => p !== player && p.isAlive())
                            if (targets.length === 0) {
                                return
                            }

                            // 构造指示线参数
                            let args = {
                                hand: null,
                                attack: {},
                                targets: [],
                                bodySize: {
                                    bodyWidth: decadeUI.get.bodySize().width,
                                    bodyHeight: decadeUI.get.bodySize().height
                                }
                            }

                            // 获取攻击方位置
                            player.checkBoundsCache(true)
                            args.attack = player.getBoundingClientRect()

                            // 获取目标位置（选择第一个目标）
                            let target = targets[0]
                            target.checkBoundsCache(true)
                            args.targets.push({
                                boundRect: target.getBoundingClientRect(),
                            })

                            // 如果是玩家，添加手牌区域
                            if (player === game.me) {
                                let hand = dui.boundsCaches.hand
                                if (hand) {
                                    hand.check()
                                    let x1 = hand.x + hand.width / 2
                                    let y1 = hand.y
                                    args.hand = {
                                        x1: x1,
                                        y1: y1
                                    }
                                }
                            }

                            // 播放指示线动画
                            skinSwitch.chukuangWorkerApi.chukuangAction(player, 'GongJi', {
                                attackArgs: args,
                                triggername: 'useCard'
                            })
                        }
                        playZhishixian(); // 立即播放一次
                        // 设置循环播放，每1秒重复一次
                        selfLoopPlay.loopTimer = setInterval(playZhishixian, 1000);
                        // 等待一段时间让动画开始播放
                        setTimeout(() => {
                            initPosParams()
                        }, 300)
                    } else {
                        // 其他模式使用原来的debug方式
                        skinSwitch.postMsgApi.debug(player, mode)
                    }

                    // 判断是否需要出框
                    let needChukuang = false;
                    if (mode === modes.chukuang || mode === modes.zhishixian) {
                        needChukuang = true;
                    } else if (mode === modes.chuchang || mode === modes.teshu) {
                        // 检查当前动皮是否有对应的出框参数
                        let playerParams = player.dynamic.primary.player
                        if (mode === modes.chuchang && playerParams.chuchang && playerParams.chuchang.ck !== false) {
                            needChukuang = true;
                        } else if (mode === modes.teshu && playerParams.shizhounian) {
                            needChukuang = true;
                        }
                    }

                    if (needChukuang) {
                        skinSwitch.rendererOnMessage.addListener(player, 'debugChuKuang', function (e) {
                            dynamicWrap.style.zIndex = "100";
                            canvas.style.position = "fixed";
                            canvas.style.width = "100%";

                            if (player.isQhlx) {
                                let bodyHeight = decadeUI.get.bodySize().height
                                let qhDivHeight = dynamicWrap.parentNode.parentNode.getBoundingClientRect().height
                                let top = (bodyHeight - qhDivHeight) / 2
                                canvas.style.top = -top + 'px'
                                canvas.style.height = Math.round((decadeUI.get.bodySize().height / dynamicWrap.parentNode.parentNode.getBoundingClientRect().height * 100)) + '%'
                                player.style.zIndex = 100
                            } else {
                                canvas.style.height = "100%";
                                player.style.zIndex = 10;
                            }

                            canvas.classList.add('hidden')
                            setTimeout(() => {
                                canvas.classList.remove('hidden')
                            }, 250)
                        })
                    }

                    skinSwitch.rendererOnMessage.addListener(player, 'canvasRecover', function (e) {
                        dynamicWrap.style.zIndex = "60";
                        canvas.style.height = null;
                        canvas.style.width = null;
                        canvas.style.position = null;
                        player.style.zIndex = 4;
                        canvas.style.top = null
                    })
                    skinSwitch.rendererOnMessage.addListener(player, 'debugNoChuKuang', function (e) {
                        // 没有出框动画无法调整
                        showAdjustBar(true)
                        show(editBox)

                        skinSwitchMessage.show({
                            type: 'warning',
                            text: '当前动皮暂无出框参数',
                            duration: 1500,    // 显示时间
                            closeable: false, // 可手动关闭
                        })
                    })
                }

                editBox = ui.create.div('.editDynamic', ui.window)

                // 添加拖拽手柄
                const dragHandle = ui.create.div('.skin-drag-handle', editBox)
                dragHandle.title = '拖拽移动角色调整窗口'

                const funcContent = ui.create.div('.funcContent', editBox)
                const funcTitle = ui.create.div('.titleDiv', funcContent)
                // 功能页.
                const btnGroup = ui.create.div('.btnGroup', funcContent)
                const playerBtn = ui.create.div('.funcBtn .btnItem', btnGroup)
                const qhShouShaBtn = ui.create.div('.funcBtn .btnItem', btnGroup)
                const qhDecadeBtn = ui.create.div('.funcBtn .btnItem', btnGroup)
                funcTitle.innerText = '功能页'
                playerBtn.innerText = '角色调整'
                qhShouShaBtn.innerText = '千幻手杀'
                qhDecadeBtn.innerText = '千幻十周年'
                // 角色调整页
                const adjustContent = ui.create.div('.playerContent .hidden', editBox)
                const adjustTitle = ui.create.div('.titleDiv', adjustContent)
                adjustTitle.innerText = '角色调整'
                const adjustBtnGroup = ui.create.div('.btnGroup', adjustContent)
                const daijiBtn = ui.create.div('.funcBtn .btnItem', adjustBtnGroup)
                const beijingBtn = ui.create.div('.funcBtn .btnItem', adjustBtnGroup)
                const qianjingBtn = ui.create.div('.funcBtn .btnItem', adjustBtnGroup)
                const chukuangBtn = ui.create.div('.funcBtn .btnItem', adjustBtnGroup)
                const chuchangBtn = ui.create.div('.funcBtn .btnItem', adjustBtnGroup)
                const teshuBtn = ui.create.div('.funcBtn .btnItem', adjustBtnGroup)
                const zhishixianBtn = ui.create.div('.funcBtn .btnItem', adjustBtnGroup)
                const saveBtn = ui.create.div('.funcBtn .btnItem', adjustBtnGroup)
                const retBtn = ui.create.div('.funcBtn .btnItem', adjustBtnGroup)
                const closeBtn = ui.create.div('.iconfont .icon-close .closeEditBtn', editBox)
                const close = ui.create.div('.close', editBox,function(){
                    editBox.delete();
                });

                daijiBtn.innerText = '调整待机'
                beijingBtn.innerText = '调整背景'
                qianjingBtn.innerText = '调整前景'
                chukuangBtn.innerText = '调整出框'
                chuchangBtn.innerText = '调整出场'
                teshuBtn.innerText = '调整特殊'
                zhishixianBtn.innerText = '调整指示线'
                saveBtn.innerText = '保存'
                retBtn.innerText = '返回'
                // 封装连续按事件
                let continuousClick = function (dom, func) {
                    let downFunc = function (e) {
                        // 改变骨骼的位置
                        //获取鼠标按下时的时间
                        let t = setInterval((e) => { func(e, ++downFunc._times) }, 120)
                        clearInterval(downFunc.timer)
                        downFunc.timer = t
                        downFunc._times = 0  // 表示触发了多少次
                        func(e, ++downFunc._times)  // 立马执行一次
                    }
                    let holdUp = function () {
                        clearInterval(downFunc.timer);
                        downFunc._times = 0
                    }

                    dom.addEventListener(downEvent, downFunc)
                    dom.addEventListener(upEvent, holdUp)
                    dom.addEventListener(cancelEvent, holdUp)

                }

                closeBtn.listen(() => {
                    // 清除循环播放定时器
                    if (selfLoopPlay.loopTimer) {
                        clearInterval(selfLoopPlay.loopTimer);
                        selfLoopPlay.loopTimer = null;
                    }
                    hide(editBox)
                })

                // 初始化角色调整窗口拖拽功能
                skinSwitch.initEditBoxDrag(editBox, dragHandle)

                let changeInfoData = () => {
                    if (!textInfoShow) return
                    let x = adjustX[1].toFixed(2)
                    let y = adjustY[1].toFixed(2)
                    let scale = adjustScale.toFixed(2)
                    let angle = Number(adjustAngle) || 0
                    textInfoShow.innerHTML = `x: [${adjustX[0]}, ${x}]<br> y: [${adjustY[0]}, ${y}]<br>大小: ${scale}<br> 角度: ${angle}`
                }

                let initBlackBg = () => {
                    // 添加调整工具箱
                    blackbg = ui.create.div('.pfqh_qhly_blackbg .hidden', document.body);
                    let dataShowDiv = ui.create.div('.dataShowDiv', blackbg);  // 显示当前节点的数据信息
                    textInfoShow = ui.create.div('.textInfoShow', dataShowDiv)
                    let copyJudgeInfo = ui.create.div('.copyCurrentInfoDiv', dataShowDiv)  // 复制信息
                    copyJudgeInfo.innerText = '复制参数'
                    textInfoShow.innerHTML = `x: [0, 0.5]<br> y: [0, 0.5]<br>大小: 0.5<br> 角度: 0`

                    copyJudgeInfo.listen(() => {
                        adjustX[1] = Number(adjustX[1].toFixed(2))
                        adjustY[1] = Number(adjustY[1].toFixed(2))
                        copyToClipboard({
                            x: adjustX,
                            y: adjustY,
                            angle: adjustAngle,
                            scale: Number(adjustScale.toFixed(2)),
                        })
                    })

                    let buttonbar = ui.create.div('.pfqh_qhly_bigeditbar', blackbg);
                    let buttons = new Array(8);
                    for (let i = 0; i < 6; i++) {
                        buttons[i] = ui.create.div('.pfqh_qhly_bigeditbutton' + i, buttonbar);
                        buttons[i].id = 'pfqh_qhly_bigedit' + i;

                        if (i < 4) {
                            switch (i) {
                                case 0: {
                                    // 放大, 每次scale+0.01, 支持连点
                                    continuousClick(buttons[i], (e, times) => {
                                        if (times >= 10) {
                                            adjustScale += 0.02
                                        } else {
                                            adjustScale += 0.01
                                        }
                                        skinSwitch.postMsgApi.resizePos(player, currentMode, { scale: adjustScale })

                                        // 对于出框相关模式，立即更新出框Worker
                                        if (currentMode === modes.chukuang || currentMode === modes.chuchang || currentMode === modes.teshu || currentMode === modes.zhishixian) {
                                            let actionType;
                                            if (currentMode === modes.chukuang || currentMode === modes.zhishixian) actionType = 'GongJi';
                                            else if (currentMode === modes.chuchang) actionType = 'chuchang';
                                            else if (currentMode === modes.teshu) actionType = 'TeShu';

                                            skinSwitch.chukuangWorkerApi.adjust(player, {
                                                x: adjustX,
                                                y: adjustY,
                                                scale: adjustScale,
                                                angle: adjustAngle
                                            }, actionType);
                                        }

                                        changeInfoData()
                                    })
                                    break;
                                }
                                case 1: {
                                    // 缩小, 每次scale-0.01,
                                    continuousClick(buttons[i], (e, times) => {
                                        if (times >= 10) {
                                            adjustScale -= 0.02
                                        } else {
                                            adjustScale -= 0.01
                                        }
                                        if (adjustScale <= 0) adjustScale = 0.01
                                        skinSwitch.postMsgApi.resizePos(player, currentMode, { scale: adjustScale })

                                        // 对于出框相关模式，立即更新出框Worker
                                        if (currentMode === modes.chukuang || currentMode === modes.chuchang || currentMode === modes.teshu || currentMode === modes.zhishixian) {
                                            let actionType;
                                            if (currentMode === modes.chukuang || currentMode === modes.zhishixian) actionType = 'GongJi';
                                            else if (currentMode === modes.chuchang) actionType = 'chuchang';
                                            else if (currentMode === modes.teshu) actionType = 'TeShu';

                                            skinSwitch.chukuangWorkerApi.adjust(player, {
                                                x: adjustX,
                                                y: adjustY,
                                                scale: adjustScale,
                                                angle: adjustAngle
                                            }, actionType);
                                        }

                                        changeInfoData()
                                    })
                                    break;
                                }
                                case 2: {
                                    continuousClick(buttons[i], (e, times) => {
                                        if (times >= 10) {
                                            adjustAngle += 2
                                        } else {
                                            adjustAngle++
                                        }
                                        skinSwitch.postMsgApi.resizePos(player, currentMode, { angle: adjustAngle })

                                        // 对于出框相关模式，立即更新出框Worker
                                        if (currentMode === modes.chukuang || currentMode === modes.chuchang || currentMode === modes.teshu || currentMode === modes.zhishixian) {
                                            let actionType;
                                            if (currentMode === modes.chukuang || currentMode === modes.zhishixian) actionType = 'GongJi';
                                            else if (currentMode === modes.chuchang) actionType = 'chuchang';
                                            else if (currentMode === modes.teshu) actionType = 'TeShu';

                                            skinSwitch.chukuangWorkerApi.adjust(player, {
                                                x: adjustX,
                                                y: adjustY,
                                                scale: adjustScale,
                                                angle: adjustAngle
                                            }, actionType);
                                        }

                                        changeInfoData()
                                    })
                                    break;
                                }
                                case 3: {
                                    continuousClick(buttons[i], (e, times) => {
                                        if (times >= 10) {
                                            adjustAngle -= 2
                                        } else {
                                            adjustAngle--
                                        }
                                        skinSwitch.postMsgApi.resizePos(player, currentMode, { angle: adjustAngle })

                                        // 对于出框相关模式，立即更新出框Worker
                                        if (currentMode === modes.chukuang || currentMode === modes.chuchang || currentMode === modes.teshu || currentMode === modes.zhishixian) {
                                            let actionType;
                                            if (currentMode === modes.chukuang || currentMode === modes.zhishixian) actionType = 'GongJi';
                                            else if (currentMode === modes.chuchang) actionType = 'chuchang';
                                            else if (currentMode === modes.teshu) actionType = 'TeShu';

                                            skinSwitch.chukuangWorkerApi.adjust(player, {
                                                x: adjustX,
                                                y: adjustY,
                                                scale: adjustScale,
                                                angle: adjustAngle
                                            }, actionType);
                                        }

                                        changeInfoData()
                                    })
                                    break;
                                }
                            }
                        } else {
                            buttons[i].listen(function () {
                                switch (this.id) {
                                    case 'pfqh_qhly_bigedit4': {
                                        // 显示十字键辅助微调
                                        this._show = !adjustDirection || adjustDirection.classList.contains('hidden')
                                        showShizi(!this._show)
                                        break;
                                    }
                                    case 'pfqh_qhly_bigedit5': {
                                        // 调整后返回
                                        showAdjustBar(true)
                                        show(editBox)
                                        // 恢复播放待机动画
                                        // currentMode = modes.daiji
                                        //  initPosParams()
                                        selfLoopPlay(modes.daiji)
                                        break;
                                    }
                                    case 'pfqh_qhly_bigedit6': {

                                    }
                                }
                            })
                        }
                    }

                    // 绑定全局可以滑动调整

                    function mouseupEvent(event) {
                        blackbg._mouseup(event);
                    }
                    function mousemoveEvent(event) {
                        if (event) {
                            if (event.touches && event.touches.length) {
                                blackbg._mousemove(event.touches[0].clientX, event.touches[0].clientY);
                            }
                            else blackbg._mousemove(event.clientX, event.clientY);
                        }
                    }
                    function mousedownEvent(event) {
                        if (event) {
                            // 清空之前的数据
                            if (this.posX) delete this.posX
                            if (this.posY) delete this.posY
                            if (event.touches && event.touches.length) blackbg._mousedown(event.touches[0].clientX, event.touches[0].clientY);
                            else blackbg._mousedown(event.clientX, event.clientY);
                        }
                    }
                    blackbg._mousedown = function (x, y) {
                        this.posX = x
                        this.posY = y
                        this.isTouching = true
                    }
                    blackbg._mousemove = function (x, y) {
                        if (!this.isTouching) return;
                        let slideX = x - this.posX;
                        let slideY = y - this.posY;
                        if (currentMode === modes.chukuang || currentMode === modes.chuchang || currentMode === modes.teshu || currentMode === modes.zhishixian) {
                            adjustX[1] += slideX * 0.0007;
                            adjustY[1] -= slideY * 0.0007;
                        } else {
                            adjustX[1] += slideX * 0.003;
                            adjustY[1] -= slideY * 0.003;
                        }
                        changeInfoData()

                        // 调用常规的位置更新
                        skinSwitch.postMsgApi.resizePos(player, currentMode, {
                            message: 'RESIZE',
                            x: adjustX,
                            y: adjustY,
                        })

                        // 对于出框相关模式，立即更新出框Worker中正在播放的动画位置
                        if (currentMode === modes.chukuang || currentMode === modes.chuchang || currentMode === modes.teshu || currentMode === modes.zhishixian) {
                            let actionType;
                            if (currentMode === modes.chukuang || currentMode === modes.zhishixian) actionType = 'GongJi';
                            else if (currentMode === modes.chuchang) actionType = 'chuchang';
                            else if (currentMode === modes.teshu) actionType = 'TeShu';

                            // 直接调用出框Worker的adjust函数，立即更新位置
                            skinSwitch.chukuangWorkerApi.adjust(player, {
                                x: adjustX,
                                y: adjustY,
                                scale: adjustScale,
                                angle: adjustAngle
                            }, actionType);
                        }

                        this.posX = x
                        this.posY = y
                    }
                    blackbg._mouseup = function (event) {
                        this.isTouching = false;
                        delete this.posX;
                        delete this.posY;
                    }
                    blackbg.addEventListener('touchstart', mousedownEvent, true);
                    blackbg.addEventListener('touchend', mouseupEvent, true);
                    blackbg.addEventListener('touchcancel', mouseupEvent, true);
                    blackbg.addEventListener('touchmove', mousemoveEvent, true);
                    blackbg.addEventListener('mousedown', mousedownEvent, true);
                    blackbg.addEventListener('mouseup', mouseupEvent, true);
                    blackbg.addEventListener('mouseleave', mouseupEvent, true);
                    blackbg.addEventListener('mousemove', mousemoveEvent, true);
                }

                let blackbg
                let textInfoShow
                let showAdjustBar = hidden => {
                    if (!blackbg) {
                        initBlackBg()
                    }
                    if (hidden) {
                        blackbg.classList.add('hidden')
                        showShizi(true)
                    }
                    else blackbg.classList.remove('hidden')
                }

                let initPosParams = () => {
                    getDynamicPos(currentMode, (data) => {
                        adjustX = data.x
                        adjustY = data.y
                        adjustScale = data.scale
                        adjustAngle = data.angle || 0

                        if (adjustX[0] !== 0 || adjustY[0] !== 0) {
                            adjustX[0] = 0
                            adjustY[0] = 0
                            skinSwitch.postMsgApi.resizePos(player, currentMode, { x: adjustX, y: adjustY })
                            initPosParams()
                            return
                        }

                        // 如果有临时保存的调整，优先使用临时保存的
                        if (tempAdjustments[currentMode]) {
                            adjustX = [...tempAdjustments[currentMode].x]
                            adjustY = [...tempAdjustments[currentMode].y]
                            adjustScale = tempAdjustments[currentMode].scale
                            adjustAngle = tempAdjustments[currentMode].angle || 0
                            // 立即应用临时保存的调整
                            skinSwitch.postMsgApi.resizePos(player, currentMode, { 
                                x: adjustX, 
                                y: adjustY,
                                scale: adjustScale,
                                angle: adjustAngle
                            })
                            
                            // 对于出框相关模式，立即更新出框Worker
                            if (currentMode === modes.chukuang || currentMode === modes.chuchang || currentMode === modes.teshu || currentMode === modes.zhishixian) {
                                let actionType;
                                if (currentMode === modes.chukuang || currentMode === modes.zhishixian) actionType = 'GongJi';
                                else if (currentMode === modes.chuchang) actionType = 'chuchang';
                                else if (currentMode === modes.teshu) actionType = 'TeShu';

                                skinSwitch.chukuangWorkerApi.adjust(player, {
                                    x: adjustX,
                                    y: adjustY,
                                    scale: adjustScale,
                                    angle: adjustAngle
                                }, actionType);
                            }
                        }

                        changeInfoData()
                    })
                }

                let refreshBtnState = (selectDiv) => {
                    let allBtns = [daijiBtn, beijingBtn, qianjingBtn, chukuangBtn, chuchangBtn, teshuBtn, zhishixianBtn]
                    for (let item of allBtns) {
                        if (item === selectDiv) {
                            item.classList.add('btnSelect')
                        } else {
                            item.classList.remove('btnSelect')
                        }
                    }
                }

                retBtn.listen(() => {
                    // 清除循环播放定时器
                    if (selfLoopPlay.loopTimer) {
                        clearInterval(selfLoopPlay.loopTimer);
                        selfLoopPlay.loopTimer = null;
                    }
                    funcContent.classList.remove('hidden')
                    adjustContent.classList.add('hidden')
                    showShizi(true)
                    showAdjustBar(true)
                    refreshBtnState(null)  // 清空所有状态
                })

                // 调整角色功能页功能
                playerBtn.listen(() => {
                    editBox.updateGlobalParams()
                    funcContent.classList.add('hidden')
                    adjustContent.classList.remove('hidden')
                    currentMode = modes.daiji
                    initPosParams()
                    showShizi(true)
                    currentFunc = funcs.player
                    // 清理其他
                })

                // 在切换模式前保存当前模式的调整
                let saveCurrentModeAdjustment = () => {
                    if (!adjustX || !adjustY) return
                    
                    // 保存当前模式的调整到临时存储
                    adjustX[1] = Number(adjustX[1].toFixed(2))
                    adjustY[1] = Number(adjustY[1].toFixed(2))
                    tempAdjustments[currentMode] = {
                        x: [...adjustX],
                        y: [...adjustY],
                        scale: Number(adjustScale.toFixed(2)),
                        angle: Number(adjustAngle.toFixed(2))
                    }
                }

                daijiBtn.listen(() => {
                    saveCurrentModeAdjustment()
                    currentMode = modes.daiji
                    showAdjustBar()
                    showShizi(true)
                    initPosParams()
                    selfLoopPlay(currentMode)
                    refreshBtnState(daijiBtn)
                    hide(editBox)
                })

                beijingBtn.listen(() => {
                    saveCurrentModeAdjustment()
                    let playerParams = player.dynamic.primary.player
                    if (!playerParams.beijing) {
                        skinSwitchMessage.show({
                            type: 'warning',
                            text: '当前皮肤没有设置动态背景',
                            duration: 1500,    // 显示时间
                            closeable: false, // 可手动关闭
                        })
                        return
                    }

                    currentMode = modes.beijing
                    showAdjustBar()
                    showShizi(true)
                    initPosParams()
                    selfLoopPlay(currentMode)
                    refreshBtnState(beijingBtn)
                    hide(editBox)
                })

                qianjingBtn.listen(() => {
                    saveCurrentModeAdjustment()
                    let playerParams = player.dynamic.primary.player
                    if (!playerParams.qianjing) {
                        skinSwitchMessage.show({
                            type: 'warning',
                            text: '当前皮肤没有设置动态前景',
                            duration: 1500,    // 显示时间
                            closeable: false, // 可手动关闭
                        })
                        return
                    }

                    currentMode = modes.qianjing
                    showAdjustBar()
                    showShizi(true)
                    initPosParams()
                    selfLoopPlay(currentMode)
                    refreshBtnState(qianjingBtn)
                    hide(editBox)
                })
                
                chukuangBtn.listen(() => {
                    saveCurrentModeAdjustment()
                    currentMode = modes.chukuang
                    showAdjustBar()
                    showShizi(true)
                    initPosParams()
                    selfLoopPlay(currentMode)
                    refreshBtnState(chukuangBtn)
                    hide(editBox)
                })

                chuchangBtn.listen(() => {
                    saveCurrentModeAdjustment()
                    let playerParams = player.dynamic.primary.player
                    currentMode = modes.chuchang
                    showAdjustBar()
                    showShizi(true)
                    initPosParams()
                    selfLoopPlay(currentMode)
                    refreshBtnState(chuchangBtn)
                    hide(editBox)
                })

                teshuBtn.listen(() => {
                    saveCurrentModeAdjustment()
                    let playerParams = player.dynamic.primary.player
                    currentMode = modes.teshu
                    showAdjustBar()
                    showShizi(true)
                    initPosParams()
                    selfLoopPlay(currentMode)
                    refreshBtnState(teshuBtn)
                    hide(editBox)
                })

                // 添加指示线按钮的事件监听器
                zhishixianBtn.listen(() => {
                    saveCurrentModeAdjustment()
                    let playerParams = player.dynamic.primary.player
                    if (!playerParams.zhishixian) {
                        skinSwitchMessage.show({
                            type: 'warning',
                            text: '当前皮肤没有设置指示线动画',
                            duration: 1500,
                            closeable: false,
                        })
                        return
                    }

                    currentMode = modes.zhishixian
                    showAdjustBar()
                    showShizi(true)
                    initPosParams()
                    selfLoopPlay(currentMode)
                    refreshBtnState(zhishixianBtn)
                    hide(editBox)
                })

                saveBtn.listen(() => {
                    // 保存当前调整
                    saveCurrentModeAdjustment()
                    
                    // 只保存当前模式的调整参数
                    saveToFile(true) // 传入true表示显示保存消息
                    
                    // 从临时调整中移除当前已保存的模式
                    if (tempAdjustments[currentMode]) {
                        delete tempAdjustments[currentMode]
                    }
                })

                let adjustDirection
                let arena = document.getElementById('arena')

                let showShizi = (hidden) => {
                    // 初始化十字键
                    if (!adjustDirection) {
                        adjustDirection = ui.create.div('.adjustDirection', arena);
                        adjustDirection.innerHTML = `
                            <div class="directionDiv" style="top:0;left:32.3%">
                                <button id="upbtn"><i class="up"></i></button>
                            </div>
                            <div class="directionDiv" style="top:26.3%;left:-30.3%">
                                <button id="leftbtn"><i class="left"></i></button>
                            </div>  
                            <div class="directionDiv" style="top:18.3%;left:32.3%">
                                <button id="bottombtn"><i class="down"></i></button>
                            </div>
                            <div class="directionDiv" style="top:-7%;left:23.3%">
                                <button id="rightbtn"><i class="right"></i></button>
                            </div>
                        `

                        continuousClick(adjustDirection.querySelector('#upbtn'), () => {
                            adjustY[1] += 0.01
                            skinSwitch.postMsgApi.resizePos(player, currentMode, { x: adjustX, y: adjustY })

                            // 对于出框相关模式，立即更新出框Worker
                            if (currentMode === modes.chukuang || currentMode === modes.chuchang || currentMode === modes.teshu || currentMode === modes.zhishixian) {
                                let actionType;
                                if (currentMode === modes.chukuang || currentMode === modes.zhishixian) actionType = 'GongJi';
                                else if (currentMode === modes.chuchang) actionType = 'chuchang';
                                else if (currentMode === modes.teshu) actionType = 'TeShu';

                                skinSwitch.chukuangWorkerApi.adjust(player, {
                                    x: adjustX,
                                    y: adjustY,
                                    scale: adjustScale,
                                    angle: adjustAngle
                                }, actionType);
                            }

                            changeInfoData()
                        })

                        continuousClick(adjustDirection.querySelector('#bottombtn'), () => {
                            adjustY[1] -= 0.01
                            skinSwitch.postMsgApi.resizePos(player, currentMode, { x: adjustX, y: adjustY })

                            // 对于出框相关模式，立即更新出框Worker
                            if (currentMode === modes.chukuang || currentMode === modes.chuchang || currentMode === modes.teshu || currentMode === modes.zhishixian) {
                                let actionType;
                                if (currentMode === modes.chukuang || currentMode === modes.zhishixian) actionType = 'GongJi';
                                else if (currentMode === modes.chuchang) actionType = 'chuchang';
                                else if (currentMode === modes.teshu) actionType = 'TeShu';

                                skinSwitch.chukuangWorkerApi.adjust(player, {
                                    x: adjustX,
                                    y: adjustY,
                                    scale: adjustScale,
                                    angle: adjustAngle
                                }, actionType);
                            }

                            changeInfoData()
                        })

                        continuousClick(adjustDirection.querySelector('#leftbtn'), () => {
                            adjustX[1] -= 0.01
                            skinSwitch.postMsgApi.resizePos(player, currentMode, { x: adjustX, y: adjustY })

                            // 对于出框相关模式，立即更新出框Worker
                            if (currentMode === modes.chukuang || currentMode === modes.chuchang || currentMode === modes.teshu || currentMode === modes.zhishixian) {
                                let actionType;
                                if (currentMode === modes.chukuang || currentMode === modes.zhishixian) actionType = 'GongJi';
                                else if (currentMode === modes.chuchang) actionType = 'chuchang';
                                else if (currentMode === modes.teshu) actionType = 'TeShu';

                                skinSwitch.chukuangWorkerApi.adjust(player, {
                                    x: adjustX,
                                    y: adjustY,
                                    scale: adjustScale,
                                    angle: adjustAngle
                                }, actionType);
                            }

                            changeInfoData()
                        })

                        continuousClick(adjustDirection.querySelector('#rightbtn'), () => {
                            adjustX[1] += 0.01
                            skinSwitch.postMsgApi.resizePos(player, currentMode, { x: adjustX, y: adjustY })

                            // 对于出框相关模式，立即更新出框Worker
                            if (currentMode === modes.chukuang || currentMode === modes.chuchang || currentMode === modes.teshu || currentMode === modes.zhishixian) {
                                let actionType;
                                if (currentMode === modes.chukuang || currentMode === modes.zhishixian) actionType = 'GongJi';
                                else if (currentMode === modes.chuchang) actionType = 'chuchang';
                                else if (currentMode === modes.teshu) actionType = 'TeShu';

                                skinSwitch.chukuangWorkerApi.adjust(player, {
                                    x: adjustX,
                                    y: adjustY,
                                    scale: adjustScale,
                                    angle: adjustAngle
                                }, actionType);
                            }

                            changeInfoData()
                        })
                    }
                    if (hidden) adjustDirection.classList.add('hidden')
                    else adjustDirection.classList.remove('hidden')

                }

                qhShouShaBtn.listen(function () {

                    // 寻找千幻的节点,并更新当前player
                    let qhNode
                    let p = document.getElementById('mainView')
                    // 尝试查找手杀大屏的node
                    if (p) {
                        let _canvas = p.getElementsByClassName('animation-player')
                        if (_canvas.length) {
                            qhNode = _canvas[0].parentNode.parentNode
                        }

                    }
                    if (!qhNode || !qhNode.dynamic || !qhNode.dynamic.primary) {
                        skinSwitchMessage.show({
                            'type': 'error',
                            'text': '必须打开千幻大屏预览页且当前预览角色是动皮才可以进行编辑调整'
                        })
                        return
                    }
                    currentFunc = funcs.qhShouSha
                    // 必须保证当前已经打开了千幻的皮肤选择界面.
                    funcContent.classList.add('hidden')
                    adjustContent.classList.remove('hidden')

                    // 停止原来的自动播放攻击动画和待机..
                    clearInterval(_status.texiaoTimer);
                    clearTimeout(_status.texiaoTimer2);

                    // 检查全局参数的引用是否发生变化. 如果发生变化需要进行重新初始化
                    player = qhNode
                    player.isQhlx = true; // 表示当前动皮角色是千幻雷修版本的
                    renderer = player.dynamic.renderer;
                    dynamic = player.dynamic.primary;  // 这个是指代主将的sprite也就是APNode对象
                    currentMode = modes.daiji
                    initPosParams()
                })

                qhDecadeBtn.listen(function () {

                    // 寻找千幻的节点,并更新当前player
                    let qhNode
                    let p = document.getElementById('mainView')
                    // 尝试查找手杀大屏的node
                    if (p) {
                        let _canvas = p.getElementsByClassName('animation-player')
                        if (_canvas.length) {
                            qhNode = _canvas[0].parentNode.parentNode
                        }

                    }
                    if (!qhNode || !qhNode.dynamic || !qhNode.dynamic.primary) {
                        skinSwitchMessage.show({
                            'type': 'error',
                            'text': '必须打开千幻大屏预览页且当前预览角色是动皮才可以进行编辑调整'
                        })
                        return
                    }
                    currentFunc = funcs.qhDecade
                    // 必须保证当前已经打开了千幻的皮肤选择界面.
                    funcContent.classList.add('hidden')
                    adjustContent.classList.remove('hidden')

                    // 检查全局参数的引用是否发生变化. 如果发生变化需要进行重新初始化
                    player = qhNode
                    player.isQhlx = true; // 表示当前动皮角色是千幻雷修版本的
                    renderer = player.dynamic.renderer;
                    dynamic = player.dynamic.primary;  // 这个是指代主将的sprite也就是APNode对象
                    currentMode = modes.daiji
                    initPosParams()
                })

                let getDynamicPos = function (mode, func) {
                    skinSwitch.postMsgApi.position(player, mode)
                    skinSwitch.rendererOnMessage.addListener(player, 'position', func)
                }



                // 增加一个新的方法, 修改全局参数, 尤其是当皮肤也进行了变化
                editBox.updateGlobalParams = function () {
                    // 检查全局参数的引用是否发生变化. 如果发生变化需要进行重新初始化
                    // 优先使用全局设置的目标玩家，否则使用当前玩家
                    let targetPlayer = window.qhly_editTargetPlayer || window.currentEditPlayer || player || game.me;
                    player = targetPlayer;
                    if (!player.dynamic) return
                    renderer = player.dynamic.renderer;
                    dynamic = player.dynamic.primary  // 这个是指代主将的sprite也就是APNode对象
                    initPosParams()
                }

                let copyToClipboard = function (data) {
                    // 保存当前动皮参数
                    let copyData = `\t\t\t\tx: [${data.x}],\n\t\t\t\ty: [${data.y}],\n`
                    if (data.angle) {
                        copyData += `\t\t\t\tangle: ${data.angle},\n`
                    }
                    if (data.scale != null) {
                        copyData += `\t\t\t\tscale: ${data.scale},\n`
                    }
                    // 复制到剪切板, 复制代码来源: https://juejin.cn/post/6844903567480848391
                    const input = document.createElement('textarea');
                    input.setAttribute('readonly', 'readonly');
                    // input.setAttribute('value', copyData);
                    input.value = copyData
                    document.body.appendChild(input);
                    if (document.execCommand('copy')) {
                        input.select()
                        document.execCommand('copy')
                        skinSwitchMessage.show({
                            type: 'success',
                            text: '复制成功',
                            duration: 1500,    // 显示时间
                            closeable: false, // 可手动关闭
                        })
                    }
                    document.body.removeChild(input);
                }

                let saveToFile = function () {
                    let primaryDynamic = player.dynamic.primary.player
                    let playerName = player.name || player.parentNode.name
                    if (!playerName) return

                    let dskins = decadeUI.dynamicSkin[playerName]
                    let saveKey
                    for (let k in dskins) {
                        if (dskins[k].name === primaryDynamic.name) {
                            saveKey = k
                            break
                        }
                    }

                    if (saveKey) {
                        let modeToKey = {
                            daiji: 'daiji',
                            chukuang: 'gongji',
                            beijing: 'beijing',
                            qianjing: 'qianjing',
                            chuchang: 'chuchang',
                            teshu: 'teshu',
                            zhishixian: 'zhishixian'
                        }

                        // 统一初始化参数
                        if (!skinSwitch.saveSkinParams) {
                            skinSwitch.saveSkinParams = {}
                        }
                        if (!skinSwitch.saveSkinParams[playerName]) {
                            skinSwitch.saveSkinParams[playerName] = {}
                        }
                        if (!skinSwitch.saveSkinParams[playerName][saveKey]) {
                            skinSwitch.saveSkinParams[playerName][saveKey] = {}
                        }

                        let toSaveData
                        if (player.isQhlx) {
                            if (!skinSwitch.saveSkinParams[playerName][saveKey].qhlx) {
                                skinSwitch.saveSkinParams[playerName][saveKey].qhlx = {}
                            }
                            if (currentFunc === funcs.qhDecade) {
                                if (!skinSwitch.saveSkinParams[playerName][saveKey].qhlx.decade) {
                                    skinSwitch.saveSkinParams[playerName][saveKey].qhlx.decade = {}
                                }
                                toSaveData = skinSwitch.saveSkinParams[playerName][saveKey].qhlx.decade
                            } else {
                                toSaveData = skinSwitch.saveSkinParams[playerName][saveKey].qhlx
                            }
                        } else {
                            toSaveData = skinSwitch.saveSkinParams[playerName][saveKey]
                        }

                        // 保存当前模式的位置数据
                        adjustX[1] = Number(adjustX[1].toFixed(2))
                        adjustY[1] = Number(adjustY[1].toFixed(2))
                        let modeData = {
                            x: adjustX,
                            y: adjustY,
                            scale: Number(adjustScale.toFixed(2)),
                            angle: Number(adjustAngle.toFixed(2))
                        }

                        let k = modeToKey[currentMode]
                        if (!player.isQhlx && currentMode === modes.daiji) {
                            skinSwitch.saveSkinParams[playerName][saveKey] = Object.assign(skinSwitch.saveSkinParams[playerName][saveKey], modeData)
                        } else {
                            toSaveData[k] = modeData
                        }

                        // 立即保存到文件
                        let str = `window.skinSwitchLoadParams = function(lib, game, ui, get, ai, _status){window.skinSwitch.saveSkinParams =\n`
                        str += JSON.stringify(skinSwitch.saveSkinParams, null, 4)
                        str += '\n}'

                        // 添加防止短时间内多次显示保存成功的逻辑
                        if (!skinSwitch.lastSaveSuccessTime || (new Date().getTime() - skinSwitch.lastSaveSuccessTime) > 3000) {
                            skinSwitch.lastSaveSuccessTime = new Date().getTime();
                            game.writeFile(str, skinSwitch.path, 'saveSkinParams.js', function () {
                                console.log('写入saveSkinParams.js成功')
                                skinSwitchMessage.show({
                                    type: 'success',
                                    text: '保存成功',
                                    duration: 1500,
                                    closeable: false
                                })
                            })
                        } else {
                            // 短时间内重复保存，不显示消息，只写入文件
                            game.writeFile(str, skinSwitch.path, 'saveSkinParams.js', function () {
                                console.log('写入saveSkinParams.js成功')
                            })
                        }

                        // 修改千幻雷修版本的值
                        if (skinSwitch.saveSkinParams[playerName][saveKey].qhlx) {
                            decadeUI.dynamicSkin[playerName][saveKey].qhlx = skinSwitch.saveSkinParams[playerName][saveKey].qhlx
                        }
                    }
                }
                editBox.updateGlobalParams()
            }

            function editBoxShowOrHide() {
                // 初始化一些参数
                if (!editBox) {
                    // 优先使用全局设置的目标玩家
                    let targetPlayer = window.qhly_editTargetPlayer || window.currentEditPlayer || game.me;
                    player = targetPlayer;
                    renderer = player.dynamic.renderer;
                    dynamic = player.dynamic.primary  // 这个是指代主将的sprite也就是APNode对象
                    game.qhly_bigEdit()
                    return editBox
                } else {
                    // 检查是否有新的目标玩家
                    let targetPlayer = window.qhly_editTargetPlayer || window.currentEditPlayer;
                    if (targetPlayer && targetPlayer !== player) {
                        player = targetPlayer;
                        renderer = player.dynamic.renderer;
                        dynamic = player.dynamic.primary  // 这个是指代主将的sprite也就是APNode对象
                        editBox.updateGlobalParams(); // 更新编辑框参数
                    } else if (game.me !== player && !targetPlayer) {
                        player = game.me
                        renderer = player.dynamic.renderer;
                        dynamic = player.dynamic.primary  // 这个是指代主将的sprite也就是APNode对象
                        editBox.updateGlobalParams(); // 更新编辑框参数
                    } else if (player.dynamic.primary !== dynamic) {
                        renderer = player.dynamic.renderer;
                        dynamic = player.dynamic.primary  // 这个是指代主将的sprite也就是APNode对象
                    }
                }
                toggleShow(editBox)
                return editBox
            }

            function isHide(dom) {
                return [...dom.classList].includes('hidden-adjust')
            }

            function hide(dom) {
                if (![...dom.classList].includes('hidden-adjust')) {
                    dom.classList.add('hidden-adjust')
                }
            }

            function show(dom) {
                if ([...dom.classList].includes('hidden-adjust')) {
                    dom.classList.remove('hidden-adjust')
                }
            }

            function toggleShow(dom) {
                if ([...dom.classList].includes('hidden-adjust')) {
                    dom.classList.remove('hidden-adjust')
                    skinSwitch.allowTouchEvent(false)
                } else {
                    // 关闭编辑窗口时，清除循环播放定时器
                    if (typeof selfLoopPlay !== 'undefined' && selfLoopPlay.loopTimer) {
                        clearInterval(selfLoopPlay.loopTimer);
                        selfLoopPlay.loopTimer = null;
                    }
                    dom.classList.add('hidden-adjust')
                    skinSwitch.allowTouchEvent(true)
                }
            }

            lib.arenaReady.push(function () { //游戏加载完成执行的内容
                lib.init.js(skinSwitch.url, 'pfqhUtils', function () {
                    //顶部菜单
                    if (lib.config[skinSwitch.configKey.showEditMenu]) {
                        // 添加编辑动皮参数
                        ui.create.system('编辑动皮参数', function () {
                            setTimeout(function () {
                                if (!lib.config[skinSwitch.configKey.useDynamic]) {
                                    skinSwitchMessage.show({
                                        type: 'warning',
                                        text: '请先打开动皮功能',
                                        duration: 1500,    // 显示时间
                                        closeable: false, // 可手动关闭
                                    })
                                    return
                                }
                                // 只能编辑自己
                                if (game.me) {
                                    let player = game.me
                                    if (!player.dynamic || (!player.dynamic.primary)) {
                                        // alert("只能编辑当前角色的动皮位置参数")
                                        skinSwitchMessage.show({
                                            type: 'warning',
                                            text: '只能当前角色是动皮才可编辑参数',
                                            duration: 1500,    // 显示时间
                                            closeable: false, // 可手动关闭
                                        })
                                        return
                                    }
                                    if (get.mode() === 'guozhan' || player.name2 !== undefined) {
                                        skinSwitchMessage.show({
                                            type: 'warning',
                                            text: '只能在单将模式下编辑参数',
                                            duration: 1500,    // 显示时间
                                            closeable: false, // 可手动关闭
                                        })
                                        return
                                    }
                                    // 设置一个全局变量
                                    window.dynamicEditBox = editBoxShowOrHide()
                                }

                            }, 100);
                        }, true)
                    }

                    if (lib.config[skinSwitch.configKey.showPreviewDynamicMenu]) {
                        ui.create.system('预览spine', function () {
                            skinSwitch.previewDynamic()
                        }, true)
                    }


                }, function (err) {
                    console.log(err)
                })

                // 调试, 打开编辑窗口
                // skinSwitch.openEventBindWindow()

                // 引入js
                let js = function (path, onload, onerror) {
                    if (!path) return console.error('path');

                    let script = document.createElement('script');
                    script.onload = onload
                    script.onerror = onerror || function () {
                        console.error(this.src + 'not found');
                    }
                    script.src = path
                    document.head.appendChild(script);
                }
                // <!-- 消息外层容器，因为消息提醒基本上是全局的，所以这里用id，所有的弹出消息都是需要插入到这个容器里边的 -->
                let msgContainer = ui.create.div(document.getElementById('arena'))
                msgContainer.id = 'message-container'
                js(skinSwitch.url + 'component/message.js', () => {
                    window.skinSwitchMessage = new SkinSwitchMessage()
                })
            })  