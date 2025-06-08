import {lib,get,_status,ui,game,ai} from './noname.js';
import {nonameInitialized} from '../../../noname/util/index.js'
import {skinSwitch} from './skinSwitch.js'
const adjustBoxStyle = document.createElement('link')
            adjustBoxStyle.rel = 'stylesheet'
            adjustBoxStyle.href = lib.assetURL + 'extension/千幻聆音/style/adjustBox.css'
            document.head.appendChild(adjustBoxStyle)

            /* 动皮相关功能 */
            function dynamicInit() {
                // 首先需要覆盖十周年UI的动皮初始化功能
                if (!lib.config[skinSwitch.configKey.useDynamic]) {
                    return
                }
                if (!lib.config[skinSwitch.decadeKey.enable] && !lib.config[skinSwitch.decadeKey.dynamicSkin]) {
                    console.log('必须安装启用十周年UI与十周年动皮')
                    return
                }

                // 根据本地的存储内容, 更改十周年UI的skinDynamic的数据
                function updateDecadeDynamicSkin() {
                    console.log('=== updateDecadeDynamicSkin 开始执行 ===');
                    if (!skinSwitch.saveSkinParams) {
                        console.log('skinEdit不存在，跳过应用');
                        return;
                    }
                    console.log('当前skinEdit:', skinSwitch.saveSkinParams);

                    for (let k in skinSwitch.saveSkinParams) {
                        console.log(`处理角色: ${k}`);
                        // 只更新存在key的数据
                        for (let m in skinSwitch.saveSkinParams[k]) {
                            console.log(`  处理皮肤: ${m}`);
                            if (decadeUI.dynamicSkin[k] && decadeUI.dynamicSkin[k][m]) {
                                console.log(`    找到对应的dynamicSkin配置`);
                                console.log(`    保存的参数:`, skinSwitch.saveSkinParams[k][m]);
                                let gongji = decadeUI.dynamicSkin[k][m].gongji
                                if (skinSwitch.saveSkinParams[k][m].gongji) {
                                    if (typeof gongji === 'string') {
                                        gongji = {
                                            action: gongji
                                        }
                                    } else if (gongji === true) {
                                        gongji = {}
                                    } else if (typeof gongji !== 'object') {
                                        gongji = {}
                                    }
                                    if (gongji) {
                                        gongji = Object.assign(gongji, skinSwitch.saveSkinParams[k][m].gongji)
                                    }

                                }
                                for (let assignK of ['x', 'y', 'scale', 'angle']) {
                                    if (skinSwitch.saveSkinParams[k][m][assignK] != null) {
                                        console.log(`      应用${assignK}参数:`, skinSwitch.saveSkinParams[k][m][assignK]);
                                        decadeUI.dynamicSkin[k][m][assignK] = skinSwitch.saveSkinParams[k][m][assignK];
                                        console.log(`      应用后的值:`, decadeUI.dynamicSkin[k][m][assignK]);
                                    }
                                }
                                if (decadeUI.dynamicSkin[k][m].beijing && skinSwitch.saveSkinParams[k][m].beijing) {
                                    decadeUI.dynamicSkin[k][m].beijing = Object.assign(decadeUI.dynamicSkin[k][m].beijing, skinSwitch.saveSkinParams[k][m].beijing)
                                }
                                if (decadeUI.dynamicSkin[k][m].qianjing && skinSwitch.saveSkinParams[k][m].qianjing) {
                                    decadeUI.dynamicSkin[k][m].qianjing = Object.assign(decadeUI.dynamicSkin[k][m].qianjing, skinSwitch.saveSkinParams[k][m].qianjing)
                                }
                                // decadeUI.dynamicSkin[k][m] = Object.assign(decadeUI.dynamicSkin[k][m], skinSwitch.saveSkinParams[k][m])
                                if (gongji) {
                                    decadeUI.dynamicSkin[k][m].gongji = gongji
                                }

                                // 添加上千幻雷修的调整参数
                                if (skinSwitch.saveSkinParams[k][m].qhlx) {
                                    decadeUI.dynamicSkin[k][m].qhlx = skinSwitch.saveSkinParams[k][m].qhlx
                                }

                                // 添加出场出框和特殊出框调整
                                if (decadeUI.dynamicSkin[k][m].chuchang && skinSwitch.saveSkinParams[k][m].chuchang) {
                                    decadeUI.dynamicSkin[k][m].chuchang = Object.assign(decadeUI.dynamicSkin[k][m].chuchang, skinSwitch.saveSkinParams[k][m].chuchang)
                                }
                                if (decadeUI.dynamicSkin[k][m].teshu && skinSwitch.saveSkinParams[k][m].teshu) {
                                    decadeUI.dynamicSkin[k][m].teshu = Object.assign(decadeUI.dynamicSkin[k][m].teshu, skinSwitch.saveSkinParams[k][m].teshu)
                                }
                            }
                        }
                    }

                    // 为所有动皮添加皮肤名称 skinName参数
                    for (let k in decadeUI.dynamicSkin) {
                        for (let skinName in decadeUI.dynamicSkin[k]) {
                            try {
                                decadeUI.dynamicSkin[k][skinName].skinName = skinName
                            } catch (e) {
                                let str = "";
                                str += k + ":" + skinName + "\n";
                                str += JSON.stringify(decadeUI.dynamicSkin[k][skinName]);
                                alert(str);
                            }
                        }
                    }
                    console.log('=== updateDecadeDynamicSkin 执行完成 ===');
                }
                // 替换十周年内容                
                function modifyDecadeUIContent() {
                    let Player = {};

                    if (lib.config[skinSwitch.decadeKey.dynamicSkin]) {
                        if (self.OffscreenCanvas === undefined) {
                            alert("您的设备环境不支持新版手杀动皮效果，请更换更好的设备或者不使用此版本的手杀动皮效果");
                            return
                        } else {

                            // 技能
                            lib.skill._tsx = {
                                trigger: {
                                    player: ["logSkillBegin", "useSkillBegin"],
                                },
                                silent: true,
                                charlotte: true,
                                forced: true,
                                priority: 2022,
                                filter(event, player) {
                                    return player.dynamic
                                },
                                async content(event, trigger,player) {
                                    let name = event._trigger.skill
                                    if (game.phaseNumber > 0) {
                                        if (name.indexOf("_") !== 0 && skinSwitch.filterSkills.indexOf(name) === -1 || player.skills.indexOf(name) !== -1) {
                                            if (player.isAlive() && player.dynamic && !player.GongJi) {
                                                if (!player.doubleAvatar) {
                                                    let teshu = player.dynamic.primary.player.teshu
                                                    if (teshu !== null && typeof teshu === 'object') {
                                                        if (teshu.whitelist) {
                                                            if (teshu.whitelist.includes(name)) {
                                                                skinSwitch.chukuangWorkerApi.chukuangAction(player, 'TeShu');
                                                            }
                                                        } else {
                                                            skinSwitch.chukuangWorkerApi.chukuangAction(player, 'TeShu');
                                                        }
                                                    } else {
                                                        skinSwitch.chukuangWorkerApi.chukuangAction(player, 'TeShu');
                                                    }
                                                } else {
                                                    skinSwitch.chukuangWorkerApi.chukuangAction(player, 'TeShu');
                                                }
                                            }
                                            let skillInfo = get.info(name)
                                            if (skillInfo) {
                                                let specailEvent = (player, triggerName) => {
                                                    let res = skinSwitch.dynamic.getSpecial(player, triggerName)
                                                    res.forEach(r => {
                                                        const { avatar, special, effs, isPrimary } = r
                                                        let audio
                                                        // 判断觉醒技能是否是当前角色的
                                                        let tryPlayTransform = () => {
                                                            let pName = isPrimary ? player.name : player.name2
                                                            let cha = lib.character[pName]
                                                            if (!cha[3].includes(name)) {
                                                                // 可能是子技能触发的特效, 比如使命技
                                                                if (!cha[3].includes(name.slice(0, name.lastIndexOf('_'))))
                                                                    return
                                                            }
                                                            let transform = effs.transform
                                                            if (!transform || !(transform in special)) return
                                                            let trans = special[transform]
                                                            let dskins = decadeUI.dynamicSkin
                                                            // 播放转换的骨骼
                                                            let newName = trans.name
                                                            if (newName) {
                                                                // 分割名字, 获取骨骼, 与当前角色的骨骼的名字比较,是否是同名
                                                                let [key, skinName] = newName.split('/')
                                                                let dInfo = key && skinName && dskins[key] && dskins[key][skinName]
                                                                if (dInfo) {
                                                                    skinSwitch.dynamic.transformDst(player, isPrimary, dInfo, { huanfuEffect: effs.effect })
                                                                }
                                                            } else {
                                                                skinSwitch.dynamic.transformDst(player, isPrimary, trans, { huanfuEffect: effs.effect })
                                                            }
                                                            audio = trans.audio

                                                        }
                                                        tryPlayTransform()
                                                        // 检查是否有播放特效
                                                        let effectPlay = special.condition[triggerName].play
                                                        if (effectPlay) {
                                                            let eff = special[effectPlay]
                                                            if (eff) {
                                                                if (!eff.x) eff.x = [0, 0.5]
                                                                if (!eff.y) eff.y = [0, 0.5]
                                                                setTimeout(() => {
                                                                    skinSwitch.chukuangWorkerApi.playEffect(eff)
                                                                }, (eff.delay || 0) * 1000)
                                                                if (!audio) audio = eff.audio
                                                            }
                                                        }
                                                        if (!audio) audio = special.condition[triggerName].audio
                                                        if (audio) {
                                                            game.playAudio('..', skinSwitch.dcdPath, 'assets/dynamic', audio)
                                                        }
                                                    })
                                                }
                                                let res = skinSwitch.dynamic.getSpecial(player, name)
                                                res.forEach(r => {
                                                    let { avatar, isPrimary } = r
                                                    let special = avatar.special
                                                    if (!special) return;
                                                    let effs = special.condition[name]
                                                    let audio
                                                    let tryTransform = () => {
                                                        let transform = effs.transform
                                                        if (!transform || !(transform in special)) return
                                                        let trans = special[transform]
                                                        let dskins = decadeUI.dynamicSkin
                                                        // 播放转换的骨骼
                                                        let newName = trans.name
                                                        if (newName) {
                                                            // 分割名字, 获取骨骼, 与当前角色的骨骼的名字比较,是否是同名
                                                            let [key, skinName] = newName.split('/')
                                                            let dInfo = key && skinName && dskins[key] && dskins[key][skinName]
                                                            if (dInfo) {
                                                                // 添加audio属性，用于在transformDst中更新语音
                                                                dInfo.audio = trans.audio
                                                                skinSwitch.dynamic.transformDst(player, isPrimary, dInfo, { huanfuEffect: effs.effect })
                                                            }
                                                        } else {
                                                            skinSwitch.dynamic.transformDst(player, isPrimary, trans, { huanfuEffect: effs.effect })
                                                        }
                                                        audio = trans.audio
                                                    }
                                                    let tryEffectPlay = () => {
                                                        // 检查是否有播放特效
                                                        let effectPlay = effs.play
                                                        if (effectPlay) {
                                                            let eff = special[effectPlay]
                                                            if (eff) {
                                                                if (!eff.x) eff.x = [0, 0.5]
                                                                if (!eff.y) eff.y = [0, 0.5]
                                                                setTimeout(() => {
                                                                    skinSwitch.chukuangWorkerApi.playEffect(eff)
                                                                }, (eff.delay || 0) * 1000)
                                                                if (!audio) audio = eff.audio
                                                            }
                                                        }
                                                    }
                                                    tryTransform()
                                                    tryEffectPlay()
                                                })
                                                if (skillInfo.juexingji) {
                                                    specailEvent(player, 'juexingji')
                                                }
                                                if (skillInfo.limited) {
                                                    specailEvent(player, 'xiandingji')
                                                }
                                                // 检查使命技
                                                if (name.endsWith('_fail')) {
                                                    let parentSkill = name.slice(0, name.length - 5)
                                                    let parentSkillInfo = get.info(parentSkill)
                                                    if (parentSkillInfo && parentSkillInfo.dutySkill) {
                                                        specailEvent(player, 'shimingjiFail')
                                                    }
                                                } else if (name.endsWith('_achieve')) {
                                                    let parentSkill = name.slice(0, name.length - 8)
                                                    let parentSkillInfo = get.info(parentSkill)
                                                    if (parentSkillInfo && parentSkillInfo.dutySkill) {
                                                        specailEvent(player, 'shimingjiSuccess')
                                                    }
                                                }

                                            }

                                        }
                                    }
                                }
                            }

                            lib.skill._gj = {
                                // 指定多个目标也让触发攻击状态
                                trigger: { player: ['useCardBefore', 'useCard1', 'useCard2'] },
                                forced: true,
                                filter: function (event, player) {
                                    if (player.isUnseen()) return false;
                                    if (!player.dynamic) return false;
                                    if (_status.currentPhase != player) return false;
                                    if (event.card.name == "huogong") return false;
                                    let type = get.type(event.card);
                                    return ((type == 'basic' || type == 'trick') && get.tag(event.card, 'damage') > 0)
                                },
                                content: function () {
                                    // player.GongJi = true;
                                    // 判定当前是否可以攻击, 可能是国战有隐藏武将
                                    let res = skinSwitch.dynamic.checkCanBeAction(player);
                                    if (!res || !res.dynamic) return player.GongJi = false;
                                    else {
                                        // 添加指示线功能, 加载攻击指示线骨骼, 直接使用十周年ani来进行播放
                                        let dy = (player.dynamic.primary && player.dynamic.primary.player && player.dynamic.primary.player.zhishixian) || (player.dynamic.deputy && player.dynamic.deputy.player && player.dynamic.deputy.player.zhishixian)
                                        let args = null

                                        let getArgs = (filterPlayers = []) => {
                                            if (dy != null) {
                                                if (event.triggername !== 'useCardBefore' && event._trigger.targets.length < 2) {
                                                    return
                                                }
                                                let hand = dui.boundsCaches.hand;
                                                let x1, y1

                                                args = {
                                                    hand: null,  // 手牌区域
                                                    attack: {},  // 攻击方坐标
                                                    targets: [],  // 攻击目标坐标
                                                    bodySize: {
                                                        bodyWidth: decadeUI.get.bodySize().width,
                                                        bodyHeight: decadeUI.get.bodySize().height
                                                    }
                                                }

                                                player.checkBoundsCache(true);
                                                if (player === game.me) {
                                                    hand.check();
                                                    x1 = hand.x + hand.width / 2;
                                                    y1 = hand.y;
                                                    args.hand = {
                                                        x1: x1,
                                                        y1: y1
                                                    }
                                                }
                                                // 攻击方的位置
                                                args.attack = player.getBoundingClientRect()

                                                // 计算当前角色和其他角色的角度. 参考十周年ui的指示线
                                                for (let p of event._trigger.targets) {
                                                    if (filterPlayers.includes(p)) continue
                                                    p.checkBoundsCache(true);
                                                    args.targets.push({
                                                        boundRect: p.getBoundingClientRect(),
                                                    })
                                                }
                                            }
                                        }

                                        // 记忆上次的攻击事件, useCard, useCard1, useCard2,会短时间内连续触发. 这样先过滤掉

                                        let timeDelta = player.__lastGongji ? new Date().getTime() - player.__lastGongji.t : 10000
                                        // 间隔极短的连续攻击忽略不计
                                        if (timeDelta < 20) return

                                        if (timeDelta >= 200) {
                                            if (/*timeDelta <= 350 &&*/ event.triggername !== 'useCardBefore') {
                                                if (player.__lastGongji && event._trigger.targets.length <= player.__lastGongji.tLen) {
                                                    return
                                                }
                                            }
                                            getArgs()
                                            skinSwitch.chukuangWorkerApi.chukuangAction(player, 'GongJi', args ? { attackArgs: args, triggername: event.triggername } : {});
                                            player.__lastGongji = {
                                                t: new Date().getTime(),
                                                tLen: event._trigger.targets.length,
                                            }
                                        } else {
                                            if (event.triggername !== 'useCardBefore') {
                                                if (event._trigger.targets.length <= player.__lastGongji.tLen) {
                                                    return
                                                }
                                                getArgs()
                                                if (args) {
                                                    skinSwitch.chukuangWorkerApi.chukuangAction(player, 'GongJi', { attackArgs: args, triggername: event.triggername })
                                                    player.__lastGongji = {
                                                        t: new Date().getTime(),
                                                        tLen: event._trigger.targets.length,
                                                    }
                                                }
                                            }
                                        }


                                    }
                                }
                            }
                            // 只有主动发动技能才会触发这个
                            lib.skill._ts = {
                                trigger: {
                                    player: ['useSkillBefore']
                                },
                                forced: true,
                                filter: function (event, player) {
                                    return player.isAlive() && player.dynamic;
                                },
                                content: function () {
                                    // 检查限定技
                                    let skillType = ''
                                    let triggerSkill = event.getTrigger().skill
                                    if (triggerSkill && triggerSkill[0] === '_') return

                                    let skillInfo = get.info(triggerSkill)
                                    let dskins = decadeUI.dynamicSkin
                                    if (skillInfo) {
                                        if (skillInfo.limited) {
                                            let res = skinSwitch.dynamic.getSpecial(player, 'xiandingji')
                                            res.forEach(r => {
                                                const { avatar, special, effs, isPrimary } = r
                                                let pName = isPrimary ? player.name : player.name2
                                                let cha = lib.character[pName]
                                                if (!cha[3].includes(triggerSkill)) {
                                                    return
                                                }
                                                let audio
                                                let tryPlayTransform = () => {
                                                    let transform = effs.transform
                                                    if (!transform || !(transform in special)) return
                                                    let trans = special[transform]
                                                    let dskins = decadeUI.dynamicSkin
                                                    // 播放转换的骨骼
                                                    let newName = trans.name
                                                    if (newName) {
                                                        // 分割名字, 获取骨骼, 与当前角色的骨骼的名字比较,是否是同名
                                                        let [key, skinName] = newName.split('/')
                                                        let dInfo = key && skinName && dskins[key] && dskins[key][skinName]
                                                        if (dInfo) {
                                                            skinSwitch.dynamic.transformDst(player, isPrimary, dInfo, { huanfuEffect: effs.effect })
                                                        }
                                                    } else {
                                                        skinSwitch.dynamic.transformDst(player, isPrimary, trans, { huanfuEffect: effs.effect })
                                                    }
                                                    audio = trans.audio
                                                }

                                                let tryPlayEffect = () => {
                                                    let effectPlay = special.condition.xiandingji.play
                                                    if (effectPlay) {
                                                        let eff = special[effectPlay]
                                                        if (eff) {
                                                            if (!eff.x) eff.x = [0, 0.5]
                                                            if (!eff.y) eff.y = [0, 0.5]
                                                            setTimeout(() => {
                                                                skinSwitch.chukuangWorkerApi.playEffect(eff)
                                                            }, (eff.delay || 0) * 1000)

                                                            if (!audio) audio = eff.audio
                                                        }
                                                    }
                                                }
                                                tryPlayTransform()
                                                tryPlayEffect()
                                                if (!audio) audio = special.condition.xiandingji.audio
                                                if (audio) {
                                                    game.playAudio('..', skinSwitch.dcdPath, 'assets/dynamic', audio)
                                                }
                                            })
                                        } else if (skillInfo.dutySkill) {
                                            skillType = 'shimingji';

                                        } else if (skillInfo.zhuanhuanji) {
                                            let res = skinSwitch.dynamic.getSpecial(player, 'zhuanhuanji')
                                            res.forEach(r => {
                                                const { avatar, special, effs, isPrimary } = r
                                                let pName = isPrimary ? player.name : player.name2
                                                let cha = lib.character[pName]
                                                if (!cha[3].includes(triggerSkill)) {
                                                    return
                                                }
                                                player.zhuanhuanjiFlag = !player.zhuanhuanjiFlag
                                                let audio
                                                let tryPlayTransform = () => {
                                                    let transform = effs.transform
                                                    if (!transform || !(transform in special)) return
                                                    let trans = special[transform]
                                                    const originSkin = player.originSkin
                                                    if (player.zhuanhuanjiFlag) {
                                                        // 播放转换的骨骼
                                                        let newName = trans.name
                                                        if (newName) {
                                                            // 分割名字, 获取骨骼, 与当前角色的骨骼的名字比较,是否是同名
                                                            let [key, skinName] = newName.split('/')
                                                            let dInfo = key && skinName && dskins[key] && dskins[key][skinName]
                                                            if (dInfo) {
                                                                skinSwitch.dynamic.transformDst(player, isPrimary, dInfo, { huanfuEffect: effs.effect })
                                                            }
                                                        } else {
                                                            skinSwitch.dynamic.transformDst(player, isPrimary, trans, { huanfuEffect: effs.effect })
                                                        }
                                                    } else {
                                                        // 如果当前已经是变身后的骨骼, 需要恢复原始骨骼.
                                                        if (avatar.name !== originSkin.name) {
                                                            // 触发变回原始皮肤
                                                            skinSwitch.dynamic.transformDst(player, isPrimary, originSkin, { huanfuEffect: effs.effect, isOrigin: true })
                                                        } else {
                                                            skinSwitch.dynamic.transformDst(player, isPrimary, originSkin, { huanfuEffect: effs.effect, isOrigin: true })
                                                        }
                                                    }
                                                    audio = trans.audio
                                                }

                                                let tryPlayEffect = () => {
                                                    let effectPlay = special.condition.zhuanhuanji.play
                                                    if (effectPlay) {
                                                        let eff = special[effectPlay]
                                                        if (eff) {
                                                            if (!eff.x) eff.x = [0, 0.5]
                                                            if (!eff.y) eff.y = [0, 0.5]
                                                            setTimeout(() => {
                                                                skinSwitch.chukuangWorkerApi.playEffect(eff)
                                                            }, (eff.delay || 0) * 1000)
                                                            if (!audio) audio = eff.audio
                                                        }
                                                    }

                                                }
                                                tryPlayTransform()
                                                tryPlayEffect()
                                                if (!audio) audio = special.condition.zhuanhuanji.audio
                                                if (audio) {
                                                    game.playAudio('..', skinSwitch.dcdPath, 'assets/dynamic', audio)
                                                }
                                            })
                                        }
                                    }

                                    // 过滤技能白名单, 只在单将模式下生效
                                    if (!player.doubleAvatar) {
                                        let teshu = player.dynamic.primary && player.dynamic.primary.player.teshu
                                        if (typeof teshu === 'object') {
                                            if (teshu.whitelist) {
                                                if (teshu.whitelist.includes(triggerSkill)) {
                                                    skinSwitch.chukuangWorkerApi.chukuangAction(player, 'TeShu');
                                                }
                                            } else {
                                                skinSwitch.chukuangWorkerApi.chukuangAction(player, 'TeShu');
                                            }
                                        } else {
                                            skinSwitch.chukuangWorkerApi.chukuangAction(player, 'TeShu');
                                        }
                                    } else {
                                        skinSwitch.chukuangWorkerApi.chukuangAction(player, 'TeShu');
                                    }
                                }
                            }

                            lib.skill._playAudioToQueue = {
                                trigger: { player: ['useCardBefore', 'respondBefore'] },
                                forced: true,
                                filter: function (event, player) {
                                    if (player.isUnseen()) return false;
                                    if (!player.dynamic) return false;
                                    return player.dynamic.primary && player.dynamic.primary.player.audio
                                },
                                content: function () {
                                    let id = player.dynamic.id
                                    let skinId = player.dynamic.primary.id
                                    if (!skinSwitch.audioPlayQueue) {
                                        skinSwitch.audioPlayQueue = []
                                    }
                                    // 添加到队列中, 每次播放音频, 检查当前队列是否有待替换的语音需要进行播放
                                    let card = event.getTrigger().card
                                    let cardName
                                    if (card.name == 'sha' && (card.nature == 'fire' || card.nature == 'thunder' || card.nature == 'ice' || card.nature == 'stab')) {
                                        cardName = card.name + '_' + card.nature
                                    } else {
                                        cardName = card.name
                                    }

                                    skinSwitch.audioPlayQueue.push({
                                        'card': cardName,
                                        'id': id,
                                        'skinId': skinId,
                                        'time': new Date().getTime()
                                    })

                                }
                            }

                            // 回合开始,,播放出场动画, 暂时不考虑双将模式
                            lib.skill._checkDcdChuChang = {
                                trigger: {
                                    global: "phaseBefore",
                                },
                                forced: true,
                                filter: function (event, player) {
                                    return game.players.length > 1  /*&&player.phaseNumber===0*/ && player === event.player && !player.doubleAvatar && player.dynamic && player.dynamic.primary && player.dynamic.primary.player.chuchang
                                },
                                content: function () {
                                    skinSwitch.chukuangWorkerApi.chukuangAction(player, 'chuchang')
                                }
                            };
                            
                            // 添加互动出框，当玩家响应对方的出牌动作时
                            lib.skill._checkHudongChuKuang = {
                                trigger: {
                                    player: "respond",
                                },
                                forced: true,
                                filter: function (event, player) {
                                    // 只有动皮并且设置了hudong参数的角色才触发互动出框
                                    return player.dynamic && player.dynamic.primary && 
                                           player.dynamic.primary.player.hudong &&
                                           lib.config[skinSwitch.configKey.attackEffect] === 'on';
                                },
                                content: function () {
                                    // 触发互动出框效果
                                    skinSwitch.chukuangWorkerApi.chukuangAction(player, 'hudong');
                                }
                            };
                            
                            lib.skill._checkDcdShan = {
                                trigger: {
                                    player: 'useCard'
                                },
                                forced: true,
                                filter: function (event, player) {
                                    // 打出闪时
                                    return event.card.name === 'shan' && player.dynamic && (player.dynamic.primary && player.dynamic.primary.player.shizhounian || player.dynamic.deputy && player.dynamic.deputy.player.shizhounian)
                                },
                                content: function () {
                                    // 如果是双将, 只指定一个进行
                                    if (player.dynamic.primary && player.dynamic.primary.player.shizhounian) {
                                        skinSwitch.postMsgApi.action(player, player.dynamic.primary.player.shan || 'play3', player.dynamic.primary)
                                    } else {
                                        skinSwitch.postMsgApi.action(player, player.dynamic.deputy.player.shan || 'play3', player.dynamic.deputy)
                                    }

                                }
                            }

                            // 游戏开始时检查所有角色的圆弧组别是否正确
                            lib.skill._fix_yh = {
                                trigger: {
                                    global: 'gameStart'
                                },
                                forced: true,
                                filter: function (event, player) {
                                    return !(lib.config[skinSwitch.decadeKey.newDecadeStyle] === "on")
                                },
                                content: function () {
                                    skinSwitch.skinSwitchCheckYH(player)
                                }
                            }

                            // 添加游戏开始时重新应用保存的动皮参数的技能
                            lib.skill._pfqh_reapply_saved_params = {
                                trigger: {
                                    global: 'gameStart'
                                },
                                forced: true,
                                silent: true,
                                priority: 100, // 高优先级确保在其他技能之前执行
                                content: function () {
                                    // 多次尝试应用参数，确保成功
                                    let applyParams = () => {
                                        console.log('=== 尝试应用保存的动皮参数 ===');
                                        console.log('当前保存的参数:', window.skinSwitch ? skinSwitch.saveSkinParams : 'skinSwitch不存在');
                                        console.log('十周年UI状态:', window.decadeUI ? '已加载' : '未加载');

                                        if (window.skinSwitch && typeof skinSwitch.updateDecadeDynamicSkin === 'function' && window.decadeUI) {
                                            skinSwitch.updateDecadeDynamicSkin();
                                            console.log('已重新应用保存的动皮参数');

                                            // 输出应用后的结果
                                            if (decadeUI.dynamicSkin) {
                                                console.log('应用后的dynamicSkin:', decadeUI.dynamicSkin);
                                            }
                                            return true;
                                        } else {
                                            console.warn('条件不满足，跳过应用');
                                            return false;
                                        }
                                    };

                                    // 立即尝试一次
                                    if (!applyParams()) {
                                        // 如果失败，延迟500ms再试
                                        setTimeout(() => {
                                            if (!applyParams()) {
                                                // 如果还失败，再延迟1000ms试一次
                                                setTimeout(() => {
                                                    if (!applyParams()) {
                                                        // 最后再延迟2000ms试一次
                                                        setTimeout(applyParams, 2000);
                                                    }
                                                }, 1000);
                                            }
                                        }, 500);
                                    }
                                }
                            }

                            // 添加角色初始化时重新应用保存的动皮参数的技能
                            lib.skill._pfqh_reapply_on_init = {
                                trigger: {
                                    player: 'enterGame'
                                },
                                forced: true,
                                silent: true,
                                priority: -100, // 低优先级，确保在角色完全初始化后执行
                                filter: function (event, player) {
                                    return player.dynamic && player.dynamic.primary;
                                },
                                content: function () {
                                    // 延迟执行，确保角色完全初始化
                                    setTimeout(() => {
                                        console.log('=== 角色初始化完成，重新应用保存的动皮参数 ===', player.name);
                                        if (window.skinSwitch && typeof skinSwitch.updateDecadeDynamicSkin === 'function' && window.decadeUI) {
                                            skinSwitch.updateDecadeDynamicSkin();
                                            console.log('角色初始化时已重新应用保存的动皮参数');
                                        }
                                    }, 200);
                                }
                            }

                            // 不知道怎么合并, 在回合开始和回合结束, 检测Player的group变化
                            lib.skill._fix_phase_yh = {
                                trigger: {
                                    player: ['phaseBegin', 'phaseEnd']
                                },
                                forced: true,
                                filter: function (event, player) {
                                    return !(lib.config[skinSwitch.decadeKey.newDecadeStyle] === "on")
                                },
                                content: function () {
                                    skinSwitch.skinSwitchCheckYH(player)
                                }
                            }

                            lib.skill._check_die_yh = {
                                trigger: {
                                    player: "dieBefore",
                                },
                                silent: true,
                                charlotte: true,
                                forced: true,
                                filter(event, player) {
                                    return player.dynamic
                                },
                                content: function () {
                                    let skinYh = player.getElementsByClassName("skinYh");
                                    if (skinYh.length > 0) {
                                        player.removeChild(skinYh[0]);
                                    }
                                }
                            }

                            // 血量变化时, 触发变身
                            lib.skill._pfqh_check_hp_change = {
                                trigger: {
                                    player: ['changeHp'],
                                },
                                silent: true,
                                charlotte: true,
                                forced: true,
                                filter(event, player) {
                                    // 只有动皮可以进行过滤.
                                    return player.dynamic
                                },
                                content: function () {
                                    // 获取有配置了special的角色
                                    let res = skinSwitch.dynamic.getSpecial(player, 'lowhp')
                                    res.forEach(r => {
                                        const { avatar, special, effs, isPrimary } = r
                                        // 默认回复血量不变回来, 和十周年保持一致
                                        if (event.getTrigger().num > 0 && !effs.recover) {
                                            return
                                        }
                                        let hp = player.hp
                                        if (isPrimary && player._primaryLowestHp == null) {
                                            player._primaryLowestHp = hp + 1000
                                        }
                                        if (!isPrimary && player._deputyLowestHp == null) {
                                            player._deputyLowestHp = hp + 1000
                                        }
                                        if (!effs.recover) {
                                            if ((isPrimary && hp >= player._primaryLowestHp) || (!isPrimary && hp >= player._deputyLowestHp))
                                                return // 排除救助回来, 然后继续重复变身
                                        }
                                        if (isPrimary) {
                                            player._primaryLowestHp = hp
                                        } else {
                                            player._deputyLowestHp = hp
                                        }
                                        let audio;
                                        let tryPlayTransform = () => {
                                            let lowhpTransform = effs.transform
                                            if (!lowhpTransform || lowhpTransform.length === 0) return

                                            const originSkin = isPrimary ? player.originSkin : player.originSkin2

                                            let transList = []
                                            if (lowhpTransform) {
                                                for (let transName of lowhpTransform) {
                                                    // 获取配置里的设置.
                                                    let set = special[transName]
                                                    if (set && set.hp) {
                                                        transList.push(set)
                                                    }
                                                }
                                            }
                                            transList.sort((a, b) => { return a.hp - b.hp })
                                            // 找到合适的符合当前血量的区间.
                                            let index = -1
                                            for (let i = 0; i < transList.length; i++) {
                                                if (hp <= transList[i].hp) {
                                                    index = i
                                                    break
                                                }
                                            }
                                            let trans
                                            let dskins = decadeUI.dynamicSkin

                                            // 说明当前是原始状态
                                            if (index === -1) {
                                                // 如果当前已经是变身后的骨骼, 需要恢复原始骨骼.
                                                if (!originSkin.skin) originSkin.skin = 'default'
                                                skinSwitch.dynamic.transformDst(player, isPrimary, originSkin, { huanfuEffect: effs.effect, isOrigin: true })
                                            } else {
                                                // 说明当前满足血量变化
                                                trans = transList[index]
                                                audio = trans.audio
                                                let newName = trans.name
                                                if (newName) {
                                                    // 分割名字, 获取骨骼, 与当前角色的骨骼的名字比较,是否是同名
                                                    let [key, skinName] = newName.split('/')
                                                    if (!key || !skinName) return
                                                    let dInfo = dskins[key] && dskins[key][skinName]
                                                    if (!dInfo) return

                                                    // 创建新的dInfo副本，避免修改原始对象
                                                    let newDInfo = Object.assign({}, dInfo)
                                                    console.log(newDInfo)

                                                    // 添加audio属性，确保在transformDst中更新语音
                                                    newDInfo.audio = trans.audio
                                                    console.log(newDInfo.audio)

                                                    // 标记需要更新音频
                                                    newDInfo._needUpdateAudio = true

                                                    // 传递原始皮肤的音频信息以便恢复
                                                    if (avatar && avatar.audio) {
                                                        newDInfo._originalAudio = avatar.audio
                                                    }
                                                    console.log(newDInfo._originalAudio)

                                                    skinSwitch.dynamic.transformDst(player, isPrimary, newDInfo, { huanfuEffect: effs.effect })

                                                    // 只有更换新骨骼才会触发播放语音
                                                    if (dInfo.name !== player.dynamic[isPrimary ? 'primary' : 'deputy'].name) {
                                                        tryPlayEffect()
                                                        if (!audio) audio = special.condition.lowhp.audio
                                                        if (audio) {
                                                            game.playAudio('..', skinSwitch.dcdPath, 'assets/dynamic', audio)
                                                        }

                                                        // 强制重新加载皮肤的语音
                                                        setTimeout(() => {
                                                            skinSwitch.reloadAudioForSkin(player, isPrimary, trans.audio);
                                                        }, 1000);
                                                    }
                                                } else {
                                                    skinSwitch.dynamic.transformDst(player, isPrimary, trans, { huanfuEffect: effs.effect })
                                                }
                                            }

                                        }
                                        let tryPlayEffect = () => {
                                            let effectPlay = special.condition.lowhp.play
                                            if (effectPlay) {
                                                let eff = special[effectPlay]
                                                if (eff) {
                                                    if (!eff.x) eff.x = [0, 0.5]
                                                    if (!eff.y) eff.y = [0, 0.5]
                                                    setTimeout(() => {
                                                        skinSwitch.chukuangWorkerApi.playEffect(eff)
                                                    }, (eff.delay || 0) * 1000)
                                                    if (!audio) audio = eff.audio
                                                }
                                            }
                                        }
                                        tryPlayTransform()
                                    })
                                }

                            }

                            // 检测受到伤害次数并且变身或者播放特效, 只有达到指定的次数才播放
                            lib.skill._pfqh_check_damage_times = {
                                trigger: {
                                    player: ['damage'],
                                },
                                silent: true,
                                charlotte: true,
                                forced: true,
                                filter(event, player) {
                                    // 只有动皮可以进行过滤.
                                    return player.dynamic
                                },
                                content: function () {
                                    // 获取有配置了special的角色
                                    if (player.__damage_times == null) {
                                        player.__damage_times = 1
                                    } else {
                                        player.__damage_times++
                                    }
                                    let res = skinSwitch.dynamic.getSpecial(player, 'damageTimes')
                                    res.forEach(r => {
                                        const { avatar, special, effs, isPrimary } = r
                                        // 获取低血量的配置
                                        let transforms = effs.transform || []

                                        // const originSkin = isPrimary ? player.originSkin : player.originSkin2

                                        let transList = []
                                        for (let transName of transforms) {
                                            // 获取配置里的设置.
                                            let set = special[transName]
                                            if (set && set.times) {
                                                transList.push(set)
                                            }
                                        }
                                        transList.sort((a, b) => { return a.times - b.times })
                                        let times = player.__damage_times
                                        // 找到合适的符合当前血量的区间.
                                        let index = -1
                                        for (let i = 0; i < transList.length; i++) {
                                            if (times === transList[i].times) {
                                                index = i
                                                break
                                            }
                                            if (times < transList[i].times) {
                                                break
                                            }
                                        }
                                        let trans, audio
                                        let dskins = decadeUI.dynamicSkin
                                        // 说明当前是原始状态
                                        if (index === -1) {
                                            // 如果当前已经是变身后的骨骼, 需要恢复原始骨骼.
                                            // if (!originSkin.skin) originSkin.skin = 'default'
                                            // skinSwitch.dynamic.transformDst(player, isPrimary, originSkin, true)
                                        } else {
                                            trans = transList[index]
                                            let newName = trans.name
                                            if (newName) {
                                                // 分割名字, 获取骨骼, 与当前角色的骨骼的名字比较,是否是同名
                                                let [key, skinName] = newName.split('/')
                                                let dInfo = key && skinName && dskins[key] && dskins[key][skinName]
                                                if (dInfo) {
                                                    // 添加audio属性和标记，确保语音更新
                                                    dInfo = Object.assign({}, dInfo);
                                                    dInfo.audio = trans.audio;
                                                    dInfo._needUpdateAudio = true;

                                                    skinSwitch.dynamic.transformDst(player, isPrimary, dInfo, { huanfuEffect: effs.effect })

                                                    // 只有更换新骨骼才会触发播放语音
                                                    if (dInfo.name !== avatar.name) {
                                                        // 强制重新加载皮肤的语音
                                                        setTimeout(() => {
                                                            if (trans.audio) {
                                                                skinSwitch.reloadAudioForSkin(player, isPrimary, trans.audio);
                                                            }
                                                        }, 1000);
                                                        audio = trans.audio

                                                        // 检查是否有播放特效
                                                        let effectPlay = effs.play
                                                        if (effectPlay) {
                                                            let eff = special[effectPlay]
                                                            if (eff) {
                                                                if (!eff.x) eff.x = [0, 0.5]
                                                                if (!eff.y) eff.y = [0, 0.5]
                                                                setTimeout(() => {
                                                                    skinSwitch.chukuangWorkerApi.playEffect(eff)
                                                                }, (eff.delay || 0) * 1000)

                                                                if (!audio) audio = eff.audio
                                                            }
                                                        }

                                                        if (!audio) audio = special.condition.damageTimes.audio
                                                        if (audio) {
                                                            game.playAudio('..', skinSwitch.dcdPath, 'assets/dynamic', audio)
                                                        }
                                                    }

                                                }
                                            } else {
                                                skinSwitch.dynamic.transformDst(player, isPrimary, trans, { huanfuEffect: effs.effect })
                                            }
                                        }
                                    })
                                }

                            }

                            // 检测受到伤害变身或者播放特效
                            lib.skill._pfqh_check_damage = {
                                trigger: {
                                    player: ['damage'],
                                },
                                silent: true,
                                charlotte: true,
                                forced: true,
                                filter(event, player) {
                                    // 只有动皮可以进行过滤.
                                    return player.dynamic
                                },
                                content: function () {
                                    let res = skinSwitch.dynamic.getSpecial(player, 'damage')

                                    res.forEach(r => {
                                        const { avatar, special, effs, isPrimary } = r
                                        let pName = isPrimary ? player.name : player.name2
                                        let audio
                                        let tryPlayTransform = () => {
                                            // 判断当前皮肤是否已经进行过变身了, 如果变身过, 取消变身.
                                            let key = isPrimary ? 'damagePrimaryTransform' : 'damageDeputyTransform'
                                            if (player[key]) { return }
                                            let transform = effs.transform
                                            if (!transform || !(transform in special)) return
                                            let trans = special[transform]
                                            let dskins = decadeUI.dynamicSkin
                                            // 播放转换的骨骼
                                            let newName = trans.name
                                            if (newName) {
                                                // 分割名字, 获取骨骼, 与当前角色的骨骼的名字比较,是否是同名
                                                let [key, skinName] = newName.split('/')
                                                let dInfo = key && skinName && dskins[key] && dskins[key][skinName]
                                                if (dInfo) {
                                                    // 添加audio属性和标记，确保语音更新
                                                    dInfo = Object.assign({}, dInfo);
                                                    dInfo.audio = trans.audio;
                                                    dInfo._needUpdateAudio = true;

                                                    skinSwitch.dynamic.transformDst(player, isPrimary, dInfo, { huanfuEffect: effs.effect })

                                                    // 强制重新加载皮肤的语音
                                                    setTimeout(() => {
                                                        if (trans.audio) {
                                                            skinSwitch.reloadAudioForSkin(player, isPrimary, trans.audio);
                                                        }
                                                    }, 1000);
                                                }
                                            } else {
                                                // 为trans添加标记
                                                trans = Object.assign({}, trans);
                                                trans._needUpdateAudio = true;
                                                skinSwitch.dynamic.transformDst(player, isPrimary, trans, { huanfuEffect: effs.effect })

                                                // 强制重新加载皮肤的语音
                                                setTimeout(() => {
                                                    if (trans.audio) {
                                                        skinSwitch.reloadAudioForSkin(player, isPrimary, trans.audio);
                                                    }
                                                }, 1000);
                                            }
                                            audio = trans.audio
                                        }

                                        let tryPlayEffect = () => {
                                            let effectPlay = effs.play
                                            if (effectPlay) {
                                                let eff = special[effectPlay]
                                                if (eff) {
                                                    if (!eff.x) eff.x = [0, 0.5]
                                                    if (!eff.y) eff.y = [0, 0.5]
                                                    setTimeout(() => {
                                                        skinSwitch.chukuangWorkerApi.playEffect(eff)
                                                    }, (eff.delay || 0) * 1000)

                                                    if (!audio) audio = eff.audio
                                                }
                                            }
                                        }
                                        tryPlayTransform()
                                        tryPlayEffect()
                                        if (!audio) audio = special.condition.damage.audio
                                        if (audio) {
                                            game.playAudio('..', skinSwitch.dcdPath, 'assets/dynamic', audio)
                                        }
                                    })
                                }

                            }

                            // 击杀
                            lib.skill._pfqh_check_jisha = {
                                trigger: {
                                    source: "dieBegin",
                                },
                                silent: true,
                                charlotte: true,
                                forced: true,
                                priority: 2022,
                                filter(event, player) {
                                    return player.dynamic
                                },
                                content: function () {
                                    let res = skinSwitch.dynamic.getSpecial(player, 'jisha')
                                    res.forEach(r => {
                                        const { avatar, special, effs, isPrimary } = r
                                        let audio
                                        let tryTransform = () => {
                                            let transform = effs.transform
                                            if (!transform || !(transform in special)) return
                                            let trans = special[transform]
                                            let dskins = decadeUI.dynamicSkin
                                            // 播放转换的骨骼
                                            let newName = trans.name
                                            if (newName) {
                                                // 分割名字, 获取骨骼, 与当前角色的骨骼的名字比较,是否是同名
                                                let [key, skinName] = newName.split('/')
                                                let dInfo = key && skinName && dskins[key] && dskins[key][skinName]
                                                if (dInfo) {
                                                    // 添加audio属性和标记，确保语音更新
                                                    dInfo = Object.assign({}, dInfo);
                                                    dInfo.audio = trans.audio;
                                                    dInfo._needUpdateAudio = true;

                                                    skinSwitch.dynamic.transformDst(player, isPrimary, dInfo, { huanfuEffect: effs.effect })

                                                    // 强制重新加载皮肤的语音
                                                    setTimeout(() => {
                                                        if (trans.audio) {
                                                            skinSwitch.reloadAudioForSkin(player, isPrimary, trans.audio);
                                                        }
                                                    }, 1000);
                                                }
                                            } else {
                                                // 为trans添加标记
                                                trans = Object.assign({}, trans);
                                                trans._needUpdateAudio = true;
                                                skinSwitch.dynamic.transformDst(player, isPrimary, trans, { huanfuEffect: effs.effect })

                                                // 强制重新加载皮肤的语音
                                                setTimeout(() => {
                                                    if (trans.audio) {
                                                        skinSwitch.reloadAudioForSkin(player, isPrimary, trans.audio);
                                                    }
                                                }, 1000);
                                            }
                                            audio = trans.audio
                                        }

                                        let tryEffectPlay = () => {
                                            // 检查是否有播放特效
                                            let effectPlay = effs.play
                                            if (effectPlay) {
                                                let eff = special[effectPlay]
                                                if (eff) {
                                                    if (!eff.x) eff.x = [0, 0.5]
                                                    if (!eff.y) eff.y = [0, 0.5]
                                                    setTimeout(() => {
                                                        skinSwitch.chukuangWorkerApi.playEffect(eff)
                                                    }, (eff.delay || 0) * 1000)
                                                    if (!audio) audio = eff.audio
                                                }
                                            }
                                        }
                                        tryTransform()
                                        tryEffectPlay()

                                        if (!audio) audio = special.condition.jisha.audio
                                        if (audio) {
                                            game.playAudio('..', skinSwitch.dcdPath, 'assets/dynamic', audio)
                                        }

                                    })
                                }
                            }

                            // 改变势力
                            lib.skill._pfqh_check_changeGroup = {
                                trigger: {
                                    global: 'gameStart'
                                },
                                silent: true,
                                charlotte: true,
                                forced: true,
                                priority: 2022,
                                filter(event, player) {
                                    return player.dynamic;
                                },
                                content: function() {
                                    let res = skinSwitch.dynamic.getSpecial(player, 'changeGroup');
                                    // 接口传不过来呜呜呜，再写一遍
                                    var groupMap = {
                                      'wei': ['wei'],
                                      'shu': ['shu'],
                                      'wu': ['wu'],
                                      'qun': ['qun']
                                    };
                                    function getFirstGroupType(characterName) {
                                      var group = get.groupnature(lib.character[characterName].group);
                                      for (var type in groupMap) {
                                        if (groupMap[type].some(function(keyword) { return group.startsWith(keyword); })) {
                                          return type;
                                        }
                                      }  
                                      return null; 
                                    }
                                    var playerGroupType = getFirstGroupType(player.name);
                                    var currentPlayerGroupType = player.group;
                                    if (currentPlayerGroupType !== playerGroupType) {    

                                        // 检查是否执行过换肤操作
                                        res.forEach(r => {
                                            const { avatar, special, effs, isPrimary } = r;
                                            let audio;

                                            let tryTransform = () => {
                                                let transform = effs.transform;
                                                if (!transform || !(transform in special)) return;
                                                let trans = special[transform];
                                                let dskins = decadeUI.dynamicSkin;
                                                // 播放转换的骨骼
                                                let newName = trans.name;
                                                if (newName) {
                                                    // 分割名字, 获取骨骼, 与当前角色的骨骼的名字比较,是否是同名
                                                    let [key, skinName] = newName.split('/');
                                                    let dInfo = key && skinName && dskins[key] && dskins[key][skinName];
                                                    if (dInfo) {
                                                        skinSwitch.dynamic.transformDst(player, isPrimary, dInfo, { huanfuEffect: effs.effect });
                                                    }
                                                } else {
                                                    skinSwitch.dynamic.transformDst(player, isPrimary, trans, { huanfuEffect: effs.effect });
                                                }
                                                audio = trans.audio;
                                            };

                                            let tryEffectPlay = () => {
                                                // 检查是否有播放特效
                                                let effectPlay = effs.play;
                                                if (effectPlay) {
                                                    let eff = special[effectPlay];
                                                    if (eff) {
                                                        if (!eff.x) eff.x = [0, 0.5];
                                                        if (!eff.y) eff.y = [0, 0.5];
                                                        setTimeout(() => {
                                                            skinSwitch.chukuangWorkerApi.playEffect(eff);
                                                        }, (eff.delay || 0) * 1000);
                                                        if (!audio) audio = eff.audio;
                                                    }
                                                }
                                            };
                                            tryTransform();
                                            tryEffectPlay();

                                            if (!audio) audio = special.condition.changeGroup.audio;
                                            if (audio) {
                                                game.playAudio('..', skinSwitch.dcdPath, 'assets/dynamic', audio);
                                            }

                                        });
                                    }                
                                }
                            };

                            // 千幻聆音势力换肤
                            lib.skill._qhlyChangeGroupSkin = {
                                trigger: {
                                    global: 'gameStart' 
                                },
                                filter: function (event, player) {
                                    return lib.qhly_skinChange[game.qhly_getRealName(player.name1)] || lib.qhly_skinChange[game.qhly_getRealName(player.name2)];
                                },
                                direct: true,
                                forced: true,
                                charlotte: true,
                                content: function () {
                                    var groupMap = {
                                        'wei': ['wei'],
                                        'shu': ['shu'],
                                        'wu': ['wu'],
                                        'qun': ['qun']
                                    };
                                    function getFirstGroupType(characterName) {
                                        var group = get.groupnature(lib.character[characterName].group);
                                        for (var type in groupMap) {
                                            if (groupMap[type].some(function(keyword) { return group.startsWith(keyword); })) {
                                                return type;
                                            }
                                        }  
                                        return null; 
                                    }
                                    //先切换动皮，导致接口传不过去
                                    var playerGroupType = getFirstGroupType(player.name);
                                    var currentPlayerGroupType = player.group;
                                    // 检查
                                    if (currentPlayerGroupType !== playerGroupType) {
                                        if (typeof game.qhly_changeSkillSkin === 'function') {
                                            game.qhly_changeSkillSkin(player, 'changeGroup');
                                        }
                                    }   
                                }
                            };

                            // 先初步进行初始化
                            if (!lib.config['extension_千幻聆音_enable'] || lib.config['extension_千幻聆音_qhly_decadeCloseDynamic'] || !(lib.config.qhly_currentViewSkin === 'decade' || lib.config.qhly_currentViewSkin === 'shousha')) {
                                overrides(lib.element.player, Player)
                            }
                        }
                        let retryOverride = function (times, timer) {
                            if (times < 0) return
                            if (!window.decadeUI || !lib.skill._decadeUI_usecardBegin) {
                                console.log(`第${times}次尝试`)
                                let ti = setTimeout(() => {
                                    retryOverride(times - 1, ti)
                                }, 10)
                            } else {
                                overrides(lib.element.player, Player)
                                console.log('替换十周年UI player成功')
                                // 为当前的每一个player更换init方法
                                for (let i = 0; i < game.players.length; i++) {
                                    game.players[i].playDynamic = Player.playDynamic;
                                }

                                if (timer) {
                                    clearTimeout(timer)
                                }
                            }
                        }
                        // 如果千幻聆音没有开启动皮, 或者选择的UI套装不是十周年或者手杀, 初始化
                        if (!lib.config['extension_千幻聆音_enable'] || lib.config['extension_千幻聆音_qhly_decadeCloseDynamic'] || !(lib.config.qhly_currentViewSkin === 'decade' || lib.config.qhly_currentViewSkin === 'shousha')) {
                            retryOverride(20)
                        }
                    }

                    // ======== 替换结束 ========
                }

                function overrides(dest, src) {
                    if (!src) return
                    for (let key in src) {
                        dest[key] = src[key];
                    }
                }

                // 将updateDecadeDynamicSkin函数暴露到skinSwitch对象中，以便在游戏开始时调用
                skinSwitch.updateDecadeDynamicSkin = updateDecadeDynamicSkin;

                skinSwitch.waitUntil(() => {
                    return window.decadeUI && window.decadeModule && decadeUI.dynamicSkin
                }, () => {
                    updateDecadeDynamicSkin()
                })

                skinSwitch.waitUntil(() => {
                    return window.duilib && window.newDuilib
                }, () => {
                    window.duilib = newDuilib
                })
                modifyDecadeUIContent()

            }

            function l2dInit() {
                // 等待十周年UI加载完成
                skinSwitch.waitUntil(() => {
                    return window.decadeModule
                },
                    skinSwitch.overrideExtL2dMenuItem)
            }
            dynamicInit()
            l2dInit()