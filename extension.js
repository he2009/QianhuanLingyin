//game.import( name:"千幻聆音"
//提示：本扩展源代码基于GPL协议向无名杀社区开放，欢迎大家借鉴和参考代码。
//import { VERSION } from './version.js'
// @ts-ignore
import { lib,get,_status,ui,game,ai } from './extension/noname.js';
import { CONFIG } from './extension/config.js';
import { CONTENT } from './extension/content.js';
import { PRECONTENT } from './extension/precontent.js';

// @ts-ignore
lib.element.player.qh_old_init = lib.element.player.init;
// @ts-ignore
lib.element.player.qh_old_$init = lib.element.player.$init;
// @ts-ignore
lib.element.player.qh_old_uninit = lib.element.player.uninit;
// @ts-ignore
lib.element.player.qh_old_$uninit = lib.element.player.$uninit;

// @ts-ignore
if (!window.qhlyUI) window.qhlyUI = {};
// @ts-ignore
window.qhlyUI.assets = {
  huanpifu: {
    name: '../../../千幻聆音/assets/huanpifu',
  },
  pinzhi: {
    name: '../../../千幻聆音/assets/SF_pifu_pinzhiUI',
  },
  huanfu: {
    name: '../../../千幻聆音/assets/huanfu',
  },
}
//出框调整
//皮切用自己函数播放出框
//getSkinFile,setOriginSkin,syncChange

let mainPackageFunc = async function(){
  const extensionInfo = 
        await lib.init.promises.json(`${lib.assetURL}extension/千幻聆音/info.json`);
  let mainPackage = {
    name: "千幻聆音", content:CONTENT, precontent:PRECONTENT, config:CONFIG, help: {}, package: {
      character: {
        character: {
        },
        translate: {
        },
      },
      card: {
        card: {
        },
        translate: {
        },
        list: [],
      },
      skill: {
        skill: {
        },
        translate: {
        },
      },
      intro: "版本号："+extensionInfo.version+"<br>对局内实时换肤换音扩展！<br>感谢七.提供的【水墨龙吟】界面素材。<br>感谢灵徒℡丶提供的【海克斯科技】界面素材。<br>感谢雷开发的十周年、手杀界面。<br>感谢以下群友参与了BUG反馈，并给出了可行的建议：<br>柚子 Empty city° ꧁彥꧂ 折月醉倾城 世中人 ᴀᴅɪᴏs 废城<b><br><br>玄武江湖工作室群：522136249</b><br>由黎，提供新手杀样式以及素材，感谢柴油鹿鹿，寰宇星城，白露为霜，献忠喵等人提供的建议和指导！<br><img style=width:238px src=" + lib.assetURL + "extension/千幻聆音/image/xwjh_pic_erweima.jpg> <br><br><b>时空枢纽群：1075641665</b><img style=width:238px src=" + lib.assetURL + "extension/千幻聆音/image/sksn_pic_erweima.jpg> <br><br><b>千幻聆音皮肤群：646556261</b><img style=width:238px src=" + lib.assetURL + "extension/千幻聆音/image/qhly_pic_erweima.jpg><br><b>千幻聆音皮肤二群：859056471</b><img style=width:238px src=" + lib.assetURL + "extension/千幻聆音/image/qhly_pic_erweima2.jpg><br><b>Thunder大雷音寺群：991761102</b><img style=width:238px src=" + lib.assetURL + "extension/千幻聆音/image/qhly_pic_daleiyinsi.jpg><br><b>无名杀扩展交流公众号</b><img style=width:238px src=" + lib.assetURL + "extension/千幻聆音/image/qhly_pic_gzh.jpg><br>皮肤切换<br>更新者：无语，微微曦子<br><br>&nbsp;&nbsp;<font color=#00FF7F>版本号:1.22<br>&nbsp;&nbsp;1.更新内容：点击查看<br>&nbsp;&nbsp;2.添加光污染（微微曦子）<br>&nbsp;&nbsp;3.当前扩展可以对待机动皮和出框动皮的位置参数的调整.<br>&nbsp;&nbsp;4.可以支持手杀和十周年真动皮的出框攻击,攻击附带指示线以及十周年动皮的出场动作播放.<br>&nbsp;&nbsp;5.界面内置spine骨骼动画预览.可以把骨骼文件或文件夹塞入扩展目录下的assets即可预览<br>&nbsp;&nbsp;6.现在动皮支持json的骨骼以及可以添加alpha预乘参数<br>&nbsp;&nbsp;7.<font color=#FF6347>新增千幻语音集成功能：皮肤切换后自动读取千幻聆音的语音资源，本次更新添加了调整特殊调整出窗以及可以点击角色自由调整动皮位置</font><br></font><br>&nbsp;&nbsp;扩展本身拥有动静皮切换功能,其中静皮切换需要配合千幻聆音是用.如果想是用UI更好看的动静切换功能,请使用千幻雷修版本的动静切换。<br><br>&nbsp;&nbsp;最后,感谢墨渊、微微曦子、//凌梦帮助前景修改，无名杀超市群的逝去の記憶,鹰击长空、逍遥自在、若水帮忙测试与提出意见,感谢默.颜提供的骨骼素材,感谢鸭佬扒的素材<br><br><img style=width:225px src=extension/千幻聆音/image/皮肤切换logo.png>",
      author: "玄武江湖工作室 & 雷<br>皮肤切换前更新者：yscl",
      diskURL: "",
      forumURL: "",
      version: extensionInfo.version,
    }, files: { "character": [], "card": [], "skill": [] }
  };
  // @ts-ignore
  window.qhly_extension_package = mainPackage;
  return mainPackage;
};


export let type = 'extension';

export default mainPackageFunc;