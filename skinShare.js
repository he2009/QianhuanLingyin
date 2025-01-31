'use strict';
window.qhly_import(function (lib, game, ui, get, ai, _status) {
    lib.qhly_skinShare = {
		xin_liaohua:{//廖化
			name:'liaohua',
			skill:{
				redangxian:"dangxian",
				refuli:'fuli',
			},
		},
		re_liaohua:{//廖化
			name:'liaohua',
			skill:{
				xindangxian:"dangxian",
				xinfuli:'fuli',
			},
		},
		ol_liaohua:{//廖化
			name:'liaohua',
			skill:{
				ol_dangxian:"dangxian",
				ol_fuli:'fuli',
			},
		},
		ty_liaohua:{//廖化
			name:'liaohua',
			skill:{
				tydangxian:"dangxian",
				tyfuli:'fuli',
			},
		},
		sb_guohuai:{//郭淮
			name:"xin_guohuai",
			skills:{
				sbjingce:"mobilejingce",
			},
		},
		re_guohuai:{//郭淮
			name:"xin_guohuai",
			skills:{
				decadejingce:"mobilejingce",
			},
		},
		tw_guohuai:{//郭淮
			name:"xin_guohuai",
			skills:{
				twjingce:"mobilejingce",
			},
		},
		junk_zhangjiao:{//神张角
			name:'shen_zhangjiao',
			skill:{
				junksijun:'sijun',
			},
		},
		tw_zhangning:{//张宁
			name:"zhangning",
			skills:{
				twxingzhui:'tianze',
				twjuchen:'difa',
			},
		},
		ol_caochong: {//曹冲
		    name: 're_caochong',
		    skills: {
		        olrenxin: 'rerenxin',           
		        olchengxiang: 'rechengxiang',           
		    },
		}, 
		ol_wuguotai: {
		    name: 'wuguotai',
		    skills: {
		        olbuyi: 'buyi',
		        olganlu: 'ganlu',           
		    }                                    
		},  
		dc_sp_menghuo:{//sp孟获
			name:'sp_menghuo',
			skills:{
				dcmanwang:'spmanwang',
				dcpanqin:'sppanqin',
			},
		},
		dc_hujinding:{//胡金定
			name:"hujinding",
			skills:{
				dcdeshi:'renshi',
				dcwuyuan:'wuyuan',
			},
		},
		ol_dingshangwan:{//丁尚浣
			name:'dingshangwan',
			skills:{
				olfengyan:'dcfengyan',
				olfudao:'dcfudao',
			},
		},
		ol_zhangchunhua: {//张春华
		    name: 're_zhangchunhua',
		    skills: {
		        jueqing: 'rejueqing',
		        shangshi: 'reshangshi',
		    },
		},
		ol_wangyi:{//王异
			name:'re_wangyi',
			skills:{
				olzhenlie:'zhenlie',
				olmiji:'miji',
			},
		},
		ol_yanwen: {//颜良文丑
		    name: 'yanwen',
		    skills: {
		        olshuangxiong: 'shuangxiong',
		    },
		},
		ol_weiyan: {//魏延
		    name: 're_weiyan',
		    skills: {
		        xinkuanggu: 'xinkuanggu',
		        reqimou: 'qimou',
		    },
		},
		ol_huangzhong: {//黄忠
		    name: 'huangzhong',
		    skills: {
		        xinliegong: 'liegong',
		    },
		},
		guansuo: {//关索
		    name: 'dc_guansuo',
		    skills: {
		        zhengnan: 'xinzhengnan',
		        xiefang: 'xiefang',
		        new_rewusheng: 'new_rewusheng',
		        dangxian: 'xindangxian',
		        rezhiman: 'rezhiman',
		    },
		},
		ol_wanglang: {//王朗
		    name: 'wanglang',
		    skills: {
		        gushe: 'regushe',
		        oljici: 'rejici',
		    },
		},
		ol_lusu: {//鲁肃
		    name: 're_lusu',
		    skills: {
		        olhaoshi: 'haoshi',
		        oldimeng: 'dimeng',
		    },
		},
		ol_lingtong: {//凌统
		    name: 'lingtong',
		    skills: {
		        olxuanfeng: 'xuanfeng',
		    },
		},
		ol_zhangzhang: {//张昭张纮
		    name: 'zhangzhang',
		    skills: {
		        olzhijian: 'zhijian',
		        olguzheng: 'guzheng',       
		                     
		    },
		},
		ol_fazheng: {//法正
		    name: 're_fazheng',
		    skills: {
		        olenyuan: 'reenyuan',
		        olxuanhuo: 'rexuanhuo',
		    },
		},
		ol_caozhi:{//曹植
			name:'caozhi',
			skills:{
				oljiushi:'jiushi',
				reluoying:'luoying',
			},
		},
		ol_caifuren:{//蔡夫人
			name:'caifuren',
			skills:{
				olqieting:'qieting',
				olxianzhou:'xianzhou',
			},
		},
		re_caifuren: {//蔡夫人
		    name: 'caifuren',
		    skills: {
		        reqieting: 'qieting',
		        rexianzhou: 'xianzhou',
		    },
		},
		xin_caifuren: {//蔡夫人
		    name: 'caifuren',
		    skills: {
		        xinqieting: 'qieting',
		        xianzhou: 'xianzhou',
		    },
		},
		ol_liru:{//李儒
			name:'xin_liru',
			skills:{
				olmieji:'xinmieji',
				dcfencheng:'xinfencheng',
				oljuece:'xinjuece',
			},
		},
		ol_pangtong: {//庞统
		    name: 'pangtong',
		    skills: {
		        ollianhuan: 'lianhuan',
		        olniepan: 'niepan',
		    },
		},
		ol_sunce: {//孙策
		    name: 'sunce',
		    skills: {
		        oljiang: 'jiang',
		        olhunzi: 'hunzi',
		        olzhiba: 'zhiba',
		        olyingzi: 'reyingzi',
		        gzyinghun: 'gzyinghun',
		    },
		},
		ol_liubiao: {//刘表
		    name: 'xin_liubiao',
		    skills: {
		        olzishou: 'decadezishou',
		        olzongshi: 'decadezongshi', 
		    },
		},
		re_caorui:{//曹叡
			name:'caorui',
			skills:{
				huituo:'huituo',
				remingjian:'mingjian',
				xingshuai:'xingshuai',
			},
		},
		xin_simayi:{//神司马懿
			name:'shen_simayi',
			skills:{
				xinrenjie:'renjie',
				xinbaiyin:'sbaiyin',
				xinlianpo:'lianpo',
				xinjilve:'jilue',
				reguicai:'jilue_guicai',
				fangzhu:'jilue_fangzhu',
				rejizhi:'jilue_jizhi',
				rezhiheng:'jielue_zhiheng',
				rewansha:'jilue_wansha',
			},
		},
		new_simayi:{//神司马懿
			name:'shen_simayi',
			skills:{
				jilin:'renjie',
				yingtian:'sbaiyin',
				lianpo:'lianpo',
				yingyou:'jielue_zhiheng',
				reguicai:'jilue_guicai',
				fangzhu:'jilue_fangzhu',
				rejizhi:'jilue_jizhi',
				rezhiheng:'jielue_zhiheng',
				rewansha:'jilue_wansha',
			},
		},
		ini_shen_simayi:{//神司马懿
			name:'shen_simayi',
			skills:{
				inirenjie:'renjie',
				inibaiyin:'sbaiyin',
				inilianpo:'lianpo',
				inijilve:'jilue',
				iniguicai:'jilue_guicai',
				inifangzhu:'jilue_fangzhu',
				inijizhi:'jilue_jizhi',
				inizhiheng:'jielue_zhiheng',
				iniwansha:'jilue_wansha',
			},
		},
		ini_lukang:{//陆抗
			name: 'lukang',
			skills: {
			    inijueyan: 'drlt_jueyan',
			    inihuairou: 'drlt_huairou',
				rejizhi:'rejizhi_lukang',
			},
		},
		ini_zhangrang:{//张让
			name: 'zhangrang',
			skills: {
			    initaoluan: 'taoluan',
			},
		},
		sb_yl_luzhi: {//卢植
		    name: 'yl_luzhi',
		    skills: {
		        sbmingren: 'nzry_mingren',
		        sbzhenliang: 'nzry_zhenliang',
		    },
		},
		sb_chengong: {//陈宫
		    name: 'chengong',
		    skills: {
		        sbmingce: 'mingce',
		        sbzhichi: 'zhichi',
		    },
		},
		sb_gaoshun: {//高顺
		    name: 'gaoshun',
		    skills: {
		        sbxianzhen: 'xinxianzhen',
		        sbjinjiu: 'jinjiu',
		    },
		}, 
		sb_huaxiong: {//华雄
		    name: 're_huaxiong',
		    skills: {
		        new_reyaowu: 'reyaowu',
		        sbyangwei: 'shizhan',
		    },
		},
		sb_zhangliao:{//张辽
			name:'zhangliao',
			skills:{
				sbtuxi:'tuxi',
			}
		},
		sb_sunquan: {//孙权
		    name: 'sunquan',
		    skills: {
		        sbzhiheng: 'zhiheng',
		        sbjiuyuan: 'jiuyuan',
		    },
		},
		sb_huanggai: {//黄盖
		    name: 're_huanggai',
		    skills: {
		        sbkurou: 'rekurou',
		        sbzhaxiang: 'zhaxiang',
		    },
		},
		sb_handang: {//韩当
		    name: 'handang',
		    skills: {
		        sbgongji: 'gongji',
		        sbjiefan: 'jiefan',
		    },
		},
		sb_zhurong: {//祝融
		    name: 're_zhurong',
		    skills: {
		        juxiang: 'juxiang',
		        lieren: 'relieren',
		    },
		},
		sb_huangzhong: {//黄忠
		    name: 'huangzhong',
		    skills: {
		        sbliegong: 'liegong',
		    },
		},
		sb_huangyueying: {//黄月英
		    name: 're_huangyueying',
		    skills: {
		        sbjizhi: 'rejizhi',
		    },
		},
		sb_fazheng: {//法正
		    name: 're_fazheng',
		    skills: {
		        sbenyuan: 'reenyuan',
		        sbxuanhuo: 'rexuanhuo',
		    },
		},
		sb_yujin: {//于禁
		    name: 'ol_yujin',
		    skills: {
		        sbjieyue: 'rejieyue',
				sbxiayuan:'sbxiayuan',
		    },
		},
		sb_xiahoudun: {//夏侯惇
		    name: 're_xiahoudun',
		    skills: {
		        sbqingjian: 'new_qingjian',
		        sbganglie: 'reganglie',
		    },
		}, 
		sb_jiaxu: {//贾诩
		    name: 'jiaxu',
		    skills: {
		        sbluanwu: 'luanwu',
		        sbwansha: 'wansha',
		        sbweimu: 'weimu',
		    },
		},
		sb_zhangjiao: {//张角
		    name: 'zhangjiao',
		    skills: {
		        sbleiji: 'leiji',
		        sbguidao: 'guidao',
		        sbhuangtian: 'huangtian',
		    },
		},
		sb_yuanshao: {//袁绍
		    name: 'ol_yuanshao',
		    skills: {
		        sbluanji: 'olluanji',
		        sbxueyi: 'olxueyi',
		    },
		},
		sb_caocao: {//曹操        
		    name: 're_caocao',
		    skills: {
		        sbjianxiong: 'rejianxiong',
		        sbhujia: 'rehujia',
		    },
		},
		sb_caoren: {//曹仁
		    name: 'caoren',
		    skills: {
		        sbjushou: 'xinjushou',
		        sbjiewei: 'xinjiewei',
		    },
		},
		sb_ganning: {//甘宁
		    name: 're_ganning',
		    skills: {
		        sbqixi: 'qixi',
		        sbfenwei: 'fenwei',
		    },
		},
		sb_gongsunzan: {//公孙瓒
		    name: 're_gongsunzan',
		    skills: {
		        sbqiaomeng: 'reqiaomeng',
		        sbyicong: 'reyicong',
		    },
		},
		sb_jiangwei: {//姜维
		    name: 'jiangwei',
		    skills: {
		        sbtiaoxin: 'tiaoxin',
		        sbzhiji:'zhiji'
		    },
		},
		sb_caopi: {//曹丕
		    name: 'caopi',
		    skills: {
		        sbxingshang: 'xingshang',
		        sbfangzhu: 'fangzhu',
		        sbsongwei: 'songwei',
		    },
		},
		sb_diaochan: {//貂蝉
		    name: 'diaochan',
		    skills: {
		        sbbiyue: 'biyue',
		        sblijian: 'lijian',
		    },
		},
		sb_machao: {//马超
		    name: 're_machao',
		    skills: {
		        sbtieji: 'retieji',
		        mashu: 'remashu',
		    },
		},
		sb_menghuo: {//孟获
		    name: 'menghuo',
		    skills: {
		        sbhuoshou: 'huoshou',
		        sbzaiqi: 'zaiqi',
		    },
		},
		sb_pangtong: {//庞统
		    name: 'pangtong',
		    skills: {
		        sblianhuan: 'lianhuan',
		        sbniepan: 'niepan',
		    },
		},
		sb_guanyu: {//关羽
		    name: 're_guanyu',
		    skills: {
		        sbwusheng: 'new_rewusheng',
		        sbyijue: 'new_rewusheng',                
		    },
		},
		sb_zhaoyun: {//赵云
		    name: 're_zhaoyun',
		    skills: {
		        sblongdan: 'ollongdan',
		        sbjizhu: 'olyajiao',
		    },
		},
		sb_lvmeng: {//吕蒙
		    name: 're_lvmeng',
		    skills: {
		        sbkeji: 'keji',
		        sbdujiang: 'rebotu',
		        sbduojing: 'regongxin',
		    },
		},
		sb_sunce: {//孙策
		    name: 'sunce',
		    skills: {
		        sbjiang: 'jiang',
		        sbhunzi: 'hunzi',
		        sbzhiba: 'zhiba',
		        sbyingzi: 'reyingzi',
		        gzyinghun: 'gzyinghun',
		    },
		},
		sb_xuhuang: {//徐晃
		    name: 'ol_xuhuang',
		    skills: {
		        sbduanliang: 'olduanliang',
		        sbshipo: 'oljiezi',
		    },
		},
		sb_xiaoqiao: {//小乔
		    name: 're_xiaoqiao',
		    skills: {
		        sbtianxiang: 'retianxiang',
		    },
		},
		sb_luxun: {//陆逊
		    name: 're_luxun',
		    skills: {
		        sbqianxun: 'reqianxun',
		        sblianying: 'relianying',
		
		    },
		},
		sb_guojia:{//郭嘉
			name:'guojia',
			skills:{
				sbyiji:'yiji',
				sbtiandu:'tiandu',
			},
		},
		sb_sunshangxiang: {//孙尚香
		    name: 'sp_sunshangxiang',
		    skills: {
		        sbxiaoji: 'xiaoji',
		        sbjieyin: 'fanxiang',
		        sbliangzhu:'liangzhu',                
		    },
		},
		sb_daqiao: {//大乔
		    name: 're_daqiao',
		    skills: {
		        sbguose: 'reguose',
		        sbliuli: 'liuli',
		    },
		},
		sb_xiahoushi: {//夏侯氏
		    name: 'xiahoushi',
		    skills: {
		        sbyanyu: 'yanyu',
		        sbqiaoshi: 'qiaoshi',
		    },
		},
		sb_liubiao: {//刘表
		    name: 'xin_liubiao',
		    skills: {
		        sbzishou: 'decadezishou',
		        sbzongshi: 'decadezongshi', 
		    },
		},
		sb_liubei: {//刘备
		    name: 'liubei',
		    skills: {
		        sbrende: 'rende',
		        sbjijiang: 'jijiang',                    
		                     
		    },
		},
		sb_zhenji: {//甄姬
		    name: 're_zhenji',
		    skills: {
		        sbluoshen: 'reluoshen',
		        qingguo: 'reqingguo',                    
		                     
		    },
		},
		sb_zhouyu: {//周瑜
		    name: 'zhouyu',
		    skills: {
		        sbyingzi: 'yingzi',
		        sbfanjian: 'fanjian',                    
		                     
		    },
		},
		sb_zhangfei: {//张飞
		    name: 're_zhangfei',
		    skills: {
		        sbpaoxiao: 'olpaoxiao',
		        sbxieji: 'retishen',                    
		                     
		    },
		},
		sb_zhugeliang: {//诸葛亮
		    name: 're_zhugeliang',
		    skills: {
		        sbguanxing: 'reguanxing',
		        sbkongcheng: 'rekongcheng',       
		                     
		    },
		},
		sb_sp_zhugeliang: {//诸葛亮
		    name: 're_sp_zhugeliang',
		    skills: {
		        sbhuoji: 'rehuoji',
		        sbkanpo: 'rekanpo',       
		                     
		    },
		},
		sb_zhanghe: {//张郃
		    name: 'zhanghe',
		    skills: {
		        sbqiaobian: 'qiaobian',
		    },
		},
		jd_sb_luzhi: {//卢植
		    name: 'yl_luzhi',
		    skills: {
		        nzry_mingren: 'nzry_mingren',
		        jdzhenliang: 'nzry_zhenliang',
		    },
		},
		jd_sb_chengong: {//陈宫
		    name: 'chengong',
		    skills: {
		        jdmingce: 'mingce',
		        jdzhichi: 'zhichi',
		    },
		},
		jd_sb_gaoshun: {//高顺
		    name: 'gaoshun',
		    skills: {
		        jdxianzhen: 'xinxianzhen',
		        jdjinjiu: 'jinjiu',
		    },
		}, 
		jd_sb_huaxiong: {//华雄
		    name: 're_huaxiong',
		    skills: {
		        new_reyaowu: 'reyaowu',
		        jdyangwei: 'shizhan',
		    },
		},
		jd_sb_sunquan: {//孙权
		    name: 'sb_sunquan',
		    skills: {
		        jdsbzhiheng: 'sbzhiheng',
		        jdsbjiuyuan: 'sbjiuyuan',
				jdsbtongye:'sbtongye',
		    },
		},
		jd_sp_yangwan:{//SP杨婉
			name:'sp_yangwan',
			skills:{
				jdmingxuan:'spmingxuan',
				spxianchou:'spxianchou',
			},
		},
		jd_sb_huanggai: {//黄盖
		    name: 're_huanggai',
		    skills: {
		        jdkurou: 'rekurou',
		        jdzhaxiang: 'zhaxiang',
		    },
		},
		jd_sb_handang: {//韩当
		    name: 'handang',
		    skills: {
		        jdgongji: 'gongji',
		        jdjiefan: 'jiefan',
		    },
		},
		ol_zhurong: {//祝融
		    name: 'zhurong',
		    skills: {
		        juxiang: 'juxiang',
		        lieren: 'lieren',
		    },
		},
		jd_sb_huangzhong: {//黄忠
		    name: 'huangzhong',
		    skills: {
		        jdliegong: 'liegong',
		    },
		},
		jd_sb_huangyueying: {//黄月英
		    name: 're_huangyueying',
		    skills: {
		        jdjizhi: 'rejizhi',
		    },
		},
		jd_sb_fazheng: {//法正
		    name: 're_fazheng',
		    skills: {
		        jdenyuan: 'reenyuan',
		        jdxuanhuo: 'rexuanhuo',
		    },
		},
		jd_sb_yujin: {//于禁
		    name: 'yujin',
		    skills: {
		        jdjieyue: 'rejieyue',
		    },
		},
		jd_sb_xiahoudun: {//夏侯惇
		    name: 're_xiahoudun',
		    skills: {
		        jdqingjian: 'new_qingjian',
		        jdganglie: 'reganglie',
		    },
		}, 
		jd_sb_jiaxu: {//贾诩
		    name: 'jiaxu',
		    skills: {
		        jdluanwu: 'luanwu',
		        jdwansha: 'wansha',
		        jdweimu: 'weimu',
		    },
		},
		jd_sb_zhangjiao: {//张角
		    name: 'zhangjiao',
		    skills: {
		        jdleiji: 'leiji',
		        jdguidao: 'guidao',
		        jdhuangtian: 'huangtian',
		    },
		},
		jd_sb_yuanshao: {//袁绍
		    name: 'ol_yuanshao',
		    skills: {
		        jdsbluanji: 'olluanji',
		        jdsbxueyi: 'olxueyi',
		    },
		},
		jd_sb_caocao: {//曹操        
		    name: 're_caocao',
		    skills: {
		        jdjianxiong: 'rejianxiong',
		        jdhujia: 'rehujia',
		    },
		},
		jd_sb_caoren: {//曹仁
		    name: 'caoren',
		    skills: {
		        jdjushou: 'xinjushou',
		        jdjiewei: 'xinjiewei',
		    },
		},
		jd_sb_ganning: {//甘宁
		    name: 're_ganning',
		    skills: {
		        jdqixi: 'qixi',
		        jdfenwei: 'fenwei',
		    },
		},
		jd_sb_gongsunzan: {//公孙瓒
		    name: 're_gongsunzan',
		    skills: {
		        jdqiaomeng: 'reqiaomeng',
		        jdyicong: 'reyicong',
		    },
		},
		jd_sb_jiangwei: {//姜维
		    name: 'jiangwei',
		    skills: {
		        jdtiaoxin: 'tiaoxin',
		        jdzhiji:'zhiji'
		    },
		},
		jd_sb_caopi: {//曹丕
		    name: 'caopi',
		    skills: {
		        jdxingshang: 'xingshang',
		        jdfangzhu: 'fangzhu',
		        jdsongwei: 'songwei',
		    },
		},
		jd_sb_diaochan: {//貂蝉
		    name: 'diaochan',
		    skills: {
		        jdbiyue: 'biyue',
		        jdlijian: 'lijian',
		    },
		},
		jd_sb_machao: {//马超
		    name: 're_machao',
		    skills: {
		        jdtieji: 'retieji',
		        mashu: 'remashu',
		    },
		},
		jd_sb_menghuo: {//孟获
		    name: 'menghuo',
		    skills: {
		        jdsbhuoshou: 'huoshou',
		        jdsbzaiqi: 'zaiqi',
		    },
		},
		jd_sb_pangtong: {//庞统
		    name: 'pangtong',
		    skills: {
		        jdlianhuan: 'lianhuan',
		        jdniepan: 'niepan',
		    },
		},
		jd_sb_guanyu: {//关羽
		    name: 're_guanyu',
		    skills: {
		        jdsbwusheng: 'new_rewusheng',
		        jdsbyijue: 'new_rewusheng',                
		    },
		},
		jd_sb_zhaoyun: {//赵云
		    name: 're_zhaoyun',
		    skills: {
		        jdlongdan: 'ollongdan',
		        jdjizhu: 'olyajiao',
		    },
		},
		jd_sb_lvmeng: {//吕蒙
		    name: 're_lvmeng',
		    skills: {
		        jdkeji: 'keji',
		        jddujiang: 'rebotu',
		        jdduojing: 'regongxin',
		    },
		},
		jd_sb_sunce: {//孙策
		    name: 'sunce',
		    skills: {
		        jdjiang: 'jiang',
		        jdhunzi: 'hunzi',
		        jdzhiba: 'zhiba',
		        jdyingzi: 'reyingzi',
		        gzyinghun: 'gzyinghun',
		    },
		},
		jd_sb_xuhuang: {//徐晃
		    name: 'ol_xuhuang',
		    skills: {
		        jdduanliang: 'olduanliang',
		        jdshipo: 'oljiezi',
		    },
		},
		jd_sb_xiaoqiao: {//小乔
		    name: 'ol_xiaoqiao',
		    skills: {
		        jdsbtianxiang: 'oltianxiang',
		        jdsbhongyan: 'olhongyan',
		    },
		},
		jd_sb_luxun: {//陆逊
		    name: 'luxun',
		    skills: {
		        jdqianxun: 'qianxun',
		        jdlianying: 'lianying',
		
		    },
		},
		jd_sb_sunshangxiang: {//孙尚香
		    name: 'sp_sunshangxiang',
		    skills: {
		        jdsbxiaoji: 'xiaoji',
		        jdsbjieyin: 'fanxiang',
		        jdsbliangzhu:'liangzhu',                
		    },
		},
		jd_sb_daqiao: {//大乔
		    name: 're_daqiao',
		    skills: {
		        jdguose: 'reguose',
		        jdliuli: 'liuli',
		    },
		},
		jd_sb_xiahoushi: {//夏侯氏
		    name: 'xiahoushi',
		    skills: {
		        jdyanyu: 'yanyu',
		        jdqiaoshi: 'qiaoshi',
		    },
		},
		jd_sb_liubiao: {//刘表
		    name: 'xin_liubiao',
		    skills: {
		        jdzishou: 'decadezishou',
		        jdzongshi: 'decadezongshi', 
		    },
		},
		jd_sb_liubei: {//刘备
		    name: 'liubei',
		    skills: {
		        jdrende: 'rende',
		        jdjijiang: 'jijiang',                    
		                     
		    },
		},
		jd_sb_zhenji: {//甄姬
		    name: 're_zhenji',
		    skills: {
		        jdluoshen: 'reluoshen',
		        qingguo: 'reqingguo',                    
		                     
		    },
		},
		jd_sb_zhouyu: {//周瑜
		    name: 'zhouyu',
		    skills: {
		        jdyingzi: 'yingzi',
		        jdfanjian: 'fanjian',                    
		                     
		    },
		},
		jd_sb_zhangfei: {//张飞
		    name: 're_zhangfei',
		    skills: {
		        jdsbpaoxiao: 'olpaoxiao',
		        jdsbxieji: 'retishen',                    
		                     
		    },
		},
		jd_sb_zhugeliang: {//诸葛亮
		    name: 're_zhugeliang',
		    skills: {
		        jdguanxing: 'reguanxing',
		        jdkongcheng: 'rekongcheng',       
		                     
		    },
		},
		jd_sb_sp_zhugeliang: {//诸葛亮
		    name: 're_sp_zhugeliang',
		    skills: {
		        jdhuoji: 'rehuoji',
		        jdkanpo: 'rekanpo',       
		                     
		    },
		},
		jd_sb_zhanghe: {//张郃
		    name: 'zhanghe',
		    skills: {
		        jdqiaobian: 'qiaobian',
		    },
		},
		tw_wangling: {//王凌
		    name: 'wangling',
		    skills: {
		        twxingqi: 'xingqi',
		        twmouli: 'xinmouli',
		        twmibei: 'mibei',                
		    },
		},
		tw_yl_luzhi: {//卢植
		    name: 'yl_luzhi',
		    skills: {
		        twmingren: 'nzry_mingren',
		        twzhenliang: 'nzry_zhenliang',
		    },
		},
		tw_yujin: {//于禁
		    name: 'yujin',
		    skills: {
		        xinzhenjun: 'yizhong',
		    },
		},
		tw_shen_lvmeng: {//神吕蒙
		    name: 'shen_lvmeng',
		    skills: {
		        twshelie: 'shelie',
		        twgongxin: 'gongxin',
		    },
		},
		tw_shen_guanyu: {//神关羽
		    name: 'shen_guanyu',
		    skills: {
		        twwuhun: 'wuhun',
		        twwushen: 'wushen',
		    },
		},
		tw_zhouchu: {//周处
		    name: 'zhouchu',
		    skills: {
		        twguoyi: 'xianghai',
		        twchuhai: 'rechuhai',
		        zhangming: 'zhangming',
		    },
		},
		tw_mayunlu:{//马云禄
			name:'mayunlu',
			skills:{
				twfengpo:'fengpo',
			},
		},
		tw_daxiaoqiao:{
			name:'daxiaoqiao',
			skills:{
				twxingwu:'new_xingwu',
				twpingting:'new_luoyan',
			}
		},
        old_wangyi: {//王异
            name: 're_wangyi',
            skills: {
                oldzhenlie: 'zhenlie',
                oldmiji: 'miji',
            },
        },               
        old_yangzhi: {//杨芷
            name: 'yangzhi',
            skills: {
                wanyi: 'xinwanyi',
                maihuo: 'maihuo',
            },
        },        
        old_yangyan: {//杨艳
            name: 'yangyan',
            skills: {
                xuanbei: 'xinxuanbei',
                xianwan: 'xianwan',
            },
        },        
        old_caocao: {//神曹操
            name: 'shen_caocao',
            skills: {
                junkguixin: 'new_guixin',
            },
        },        
        old_wangyun: {//王允
            name: 'wangyun',
            skills: {
                wylianji: 'xinlianji',
                moucheng: 'xinmoucheng',
                jingong: 'xinjingong',
            },
        },
        old_gaoshun: {//高顺
            name: 'gaoshun',
            skills: {
                xianzhen: 'xinxianzhen',
                jinjiu: 'jinjiu',
            },
        },
        old_huangfusong: {//皇甫嵩
            name: 'sp_huangfusong',
            skills: {
                fenyue: 'spshiji',
            },
        },
        old_huaxiong: {//华雄
            name: 're_huaxiong',
            skills: {
                shiyong: 'reyaowu',
            },
        },
        old_huatuo: {//华佗
            name: 'huatuo',
            skills: {
                new_reqingnang: 'qingnang',
                jijiu: 'jijiu',
            },
        },
        old_fuhuanghou: {//伏寿
            name: 'fuhuanghou',
            skills: {
                oldqiuyuan: 'qiuyuan',
                oldzhuikong: 'zhuikong',
            },
        },
        old_xusheng: {//徐盛
            name: 'xusheng',
            skills: {
                pojun: 'xinpojun',
            },
        },
        old_handang: {//韩当
            name: 'handang',
            skills: {
                oldgongji: 'gongji',
                oldjiefan: 'jiefan',
            },
        },
        old_maliang: {//马良
            name: 'maliang',
            skills: {
                xiemu: 'zishu',
                naman: 'yingyuan',
            },
        },
		re_maliang: {//马良
		    name: 'maliang',
		    skills: {
		        rexiemu: 'zishu',
		        heli: 'yingyuan',
		    },
		},
        old_madai: {//马岱
            name: 're_madai',
            skills: {
                qianxi: 'reqianxi',
            },
        },
        old_guanzhang: {//关兴张苞
            name: 'guanzhang',
            skills: {
                old_fuhun: 'fuhun',
                new_rewusheng: 'new_rewusheng',
                olpaoxiao: 'olpaoxiao',
            },
        },
        old_liyan: {//李严
            name: 'liyan',
            skills: {
                duliang: 'dcduliang',
                fulin: 'fulin',
            },
        },
        old_huanghao: {//黄皓
            name: 'huanghao',
            skills: {
                oldqinqing: 'qinqing',
                oldhuisheng: 'huisheng',
            },
        },
        old_wanglang: {//王朗
            name: 'wanglang',
            skills: {
                gushe: 'regushe',
                jici: 'rejici',
            },
        },
        old_chendao: {//陈到
            name: 'chendao',
            skills: {
                drlt_wanglie: 'dcwangliie',
            },
        },
        old_majun: {//马钧
            name: 'majun',
            skills: {
                xinfu_qiaosi: 'qiaosi',
            },
        },
        old_re_lidian: {//李典
            name: 're_lidian',
            skills: {
                xunxun: 'xunxun',
                wangxi: 'xinwangxi',
            },
        },
        old_xiahouyuan: {//夏侯渊
            name: 'ol_xiahouyuan',
            skills: {
                xinshensu: 'xinshensu',
            },
        },
        old_yuanshu: {//袁术
            name: 'yuanshu',
            skills: {
                xinyongsi: 'yongsi',
                rewangzun: 'weidi',
            },
        },
        old_caoxiu: {//曹休
            name: 'caoxiu',
            skills: {
                xinjiangchi: 'qingxi',
            },
        },
        old_caoren: {//曹仁
            name: 'caoren',
            skills: {
                moon_jushou: 'xinjushou',
                jiewei: 'xinjiewei',
            },
        },
        old_caozhen: {//曹真
            name: 'caozhen',
            skills: {
                sidi: 'xinsidi',
            },
        },
        old_chenqun: {//陈群
            name: 'chenqun',
            skills: {
                dingpin: 'pindi',
                oldfaen: 'faen',
            },
        },
        old_dingfeng: {//丁奉
            name: 'dingfeng',
            skills: {
                duanbing: 'reduanbing',
                fenxun: 'refenxun',
            },
        },
        old_bulianshi: {//步练师
            name: 'bulianshi',
            skills: {
                anxu: 'anxu',
                zhuiyi: 'zhuiyi',
            },
        },
        old_guanqiujian: {//毌丘俭
            name: 'guanqiujian',
            skills: {
                drlt_zhenrong: 'zhengrong',
                drlt_hongju: 'hongju',
                drlt_qingce: 'qingce',
            },
        },
        old_caochong: {//曹冲
            name: 'caochong',
            skills: {
                oldchengxiang: 'chengxiang',
                oldrenxin: 'renxin',
            },
        },
        old_caorui: {//曹叡
            name: 'caorui',
            skills: {
                huituo: 'huituo',
                oldmingjian: 'mingjian',
                xingshuai:'xingshuai'
            },
        },
        old_caochun: {//曹纯
            name: 'caochun',
            skills: {
                shanjia: 'xinshanjia',
            },
        },
        old_machao: {//马超
            name: 're_machao',
            skills: {
                oldcihuai: 'retieji',
                zhuiji: 'remashu',
            },
        },
        old_lingtong: {//凌统
            name: 'xin_lingtong',
            skills: {
                oldxuanfeng: 'decadexuanfeng',
            },
        },
		old_zhangxingcai: {//张星彩
		    name: 'zhangxingcai',
		    skills: {
		        oldshenxian: 'shenxian',
		        qiangwu: 'qiangwu',
		    },
		},
		old_guanyu: {//关羽
		    name: 're_guanyu',
		    skills: {
		        wusheng: 'new_rewusheng',
		        yijue: 'new_rewusheng',                
		    },
		},
		old_zhaoyun: {//赵云
		    name: 're_zhaoyun',
		    skills: {
		        longdan: 'ollongdan',
		        new_yajiao: 'olyajiao',
		    },
		},
		old_xiaoqiao: {//小乔
		    name: 'ol_xiaoqiao',
		    skills: {
		        tianxiang: 'oltianxiang',
		        hongyan: 'olhongyan',
		    },
		},
		old_liubiao: {//刘表
		    name: 'xin_liubiao',
		    skills: {
		        oldzishou: 'decadezishou',
		        zongshi: 'decadezongshi',                    
		                     
		    },
		},
		old_shen_zhaoyun: {//神赵云
		    name: 'shen_zhaoyun',
		    skills: {
		        oldjuejing: 'xinjuejing',
		        oldlonghun: 'relonghun',                    
		                     
		    },
		},
		old_zhangfei: {//张飞
		    name: 're_zhangfei',
		    skills: {
		        new_repaoxiao: 'olpaoxiao',
		        retishen: 'retishen',                    
		                     
		    },
		},
		old_zhuran: {//朱然
		    name: 'zhuran',
		    skills: {
		        olddanshou: 'danshou',       
		                     
		    },
		},
		old_zhuzhi: {//朱治
		    name: 'zhuzhi',
		    skills: {
		        anguo: 'xinanguo',       
		                     
		    },
		},
		old_zhuhuan: {//朱桓
		    name: 'zhuzhi',
		    skills: {
		        youdi: 'pingkou',       
		                     
		    },
		},
		old_zhoutai: {//周泰
		    name: 'zhoutai',
		    skills: {
		        gzbuqu: 'buqu',       
		                     
		    },
		},
		old_zhugezhan: {//诸葛瞻
		    name: 'zhugezhan',
		    skills: {
		        old_zuilun: 'xinfu_zuilun',
		        old_fuyin: 'xinfu_fuyin',       
		                     
		    },
		},
		jsrg_zoushi: {//邹氏
		    name: 're_zoushi',
		    skills: {
		        jsrgguyin: 'rehuoshui',
		        jsrgzhangdeng: 'reqingcheng',
		    },
		},
		jsrg_yangbiao: {//杨彪
		    name: 'yangbiao',
		    skills: {
		        jsrgzhaohan: 'zhaohan',
		        jsrgrangjie: 'rangjie',
		        jsrgyizheng: 'yizheng',
		    },
		},
		jsrg_zhujun: {//朱儁
		    name: 'sp_zhujun',
		    skills: {
		        jsrgfendi: 'yangjie',
		        jsrgjuxiang: 'houfeng',
		    },
		},
		jsrg_xugong: {//许贡
		    name: 'xugong',
		    skills: {
		        jsrgbiaozhao: 'biaozhao',
		        jsrgyechou: 'yechou',
		    },
		},
		jsrg_wangyun: {//王允
		    name: 'wangyun',
		    skills: {
		        jsrgshekun: 'xinlianji',
		        jsrgfayi: 'xinmoucheng',
		    },
		},
		jsrg_xushao: {//许劭
		    name: 'xushao',
		    skills: {
		        sbpingjian: 'pingjian',
		    },
		},
		jsrg_chunyuqiong: {//淳于琼
		    name: 'chunyuqiong',
		    skills: {
		        jsrgcangchu: 'cangchu',
		        jsrgshishou: 'sushou',
		    },
		},
		jsrg_xuyou: {//许攸
		    name: 'xuyou',
		    skills: {
		        jsrglipan: 'nzry_chenglve',
		        jsrgqingxi: 'nzry_shicai',
		        jsrgjinmie: 'nzry_cunmu',
		    },
		},
		jsrg_huangfusong: {//皇甫嵩
		    name: 'sp_huangfusong',
		    skills: {
		        jsrgguanhuo: 'spshiji',
		        jsrgjuxia: 'sptaoluan',                
		    },
		},
		jsrg_kongrong: {//孔融
		    name: 'sp_kongrong',
		    skills: {
		        jsrglirang: 'xinlirang',
		        jsrgzhengyi: 'xinmingshi',
		    },
		},
		dc_kongrong: {//孔融
		    name: 'sp_kongrong',
		    skills: {
		        dckrmingshi: 'xinmingshi',
		        lirang: 'xinlirang',
		    },
		},
		jsrg_hejin: {//何进
		    name: 're_hejin',
		    skills: {
		        jsrgzhaobing: 'spmouzhu',
		        jsrgzhuhuan: 'spyanhuo',
		    },
		},
		jsrg_dongbai: {//董白
		    name: 'dongbai',
		    skills: {
		        jsrglianzhu: 'lianzhu',
		        jsrgshichong: 'xiehui',
		    },
		},
		jsrg_caocao: {//曹操
		    name: 're_caocao',
		    skills: {
		        jsrgzhenglve: 'rejianxiong',
		        jsrgpingrong: 'rehujia',
		    },
		},
		jsrg_chendeng: {//陈登
		    name: 're_chendeng',
		    skills: {
		        jsrglunshi: 'refuyuan',
		    },
		},
		jsrg_nanhualaoxian: {//南华老仙
		    name: 're_nanhualaoxian',
		    skills: {
		        jsrgxundao: 'gongxiu',
		        jsrglinghua: 'jinghe',
		    },
		},
		jsrg_guanyu: {//关羽
		    name: 're_guanyu',
		    skills: {
		        jsrgguanjue: 'new_rewusheng',
		        jsrgnianen: 'new_rewusheng',                
		    },
		},
		jsrg_sunce: {//孙策
		    name: 'sunce',
		    skills: {
		        jsrgduxing: 'jiang',
		        jsrgzhiheng: 'hunzi',
		        jsrgzhasi: 'zhiba',
		        jsrgbashi: 'reyingzi',
		        rezhiheng: 'yinghun',
		    },
		},
		jsrg_sunshangxiang: {//孙尚香
		    name: 're_sunshangxiang',
		    skills: {
		        jsrgjiaohao: 'xiaoji',
		        jsrgguiji: 'rejieyin',
		
		    },
		},
		jsrg_liubei: {//刘备
		    name: 'liubei',
		    skills: {
		        jsrgjishan: 'rende',
		        jsrgzhenqiao: 'jijiang',                    
		                     
		    },
		},
		jsrg_liuhong: {//刘宏
		    name: 'liuhong',
		    skills: {
		        jsrgchaozheng: 'yujue',
		        jsrgshenchong: 'tuxing',    
		        jsrgjulian: 'zhihu',    
		    },
		},
		jsrg_liuyan: {//刘焉
		    name: 'liuyan',
		    skills: {
		        jsrgtushe: 'xinfu_tushe',
		        xinfu_limu: 'xinfu_limu',
		    },
		},
		jsrg_zhenji: {//甄姬
		    name: 'sp_zhenji',
		    skills: {
		        jsrgjixiang: 'dcjijie',
		        jsrgchengxian: 'dchuiji',      
		    },
		},
		jsrg_zhanghe: {//张郃
		    name: 'zhanghe',
		    skills: {
		        jsrgqiongtu: 'qiaobian',       
		                     
		    },
		},
		xin_jushou:{//沮授
			name:'yj_jushou',
			skills:{
				xinjianying:'jianying',
				shibei:'shibei',
			},
		},
		re_jushou:{//沮授
			name:'yj_jushou',
			skills:{
				dcjianying:'jianying',
				dcshibei:'shibei',
			},
		},
		re_zuoci: {//左慈
		    name: 'zuoci',
		    skills: {
		        rehuashen: 'huashen',
		        rexinsheng: 'xinsheng',
		    },
		},
		tw_zhugeguo:{//诸葛果
			name:'zhugeguo',
			skills:{
				twqirang:'qirang',
				twyuhua:'yuhua',
			},
		},
		re_sunluyu: {//孙鲁育
		    name: 'sunluyu',
		    skills: {
		        remumu: 'mumu',
		        remeibu: 'meibu',
		    },
		},
		mb_sunluyu: {//孙鲁育
		    name: 'sunluyu',
		    skills: {
		        mbmumu: 'mumu',
		        mbmeibu: 'meibu',
		    },
		},
		re_sunluban: {//孙鲁班
		    name: 'sunluban',
		    skills: {
		        rejiaojin: 'jiaojin',
		        rechanhui: 'chanhui',
		    },
		},
		xin_sunluban: {//孙鲁班
		    name: 'sunluban',
		    skills: {
		        xinjiaojin: 'jiaojin',
		        xinzenhui: 'chanhui',
		    },
		},
		tw_sunluban: {//孙鲁班
		    name: 'sunluban',
		    skills: {
		        twjiaojin: 'jiaojin',
		        twzenhui: 'chanhui',
		    },
		},
		xin_yujin: {//于禁
		    name: 'yujin',
		    skills: {
		        jieyue: 'yizhong',
		    },
		},
		yujin_yujin: {//于禁
		    name: 'yujin',
		    skills: {
		        decadezhenjun: 'yizhong',
		    },
		}, 
		tw_yujin: {//于禁
		    name: 'yujin',
		    skills: {
		        xinzhenjun: 'yizhong',
		    },
		},
		dc_bulianshi: {//步练师
		    name: 'bulianshi',
		    skills: {
		        dcanxu: 'anxu',
		        dczhuiyi: 'zhuiyi',
		    },
		},   
		re_bulianshi: {//步练师
		    name: 'bulianshi',
		    skills: {
		        reanxu: 'anxu',
		        zhuiyi: 'zhuiyi',
		    },
		},
		jsrg_guozhao: {//郭照
		    name: 'guozhao',
		    skills: {
		        jsrgpianchong: 'pianchong',
		        jsrgzunwei: 'zunwei',
		    },
		}, 
		re_zhuhuan: {//朱桓
		    name: 'zhuhuan',
		    skills: {
		        refenli: 'fenli',
		        repingkou: 'pingkou',
		    },
		},
		xin_zhuhuan: {//朱桓
		    name: 'zhuhuan',
		    skills: {
		        fenli: 'fenli',
		        xinpingkou: 'pingkou',
		    },
		},
		re_zhugedan:{//诸葛诞
			name:'zhugedan',
			skills:{
				regongao:'gongao',
				rejuyi:"juyi",
				benghuai:'benghuai_zhugedan',
				reweizhong:"weizhong",
			},
		},
	}
});
