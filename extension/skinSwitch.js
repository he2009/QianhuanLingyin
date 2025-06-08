import {lib,get,_status,ui,game,ai} from './noname.js';
window.skinSwitch = {
    name: "千幻聆音",
    version: 1.11,
    url: lib.assetURL + "extension/千幻聆音/",
    path: 'extension/千幻聆音',
    dcdPath: 'extension/十周年UI',
    dcdUrl: lib.assetURL + "extension/十周年UI",
    qhlyUrl: lib.assetURL + "extension/千幻聆音",
    configKey: {
        'bakeup': 'extension_千幻聆音_bakeup', // 备份与替换十周年文件数据
        'dynamicSkin': 'extension_千幻聆音_dynamicSkin', // 保存选择的皮肤的历史数据
        'showEditMenu': 'extension_千幻聆音_showEditMenu', // 是否加入顶部菜单
        'showPreviewDynamicMenu': 'extension_千幻聆音_showPreviewDynamicMenu', // 预览是否加入顶部菜单
        'hideHuanFu': 'extension_千幻聆音_hideHuanFu', // 关闭隐藏换肤按钮
        'useDynamic': 'extension_千幻聆音_useDynamic', // 使用千幻聆音携带的出框功能
        'isAttackFlipX': 'extension_千幻聆音_isAttackFlipX', //
        'cugDynamicBg': 'extension_千幻聆音_cugDynamicBg', // 是否裁剪动态背景

        'lastPreviewPath': 'extension_千幻聆音_lastPreviewPath', // 上一次预览路径
        'savedPositions': 'extension_千幻聆音_savedPositions', // 保存的位置参数
        'enableQianhuanAudio': 'extension_千幻聆音_enableQianhuanAudio', // 是否启用千幻语音集成
        'attackEffect': 'extension_千幻聆音_attackEffect', // 是否启用攻击和互动出框效果

        'showTopArc': 'extension_千幻聆音_qhly_close_circle_top', // 是否显示顶部圆弧
    },
    // 十周年UI的配置key
    decadeKey: {
        'dynamicSkin': 'extension_十周年UI_dynamicSkin',
        'newDecadeStyle': 'extension_十周年UI_newDecadeStyle',
        'enable': 'extension_十周年UI_enable',
    },
    'huanfu': {
        'name': "../../../千幻聆音/images/huanfu/huanfu",
        loop: false,
        scale: 0.5,
        speed: 1.5
    },
    qhly_hasExtension: function(str) {
        if (!str || typeof str != 'string') return false;
        if (lib.config && lib.config.extensions) {
            for (var i of lib.config.extensions) {
                if (i.indexOf(str) == 0) {
                    if (lib.config['extension_' + i + '_enable']) return true;
                }
            }
        }
        return false;
    },

    editBoxShowOrHide: function() {
        editBoxShowOrHide()
    },

    // 新增：中文角色名到千幻拼音名的映射
    getCharacterPinyinName: function(chineseName) {
        // 千幻聆音中的武将名使用拼音
        const nameMapping = {
            // 基础武将
            '赵云': 'zhaoyun',
            '马超': 'machao',
            '黄忠': 'huangzhong',
            '关羽': 'guanyu',
            '张飞': 'zhangfei',
            '刘备': 'liubei',
            '诸葛亮': 'zhugeliang',
            '司马懿': 'simayi',
            '曹操': 'caocao',
            '夏侯惇': 'xiahoudun',
            '张辽': 'zhangliao',
            '许褚': 'xuchu',
            '甘宁': 'ganning',
            '吕蒙': 'lvmeng',
            '黄盖': 'huanggai',
            '周瑜': 'zhouyu',
            '大乔': 'daqiao',
            '小乔': 'xiaoqiao',
            '孙尚香': 'sunshangxiang',
            '陆逊': 'luxun',
            '孙权': 'sunquan',
            '华佗': 'huatuo',
            '吕布': 'lvbu',
            '貂蝉': 'diaochan',

            // 神武将
            '神关羽': 'shenguanyu',
            '神吕蒙': 'shenlvmeng',
            '神周瑜': 'shenzhouyu',
            '神诸葛亮': 'shenzhugeliang',
            '神司马懿': 'shensimayi',
            '神曹操': 'shencaocao',
            '神吕布': 'shenlvbu',

            // 其他武将（添加更多映射）
            '赵襄': 'zhaoxiang',
            '马云騄': 'mayunlu',
            '张春华': 'zhangchunhua',
            '法正': 'fazheng',
            '庞统': 'pangtong',
            '徐庶': 'xushu',
            '魏延': 'weiyan',
            '姜维': 'jiangwei',
            '邓艾': 'dengai',
            '钟会': 'zhonghui',
            '夏侯渊': 'xiahouyuan',
            '曹仁': 'caoren',
            '曹丕': 'caopi',
            '贾诩': 'jiaxu',
            '郭嘉': 'guojia',
            '荀彧': 'xunyu',
            '张郃': 'zhanghe',
            '徐晃': 'xuhuang',
            '于禁': 'yujin',
            '乐进': 'yuejin',
            '典韦': 'dianwei',
            '太史慈': 'taishici',
            '孙坚': 'sunjian',
            '孙策': 'sunce',
            '周泰': 'zhoutai',
            '凌统': 'lingtong',
            '程普': 'chengpu',
            '黄祖': 'huangzu',
            '韩当': 'handang',
            '蒋钦': 'jiangqin',
            '祖茂': 'zumao',
            '程昱': 'chengyu',
            '荀攸': 'xunyou',
            '刘晔': 'liuye',
            '满宠': 'manchong',
            '董昭': 'dongzhao',
            '蒯越': 'kuaiyue',
            '韩嵩': 'hansong',
            '刘表': 'liubiao',
            '蔡瑁': 'caimao',
            '张允': 'zhangyun',
            '蒯良': 'kuailiang',
            '伊籍': 'yiji',
            '孙乾': 'sunqian',
            '简雍': 'jianyong',
            '糜竺': 'mizhu',
            '糜芳': 'mifang',
            '廖化': 'liaohua',
            '关平': 'guanping',
            '关兴': 'guanxing',
            '张苞': 'zhangbao',
            '赵统': 'zhaotong',
            '赵广': 'zhaoguang',
            '关索': 'guansuo',
            '刘封': 'liufeng',
            '孟达': 'mengda',
            '霍峻': 'huojun',
            '张松': 'zhangsong',
            '法孝直': 'faxiaozhi',
            '彭羕': 'pengyang',
            '李严': 'liyan',
            '吴懿': 'wuyi',
            '马岱': 'madai',
            '王平': 'wangping',
            '句扶': 'jufu',
            '张翼': 'zhangyi',
            '廖立': 'liaoli',
            '杨仪': 'yangyi',
            '费祎': 'feiyi',
            '董允': 'dongyun',
            '蒋琬': 'jiangwan',
            '马谡': 'masu',
            '高翔': 'gaoxiang',
            '魏文长': 'weiwenchang',
            '习珍': 'xizhen',
            '陈到': 'chendao',
            '向宠': 'xiangchong',
            '张嶷': 'zhangyi',
            '宗预': 'zongyu',
            '费诗': 'feishi',
            '彭羕': 'pengyang'
        };

        // 如果有映射，返回拼音名；否则尝试自动转换或返回原名
        if (nameMapping[chineseName]) {
            return nameMapping[chineseName];
        }

        // 对于没有映射的角色，尝试一些常见的转换规则
        // 移除"神"前缀
        if (chineseName.startsWith('神')) {
            let baseName = chineseName.substring(1);
            if (nameMapping[baseName]) {
                return 'shen' + nameMapping[baseName];
            }
        }

        // 如果都没有找到，返回原名（可能千幻中就是中文名）
        console.warn('未找到角色名映射:', chineseName, '将使用原名尝试');
        return chineseName;
    },

    // 新增：千幻语音集成辅助函数
    getQianhuanAudioConfig: function(characterName, skinName) {
        // 检查是否启用千幻语音集成功能
        if (!lib.config[skinSwitch.configKey.enableQianhuanAudio]) {
            return null;
        }

        if (!skinSwitch.qhly_hasExtension('千幻聆音')) {
            return null;
        }

        try {
            // 转换中文角色名为千幻聆音中的拼音名
            const pinyinName = this.getCharacterPinyinName(characterName);

            // 构建千幻语音路径
            const qhAudioBasePath = 'sanguoaudio/';
            const skillAudioPath = qhAudioBasePath + pinyinName + '/' + (skinName || 'default');
            const cardAudioPath = qhAudioBasePath + pinyinName + '/' + (skinName || 'default') + '/card';

            console.log('构建千幻语音配置:', {
                originalCharacter: characterName,
                pinyinCharacter: pinyinName,
                skin: skinName,
                skillPath: skillAudioPath,
                cardPath: cardAudioPath
            });

            // 返回音频配置对象
            // 注意：实际的文件存在性检查会在loadAudioFiles中的safeGetFileList进行
            return {
                skill: skillAudioPath,
                card: cardAudioPath
            };
        } catch (e) {
            console.warn('构建千幻语音配置失败:', characterName, skinName, e);
            return null;
        }
    },

    // 新增：为皮肤数据添加千幻语音支持
    enhanceSkinWithQianhuanAudio: function(skinData, characterName, skinName) {
        if (!skinData || skinData.audio) {
            return skinData; // 如果已经有audio配置，则不覆盖
        }

        const qhAudioConfig = skinSwitch.getQianhuanAudioConfig(characterName, skinName);
        if (qhAudioConfig) {
            skinData.audio = qhAudioConfig;
            console.log('为皮肤添加千幻语音支持:', characterName, skinName);
        }

        return skinData;
    },

    // 新增：强制刷新当前角色的语音映射（用于觉醒等特殊情况）
    forceRefreshAudioMapping: function(player, isPrimary) {
        if (!player || !player.dynamic) {
            console.warn('forceRefreshAudioMapping: player或dynamic不存在');
            return;
        }

        let name = isPrimary ? player.name1 : player.name2;
        if (!name) {
            console.warn('forceRefreshAudioMapping: 无法获取角色名');
            return;
        }

        console.log('====== 开始强制刷新语音映射 ======');
        console.log('角色:', name, '位置:', isPrimary ? '主将' : '副将');

        let id = player.dynamic.id;
        let skinId = isPrimary ?
            (player.dynamic.primary ? player.dynamic.primary.id : null) :
            (player.dynamic.deputy ? player.dynamic.deputy.id : null);

        if (!skinId) {
            console.warn('无法获取skinId');
            return;
        }

        // 更彻底地清除语音映射
        this.clearAllAudioMappings(name, id, skinId);

        // 获取当前皮肤信息
        let currentSkin = isPrimary ? player.dynamic.primary : player.dynamic.deputy;
        if (currentSkin && currentSkin.name) {
            let [characterName, skinName] = currentSkin.name.split('/');
            if (characterName && skinName) {
                console.log('当前皮肤信息:', characterName, skinName);

                // 尝试获取千幻语音配置
                let audioConfig = currentSkin.audio || skinSwitch.getQianhuanAudioConfig(characterName, skinName);
                if (audioConfig) {
                    console.log('找到语音配置:', audioConfig);

                    // 立即重建语音映射，不使用延迟
                    this.rebuildAudioMappings(name, id, skinId, audioConfig.skill, audioConfig.card,
                        skinSwitch.dcdPath + '/assets/dynamic/',
                        function(path) {
                            let foundDot = path.lastIndexOf('.');
                            if (foundDot < 0) return path;
                            return path.slice(0, foundDot);
                        });

                    // 强制清除浏览器的音频缓存
                    setTimeout(() => {
                        this.clearBrowserAudioCache(name);
                        console.log('====== 强制刷新语音映射完成 ======');
                    }, 200);

                } else {
                    console.warn('未找到语音配置:', characterName, skinName);
                }
            } else {
                console.warn('无法解析皮肤名称:', currentSkin.name);
            }
        } else {
            console.warn('无法获取当前皮肤信息');
        }
    },

    // 新增：清除浏览器的音频缓存
    clearBrowserAudioCache: function(characterName) {
        console.log('清除浏览器音频缓存:', characterName);

        // 强制清除Audio对象的缓存
        if (window.Audio && window.Audio.cache) {
            try {
                delete window.Audio.cache;
            } catch (e) {
                console.log('无法删除Audio缓存');
            }
        }

        // 如果游戏有音频缓存机制，也尝试清除
        if (game.audio && typeof game.audio.clear === 'function') {
            try {
                game.audio.clear();
                console.log('已清除游戏音频缓存');
            } catch (e) {
                console.log('清除游戏音频缓存失败:', e);
            }
        }

        // 强制垃圾回收（如果支持）
        if (window.gc && typeof window.gc === 'function') {
            try {
                window.gc();
                console.log('已触发垃圾回收');
            } catch (e) {
                console.log('垃圾回收不可用');
            }
        }
    },

    // 新增：测试千幻语音集成功能
    testQianhuanAudioIntegration: function(characterName, skinName) {
        console.log('=== 测试千幻语音集成功能 ===');
        console.log('角色名:', characterName);
        console.log('皮肤名:', skinName);

        // 检查千幻聆音是否安装
        let hasQianhuanExtension = skinSwitch.qhly_hasExtension('千幻聆音');
        console.log('千幻聆音扩展是否安装:', hasQianhuanExtension);

        // 检查配置是否启用
        let isEnabled = lib.config[skinSwitch.configKey.enableQianhuanAudio];
        console.log('千幻语音集成是否启用:', isEnabled);

        // 尝试获取语音配置
        let audioConfig = skinSwitch.getQianhuanAudioConfig(characterName, skinName);
        console.log('语音配置结果:', audioConfig);

        if (audioConfig) {
            console.log('技能语音路径:', audioConfig.skill);
            console.log('卡牌语音路径:', audioConfig.card);
        }

        console.log('=== 测试完成 ===');
        return audioConfig;
    },

    // 新增：检查当前语音映射状态
    checkCurrentAudioMappings: function(characterName) {
        console.log('=== 当前语音映射状态 ===');
        console.log('角色名:', characterName);

        if (!skinSwitch.audioMap) {
            console.log('audioMap 不存在');
            return;
        }

        console.log('总语音映射数量:', Object.keys(skinSwitch.audioMap).length);

        // 查找该角色相关的语音映射
        let relatedMappings = {};
        for (let key in skinSwitch.audioMap) {
            if (key.includes(characterName) || key.startsWith('skill/') || key.startsWith('die/')) {
                relatedMappings[key] = skinSwitch.audioMap[key];
            }
        }

        console.log('角色相关语音映射:', relatedMappings);

        // 检查avatarAudioSkinMap
        if (skinSwitch.avatarAudioSkinMap && skinSwitch.avatarAudioSkinMap[characterName]) {
            console.log('角色专属映射:', skinSwitch.avatarAudioSkinMap[characterName]);
        } else {
            console.log('该角色没有专属语音映射');
        }

        console.log('=== 检查完成 ===');
        return relatedMappings;
    },

    // 新增：彻底清除角色语音映射（针对对局中千幻聆音）
    clearCharacterAudioMappings: function(characterName) {
        if (!characterName) return;

        console.log('====== 开始彻底清除角色语音映射 ======');
        console.log('角色名:', characterName);

        let clearedCount = 0;

        // 清除 lib.audioMap 中的映射（更彻底的清除）
        if (lib.audioMap) {
            let keysToDelete = [];
            for (let key in lib.audioMap) {
                // 清除所有包含角色名的映射，包括技能和卡牌
                if (key.includes(characterName) ||
                    key.includes(`skill_${characterName}`) ||
                    key.includes(`card_${characterName}`) ||
                    key.includes(`die/${characterName}`) ||
                    key.includes(`skill/${characterName}`) ||
                    key.startsWith(`die/${characterName}`) ||
                    key.includes(`effect/${characterName}`) ||
                    key.includes(`/${characterName}/`)) {
                    keysToDelete.push(key);
                }
            }

            keysToDelete.forEach(key => {
                console.log('删除audioMap映射:', key);
                delete lib.audioMap[key];
                clearedCount++;
            });
        }

        // 清除 lib.avatarAudioSkinMap 中的映射  
        if (lib.avatarAudioSkinMap && lib.avatarAudioSkinMap[characterName]) {
            console.log('删除avatarAudioSkinMap映射:', characterName);
            delete lib.avatarAudioSkinMap[characterName];
            clearedCount++;
        }

        // 清除skinSwitch自己的映射
        if (skinSwitch.audioMap) {
            let keysToDelete = [];
            for (let key in skinSwitch.audioMap) {
                if (key.includes(characterName)) {
                    keysToDelete.push(key);
                }
            }

            keysToDelete.forEach(key => {
                console.log('删除skinSwitch.audioMap映射:', key);
                delete skinSwitch.audioMap[key];
                clearedCount++;
            });
        }

        if (skinSwitch.avatarAudioSkinMap && skinSwitch.avatarAudioSkinMap[characterName]) {
            console.log('删除skinSwitch.avatarAudioSkinMap映射:', characterName);
            delete skinSwitch.avatarAudioSkinMap[characterName];
            clearedCount++;
        }

        // 清除浏览器音频缓存
        this.clearBrowserAudioCache();

        console.log(`彻底清除了 ${clearedCount} 个角色语音映射`);
        console.log('====== 角色语音映射清除完成 ======');
    },

    // 新增：手动强制刷新指定角色的语音（调试用）
    manualRefreshAudio: function(characterName) {
        console.log('=== 手动强制刷新角色语音 ===');
        console.log('角色名:', characterName);

        // 查找包含该角色的player
        let targetPlayer = null;
        let isPrimary = true;

        for (let player of game.players) {
            if (player.name1 === characterName) {
                targetPlayer = player;
                isPrimary = true;
                break;
            } else if (player.name2 === characterName) {
                targetPlayer = player;
                isPrimary = false;
                break;
            }
        }

        if (!targetPlayer) {
            console.warn('未找到对应的player对象');
            return;
        }

        console.log('找到目标角色:', targetPlayer, '位置:', isPrimary ? '主将' : '副将');

        // 强制刷新语音映射
        this.forceRefreshAudioMapping(targetPlayer, isPrimary);

        console.log('=== 手动刷新完成 ===');
    },

    // 新增：测试对局中千幻聆音语音（快速测试）
    testInGameSkinSwitchAudio: function() {
        console.log('=== 对局中千幻聆音语音测试 ===');

        if (!game.me) {
            console.warn('当前不在对局中');
            return;
        }

        let player = game.me;
        let characterName = player.name1;

        console.log('当前角色:', characterName);
        console.log('当前动皮状态:', player.dynamic);

        // 检查当前皮肤的语音配置
        if (player.dynamic && player.dynamic.primary) {
            let currentSkin = player.dynamic.primary;
            console.log('当前皮肤信息:', currentSkin);
            console.log('当前皮肤语音配置:', currentSkin.audio);

            // 检查千幻语音配置
            if (currentSkin.name) {
                let [charName, skinName] = currentSkin.name.split('/');
                let qhAudioConfig = skinSwitch.getQianhuanAudioConfig(charName, skinName);
                console.log('千幻语音配置:', qhAudioConfig);
            }
        }

        // 检查当前语音映射
        this.checkCurrentAudioMappings(characterName);

        console.log('=== 测试完成 ===');
        console.log('如果千幻聆音后语音不更新，请在切换后执行:');
        console.log(`skinSwitch.manualRefreshAudio('${characterName}')`);
    },

    // 新增：检查千幻聆音扩展和语音文件状态
    checkQianhuanAudioStatus: function() {
        console.log('=== 检查千幻聆音扩展状态 ===');

        // 检查千幻聆音扩展是否存在
        let qhPath = lib.assetURL + 'extension/千幻聆音/';
        console.log('千幻聆音根路径:', qhPath);

        // 检查是否有千幻相关函数
        let hasQhFunctions = typeof game.qhly_getSkinFile === 'function';
        console.log('千幻聆音功能函数存在:', hasQhFunctions);

        if (!hasQhFunctions) {
            console.warn('⚠️ 千幻聆音扩展未正确加载或未启用');
            console.warn('请检查：1. 是否安装了千幻聆音扩展 2. 是否已启用该扩展');
            return false;
        }

        // 如果当前在对局中，检查当前角色的语音目录
        if (game.me && game.me.dynamic && game.me.dynamic.primary) {
            let characterName = game.me.name1;
            let currentSkin = game.me.dynamic.primary;

            console.log('当前角色:', characterName);
            console.log('当前皮肤:', currentSkin.name);

            if (currentSkin.name) {
                let [charName, skinName] = currentSkin.name.split('/');
                console.log('解析角色名:', charName);
                console.log('解析皮肤名:', skinName);

                let skillPath = qhPath + `sanguoaudio/${charName}/${skinName}/`;
                let cardPath = qhPath + `sanguoaudio/${charName}/${skinName}/card/`;

                console.log('期望的技能语音路径:', skillAudioPath);
                console.log('期望的卡牌语音路径:', cardAudioPath);

                // 尝试检查目录是否存在
                this.testDirectoryExists(skillPath, '技能语音目录');
                this.testDirectoryExists(cardPath, '卡牌语音目录');
            }
        }

        console.log('=== 检查完成 ===');
        return true;
    },

    // 新增：测试目录是否存在
    testDirectoryExists: function(path, description) {
        try {
            game.getFileList(path, function(folds, files) {
                if (files && files.length > 0) {
                    console.log(`✅ ${description}存在，包含${files.length}个文件:`, files);
                } else {
                    console.log(`⚠️ ${description}存在但为空`);
                }
            });
        } catch (e) {
            console.warn(`❌ ${description}不存在或无法访问:`, path);
            console.warn('错误详情:', e.message);
        }
    },

    // 新增：智能语音修复（优先千幻，降级到原始）
    smartFixInGameAudio: function() {
        console.log('=== 智能语音修复开始 ===');

        if (!game.me) {
            console.warn('当前不在对局中');
            return;
        }

        let player = game.me;
        let characterName = player.name1;

        console.log('正在为角色修复语音:', characterName);

        // 1. 立即清除所有旧的语音映射
        this.clearCharacterAudioMappings(characterName);

        // 2. 检查千幻语音是否可用
        setTimeout(() => {
            if (player.dynamic && player.dynamic.primary) {
                let currentSkin = player.dynamic.primary;
                if (currentSkin.name) {
                    let [charName, skinName] = currentSkin.name.split('/');
                    console.log('尝试智能修复:', charName, skinName);

                    // 先尝试千幻语音
                    let qhAudioConfig = skinSwitch.getQianhuanAudioConfig(charName, skinName);

                    // 检查千幻语音路径是否真实存在
                    this.verifyAndApplyAudioConfig(currentSkin, charName, skinName, qhAudioConfig, player);
                }
            }
        }, 200);
    },

    // 新增：验证并应用语音配置
    verifyAndApplyAudioConfig: function(skin, charName, skinName, qhAudioConfig, player) {
        console.log('验证语音配置可用性...');

        if (qhAudioConfig && qhAudioConfig.skill) {
            let skillPath = lib.assetURL + 'extension/千幻聆音/' + qhAudioConfig.skill;

            // 测试千幻技能语音目录是否存在
            try {
                game.getFileList(skillPath, (folds, files) => {
                    if (files && files.length > 0) {
                        console.log('✅ 千幻语音可用，应用千幻语音配置');
                        skin.audio = qhAudioConfig;
                        this.forceRefreshAudioMapping(player, true);
                        console.log('=== 千幻语音修复完成 ===');
                    } else {
                        console.log('⚠️ 千幻语音目录为空，使用降级方案');
                        this.applyFallbackAudio(skin, charName, skinName, player);
                    }
                });
            } catch (e) {
                console.log('❌ 千幻语音不可用，使用降级方案');
                this.applyFallbackAudio(skin, charName, skinName, player);
            }
        } else {
            console.log('⚠️ 未找到千幻语音配置，使用降级方案');
            this.applyFallbackAudio(skin, charName, skinName, player);
        }
    },

    // 新增：应用降级语音方案
    applyFallbackAudio: function(skin, charName, skinName, player) {
        console.log('应用降级语音方案...');

        // 查找皮肤原有的语音配置
        let dskins = decadeUI.dynamicSkin;
        let originalSkin = dskins[charName] && dskins[charName][skinName];

        if (originalSkin && originalSkin.audio) {
            console.log('✅ 找到皮肤原有语音配置，应用原有配置');
            skin.audio = originalSkin.audio;
            this.forceRefreshAudioMapping(player, true);
            console.log('=== 原有语音修复完成 ===');
        } else {
            // 尝试使用角色默认语音
            console.log('尝试使用角色默认语音配置...');
            let defaultAudio = {
                skill: `audio/skill/${charName}`,
                card: `audio/card/${charName}`
            };

            skin.audio = defaultAudio;
            this.forceRefreshAudioMapping(player, true);
            console.log('=== 默认语音修复完成 ===');
        }

        console.log('请尝试使用技能或卡牌测试语音是否正常');
    },

    // 新增：测试角色名映射
    testCharacterNameMapping: function(characterName) {
        console.log('=== 测试角色名映射 ===');
        console.log('输入角色名:', characterName);

        let pinyinName = skinSwitch.getCharacterPinyinName(characterName);
        console.log('映射后拼音名:', pinyinName);

        // 如果当前在对局中，测试实际路径
        if (game.me && game.me.dynamic && game.me.dynamic.primary) {
            let currentSkin = game.me.dynamic.primary;
            if (currentSkin.name) {
                let [charName, skinName] = currentSkin.name.split('/');
                if (charName === characterName) {
                    let expectedPath = `extension/千幻聆音/sanguoaudio/${pinyinName}/${skinName}/`;
                    console.log('期望的千幻语音路径:', expectedPath);

                    // 测试路径是否存在
                    skinSwitch.testDirectoryExists(lib.assetURL + expectedPath, '技能语音目录');

                    let cardPath = `extension/千幻聆音/sanguoaudio/${pinyinName}/${skinName}/card/`;
                    console.log('期望的卡牌语音路径:', cardPath);
                    skinSwitch.testDirectoryExists(lib.assetURL + cardPath, '卡牌语音目录');
                }
            }
        }

        console.log('=== 测试完成 ===');
        return pinyinName;
    },

    // 新增：深度语音系统重置
    deepResetAudioSystem: function() {
        console.log('=== 开始深度语音系统重置 ===');

        // 1. 完全重置所有语音映射
        if (skinSwitch.audioMap) {
            console.log('清除skinSwitch.audioMap，当前条目:', Object.keys(skinSwitch.audioMap).length);
            skinSwitch.audioMap = {};
        }

        if (skinSwitch.avatarAudioSkinMap) {
            console.log('清除skinSwitch.avatarAudioSkinMap');
            skinSwitch.avatarAudioSkinMap = {};
        }

        if (lib.audioMap) {
            console.log('清除lib.audioMap，当前条目:', Object.keys(lib.audioMap).length);
            let keysToDelete = [];
            for (let key in lib.audioMap) {
                if (key.includes('skill/') || key.includes('card/') || key.includes('die/')) {
                    keysToDelete.push(key);
                }
            }
            keysToDelete.forEach(key => delete lib.audioMap[key]);
            console.log('从lib.audioMap清除了', keysToDelete.length, '个条目');
        }

        if (lib.avatarAudioSkinMap) {
            console.log('清除lib.avatarAudioSkinMap');
            lib.avatarAudioSkinMap = {};
        }

        // 2. 强制清除浏览器音频缓存
        this.clearBrowserAudioCache();

        // 3. 重置音频播放队列
        if (skinSwitch.audioPlayQueue) {
            skinSwitch.audioPlayQueue = [];
        }

        console.log('=== 深度语音系统重置完成 ===');
    },

    // 新增：强制重建当前角色语音映射
    forceRebuildCurrentAudio: function() {
        console.log('=== 强制重建当前角色语音映射 ===');

        if (!game.me || !game.me.dynamic || !game.me.dynamic.primary) {
            console.warn('当前不在对局中或没有动皮');
            return;
        }

        let player = game.me;
        let characterName = player.name1;
        let currentSkin = player.dynamic.primary;

        if (!currentSkin.name) {
            console.warn('无法获取当前皮肤名称');
            return;
        }

        let [charName, skinName] = currentSkin.name.split('/');
        let pinyinName = this.getCharacterPinyinName(charName);

        console.log('重建语音映射:', {
            原角色名: charName,
            拼音名: pinyinName,
            皮肤名: skinName
        });

        // 构建新的语音配置
        let newAudioConfig = {
            skill: `sanguoaudio/${pinyinName}/${skinName}`,
            card: `sanguoaudio/${pinyinName}/${skinName}/card`
        };

        // 强制应用新配置
        currentSkin.audio = newAudioConfig;
        currentSkin._needUpdateAudio = true;

        console.log('新语音配置:', newAudioConfig);

        // 立即重新初始化语音系统
        setTimeout(() => {
            this.initPlayerAudioImmediate(player, true, currentSkin);
        }, 100);
    },

    // 新增：立即初始化玩家语音（不等待）
    initPlayerAudioImmediate: function(player, isPrimary, playParams) {
        console.log('=== 立即初始化玩家语音 ===');

        if (!player.dynamic) {
            console.warn('player.dynamic不存在');
            return;
        }

        let name = isPrimary ? player.name1 : player.name2;
        let id = player.dynamic.id;
        let skinId = isPrimary ? player.dynamic.primary.id : player.dynamic.deputy.id;

        console.log('语音初始化参数:', {
            name,
            id,
            skinId
        });

        if (!playParams.audio) {
            console.warn('没有语音配置');
            return;
        }

        // 确保语音映射表存在
        if (!skinSwitch.audioMap) {
            skinSwitch.audioMap = {};
        }
        if (!skinSwitch.avatarAudioSkinMap) {
            skinSwitch.avatarAudioSkinMap = {};
        }

        // 清除该角色的旧映射
        if (skinSwitch.avatarAudioSkinMap[name]) {
            for (let key in skinSwitch.avatarAudioSkinMap[name]) {
                delete skinSwitch.audioMap[key];
            }
            delete skinSwitch.avatarAudioSkinMap[name];
        }

        skinSwitch.avatarAudioSkinMap[name] = {};

        let skillPath = playParams.audio.skill;
        let cardPath = playParams.audio.card;

        // 使用千幻聆音的根路径
        let rootPath = lib.assetURL + 'extension/千幻聆音/';

        console.log('语音路径配置:', {
            skillPath,
            cardPath,
            rootPath
        });

        // 文件名处理函数
        let qhly_earse_ext = function(path) {
            let foundDot = path.lastIndexOf('.');
            if (foundDot < 0) return path;
            return path.slice(0, foundDot);
        };

        // 处理技能语音
        if (skillPath) {
            let path = rootPath + skillPath;
            console.log('加载技能语音路径:', path);

            this.safeGetFileList(path, (folds, files) => {
                console.log('找到技能语音文件:', files);
                for (let file of files) {
                    file = qhly_earse_ext(file);
                    let key;
                    let audioPath = '../' + path + '/' + file;

                    if (file === name) {
                        key = 'die/' + file;
                    } else if (file === 'victory' || file === 'win') {
                        key = 'effect/' + id + '/' + skinId + '/' + 'victory';
                    } else {
                        key = 'skill/' + file;
                    }

                    skinSwitch.audioMap[key] = audioPath;
                    skinSwitch.avatarAudioSkinMap[name][key] = audioPath;

                    console.log('添加技能语音映射:', key, '->', audioPath);
                }
                console.log('技能语音映射完成');
            }, (error) => {
                console.warn('技能语音路径不存在:', path);
            });
        }

        // 处理卡牌语音
        if (cardPath) {
            let path = rootPath + cardPath;
            console.log('加载卡牌语音路径:', path);

            this.safeGetFileList(path, (folds, files) => {
                console.log('找到卡牌语音文件:', files);
                for (let file of files) {
                    file = qhly_earse_ext(file);
                    let key = 'card/' + id + '/' + skinId + '/' + file;
                    let audioPath = '../' + path + '/' + file;

                    skinSwitch.audioMap[key] = audioPath;
                    skinSwitch.avatarAudioSkinMap[name][key] = audioPath;

                    console.log('添加卡牌语音映射:', key, '->', audioPath);
                }
                console.log('卡牌语音映射完成');
            }, (error) => {
                console.warn('卡牌语音路径不存在:', path);
            });
        }

        console.log('=== 语音初始化完成 ===');
    },

    // 新增：终极语音修复（一键解决所有问题）
    ultimateAudioFix: function() {
        console.log('🚀 === 终极语音修复开始 === 🚀');

        if (!game.me) {
            console.warn('当前不在对局中');
            return;
        }

        let player = game.me;
        let characterName = player.name1;

        console.log('正在为角色执行终极修复:', characterName);

        // 步骤1: 深度重置语音系统
        this.deepResetAudioSystem();

        // 步骤2: 等待系统重置完成后重建语音
        setTimeout(() => {
            console.log('🔧 开始重建语音映射...');
            this.forceRebuildCurrentAudio();
        }, 300);

        // 步骤3: 等待重建完成后进行验证
        setTimeout(() => {
            console.log('🔍 验证语音映射状态...');
            this.checkCurrentAudioMappings(characterName);

            console.log('✅ === 终极语音修复完成 === ✅');
            console.log('请尝试使用技能或卡牌测试语音效果');
            console.log('如果仍有问题，请重新切换一次皮肤');
        }, 1000);
    },

    // 新增：立即修复对局中语音问题（一键修复）
    fixInGameAudioNow: function() {
        console.log('=== 立即修复对局中语音问题 ===');

        if (!game.me) {
            console.warn('当前不在对局中');
            return;
        }

        let player = game.me;
        let characterName = player.name1;

        console.log('正在修复角色:', characterName);

        // 1. 立即清除所有旧的语音映射
        this.clearCharacterAudioMappings(characterName);

        // 2. 等待200ms后重新构建语音映射
        setTimeout(() => {
            if (player.dynamic && player.dynamic.primary) {
                let currentSkin = player.dynamic.primary;
                if (currentSkin.name) {
                    let [charName, skinName] = currentSkin.name.split('/');
                    console.log('重新构建语音映射:', charName, skinName);

                    // 重新应用千幻语音配置
                    skinSwitch.enhanceSkinWithQianhuanAudio(currentSkin, charName, skinName);

                    // 强制刷新语音映射
                    setTimeout(() => {
                        this.forceRefreshAudioMapping(player, true);
                        console.log('=== 语音修复完成 ===');
                        console.log('请尝试使用技能或卡牌测试语音是否正常');
                    }, 500);
                }
            }
        }, 200);
    },
    bodySize: function() {
        let size = {}
        let body = document.body
        size.updated = true
        size.height = body.clientHeight
        size.width = body.clientWidth
        return size;
    },
    // 检查圆弧
    skinSwitchCheckYH: function(player, forces) {
        if (lib.config['extension_十周年UI_newDecadeStyle'] == "on") return;
        if (!player || get.itemtype(player) != 'player') return;

        // 检查是否启用顶部圆弧显示
        if (typeof window.showTopArc == 'undefined' ||window.showTopArc) {
            let skinYh = player.getElementsByClassName("skinYh");
            if (skinYh.length > 0) {
                player.removeChild(skinYh[0]);
            }
            return;
        }

        // 确保获取正确的势力，优先使用传入的forces参数，其次是player.group
        let group = forces || player.group || 'weizhi';
        let isYh = false;

        // 检查动皮是否存在并且需要显示圆顶
        if (player.dynamic) {
            if (player.dynamic.primary && !player.isUnseen(0)) isYh = true;
            if (player.dynamic.deputy && !player.isUnseen(1)) isYh = true;
        }

        // 获取已有的圆顶元素
        let skinYh = player.getElementsByClassName("skinYh");

        // 如果需要显示圆顶但不存在，则创建
        if (isYh && skinYh.length == 0) {
            let yh = skinSwitch.createYH(group);
            player.appendChild(yh);
        }
        // 如果不需要显示圆顶但存在，则移除
        else if (!isYh && skinYh.length > 0) {
            player.removeChild(skinYh[0]);
        }
        // 如果需要显示圆顶且已存在，检查是否需要更新
        else if (isYh && skinYh.length > 0) {
            let yh = skinYh[0];
            let srcPath = yh.src || '';
            let splits = srcPath.split('/');
            let sub = splits[splits.length - 1];
            let curGroup = sub.split('.')[0];

            // 如果势力不匹配，则移除旧的圆顶并创建新的
            if (curGroup !== group) {
                skinYh[0].remove();
                let newYh = skinSwitch.createYH(group);
                player.appendChild(newYh);
            }
        }
    },
    //判断文件、文件夹是否存在
    qhly_checkFileExist: function(path, callback) {
        if (lib.node && lib.node.fs) {
            try {
                var stat = lib.node.fs.statSync(__dirname + '/' + path);
                callback(stat);
            } catch (e) {
                callback(false);
                return;
            }
        } else {
            resolveLocalFileSystemURL(lib.assetURL + path, (function(name) {
                return function(entry) {
                    callback(true);
                }
            }(name)), function() {
                callback(false);
            });
        }
    },
    // 尝试获取多个路径, 当某一个存在后立刻返回存在的对应的路径, 主要用来获取静态图片可能存放于多个位置
    checkFilesExistAndReturnOne: function(paths, callback) {
        let tryCheck = (index) => {
            if (index >= paths.length) return callback(null)
            skinSwitch.qhly_checkFileExist(paths[index], (exists) => {
                if (exists) return callback(paths[index])
                tryCheck(index + 1)
            })
        }
        tryCheck(0)
    },
    isMobile: function() {
        return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent));
    },
    getCoordinate: function(domNode, subtr) {
        if (!domNode && !decadeUI) return false;
        var rect = domNode.getBoundingClientRect();
        return {
            x: rect.left,
            y: decadeUI.get.bodySize().height - (subtr ? rect.bottom : 0),
            width: rect.width,
            height: rect.height,
            bodyWidth: decadeUI.get.bodySize().width,
            bodyHeight: decadeUI.get.bodySize().height,
        };
    },
    // 计算其他角色的方向与位置, 播放动画可以调整
    getDirection: function(dom, sl) {
        var width = document.body.clientWidth / 2;
        var pos = this.getCoordinate(dom, true);
        var isLeft = pos.x >= width ? false : true;
        if (sl) {
            if (isLeft) {
                return {
                    x: [0, 1.2],
                    y: [0, 0],
                    isLeft: isLeft
                };
            } else return {
                x: [0, -0.1],
                y: [0, 0],
                isLeft: isLeft
            };
        } else {
            if (isLeft) {
                return {
                    x: [0, 0.4],
                    y: [0, 0.5],
                    isLeft: isLeft
                };
            } else return {
                x: [0, 0.63],
                y: [0, 0.5],
                isLeft: isLeft
            };
        }
    },
    backupFileDui: function() {
        // 将animation的内容修改, 重新写入到十周年文件中. 并且备份原始文件
        if (!window.decadeUI) {
            alert("请先安装和开启十周年UI");
            return;
        }
        // 备份原有文件
        let backDir = skinSwitch.dcdPath + '/备份'
        game.ensureDirectory(backDir, function() {
            let progressBG = ui.create.div(".progressBG", ui.window)
            let progressBar = ui.create.div(progressBG)

            let files = ['animation.js', 'dynamicWorker.js', 'extension.js']
            let tasks = files.length
            let current = 0
            skinSwitch.addProgress(progressBar, current, tasks)

            for (let f of files) {
                game.readFile(skinSwitch.dcdPath + '/' + f, function(data) {
                    game.writeFile(data, backDir, f, function() {
                        console.log(`备份${f}成功`)
                        skinSwitch.addProgress(progressBar, ++current, tasks)
                        if (current >= files.length) {
                            progressBG.style.opacity = "0";
                            skinSwitchMessage.show({
                                type: 'success',
                                text: '备份完成',
                            })
                        }
                    })
                })
            }
        })
    },
    modifyFileDui: function() {
        // if (lib.config[skinSwitch.configKey.bakeup]) {
        //     // alert('已经备份了十周年文件, 无需重复操作')
        //     return
        // }

        if (confirm("会覆盖十周年原文件,请确认是否已经备份过原文件方便出错还原, 是否确认?")) {
            let progressBG = ui.create.div(".progressBG", ui.window)
            let progressBar = ui.create.div(progressBG)
            let files = ['animation.js', 'dynamicWorker.js']
            let tasks = files.length
            let current = 0

            skinSwitch.addProgress(progressBar, current, tasks)

            // 如果已经备份过, 就不重新备份了
            // if (!lib.config[skinSwitch.configKey.bakeup]) {
            //     for (let f of files) {
            //         skinSwitch.backupFileDui(skinSwitch.dcdPath, f, function () {
            //             skinSwitch.addProgress(progressBar, ++current, tasks)
            //         })
            //     }
            // }

            // 修改十周年文件.
            // 将本地的worker文件copy,
            let cpWorkerFiles = ['dynamicWorker.js', 'animation.js']
            cpWorkerFiles.forEach(cpWorkerFile => {
                game.readFile(skinSwitch.path + '/十周年UI/' + cpWorkerFile, function(data) {
                    game.writeFile(data, skinSwitch.dcdPath, cpWorkerFile, function() {
                        skinSwitch.addProgress(progressBar, ++current, tasks)
                        if (current >= tasks) {
                            game.saveConfig(skinSwitch.configKey.bakeup, true)
                            setTimeout(() => {
                                progressBG.style.opacity = "0";
                                if (confirm("导入备份十周年文件成功，点击确定将重启游戏")) {
                                    progressBG.remove();
                                    game.reload();
                                }
                            }, 2500)
                        }
                    })
                })
            })
        }
    },

    genDynamicSkin: function() {
        if (window.pfqhUtils) {
            if (decadeUI.dynamicSkin) {
                let str = pfqhUtils.transformDdyskins(decadeUI.dynamicSkin)
                // 写入文件中
                game.writeFile(str, skinSwitch.path, '转换后_dynamicSkin.js', function() {
                    console.log('写入saveSkinParams.js成功')
                    skinSwitchMessage.show({
                        type: 'success',
                        text: '转换成功',
                        duration: 1500, // 显示时间
                        closeable: false, // 可手动关闭
                    })
                })
            }
        }
    },
    genDyTempFile: function() {
        if (window.pfqhUtils && decadeUI.dynamicSkin) {
            if (decadeUI.dynamicSkin) {
                skinSwitchMessage.show({
                    type: 'success',
                    text: '正在生成中, 请等待',
                    duration: 1500,
                })
                pfqhUtils.generateDynamicFile(lib, decadeUI.dynamicSkin)
            }
        }
    },
    addProgress: function(obj, value, total) {
        var progress = Math.floor(value / total * 100);
        obj.style.backgroundSize = progress + "% 100%";
    },
    getDynamicSkin: function(skinName, playerName) {
        if (!playerName) return false;
        var dskins = dui.dynamicSkin;
        var skins = dskins[playerName];
        if (skins) {
            if (skinName) return skins[skinName];
            else {
                let ps
                if (lib.config[skinSwitch.configKey.dynamicSkin]) {
                    ps = lib.config[skinSwitch.configKey.dynamicSkin][playerName]
                }
                if (ps) return skins[ps];
                else return skins[Object.keys(skins)[0]]
            }
        } else return false;
    },
    actionFilter: function(actions, action) {
        var res = false;
        for (var actionKey of actions) {
            if (actionKey == action) {
                return res = true;
            }
        }
        return res;
    },
    createYH: function(group) {
        var yh = document.createElement("img");
        // 修复圆顶图片路径问题，确保正确加载势力对应的图片
        yh.src = skinSwitch.url + "/images/border/" + group + ".png";
        // 以下是备用的空白图，如果上面的图片加载失败，可以取消注释使用
        // yh.src = skinSwitch.url + "/images/border/kongbai.png";
        yh.classList.add("skinYh");
        yh.style.display = "block";
        yh.style.position = "absolute";
        yh.style.top = "-22px";
        yh.style.height = "50px";
        yh.style.width = "131.1px";
        yh.style.zIndex = "61";
        // 添加onerror处理，确保图片加载失败时有备用方案
        yh.onerror = function() {
            this.src = skinSwitch.url + "/images/border/weizhi.png";
            console.log("势力图标加载失败，使用默认图标");
        };

        // 根据配置决定是否显示
        if (typeof window.showTopArc === 'undefined' ||window.showTopArc) {
            yh.style.display = "none";
        }

        return yh;
    },
    resetDynamicData: function() {
        if (!lib.config[skinSwitch.decadeKey.dynamicSkin]) return alert("需要先打开十周年UI的动皮,再重置");
        if (!lib.config[skinSwitch.configKey.dynamicSkin]) alert("没有动皮存档可重置");
        if (confirm("你确定要重置动皮存档吗？完成后会自动重启游戏")) {
            game.saveConfig(skinSwitch.configKey.dynamicSkin, null)
            setTimeout(() => {
                game.reload();
            }, 1000);
        }
    },
    // 样式代码来自于千幻经典小窗换肤修改
    qhly_open_small: function(name, player, isPrimary) {
        if (_status.qhly_open) return;
        _status.qhly_open = true;
        let background = ui.create.div('.pfqh-qh-skinchange-background', document.body);
        let backgroundBack = ui.create.div('.pfqh-qh-skinchange-background', background);
        let dialog = ui.create.div('.pfqh-qh-skinchange-dialog', background);
        let dragHandle = ui.create.div('.skin-drag-handle', dialog);
        dragHandle.title = '拖拽移动千幻小窗';
        let exit = ui.create.div('.pfqh-qh-skinchange-exit', dialog);
        let cover = ui.create.div('.pfqh-qh-skinchange-cover', dialog);
        let content = ui.create.div('.pfqh-qh-skinchange-area', cover);
        let enlarge = ui.create.div('.pfqh-qh-skinchange-enlarge', dialog);
        let swipe_up = lib.config.swipe_up;
        lib.config.swipe_up = '';
        let swipe_down = lib.config.swipe_down;
        lib.config.swipe_down = '';
        let swipe_left = lib.config.swipe_left;
        lib.config.swipe_left = '';
        let swipe_right = lib.config.swipe_right;
        lib.config.swipe_right = '';
        let exitListener = function() {
            lib.config.swipe_up = swipe_up;
            lib.config.swipe_down = swipe_down;
            lib.config.swipe_left = swipe_left;
            lib.config.swipe_right = swipe_right;

            // 关闭所有动画
            am.stopSpineAll()
            // for (let k in am.animations) {
            //     if (am.animations[k]) {
            //         am.animations[k].nodes = []
            //         let webglExt = am.animations[k].gl.getExtension('WEBGL_lose_context')
            //         if (webglExt) {
            //             webglExt.loseContext()
            //         }
            //     }
            // }

            if (!_status.qhly_open) return;
            background.delete();
            delete _status.qhly_open;
        }

        // 创建canvas
        let d = ui.create.div('.pfqh-small-dynamic-skin-wrap', cover)
        // 缓存小窗的加载资源
        if (!skinSwitch.smallWindowAm) {
            let skinCanvas = document.createElement('canvas')
            skinSwitch.smallWindowAm = new AnimationManager(lib.assetURL + 'extension/十周年UI/assets/dynamic/', skinCanvas, 33321, {
                offscreen: false
            })
            skinCanvas.style.height = '100%'
            skinCanvas.style.width = '100%'
        }
        let am = skinSwitch.smallWindowAm
        let skinCanvas = am.canvas
        d.appendChild(skinCanvas)
        let coverSize = cover.getBoundingClientRect()
        am.updateSpineAll({
            width: coverSize.width,
            height: coverSize.height,
            dpr: Math.max(self.devicePixelRatio * (self.documentZoom ? self.documentZoom : 1), 1)
        })

        let viewState = {
            offset: 0,
            skinTotalWidth: 500,
            skinPerWidth: 120,
            skinPerHeight: 200, // 默认露头
            jingdongWidth: 100,
            jingdongHeight: 44,
            skinGap: 10,
            skins: [],
            skinViews: [],
            visibleWidth: function() {
                var rect = cover.getBoundingClientRect();
                return rect.width;
            },
            content: content,
            refresh: function() {
                this.content.style.width = Math.round(this.skinTotalWidth) + 'px';
                this.content.style.left = Math.round(this.offset) + "px";
            },
            refreshSkins: function() {
                for (let i = 0; i < this.skinViews.length; i++) {
                    let skinView = this.skinViews[i];
                    let skin = this.skins[i];

                    if (skinSwitch.qhly_hasExtension('千幻聆音')) {
                        if (game.qhly_skinIs(name, skin)) {
                            skinView.belowText.style.textShadow = '.2rem 0rem .5rem red,-.2rem 0rem .5rem red,0rem .2rem .5rem red,0rem -.2rem .5rem red';
                        } else {
                            skinView.belowText.style.textShadow = '.2rem 0rem .5rem blue,-.2rem 0rem .5rem blue,0rem .2rem .5rem blue,0rem -.2rem .5rem blue';
                        }
                    } else {
                        if (skin === currentSelect) {
                            skinView.belowText.style.textShadow = '.2rem 0rem .5rem red,-.2rem 0rem .5rem red,0rem .2rem .5rem red,0rem -.2rem .5rem red';
                        } else {
                            skinView.belowText.style.textShadow = '.2rem 0rem .5rem blue,-.2rem 0rem .5rem blue,0rem .2rem .5rem blue,0rem -.2rem .5rem blue';
                        }
                    }
                }
            },
            handleMouseDown: function(x, y) {
                if (this.skinTotalWidth <= this.visibleWidth()) {
                    return;
                }
                this.mouseDownX = x;
                this.mouseDownY = y;
                this.isTouching = true;
                this.cancelClick = false;
            },
            handleMouseMove: function(x, y) {
                if (this.isTouching) {
                    var slideX = x - this.mouseDownX;
                    this.tempoffset = this.offset + slideX;
                    if (this.tempoffset > 0) {
                        this.tempoffset = 0;
                    } else if (this.skinTotalWidth - this.visibleWidth() < -this.tempoffset) {
                        this.tempoffset = -(this.skinTotalWidth - this.visibleWidth());
                    }
                    this.content.style.left = Math.round(this.tempoffset) + "px";
                    return true;
                }
            },
            handleMouseUp: function(x, y) {
                if (this.isTouching) {
                    this.isTouching = false;
                    if (x && y) {
                        var slideX = x - this.mouseDownX;
                        this.tempoffset = this.offset + slideX;
                        if (this.tempoffset > 0) {
                            this.tempoffset = 0;
                        } else if (this.skinTotalWidth - this.visibleWidth() < -this.tempoffset) {
                            this.tempoffset = -(this.skinTotalWidth - this.visibleWidth());
                        }
                    }
                    this.cancelClick = Math.abs(this.offset - this.tempoffset) > 50;
                    this.content.style.left = Math.round(this.tempoffset) + "px";
                    this.offset = this.tempoffset;
                } else {
                    this.cancelClick = false;
                }
                this.previousX = this.mouseDownX;
                this.previousY = this.mouseDownY;
                delete this.mouseDownX;
                delete this.mouseDownY;
            }
        };
        if (lib.config.touchscreen) {
            content.addEventListener('touchstart', function(event) {
                if (event.touches && event.touches.length) {
                    viewState.handleMouseDown(event.touches[0].clientX, event.touches[0].clientY);
                }
            });
            content.addEventListener('touchend', function(event) {
                viewState.handleMouseUp();
            });
            content.addEventListener('touchcancel', function(event) {
                viewState.handleMouseUp();
            });
            content.addEventListener('touchmove', function(event) {
                if (event.touches && event.touches.length)
                    viewState.handleMouseMove(event.touches[0].clientX, event.touches[0].clientY);
            });
        } else {
            content.addEventListener('mousewheel', function(event) {
                viewState.handleMouseDown(event.clientX, event.clientY);
                if (event.wheelDelta > 0) {
                    viewState.handleMouseMove(event.clientX - 30, event.clientY);
                    viewState.handleMouseUp(event.clientX - 30, event.clientY);
                } else {
                    viewState.handleMouseMove(event.clientX + 30, event.clientY);
                    viewState.handleMouseUp(event.clientX + 30, event.clientY);
                }
            });
            content.addEventListener('mousedown', function(event) {
                viewState.handleMouseDown(event.clientX, event.clientY);
            });
            content.addEventListener('mouseup', function(event) {
                viewState.handleMouseUp(event.clientX, event.clientY);
            });
            content.addEventListener('mouseleave', function(event) {
                viewState.handleMouseUp(event.clientX, event.clientY);
            });
            content.addEventListener('mousemove', function(event) {
                viewState.handleMouseMove(event.clientX, event.clientY);
            });
        }

        // 首先所有动皮
        const dskins = dui.dynamicSkin;
        const skins = dskins[name];
        let keys = skins && Object.keys(skins) || []
        let dynamicSkinKey = skinSwitch.configKey.dynamicSkin
        let build_id = 0
        let beijing_id = 888888

        let skinInfoMap = {
            '__default': {
                skinName: null
            }
        }

        let currentSelect = null // 当前选择的动皮名称
        if (lib.config[dynamicSkinKey]) {
            let ps = lib.config[dynamicSkinKey][name];
            if (ps !== 'none') currentSelect = ps + '.jpg'
        }
        // 没有包含千幻, 暂时不设置静皮, 静皮用小杀代替, 以后可能用系统默认皮肤代替, 或者系统默认的皮肤系统代替
        keys.map(name => {
            skinInfoMap[name] = {
                staticImg: "url(" + skinSwitch.url + "/images/character/小杀.png)",
                dynamic: true,
                dynamicState: true, // 当前是否处于动皮小窗状态
                imgName: name + '.jpg', // 默认的图片设置
                skinName: skins[name].skinName || name,
                isDefault: true,
            }
            // 检测动皮目录下是否有使用
            let skinPath = skins[name].name
            let lastIdx = skinPath.lastIndexOf('/')
            let foldPath
            if (lastIdx === -1) {
                foldPath = ''
            } else {
                foldPath = skinPath.slice(0, lastIdx)
            }
            let path = skinSwitch.dcdPath + '/assets/dynamic/' + foldPath + '/' + skins[name].skinName + '.jpg'
            // 如果该皮肤存在, 那么设置该皮肤为静态皮肤
            skinSwitch.qhly_checkFileExist(path, exists => {
                if (exists) {
                    skinInfoMap[name].staticImg = 'url("' + lib.assetURL + path + '")'
                }
            })
        })

        let updateSkinInfo = staticImgs => {
            if (!staticImgs) staticImgs = []
            // 将动皮放上.
            let skinSet = new Set()
            staticImgs.map(img => {
                let imgKey = img.substring(0, img.lastIndexOf("."))
                if (skinSet.has(imgKey)) return
                skinSet.add(imgKey)
                if (imgKey in skinInfoMap) {
                    skinInfoMap[imgKey].imgName = img // 更新一下图片背景
                    skinInfoMap[imgKey].isDefault = false
                } else {
                    skinInfoMap[imgKey] = {
                        // staticImg: "url(" + skinSwitch.url + "/images/character/小杀.png)",
                        dynamic: false,
                        imgName: img, // 这个是用于千幻这种的
                        skinName: imgKey
                    }
                }
            })
        }

        let playDynamic = (skinView, skinParams) => {
            let sprite = Object.assign({}, skinParams)
            sprite.loop = true
            sprite.viewportNode = skinView
            sprite.id = build_id++
            if (sprite.beijing) {
                sprite.beijing = Object.assign({}, sprite.beijing)
                sprite.beijing.viewportNode = skinView
            }
            if (sprite.qianjing) {
                sprite.qianjing = Object.assign({}, sprite.qianjing)
                sprite.qianjing.viewportNode = skinView
            }

            sprite.player = sprite;
            skinView.style.backgroundImage = 'url("' + lib.assetURL + 'extension/十周年UI/assets/dynamic/' + sprite.background + '")'

            let dynamic = am.getAnimation(sprite.player.version)
            let beijingDynamic
            if (sprite.player && sprite.player.beijing != null) {
                beijingDynamic = am.getAnimation(sprite.player.beijing.version || sprite.player.version)
            }
            let qianjingDynamic
            if (sprite.player && sprite.player.qianjing != null) {
                qianjingDynamic = am.getAnimation(sprite.player.qianjing.version || sprite.player.version)
            }

            let loadDaiJi = () => {
                if (!dynamic.hasSpine(sprite.name)) {
                    dynamic.loadSpine(sprite.name, sprite.player.json ? 'json' : 'skel', () => {
                        // 加载后播放背景和待机
                        if (sprite.player.beijing) {
                            runBeijing()
                        } else {
                            run1()
                        }

                        if (sprite.player.qianjing) {
                            runqianjing()
                        } else {
                            run2()
                        }
                    })
                } else {
                    if (sprite.player.beijing) {
                        runBeijing()
                    }
                    if (sprite.player.qianjing) {
                        runqianjing()
                    } else {
                        run1()
                        run2()
                    }
                }

            }
            let loadBeiJingDaiJi = () => {
                if (!beijingDynamic.hasSpine(sprite.player.beijing.name)) {
                    beijingDynamic.loadSpine(sprite.player.beijing.name, sprite.player.beijing.json ? 'json' : 'skel', () => {
                        // 加载后播放背景和待机
                        loadDaiJi()
                    })
                } else {
                    loadDaiJi()
                }
            }
            let run1 = function(beijingNode) {
                let t = dynamic.playSpine(sprite)
                t.opacity = 0
                t.beijingNode = beijingNode

                let skins = t.skeleton.data.skins
                if (sprite.player.skin) {
                    let skinFound = false;
                    for (let i = 0; i < skins.length; i++) {
                        if (skins[i].name === sprite.player.skin) {
                            // 设置skin
                            try {
                                t.skeleton.setSkinByName(skins[i].name);
                                t.skeleton.setSlotsToSetupPose();
                                skinFound = true;
                            } catch (e) {
                                console.warn('Failed to set skin:', skins[i].name, e);
                            }
                            break;
                        }
                    }
                    // 如果指定的皮肤不存在，尝试使用默认皮肤或第一个可用皮肤
                    if (!skinFound && skins.length > 0) {
                        try {
                            // 优先尝试使用默认皮肤
                            if (t.skeleton.data.defaultSkin) {
                                t.skeleton.setSkin(t.skeleton.data.defaultSkin);
                            } else {
                                // 如果没有默认皮肤，使用第一个可用皮肤
                                t.skeleton.setSkinByName(skins[0].name);
                            }
                            t.skeleton.setSlotsToSetupPose();
                        } catch (e) {
                            console.warn('Failed to set fallback skin:', e);
                        }
                    }
                }

                let labels = getAllActionLabels(t)
                let jinchangLabel = 'ChuChang' // 默认的进场标签
                if (t.player.ss_jinchang) {
                    jinchangLabel = t.player.ss_jinchang
                }
                if (labels.includes(jinchangLabel)) {
                    // 清空原来的state状态, 添加出场
                    t.skeleton.state.setEmptyAnimation(0, 0);
                    t.skeleton.state.setAnimation(0, jinchangLabel, false, 0);
                    if (t.player.action && t.player.action !== jinchangLabel) {
                        t.skeleton.state.addAnimation(0, t.player.action, true, -0.01);
                        t.action = t.player.action
                    } else {
                        for (let defaultDaiJi of ['DaiJi', 'play']) {
                            let da = getLabelIgnoreCase(t, defaultDaiJi)
                            if (da) {
                                t.skeleton.state.addAnimation(0, da, true, -0.01);
                                t.player.action = da
                                t.action = da
                            }
                        }
                    }
                }

                let daijiActioh = t.action || t.skeleton.defaultAction
                let setAnimation = () => {
                    // 如果包含Teshu或者play2. 那么接着播放这两个标签
                    for (let lab of ['TeShu', 'play2']) {
                        if (labels.includes(lab) && lab !== daijiActioh) {
                            t.skeleton.state.addAnimation(0, lab, false, 0).listener = {
                                complete: function(trackIndex) {
                                    t.skeleton.state.addAnimation(0, daijiActioh, true, 0)
                                    setAnimation()
                                }
                            }
                            break
                        }

                    }
                }
                setAnimation()

                // 重置一下背景和待机的时间
                if (beijingNode) {
                    beijingNode.skeleton.state.tracks[0].trackTime = 0;
                    t.skeleton.state.tracks[0].trackTime = 0;
                    beijingNode.opacity = 1;
                }
                if (qianjingNode) {
                    qianjingNode.skeleton.state.tracks[0].trackTime = 0;
                    t.skeleton.state.tracks[0].trackTime = 0;
                    qianjingNode.opacity = 1;
                }
                sortNodes();
                t.opacity = 1;

                // 保存当前view的node节点
                skinView.node = t
            }

            // 获取骨骼的所有action标签
            let getAllActionLabels = node => {
                // 获取所有actions
                let animations = node.skeleton.data.animations;
                let res = []
                for (let ani of animations) {
                    res.push(ani.name)
                }
                return res
            }

            // 获取标签, 忽略大小写
            let getLabelIgnoreCase = (node, label) => {
                if (!label) return ''
                let animations = node.skeleton.data.animations;
                let lowerCaseLabel = label.toLowerCase()
                for (let ani of animations) {
                    if (ani.name.toLowerCase() === lowerCaseLabel) {
                        return ani.name
                    }
                }
                return ''
            }

            let runBeijing = () => {
                sprite.player.beijing.loop = true
                sprite.player.beijing.id = beijing_id++
                if (sprite.player.beijing.alpha == null)
                    sprite.player.beijing.alpha = sprite.player.alpha

                // 如果是双将的话, 复制裁剪.
                if (!sprite.player.beijing.clip && sprite.clip) {
                    sprite.player.beijing.clip = sprite.clip
                }
                let node
                try {
                    node = beijingDynamic.playSpine(sprite.player.beijing)
                    node.isbeijing = true
                } catch (e) {
                    console.error(e)
                }

                // 获取所有actions
                let chuChangLabel = ''
                let labels = getAllActionLabels(node)
                for (let label of labels) {
                    let lowerLabel = label.toLowerCase()
                    if (lowerLabel === 'chuchang') {
                        chuChangLabel = label
                        break
                    }
                }
                // 查找背景是否也有出场标签
                if (chuChangLabel) {
                    node.skeleton.state.setAnimation(0, chuChangLabel, false, 0);
                    // 获取所有actions

                    for (let label of labels) {
                        let lowerLabel = label.toLowerCase()
                        for (let daijiName of ['DaiJi', 'BeiJing', 'play']) {
                            if (daijiName.toLowerCase() === lowerLabel) {
                                node.skeleton.state.addAnimation(0, label, true, -0.01);
                                node.action = label
                                break
                            }
                        }
                    }
                }
                // 检查当前节点是否存在位于背景层下的node, 提上来
                sortNodes()
                run1(node)
            }
            let runqianjing = () => {
                sprite.player.qianjing.loop = true
                sprite.player.qianjing.id = qianjing_id++
                if (sprite.player.qianjing.alpha == null)
                    sprite.player.qianjing.alpha = sprite.player.alpha

                // 如果是双将的话, 复制裁剪.
                if (!sprite.player.qianjing.clip && sprite.clip) {
                    sprite.player.qianjing.clip = sprite.clip
                }
                let node
                try {
                    node = qianjingDynamic.playSpine(sprite.player.qianjing)
                    node.isqianjing = true
                } catch (e) {
                    console.error(e)
                }

                // 获取所有actions
                let chuChangLabel = ''
                let labels = getAllActionLabels(node)
                for (let label of labels) {
                    let lowerLabel = label.toLowerCase()
                    if (lowerLabel === 'chuchang') {
                        chuChangLabel = label
                        break
                    }
                }
                // 查找背景是否也有出场标签
                if (chuChangLabel) {
                    node.skeleton.state.setAnimation(0, chuChangLabel, false, 0);
                    // 获取所有actions

                    for (let label of labels) {
                        let lowerLabel = label.toLowerCase()
                        for (let daijiName of ['DaiJi', 'Chuchang', 'play']) {
                            if (daijiName.toLowerCase() === lowerLabel) {
                                node.skeleton.state.addAnimation(0, label, true, -0.01);
                                node.action = label
                                break
                            }
                        }
                    }
                }
                // 检查当前节点是否存在位于背景层下的node, 提上来
                sortNodes()
                run2(node)
            }

            let sortNodes = () => {
                dynamic.nodes.sort((a, b) => {
                    return b.id - a.id
                })
            }
            if (sprite.beijing) {
                loadBeiJingDaiJi()
            } else {
                loadDaiJi()
            }
        }

        let setStaticSkin = () => {
            // 设置静皮
            let bool1 = isPrimary,
                bool2 = !isPrimary
            if (player && player.dynamic) {
                player.stopDynamic(bool1, bool2)
                let obj = player.getElementsByClassName((bool1 ? 'primary' : 'deputy') + "-avatar")[0]
                if (obj) {
                    obj.style.opacity = 1
                }
            }
            // 选择静皮还原
            let dynamicSkinKey = skinSwitch.configKey.dynamicSkin
            if (!lib.config[dynamicSkinKey]) lib.config[dynamicSkinKey] = {}
            lib.config[dynamicSkinKey][name] = 'none'
            game.saveConfig(dynamicSkinKey, lib.config[dynamicSkinKey]);
            // 去除静皮的class
            player.classList.remove(!bool1 ? 'd-skin2' : 'd-skin')
        }

        let initSkinViews = () => {
            // 去除了千幻自带的排序功能.
            let skinKeys = Object.keys(skinInfoMap)
            // viewState.skins = skinList;
            viewState.skinTotalWidth = (viewState.skinPerWidth + viewState.skinGap) * skinKeys.length - viewState.skinGap;
            for (let i = 0; i < skinKeys.length; i++) {
                let skinKey = skinKeys[i]

                let skinInfo = skinInfoMap[skinKey]
                let skin = skinInfo.imgName
                if (i === 0) {
                    viewState.skins.push(null)
                    skin = null
                } else {
                    viewState.skins.push(skin)
                }

                let skinView = ui.create.div('.pfqh-qh-skinchange-skin', content);
                viewState.skinViews.push(skinView);
                skinView.style.left = Math.round((viewState.skinPerWidth + viewState.skinGap) * i) + "px";
                skinView.style.width = Math.round(viewState.skinPerWidth) + "px";
                skinView.style.height = Math.round(viewState.skinPerHeight) + "px";
                skinView.classList.add('qh-not-replace');
                skinView.belowText = ui.create.div('.pfqh-qh-skinchange-skin-text', skinView);
                if (i !== skinKeys.length - 1) {
                    let border = ui.create.div('.pfqh-qh-skinchange-border', content);
                    border.style.width = Math.round(viewState.skinGap) + "px";
                    border.style.left = Math.round((viewState.skinPerWidth + viewState.skinGap) * i + viewState.skinPerWidth) + "px";
                }
                let skinSprite
                // 只有包含千幻聆音扩展才支持设置静皮
                if (skinInfo.dynamic) {
                    skinSprite = Object.assign({}, skins[skinKey])
                    // 是否显示动皮
                    if (lib.config[skinSwitch.configKey.previewSkinsDynamic]) {
                        skinView.style.backgroundImage = 'url("' + lib.assetURL + 'extension/十周年UI/assets/dynamic/' + skinSprite.background + '")';
                        playDynamic(skinView, skinSprite)
                    } else {
                        // 显示静皮
                        skinView.style.backgroundImage = skinInfo.staticImg
                    }

                }
                if (skinSwitch.qhly_hasExtension('千幻聆音')) {
                    // 添加上静动素材图片
                    let jingdong
                    if (skinInfo.dynamic) {
                        let isDynamic = skinInfo.dynamicState;
                        jingdong = ui.create.div(isDynamic ? '.pfqh-skin-dong' : '.pfqh-skin-jing', skinView)
                        jingdong.isDynamic = isDynamic
                        jingdong.listen((e) => {
                            if (!jingdong.isDynamic) {
                                jingdong.classList.add('pfqh-skin-dong')
                                jingdong.classList.remove('pfqh-skin-jing')
                                jingdong.isDynamic = true
                                skinSwitch.dynamic.selectSkinV3(skinKey, player, isPrimary)
                                game.qhly_setCurrentSkin(name, skin, function() {
                                    viewState.refreshSkins();
                                }, true)
                                if (!skinView.node) {
                                    skinView.style.backgroundImage = 'url("' + lib.assetURL + 'extension/十周年UI/assets/dynamic/' + skinSprite.background + '")';
                                    playDynamic(skinView, skinSprite)
                                }

                                // 背景修改
                                if (skinSprite.background) {
                                    skinView.style.backgroundImage = 'url("' + lib.assetURL + 'extension/十周年UI/assets/dynamic/' + skinSprite.background + '")';
                                } else {
                                    skinView.style.backgroundImage = null;
                                }
                            } else {
                                jingdong.classList.remove('pfqh-skin-dong')
                                jingdong.classList.add('pfqh-skin-jing')
                                jingdong.isDynamic = false
                                // 设置动皮对应的静皮
                                if (viewState.cancelClick) return;
                                game.qhly_playQhlyAudio('qhly_voc_fanshu', null, true);

                                // 设置当前皮肤的背景和语音, 调用千幻聆音
                                // 恢复原来的静态背景
                                if (!skinInfo.isDefault) {
                                    let file = game.qhly_getSkinFile(name, skin);
                                    skinView.qhly_origin_setBackgroundImage(file);
                                    game.qhly_setCurrentSkin(name, skin, function() {
                                        viewState.refreshSkins();
                                    }, true)
                                } else {
                                    skinView.style.backgroundImage = skinInfo.staticImg
                                }
                                // 停止播放动画.
                                if (skinView.node) {
                                    am.getAnimation(skinView.node.version).stopSpine(skinView.node)
                                    if (skinView.node.beijingNode) {
                                        am.getAnimation(skinView.node.beijingNode.version).stopSpine(skinView.node.beijingNode)
                                    }
                                    if (skinView.node.qianjingNode) {
                                        am.getAnimation(skinView.node.qianjingNode.version).stopSpine(skinView.node.qianjingNode)
                                    }
                                    skinView.node = null;
                                }
                                setStaticSkin()
                            }
                            e.stopPropagation();
                        })
                    }
                    if (skin) {
                        // 这里不使用千幻皮肤名称了, 直接使用图片的名称
                        skinView.belowText.innerHTML = skinInfo.skinName
                    } else {
                        skinView.belowText.innerHTML = "初始皮肤";
                    }
                    if (game.qhly_skinIs(name, skin)) {
                        skinView.belowText.style.textShadow = '.2rem 0rem .5rem red,-.2rem 0rem .5rem red,0rem .2rem .5rem red,0rem -.2rem .5rem red';
                    } else {
                        skinView.belowText.style.textShadow = '.2rem 0rem .5rem blue,-.2rem 0rem .5rem blue,0rem .2rem .5rem blue,0rem -.2rem .5rem blue';
                    }
                    (function(name, skin, view) {
                        view.listen(function() {
                            if (viewState.cancelClick) return;
                            if (skin !== '__default_dynamic' && game.qhly_skinIs(name, skin)) return;
                            game.qhly_playQhlyAudio('qhly_voc_fanshu', null, true);
                            if (jingdong && jingdong.isDynamic) {
                                skinSwitch.dynamic.selectSkinV3(skinKey, player, isPrimary)
                                game.qhly_setCurrentSkin(name, skin, function() {
                                    viewState.refreshSkins();
                                }, true);
                            } else {
                                game.qhly_setCurrentSkin(name, skin, function() {
                                    viewState.refreshSkins();
                                }, true);
                                setStaticSkin()
                            }
                        })
                    })(name, skin, skinView);
                    if (skin) {
                        if (!skinInfo.dynamic || !lib.config[skinSwitch.configKey.previewSkinsDynamic]) {
                            if (skinInfo.isDefault) {
                                skinView.style.backgroundImage = skinInfo.staticImg
                            } else {
                                let file = game.qhly_getSkinFile(name, skin);
                                skinView.qhly_origin_setBackgroundImage(file);
                            }
                        }

                    } else {
                        skinView.qhly_origin_setBackground(name, 'character');
                    }
                } else {
                    if (skin) {
                        skinView.belowText.innerHTML = skinInfo.skinName
                    } else {
                        skinView.belowText.innerHTML = "初始皮肤"
                    }

                    if (skin === currentSelect) {
                        skinView.belowText.style.textShadow = '.2rem 0rem .5rem red,-.2rem 0rem .5rem red,0rem .2rem .5rem red,0rem -.2rem .5rem red';
                    } else {
                        skinView.belowText.style.textShadow = '.2rem 0rem .5rem blue,-.2rem 0rem .5rem blue,0rem .2rem .5rem blue,0rem -.2rem .5rem blue';
                    }
                    (function(name, skin, view) {
                        view.listen(function() {
                            if (viewState.cancelClick) return;
                            if (skin === currentSelect) return;
                            if (skin == null) {
                                currentSelect = skin
                                skinView.setBackground(name, 'character');
                                setStaticSkin()
                            } else {
                                skinSwitch.dynamic.selectSkinV3(skinKey, player, isPrimary)
                                currentSelect = skin
                            }
                            viewState.refreshSkins()
                        })
                    })(name, skin, skinView);
                    if (!skin) {
                        skinView.setBackground(name, 'character');
                    }
                }
            }
            viewState.refresh();
        }

        let handleSkinInfo = () => {
            if (skinSwitch.qhly_hasExtension('千幻聆音')) {
                game.qhly_getSkinList(name, function(ret, list) {
                    updateSkinInfo(list)
                    initSkinViews()
                }, false)
            } else {
                initSkinViews()
            }
        }

        handleSkinInfo()

        // 初始化千幻小窗拖拽功能
        this.initSmallWindowDrag(dialog, dragHandle);

        backgroundBack.listen(function(event) {
            exitListener();
        });
        exit.listen(exitListener);
        enlarge.listen(function() {
            exitListener();
            if (skinSwitch.qhly_hasExtension('千幻聆音')) {
                game.qhly_open_new(name, lib.config.qhly_doubledefaultpage ? lib.config.qhly_doubledefaultpage : 'skill', player);
            }
        })
    },
    // 初始化千幻小窗拖拽功能
    initSmallWindowDrag: function(dialog, dragHandle) {
        if (!dialog || !dragHandle) return;

        let isDragging = false;
        let startX = 0;
        let startY = 0;
        let initialLeft = 0;
        let initialTop = 0;

        // 获取事件类型
        const downEvent = lib.config.touchscreen ? 'touchstart' : 'mousedown';
        const moveEvent = lib.config.touchscreen ? 'touchmove' : 'mousemove';
        const upEvent = lib.config.touchscreen ? 'touchend' : 'mouseup';

        // 获取触摸/鼠标坐标
        const getEventCoords = (e) => {
            if (e.touches && e.touches.length > 0) {
                return {
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY
                };
            }
            return {
                x: e.clientX,
                y: e.clientY
            };
        };

        // 开始拖拽
        const startDrag = (e) => {
            e.preventDefault();
            e.stopPropagation();

            isDragging = true;
            const coords = getEventCoords(e);
            startX = coords.x;
            startY = coords.y;

            // 获取当前位置
            const rect = dialog.getBoundingClientRect();
            initialLeft = rect.left;
            initialTop = rect.top;

            // 添加拖拽状态样式
            dialog.classList.add('dragging');

            // 阻止默认的transform，使用绝对定位
            dialog.style.position = 'fixed';
            dialog.style.left = initialLeft + 'px';
            dialog.style.top = initialTop + 'px';
            dialog.style.transform = 'none';

            // 添加全局事件监听
            document.addEventListener(moveEvent, handleDrag, {
                passive: false
            });
            document.addEventListener(upEvent, stopDrag);
        };

        // 处理拖拽
        const handleDrag = (e) => {
            if (!isDragging) return;

            e.preventDefault();
            const coords = getEventCoords(e);
            const deltaX = coords.x - startX;
            const deltaY = coords.y - startY;

            const newLeft = initialLeft + deltaX;
            const newTop = initialTop + deltaY;

            // 限制在屏幕范围内
            const maxLeft = window.innerWidth - dialog.offsetWidth;
            const maxTop = window.innerHeight - dialog.offsetHeight;

            const constrainedLeft = Math.max(0, Math.min(newLeft, maxLeft));
            const constrainedTop = Math.max(0, Math.min(newTop, maxTop));

            dialog.style.left = constrainedLeft + 'px';
            dialog.style.top = constrainedTop + 'px';
        };

        // 停止拖拽
        const stopDrag = () => {
            if (!isDragging) return;

            isDragging = false;
            dialog.classList.remove('dragging');

            // 移除全局事件监听
            document.removeEventListener(moveEvent, handleDrag);
            document.removeEventListener(upEvent, stopDrag);
        };

        // 重置位置功能（双击拖拽手柄）
        const resetPosition = () => {
            dialog.style.position = '';
            dialog.style.left = '';
            dialog.style.top = '';
            dialog.style.transform = 'translate(-50%, -50%)';
        };

        // 绑定事件
        dragHandle.addEventListener(downEvent, startDrag);

        // 双击重置位置
        let clickCount = 0;
        dragHandle.addEventListener('click', (e) => {
            e.stopPropagation();
            clickCount++;
            setTimeout(() => {
                if (clickCount === 2) {
                    resetPosition();
                }
                clickCount = 0;
            }, 300);
        });
    },
    selectSkinData: {
        temp: "",
        value: "",
    },
    // 初始化角色调整窗口拖拽功能
    initEditBoxDrag: function(editBox, dragHandle) {
        if (!editBox || !dragHandle) return;

        let isDragging = false;
        let startX = 0;
        let startY = 0;
        let initialLeft = 0;
        let initialTop = 0;

        // 获取事件类型
        const downEvent = lib.config.touchscreen ? 'touchstart' : 'mousedown';
        const moveEvent = lib.config.touchscreen ? 'touchmove' : 'mousemove';
        const upEvent = lib.config.touchscreen ? 'touchend' : 'mouseup';

        // 获取触摸/鼠标坐标
        const getEventCoords = (e) => {
            if (e.touches && e.touches.length > 0) {
                return {
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY
                };
            }
            return {
                x: e.clientX,
                y: e.clientY
            };
        };

        // 开始拖拽
        const startDrag = (e) => {
            e.preventDefault();
            e.stopPropagation();

            isDragging = true;
            const coords = getEventCoords(e);
            startX = coords.x;
            startY = coords.y;

            // 获取当前位置
            const rect = editBox.getBoundingClientRect();
            initialLeft = rect.left;
            initialTop = rect.top;

            // 添加拖拽状态样式
            editBox.classList.add('dragging');

            // 阻止默认的transform，使用绝对定位
            editBox.style.position = 'fixed';
            editBox.style.left = initialLeft + 'px';
            editBox.style.top = initialTop + 'px';
            editBox.style.transform = 'none';

            // 添加全局事件监听
            document.addEventListener(moveEvent, handleDrag, {
                passive: false
            });
            document.addEventListener(upEvent, stopDrag);
        };

        // 处理拖拽
        const handleDrag = (e) => {
            if (!isDragging) return;

            e.preventDefault();
            const coords = getEventCoords(e);
            const deltaX = coords.x - startX;
            const deltaY = coords.y - startY;

            const newLeft = initialLeft + deltaX;
            const newTop = initialTop + deltaY;

            // 限制在屏幕范围内
            const maxLeft = window.innerWidth - editBox.offsetWidth;
            const maxTop = window.innerHeight - editBox.offsetHeight;

            const constrainedLeft = Math.max(0, Math.min(newLeft, maxLeft));
            const constrainedTop = Math.max(0, Math.min(newTop, maxTop));

            editBox.style.left = constrainedLeft + 'px';
            editBox.style.top = constrainedTop + 'px';
        };

        // 停止拖拽
        const stopDrag = () => {
            if (!isDragging) return;

            isDragging = false;
            editBox.classList.remove('dragging');

            // 移除全局事件监听
            document.removeEventListener(moveEvent, handleDrag);
            document.removeEventListener(upEvent, stopDrag);
        };

        // 重置位置功能（双击拖拽手柄）
        const resetPosition = () => {
            editBox.style.position = '';
            editBox.style.left = '';
            editBox.style.top = '';
            editBox.style.transform = '';
        };

        // 绑定事件
        dragHandle.addEventListener(downEvent, startDrag);

        // 双击重置位置
        let clickCount = 0;
        dragHandle.addEventListener('click', (e) => {
            e.stopPropagation();
            clickCount++;
            setTimeout(() => {
                if (clickCount === 2) {
                    resetPosition();
                }
                clickCount = 0;
            }, 300);
        });
    },
    // 触发以下武器技能不触发角色的特殊动画
    filterSkills: [
        'zhangba_skill', 'guding_skill',
        'zhuque_skill', 'hanbing_skill',
        'guanshi_skill', 'cixiong_skill',
        'fangtian_skill', 'qilin_skill',
        'qinggang_skill', 'zhuge_skill',
        'bagua_skill', 'bahu',
    ],
    dynamic: {
        initSwitch: function(player, skins) {
            if (player.name == "unknown" && player.name1) {
                var name = player.name1;
            } else {
                var name = player.name;
            }
            var skinDiv = ui.create.div("#skinDiv", ui.window);
            skinSwitch.dynamic.skinDiv = skinDiv;
            skinDiv.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function() {
                skinSwitch.dynamic.skinDivShowOrHide()
            })
            var skinDiv2 = ui.create.div("#skinDiv2", skinDiv);
            skinDiv2.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function(e) {
                e.stopPropagation();
            })
            var skinBox = ui.create.div(".skinBox", skinDiv2);
            skinBox.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function(e) {
                e.stopPropagation();
            })
            var keys = Object.keys(skins)
            for (let i = 0; i < keys.length; i++) {
                var t = ui.create.div(".engSkin", skinBox);
                t.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function(e) {
                    e.stopPropagation();
                })
                let path = skinSwitch.url + "/images/character/" + skinSwitch.dynamic.judgingRealName(name) + "/" + keys[i] + ".png";
                let img = document.createElement("img");
                let saveDynamic = lib.config[skinSwitch.configKey.dynamicSkin];
                if (saveDynamic) {
                    var skin = saveDynamic[name];
                    if (skin == keys[i]) {
                        t.style.backgroundImage = "url(" + skinSwitch.url + "/images/base/skin_bg.png)";
                        skinSwitch.selectSkinData.temp = t;
                        skinSwitch.selectSkinData.value = keys[i];
                    } else t.style.backgroundImage = "url(" + skinSwitch.url + "/images/base/skin_not_bg.png)";
                }

                img.alt = keys[i];
                img.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function(e) {
                    e.stopPropagation();
                    this.parentNode.alt = this.alt;
                    skinSwitch.dynamic.selectSkin(this.parentNode);
                })
                img.src = path;
                img.onerror = function() {
                    this.src = skinSwitch.url + "/images/character/小杀.png";
                    this.onerror = null;
                    return true
                }
                t.appendChild(img);
            }
        },
        dynamicSkinInfo: {}, // 保存每个有动皮角色的在十周年ui的动皮配置信息
        playerTempSkinInfo: {
            currentWatchId: null, // 保存当前选择查看的角色动皮信息
        },
        initPlayerAvatarDynamic: (player, isPrimary) => {
            if (player.pfqhId == null) return
            let dInfo = skinSwitch.dynamic.dynamicSkinInfo[player.pfqhId]
            if (!dInfo) return
            let skinInfos = isPrimary ? dInfo.primary : dInfo.deputy
            let characterName = isPrimary ? player.name1 : player.name2
            // 初始化当前皮肤信息到dom中
            let skins = document.getElementById('pfqhSkins')
            // 删除原来的节点
            skins.innerHTML = ''

            let addLisName = lib.config.touchscreen ? 'touchend' : 'click'

            let selectName = null
            if (lib.config[skinSwitch.configKey.dynamicSkin]) {
                selectName = lib.config[skinSwitch.configKey.dynamicSkin][characterName]
            }

            if (skinInfos) {
                // 获取选择的皮肤的位置
                let keys = Object.keys(skinInfos)
                let curIndex = 0
                for (let j = 0; j < keys.length; j++) {
                    if (selectName === keys[j]) {
                        curIndex = j
                        break
                    }
                }
                for (let i = 0; i < keys.length; i++) {
                    let k = keys[i]
                    let skinInfo = skinInfos[k]
                    let skinAvatar = ui.create.div(".skin-avatar", skins);
                    let skinName = ui.create.div('.pfqh-text', skinAvatar)
                    skinName.innerHTML = k
                    let skinCover = ui.create.div('.pfqh-skin-cover', skinAvatar)
                    let skinImgDiv = ui.create.div('.pfqh-skin', skinCover)
                    if (curIndex <= 2) {
                        if (i > 2) skinAvatar.style.display = 'none'
                    } else {
                        if (i + 2 < curIndex || i > curIndex) skinAvatar.style.display = 'none'
                    }
                    skinImgDiv.setAttribute('skinName', k)
                    skinImgDiv.addEventListener(addLisName, (e) => {
                        e.stopPropagation()
                        skinSwitch.dynamic.selectSkinV2(e.target.getAttribute('skinName'), e.target)
                    })

                    if (selectName === k) {
                        skinCover.classList.add('pfqh-selected')
                        // 并且设置选择的是当前皮肤
                        let selInfo = skinSwitch.dynamic.playerTempSkinInfo[player.pfqhId]
                        if (isPrimary) {
                            selInfo.primary = {
                                temp: skinImgDiv,
                                value: k,
                                curIndex: curIndex - 2 <= 0 ? 0 : curIndex - 2
                            }
                        } else {
                            selInfo.deputy = {
                                temp: skinImgDiv,
                                value: k,
                                curIndex: i
                            }
                        }
                    }
                    if (skinSwitch.qhly_hasExtension('千幻聆音')) {
                        let filename = game.qhly_getSkinFile(characterName, k)
                        // 获取放在骨骼目录下的图片路径
                        let skinPath = skinInfo.name
                        let lastIdx = skinPath.lastIndexOf('/')
                        let foldPath = lastIdx === -1 ? '' : skinPath.slice(0, lastIdx)
                        skinSwitch.checkFilesExistAndReturnOne([filename + '.jpg', filename + '.png', skinSwitch.dcdPath + '/assets/dynamic/' + foldPath + '/' + skinInfo.skinName + '.jpg'], (path) => {
                            if (path) {
                                skinImgDiv.style.backgroundImage = "url(" + lib.assetURL + path + ")"
                            } else {
                                skinImgDiv.style.backgroundImage = "url(" + skinSwitch.url + "/images/character/小杀.png)"
                            }

                        })
                    } else {
                        skinImgDiv.style.backgroundImage = "url(" + skinSwitch.url + "/images/character/小杀.png)"
                    }
                }
                if (keys.length < 3) {
                    skins.style = 'justify-content: flex-start;'
                    skins.children[0].style = 'margin-right:5%;'
                } else {
                    skins.style = ''
                }
                let left = document.getElementById('dynamicLeftArrow')
                let right = document.getElementById('dynamicRightArrow')
                if (Object.keys(skinInfos).length <= 3) {
                    // 隐藏左右按钮
                    left.classList.add('hidden')
                    right.classList.add('hidden')
                } else {
                    if (curIndex <= 2) {
                        left.classList.add('hidden')
                    } else {
                        left.classList.remove('hidden')
                    }
                    if (curIndex + 2 >= Object.keys(skinInfos).length) {
                        right.classList.add('hidden')
                    } else {
                        right.classList.remove('hidden')
                    }
                }
            }
        },
        initSwitchV2: function() {
            // 初始化当前对局中, 所有拥有动皮角色的动皮
            for (let i = 0; i < game.players.length; i++) {
                let p = game.players[i]
                let dskins = decadeUI.dynamicSkin
                let primarySkins = dskins[p.name1]
                let dyInfo = {}
                if (primarySkins) {
                    dyInfo.primary = primarySkins
                }
                let deputySkins = dskins[p.name2]
                if (deputySkins) {
                    dyInfo.deputy = deputySkins
                }
                if (primarySkins || deputySkins) {
                    p.pfqhId = i // 动态添加一个id, 来标明当前是那个角色
                    dyInfo.player = p // 保存当前玩家的引用
                    dyInfo.zhuFuFlag = !!primarySkins;
                    this.dynamicSkinInfo[i] = dyInfo

                    this.playerTempSkinInfo[i] = {
                        primary: {
                            temp: '',
                            value: '',
                            curIndex: 0
                        },
                        deputy: {
                            temp: '',
                            value: '',
                            curIndex: 0
                        },
                    }
                }

            }

            let addLisName = lib.config.touchscreen ? 'touchend' : 'click'
            // 初始化动皮框的全体内容
            if (Object.keys(this.dynamicSkinInfo).length > 0) {
                let skinDiv = ui.create.div("#skinDiv", ui.window);
                skinDiv.innerHTML = `
                                <div class="skin-character" id="skinCharacter">
                                    <div class="selectBackground">
                                        <div class="selectOut">
                                            <select class="selectInner" id="playerSkinSelect">
                                            </select>
                                        </div>
                                    </div>
                                    <!-- 切换样式: https://code.juejin.cn/pen/7144159185901453342 -->
                                    <div class='hellokitty' id="zhuFuDiv">
                                        <div class='text active' id='zhuText1'>
                                            主将
                                        </div>
                                        <div class='btn' id='zhuFuBtn'>
                                            <div class='paw'>
                                            </div>
                                            <div class='kitty'>
                                            </div>
                                        </div>
                                        <div class='text' id='fuText2'>
                                            副将
                                        </div>
                                    </div>
                                </div>
                                <div id="skinDiv2">
                                    <div class="skin-drag-handle" id="skinDragHandle" title="拖拽移动千幻聆音窗口"></div>
                                    <div class="skinBox">
                                        <div class="pfqhLeftArrow" id="dynamicLeftArrow"></div>
                                        <div class="skins" id="pfqhSkins">
                                        </div>
                                        <div id="dynamicRightArrow" class="pfqhRightArrow"></div>
                                    </div>
                                </div>
                            `
                document.getElementById('skinCharacter').addEventListener(addLisName, e => {
                    e.stopPropagation()
                })
                document.getElementById('skinDiv2').addEventListener(addLisName, e => {
                    e.stopPropagation()
                })

                // 添加拖拽功能
                this.initDragFunctionality()

                // 将座次号添加到option中
                let playerSkinSelect = document.getElementById('playerSkinSelect')
                let btn = document.getElementById('zhuFuBtn');
                let text1 = document.getElementById('zhuText1');
                let text2 = document.getElementById('fuText2');

                for (let k in this.dynamicSkinInfo) {
                    let option = document.createElement('option')
                    option.setAttribute('value', k)
                    let p = this.dynamicSkinInfo[k].player
                    let pName = lib.translate[p.name1]
                    if (!pName) pName = p.getSeatNum() + 1 + '号位'
                    option.text = pName
                    playerSkinSelect.options.add(option)
                }

                let initPlayerAvatarDynamic = skinSwitch.dynamic.initPlayerAvatarDynamic
                skinDiv.addEventListener(addLisName, function() {
                    skinSwitch.dynamic.skinDivShowOrHide()
                })

                let changeDynamicSkinsByIdx = (idx) => {
                    // 获取所选角色的有动皮的部分, 然后进行初始化
                    if (this.dynamicSkinInfo[idx].primary) {
                        initPlayerAvatarDynamic(this.dynamicSkinInfo[idx].player, true)
                        setZhuFuBtnStyle(true)
                    } else if (this.dynamicSkinInfo[idx].deputy) {
                        initPlayerAvatarDynamic(this.dynamicSkinInfo[idx].player, false)
                        setZhuFuBtnStyle(false)
                    }
                }

                let setZhuFuBtnStyle = (isPrimary) => {
                    if (!isPrimary) {
                        btn.classList.remove('left');
                        btn.classList.add('right');
                        text1.classList.remove('active');
                        text2.classList.add('active');
                    } else {
                        btn.classList.add('left');
                        btn.classList.remove('right');
                        text1.classList.add('active');
                        text2.classList.remove('active');
                    }
                }

                playerSkinSelect.onchange = (e) => {
                    let idx = playerSkinSelect.options[playerSkinSelect.selectedIndex].value
                    this.playerTempSkinInfo.currentWatchId = idx
                    changeDynamicSkinsByIdx(idx)
                    e.stopPropagation()
                }


                btn.addEventListener(addLisName, e => {
                    let curSelect = this.dynamicSkinInfo[this.playerTempSkinInfo.currentWatchId]
                    curSelect.zhuFuFlag = !curSelect.zhuFuFlag;
                    if (!curSelect.zhuFuFlag) {
                        btn.classList.remove('left');
                        btn.classList.add('right');
                        text1.classList.remove('active');
                        text2.classList.add('active');
                        initPlayerAvatarDynamic(curSelect.player, curSelect.zhuFuFlag)
                    } else {
                        btn.classList.add('left');
                        btn.classList.remove('right');
                        text1.classList.add('active');
                        text2.classList.remove('active');
                        initPlayerAvatarDynamic(curSelect.player, curSelect.zhuFuFlag)
                    }
                });

                document.getElementById('dynamicRightArrow').addEventListener(addLisName, (e) => {
                    let skins = document.getElementById('pfqhSkins').children
                    // 获取当前是主将还是副将
                    let flag = this.dynamicSkinInfo[this.playerTempSkinInfo.currentWatchId].zhuFuFlag
                    let watchId = this.playerTempSkinInfo.currentWatchId
                    let avatar = flag ? this.playerTempSkinInfo[watchId].primary : this.playerTempSkinInfo[watchId].deputy
                    let curIdx = avatar.curIndex
                    if (skins.length <= curIdx + 3) return
                    skins[curIdx].style.display = 'none'
                    skins[curIdx + 3].style.display = 'block'
                    avatar.curIndex++
                    if (skins.length <= avatar.curIndex + 3) e.target.classList.add('hidden')
                    document.getElementById('dynamicLeftArrow').classList.remove('hidden')
                })

                document.getElementById('dynamicLeftArrow').addEventListener(addLisName, (e) => {
                    let skins = document.getElementById('pfqhSkins').children
                    let flag = this.dynamicSkinInfo[this.playerTempSkinInfo.currentWatchId].zhuFuFlag
                    let watchId = this.playerTempSkinInfo.currentWatchId
                    let avatar = flag ? this.playerTempSkinInfo[watchId].primary : this.playerTempSkinInfo[watchId].deputy
                    let curIdx = avatar.curIndex
                    if (curIdx === 0) return
                    skins[curIdx + 2].style.display = 'none'
                    skins[curIdx - 1].style.display = 'block'
                    avatar.curIndex--
                    if (avatar.curIndex === 0) e.target.classList.add('hidden')
                    document.getElementById('dynamicRightArrow').classList.remove('hidden')
                })

                skinSwitch.dynamic.skinDiv = skinDiv;
                // 初始化第一个
                for (let k in this.dynamicSkinInfo) {
                    this.playerTempSkinInfo.currentWatchId = k
                    changeDynamicSkinsByIdx(k)
                    // 如果不是双将模式, 隐藏按钮
                    if (this.dynamicSkinInfo[k].player.name2 == null) {
                        document.getElementById('zhuFuDiv').style.display = 'none'
                    } else {
                        document.getElementById('zhuFuDiv').style.display = 'flex'
                    }
                    break
                }
            }
        },
        // 初始化拖拽功能
        initDragFunctionality: function() {
            const skinDiv2 = document.getElementById('skinDiv2');
            const dragHandle = document.getElementById('skinDragHandle');

            if (!skinDiv2 || !dragHandle) return;

            let isDragging = false;
            let startX = 0;
            let startY = 0;
            let initialLeft = 0;
            let initialTop = 0;

            // 获取事件类型
            const downEvent = lib.config.touchscreen ? 'touchstart' : 'mousedown';
            const moveEvent = lib.config.touchscreen ? 'touchmove' : 'mousemove';
            const upEvent = lib.config.touchscreen ? 'touchend' : 'mouseup';

            // 获取触摸/鼠标坐标
            const getEventCoords = (e) => {
                if (e.touches && e.touches.length > 0) {
                    return {
                        x: e.touches[0].clientX,
                        y: e.touches[0].clientY
                    };
                }
                return {
                    x: e.clientX,
                    y: e.clientY
                };
            };

            // 开始拖拽
            const startDrag = (e) => {
                e.preventDefault();
                e.stopPropagation();

                isDragging = true;
                const coords = getEventCoords(e);
                startX = coords.x;
                startY = coords.y;

                // 获取当前位置
                const rect = skinDiv2.getBoundingClientRect();
                initialLeft = rect.left;
                initialTop = rect.top;

                // 添加拖拽状态样式
                skinDiv2.classList.add('dragging');

                // 阻止默认的transform，使用绝对定位
                skinDiv2.style.position = 'fixed';
                skinDiv2.style.left = initialLeft + 'px';
                skinDiv2.style.top = initialTop + 'px';
                skinDiv2.style.transform = 'none';

                // 添加全局事件监听
                document.addEventListener(moveEvent, handleDrag, {
                    passive: false
                });
                document.addEventListener(upEvent, stopDrag);
            };

            // 处理拖拽
            const handleDrag = (e) => {
                if (!isDragging) return;

                e.preventDefault();
                const coords = getEventCoords(e);
                const deltaX = coords.x - startX;
                const deltaY = coords.y - startY;

                const newLeft = initialLeft + deltaX;
                const newTop = initialTop + deltaY;

                // 限制在屏幕范围内
                const maxLeft = window.innerWidth - skinDiv2.offsetWidth;
                const maxTop = window.innerHeight - skinDiv2.offsetHeight;

                const constrainedLeft = Math.max(0, Math.min(newLeft, maxLeft));
                const constrainedTop = Math.max(0, Math.min(newTop, maxTop));

                skinDiv2.style.left = constrainedLeft + 'px';
                skinDiv2.style.top = constrainedTop + 'px';
            };

            // 停止拖拽
            const stopDrag = () => {
                if (!isDragging) return;

                isDragging = false;
                skinDiv2.classList.remove('dragging');

                // 移除全局事件监听
                document.removeEventListener(moveEvent, handleDrag);
                document.removeEventListener(upEvent, stopDrag);
            };

            // 重置位置功能（双击拖拽手柄）
            const resetPosition = () => {
                skinDiv2.style.position = '';
                skinDiv2.style.left = '';
                skinDiv2.style.top = '';
                skinDiv2.style.transform = 'translate(-50%, -50%)';
            };

            // 绑定事件
            dragHandle.addEventListener(downEvent, startDrag);

            // 双击重置位置
            let clickCount = 0;
            dragHandle.addEventListener('click', (e) => {
                e.stopPropagation();
                clickCount++;
                setTimeout(() => {
                    if (clickCount === 2) {
                        resetPosition();
                    }
                    clickCount = 0;
                }, 300);
            });
        },
        // 修改eng选择皮肤框的写法
        selectSkinV2: function(skinName, target) {
            if (!skinName) return
            game.playAudio("..", "extension", "千幻聆音/audio/game", "Notice02.mp3")
            let curWatchId = this.playerTempSkinInfo.currentWatchId
            let curSkins = this.dynamicSkinInfo[curWatchId]
            let tempSkinInfo = this.playerTempSkinInfo[curWatchId]
            let isPrimary = curSkins.zhuFuFlag
            let avatarSkins = isPrimary ? curSkins.primary : curSkins.deputy
            let avatarInfo = isPrimary ? tempSkinInfo.primary : tempSkinInfo.deputy
            if (avatarSkins && avatarInfo && avatarInfo.value !== skinName) {
                if (avatarInfo.temp instanceof HTMLElement) {
                    avatarInfo.temp.parentNode.classList.remove('pfqh-selected')
                }
                target.parentNode.classList.add('pfqh-selected')
                avatarInfo.value = skinName
                avatarInfo.temp = target
                let player = curSkins.player
                if (!player.isAlive()) return
                let avatarName = isPrimary ? player.name1 : player.name2

                let skin = avatarSkins[skinName]
                if (!skin) return
                player.stopDynamic(isPrimary, !isPrimary)

                // 添加千幻语音支持
                console.log('对局中千幻聆音 - selectSkinV2:', avatarName, skinName, isPrimary ? '主将' : '副将');

                // 深度重置语音系统
                console.log('selectSkinV2 - 执行深度语音重置');
                skinSwitch.deepResetAudioSystem();

                skinSwitch.enhanceSkinWithQianhuanAudio(skin, avatarName, skinName);

                // 标记需要刷新语音
                if (skin.audio) {
                    skin._needUpdateAudio = true;
                    console.log('selectSkinV2 - 检测到语音配置，标记需要刷新:', skin.audio);
                }

                skin.player = skin;
                dcdAnim.playSpine(skinSwitch.huanfu, {
                    scale: 0.5,
                    parent: player
                });
                skin.deputy = !isPrimary

                if (skin.localePath) {
                    if (!skin.name.startsWith(skin.localePath + '/')) {
                        skin.name = skin.localePath + '/' + skin.name
                        skin.background = skin.localePath + '/' + skin.background
                    }
                }

                if (game.qhly_setCurrentSkin) {
                    // todo? 暂时先这样, 后面改成和雷音同步
                    game.qhly_setCurrentSkin(isPrimary ? player.name1 : player.name2, skin.skinName + '.jpg', () => {
                        let namex = isPrimary ? player.name1 : player.name2
                        if (!lib.config.qhly_skinset) {
                            lib.config.qhly_skinset = {}
                        }
                        if (!lib.config.qhly_skinset.djtoggle) {
                            lib.config.qhly_skinset.djtoggle = {}
                        }
                        if (!lib.config.qhly_skinset.djtoggle[namex]) {
                            lib.config.qhly_skinset.djtoggle[namex] = {}
                        }
                        // 默认用.jpg结尾,
                        lib.config.qhly_skinset.djtoggle[namex][skin.skinName + '.jpg'] = false
                    }, true)
                }

                player.playDynamic(skin, !isPrimary);

                // 千幻聆音完成后强制重建语音映射
                setTimeout(() => {
                    console.log('selectSkinV2 - 千幻聆音完成，重建语音映射');
                    if (skin.audio) {
                        skin._needUpdateAudio = true;
                        skinSwitch.initPlayerAudioImmediate(player, isPrimary, skin);
                    }
                }, 1200);

                if (skin.background) {
                    player.$dynamicWrap.style.backgroundImage = 'url("' + lib.assetURL + 'extension/十周年UI/assets/dynamic/' + skin.background + '")';
                } else {
                    player.$dynamicWrap.style.backgroundImage = 'url("' + lib.assetURL + 'extension/千幻聆音/images/card/card.png")'
                }
                player.classList.add(!isPrimary ? 'd-skin2' : 'd-skin');

                if (!lib.config[skinSwitch.configKey.dynamicSkin]) lib.config[skinSwitch.configKey.dynamicSkin] = {};
                if (lib.config[skinSwitch.configKey.dynamicSkin]) {
                    let cg = lib.config[skinSwitch.configKey.dynamicSkin];
                    cg[avatarName] = skinName;
                    game.saveConfig(skinSwitch.configKey.dynamicSkin, cg);
                }
                skinSwitch.dynamic.startPlay2Random(player)

                // 皮肤变化了, 修改编辑的全局变量
                if (isPrimary && window.dynamicEditBox && player === game.me) {
                    dynamicEditBox.updateGlobalParams()
                }

            }

        },
        // 以千幻聆音小窗扩展形式的选择皮肤功能
        selectSkinV3: function(skinName, player, isPrimary) {
            if (!skinName) return
            if (!player || !player.isAlive()) return

            let dskins = decadeUI.dynamicSkin
            const avatarName = isPrimary ? player.name1 : player.name2
            const skins = dskins[avatarName]
            let skin = skins[skinName]
            if (!skin) return

            player.stopDynamic(isPrimary, !isPrimary)
            skin.player = skin

            // 尝试从千幻聆音读取语音配置
            console.log('对局中千幻聆音 - selectSkinV3:', avatarName, skinName, isPrimary ? '主将' : '副将');

            // 深度重置语音系统
            console.log('selectSkinV3 - 执行深度语音重置');
            skinSwitch.deepResetAudioSystem();

            skinSwitch.enhanceSkinWithQianhuanAudio(skin, avatarName, skinName);

            // 标记需要刷新语音
            if (skin.audio) {
                skin._needUpdateAudio = true;
                console.log('selectSkinV3 - 检测到语音配置，标记需要刷新:', skin.audio);
            }

            dcdAnim.playSpine(skinSwitch.huanfu, {
                scale: 0.5,
                parent: player
            })
            skin.deputy = !isPrimary
            player.playDynamic(skin, !isPrimary);

            // 千幻聆音后重新应用保存的动皮参数
            setTimeout(() => {
                if (window.skinSwitch && typeof skinSwitch.updateDecadeDynamicSkin === 'function') {
                    console.log('千幻聆音后重新应用保存的动皮参数...');
                    skinSwitch.updateDecadeDynamicSkin();
                }
            }, 100);

            // 千幻聆音完成后强制重建语音映射
            setTimeout(() => {
                console.log('selectSkinV3 - 千幻聆音完成，重建语音映射');
                if (skin.audio) {
                    skin._needUpdateAudio = true;
                    skinSwitch.initPlayerAudioImmediate(player, isPrimary, skin);
                }
            }, 1200);

            if (skin.background) {
                player.$dynamicWrap.style.backgroundImage = 'url("' + lib.assetURL + 'extension/十周年UI/assets/dynamic/' + skin.background + '")';
            } else {
                player.$dynamicWrap.style.backgroundImage = 'url("' + lib.assetURL + 'extension/千幻聆音/images/card/card.png")'
            }
            player.classList.add(!isPrimary ? 'd-skin2' : 'd-skin');

            if (!lib.config[skinSwitch.configKey.dynamicSkin]) lib.config[skinSwitch.configKey.dynamicSkin] = {};
            if (lib.config[skinSwitch.configKey.dynamicSkin]) {
                let cg = lib.config[skinSwitch.configKey.dynamicSkin];
                cg[avatarName] = skinName;
                game.saveConfig(skinSwitch.configKey.dynamicSkin, cg);
            }
            skinSwitch.dynamic.startPlay2Random(player)

            // 皮肤变化了, 修改编辑的全局变量
            if (isPrimary && window.dynamicEditBox && player === game.me) {
                dynamicEditBox.updateGlobalParams()
            }

        },
        // 老eng的选择皮肤
        selectSkin: function(e) {
            game.playAudio("..", "extension", "千幻聆音/audio/game", "Notice02.mp3");
            let temp = skinSwitch.selectSkinData.temp;
            if (temp === "") {
                skinSwitch.selectSkinData.temp = e;
                skinSwitch.selectSkinData.value = e.alt
                return
            }
            if (temp !== e) {
                if (skinSwitch.dynamic.selectSkin.cd) {
                    skinSwitch.dynamic.selectSkin.cd = false;
                    let player = game.me;
                    temp.style.backgroundImage = "url(" + skinSwitch.url + "/images/base/skin_not_bg.png)";
                    skinSwitch.selectSkinData.value = e.alt;
                    e.style.backgroundImage = "url(" + skinSwitch.url + "/images/base/skin_bg.png)";
                    skinSwitch.selectSkinData.temp = e;
                    var skin = dui.dynamicSkin[player.name][e.alt];
                    // if (skin.action) delete skin.action;
                    player.stopDynamic();

                    // 添加千幻语音支持
                    console.log('对局中千幻聆音 - selectSkin:', player.name, e.alt);

                    // 深度重置语音系统
                    console.log('selectSkin - 执行深度语音重置');
                    skinSwitch.deepResetAudioSystem();

                    skinSwitch.enhanceSkinWithQianhuanAudio(skin, player.name, e.alt);

                    skinSwitch.huanfu.parent = player;
                    skin.player = skin;
                    dcdAnim.playSpine(skinSwitch.huanfu, skinSwitch.huanfu);
                    if (skin.deputy) skin.deputy = false;

                    if (skin.localePath) {
                        if (!skin.name.startsWith(skin.localePath + '/')) {
                            skin.name = skin.localePath + '/' + skin.name
                            skin.background = skin.localePath + '/' + skin.background
                        }
                    }

                    // 标记需要刷新语音
                    if (skin.audio) {
                        skin._needUpdateAudio = true;
                        console.log('selectSkin - 检测到语音配置，标记需要刷新:', skin.audio);
                    }

                    // 重新初始化
                    player.playDynamic(skin, false);

                    // 千幻聆音后重新应用保存的动皮参数
                    setTimeout(() => {
                        if (window.skinSwitch && typeof skinSwitch.updateDecadeDynamicSkin === 'function') {
                            console.log('千幻聆音后重新应用保存的动皮参数...');
                            skinSwitch.updateDecadeDynamicSkin();
                        }
                    }, 100);

                    // 千幻聆音完成后强制重建语音映射
                    setTimeout(() => {
                        console.log('selectSkin - 千幻聆音完成，重建语音映射');
                        if (skin.audio) {
                            skin._needUpdateAudio = true;
                            skinSwitch.initPlayerAudioImmediate(player, true, skin);
                        }
                    }, 1200);
                    if (skin.background) {
                        player.$dynamicWrap.style.backgroundImage = 'url("' + lib.assetURL + 'extension/十周年UI/assets/dynamic/' + skin.background + '")';
                    } else {
                        player.$dynamicWrap.style.backgroundImage = 'url("' + lib.assetURL + 'extension/千幻聆音/images/card/card.png")'
                    }
                    if (lib.config[skinSwitch.configKey.dynamicSkin]) {
                        var cg = lib.config[skinSwitch.configKey.dynamicSkin];
                        cg[player.name] = e.alt;
                        game.saveConfig(skinSwitch.configKey.dynamicSkin, cg);
                    }
                    skinSwitch.dynamic.skinDivShowOrHide();

                    // 皮肤变化了, 修改编辑的全局变量
                    if (window.dynamicEditBox) {
                        dynamicEditBox.updateGlobalParams()
                    }

                    setTimeout(() => {
                        skinSwitch.dynamic.selectSkin.cd = true;
                    }, 1000);
                } else {
                    skinSwitchMessage.show({
                        type: 'warning',
                        text: '更换动皮频繁.',
                        duration: 1500, // 显示时间
                        closeable: false, // 可手动关闭
                    })
                    // alert("更换动皮频繁.");
                }
            }
        },
        skinDivShowOrHide: function(show) {
            if (show) {
                skinSwitch.dynamic.skinDiv.style.display = "block";
                setTimeout(() => {
                    skinSwitch.dynamic.skinDiv.style.opacity = "1";
                }, 200);
            } else {
                skinSwitch.dynamic.skinDiv.style.opacity = "0";
                setTimeout(() => {
                    skinSwitch.dynamic.skinDiv.style.display = "none";
                }, 400);
            }
        },
        judgingRealName: function(name) {
            let shen = name.indexOf("shen_");
            let boss = name.indexOf("boss_");
            let special = shen > -1 ? shen : boss > -1 ? boss : -1;
            if (special > -1) {
                return name.substr(special, name.length);
            } else {
                var index = name.lastIndexOf("_");
                return name.substr(index + 1, name.length);
            }
        },
        /**
         * 判断当前player是否触发攻击特效, 使用动皮攻击会自动触发攻击特效, 比如如果是暗将, 就不触发攻击特效
         * @param player: player对象
         * @returns {Object|false}
         * { deputy: boolean,  // 是否是副将
         *   needHide: Number, // 需要隐藏的副将的skinId 当两个皮肤都是动皮的时候,需要隐藏一个动皮的出框动画
         *   isDouble: boolean  // 是否是双将
         *   dynamic: 需要播放的动皮参数
         * }
         */
        checkCanBeAction: function(player) {
            let isPrimary = player.dynamic.primary;
            let res = {
                isDouble: false,
                deputy: false,
                needHide: undefined
            }
            if (player.doubleAvatar) {
                res.isDouble = true;
                let isDeputy = player.dynamic.deputy;
                let unseen = player.isUnseen(0);
                let unseen2 = player.isUnseen(1);
                // 默认会只播放动皮的攻击动画.
                if (isPrimary && !unseen) {
                    res.dynamic = isPrimary;
                } else if (isDeputy && !unseen2) {
                    res.dynamic = isDeputy;
                    res.deputy = true;
                } else {
                    return false;
                }
                // 两个都是动皮, 并且都不是隐藏状态, 那么2号可能需要隐藏
                if (isPrimary && isDeputy) {
                    if (!unseen && !unseen2) {
                        res.needHide = isDeputy.id;
                    }
                }
            } else {
                res.dynamic = isPrimary;
            }
            return res;
        },
        getSkinName: function(roleName, skinPath) {
            let dskins = decadeUI.dynamicSkin[roleName]
            for (let k in dskins) {
                if (dskins[k].name === skinPath) {
                    return k
                }
            }
        },
        setBackground: function(avatar, player) {
            // 设置背景, 配合千幻使用, 会自动设置, 西瓜大佬的限定技需要读取这个角色的默认背景放到图框里面, 配合兼容
            let skin = player.dynamic[avatar];
            let obj = player.getElementsByClassName(avatar + "-avatar")[0];
            // 如果已经设置了, 就不再进行设置
            if (obj.style.backgroundImage == null) {
                // 获取千幻聆音
                if (skin.qhly_hasExtension('千幻聆音')) {
                    let roleName = avatar === 'primary' ? player.name1 : player.name2
                    let skinName = this.getSkinName(roleName, skin.name)
                    let path = game.qhly_getSkinFile(roleName, skinName);
                    if (!path.endsWith('jpg')) {
                        path = path + '.jpg'
                    }
                    obj.style.backgroundImage = `url("${path}")`;
                } else {
                    obj.style.backgroundImage = 'url("' + lib.assetURL + 'extension/十周年UI/assets/dynamic/' + skin.background + '")';
                }
            }

            // 设置动态皮肤背景
            if (player.$dynamicWrap && skin.player && skin.player.background) {
                player.$dynamicWrap.style.backgroundImage = 'url("' + lib.assetURL + 'extension/十周年UI/assets/dynamic/' + skin.player.background + '")';
            }

        },

        // 随机播放十周年动皮的play2动画
        startPlay2Random: function(player) {
            // 检查当前角色的动皮
            let checkCanPlay2 = (isPrimary) => {
                if (!player.dynamic) return false
                let avatar = isPrimary ? player.dynamic.primary : player.dynamic.deputy
                if (avatar) {
                    let sprite = avatar.player
                    return sprite.shizhounian;
                }
                return false
            }
            let getPlay2Action = (sprite) => {
                // 定时播放的就不读取特殊的标签了, 如果要重新指定标签, 单独指定
                // if (typeof sprite.teshu === 'string') {
                //     action = sprite.teshu
                // } else if (typeof sprite.teshu === 'object') {
                //     if (sprite.name === sprite.teshu.name) {
                //         action = sprite.teshu.action || 'play2'
                //     }
                // }
                return sprite.play2 || 'play2'
            }
            let firstLast
            if (!player.playPrimaryTimer) {
                if (checkCanPlay2(true)) {
                    let sprite = player.dynamic.primary.player
                    let action = getPlay2Action(sprite)
                    let randomInterval = function(timer) {
                        clearTimeout(player.playPrimaryTimer)
                        if (!checkCanPlay2(true)) {
                            return
                        }
                        // 只有非攻击状态才播放play2
                        if ((!player.lastPlayTime || (new Date().getTime() - player.lastPlayTime) > 10000) && !player.GongJi) {
                            skinSwitch.postMsgApi.playAvatar(player, true, action)
                        }
                        if (firstLast) {
                            // console.log('play2 time', (new Date().getTime() - firstLast) / 1000)
                        }
                        firstLast = new Date().getTime()
                        player.playPrimaryTimer = setTimeout(() => {
                            randomInterval()
                        }, Math.floor(Math.random() * 6000) + 10000)

                    }
                    // 10s后开启自动播放play2模式
                    setTimeout(randomInterval, 10 * 1000)
                }
            }
            let last
            if (!player.playDeputyTimer) {
                if (checkCanPlay2(false)) {
                    let sprite = player.dynamic.deputy.player
                    let action = getPlay2Action(sprite)
                    let randomInterval = function() {
                        clearTimeout(player.playDeputyTimer)
                        if (!checkCanPlay2(false)) {
                            return
                        }
                        if ((!player.lastPlayTime || (new Date().getTime() - player.lastPlayTime) > 8000) && !player.GongJi) {
                            skinSwitch.postMsgApi.playAvatar(player, false, action)
                        }
                        if (last) {
                            // console.log('play2 time', (new Date().getTime() - last) / 1000)
                        }
                        last = new Date().getTime()

                        player.playDeputyTimer = setTimeout(() => {
                            randomInterval()
                        }, Math.floor(Math.random() * 6000) + 8000)
                    }
                    // 10s后开启自动播放play2模式
                    setTimeout(randomInterval, 10 * 1000)
                }
            }
        },
        // 下面两个方法配合动皮更换骨骼等特殊事件
        // 返回单将或者双将满足条件的判断
        getSpecial: (player, triName) => {
            let getSpecialEffs = (avatar, isPrimary) => {
                if (!avatar) return null
                if (isPrimary) {
                    if (!player.originSkin) {
                        player.originSkin = avatar.player
                    }
                } else {
                    if (!player.originSkin2) {
                        player.originSkin2 = avatar.player // 副将的原始皮肤
                    }
                }

                let originSkin = isPrimary ? player.originSkin : player.originSkin2
                if (!originSkin) return null
                let special = originSkin.special
                if (!special) return null
                let effs
                effs = special.condition[triName]
                if (!effs) return null
                return {
                    avatar,
                    special,
                    effs,
                    isPrimary
                }
            }
            let res = []
            if (player.dynamic) {
                let r = getSpecialEffs(player.dynamic.primary, true)
                if (r) res.push(r)
                if (player.doubleAvatar) {
                    r = getSpecialEffs(player.dynamic.deputy, false)
                    if (r) res.push(r)
                }
            }
            return res
        },
        // 更改为指定参数的状态,
        transformDst: (player, isPrimary, dstInfo, extraParams = {
            isOrigin: false,
            huanfuEffect: null
        }) => {
            const avatar = isPrimary ? player.dynamic.primary : player.dynamic.deputy
            let {
                isOrigin,
                huanfuEffect
            } = extraParams
            // 标明这时转换播放骨骼
            dstInfo = Object.assign({}, dstInfo)
            dstInfo._transform = true

            // 记录原始骨骼的音频配置，确保可以恢复
            if (avatar && avatar.audio && !dstInfo.audio) {
                dstInfo.audio = avatar.audio
            }

            if (dstInfo.name == null || dstInfo.name === avatar.name) {
                if (dstInfo.action) {
                    skinSwitch.postMsgApi.changeAvatarAction(player, isPrimary, dstInfo, isOrigin)
                }
                if (dstInfo.skin) {
                    skinSwitch.postMsgApi.changeSkelSkin(player, dstInfo.skin, isPrimary)
                }
            } else {

                dstInfo.player = dstInfo
                let huanfuEff = {
                    name: '../../../千幻聆音/effects/transform/default',
                    scale: 0.7,
                    speed: 0.6,
                    delay: 0.3, // 默认设置的延迟是0.2秒
                }

                const changeEffects = skinSwitch.effects.transformEffects

                if (huanfuEffect) {
                    if (typeof huanfuEffect === 'string') {
                        if (huanfuEffect in changeEffects) {
                            huanfuEffect = changeEffects[huanfuEffect]
                        } else {
                            huanfuEffect = {
                                name: huanfuEffect
                            };
                        }
                    }
                    huanfuEff = Object.assign(huanfuEff, huanfuEffect)
                    huanfuEff.name = '../../../千幻聆音/effects/transform/' + huanfuEffect.name
                }
                skinSwitch.chukuangWorkerApi.playEffect(huanfuEff, {
                    parent: player
                })
                dstInfo.deputy = !isPrimary

                setTimeout(() => {
                    player.stopDynamic(isPrimary, !isPrimary)

                    // 添加_needUpdateAudio标记，确保playDynamic会重新初始化音频
                    dstInfo._needUpdateAudio = true

                    // 如果没有audio配置，尝试从千幻聆音获取
                    if (!dstInfo.audio && dstInfo.name) {
                        let [key, skinName] = dstInfo.name.split('/');
                        if (key && skinName) {
                            const qhAudioConfig = skinSwitch.getQianhuanAudioConfig(key, skinName);
                            if (qhAudioConfig) {
                                dstInfo.audio = qhAudioConfig;
                                console.log('变身时从千幻聆音读取语音配置:', key, skinName, qhAudioConfig);
                            }
                        }
                    }

                    // 确保游戏音频系统被初始化
                    if (!skinSwitch.pfqh_originPlayAudio) {
                        skinSwitch.pfqh_originPlayAudio = game.playAudio
                    }
                    if (!skinSwitch.qfqh_originPlaySkillAudio) {
                        skinSwitch.qfqh_originPlaySkillAudio = game.playSkillAudio
                    }

                    // 重新初始化语音
                    if (dstInfo.audio) {
                        let id = player.dynamic.id
                        let skinId = isPrimary ?
                            (player.dynamic.primary ? player.dynamic.primary.id : null) :
                            (player.dynamic.deputy ? player.dynamic.deputy.id : null)

                        if (!skinSwitch.audioMap) {
                            skinSwitch.audioMap = {}
                        }

                        // 处理音频路径
                        let skillPath = dstInfo.audio.skill
                        let cardPath = dstInfo.audio.card
                        let rootPath = skinSwitch.dcdPath + '/assets/dynamic/'

                        // 如果是千幻语音路径，则使用千幻的根路径
                        if (skillPath && skillPath.includes('sanguoaudio/')) {
                            rootPath = lib.assetURL + 'extension/千幻聆音/'
                        }

                        // 处理文件扩展名的辅助函数
                        let qhly_earse_ext = function(path) {
                            let foundDot = path.lastIndexOf('.');
                            if (foundDot < 0) return path;
                            return path.slice(0, foundDot);
                        }

                        // 更新技能语音
                        if (skillPath) {
                            let path = rootPath + skillPath
                            game.getFileList(path, function(folds, files) {
                                for (let file of files) {
                                    file = qhly_earse_ext(file);
                                    let key
                                    if (file === name) {
                                        key = 'die/' + file
                                        skinSwitch.audioMap[key] = '../' + path + '/' + file;
                                    } else if (file === 'victory' || file === 'win') {
                                        key = 'effect/' + id + '/' + skinId + '/' + 'victory'
                                        skinSwitch.audioMap[key] = '../' + path + '/' + file;
                                    } else {
                                        key = 'skill/' + file
                                        skinSwitch.audioMap[key] = '../' + path + '/' + file;
                                    }
                                    if (skinSwitch.avatarAudioSkinMap[name]) {
                                        skinSwitch.avatarAudioSkinMap[name][key] = null
                                    }
                                }
                            })
                        }

                        // 更新卡牌语音
                        if (cardPath) {
                            // 如果是千幻卡牌语音路径，也使用千幻的根路径
                            let cardRootPath = rootPath;
                            if (cardPath.includes('sanguoaudio/')) {
                                cardRootPath = lib.assetURL + 'extension/千幻聆音/';
                            }
                            let path = cardRootPath + cardPath
                            game.getFileList(path, function(folds, files) {
                                for (let file of files) {
                                    file = qhly_earse_ext(file);
                                    let key = 'card/' + id + '/' + skinId + '/' + file
                                    skinSwitch.audioMap[key] = '../' + path + '/' + file
                                    if (skinSwitch.avatarAudioSkinMap[name]) {
                                        skinSwitch.avatarAudioSkinMap[name][key] = null
                                    }
                                }
                            })
                        }
                    }

                    // 变身完成后，强制刷新语音映射以确保千幻语音正确加载
                    setTimeout(() => {
                        skinSwitch.forceRefreshAudioMapping(player, isPrimary);
                    }, 200);

                }, (huanfuEff.delay || 0) * 1000)

                if (dstInfo.background) {
                    player.$dynamicWrap.style.backgroundImage = 'url("' + lib.assetURL + 'extension/十周年UI/assets/dynamic/' + dstInfo.background + '")';
                }
                player.classList.add(!isPrimary ? 'd-skin2' : 'd-skin');

                skinSwitch.dynamic.startPlay2Random(player)

                // 皮肤变化了, 修改编辑的全局变量
                if (isPrimary && window.dynamicEditBox && player === game.me) {
                    dynamicEditBox.updateGlobalParams()
                }
            }
        },
    },

    // 统一管理向worker发送消息后, 防止worker回复的消息被覆盖而出的异常
    rendererOnMessage: {
        dynamicEvents: {}, // 内部动皮事件管理器
        onmessage: function(e) {
            let _this = skinSwitch.rendererOnMessage
            let data = e.data

            if (typeof data !== "object") return
            if (data) {
                // 读取data.id, 来确定是那个角色发出的消息的返回
                let id = data.id
                let type = data.type
                if (id in _this.dynamicEvents && type in _this.dynamicEvents[id]) {
                    // 调用之前注册的方法
                    _this.dynamicEvents[id][type](data)
                }

            }
        },
        /**
         * 添加worker对应消息类型的回调, 当worker发出对应的消息, 当前线程(主线程)调用对应的回调函数
         * @param player 当前角色
         * @param type  处理worker传回发回的消息类型
         * @param callback  回调
         * @param bind  调用回调函数时绑定this的对象, 默认为player
         */
        addListener: function(player, type, callback, bind) {
            let id = player.dynamic.id
            let renderer = player.dynamic.renderer
            if (renderer.onmessage !== this.onmessage) {
                renderer.onmessage = this.onmessage
            }
            if (!(id in this.dynamicEvents)) {
                this.dynamicEvents[id] = {}
            }
            // 直接覆盖之前的消息, 并且绑定回调函数的this为player
            this.dynamicEvents[id][type] = callback.bind(bind || player)
            // if (!(type in this.dynamicEvents[id])) {
            //     this.dynamicEvents[id][type] = callback.bind(player)
            // }
        }
    },
    // 向worker通信发送的消息api, 统一管理
    postMsgApi: {
        _onchangeDynamicWindow: function(player, res) {
            let canvas = player.getElementsByClassName("animation-player")[0];
            let dynamicWrap
            if (player.isQhlx) {
                dynamicWrap = player.getElementsByClassName("qhdynamic-big-wrap")[0];
            } else {
                // if (lib.config['extension_十周年UI_newDecadeStyle'] === "on") {
                //     dynamicWrap = player.getElementsByClassName("dynamicPlayerCanvas")[0]
                //
                // } else {
                dynamicWrap = player.getElementsByClassName("dynamic-wrap")[0];
                // }
            }
            skinSwitch.rendererOnMessage.addListener(player, 'chukuangFirst', function(data) {
                // 直接设置属性, 第一优先生效, 这里播放攻击动画, 调整播放canvas的位置, 不再跟随皮肤框,也就是动皮出框
                dynamicWrap.style.zIndex = 100;
                canvas.style.position = "fixed";
                canvas.style.height = "100%";
                canvas.style.width = "100%";
                if (!player.isQhlx) {
                    player.style.zIndex = 10;
                } else {
                    player.style.zIndex = 64 // 防止遮住血量
                }
                // canvas.style.opacity = 0
                // 防止闪烁,
                canvas.classList.add('pfqhFadeInEffect')
                // setTimeout(() => {
                //     canvas.classList.remove('hidden')
                // }, 250)
            })

            skinSwitch.rendererOnMessage.addListener(player, 'canvasRecover', function(data) {
                if (lib.config['extension_十周年UI_newDecadeStyle'] === "on") {
                    dynamicWrap.style.zIndex = "62";
                } else {
                    dynamicWrap.style.zIndex = "60";
                }
                canvas.style.height = null;
                canvas.style.width = null;
                canvas.style.position = null;
                if (player.isQhlx) {
                    dynamicWrap.style.zIndex = 62
                    player.style.zIndex = 62
                } else player.style.zIndex = 4;
                player.GongJi = false;
            })

            skinSwitch.rendererOnMessage.addListener(player, 'chukuangSecond', function(data) {
                // 这里表示动画已经准备好了, 可以显示
                setTimeout(() => {
                    canvas.classList.remove('pfqhFadeIn')
                }, 50)

                let playName
                if (res.dynamic.gongji && res.dynamic.gongji.name) {
                    playName = res.dynamic.gongji.name
                } else {
                    playName = res.dynamic.name
                }
                if (res.dynamic.localePath && playName.startsWith(res.dynamic.localePath)) {
                    playName = playName.substr(res.dynamic.localePath.length + 1, playName.length)
                }
                game.playAudio("..", "extension", "千幻聆音/audio/effect", playName + ".mp3");
            })
        },

        /**
         * 单独播放某个角色的动画
         * @param player  当前角色
         * @param isPrimary  是否是主将的
         * @param action  动画标签
         */
        playAvatar: function(player, isPrimary, action) {
            if (!player.dynamic) return
            let avatar = isPrimary ? player.dynamic.primary : player.dynamic.deputy
            if (!avatar) return
            player.dynamic.renderer.postMessage({
                message: 'ACTION',
                id: player.dynamic.id,
                action: action,
                skinID: avatar.id,
            })
        },
        // 更改角色的动作或者额外播放一段action
        changeAvatarAction: function(player, isPrimary, skinInfo, isDefault) {
            if (!player.dynamic) return
            let avatar = isPrimary ? player.dynamic.primary : player.dynamic.deputy
            if (!avatar) return
            player.dynamic.renderer.postMessage({
                message: 'CHANGE_ACTION',
                id: player.dynamic.id,
                skinInfo,
                isDefault, // 标明是否返回默认的待机状态
                skinID: avatar.id,
            })
        },
        /**
         * 请求worker播放对应的动画
         * @param player  当前player对象, 自己就是game.me
         * @param action  播放对应的动画action名称, TeShu/GongJi
         * @param playAvatar  可以指定播放哪个角色
         * @constructor
         */
        action: function(player, action, playAvatar) {
            let res = skinSwitch.dynamic.checkCanBeAction(player)
            if (res.dynamic && playAvatar && playAvatar !== res.dynamic) {
                res.skinID = playAvatar.id
                res.needHide = res.dynamic.id
                res.deputy = !res.deputy
            }
            let pp = skinSwitch.getCoordinate(player, true)
            let me = player === game.me
            if (res && res.dynamic) {
                if (!player.dynamic.renderer.postMessage) {
                    skinSwitchMessage.show({
                        type: 'warning',
                        text: '当前动皮过多',
                        duration: 1500, // 显示时间
                        closeable: false, // 可手动关闭
                    })
                    // 尝试清除千幻对应的特效
                    clearInterval(_status.texiaoTimer);
                    clearTimeout(_status.texiaoTimer2);
                    return
                }
                player.dynamic.renderer.postMessage({
                    message: 'ACTION',
                    id: player.dynamic.id,
                    action: action,
                    skinID: res.dynamic.id,
                    isDouble: res.isDouble,
                    deputy: res.deputy,
                    needHide: res.needHide,
                    me: me,
                    direction: me ? false : skinSwitch.getDirection(player),
                    player: pp,
                    selfPhase: _status.currentPhase === player // 是否是自己的回合
                })
            } else {
                player.GongJi = false
            }
            return res
        },
        actionTeShu: function(player) {
            let r = this.action(player, 'TeShu')
            if (r) {
                // 记录teshu上次的时间, 防止重复播放特殊动画
                player.lastPlayTime = new Date().getTime()
                skinSwitch.rendererOnMessage.addListener(player, 'teshuChuKuang', function(data) {
                    if (data.chukuang) {
                        this._onchangeDynamicWindow(player, r)
                    }
                }, this)
            }
        },
        // 播放十周年的出场动画
        actionChuChang: function(player) {
            let r = this.action(player, 'chuchang')
            if (r) {
                player.GongJi = true
                this._onchangeDynamicWindow(player, r)
            }
        },
        actionGongJi: function(player, extraParams) {
            skinSwitch.chukuangWorkerApi.chukuangAction(player, 'GongJi', extraParams)
            // let r = this.action(player, 'GongJi')
            // if (r) {
            //     player.lastPlayTime = new Date().getTime()
            //     this._onchangeDynamicWindow(player, r)
            // }
        },
        debug: function(player, mode) {
            if (!(player.dynamic && player.dynamic.primary)) {
                skinSwitchMessage.show({
                    type: 'error',
                    text: '只有当前角色是动皮时才可以编辑动皮参数',
                    duration: 1500, // 显示时间
                    closeable: false, // 可手动关闭
                })
            }
            if (!player.dynamic.renderer.postMessage) {
                skinSwitchMessage.show({
                    type: 'warning',
                    text: '当前动皮过多',
                    duration: 1500, // 显示时间
                    closeable: false, // 可手动关闭
                })
            }
            // 当前角色位置
            let pp = skinSwitch.getCoordinate(player, true)
            player.dynamic.renderer.postMessage({
                message: "DEBUG",
                id: player.dynamic.id,
                action: "GongJi",
                skinID: player.dynamic.primary.id,
                isDouble: false,
                needHide: false,
                me: true,
                direction: false,
                player: pp,
                mode: mode,
            })
        },
        position: function(player, mode) {
            if (!(player.dynamic && player.dynamic.primary)) {
                skinSwitchMessage.show({
                    type: 'error',
                    text: '只有当前角色是动皮时才可以编辑动皮参数',
                    duration: 1500, // 显示时间
                    closeable: false, // 可手动关闭
                })
            }
            if (!player.dynamic.renderer.postMessage) {
                return
            }
            player.dynamic.renderer.postMessage({
                message: "POSITION",
                id: player.dynamic.id,
                skinID: player.dynamic.primary.id,
                mode: mode,
            })
        },
        adjust: function(player, mode, posData) {
            if (!(player.dynamic && player.dynamic.primary)) {
                skinSwitchMessage.show({
                    type: 'error',
                    text: '只有当前角色是动皮时才可以编辑动皮参数',
                    duration: 1500, // 显示时间
                    closeable: false, // 可手动关闭
                })
            }
            if (!player.dynamic.renderer.postMessage) {
                skinSwitchMessage.show({
                    type: 'warning',
                    text: '当前动皮过多',
                    duration: 1500, // 显示时间
                    closeable: false, // 可手动关闭
                })
            }
            player.dynamic.renderer.postMessage({
                message: "ADJUST",
                id: player.dynamic.id,
                skinID: player.dynamic.primary.id,
                mode: mode,
                xyPos: posData.xyPos,
                x: posData.x,
                y: posData.y,
                scale: posData.scale,
                angle: posData.angle
            })
            if (mode === 'chukuang') {
                skinSwitch.chukuangWorkerApi.adjust(player, posData, 'GongJi')
            } else if (mode === 'chuchang') {
                skinSwitch.chukuangWorkerApi.adjust(player, posData, 'chuchang')
            } else if (mode === 'teshu') {
                skinSwitch.chukuangWorkerApi.adjust(player, posData, 'TeShu')
            }
        },
        show: function(player, skinId) {
            if (!(player.dynamic && (player.dynamic.primary || player.dynamic.deputy))) {
                skinSwitchMessage.show({
                    type: 'error',
                    text: '只有当前角色是动皮时才可以编辑动皮参数',
                    duration: 1500, // 显示时间
                    closeable: false, // 可手动关闭
                })
            }
            if (!player.dynamic.renderer.postMessage) {
                skinSwitchMessage.show({
                    type: 'warning',
                    text: '当前动皮过多',
                    duration: 1500, // 显示时间
                    closeable: false, // 可手动关闭
                })
            }
            player.dynamic.renderer.postMessage({
                message: 'SHOW',
                id: player.dynamic.id,
                skinID: skinId
            });
        },
        /**
         player: 当前动皮角色
         mode: 当前编辑的模式
         posData: {x: [0, 0.5], y: [0, 0.5], scale: 1, angle: 25}
         */
        resizePos: function(player, mode, posData) {
            if (!(player.dynamic && player.dynamic.primary)) {
                skinSwitchMessage.show({
                    type: 'error',
                    text: '只有当前角色是动皮时才可以编辑动皮参数',
                    duration: 1500, // 显示时间
                    closeable: false, // 可手动关闭
                })
            }
            if (!player.dynamic.renderer.postMessage) {
                skinSwitchMessage.show({
                    type: 'warning',
                    text: '当前动皮过多',
                    duration: 1500, // 显示时间
                    closeable: false, // 可手动关闭
                })
            }
            player.dynamic.renderer.postMessage({
                message: "RESIZE",
                id: player.dynamic.id,
                skinID: player.dynamic.primary.id,
                mode: mode,
                ...posData
            })
            if (mode === 'chukuang') {
                skinSwitch.chukuangWorkerApi.adjust(player, posData, 'GongJi')
            } else if (mode === 'chuchang') {
                skinSwitch.chukuangWorkerApi.adjust(player, posData, 'chuchang')
            } else if (mode === 'teshu') {
                skinSwitch.chukuangWorkerApi.adjust(player, posData, 'TeShu')
            }
        },
        getNodeInfo: function(player) {
            if (!(player.dynamic && player.dynamic.primary)) {
                skinSwitchMessage.show({
                    type: 'error',
                    text: '只有当前角色是动皮时才可以编辑动皮参数',
                    duration: 1500, // 显示时间
                    closeable: false, // 可手动关闭
                })
            }
            if (!player.dynamic.renderer.postMessage) {
                skinSwitchMessage.show({
                    type: 'warning',
                    text: '当前动皮过多',
                    duration: 1500, // 显示时间
                    closeable: false, // 可手动关闭
                })
            }
            player.dynamic.renderer.postMessage({
                message: "GET_NODE_INFO",
                id: player.dynamic.id,
                skinID: player.dynamic.primary.id,
            })
        },

        startPlay: function(player, data) {
            if (!player.dynamic) return
            skinSwitch.rendererOnMessage.addListener(player, 'logMessage', function(data) {
                console.log('dyWorker', data)
            })

            player.dynamic.renderer.postMessage({
                message: 'StartPlay',
                data: data,
            })
            skinSwitch.rendererOnMessage.addListener(player, 'playSkinEnd', function() {
                let img = player.$dynamicWrap.style.backgroundImage
                // 取消原来设置的默认动皮
                if (img.endsWith('card.png")')) {
                    player.$dynamicWrap.style.backgroundImage = ''
                }
            })
        },
        changeSkelSkin: function(player, newSkinName, isPrimary) {
            if (!player.dynamic) return
            let avatar = isPrimary ? player.dynamic.primary : player.dynamic.deputy
            if (!avatar) return

            player.dynamic.renderer.postMessage({
                message: 'changeSkelSkin',
                id: player.dynamic.id,
                skinId: avatar.id,
                skinName: newSkinName,
            })
        }
    },
    chukuangWorkerApi: {
        create: function() {
            let canvas = document.createElement('canvas')
            canvas.className = 'chukuang-canvas'
            canvas.style = `position: fixed; left: 0px; top: 0px; pointer-events:none; width:100%;height:100%;`
            // canvas.height = decadeUI.get.bodySize().height
            // canvas.width = decadeUI.get.bodySize().width
            canvas.height = decadeUI.get.bodySize().height
            canvas.width = decadeUI.get.bodySize().width
            let div = ui.create.div('.chukuang-canvas-wraper', document.body)
            div.appendChild(canvas)
            div.id = 'chukuang-canvas-wraper'
            canvas.id = 'chukuang-canvas'
            // 监听屏幕大小变化, 重新更新canvas大小
            if (self.ResizeObserver) {
                let ro = new ResizeObserver(entries => {
                    for (let entry of entries) {
                        if (skinSwitch.chukuangWorker) {
                            const cr = entry.contentRect
                            skinSwitch.chukuangWorker.postMessage({
                                message: 'UPDATE',
                                width: cr.width,
                                height: cr.height,
                            })
                        }
                    }
                });
                ro.observe(document.body);
            }


            let offsetCanvas = canvas.transferControlToOffscreen();

            // worker与主线程的通信方式, 这里是发起一个创建动态皮肤的请求
            skinSwitch.chukuangWorker.postMessage({
                message: 'CREATE',
                canvas: offsetCanvas,
                pathPrefix: '../十周年UI/assets/dynamic/',
                isMobile: skinSwitch.isMobile(),
                dpr: Math.max(window.devicePixelRatio * (window.documentZoom ? window.documentZoom : 1), 1),
                isAttackFlipX: lib.config[skinSwitch.configKey.isAttackFlipX]
            }, [offsetCanvas]);

        },
        // 传入动皮参数, 预加载骨骼数据
        preLoad: function(id, skinId, skinPlayer) {
            skinSwitch.chukuangWorker.postMessage({
                message: 'PRELOAD',
                player: skinPlayer,
                id: id,
                skinId: skinId
            })
        },
        action: function(player, action) {
            let res = skinSwitch.dynamic.checkCanBeAction(player)
            let pp = skinSwitch.getCoordinate(player, true)
            let me = player === game.me
            if (res && res.dynamic) {
                if (!player.dynamic.renderer.postMessage) {
                    skinSwitchMessage.show({
                        type: 'warning',
                        text: '当前动皮过多',
                        duration: 1500, // 显示时间
                        closeable: false, // 可手动关闭
                    })
                    // 尝试清除千幻对应的特效
                    clearInterval(_status.texiaoTimer);
                    clearTimeout(_status.texiaoTimer2);
                    return
                }
                skinSwitch.chukuangWorkerInit()
                skinSwitch.chukuangWorker.postMessage({
                    message: 'ACTION',
                    id: player.dynamic.id,
                    action: action,
                    skinId: res.dynamic.id,
                    isDouble: res.isDouble,
                    deputy: res.deputy,
                    needHide: res.needHide,
                    me: me,
                    direction: me ? false : skinSwitch.getDirection(player),
                    player: pp,
                    selfPhase: _status.currentPhase === player // 是否是自己的回合
                })
            } else {
                player.GongJi = false
            }
            return res
        },
        chukuangAction: function(player, action, extraParams) {
            let dynamic = player.dynamic
            if (!dynamic || (!dynamic.primary && !dynamic.deputy)) {
                return
            }
            skinSwitch.chukuangWorkerInit()
            // 添加如果当前是国战模式隐藏状态下, 不允许出框
            skinSwitch.chukuangWorker.postMessage({
                message: 'isChuKuang',
                id: dynamic.id,
                primarySkinId: (!player.isUnseen || !player.isUnseen(0)) && dynamic.primary && dynamic.primary.id,
                deputySkinId: (!player.isUnseen || !player.isUnseen(1)) && dynamic.deputy && dynamic.deputy.id,
                action: action,
                extraParams: extraParams, // 表示需要更新出框的播放效果
            })
        },
        adjust: function(player, posData, action) {
            skinSwitch.chukuangWorkerInit()
            skinSwitch.chukuangWorker.postMessage({
                message: "ADJUST",
                id: player.dynamic.id,
                skinId: player.dynamic.primary.id,
                action: action, // 添加action参数
                xyPos: posData.xyPos,
                x: posData.x,
                y: posData.y,
                scale: posData.scale,
                angle: posData.angle
            })
        },
        // 播放特效
        playEffect: function(sprite, position) {
            skinSwitch.chukuangWorkerInit()
            if (position && position.parent) {
                position.parent = {
                    boundRect: position.parent.getBoundingClientRect(),
                    bodySize: {
                        bodyWidth: decadeUI.get.bodySize().width,
                        bodyHeight: decadeUI.get.bodySize().height
                    }
                }
            }
            skinSwitch.chukuangWorker.postMessage({
                message: "PLAY_EFFECT",
                sprite,
                position: position,
            })
        },
        // 提前加载资源, 防止突然换肤卡顿
        loadResources: function(players, skels) {
            skinSwitch.chukuangWorkerInit()
            skinSwitch.chukuangWorker.postMessage({
                message: "LOAD_RESOURCES",
                players, // 角色参数
                skels, // 普通骨骼
            })
        }
    },
    chukuangWorkerOnMessage: {
        init: function() {
            skinSwitch.chukuangWorker.onmessage = e => {
                let data = e.data
                switch (data.message) {
                    case "chukuangPrepare":
                        this.chukuangStart(data)
                        break
                    case "recoverDaiJi":
                        this.recoverDaiJi(data)
                        break
                    case 'noActionChuKuang':
                        this.noActionChuKuang(data)
                        break
                }
            }
        },
        getPlayerById: function(id, isQhlx) {
            for (let p of game.players) {
                if (p.dynamic && p.dynamic.id === id) {
                    return p
                }
            }
            // 千幻雷修的手杀大屏预览
            let p = document.getElementById('mainView')
            // 尝试查找手杀大屏的node
            if (p) {
                let _canvas = p.getElementsByClassName('animation-player')
                if (_canvas.length) {
                    return _canvas[0].parentNode.parentNode
                }

            }
            // 查找十周年样式的出框样式
            return null
        },
        chukuangStart: function(data) {
            // 如果当前不是自己回合, 特殊动作, 不出框
            // 根据返回的data, 查出当前属于哪个player
            let player = this.getPlayerById(data.id, data.qhlxBigAvatar)
            if (!player || !player.dynamic) return
            let dynamic = player.dynamic
            let avatar = data.isPrimary ? dynamic.primary : dynamic.deputy
            if (!avatar) {
                return
            }
            if (_status.currentPhase !== player && data.action === 'TeShu' && !avatar.player.shizhounian) {
                return
            }
            player.dynamic.renderer.postMessage({
                message: 'hideAllNode',
                id: dynamic.id,
                isPrimary: data.isPrimary,
                skinId: data.skinId
            })
            skinSwitch.rendererOnMessage.addListener(player, 'hideAllNodeEnd', function() {
                let pp = skinSwitch.getCoordinate(player, true)
                let me = player === game.me
                skinSwitch.chukuangWorker.postMessage({
                    id: data.id,
                    skinId: data.skinId,
                    message: 'chukuangStart',
                    action: data.action,
                    me: me,
                    direction: me ? false : skinSwitch.getDirection(player),
                    player: pp,
                })
                // 标记为出框状态
                player.chukuangState = {
                    status: true,
                    action: data.action
                }

                if (data.action === 'GongJi' || data.action === 'TeShu') {
                    // 音效默认寻找与待机动作同名的音效
                    let playName = avatar.player.name
                    // 暂时不区分不同出框攻击的音效.
                    // 开始播放音效, 音效名等同
                    // 优先播放十周年同名文件夹下同名的音效文件
                    let path = 'extension/十周年UI/assets/dynamic/' + playName + '.mp3'
                    skinSwitch.qhly_checkFileExist(path, exists => {
                        if (exists) {
                            game.playAudio("..", path)
                        } else {
                            game.playAudio("..", "extension", "千幻聆音/audio/effect", playName + ".mp3")
                        }
                    })
                }
                if (data.action === 'GongJi') {
                    // 音效默认寻找与待机动作同名的音效
                    let playName = avatar.player.name
                    // 暂时不区分不同出框攻击的音效.
                    // 开始播放音效, 音效名等同
                    // 优先播放十周年同名文件夹下同名的音效文件
                    let path = 'extension/十周年UI/assets/dynamic/' + playName + '_1.mp3'
                    skinSwitch.qhly_checkFileExist(path, exists => {
                        if (exists) {
                            game.playAudio("..", path)
                        } else {
                            game.playAudio("..", "extension", "千幻聆音/audio/effect", playName + "_1.mp3")
                        }
                    })
                }
                if (data.action === 'TeShu') {
                    // 音效默认寻找与待机动作同名的音效
                    let playName = avatar.player.name
                    // 暂时不区分不同出框攻击的音效.
                    // 开始播放音效, 音效名等同
                    // 优先播放十周年同名文件夹下同名的音效文件
                    let path = 'extension/十周年UI/assets/dynamic/' + playName + '_2.mp3'
                    skinSwitch.qhly_checkFileExist(path, exists => {
                        if (exists) {
                            game.playAudio("..", path)
                        } else {
                            game.playAudio("..", "extension", "千幻聆音/audio/effect", playName + "_2.mp3")
                        }
                    })
                }

            })

        },
        recoverDaiJi: function(data) {
            let player = this.getPlayerById(data.id, data.qhlxBigAvatar)
            if (!player || !player.dynamic) return
            let dynamic = player.dynamic
            player.chukuangState = {
                status: false,
            }
            if (!dynamic.primary && !dynamic.deputy) {
                return
            }
            player.dynamic.renderer.postMessage({
                message: 'recoverDaiJi',
                id: data.id,
                skinId: data.skinId,
            })
            player.GongJi = false
        },
        // 当没有出框的做法
        noActionChuKuang: function(data) {
            // 请求动皮worker查看是否有未出框的动作
            let player = this.getPlayerById(data.id, data.qhlxBigAvatar)
            if (!player || !player.dynamic) return
            let dynamic = player.dynamic
            if (!dynamic.primary && !dynamic.deputy) {
                return
            }
            if (data.action === 'GongJi') {
                // 如果参数直接指明包含不出框的话, 那么直接请求待机worker
                if (dynamic.primary) {
                    let playerP = dynamic.primary.player;
                    if (playerP.gongji && playerP.gongji.ck === false) {
                        return skinSwitch.postMsgApi.action(player, playerP.gongji.action, dynamic.primary)
                    }
                }
                if (dynamic.deputy) {
                    let playerP = dynamic.deputy.player
                    if (playerP.gongji && playerP.gongji.ck === false) {
                        return skinSwitch.postMsgApi.action(player, playerP.gongji.action, dynamic.deputy)
                    }
                }
            }
            if (data.action === 'TeShu') {
                skinSwitch.postMsgApi.actionTeShu(player)
            }
        },
        debugChuKuang: function(data) {
            let player = this.getPlayerById(data.id, data.qhlxBigAvatar)
            if (!player || !player.dynamic) return
            let dynamic = player.dynamic
            let avatar = data.isPrimary ? dynamic.primary : dynamic.deputy
            if (!avatar) {
                return
            }
            player.dynamic.renderer.postMessage({
                message: 'hideAllNode',
                id: dynamic.id,
            })
            // 将原来的置空
            skinSwitch.rendererOnMessage.addListener(player, 'hideAllNodeEnd', function() {})
        }

    },
    chukuangWorker: null, // 管理出框的worker
    chukuangWorkerInit: function() {
        if (!skinSwitch.chukuangWorker) {
            skinSwitch.chukuangWorker = new Worker(skinSwitch.url + 'chukuangWorker.js')
            skinSwitch.chukuangWorkerApi.create()
            skinSwitch.chukuangWorkerOnMessage.init()
        }
    },
    // 停止动皮后的一些收尾操作
    cleanupAfterStopDynamic: function(player, primary, deputy) {
        // 清除某个角色的语音映射
        let clearAudioMap = (name) => {
            if (skinSwitch.avatarAudioSkinMap) {
                let avatarKeys = skinSwitch.avatarAudioSkinMap[name]
                if (avatarKeys) {
                    for (let key in avatarKeys) {
                        delete skinSwitch.audioMap[key]
                    }
                    delete skinSwitch.avatarAudioSkinMap[name]
                }
                console.log('skinSwitch.audioMap', skinSwitch.audioMap, 'skinSwitch.avatarAudioSkinMap', skinSwitch.avatarAudioSkinMap)
            }
        }
        if (primary && player.name1) {
            clearAudioMap(player.name1)
        }
        if (deputy && player.name2) {
            clearAudioMap(player.name2)
        }
    },

    // 强制重新加载角色皮肤的语音 - 用于解决觉醒掉血技能切换皮肤后语音不更新的问题
    reloadAudioForSkin: function(player, isPrimary, audioConfig) {
        // 确保player和dynamic还存在
        if (!player || !player.isAlive() || !player.dynamic) {
            return;
        }

        // 获取当前角色名称和ID
        let name = isPrimary ? player.name1 : player.name2;
        if (!name) return;

        let id = player.dynamic.id;
        let skinId = isPrimary ?
            (player.dynamic.primary ? player.dynamic.primary.id : null) :
            (player.dynamic.deputy ? player.dynamic.deputy.id : null);

        if (!skinId) return;

        console.log('开始重新加载语音:', name, id, skinId, '当前位置:', isPrimary ? '主将' : '副将');

        // 更彻底地清除语音映射 - 清除所有相关的key
        this.clearAllAudioMappings(name, id, skinId);

        // 如果没有提供audioConfig，尝试从千幻聆音获取
        if (!audioConfig) {
            // 尝试从当前动皮获取角色名和皮肤名
            let currentSkin = isPrimary ? player.dynamic.primary : player.dynamic.deputy;
            if (currentSkin && currentSkin.name) {
                let [characterName, skinName] = currentSkin.name.split('/');
                if (characterName && skinName) {
                    audioConfig = skinSwitch.getQianhuanAudioConfig(characterName, skinName);
                    if (audioConfig) {
                        console.log('觉醒切换皮肤 - 从千幻聆音获取语音配置:', characterName, skinName, audioConfig);
                    }
                }
            }
        }

        // 重新初始化语音系统
        if (!audioConfig) {
            console.warn('觉醒切换皮肤 - 无法获取音频配置，跳过语音重新加载');
            return;
        }

        let skillPath = audioConfig.skill;
        let cardPath = audioConfig.card;
        if (!skillPath && !cardPath) return;

        let rootPath = skinSwitch.dcdPath + '/assets/dynamic/';

        // 如果是千幻语音路径，则使用千幻的根路径
        if (skillPath && skillPath.includes('sanguoaudio/')) {
            rootPath = lib.assetURL + 'extension/千幻聆音/';
        }

        // 重新创建语音映射
        if (!skinSwitch.audioMap) {
            skinSwitch.audioMap = {};
        }
        if (!skinSwitch.avatarAudioSkinMap) {
            skinSwitch.avatarAudioSkinMap = {};
        }
        skinSwitch.avatarAudioSkinMap[name] = {};

        // 处理文件扩展名的辅助函数
        let qhly_earse_ext = function(path) {
            let foundDot = path.lastIndexOf('.');
            if (foundDot < 0) return path;
            return path.slice(0, foundDot);
        };

        // 强制重建语音映射
        console.log('开始重建语音映射...');
        this.rebuildAudioMappings(name, id, skinId, skillPath, cardPath, rootPath, qhly_earse_ext);

        // 确保音频系统初始化
        this.ensureAudioSystemInitialized(id, skinId);

        console.log('已重新初始化语音系统', name, id, skinId);
    },

    // 新增：更彻底地清除所有相关的语音映射
    clearAllAudioMappings: function(name, id, skinId) {
        console.log('清除所有语音映射:', name, id, skinId);

        // 清除avatarAudioSkinMap中的映射
        if (skinSwitch.avatarAudioSkinMap && skinSwitch.avatarAudioSkinMap[name]) {
            for (let key in skinSwitch.avatarAudioSkinMap[name]) {
                delete skinSwitch.audioMap[key];
            }
            delete skinSwitch.avatarAudioSkinMap[name];
        }

        // 清除所有可能的语音key模式
        const keysToRemove = [];
        for (let key in skinSwitch.audioMap) {
            // 清除以下模式的key:
            // - skill/技能名
            // - die/角色名 
            // - card/id/skinId/卡牌名
            // - effect/id/skinId/victory
            if (key.startsWith('skill/') ||
                key.startsWith('die/' + name) ||
                key.includes('/' + id + '/' + skinId + '/') ||
                key.includes('/effect/' + id + '/' + skinId)) {
                keysToRemove.push(key);
            }
        }

        // 删除找到的所有相关key
        keysToRemove.forEach(key => {
            console.log('删除旧语音映射:', key);
            delete skinSwitch.audioMap[key];
        });

        console.log('清除了', keysToRemove.length, '个旧的语音映射');
    },

    // 新增：强制重建语音映射
    rebuildAudioMappings: function(name, id, skinId, skillPath, cardPath, rootPath, qhly_earse_ext) {
        console.log('重建语音映射:', {
            name,
            id,
            skinId,
            skillPath,
            cardPath,
            rootPath
        });

        // 确保映射表存在
        if (!skinSwitch.audioMap) {
            skinSwitch.audioMap = {};
        }
        if (!skinSwitch.avatarAudioSkinMap) {
            skinSwitch.avatarAudioSkinMap = {};
        }
        if (!skinSwitch.avatarAudioSkinMap[name]) {
            skinSwitch.avatarAudioSkinMap[name] = {};
        }

        // 立即添加标记，表示这个角色正在使用新的语音映射
        skinSwitch.avatarAudioSkinMap[name]['_rebuilding'] = true;

        // 重建技能语音映射
        if (skillPath) {
            this.buildSkillAudioMapping(name, id, skinId, skillPath, rootPath, qhly_earse_ext);
        }

        // 重建卡牌语音映射
        if (cardPath) {
            this.buildCardAudioMapping(name, id, skinId, cardPath, rootPath, qhly_earse_ext);
        }

        // 强制刷新语音系统缓存
        setTimeout(() => {
            this.refreshAudioSystemCache(name, id, skinId);
        }, 100);
    },

    // 新增：构建技能语音映射
    buildSkillAudioMapping: function(name, id, skinId, skillPath, rootPath, qhly_earse_ext) {
        // 如果是千幻语音路径，需要特殊处理根路径
        let skillRootPath = rootPath;
        if (skillPath.includes('sanguoaudio/')) {
            skillRootPath = lib.assetURL + 'extension/千幻聆音/';
        }

        let path = skillRootPath + skillPath;
        console.log('构建技能语音映射:', path);

        // 使用安全的文件列表获取
        this.safeGetFileList(path, (folds, files) => {
            let mappingCount = 0;
            for (let file of files) {
                file = qhly_earse_ext(file);
                let key;
                let audioPath = '../' + path + '/' + file;

                if (file === name) {
                    key = 'die/' + file;
                } else if (file === 'victory' || file === 'win') {
                    key = 'effect/' + id + '/' + skinId + '/' + 'victory';
                } else {
                    key = 'skill/' + file;
                }

                // 强制覆盖旧的映射
                skinSwitch.audioMap[key] = audioPath;
                skinSwitch.avatarAudioSkinMap[name][key] = audioPath;
                mappingCount++;

                console.log('添加技能语音映射:', key, '->', audioPath);
            }
            console.log('技能语音映射构建完成，共', mappingCount, '个文件');
        }, (error) => {
            console.warn('技能语音目录访问失败:', skillPath, error);
        });
    },

    // 新增：构建卡牌语音映射
    buildCardAudioMapping: function(name, id, skinId, cardPath, rootPath, qhly_earse_ext) {
        // 如果是千幻卡牌语音路径，也使用千幻的根路径
        let cardRootPath = rootPath;
        if (cardPath.includes('sanguoaudio/')) {
            cardRootPath = lib.assetURL + 'extension/千幻聆音/';
        }

        let path = cardRootPath + cardPath;
        console.log('构建卡牌语音映射:', path);

        // 使用安全的文件列表获取
        this.safeGetFileList(path, (folds, files) => {
            let mappingCount = 0;
            for (let file of files) {
                file = qhly_earse_ext(file);
                let key = 'card/' + id + '/' + skinId + '/' + file;
                let audioPath = '../' + path + '/' + file;

                // 强制覆盖旧的映射
                skinSwitch.audioMap[key] = audioPath;
                skinSwitch.avatarAudioSkinMap[name][key] = audioPath;
                mappingCount++;

                console.log('添加卡牌语音映射:', key, '->', audioPath);
            }
            console.log('卡牌语音映射构建完成，共', mappingCount, '个文件');
        }, (error) => {
            console.warn('卡牌语音目录访问失败:', cardPath, error);
        });
    },

    // 新增：刷新语音系统缓存
    refreshAudioSystemCache: function(name, id, skinId) {
        console.log('刷新语音系统缓存:', name, id, skinId);

        // 标记重建完成
        if (skinSwitch.avatarAudioSkinMap && skinSwitch.avatarAudioSkinMap[name]) {
            delete skinSwitch.avatarAudioSkinMap[name]['_rebuilding'];
            skinSwitch.avatarAudioSkinMap[name]['_lastRefresh'] = Date.now();
        }

        // 输出当前的语音映射状态
        console.log('当前语音映射状态:', {
            audioMapSize: Object.keys(skinSwitch.audioMap).length,
            characterMappings: skinSwitch.avatarAudioSkinMap[name] ? Object.keys(skinSwitch.avatarAudioSkinMap[name]).length : 0
        });

        // 强制触发一次音频系统重新初始化
        if (skinSwitch.pfqh_originPlayAudio && skinSwitch.qfqh_originPlaySkillAudio) {
            console.log('语音系统已重新初始化，新的语音映射生效');
        }
    },

    // 安全的getFileList函数，在目录不存在时不会抛出错误
    safeGetFileList: function(path, callback, errorCallback) {
        // 检查路径是否包含千幻语音，如果不存在则不尝试访问
        if (path.includes('千幻聆音/sanguoaudio/')) {
            // 对于千幻语音路径，我们需要更谨慎地处理
            let testPath = path.replace('../', '');
            console.log('尝试访问千幻语音目录:', testPath);
        }

        try {
            game.getFileList(path, function(folds, files) {
                if (files && files.length > 0) {
                    console.log('成功读取语音目录:', path, files.length + '个文件');
                    if (callback) callback(folds, files);
                } else {
                    console.warn('语音目录为空:', path);
                    if (errorCallback) errorCallback('目录为空');
                }
            });
        } catch (e) {
            // 如果是千幻语音目录访问失败，给出更友好的提示
            if (path.includes('千幻聆音/sanguoaudio/')) {
                console.warn('千幻语音目录不存在或无法访问:', path);
                console.warn('请检查千幻聆音扩展是否正确安装，以及是否存在对应的语音文件');
            } else {
                console.warn('语音目录访问失败:', path, e.message);
            }
            if (errorCallback) errorCallback(e);
        }
    },

    // 加载语音文件
    loadAudioFiles: function(name, id, skinId, skillPath, cardPath, rootPath, qhly_earse_ext) {

        // 更新技能语音
        if (skillPath) {
            // 如果是千幻语音路径，需要特殊处理根路径
            let skillRootPath = rootPath;
            if (skillPath.includes('sanguoaudio/')) {
                skillRootPath = lib.assetURL + 'extension/千幻聆音/';
            }

            let path = skillRootPath + skillPath;
            this.safeGetFileList(path, function(folds, files) {
                for (let file of files) {
                    file = qhly_earse_ext(file);
                    let key;
                    if (file === name) {
                        key = 'die/' + file;
                        skinSwitch.audioMap[key] = '../' + path + '/' + file;
                    } else if (file === 'victory' || file === 'win') {
                        key = 'effect/' + id + '/' + skinId + '/' + 'victory';
                        skinSwitch.audioMap[key] = '../' + path + '/' + file;
                    } else {
                        key = 'skill/' + file;
                        skinSwitch.audioMap[key] = '../' + path + '/' + file;
                    }
                    if (skinSwitch.avatarAudioSkinMap[name]) {
                        skinSwitch.avatarAudioSkinMap[name][key] = null;
                    }
                }
                console.log('重新加载语音完成 - 技能语音', name, id, skinId, skillPath);
            }, function(error) {
                console.warn('技能语音目录访问失败:', skillPath, error);
            });
        }

        // 更新卡牌语音
        if (cardPath) {
            // 如果是千幻卡牌语音路径，也使用千幻的根路径
            let cardRootPath = rootPath;
            if (cardPath.includes('sanguoaudio/')) {
                cardRootPath = lib.assetURL + 'extension/千幻聆音/';
            }

            let path = cardRootPath + cardPath;
            this.safeGetFileList(path, function(folds, files) {
                for (let file of files) {
                    // 储存技能映射, 规则与模仿千幻, 与千幻一致
                    file = qhly_earse_ext(file);
                    // 储存动皮相关的id和角色名字
                    let id = player.dynamic.id
                    let skinId = isPrimary ? player.dynamic.primary.id : player.dynamic.deputy.id
                    let key = 'card/' + id + '/' + skinId + '/' + file
                    skinSwitch.audioMap[key] = '../' + path + '/' + file
                    skinSwitch.avatarAudioSkinMap[name][key] = null
                }
                console.log('重新加载语音完成 - 卡牌语音', name, id, skinId, cardPath);
            }, function(error) {
                console.warn('卡牌语音目录访问失败:', cardPath, error);
            });
        }
    },

    // 确保音频系统已初始化
    ensureAudioSystemInitialized: function(id, skinId) {
        // 确保音频系统已经被初始化
        if (!skinSwitch.pfqh_originPlayAudio) {
            skinSwitch.pfqh_originPlayAudio = game.playAudio;
            game.playAudio = function() {
                let string = '';
                let others = [];
                for (let arg of arguments) { //将参数拼接成一个字符串，方便查找映射
                    if (typeof arg == 'string' || typeof arg == 'number') {
                        string = string + "/" + arg;
                    } else {
                        others.push(arg);
                    }
                }

                let replaces = string.split('/');
                let replace = '';

                if (string.startsWith('/skill') && replaces.length === 3) {
                    replace = string.slice(1);
                } else if (string.startsWith('/die') && replaces.length === 3) {
                    replace = string.slice(1);
                } else if (string.startsWith('/effect/win')) {
                    replace = 'effect/' + id + '/' + skinId + '/' + 'victory';
                }

                if (replace.length) {
                    let rp = skinSwitch.audioMap[replace];
                    if (rp) {
                        let args = rp.split("/");
                        args.addArray(others);
                        return skinSwitch.pfqh_originPlayAudio.apply(this, args);
                    }
                }
                return skinSwitch.pfqh_originPlayAudio.apply(this, arguments);
            };
        }

        if (!skinSwitch.qfqh_originPlaySkillAudio) {
            skinSwitch.qfqh_originPlaySkillAudio = game.playSkillAudio;
            game.playSkillAudio = function(name, index) {
                let replaceKey = "skill/" + name;
                if (!index) {
                    index = Math.ceil(Math.random() * 2);
                }
                replaceKey = replaceKey + index;
                let rp = skinSwitch.audioMap[replaceKey];
                if (rp) {
                    let args = rp.split("/");
                    return skinSwitch.pfqh_originPlayAudio.apply(this, args);
                }
                return skinSwitch.qfqh_originPlaySkillAudio.apply(this, arguments);
            };
        }
    },
    chukuangPlayerInit: function(player, isPrimary, playParams) {
        if (!player.dynamic) return

        // 动皮播放开始播放骨骼.  虽然放在这里不是很合适. 为了减少其他扩展添加的扩展. todo, 后面更换
        skinSwitch.rendererOnMessage.addListener(player, 'loadFinish', function(data) {
            skinSwitch.postMsgApi.startPlay(player, data)
        })


        let isPlayer = get.itemtype(player) === 'player'

        // 检查只有当前是player或者是千幻大屏预览才会进行初始化
        if (!(isPlayer || [...player.classList].includes('qh-shousha-big-avatar') || player.getElementsByClassName('qhdynamic-decade-big-wrap').length || player.getElementsByClassName('qhdynamic-big-wrap').length)) {
            return
        }
        if (!isPlayer) {
            playParams.qhlxBigAvatar = true
            // 标明当前的样式是十周年的还是手杀的.
            playParams.isDecade = lib.config.qhly_currentViewSkin === 'decade'
            playParams.divPos = skinSwitch.getCoordinate(player, true)
        }
        let _this = this
        if (!this.transformInitTime) {
            this.transformInitTime = new Date().getTime()
        }
        let initPlayerAudio = () => {
            if (!player.dynamic) {
                return
            }
            if (!player.dynamic.primary && !player.dynamic.deputy) {
                return
            }
            let name = isPrimary ? player.name1 : player.name2
            let id = player.dynamic.id
            let skinId = isPrimary ? player.dynamic.primary.id : player.dynamic.deputy.id

            // 检查是否需要强制更新音频
            let forceUpdate = playParams._needUpdateAudio === true

            // 如果强制更新，先清除现有映射
            if (forceUpdate && skinSwitch.avatarAudioSkinMap && skinSwitch.avatarAudioSkinMap[name]) {
                for (let key in skinSwitch.avatarAudioSkinMap[name]) {
                    delete skinSwitch.audioMap[key]
                    delete skinSwitch.avatarAudioSkinMap[name][key]
                }
            }

            // 检查是否有配置动皮的专属语音, 懒加载替换playAudio语音, 如果有需要专门配置的语音, 那么进行替换, 替换语音的代码参考自千幻聆音1.5 精简版本, 感谢这些无名杀开源扩展作者们的先驱贡献
            if (playParams.audio && isPlayer) {

                let skillPath = playParams.audio.skill
                let cardPath = playParams.audio.card
                let rootPath = skinSwitch.dcdPath + '/assets/dynamic/'

                // 如果是千幻语音路径，则使用千幻的根路径
                if (skillPath && skillPath.includes('sanguoaudio/')) {
                    rootPath = lib.assetURL + 'extension/千幻聆音/'
                }
                if (!skinSwitch.audioMap) {
                    skinSwitch.audioMap = {}
                }
                if (!skinSwitch.avatarAudioSkinMap) {
                    skinSwitch.avatarAudioSkinMap = {}
                }
                skinSwitch.avatarAudioSkinMap[name] = {}
                // 切换皮肤后需要删除原来的语音映射
                //将某个文件路径抹除扩展名。如file.txt -> file
                let qhly_earse_ext = function(path) {
                    let foundDot = path.lastIndexOf('.');
                    if (foundDot < 0) return path;
                    return path.slice(0, foundDot);
                }
                // 获取该文件夹下的所有技能和卡牌语音
                if (skillPath) {
                    let path = rootPath + skillPath
                    game.getFileList(path, function(folds, files) {
                        let name = isPrimary ? player.name1 : player.name2
                        for (let file of files) {
                            // 储存技能映射, 规则与模仿千幻, 与千幻一致
                            file = qhly_earse_ext(file);
                            let key
                            if (file === name) {
                                key = 'die/' + file
                                skinSwitch.audioMap[key] = '../' + path + '/' + file;
                            } else if (file === 'victory' || file === 'win') {
                                key = 'effect/' + id + '/' + skinId + '/' + 'victory'
                                skinSwitch.audioMap[key] = '../' + path + '/' + file;
                            } else {
                                key = 'skill/' + file
                                skinSwitch.audioMap[key] = '../' + path + '/' + file;
                            }
                            skinSwitch.avatarAudioSkinMap[name][key] = null
                        }
                    })
                }

                if (cardPath) {
                    // 如果是千幻卡牌语音路径，也使用千幻的根路径
                    let cardRootPath = rootPath;
                    if (cardPath.includes('sanguoaudio/')) {
                        cardRootPath = lib.assetURL + 'extension/千幻聆音/';
                    }
                    let path = cardRootPath + cardPath
                    game.getFileList(path, function(folds, files) {
                        for (let file of files) {
                            // 储存技能映射, 规则与模仿千幻, 与千幻一致
                            file = qhly_earse_ext(file);
                            // 储存动皮相关的id和角色名字
                            let id = player.dynamic.id
                            let skinId = isPrimary ? player.dynamic.primary.id : player.dynamic.deputy.id
                            let key = 'card/' + id + '/' + skinId + '/' + file
                            skinSwitch.audioMap[key] = '../' + path + '/' + file
                            skinSwitch.avatarAudioSkinMap[name][key] = null
                        }
                    })
                }

                // 添加取消替换语音映射的回调函数.

                if (!this._initAudio) {
                    // if (false) {
                    skinSwitch.pfqh_originPlayAudio = game.playAudio;
                    game.playAudio = function() {
                        let string = '';
                        let others = [];
                        for (let arg of arguments) { //将参数拼接成一个字符串，方便查找映射
                            if (typeof arg == 'string' || typeof arg == 'number') {
                                string = string + "/" + arg;
                            } else {
                                others.push(arg);
                            }
                        }
                        let replaces = string.split('/')
                        let replace = ''

                        const cardEn2Cn = {
                            bingliang: '兵粮寸断',
                            guohe: '过河拆桥',
                            huogong: '火攻',
                            jiedao: '借刀杀人',
                            jiu: '酒',
                            juedou: '决斗',
                            lebu: '乐不思蜀',
                            nanman: '南蛮入侵',
                            sha: '杀',
                            tao: '桃',
                            sha_fire: '火杀',
                            sha_thunder: '雷杀',
                            shan: '闪',
                            shandian: '闪电',
                            shunshou: '顺手牵羊',
                            taoyuan: '桃园结义',
                            tiesuo: '铁索连环',
                            wanjian: '万箭齐发',
                            wugu: '五谷丰登',
                            wuxie: '无懈可击',
                            wuzhong: '无中生有',
                            yiyi: '以逸待劳',
                            yuanjiao: '远交近攻',
                            zhibi: '知彼知己',
                            caomu: '草木皆兵',
                            diaohulishan: '调虎离山',
                            huoshaolianying: '火烧连营',
                            chuqibuyi: '出其不意',
                            shuiyanqijun: '水淹七军',
                            binglinchengxiax: '兵临城下',
                            lulitongxin: '戮力同心',
                            lianjunshengyan: '联军盛宴',
                            sha_ice: '冰杀',
                            dongzhuxianji: '洞烛先机',
                        }

                        if (string.startsWith('/card') && replaces.length === 4) {
                            let cardName = replaces[3]
                            // 检索待播放队列是否进行替换
                            if (skinSwitch.audioPlayQueue) {
                                for (let i = 0; i < skinSwitch.audioPlayQueue.length; i++) {
                                    if (new Date().getTime() - skinSwitch.audioPlayQueue[i].time > 2000) {
                                        // 删除超时未播放的或不存在的语音
                                        skinSwitch.audioPlayQueue.splice(i, 1)
                                        i--
                                        continue
                                    }
                                    let au = skinSwitch.audioPlayQueue[i]
                                    if (au.card === cardName) {
                                        replace = 'card/' + au.id + '/' + au.skinId + '/' + cardEn2Cn[cardName]
                                        if (skinSwitch.audioMap[replace]) {
                                            skinSwitch.audioPlayQueue.splice(i, 1)
                                            break
                                        } else {
                                            replace = 'card/' + au.id + '/' + au.skinId + '/' + cardName
                                            if (skinSwitch.audioMap[replace]) {
                                                skinSwitch.audioPlayQueue.splice(i, 1)
                                                break
                                            }
                                        }
                                    }
                                }
                            }
                        } else if (string.startsWith('/skill') && replaces.length === 3) {
                            replace = string.slice(1)
                        } else if (string.startsWith('/die') && replaces.length === 3) {
                            // 检索待播放队列是否进行替换
                            replace = string.slice(1)
                        } else if (string.startsWith('/effect/win')) {
                            replace = 'effect/' + id + '/' + skinId + '/' + 'victory'
                        }
                        console.log('string...', string)
                        if (replace.length) {
                            let rp = skinSwitch.audioMap[replace];
                            if (rp) {
                                //如果存在映射，用映射的路径替换原有的路径，并调用原来的音频播放函数，以达到替换配音的效果。
                                let args = rp.split("/");
                                args.addArray(others);
                                return skinSwitch.pfqh_originPlayAudio.apply(this, args);
                            }
                        }
                        return skinSwitch.pfqh_originPlayAudio.apply(this, arguments);
                    };

                    skinSwitch.qfqh_originPlaySkillAudio = game.playSkillAudio
                    game.playSkillAudio = function(name, index) {
                        let replaceKey = "skill/" + name;
                        if (!index) {
                            index = Math.ceil(Math.random() * 2);
                        }
                        replaceKey = replaceKey + index;
                        let rp = skinSwitch.audioMap[replaceKey]
                        if (rp) {
                            let args = rp.split("/");
                            return skinSwitch.pfqh_originPlayAudio.apply(this, args);
                        }
                        return skinSwitch.qfqh_originPlaySkillAudio.apply(this, arguments);
                    };

                    this._initAudio = true
                }

            }

            // 检查一下是否有变身的骨骼, 提前加载, 防止突然更换卡顿现象
            if (isPlayer && playParams.special && playParams.special.condition) {
                let dskins = decadeUI.dynamicSkin
                let newSkelLike = []
                let newTransformEffects = []
                let getNewSkel = (transform) => {
                    let trans = playParams.special[transform]
                    // 播放转换的骨骼
                    let newName = trans.name
                    if (newName && newName !== playParams.name) {
                        // 分割名字, 获取骨骼, 与当前角色的骨骼的名字比较,是否是同名
                        let [key, skinName] = newName.split('/')
                        let dInfo = key && skinName && dskins[key] && dskins[key][skinName]
                        if (dInfo) {
                            newSkelLike.push(dInfo)
                            let huanfuEff = {
                                name: '../../../千幻聆音/effects/transform/default',
                                scale: 0.7,
                                speed: 0.6,
                                delay: 0.1, // 默认设置的延迟是0.2秒
                            }
                            let huanfuEffect = trans.effect
                            const changeEffects = skinSwitch.effects.transformEffects
                            if (huanfuEffect) {
                                if (typeof huanfuEffect === 'string') {
                                    if (huanfuEffect in changeEffects) {
                                        huanfuEffect = changeEffects[huanfuEffect]
                                    } else {
                                        huanfuEffect = {
                                            name: huanfuEffect
                                        };
                                    }
                                }
                                huanfuEff = Object.assign(huanfuEff, huanfuEffect)
                                huanfuEff.name = '../../../千幻聆音/effects/transform/' + huanfuEffect.name

                                newTransformEffects.push(huanfuEff)
                            }
                        }

                    }
                }

                for (let cond of Object.values(playParams.special.condition)) {
                    let transform = cond.transform
                    if (typeof transform === 'string') {
                        getNewSkel(transform)
                    } else if (Array.isArray(transform)) {
                        for (let t of transform) {
                            getNewSkel(t)
                        }
                    }

                }
                let basic = 6000
                if (new Date().getTime() - _this.transformInitTime < 2000) {
                    _this.transformInitTime = _this.transformInitTime + 2000
                    basic = 6000 + _this.transformInitTime - new Date().getTime()
                } else {
                    _this.transformInitTime = new Date().getTime()
                }
                setTimeout(() => {
                    if (newSkelLike.length) {
                        skinSwitch.chukuangWorkerApi.loadResources(newSkelLike, newTransformEffects)
                        // 传递到worker进行预加载
                        player.dynamic.renderer.postMessage({
                            message: 'LOAD_RESOURCES',
                            id: player.dynamic.id,
                            players: newSkelLike,
                        })

                    }
                }, basic)
            }
        }


        // 更换皮肤后, 删除原来保存的原始动皮参数
        if (isPlayer && player.originSkin && !playParams._transform) {
            delete player.originSkin
        }

        if (isPlayer) {
            let key = isPrimary ? 'damagePrimaryTransform' : 'damageDeputyTransform'
            if (player[key]) delete player[key]

        }
        if (!isPlayer && player.originSkin2 && !playParams._transform) {
            delete player.originSkin2;
        }

        // 检查参数同目录下是否包含静态皮肤, 如果包含的话, 同时给角色设置静皮为对应的皮肤
        let checkChangeSkin = () => {
            let skinPath = playParams.name
            let lastIdx = skinPath.lastIndexOf('/')
            let foldPath
            if (lastIdx === -1) {
                foldPath = ''
            } else {
                foldPath = skinPath.slice(0, lastIdx)
            }
            let path = skinSwitch.dcdPath + '/assets/dynamic/' + foldPath + '/' + playParams.skinName + '.jpg'
            // 如果该皮肤存在, 那么设置该皮肤为静态皮肤
            skinSwitch.qhly_checkFileExist(path, exists => {
                if (exists) {
                    let avatar = player.getElementsByClassName((isPrimary ? 'primary' : 'deputy') + '-avatar')
                    if (avatar.length) {
                        avatar[0].style.backgroundImage = 'url("' + lib.assetURL + path + '")'
                    }
                }
            })
        }
        // 将替换皮肤增加到当前角色的inits里面
        if (isPlayer) {
            if (!player._inits) {
                player._inits = []
            }
            // 查看角色初始化, 发现有预留这个钩子函数等待角色初始化好毕完毕 做一些额外的初始化操作
            player._inits.push(function() {
                checkChangeSkin()
                initPlayerAudio()
            })
        }
        if (isPlayer && player.name1) {
            initPlayerAudio()
            checkChangeSkin()

            // 检查是否需要强制重新加载语音（觉醒掉血技能专用）
            if (playParams._needUpdateAudio) {
                setTimeout(() => {
                    // 传递audio配置，如果没有则reloadAudioForSkin会尝试从千幻获取
                    skinSwitch.reloadAudioForSkin(player, isPrimary, playParams.audio);
                }, 500);
            }
        }

        skinSwitch.chukuangWorkerInit()
        if (!isPrimary && player.dynamic.deputy) {
            skinSwitch.chukuangWorkerApi.preLoad(player.dynamic.id, player.dynamic.deputy.id, playParams)
        } else if (isPrimary && player.dynamic.primary) {
            skinSwitch.chukuangWorkerApi.preLoad(player.dynamic.id, player.dynamic.primary.id, playParams)
        }
    },

    // 特殊特效预定义的
    effects: {
        transformEffects: {
            default: {
                scale: 0.7,
                speed: 0.6,
                delay: 0.1, // 默认设置的延迟是0.1秒
            },
            posui: {
                scale: 0.6,
                speed: 1,
                name: 'posui',
                json: true,
                delay: 0.5, // 控制多少秒后开始播放骨骼动画
            },
            jinka: {
                scale: 0.6,
                speed: 1,
                name: 'jinka',
                json: true,
                delay: 0.5, // 控制多少秒后开始播放骨骼动画
            },
            qiancheng: {
                scale: 0.6,
                speed: 1,
                name: 'qiancheng',
                json: true,
                delay: 0.5, // 控制多少秒后开始播放骨骼动画
            },
            shaohui: {
                scale: 0.6,
                speed: 1,
                x: [0, 0.6],
                y: [0, 0.5],
                name: 'shaohui',
                json: true,
                delay: 0.5, // 控制多少秒后开始播放骨骼动画
            },
        }
    },
    previewDynamic: function() {

        let background = ui.create.div('.pfqh-preview-background', ui.window);

        let previewWindow = ui.create.div('.previewWindow', background)
        previewWindow.id = 'previewWindowDiv'
        previewWindow.style = `background: rgb(60,60,60);z-index: 3000;position: fixed; width: 100%; height: 100%;`
        previewWindow.innerHTML = `
                    <style>
                        a,a:link,a:visited,a:hover,a:active{
                            text-decoration: none;
                            color:inherit;
                        }
                        #preview-canvas { position: absolute; width: 100% ;height: 100%; }
                        #previewSpineDom span {display: inline-block; margin-left: 20px}
                        input[type='range'] {
                        -webkit-appearance: none;
                        width: 180px;
                        border-radius: 10px; /*这个属性设置使填充进度条时的图形为圆角*/
                      }
                      input[type='range']::-webkit-slider-thumb {
                        -webkit-appearance: none;
                      }
                      input[type='range']::-webkit-slider-runnable-track {
                        height: 8px;
                        border-radius: 10px; /*将轨道设为圆角的*/
                        background-color: #d6a63c;
                      }
                      input[type='range']:focus {
                        outline: none;
                      }
                
                      input[type='range']::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        height: 24px;
                        width: 24px;
                        margin-top: -8px; /*使滑块超出轨道部分的偏移量相等*/
                        background: #ffffff;
                        border-radius: 50%;
                        cursor: pointer;
                      }
                
                      input[type='range']:focus::-webkit-slider-thumb {
                        background: #d6a63c;
                        /* background-image: url('https://p3-passport.byteacctimg.com/img/user-avatar/fc8114566fc29a28d2d49e1964872775~300x300.image'),
                          -webkit-gradient(linear, left top, left bottom, color-stop(0, #fefefe), color-stop(0.49, #dddddd), color-stop(0.51, #d1d1d1), color-stop(1, #a1a1a1));
                        background-size: 20px;
                        background-repeat: no-repeat;
                        background-position: 50%; */
                        box-shadow: 0 0 0 3px #fff, 0 0 0 6px #d6a63c;
                      }
                
                      input[type='range']::-webkit-slider-thumb:hover {
                        background: #d6a63c;
                      }
                      input[type='range']:active::-webkit-slider-thumb {
                        background: #d6a63c;
                      }
                      
                       #previewSpineDom select{
                        margin-bottom: 8px;
                      }
                      
                      #previewSpineDom select{
                        height: 26px;
                      }
                      
                      .closeBtn {
                        border-radius: 3px;
                        color: white;
                        margin: 0;
                        line-height: 1;
                        padding: 0 14px;
                        height: 34px;
                        border: none;
                        display: inline-flex;
                        flex-wrap: nowrap;
                        flex-shrink: 0;
                        align-items: center;
                        justify-content: center;
                        user-select: none;
                        text-align: center;
                        cursor: pointer;
                        text-decoration: none;
                        white-space: nowrap;
                        background-color: #18a058;  
                      }
                    
                    .wp-s-core-pan__body-detail, .wp-s-core-pan__body-detail div {
                        position: relative;
                        width: 100%;
                        
                    }
                    
                    /* 弹出的框的大小*/
                    .wp-s-core-pan__body-detail {
                        /*width: 296px;*/
                        /*height: 400px;*/
                        /*border-left: 1px solid #f0f0f0;*/
                    }
                    .wp-s-core-pan__detail-slot {
                        width: 100%;
                        height: 100%;
                    }
            
                    /*.nd-detail{*/
                    /*    display: inline-block;*/
                    /*    position: relative;*/
                    /*    padding: 24px;*/
                    /*    font-size: 12px;*/
                    /*    overflow: auto;*/
                    /*}*/
                    .nd-new-main-list__detail {
                        height: 100%;
                        width: 100%;
                        padding-top: 0!important;
                        padding-right: 0!important;
                    }
                    .nd-new-main-list__detail {
                        min-height: 356px;
                    }
            
                    .nd-new-main-list__detail .nd-detail-filelist__title, .nd-new-main-list__detail .nd-detail__title {
                        height: 40px;
                        line-height: 40px;
                        padding-bottom: 0;
                    }
                    .nd-detail-filelist__title {
                        /*margin-bottom: #f1f2f4;*/
                        padding-bottom: 15px;
                        font-weight: 600;
                        /*color: #03081a;*/
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: flex;
                        -webkit-box-pack: justify;
                        -ms-flex-pack: justify;
                        justify-content: space-between;
                        -webkit-box-align: center;
                        -ms-flex-align: center;
                        align-items: center;
                    }
            
                    .nd-detail-filelist__name{
                        padding: 12px 0;
                        border-bottom: 1px solid #f1f2f4;
                        font-size: 14px;
                        /*color: #454d5a;*/
                        font-weight: 600;
                        word-break: break-all;
                    }
                    
                    .nd-detail-filename:hover {
                        background-color: #847a93;
                        cursor: pointer;
                    }
                    
                    .previewSelect {
                        background-color: #847a93;
                    }
            
                    .nd-detail-filelist__put-away-btn {
                        color: #818999;
                        cursor: pointer;
                        font-weight: 400;
                    }
            
                    .nd-detail-filelist__put-away-btn .u-uicon{
                        margin-right: 4px;
                        position: relative;
                        top: -1px;
                    }
            
                    [class*=" u-icon-"], [class^=u-icon-] {
                        font-family: union-design-icons!important;
                        speak: none;
                        font-style: normal;
                        font-weight: 400;
                        font-variant: normal;
                        text-transform: none;
                        line-height: 1;
                        vertical-align: baseline;
                        display: inline-block;
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                    }
                    .nd-detail-filelist__name .u-file-icon--list {
                        width: 32px;
                        height: 32px;
                        -o-object-fit: contain;
                        object-fit: contain;
                        margin-right: 8px;
                    }
                    .u-file-icon.u-file-icon--list {
                        width: 40px;
                        height: 40px;
                    }
                    .u-file-icon {
                        display: inline-block;
                        vertical-align: middle;
                    }
            
                    .nd-detail-filelist__list {
                        width: 100%;
                        /*min-height: 400px;*/
                        /*height: calc(100% - 140px);*/
                        border-radius: 13px;
                        position: relative;
                        margin-top: 14px;
                        padding: 0 12px;
                        overflow-y: auto;
                    }
                    .u-file-icon.u-file-icon--list {
                        width: 40px;
                        height: 40px;
                    }
                    .nd-detail-filelist__list .u-file-icon--list {
                        width: 24px;
                        height: 24px;
                    }
            
                    .u-file-icon {
                        display: inline-block;
                        vertical-align: middle;
                    }
            
                    .nd-detail-filename__title-text {
                        padding-left: 5px;
                        line-height: 40px;
                        max-width: calc(92%);
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }
                    .text-clip, .text-ellip, .text-ellipsis {
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    .inline-block-v-middle {
                        display: inline-block;
                        vertical-align: middle;
                    }
                    .text-clip, .text-ellip, .text-ellipsis {
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    .text-elip, .text-ellip {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .inline-block-v-middle {
                        display: inline-block;
                        vertical-align: middle;
                    }
            
                    .filesHeight::-webkit-scrollbar {
                        width: 10px;
                        height: 10px;
                        display: block;
                    }
            
                    .filesHeight::-webkit-scrollbar-track {
                        border-radius: 0;
                        background: none;
                    }
            
                    .filesHeight::-webkit-scrollbar-thumb {
                        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.2);
                        background: rgb(255 255 255 / 53%);
                    }
            
                    .filesHeight::-webkit-scrollbar-thumb:hover {
                        border-radius: 5px;
                        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.2);
                        background: rgb(255 200 0);;
                    }
                    
                    .aButton{
                        cursor: pointer;
                        text-align: center;
                        display: block;
                        text-decoration: none;
                        height: 30px;
                        line-height: 30px;
                    }
                    
                    /* 内容宽度*/ 
                    /* @media (max-height: 1200px) {*/
                    /*     .filesHeight {*/
                    /*        overflow-y: auto;*/
                    /*        height: 600px;*/
                    /*     }*/
                    /*}*/
                    
                    /* @media (max-height: 600px) {*/
                    /*    .filesHeight {*/
                    /*        overflow-y: auto;*/
                    /*        height: 320px;*/
                    /*    }*/
                    /*}*/
                    
                    
                    /*@media (max-height: 380px) {*/
                    /*    .filesHeight {*/
                    /*        overflow-y: auto;*/
                    /*        height: 260px;*/
                    /*    }*/
                    /*}*/
                    .filesHeight {
                            overflow-y: auto;
                            height: 70vh;
                            overflow-x: hidden;
                        }
                        
                    /* 模式预览样式开始 */
                    
                    .yk-preview {
                        position: relative;
                        width: 100%;
                        height: 100%;
                    }
                    
                    .yk-preview__container div{
                        position: relative;
                        display: block;                         
                    }
                    
                    .yk-preview__container {
                        position: relative;
                        height: calc(100% - 60px);
                        transition: width .5s;
                    }
                    
                    .yk-preview__container .yk-preview__closeBtn {
                        position: absolute;
                        z-index: 3;
                        width: 42px;
                        height: 42px;
                        text-align: center;
                        line-height: 42px;
                        border-radius: 50%;
                        background-color: #343434;
                        box-sizing: border-box;
                        top: 26px;
                        right: 26px;
                        color: #d8d8d8;
                        font-size: 16px;
                        cursor: pointer;
                    }
                    
                    .yk-preview__container .yk-preview__list{
                        width: 100%;
                        height: 100%;
                    }
                    
                    .yk-preview__container .yk-preview__image {
                        display: flex;
                        align-items: center;
                        width: 100%;
                        height: 100%;
                        text-align: center;
                        position: absolute;
                    }
                    
                    .yk-preview__container .yk-preview__operate {
                        z-index: 2;
                        position: relative;
                    }
                    
                    .yk-preview__container .preview-operate {
                        width: 100%;
                        height: 60px;
                        bottom: 0;
                        background-color: rgba(0,0,0,.6);
                        color: #c9c9c9;
                        font-size: 14px;
                        transition: width .5s;
                    }
                    .yk-preview__container .add-photo, .yk-preview__container .preview-operate {
                        position: fixed;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    
                    .yk-preview__container .preview-operate .image-detail:last-child {
                        margin-right: 0;
                    }
                    .yk-preview__container .preview-operate .image-delete, .yk-preview__container .preview-operate .image-detail {
                        cursor: pointer;
                    }
                    
                    .yk-preview__container .preview-operate .image-detail {
                        position: relative;
                        padding: 0 15px;
                    }
                    
                    .yk-preview__container .preview-operate .image-detail:last-child {
                        margin-right: 0;
                    }
                    .yk-preview__container .preview-operate .image-delete, .preview-operate .image-detail {
                        cursor: pointer;
                    }
                    .yk-preview__container .preview-operate .image-detail {
                        position: relative;
                        padding: 0 15px;
                    }
                    
                    .yk-preview__container .preview-operate .iconfont {
                        font-size: 28px;
                        width: 40px;
                        height: 40px;
                        vertical-align: middle;
                        display: inline-block;
                        line-height: 40px;
                        text-align: center;
                    }
                    
                    .yk-preview__container .preview-operate .image-detail .intro {
                        border-radius: 6px;
                        width: 85px;
                        height: 50px;
                        top: -65px;
                        left: 50%;
                        transform: translate(-50%);
                        display: flex;
                        position: absolute;
                        font-family: PingFangSC-Medium;
                        font-size: 12px;
                        color: #fff;
                        letter-spacing: 0;
                        text-align: center;
                        white-space: nowrap;
                        background: #333;
                        box-shadow: 0 2px 8px 0 rgb(0 0 0 / 20%);
                        line-height: 17px;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                    }
                    
                    .yk-preview__container .preview-operate .image-detail .intro img {
                        position: absolute;
                        width: 15px;
                        height: 9px;
                        bottom: -8px;
                        left: 50%;
                        transform: translate(-50%);
                    }
                    .yk-preview .yk-preview__info {
                        position: fixed;
                        top: 0;
                        right: 0;
                        z-index: 3;
                        /*width: 312px;*/
                        width: 20%;
                        height: 100%;
                        padding: 24px 40px;
                        margin-bottom: 50px;
                        box-sizing: border-box;
                        background: #212221;
                        color: #fff;
                        font-weight: 700;
                        transition: right .5s;
                    }
                    
                    .yk-preview .yk-preview__info div {
                        display: block;
                        position: relative;
                    }
                    .yk-preview .yk-preview__info .title {
                        margin-bottom: 50px;
                        font-size: 16px;
                    }
                    
                    .yk-preview .yk-preview__info .info-item {
                        display: flex;
                        flex-direction: row;
                        margin-bottom: 30px;
                        font-size: 12px;
                        align-items: center;
                    }
                    
                    .yk-preview .yk-preview__info .info-item i {
                        width: 24px;
                        height: 24px;
                        font-size: 20px;
                        font-weight: 400;
                        color: #999;
                    }
                    
                    .yk-preview .yk-preview__info .info-item .right {
                        padding-left: 15px;
                        display: flex;
                        justify-content: center;
                        flex-direction: column;
                    }
                    .yk-preview .yk-preview__info .info-item .info-name {
                        white-space: nowrap;
                    }
                    .yk-preview .yk-preview__info .info-item .content {
                        display: flex;
                        flex-wrap: wrap;
                        flex: 1;
                        color: #999;
                        padding-top: 4px;
                        font-size: 12px;
                        word-break: break-all;
                    }
                    .yk-preview .yk-preview__info--hidemenu {
                        position: absolute !important;
                        top: 50%;
                        left: 0;
                        transform: translateY(-50%);
                        cursor: pointer;
                        width: 18px;
                        height: 70px;
                        line-height: 70px;
                        text-align: center;
                        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAATJJREFUOBGNkz1uwkAQhbMrI7mkIBJngFMkt0CKLORIdkFBRcEFKNKkoLItWb5FSp+AJlLuEIWeBv/w3rJYtuNdGMkyO7vfm7czRqRpOiuK4s1xnE/f949PD0SSJIu6ridBEOxFHMc7LLZCiB+IvNwTAbypquoDdU54xpKVCUNkDic5HD2bTLTgCswqDMOz4GFChClictKD32E/I6sE+MMmYoI7AiaRsiyX+s603VTmeUbj4LrsOpFS/gKeYm8QHhRgktdB5W/CqFojtebIuNcP2U9wrW0rGI2ly9A0nX8C7YYBXHMqthF3BNqwbtieH5dNpGniAJzBgQrbiJWADb4nIgEvbHO+CfA/4rrua+s6X9yTaNAE75O+c8akKTzP+9MiB3DjPM8ddTaKopEJMuVv8AXIBQzYmzjo8QAAAABJRU5ErkJggg==);
                        background-repeat: no-repeat;
                        background-size: cover;
                    }
                    
                    .yk-preview .actionItemTagOuter {
                        margin: 10px;
                        cursor: pointer;
                    }
                    
                    .yk-preview .actionItemTag .actionItemTagIcon {
                        border-radius: 50%;
                        text-align: center;
                        position: relative;
                        cursor: pointer;
                        font-size: 20px;
                        height: 32px;
                        width: 32px;
                        line-height: 32px;
                        vertical-align: middle;
                        top: -1px;
                        right: -5px;
                    }
                    .yk-preview .actionItemTag {
                        display: inline-block;
                        height: 32px;
                        /* padding: 10px; */
                        line-height: 30px;
                        font-size: 16px;
                        border-radius: 4px;
                        box-sizing: border-box;
                        white-space: nowrap;
                        /* background-color: #ecf5ff; */
                        /* color: #409eff; */
                        /* border: 1px solid #d9ecff; */
                        background-color: #909399;
                        border-color: #909399;
                        color: #fff;
                        padding-right: 10px;
                    }
                    
                    .yk-preview .list-item-box .selectItemTag {
                        color: #409eff;
                        border: 1px solid #d9ecff;
                        background-color: #ecf5ff;
                    }
                    
                    .yk-preview #previewOperateAlpha.alphaSelect {
                        color: #0bdee9;
                    }
                    
                    .yk-preview .previewModal {
                        position: fixed;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                        max-height: 60%;
                        bottom: calc(80px);
                        z-index: 99999;
                        transition: all 0s;
                    }
                    
                    .yk-preview .list-container {
                        width: 40%;
                        position: relative;
                        background: #fff;
                        border: 1px solid #ebeef5;
                        border-radius: 6px;
                        box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
                        z-index: 10000;
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                        align-items: center;
                    }
                    
                    .yk-preview .closeModal {
                        width: 20px;
                        height: 20px;
                        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAATJJREFUOBGNkz1uwkAQhbMrI7mkIBJngFMkt0CKLORIdkFBRcEFKNKkoLItWb5FSp+AJlLuEIWeBv/w3rJYtuNdGMkyO7vfm7czRqRpOiuK4s1xnE/f949PD0SSJIu6ridBEOxFHMc7LLZCiB+IvNwTAbypquoDdU54xpKVCUNkDic5HD2bTLTgCswqDMOz4GFChClictKD32E/I6sE+MMmYoI7AiaRsiyX+s603VTmeUbj4LrsOpFS/gKeYm8QHhRgktdB5W/CqFojtebIuNcP2U9wrW0rGI2ly9A0nX8C7YYBXHMqthF3BNqwbtieH5dNpGniAJzBgQrbiJWADb4nIgEvbHO+CfA/4rrua+s6X9yTaNAE75O+c8akKTzP+9MiB3DjPM8ddTaKopEJMuVv8AXIBQzYmzjo8QAAAABJRU5ErkJggg==) no-repeat;
                        background-size: cover;
                        position: absolute;
                        top: 17px;
                        right: 20px;
                        cursor: pointer;
                        z-index: 9;
                    }
                    
                    .yk-preview .list-item-box {
                       text-shadow: none;
                    }
                    
                    .yk-preview .list-title {
                        width: 100%;
                        height: 50px;
                        line-height: 50px;
                        font-size: 24px;
                        text-align: center;
                        color: #333;
                          text-shadow: none;
                    }
                    
                    .yk-preview .list-item-box {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: flex-start;
                        align-content: flex-start;
                    }
                    
                    .bpx-player-ctrl-volume.bpx-state-show .bpx-player-ctrl-volume-box {
                        display: block;
                    }
                    
                    .yk-preview .bpx-player-ctrl-volume-box {
                        /* display: none; */
                        position: absolute;
                        bottom: 41px;
                        left: 50%;
                        margin-left: -16px;
                        width: 32px;
                        height: 120px;
                        background: rgba(21,21,21,.9);
                        border-radius: 2px;
                    }
                    .yk-preview .bpx-player-ctrl-volume-number {
                        color: #e5e9ef;
                        width: 100%;
                        text-align: center;
                        font-size: 12px;
                        height: 28px;
                        line-height: 28px;
                        margin-bottom: 2px;
                    }
                    .yk-preview .bui-slider {
                        height: 12px;
                        cursor: pointer;
                    }
                    
                    .yk-preview .bui {
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: flex;
                        vertical-align: middle;
                        -webkit-box-align: center;
                        -ms-flex-align: center;
                        align-items: center;
                        -webkit-box-pack: start;
                        -ms-flex-pack: start;
                        justify-content: flex-start;
                    }
                    
                    .yk-preview .bpx-player-ctrl-volume-progress {
                        margin: 0 auto;
                        height: 80px!important;
                    }
                    
                    .yk-preview .bui .bui-area {
                        width: 100%;
                        height: 100%;
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: flex;
                        vertical-align: middle;
                        -webkit-box-align: center;
                        -ms-flex-align: center;
                        align-items: center;
                        -webkit-box-pack: start;
                        -ms-flex-pack: start;
                        justify-content: flex-start;
                        line-height: normal;
                        -webkit-user-select: none;
                        -moz-user-select: none;
                        -ms-user-select: none;
                        user-select: none;
                    }
                    
                    .yk-preview .bpx-player-ctrl-volume-progress .bui-area {
                        -webkit-box-pack: center!important;
                        -ms-flex-pack: center!important;
                        justify-content: center!important;
                    }
                    
                    .yk-preview .bui-slider .bui-track.bui-track-vertical {
                        height: 100%;
                        width: 5px;
                        -webkit-box-align: end;
                        -ms-flex-align: end;
                        align-items: flex-end;
                    }
                    
                    
                    .yk-preview .bui-slider .bui-track {
                        position: relative;
                        width: 100%;
                        height: 2px;
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: flex;
                        -webkit-box-align: center;
                        -ms-flex-align: center;
                        align-items: center;
                    }
                    .yk-preview .bui-slider .bui-track .bui-bar-wrap {
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        border-radius: 2.5px;
                        overflow: hidden;
                        background: #e7e7e7;
                    }
                    .yk-preview .bui-slider .bui-track.bui-track-vertical .bui-bar-wrap .bui-bar {
                        position: absolute;
                        -webkit-transform-origin: 0 100%;
                        transform-origin: 0 100%;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        background: #00a1d6;
                    }
                    
                    .yk-preview .bui-slider .bui-track .bui-bar-wrap .bui-bar {
                        position: absolute;
                        -webkit-transform-origin: 0 0;
                        transform-origin: 0 0;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        background: #00a1d6;
                    }
                    
                    .yk-preview .bui-slider .bui-track.bui-track-vertical .bui-thumb {
                        bottom: 0;
                        top: auto;
                        position: relative;
                    }
                    
                    .yk-preview .bui-slider .bui-track .bui-thumb {
                        cursor: pointer;
                    }
                    
                    .bui-slider .bui-track .bui-thumb .bui-thumb-dot, .bui-slider .bui-track .bui-thumb .bui-thumb-dot-special {
                        -webkit-transition: all .2s;
                        -o-transition: all .2s;
                        transition: all .2s;
                        -webkit-transform: translateZ(0);
                        transform: translateZ(0);
                    }
                    
                    .yk-preview .bui-slider .bui-track .bui-thumb .bui-thumb-dot {
                        width: 12px;
                        height: 12px;
                        border-radius: 50%;
                        background-color: #00a1d6;
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: flex;
                        vertical-align: middle;
                        -webkit-box-align: center;
                        -ms-flex-align: center;
                        align-items: center;
                    }
                    
                    </style>
                    <canvas id="preview-canvas"></canvas>
                    <div id="previewSpineDom" style="color: #fff; position: absolute; top: 0; left: 30px;">
                        <span style="font-weight: bold">spine动画预览窗口</span>
                        <span id="curVersionText">当前版本:</span>
                        <span><a id="foldTreeAbtn" href="#unique-id" class="closeBtn aButton" style="display: block">目录</a></span>
                         <span>flipX:</span><input type="checkbox" id="flipX">
                        <span>flipY:</span><input type="checkbox" id="flipY">
                        <span>x: <input id="posX" type="number" value="0.5" step="0.05" style="width: 50px"></span>
                        <span>y: <input id="posY" type="number" value="0.5" step="0.05" style="width: 50px"></span>
<!--                        <span>Debug:</span><input type="checkbox" id="debug">-->
                        <span>α预乘:</span><input type="checkbox" id="premultipliedAlpha">
                   
                        <span>动画标签:</span><select id="animationList"></select>
                        <span>皮肤:</span><select id="skinList"></select>
                     
                        <span>动画时长:<span id="aniTime"></span></span>
                        <span>大小:<input id="scale" type="number" value="0.5" step="0.05" style="width: 50px"></span>

                        <button id="closePreviewWindow" style="margin-left: 20px; margin-top: 10px;" class="closeBtn">关闭预览窗口</button>
                    </div>
                    <!--  模态框       -->
                    <div class="light-modal" id="unique-id" role="dialog" aria-labelledby="light-modal-label" aria-hidden="false">
                        <div class="light-modal-content animated zoomInUp">
                            <!-- light modal header -->
                            <div class="light-modal-header">
                                <h3 class="light-modal-heading">选择文件夹预览</h3>
                                <a href="#" id="closeTreeModal" class="light-modal-close-icon" aria-label="close">&times;</a>
                            </div>
                            <!-- light modal body -->
                            <div class="light-modal-body">
                               <div class="wp-s-core-pan__body-detail">
                                 <div class="wp-s-core-pan__detail-slot">
                                    <section class="nd-detail nd-new-main-list__detail"><!---->
                                        <div class="nd-detail-filelist" 
                                             type="simple">
                                            <div class="nd-detail-filelist__contain">
                                                <div class="nd-detail-filelist__title">
                                                    <div>文件夹内容</div>
                                                    <div style="display: flex; align-items: center">
                                                        <i class="iconfont icon-paixu1" id="btnSortDirFiles" style="cursor: pointer; margin-right: 25px;margin-left: -40px;font-size: 26px;"></i>
                                                        <i class="iconfont icon-fanhui" id="btnReturnLastDir" style="cursor: pointer; font-size: 20px;margin-right: 25px; "></i>
                                                        <i class="iconfont icon-shousuo" id="btnShouSuoDir" style="cursor: pointer; font-size: 26px;"></i>
                                                    </div>
                                                </div>
                                                <div class="nd-detail-filelist__name"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABRUExURUxpcf++Hv/ZU//OPv/DL/+9Gv/BI/+4Bf+4Ef/XcP/LOP/TSf/RRP/WTv/JM/+3Ef+9Ff/bhf+5BP/DJf+yDv/imv/kqv/bXP/w0v/fd//calQXUgwAAAAKdFJOUwB///8d3L9enl8sr20gAAACN0lEQVRYw+2Y65abIBRGE1EzVbyNSW18/wctHA6XYw4q9Ee7Vt2AgOHbcVyTOMztdnFxcXFMWf7gKHN190VRKDpFC0iNqB5ZvqpXzJRxHoF7hrAa9/hK9j2oYIA2QA/UqXeyNg5QDBrshhHbUH8xxO+uT7sOJ/tU5a4wh0eK8KmKHTxd28Bfo16pqphep5l6I+R/p8xr668kVghVceH8M5EZYnGhnBKRceGqmaZXPPw2xbO+1xU+8axwe8NfzkIV7xVZdF0AVhi+rWdxIfgmwloE6CkrDCPwJbYUeFgK61icxFcNKyxIxE+WgnllQ0y4+HffzZ8WZtJlCDtz+CzqaaFaVGiWBNEOZZ15zihsT2CFnXk4QStsLohTU3FC+Af8I8JWV1fa1jy8u+hnOUy2vnd5SkeGrJBfHZwDbxe87pfxQvejmMZZYxxdYSoyVyixSvtXFLJ7hWq5xCRNSTozczzHCj8T54kI5d8QCtvZAodDIa7DgRkJaII2hBfaJC7EOE7D076XuIoVBu8oN3kpBLVt4YXBVaUSFSbS5Akb00znSoPn9KCJCN0am7SnGhganC4kKhR2MV0vvEn4M7bFhM3GIZqtgfiPr9BdSAYnrnCX3rQeB/2xsKcHouiBBhpO+phQL9CdjmKqsRkXpkMz57dmfTY1v3k8is26zvN2A6yIbKVqm/tMjFBMp5jpxrWKbsB1dJw/AsC3Lt/YEaK7x1t5r7aLj3ned/fRj1TK3H9wXFxc/F/8BgM0jBZ4nc19AAAAAElFTkSuQmCC"
                                                                                        alt="folder" class="u-file-icon u-file-icon--list"><span id="pfqhCurFold">当前文件夹</span></div>
                                                <div class="nd-detail-filelist__list bg">
                                                  
                                                    <div style="display: flex; flex-direction: row">
                                                      <div class="filesHeight" style="width: 45%;">
                                                         <div id="pfqhFoldList" style="white-space: nowrap;  display: flex;flex-direction: column; width: 90%" >
                                                                <div class="nd-detail-filename" id="pfqhLastDir">
                                                                <img
                                                                     src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABRUExURUxpcf++Hv/ZU//OPv/DL/+9Gv/BI/+4Bf+4Ef/XcP/LOP/TSf/RRP/WTv/JM/+3Ef+9Ff/bhf+5BP/DJf+yDv/imv/kqv/bXP/w0v/fd//calQXUgwAAAAKdFJOUwB///8d3L9enl8sr20gAAACN0lEQVRYw+2Y65abIBRGE1EzVbyNSW18/wctHA6XYw4q9Ee7Vt2AgOHbcVyTOMztdnFxcXFMWf7gKHN190VRKDpFC0iNqB5ZvqpXzJRxHoF7hrAa9/hK9j2oYIA2QA/UqXeyNg5QDBrshhHbUH8xxO+uT7sOJ/tU5a4wh0eK8KmKHTxd28Bfo16pqphep5l6I+R/p8xr668kVghVceH8M5EZYnGhnBKRceGqmaZXPPw2xbO+1xU+8axwe8NfzkIV7xVZdF0AVhi+rWdxIfgmwloE6CkrDCPwJbYUeFgK61icxFcNKyxIxE+WgnllQ0y4+HffzZ8WZtJlCDtz+CzqaaFaVGiWBNEOZZ15zihsT2CFnXk4QStsLohTU3FC+Af8I8JWV1fa1jy8u+hnOUy2vnd5SkeGrJBfHZwDbxe87pfxQvejmMZZYxxdYSoyVyixSvtXFLJ7hWq5xCRNSTozczzHCj8T54kI5d8QCtvZAodDIa7DgRkJaII2hBfaJC7EOE7D076XuIoVBu8oN3kpBLVt4YXBVaUSFSbS5Akb00znSoPn9KCJCN0am7SnGhganC4kKhR2MV0vvEn4M7bFhM3GIZqtgfiPr9BdSAYnrnCX3rQeB/2xsKcHouiBBhpO+phQL9CdjmKqsRkXpkMz57dmfTY1v3k8is26zvN2A6yIbKVqm/tMjFBMp5jpxrWKbsB1dJw/AsC3Lt/YEaK7x1t5r7aLj3ned/fRj1TK3H9wXFxc/F/8BgM0jBZ4nc19AAAAAElFTkSuQmCC"
                                                                     alt="folder" class="category u-file-icon u-file-icon--list">
                                                                <span class="nd-detail-filename__title-text inline-block-v-middle text-ellip">返回上级</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="filesHeight" style="margin-left: 5%; width: 50%; ">
                                                            <div id="pfqhFilesList" style="white-space: nowrap; display: flex;flex-direction: column; width: 90%">
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    <!-- 图集模式预览 -->
                    <div class="picPreviewBg hidden" id="picPreviewBg" style="width: 100%; height: 100%; left: 0; top: 0">
                        <div class="yk-preview">
                            <div class="yk-preview__container" style="width: 100%;" id="previewContainer">
                                <div class="yk-preview__closeBtn" id="closeImgPreview"><i class="iconfont icon-close"></i>
                                </div>
                                <div class="yk-preview__list">
                                   
                                </div>
                                <div class="yk-preview__operate">
                                    <div class="preview-operate" id="preview-operate" style="width: 100%;">
                                        <div id="opFoldTree" style="position: absolute; left: 10px; cursor:pointer;"><i class="iconfont icon-shuliebiao"></i></div>
                                        <div id="previewOperateLeft">
                                            <div class="image-detail">
                                                <i class="iconfont icon-left"></i>
                                            </div>
                                        </div>
                                        <div id="previewOperateRight">
                                            <div class="image-detail">
                                                <i class="iconfont icon-right"></i>
                                            </div>
                                        </div>
                                           <div id="previewOperateQieHuan">
                                            <div class="image-detail">
                                              <i class="iconfont icon-qiehuan"></i>
                                            </div>
                                        </div>
                                        <div id="previewOperateFangda">
                                            <div class="image-detail">
                                                <i class="iconfont icon-fangda"></i>
                                            </div>
                                        </div>
                                        <div id="previewOperateSuoxiao">
                                            <div class="image-detail">
                                              <i class="iconfont icon-suoxiao"></i>
                                            </div>
                                        </div>
                                        <div id="previewOperateNizhuan">
                                            <div class="image-detail">
                                                <i class="iconfont icon-nizhuan"></i>
                                            </div>
                                        </div>
                                        <div id="previewOperateAlpha"> 
                                            <div class="image-detail">
                                              <i class="iconfont icon-alpha"></i>
                                            </div>
                                        </div>
                                        <div id="previewOperateDonghuaAction">
                                            <div class="image-detail">
                                              <i class="iconfont icon-donghua"></i>
                                            </div>
                                        </div>
                                        <div id="previewOperatePifu">
                                            <div class="image-detail">
                                              <i class="iconfont icon-pifu"></i>
                                            </div>
                                        </div>
                                        
                                         <div id="previewOperateSpeed">
                                            <div class="image-detail">
                                              <i class="iconfont icon-sudutiaojie"></i>
                                            </div>
                                            <div class="bpx-player-ctrl-volume-box hidden" id="previewOperateSpeedCtrl">
                                                <div class="bpx-player-ctrl-volume-number">1.0</div>
                                                <div class="bpx-player-ctrl-volume-progress bui bui-slider" id="dataProgressBar">
                                                    <div class="bui-area">
                                                        <div class="bui-track bui-track-vertical" style="">
                                                            <div class="bui-bar-wrap">
                                                                <div class="bui-bar bui-bar-normal" role="progressbar" style="transform: scaleY(0.61);"></div>
                                                            </div>
                                                            <div class="bui-thumb" style="left: -4px; transform: translateY(-29.28px);">
                                                                <div class="bui-thumb-dot" style=""></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="previewOperateInfo">
                                            <div class="image-detail">
                                              <i class="iconfont icon-info1"></i>
                                            </div>
                                        </div>
                                        
                                        <div class="previewModal hidden" id="previewImgModal">
                                            <div class="list-container">
                                                <div class="closeModal" id="closeModal"></div>
                                                <div style="width: 100%">
                                                    <div class="list-title" id="previewModalTitle">骨骼标签</div>
                                                    <div class="list-item-box" id="modalItemsList">具体内容</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                              
                            </div>
                            <div class="yk-preview__info hidden" id="previewDetailInfo">
                                <div class="title">详情</div>
                                <div class="info-wrap">
                                    <div class="info-item"><i class="iconfont icon-kanwumingcheng"></i>
                                        <div class="right">
                                            <div class="info-name">骨骼名称</div>
                                            <div class="content">无</div>
                                        </div>
                                    </div>
                                    <div class="info-item"><i class="iconfont icon-banben"></i>
                                        <div class="right">
                                            <div class="label">版本</div>
                                            <div class="content">3.6</div>
                                        </div>
                                    </div>
                                    <div class="info-item"><i class="iconfont icon-shichang"></i>
                                        <div class="right">
                                            <div class="label">动画时长</div>
                                            <div class="content">5</div>
                                        </div>
                                    </div>
                                    <div class="info-item"><i class="iconfont icon-donghua"></i>
                                        <div class="right">
                                            <div class="label">动作信息</div>
                                            <div class="content">标签: idle, 皮肤: default</div>
                                        </div>
                                    </div>
                                    <div class="info-item"><i class="iconfont icon-qitaxinxi"></i>
                                        <div class="right">
                                            <div class="label">其他信息</div>
                                            <div class="content">大小: 0.5, 速度: 1.0</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="yk-preview__info--hidemenu" id="previewInfoHideMenu"><i class="u-icon-next-page"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    `

        let canvas;
        let activeSkeleton = null
        let currentNode = null
        let isClosed = false // 全局信号, 通知关闭, 停止渲染
        let isUpdate = false
        const previewSpineDom = document.getElementById('previewSpineDom')

        canvas = document.getElementById('preview-canvas')

        let animationManager = new AnimationManager(lib.assetURL, canvas, 123456)

        // 被监视的元素
        let px = document.getElementById('posX')
        let py = document.getElementById('posY')
        let canvasSize = canvas.getBoundingClientRect()

        let dpr = Math.max(window.devicePixelRatio * (window.documentZoom ? window.documentZoom : 1), 1)
        canvas.width = dpr * skinSwitch.bodySize().width
        canvas.height = dpr * skinSwitch.bodySize().height
        let x = 0.65 * canvasSize.width
        let y = 0.5 * canvasSize.height
        let scale = 0.5
        // 开始监视el上的手势变化
        const at = new AnyTouch(canvas)
        let currentPath = lib.config[skinSwitch.configKey.lastPreviewPath]
        if (!currentPath) {
            game.saveConfig(skinSwitch.configKey.lastPreviewPath, 'extension/千幻聆音/assets')
            currentPath = 'extension/千幻聆音/assets';
        }
        // 检查文件夹是否存在, 不存在初始化为默认文件夹
        skinSwitch.qhly_checkFileExist(currentPath, (exists) => {
            if (!exists) {
                currentPath = 'extension/千幻聆音/assets'
            }
        })

        // 获取模态框文件夹和文件列表dom
        let foldsEle = document.getElementById('pfqhFoldList')
        let filesEle = document.getElementById('pfqhFilesList')
        let curFoldEle = document.getElementById('pfqhCurFold')

        let clickName = lib.config.touchscreen ? 'touchend' : 'click'

        let lastSelFile = null
        if (!skinSwitch.nodePreviewedInfo) {
            skinSwitch.nodePreviewedInfo = {}; // 保存已经预览的骨骼的相关数据
        }

        // 添加搜索框 - 确保DOM元素已存在再添加
        if (foldsEle && foldsEle.parentNode) {
            let searchContainer = document.createElement('div');
            searchContainer.className = 'folder-search-container';
            searchContainer.style.padding = '5px';
            searchContainer.style.marginBottom = '5px';
            searchContainer.style.display = 'flex';
            searchContainer.style.flexDirection = 'column'; // 改为垂直布局
            searchContainer.style.gap = '5px'; // 元素间距
            searchContainer.style.maxWidth = '200px'; // 限制最大宽度
            searchContainer.innerHTML = `
                            <input type="text" placeholder="搜索文件夹" id="folderSearchInput" style="width: 100%; padding: 4px; border-radius: 4px; border: 1px solid #ccc; box-sizing: border-box; font-size: 13px;">
                            <button id="clearSearchBtn" style="width: 100%; padding: 3px 5px; border-radius: 4px; border: 1px solid #ccc; background: #f5f5f5; cursor: pointer; box-sizing: border-box; font-size: 13px;">清除</button>
                        `;
            foldsEle.parentNode.insertBefore(searchContainer, foldsEle);

            // 搜索功能实现 - 直接通过创建的元素获取引用
            let folderSearchInput = searchContainer.querySelector('#folderSearchInput');
            let clearSearchBtn = searchContainer.querySelector('#clearSearchBtn');

            if (folderSearchInput && clearSearchBtn) {
                folderSearchInput.addEventListener('input', function() {
                    let searchValue = this.value; // 不转为小写，保留中文原样
                    let allFolders = foldsEle.querySelectorAll('.nd-detail-filename');

                    // 第一个是返回上层目录按钮，从第二个开始是文件夹
                    for (let i = 1; i < allFolders.length; i++) {
                        let folderName = allFolders[i].getAttribute('fold');
                        if (folderName) {
                            // 不转为小写，保留中文原样
                            if (searchValue === '' || folderName.indexOf(searchValue) !== -1) {
                                allFolders[i].style.display = 'block';
                                // 确保元素可交互
                                allFolders[i].style.pointerEvents = 'auto';
                            } else {
                                allFolders[i].style.display = 'none';
                                // 不要阻止其他交互
                                allFolders[i].style.pointerEvents = 'none';
                            }
                        }
                    }
                });

                clearSearchBtn.addEventListener(clickName, function() {
                    folderSearchInput.value = '';
                    // 触发input事件以更新显示
                    folderSearchInput.dispatchEvent(new Event('input'));
                });
            }
        }

        let currentFoldInfo = {
            curFiles: [], // 存储当前目录下的spine文件列表
            curFileIndex: 0, // 当前在文件夹的索引
        }

        let contentModal = document.getElementById('unique-id').getElementsByClassName('light-modal-body')[0]

        contentModal.addEventListener('touchstart', touchstart, true);
        contentModal.addEventListener('touchmove', touchmove, true); //添加touchmove方法
        contentModal.addEventListener('touchend', touchend, true);

        function touchstart(e) {
            // console.log(e.changedTouches[0].pageY,"开始时触摸的位置")
            this.move = false //添加一个move参数，触摸时置为false
            // this.start = e.changedTouches[0].pageY
            this.start = e.pageY
        }

        function touchmove() {
            this.move = true // 触发滑动事件时move置为true
        }

        function touchend(e) {
            // this.end = e.changedTouches[0].pageY
            this.end = e.pageY
            if (this.move) { //只有当move为true时才会触发滑动事件
                e.stopPropagation()
            } else {
                if (e.target.touchend) {
                    e.target.touchend(e.target)
                }
            }
        }


        curFoldEle.innerText = currentPath

        const returnLastDir = function(e) {
            // 获取之前预览的文件夹名字
            let lastDirName
            if (currentPath) {
                lastDirName = currentPath.substring(currentPath.lastIndexOf('/') + 1, currentPath.length)
            }
            currentPath = currentPath === '' ? '' : currentPath.substring(0, currentPath.lastIndexOf('/'));
            game.saveConfig(skinSwitch.configKey.lastPreviewPath, currentPath)
            initFoldsInfo(lastDirName)
        }

        // 返回上一级事件
        document.getElementById('pfqhLastDir').addEventListener(clickName, function(e) {
            returnLastDir()
        })
        // 同返回上一级
        document.getElementById('btnReturnLastDir').addEventListener(clickName, function(e) {
            returnLastDir()
        })
        // 收缩文件夹
        document.getElementById('btnShouSuoDir').addEventListener(clickName, function(e) {
            let node = foldsEle.parentNode
            let fileNode = filesEle.parentNode
            let isHide = node.style.display === 'none'
            if (isHide) {
                node.style.display = 'inline-block'
                fileNode.style.width = '50%'
                fileNode.style.marginLeft = '5%'
            } else {
                node.style.display = 'none'
                fileNode.style.width = '100%'
                fileNode.style.marginLeft = '0px'
            }
        })

        let sortDirs = (sorts) => {
            let box = document.getElementById('pfqhFoldList')
            let arr = []
            for (let i = 1; i < box.children.length; i++) {
                arr.push(box.children[i])
            }
            if (sorts == null || sorts === 0) {
                arr.sort(function(a, b) {
                    return a.getAttribute('fold').localeCompare(b.getAttribute('fold'))
                })

            } else if (sorts === 1) {
                arr.sort(function(a, b) {
                    return b.getAttribute('fold').localeCompare(a.getAttribute('fold'))
                })
            }

            for (let i = 0; i < arr.length; i++) {
                box.appendChild(arr[i])
            }
        }

        document.getElementById('btnSortDirFiles').addEventListener(clickName, function(e) {
            let sorts = this._sorts
            if (sorts == null || sorts === 1) {
                this._sorts = 0
                this.classList.add('icon-paixu1')
                this.classList.remove('icon-daoxu')
            } else {
                this._sorts = 1
                this.classList.remove('icon-paixu1')
                this.classList.add('icon-daoxu')
            }
            sortDirs(this._sorts)
        })

        // 只过滤出包含完整spine骨骼的文件进行预览
        let filterSpineFile = (files) => {
            let skinInfoMap = {}
            for (let f of files) {
                let name = f.substring(0, f.lastIndexOf("."))
                let ext = f.substring(f.lastIndexOf(".") + 1)
                if (!(name in skinInfoMap)) {
                    skinInfoMap[name] = {}
                }
                if (ext === 'png') {
                    skinInfoMap[name].png = true
                } else if (ext === 'skel') {
                    skinInfoMap[name].type = 'skel';
                } else if (ext === 'json') {
                    skinInfoMap[name].type = 'json';
                } else if (ext === 'atlas') {
                    skinInfoMap[name].altas = true
                }
            }
            let retFiles = []
            for (let k in skinInfoMap) {
                let info = skinInfoMap[k]
                // 如果十周年文件里面已经有了对应武将和对应皮肤的话, 跳过.
                if (info.type && info.altas /*&& info.png*/ ) {
                    retFiles.push({
                        path: k + '.' + info.type,
                        name: k
                    })
                }

            }
            return retFiles
        }

        let initFoldsInfo = (lastDirName) => {
            // 获取这个文件夹下的所有合法的skel文件和所有文件夹
            pfqhUtils.getFoldsFiles(currentPath, function(file, path) {
                let suffixes = ['.png', '.atlas', '.json', '.skel', '.jpg']
                for (let suf of suffixes) {
                    if (file.endsWith(suf)) {
                        return true
                    }
                }
                return false
            }, function(folds, files) {
                curFoldEle.innerText = currentPath
                // 删除之前节点
                for (let i = foldsEle.childNodes.length - 1; i > 1; i--) {
                    foldsEle.childNodes[i].remove()
                }
                for (let i = filesEle.childNodes.length - 1; i > 0; i--) {
                    filesEle.childNodes[i].remove()
                }
                for (let i = 0; i < folds.length; i++) {
                    let div = document.createElement('div');
                    div.innerHTML = `
                                    <img
                                         src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABRUExURUxpcf++Hv/ZU//OPv/DL/+9Gv/BI/+4Bf+4Ef/XcP/LOP/TSf/RRP/WTv/JM/+3Ef+9Ff/bhf+5BP/DJf+yDv/imv/kqv/bXP/w0v/fd//calQXUgwAAAAKdFJOUwB///8d3L9enl8sr20gAAACN0lEQVRYw+2Y65abIBRGE1EzVbyNSW18/wctHA6XYw4q9Ee7Vt2AgOHbcVyTOMztdnFxcXFMWf7gKHN190VRKDpFC0iNqB5ZvqpXzJRxHoF7hrAa9/hK9j2oYIA2QA/UqXeyNg5QDBrshhHbUH8xxO+uT7sOJ/tU5a4wh0eK8KmKHTxd28Bfo16pqphep5l6I+R/p8xr668kVghVceH8M5EZYnGhnBKRceGqmaZXPPw2xbO+1xU+8axwe8NfzkIV7xVZdF0AVhi+rWdxIfgmwloE6CkrDCPwJbYUeFgK61icxFcNKyxIxE+WgnllQ0y4+HffzZ8WZtJlCDtz+CzqaaFaVGiWBNEOZZ15zihsT2CFnXk4QStsLohTU3FC+Af8I8JWV1fa1jy8u+hnOUy2vnd5SkeGrJBfHZwDbxe87pfxQvejmMZZYxxdYSoyVyixSvtXFLJ7hWq5xCRNSTozczzHCj8T54kI5d8QCtvZAodDIa7DgRkJaII2hBfaJC7EOE7D076XuIoVBu8oN3kpBLVt4YXBVaUSFSbS5Akb00znSoPn9KCJCN0am7SnGhganC4kKhR2MV0vvEn4M7bFhM3GIZqtgfiPr9BdSAYnrnCX3rQeB/2xsKcHouiBBhpO+phQL9CdjmKqsRkXpkMz57dmfTY1v3k8is26zvN2A6yIbKVqm/tMjFBMp5jpxrWKbsB1dJw/AsC3Lt/YEaK7x1t5r7aLj3ned/fRj1TK3H9wXFxc/F/8BgM0jBZ4nc19AAAAAElFTkSuQmCC"
                                         alt="folder" class="category u-file-icon u-file-icon--list">
                                    <span class="nd-detail-filename__title-text inline-block-v-middle text-ellip">${folds[i]}</span>
                                `;
                    div.setAttribute('fold', folds[i]);
                    div.classList.add('nd-detail-filename');
                    div.style.cursor = 'pointer'; // 确保鼠标悬停时显示为可点击状态
                    div.addEventListener(clickName, function(e) {
                        if (currentPath) {
                            currentPath = `${currentPath}/${this.getAttribute('fold')}`
                        } else {
                            currentPath = this.getAttribute('fold')
                        }
                        game.saveConfig(skinSwitch.configKey.lastPreviewPath, currentPath)

                        // 清除搜索框内容，方便查看新目录内容
                        let searchInput = document.querySelector('#folderSearchInput');
                        if (searchInput) {
                            searchInput.value = '';
                        }

                        initFoldsInfo()
                        e.stopPropagation()
                    });
                    foldsEle.appendChild(div);
                }
                // 排序一下节点
                let _sorts = document.getElementById('btnSortDirFiles')._sorts
                if (_sorts != null) {
                    sortDirs(_sorts)
                }

                // 搜索框值更新后，保持文件夹筛选状态
                let folderSearchInput = document.querySelector('#folderSearchInput');
                if (folderSearchInput && folderSearchInput.value) {
                    folderSearchInput.dispatchEvent(new Event('input'));
                }

                for (let i = 1; i < foldsEle.children.length; i++) {
                    let foldName = foldsEle.children[i].getAttribute('fold')
                    if (lastDirName && lastDirName === foldName) {
                        foldsEle.children[i].classList.add('previewSelect')
                        // 计算滚动条, 滚动到对应的文件夹位置
                        if (i > 5) {
                            foldsEle.parentNode.scrollTop = 40 * (i - 5)
                        }
                    } else {
                        foldsEle.children[i].classList.remove('previewSelect')
                    }
                }

                // 点击文件夹时 初始化一下当前file
                currentFoldInfo.curFiles.length = 0
                currentFoldInfo.curFileIndex = -1

                let retFiles = filterSpineFile(files)
                for (let i = 0; i < retFiles.length; i++) {
                    let div = document.createElement('div')
                    div.innerHTML = `
                                    <img
                                         src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABIUExURUxpcTOL+DSL+DqO+Veb/mKl/kmX+zWL+U6a+2ao/0aW+0CS+kyZ/GCk/mWn/1yi/lef/VGc/Pr9/+jz/2+s+46//b3a/4O3/AJIojgAAAAKdFJOUwDf//8d3U+en52O09RGAAACF0lEQVRYw+2Y63ajIBCAW8ZqHC5KrZv3f9MFhpuJTQfrjz1n/SDIbT4npw2pfXu7uLi4YNOP39O367rRvOKja/V9GHOqcTTmVGNnzLlGl6A2WvvWxGsqJo9ajKMuGP0dDcbxSWTShKlGfOOoebCNRTidYxynDXrb1dUU0ziGEF3ZdHHoza14xocMXzJyhLdpmme/e6ag2XeobqYCnBRvs98fm32meId56nnCErk+czfVhlub0CyfOyzaHhTa9XOX9aDQqnU/w7uyjULrcC3i+ocI4iUOVkQ7+8IVeptXWgUgMXD3xjv1UYCyCa6QUAiC0E64fMUBYBTOrUJnROmBryCEMEAsCbYKrSIkCSXS0LYLla8U6K4KSYi+H5ZsWmcJY1ohmpos3OLWmoSF9JajX9m8ckyIRfjIrzM8KERfq5J/yridZwrDx0HF6suOMF24QoXJGijCR/gZboB/TZgDYyd9lqU8mqGPlGQMJR8OfiDjZNjDEQ5S0hlDZ4ushWkqwxSWJCgezOKYIMsw7Ri4wi0g3HfBKuF55bBQTNod1WcKw9kv6yShTQgUQA6A6IsjAEmFJ4RXOF24W+gBcIUxAaiapChi/zolw5rfC+GYUKTqG1G11Vxo2Bn6AJLk8NiPC6JBKOjXLv0ZEruwN2AJe8GCnKzHgEGw4STonm/fub535rNUx8xx4D+RdsPP9Af+m3FxcfH/8hcLt2QJ3T9wuwAAAABJRU5ErkJggg=="
                                         class="category u-file-icon u-file-icon--list" alt="${retFiles[i].path}">
                                    <span class="nd-detail-filename__title-text inline-block-v-middle text-ellip">${retFiles[i].path}</span>
                                `
                    div.setAttribute('path', retFiles[i].path)
                    div.classList.add('nd-detail-filename')
                    div.addEventListener(clickName, function(e) {
                        if (lastSelFile === this) return

                        playSelectAsset(this.getAttribute('path'))

                        // 添加选择的样式
                        if (lastSelFile) {
                            lastSelFile.classList.remove('previewSelect')
                        }
                        lastSelFile = this
                        this.classList.add('previewSelect')

                        // 可能需要更新一下滚动条以及索引
                        for (let idx = 0; idx < this.parentNode.children.length; idx++) {
                            if (this === this.parentNode.children[idx]) {
                                // 清理图集相关的信息
                                currentFoldInfo.curFileIndex = idx
                                if (window.location.hash === '#unique-id') {
                                    let scrollTop = filesEle.parentNode.scrollTop;
                                    if (scrollTop > (idx * 40)) {
                                        filesEle.parentNode.scrollTop = 40 * (idx - 3)
                                    } else if ((idx * 40 - scrollTop) > 10 * 40) {
                                        filesEle.parentNode.scrollTop = 40 * (idx)
                                    }
                                }
                                break
                            }
                        }

                        closeModalFunc()

                        // e.stopPropagation()
                    })
                    filesEle.appendChild(div)

                    currentFoldInfo.curFiles.push(div)
                    currentFoldInfo.curFileIndex = -1
                    closeModalFunc()
                }
            })
        }

        initFoldsInfo()

        let playSelectAsset = (path) => {
            // 拼接当前所选择的文件, 获取版本号, 然后进行资源载入与播放
            let fullPath
            if (currentPath) {
                fullPath = currentPath + '/' + path
            } else {
                fullPath = path
            }
            pfqhUtils.getSpineFileVersion(fullPath, function(version) {
                if (version == null) {
                    version = '3.6'
                }
                if ((!['3.5.35', '3.6', '3.7', '3.8', '4.0', '4.1'].includes(version))) {
                    skinSwitchMessage.show({
                        'type': 'warning',
                        'text': `当前不支持${version}版本的骨骼文件播放`,
                        'duration': 1500
                    });
                    return;
                }

                // 加载当前骨骼
                let dy = animationManager.getAnimation(version)

                let name = path.substring(0, path.lastIndexOf("."))
                let ext = path.substring(path.lastIndexOf(".") + 1)
                let filename
                if (currentPath) {
                    filename = currentPath + '/' + name
                } else {
                    filename = name
                }
                if (!isUpdate) {
                    dy.update({
                        width: decadeUI.get.bodySize().width,
                        height: decadeUI.get.bodySize().height,
                        dpr: Math.max(window.devicePixelRatio * (window.documentZoom ? window.documentZoom : 1), 1),
                    })
                }

                let play = () => {
                    if (skinSwitch.nodePreviewedInfo[filename] === false) return
                    // 播放下一个之前, 保存上一个的node的数据
                    if (currentNode) {
                        skinSwitch.nodePreviewedInfo[currentNode.name] = {
                            x: [0, x / canvas.width],
                            y: [0, y / canvas.height],
                            scale: currentNode.scale,
                            speed: currentNode.speed,
                            angle: currentNode.angle,
                            action: currentNode.skeleton.state.tracks[0].animation.name,
                        }
                    }
                    animationManager.stopSpineAll()
                    let playInfo = {
                        x: [0, 0.65],
                        y: [0, 0.5],
                        name: filename,
                        scale: 0.5,
                        loop: true
                    }
                    let isPreviewed = false
                    if (filename in skinSwitch.nodePreviewedInfo) {
                        playInfo = Object.assign(playInfo, skinSwitch.nodePreviewedInfo[filename])
                        isPreviewed = true
                    }

                    let node = dy.playSpine(playInfo)

                    let state = node.skeleton.state;
                    let activeAnimation = state.tracks[0].animation.name;

                    let checkHasDaiJi = (act) => {
                        // 自动寻找待机标签
                        const idleAction = ['idle', 'daiji', 'play', 'animation']
                        let res = false
                        for (let idle of idleAction) {
                            if (act.toLowerCase().indexOf(idle) !== -1) {
                                res = true
                                break
                            }
                        }
                        return res
                    }
                    if (!isPreviewed && !checkHasDaiJi(activeAnimation)) {
                        for (let i = 1; i < node.skeleton.data.animations.length; i++) {
                            let name = node.skeleton.data.animations[i].name
                            if (checkHasDaiJi(name)) {
                                node.skeleton.state.setAnimation(0, name, true);
                                node.skeleton.setToSetupPose();
                                // 重新计算bounds
                                node.skeleton.updateWorldTransform();
                                node.skeleton.bounds = {
                                    offset: new dy.spineLib.Vector2(),
                                    size: new dy.spineLib.Vector2()
                                };
                                node.skeleton.getBounds(node.skeleton.bounds.offset, node.skeleton.bounds.size, []);

                                break
                            }
                        }
                    }

                    // 自动在屏幕中央
                    let autoFit = (t) => {
                        let canvasW = canvas.width
                        let canvasH = canvas.height
                        let bounds = t.skeleton.bounds
                        // 有些没有插槽, 就无法获取size, 返回默认的size
                        if (!Number.isFinite(t.skeleton.bounds.offset.x)) {
                            initCurrentNodeInfo()
                            return
                        }

                        let centerX = bounds.offset.x + bounds.size.x / 2;
                        let centerY = bounds.offset.y + bounds.size.y / 2;
                        let scaleX = bounds.size.x / canvasW;
                        let scaleY = bounds.size.y / canvasH;
                        let tempScale = Math.max(scaleX, scaleY);
                        tempScale = 1 / tempScale;

                        let width = canvasW / tempScale;
                        let height = canvasH / tempScale;

                        // 手动设置x和y值.
                        let xx = -(centerX - width / 2) / width
                        let yy = 1 - (centerY + height / 2) / height

                        if (tempScale < 1) {
                            t.scale = tempScale * height / width * 1.2
                        } else {
                            t.scale = tempScale * height / width / 1.2
                        }

                        if (bounds.size.x < bounds.size.y) {
                            t.scale = tempScale * height / width / 1.2
                        }

                        if (window.location.hash === '#unique-id') {
                            xx += 0.15
                        }

                        if (picPreviewBg.classList.contains('hidden')) {
                            yy -= 0.07
                        }

                        if (!document.getElementById('previewDetailInfo').classList.contains('hidden')) {
                            xx -= 0.1;
                        }

                        t.x = [0, xx];
                        t.y = [0, yy]

                        // 修改一些全局变量
                        document.getElementById('scale').value = t.scale
                        document.getElementById('posX').value = xx
                        document.getElementById('posY').value = yy
                        scaleSlider.value = t.scale
                        // 手动触发change事件
                        scaleSlider.dispatchEvent(new CustomEvent('input'))
                        x = xx * canvasW
                        y = yy * canvasH
                        scale = tempScale * 1.2
                        initCurrentNodeInfo()
                    }

                    document.getElementById('curVersionText').innerText = `当前版本: ${version}`
                    // 切换当前的骨骼
                    activeSkeleton = node.skeleton
                    currentNode = node
                    // 更新当前骨骼的标签信息
                    init()
                    if (!isPreviewed) {
                        autoFit(node)
                    } else {
                        // 修改一些全局变量
                        let xx = playInfo.x[1]
                        let yy = playInfo.y[1]
                        document.getElementById('scale').value = currentNode.scale
                        document.getElementById('posX').value = xx
                        document.getElementById('posY').value = yy
                        scaleSlider.value = currentNode.scale
                        // 手动触发change事件
                        scaleSlider.dispatchEvent(new CustomEvent('input'))
                        x = xx * canvas.width
                        y = yy * canvas.height
                        scale = playInfo.scale || 1
                        initCurrentNodeInfo()
                    }

                    // 生成缩略图
                    // setTimeout(() => {
                    //     canvas.toBlob(function(blob) {
                    //         let newImg = document.createElement("img")
                    //         previewWindow.appendChild(newImg);
                    //         let url = URL.createObjectURL(blob, 'image/webp', 0.01);
                    //         debugger
                    //
                    //         newImg.onload = function() {
                    //             // no longer need to read the blob so it's revoked
                    //             URL.revokeObjectURL(url);
                    //         }
                    //         newImg.src = url;
                    //         newImg.style.width = '100px'
                    //         newImg.style.height = '100px'
                    //         newImg.style.position = 'absolute'
                    //         newImg.style.top = '500px'
                    //
                    //     });
                    // }, 2000)
                }

                if (dy.hasSpine(filename)) {
                    play()
                } else {
                    dy.loadSpine(filename, ext, () => {
                        play()
                    }, (err, err2) => {
                        console.log('加载骨骼错误', err, err2)
                        let errMsg = ''
                        if (err2 && err2.indexOf('atlas page image') !== -1) {
                            errMsg = '缺少切图'
                        }
                        skinSwitchMessage.show({
                            type: 'warning',
                            text: `加载${filename}错误 ${errMsg}`
                        })
                        skinSwitch.nodePreviewedInfo[filename] = false
                    })
                }

            }, function() {
                skinSwitchMessage.show({
                    'type': 'warning',
                    'text': `获取版本号错误`,
                    'duration': 1500
                })
            })

        }
        let scaleSlider 
        {
            scaleSlider = document.createElement('input')
            scaleSlider.min = '0'
            scaleSlider.max = '3'
            scaleSlider.value = '0.5'
            scaleSlider.type = 'range';

            // scaleSlider = decadeUI.component.slider(0.1, 3, 0.5)
            scaleSlider.setAttribute('step', '0.01')
            let scaleNode = document.getElementById('scale')
            scaleNode.parentNode.insertBefore(scaleSlider, scaleNode)
        }

        let speedSlider 
        {
            speedSlider = document.createElement('input')
            speedSlider.min = '0'
            speedSlider.max = '4'
            speedSlider.type = 'range';
            // speedSlider = decadeUI.component.slider(0, 3, 1)
            speedSlider.setAttribute('step', '0.1')

            let con = document.createElement('span')
            let speedText = document.createElement('span')
            speedText.innerHTML = '速度: 1'
            speedSlider.value = '1'
            con.appendChild(speedText)
            con.appendChild(speedSlider)

            let closePreviewWindow = document.getElementById('closePreviewWindow')
            closePreviewWindow.parentNode.insertBefore(con, closePreviewWindow)

            speedSlider.onchange = function() {
                if (currentNode) {
                    currentNode.speed = speedSlider.value
                }
                speedText.innerHTML = '速度: ' + speedSlider.value
            };

        }
        // 将会包装事件的 debounce 函数
        function debounce(fn, delay) {
            // 维护一个 timer
            let timer = null;

            return function() {
                // 通过 'this' 和 'arguments' 获取函数的作用域和变量
                let context = this;
                let args = arguments;

                clearTimeout(timer);
                timer = setTimeout(function() {
                    fn.apply(context, args);
                }, delay);
            }
        }

        let thunderForbidTouch = function() {
            _status.th_swipe_up = lib.config.swipe_up;
            lib.config.swipe_up = ''
            _status.th_swipe_down = lib.config.swipe_down;
            lib.config.swipe_down = ''
            _status.th_swipe_left = lib.config.swipe_left;
            lib.config.swipe_left = ''
            _status.th_swipe_right = lib.config.swipe_right;
            lib.config.swipe_right = ''
            _status.th_gamePause = ui.click.pause
            ui.click.pause = () => {}
        }

        let thunderAllowTouch = function() {
            if (_status.th_swipe_up) {
                lib.config.swipe_up = _status.th_swipe_up
                lib.config.swipe_down = _status.th_swipe_down
                lib.config.swipe_left = _status.th_swipe_left
                lib.config.swipe_right = _status.th_swipe_right
                ui.click.pause = _status.th_gamePause
            }
        }

        thunderForbidTouch()

        // 拨动动画时长, 跳转到某刻 https://juejin.cn/post/7125409030113067015
        let timeSlider 
        {
            timeSlider = document.createElement('input')
            timeSlider.min = '0'
            timeSlider.max = '1'
            // timeSlider = decadeUI.component.slider(0, 1, 0)
            timeSlider.setAttribute('step', '0.01')
            timeSlider.type = 'range';

            let con = document.createElement('span')
            let text = document.createElement('span')
            text.innerHTML = '进度: 0.00'
            timeSlider.value = '0'
            con.appendChild(text)
            con.appendChild(timeSlider)

            let closePreviewWindow = document.getElementById('closePreviewWindow')
            closePreviewWindow.parentNode.insertBefore(con, scaleSlider.parentNode)

            timeSlider.addEventListener('input', debounce(function(e) {
                text.innerHTML = `进度: ${Number(timeSlider.value).toFixed(2)}`

                // 修改speed为0, 并且跳转到具体的时间
                speedSlider.value = 0
                speedSlider.onchange()

                if (currentNode) {
                    currentNode.speed = speedSlider.value
                    let state = activeSkeleton.state
                    let entry = state.tracks[0]
                    entry.trackTime = Number(timeSlider.value) * entry.animationEnd
                }


            }, 10))
        }

        let angleSlider 
        {
            angleSlider = document.createElement('input')
            angleSlider.min = '0'
            angleSlider.max = '360'
            angleSlider.type = 'range'
            // angleSlider = decadeUI.component.slider(0, 360, 0)
            angleSlider.setAttribute('step', '1')

            let con = document.createElement('span')
            let text = document.createElement('span')
            text.innerHTML = '角度: 0°'
            angleSlider.value = '0'
            con.appendChild(text)
            con.appendChild(angleSlider)

            let closePreviewWindow = document.getElementById('closePreviewWindow')
            closePreviewWindow.parentNode.insertBefore(con, scaleSlider.parentNode)

            angleSlider.onchange = function() {
                text.innerHTML = '角度: ' + angleSlider.value + '°'
                if (currentNode) {
                    currentNode.angle = angleSlider.value
                }
            };

        }

        /* ********** 图集模式相关的定义 开始 **********/
        const picPreviewModeBtn = document.createElement('button')
        picPreviewModeBtn.classList.add('closeBtn')
        picPreviewModeBtn.style.marginLeft = '10px'
        picPreviewModeBtn.innerText = '图集模式'
        let closePreviewWindow = document.getElementById('closePreviewWindow')
        closePreviewWindow.parentNode.insertBefore(picPreviewModeBtn, closePreviewWindow)

        const closeImgPreview = document.getElementById('closeImgPreview')
        const picPreviewBg = document.getElementById('picPreviewBg')

        const previewImgModal = document.getElementById('previewImgModal')
        const modalItemsList = document.getElementById('modalItemsList')
        const modalClose = document.getElementById('closeModal')
        // 滑动条
        const dataProgressBar = document.getElementById('dataProgressBar')
        const previewOperateSpeedCtrl = document.getElementById('previewOperateSpeedCtrl')

        // 详情
        const previewDetailInfo = document.getElementById('previewDetailInfo')
        const previewInfoHideMenu = document.getElementById('previewInfoHideMenu') // 隐藏按钮

        const operateBtn = {
            left: document.getElementById('previewOperateLeft'),
            right: document.getElementById('previewOperateRight'),
            switchAction: document.getElementById('previewOperateQieHuan'), // 快速切换标签
            scaleAdd: document.getElementById('previewOperateFangda'),
            scaleSub: document.getElementById('previewOperateSuoxiao'),
            AngleAdd: document.getElementById('previewOperateNizhuan'),
            alpha: document.getElementById('previewOperateAlpha'),
            action: document.getElementById('previewOperateDonghuaAction'),
            skin: document.getElementById('previewOperatePifu'),
            speed: document.getElementById('previewOperateSpeed'),
            info: document.getElementById('previewOperateInfo'),
        }

        document.getElementById('opFoldTree').listen(() => {
            if (window.location.hash !== '#unique-id') {
                document.getElementById('foldTreeAbtn').click()
                setTimeout(() => {
                    if (lastSelFile) {
                        for (let idx = 0; idx < filesEle.children.length; idx++) {
                            if (lastSelFile === filesEle.children[idx]) {
                                if (idx > 5) {
                                    filesEle.parentNode.scrollTop = 40 * (idx - 5)
                                }
                                break
                            }
                        }
                    }
                }, 100)
            } else {
                document.getElementById('closeTreeModal').click()
            }
        })

        picPreviewModeBtn.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function() {
            // 隐藏原来的按钮, 进入图集模式
            picPreviewBg.classList.remove('hidden')
            previewSpineDom.classList.add('hidden')

        })

        closeImgPreview.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function() {
            picPreviewBg.classList.add('hidden')
            previewSpineDom.classList.remove('hidden')
            previewOperateSpeedCtrl.classList.add('hidden')
        })

        operateBtn.left.listen((e) => {
            let len = currentFoldInfo.curFiles.length
            if (len === 0) return
            if (currentFoldInfo.curFileIndex === -1) currentFoldInfo.curFileIndex = 0
            else {
                if (len === 1) return
                if (currentFoldInfo.curFileIndex === 0) currentFoldInfo.curFileIndex = len - 1
                else currentFoldInfo.curFileIndex--
            }
            currentFoldInfo.curFiles[currentFoldInfo.curFileIndex].dispatchEvent(new CustomEvent(lib.config.touchscreen ? 'touchend' : 'click'))
            // 关闭标签预览页
            closeModalFunc()
        })

        operateBtn.right.listen((e) => {
            let len = currentFoldInfo.curFiles.length
            if (len === 0) return
            if (currentFoldInfo.curFileIndex === -1) currentFoldInfo.curFileIndex = 0
            else {
                if (len === 1) return
                if (currentFoldInfo.curFileIndex === len - 1) currentFoldInfo.curFileIndex = 0
                else currentFoldInfo.curFileIndex++
            }
            currentFoldInfo.curFiles[currentFoldInfo.curFileIndex].dispatchEvent(new CustomEvent(lib.config.touchscreen ? 'touchend' : 'click'))

            closeModalFunc()
        })

        operateBtn.switchAction.listen(() => {
            if (currentNode == null) return
            closeModalFunc()
            // 获取当前角色
            let skeleton = activeSkeleton
            let state = skeleton.state;
            if (skeleton.data.animations.length <= 1) return
            let activeAnimation = state.tracks[0].animation.name;
            let findIndex = 0
            for (let i = 0; i < skeleton.data.animations.length; i++) {
                if (activeAnimation === skeleton.data.animations[i].name) {
                    findIndex = i
                    break
                }
            }

            if (findIndex === skeleton.data.animations.length - 1) {
                findIndex = 0
            } else {
                findIndex++
            }
            state.setAnimationWith(0, skeleton.data.animations[findIndex], true)
            skeleton.setToSetupPose();

            initCurrentNodeInfo()

        })

        skinSwitch.continuousClick(operateBtn.scaleAdd, () => {
            if (!currentNode) return
            currentNode.scale = (Number(currentNode.scale) || 1) + 0.02
            initCurrentNodeInfo(4)
        })

        skinSwitch.continuousClick(operateBtn.scaleSub, () => {
            if (!currentNode) return
            let s = (Number(currentNode.scale) || 1) - 0.02
            if (s <= 0.01) s = 0.01
            currentNode.scale = s

            initCurrentNodeInfo(4)
        })

        skinSwitch.continuousClick(operateBtn.AngleAdd, () => {
            if (!currentNode) return
            currentNode.angle = (Number(currentNode.angle) || 0) + 30
        })

        operateBtn.alpha.listen(function(e) {
            let premultipliedAlpha = document.getElementById('premultipliedAlpha')
            let isSelect = premultipliedAlpha.checked
            if (isSelect) {
                this.classList.remove('alphaSelect')
            } else {
                this.classList.add('alphaSelect')
            }
            currentNode.premultipliedAlpha = !isSelect
            premultipliedAlpha.checked = !premultipliedAlpha.checked
        })

        operateBtn.speed.listen(function(e) {
            previewOperateSpeedCtrl.classList.remove('hidden')
            const maxSpeed = 4
            if (currentNode) {
                let curSpeed = currentNode.speed == null ? 1 : currentNode.speed
                if (curSpeed >= maxSpeed) curSpeed = maxSpeed
                else if (curSpeed <= 0) curSpeed = 0
                let percent = curSpeed / maxSpeed
                progressData.progressBarText.innerText = curSpeed.toFixed(1)
                progressData.progressBarWrap.style.transform = `scaleY(${percent})`
                progressData.progressBarThumb.style.transform = `translateY(-${percent * 78}px)`
            }
            closeModalFunc()

        })

        operateBtn.skin.listen(function(e) {
            if (currentNode == null) return

            if (!previewImgModal.classList.contains('hidden')) {
                if (document.getElementById('previewModalTitle').innerText === '骨骼皮肤') {
                    closeModalFunc()
                    return
                }
            }

            // 获取当前角色
            let skeleton = activeSkeleton;
            let activeSkin = skeleton.skin.name
            let skinsList = []
            for (let i = 0; i < skeleton.data.skins.length; i++) {
                skinsList.push(skeleton.data.skins[i].name)
            }
            document.getElementById('previewModalTitle').innerText = '骨骼皮肤'
            initItemsModal(skinsList, activeSkin, (skinName) => {
                if (!activeSkeleton) return
                let skeleton = activeSkeleton

                try {
                    skeleton.setSkinByName(skinName);
                    skeleton.setSlotsToSetupPose();
                } catch (e) {
                    console.warn('Failed to set skin:', skinName, e);
                    // 如果设置指定皮肤失败，尝试使用默认皮肤
                    if (skeleton.data.defaultSkin) {
                        try {
                            skeleton.setSkin(skeleton.data.defaultSkin);
                            skeleton.setSlotsToSetupPose();
                        } catch (e2) {
                            console.warn('Failed to set default skin:', e2);
                        }
                    }
                }

                initCurrentNodeInfo()
            })
        })

        operateBtn.action.listen((e) => {
            if (currentNode == null) return

            if (!previewImgModal.classList.contains('hidden')) {
                if (document.getElementById('previewModalTitle').innerText === '骨骼标签') {
                    closeModalFunc()
                    return
                }
            }
            // 获取当前角色
            let skeleton = activeSkeleton
            let state = skeleton.state;
            let activeAnimation = state.tracks[0].animation.name;
            let aniList = []
            for (let i = 0; i < skeleton.data.animations.length; i++) {
                aniList.push(skeleton.data.animations[i].name)
            }
            document.getElementById('previewModalTitle').innerText = '骨骼标签'

            initItemsModal(aniList, activeAnimation, (animationName) => {
                if (!activeSkeleton) return
                let skeleton = activeSkeleton
                let state = skeleton.state;
                state.setAnimation(0, animationName, true);
                skeleton.setToSetupPose();

                initCurrentNodeInfo()
            })
        })

        operateBtn.info.listen(function(e) {
            let isHidden = previewDetailInfo.classList.contains('hidden')
            if (isHidden) {
                previewDetailInfo.classList.remove('hidden')
                // 修改样式
                document.getElementById('previewContainer').style.width = '80%'
                document.getElementById('preview-operate').style.width = '80%'
                initCurrentNodeInfo()
            } else {
                // 关闭.
                closeNodeInfo()
            }

        })

        previewInfoHideMenu.listen(function(e) {
            closeNodeInfo()
        })

        // 初始化当前节点的基本信息
        const initCurrentNodeInfo = (index) => {
            // 获取各个节点
            let contentNodes = previewDetailInfo.getElementsByClassName('content')
            let currentAni = currentNode.skeleton.state.tracks[0].animation
            if (currentNode) {
                if (index == null) {
                    contentNodes[0].innerText = lastSelFile.getAttribute('path')
                    contentNodes[1].innerText = document.getElementById('curVersionText').innerText
                    contentNodes[2].innerText = currentAni.duration.toFixed(1)
                    contentNodes[3].innerText = `标签: ${currentAni.name}, 皮肤: ${currentNode.skeleton.skin.name}`
                    let speed
                    if (currentNode.speed == null) {
                        speed = 1.0
                    } else {
                        speed = Number(currentNode.speed).toFixed(1)
                    }
                    contentNodes[4].innerText = `大小: ${Number(currentNode.scale).toFixed(2)}, 速度: ${speed}`
                } else {
                    switch (index) {
                        case 0:
                            contentNodes[0].innerText = lastSelFile.getAttribute('path')
                            break
                        case 1:
                            contentNodes[1].innerText = document.getElementById('curVersionText').innerText
                            break
                        case 2:
                            contentNodes[2].innerText = currentAni.duration.toFixed(1)
                            break
                        case 3:
                            contentNodes[3].innerText = `标签: ${currentAni.name}, 皮肤: ${currentNode.skeleton.skin.name}`
                            break
                        case 4:
                            let speed
                            if (currentNode.speed == null) {
                                speed = 1.0
                            } else {
                                speed = Number(currentNode.speed).toFixed(1)
                            }
                            contentNodes[4].innerText = `大小: ${Number(currentNode.scale).toFixed(2)}, 速度: ${speed}`
                            break
                    }
                }

            }
        }

        const closeNodeInfo = () => {
            document.getElementById('previewContainer').style.width = '100%'
            document.getElementById('preview-operate').style.width = '100%'
            previewDetailInfo.classList.add('hidden')
        }

        // 调节速度的滚动条事件
        let progressData = {
            isDown: false,
            posY: 0,
            progressBarText: dataProgressBar.previousElementSibling,
            progressBarWrap: dataProgressBar.getElementsByClassName('bui-bar-normal')[0],
            progressBarThumb: dataProgressBar.getElementsByClassName('bui-thumb')[0],

        }
        dataProgressBar.addEventListener(lib.config.touchscreen ? 'touchstart' : 'mousedown', function(e) {
            e.stopPropagation()
            progressData.isDown = true
            picPreviewBg.isTouching = false
            if (e.touches && e.touches.length) {
                progressData.posY = e.touches[0].clientY
            } else {
                progressData.posY = e.clientY
            }
        })
        picPreviewBg.addEventListener(lib.config.touchscreen ? 'touchstart' : 'mousedown', function(e) {
            if (!progressData.isDown) {
                previewOperateSpeedCtrl.classList.add('hidden')
            }
        })

        picPreviewBg.addEventListener(lib.config.touchscreen ? 'touchmove' : 'mousemove', function(e) {
            if (!progressData.isDown) return
            let deltaY, curY
            if (e.touches && e.touches.length) {
                curY = e.touches[0].clientY
            } else {
                curY = e.clientY
            }
            deltaY = curY - progressData.posY
            const maxSpeed = 4
            if (currentNode) {
                let curSpeed = currentNode.speed == null ? 1 : currentNode.speed
                curSpeed = -deltaY / 60 * 4 + curSpeed
                if (curSpeed >= maxSpeed) curSpeed = maxSpeed
                else if (curSpeed <= 0) curSpeed = 0
                let percent = curSpeed / maxSpeed
                progressData.progressBarText.innerText = curSpeed.toFixed(1)
                progressData.progressBarWrap.style.transform = `scaleY(${percent})`
                progressData.progressBarThumb.style.transform = `translateY(-${percent * 78}px)`

                currentNode.speed = curSpeed
            }
            progressData.posY = curY
        })

        picPreviewBg.addEventListener(lib.config.touchscreen ? 'touchend' : 'mouseup', function(e) {
            if (progressData.isDown) {
                initCurrentNodeInfo(4)
            }
            progressData.isDown = false

        })

        picPreviewBg.addEventListener(lib.config.touchscreen ? 'touchcancel' : 'mouseleave', function(e) {
            progressData.isDown = false
        })

        modalClose.listen(() => {
            closeModalFunc()
        })

        // 新的双指放大缩小与滑动功能
        function mouseupEvent(event) {
            picPreviewBg._mouseup(event);
        }

        function mousemoveEvent(event) {
            if (event) {
                if (event.touches && event.touches.length) {
                    picPreviewBg._mousemove(event.touches[0].clientX, event.touches[0].clientY);
                } else picPreviewBg._mousemove(event.clientX, event.clientY);
            }
        }

        function mousedownEvent(event) {
            if (event) {
                // 清空之前的数据
                if (this.posX) delete this.posX
                if (this.posY) delete this.posY
                if (event.touches && event.touches.length) picPreviewBg._mousedown(event.touches[0].clientX, event.touches[0].clientY);
                else picPreviewBg._mousedown(event.clientX, event.clientY);
            }
        }
        picPreviewBg._mousedown = function(x, y) {
            this.posX = x
            this.posY = y
            this.isTouching = true
        }
        picPreviewBg._mousemove = function(clientX, clientY) {
            if (!this.isTouching) return;
            let deltaX = clientX - this.posX;
            let deltaY = clientY - this.posY;
            x += deltaX
            y -= deltaY
            let vx = x / canvas.width
            let vy = y / canvas.height

            if (currentNode) {
                currentNode.x = [0, vx]
                currentNode.y = [0, vy]
            }
            this.posX = clientX
            this.posY = clientY
        }
        picPreviewBg._mouseup = function(event) {
            this.isTouching = false;
            delete this.posX;
            delete this.posY;
        }
        picPreviewBg.addEventListener('touchstart', mousedownEvent, true);
        picPreviewBg.addEventListener('touchend', mouseupEvent, true);
        picPreviewBg.addEventListener('touchcancel', mouseupEvent, true);
        picPreviewBg.addEventListener('touchmove', mousemoveEvent, true);
        picPreviewBg.addEventListener('mousedown', mousedownEvent, true);
        picPreviewBg.addEventListener('mouseup', mouseupEvent, true);
        picPreviewBg.addEventListener('mouseleave', mouseupEvent, true);
        picPreviewBg.addEventListener('mousemove', mousemoveEvent, true);

        // 监听图集事件的滚轮缩放事件
        picPreviewBg.addEventListener('wheel', debounce(function(e) {
            let ratio = 0.05;
            // 缩小

            let scale = Number(scaleSlider.value)

            if (e.deltaY > 0) {
                ratio = -0.05;
            }
            scale = scale + ratio;
            // 限制缩放倍数
            if (scale < 0.05) scale = 0.05
            scaleSlider.value = scale.toString()
            // 手动触发change事件
            if (currentNode) {
                currentNode.scale = scaleSlider.value
            }
            document.getElementById('scale').value = scaleSlider.value;
            initCurrentNodeInfo(4)
            // e.preventDefault();
        }, 0))


        const closeModalFunc = () => {
            previewImgModal.classList.add('hidden')
            modalItemsList.innerHTML = '' // 清空数据
        }

        const initItemsModal = (itemList, selectItem, func) => {
            previewImgModal.classList.remove('hidden')
            modalItemsList.innerHTML = ''
            itemList.forEach(item => {
                let it = document.createElement('div')
                it.classList.add('actionItemTagOuter')
                it.innerHTML = `<span class="actionItemTag"><i class="iconfont icon-collect actionItemTagIcon" ></i>${item}</span>`
                modalItemsList.appendChild(it)
                it.setAttribute('value', item)

                if (selectItem === item) {
                    it.getElementsByTagName('span')[0].classList.add('selectItemTag')
                }
                it.listen(function(e) {
                    skinSwitch.refreshDomList(
                        Array.from(modalItemsList.children).map(v => v.getElementsByTagName('span')[0]),
                        'selectItemTag',
                        this.getElementsByTagName('span')[0]
                    )
                    func(this.getAttribute('value'))
                })
            })
        }

        /* ******************** 图集模式相关的定义 结束 ********************/

        // 当拖拽的时候pan事件触发 拖拽事件
        at.on('pan', (e) => {
            if (e.nativeEvent.touches && e.nativeEvent.touches.length > 1) return
            // e包含位移/速度/方向等信息
            // 获取x,y偏移
            let deltaX = e.deltaX
            let deltaY = e.deltaY
            x += deltaX
            y -= deltaY
            let vx = x / canvas.width
            let vy = y / canvas.height
            px.value = vx.toString()
            py.value = vy.toString()
            if (currentNode) {
                currentNode.x = [0, vx]
                currentNode.y = [0, vy]
            }
        })

        at.on(['pinchin', 'pinchout'], debounce((e) => {
            // e包含位移/速度/方向等信息
            // 获取x,y偏移
            // scale *= e.scale
            if (e.scale > 1) scale += 0.1
            else if (e.scale < 1) scale -= 0.1
            scaleSlider.value = scale
            // 手动触发change事件
            scaleSlider.dispatchEvent(new CustomEvent('input'));
            e.preventDefault();
        }, 250))

        canvas.addEventListener('wheel', debounce(function(e) {
            let ratio = 0.05;
            // 缩小

            let scale = Number(scaleSlider.value)

            if (e.deltaY > 0) {
                ratio = -0.05;
            }
            scale = scale + ratio;
            // 限制缩放倍数
            if (scale < 0.05) scale = 0.05
            scaleSlider.value = scale.toString()
            // 手动触发change事件
            if (currentNode) {
                currentNode.scale = scaleSlider.value
            }
            document.getElementById('scale').value = scaleSlider.value;
            // e.preventDefault();
        }, 0))

        document.getElementById('closePreviewWindow').addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function() {
            // 删除自己当前节点即可
            let self = background
            // let self = document.getElementById('previewWindowDiv')
            let parent = self.parentElement
            // 停止当前的render
            isClosed = true
            thunderAllowTouch()
            setTimeout(() => {
                // 延时删除节点, 等待最后一次渲染完成
                parent.removeChild(self)
            }, 200)
        })

        function init() {

            if (!activeSkeleton) {
                return
            }

            document.getElementById('scale').oninput = function(e) {
                let v = e.srcElement.value
                if (scaleSlider) {
                    scaleSlider.value = v
                    scale = Number(v)
                }
                if (currentNode) {
                    currentNode.scale = Number(v) || 0.5
                }

            }
            document.getElementById('posX').oninput = function(e) {
                let v = e.srcElement.value
                if (currentNode) {
                    currentNode.y = [0, Number(v) || 0.65]
                }
            }
            document.getElementById('posY').oninput = function(e) {
                let v = e.srcElement.value
                if (currentNode) {
                    currentNode.y = [0, Number(v) || 0.5]
                }

            }

            document.getElementById('premultipliedAlpha').onchange = function(e) {
                if (currentNode) {
                    currentNode.premultipliedAlpha = e.target.checked
                }
            }

            document.getElementById('flipX').onchange = function(e) {
                if (currentNode) {
                    currentNode.flipX = e.target.checked
                }
            }
            document.getElementById('flipY').onchange = function(e) {
                if (currentNode) {
                    currentNode.flipY = e.target.checked
                }
            }


            scaleSlider.oninput = function() {
                // let v= s1.value / 8;
                if (currentNode) {
                    currentNode.scale = scaleSlider.value
                }
                document.getElementById('scale').value = scaleSlider.value;
            }

            let setupAnimationUI = () => {
                // 初始化骨骼数据
                if (!activeSkeleton) {
                    return
                }
                let animationList = document.getElementById('animationList')
                animationList.options.length = 0

                let skeleton = activeSkeleton
                let state = skeleton.state;
                let activeAnimation = state.tracks[0].animation.name;
                for (let i = 0; i < skeleton.data.animations.length; i++) {
                    let name = skeleton.data.animations[i].name;
                    let option = document.createElement('option')
                    option.setAttribute('value', name)
                    option.text = name
                    if (name === activeAnimation) {
                        option.setAttribute('selected', 'selected')
                        document.getElementById('aniTime').innerText = Number(skeleton.data.animations[i].duration).toFixed(1)
                    }
                    animationList.options.add(option)
                }

                animationList.onchange = function() {
                    let skeleton = activeSkeleton
                    let state = skeleton.state;
                    let animationName = animationList.options[animationList.selectedIndex].text
                    skeleton.setToSetupPose();
                    state.setAnimation(0, animationName, true);
                    let ani = skeleton.data.findAnimation(animationName)
                    document.getElementById('aniTime').innerText = Number(ani.duration).toFixed(1)
                }
            }

            let setupSkinUI = function() {
                if (!activeSkeleton) {
                    return
                }

                let skinList = document.getElementById('skinList')
                skinList.options.length = 0

                let skeleton = activeSkeleton
                let skins = skeleton.data.skins

                for (let i = 0; i < skins.length; i++) {
                    let name = skins[i].name;
                    let option = document.createElement('option')
                    option.setAttribute('value', name)
                    option.text = name
                    if (i === 0) {
                        option.setAttribute('selected', 'selected')
                        document.getElementById('aniTime').innerText = Number(skeleton.data.animations[i].duration).toFixed(1)
                    }
                    skinList.options.add(option)
                }

                skinList.onchange = function() {
                    let skeleton = activeSkeleton
                    let skinName = skinList.options[skinList.selectedIndex].text
                    try {
                        skeleton.setSkinByName(skinName);
                        skeleton.setSlotsToSetupPose();
                    } catch (e) {
                        console.warn('Failed to set skin:', skinName, e);
                        // 如果设置指定皮肤失败，尝试使用默认皮肤
                        if (skeleton.data.defaultSkin) {
                            try {
                                skeleton.setSkin(skeleton.data.defaultSkin);
                                skeleton.setSlotsToSetupPose();
                            } catch (e2) {
                                console.warn('Failed to set default skin:', e2);
                            }
                        }
                    }
                }
            }

            setupAnimationUI()
            setupSkinUI()

            // 初始化xy坐标
            x = 0.65 * canvas.width
            y = 0.5 * canvas.height
            scaleSlider.value = 0.5
            document.getElementById('scale').value = 0.5
            currentNode.premultipliedAlpha = document.getElementById('premultipliedAlpha').checked
            currentNode.flipX = document.getElementById('flipX').checked
            currentNode.flipY = document.getElementById('flipY').checked
        }
    },



    // todo: 通过点击角色身上的按钮,打开设置动皮的变身事件
    openEventBindWindow: function(player, isPrimary) {

        const eventBindWindow = ui.create.div('.eventBindWindow', document.body)
        const eventBindToolBox = ui.create.div('.eventBindToolBox', eventBindWindow)
        const toolItems = ui.create.div('.toolItems', eventBindToolBox)

        const triggerSelectOut = ui.create.div('.triggerSelectOut', toolItems)
        const transformBtn = ui.create.div('.transformBtn .eventBindButton .success', toolItems)
        const playEffectBtn = ui.create.div('.playEffectBtn .eventBindButton .success', toolItems)
        const previewBtn = ui.create.div('.previewBtn .eventBindButton .success', toolItems)
        const saveEffect = ui.create.div('.eventBindButton .success', toolItems)
        const exit = ui.create.div('.eventBindButton .success', toolItems)
        triggerSelectOut.innerHTML = `
                        <select id="triggerSelect" class="triggerSelect"></select> 
                    `
        const triggerSelect = document.getElementById('triggerSelect')
        transformBtn.innerText = '变换'
        playEffectBtn.innerText = '播放特效'
        previewBtn.innerText = '预览'
        saveEffect.innerText = '保存'
        exit.innerText = '退出'

        const transformContent = ui.create.div('.transformContent', eventBindWindow)
        const contentHeaders = ui.create.div('.contentHeaders', transformContent) // 内容区域的选项区域
        const contentArea = ui.create.div('.contentArea', transformContent) // 内容区域真正内容

        const transTemps = document.createElement('select')
        contentHeaders.appendChild(transTemps)
        const sameSkel = ui.create.div('.eventBindButton', contentHeaders)
        const diffSkel = ui.create.div('.eventBindButton', contentHeaders)
        const newTemp = ui.create.div('.eventBindButton', contentHeaders)


        sameSkel.innerText = '同骨骼'
        diffSkel.innerText = '不同骨骼'
        newTemp.innerText = '新建'

        // 初始化预览播放器, 共用十周年UI定义的播放器的canvas
        if (!skinSwitch.animationManager) {
            skinSwitch.animationManager = new AnimationManager(lib.assetURL + 'extension/十周年UI/assets/animation/', dcdAnim.canvas, 988888, {
                offscreen: false
            })
        }
        const am = skinSwitch.animationManager

        // 一些常量
        const dyskins = decadeUI.dynamicSkin
        const dyskinKeys = Object.keys(dyskins)

        // 一些初始化函数
        const initOptions = (selectDom, keyValueMap, func) => {
            selectDom.options.length = 0
            for (let k in keyValueMap) {
                let text = keyValueMap[k]
                let option = document.createElement('option')
                option.setAttribute('value', k)
                option.text = text
                selectDom.options.add(option)
            }
            if (func) {
                selectDom.onchange = function(e) {
                    func(this.options[this.selectedIndex].value, e)
                }
            }

        }

        // 初始化同骨骼的内容
        const initSameSkelInfo = () => {
            contentArea.innerHTML = `
                            <div class="sameBox">
                                <div class="sameBoxItem">
                                    <div class="label">标签</div>
                                    <select id="sameActionSelect" class="sameActionSelect"></select> 
                                </div>
                                <div class="sameBoxItem">
                                    <div class="label">皮肤</div>
                                    <select id="sameSkinSelect" class="sameSkinSelect"></select> 
                                </div>
                                <div class="sameBoxItem">
                                    <div class="label">血量</div>
                                    <select id="sameHpSelect" class="sameHpSelect"></select> 
                                    <input type="text">
                                </div>
                            </div>
                        `
        }

        let transformTempKV = {
            变身1: '变身1',
            变身2: '变身2',
        }
        initOptions(transTemps, transformTempKV)
        // 初始化不同骨骼的内容
        const initDiffSkelInfo = () => {
            contentArea.innerHTML = `
                            <div class="adjustBox">
                                <div class="title">角色调整</div>
                                <div class="closeBtn">×</div>
                                <div class="btnGroup">
                                    <div class="btnItem" id="daijiBtn">调整待机</div>
                                    <div class="btnItem" id="beijingBtn">调整背景</div>
                                    <div class="btnItem" id="qianjingBtn">调整前景</div>
                                    <div class="btnItem" id="chukuangBtn">调整出框</div>
                                    <div class="btnItem" id="chuchangBtn">调整出场</div>
                                    <div class="btnItem" id="teshuBtn">调整特殊</div>

                                </div>
                                <div class="bottomBtns">
                                    <div class="btnItem" id="saveBtn">保存</div>
                                    <div class="btnItem" id="cancelBtn">返回</div>
                                </div>
                            </div>
                        `
            const daijiBtn = document.getElementById('daijiBtn')
            const beijingBtn = document.getElementById('beijingBtn')
            const qianjingBtn = document.getElementById('qianjingBtn')
            const chukuangBtn = document.getElementById('chukuangBtn')
            const chuchangBtn = document.getElementById('chuchangBtn')
            const teshuBtn = document.getElementById('teshuBtn')

            const saveBtn = document.getElementById('saveBtn')
            const cancelBtn = document.getElementById('cancelBtn')
            const closeBtn = document.querySelector('.closeBtn')

            // 当前选中的按钮
            let currentBtn = null

            // 按钮点击处理函数
            const handleBtnClick = (btn, mode) => {
                if (currentBtn) {
                    currentBtn.classList.remove('btnSelect')
                }
                btn.classList.add('btnSelect')
                currentBtn = btn
                currentMode = mode // 设置当前模式

                // 显示调整界面
                showAdjustBar()
                showShizi(true)
                initPosParams()

                // 播放对应动画
                if (mode === 'chuchang') {
                    skinSwitch.chukuangWorkerApi.chukuangAction(player, 'chuchang')
                } else if (mode === 'chukuang') {
                    skinSwitch.chukuangWorkerApi.chukuangAction(player, 'GongJi')
                } else if (mode === 'teshu') {
                    skinSwitch.chukuangWorkerApi.chukuangAction(player, 'TeShu')
                } else if (mode === 'zhishixian') {
                    // 播放指示线动画，需要模拟攻击事件来触发指示线
                    playZhishixianAnimation()
                } else {
                    selfLoopPlay(mode)
                }
            }

            // 保存按钮
            saveBtn.addEventListener('click', () => {
                // 保存当前调整
                saveCurrentModeAdjustment()

                // 只保存当前模式的调整参数
                saveToFile(true) // 传入true表示显示保存消息

                // 从临时调整中移除当前已保存的模式
                if (tempAdjustments[currentMode]) {
                    delete tempAdjustments[currentMode]
                }
            })

            // 取消按钮
            cancelBtn.addEventListener('click', () => {
                // 隐藏调整界面
                hide(editBox)
            })

            // 关闭按钮
            closeBtn.addEventListener('click', () => {
                // 隐藏调整界面
                hide(editBox)
            })



            const lettersList = ['ABCDEFGHIJKLM', 'NOPQRSTUVWXYZ']
            const defaultTransformDir = 'extension/千幻聆音/effects/transform'

            searchPlayerIdBtn.listen(function(e) {
                let inputVal = this.previousElementSibling.value
                let wujiangIds = searchWuJiangId(inputVal)
                initWuJiangIds(wujiangIds)
                refreshSelectLetter(null)
            })

            for (let i = 0; i < 2; i++) {
                const letterChild = letterDiv.children[i]
                const letters = lettersList[i]

                for (let t of letters) {
                    let span = document.createElement('span')
                    span.innerText = t
                    span.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function() {
                        let letter = this.innerText
                        let wujiangIds = searchWuJiangId(letter, true)
                        refreshSelectLetter(letter)
                        // 改变下面的武将id列表
                        initWuJiangIds(wujiangIds)

                    })
                    letterChild.appendChild(span)
                }
            }

            const refreshSelectLetter = (selected) => {
                for (let i = 0; i < 2; i++) {
                    const letterChild = letterDiv.children[i]
                    for (let span of letterChild.children) {
                        if (span.innerText === selected) {
                            span.classList.add('firstActive')
                        } else {
                            span.classList.remove('firstActive')
                        }
                    }
                }
            }

            const initWuJiangIds = (wujiangIds) => {
                for (let i = wujiangIdList.children.length - 1; i >= 0; i--) {
                    wujiangIdList.children[i].remove()
                }
                for (let i = 0; i < wujiangIds.length; i++) {
                    let idDiv = ui.create.div('.wujiangIdItem', wujiangIdList);
                    idDiv.style.cursor = 'pointer';
                    idDiv.innerText = wujiangIds[i];
                    idDiv.listen(function() {
                        // 更新当前武将所对应的皮肤.
                        let wujiangId = this.innerText
                        const skins = decadeUI.dynamicSkin[wujiangId]
                        let keys = Object.keys(skins)
                        let keysMap = {}
                        for (let k of keys) {
                            keysMap[k] = k
                        }
                        initOptions(wujiangSkinSelect, keysMap)
                    });
                }
            }

            // 获取所有的切换骨骼特效
            const initTransformEffect = () => {
                let allEffects = {}
                for (let k in skinSwitch.effects.transformEffects) {
                    allEffects[k] = Object.assign({}, skinSwitch.effects.transformEffects[k])
                }
                pfqhUtils.getFoldsFiles(defaultTransformDir, function(file, path) {
                    let suffixes = ['.json', '.skel']
                    for (let suf of suffixes) {
                        if (file.endsWith(suf)) {
                            return true
                        }
                    }
                    return false
                }, function(folds, files) {
                    // 获取所有的特效
                    for (let f of files) {
                        let name = f.substring(0, f.lastIndexOf("."))
                        let ext = f.substring(f.lastIndexOf(".") + 1)
                        if (name in allEffects) {

                        } else {
                            allEffects[name] = {
                                scale: 0.5, // 默认的参数值
                                speed: 1,
                                delay: 0.3,
                                json: ext === 'json'
                            }
                        }
                    }
                    let optionKeys = {}
                    for (let k in allEffects) {
                        optionKeys[k] = k
                    }
                    initOptions(transEffectSelect, optionKeys, function(key, e) {
                        let eff = allEffects[key]
                        if (eff) {
                            transItemScale.value = eff.scale || 0.5
                            transItemDelay.value = eff.delay || 0.3
                            transItemSpeed.value = eff.speed || 1
                            transItemAngle.value = eff.angle || 0
                            if (eff.x) {
                                transItemX.value = eff.x[1]
                            } else {
                                transItemX.value = null
                            }
                            if (eff.y) {
                                transItemY.value = eff.y[1]
                            } else {
                                transItemY.value = null
                            }
                        }
                    })

                })
            }

            setTimeout(() => {
                initTransformEffect()
            }, 2000)

        }

        const searchWuJiangId = (str, isFirstLetter = false) => {
            if (isFirstLetter) {
                return dyskinKeys.filter(v => {
                    return v[0].toLowerCase() === str.toLowerCase()
                })
            }
            return dyskinKeys.filter(v => {
                return v.toLowerCase().indexOf(str.toLowerCase()) !== -1
            })
        }

        // const playEffectContent = ui.create.div('.playEffectContent', eventBindWindow)

        const triggerConstant = {
            lowhp: '血量变化',
            jisha: '击杀',
            changeGroup: '改变势力',
            juexing: '觉醒技',
            xiandingji: '限定技',
            zhuanhuanji: '转换技',
            damage: '受伤次数',
        }

        initOptions(triggerSelect, triggerConstant)

        // initSameSkelInfo()
        initDiffSkelInfo()

    },

    // 管理滑动事件 status: true  -> 开启
    allowTouchEvent: function(status) {
        let thunderForbidTouch = function() {
            _status.th_swipe_up = lib.config.swipe_up;
            lib.config.swipe_up = ''
            _status.th_swipe_down = lib.config.swipe_down;
            lib.config.swipe_down = ''
            _status.th_swipe_left = lib.config.swipe_left;
            lib.config.swipe_left = ''
            _status.th_swipe_right = lib.config.swipe_right;
            lib.config.swipe_right = ''
            _status.th_gamePause = ui.click.pause
            ui.click.pause = () => {}
        }

        let thunderAllowTouch = function() {
            if (_status.th_swipe_up) {
                lib.config.swipe_up = _status.th_swipe_up
                lib.config.swipe_down = _status.th_swipe_down
                lib.config.swipe_left = _status.th_swipe_left
                lib.config.swipe_right = _status.th_swipe_right
                ui.click.pause = _status.th_gamePause
            }
        }
        if (status) {
            thunderAllowTouch()
        } else {
            thunderForbidTouch()
        }
    },

    // 覆盖menu菜单
    overrideExtL2dMenuItem: function() {
        // 修改配置, 只获取前10个
        let count = 10
        if (window.pfqhLive2dSettings) {
            let newItem = {};
            for (let k in pfqhLive2dSettings.models) {
                if (!count) break
                count--
                newItem[k] = pfqhLive2dSettings.models[k].name || k
            }

        }
    },
    /**
     * 使用requestAnimationFrame函数来等待某个退出条件, 主要用来等待十周年Ui这种扩展执行完成, 然后执行之后的逻辑.
     * @param conditionFunc  达到条件, 执行execFunc的内容
     * @param execFunc  执行的内容
     */
    waitUntil: function(conditionFunc, execFunc) {
        if (conditionFunc()) {
            execFunc()
        } else {
            requestAnimationFrame(function() {
                skinSwitch.waitUntil(conditionFunc, execFunc)
            })
        }
    },

    // 刷新设置一组dom只有一个active状态.
    refreshDomList: function(domList, activeClass, activeItem) {
        for (let dom of domList) {
            if (dom === activeItem) {
                dom.classList.add(activeClass)
            } else {
                dom.classList.remove(activeClass)
            }
        }
    },
    // 封装长按事件
    continuousClick: function(dom, func) {
        const downEvent = lib.config.touchscreen ? 'touchstart' : 'mousedown'
        const upEvent = lib.config.touchscreen ? 'touchend' : 'mouseup'
        const cancelEvent = lib.config.touchscreen ? 'touchcancel' : 'mouseleave'

        let downFunc = function(e) {
            // 改变骨骼的位置
            //获取鼠标按下时的时间
            let t = setInterval((e) => {
                func(e, ++downFunc._times)
            }, 120)
            clearInterval(downFunc.timer)
            downFunc.timer = t
            downFunc._times = 0 // 表示触发了多少次
            func(e, ++downFunc._times) // 立马执行一次
        }
        let holdUp = function() {
            clearInterval(downFunc.timer);
            downFunc._times = 0
        }

        dom.addEventListener(downEvent, downFunc)
        dom.addEventListener(upEvent, holdUp)
        dom.addEventListener(cancelEvent, holdUp)

    }
}
export const skinSwitch = window.skinSwitch;