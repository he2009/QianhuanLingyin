import { VERSION } from './version.js'
import { lib,get,_status,ui,game,ai } from './noname.js';
import { CONFIG } from '../config.js';
import { CONTENT } from './content.js';
import { PRECONTENT } from './precontent.js';

if (!window.qhlyUI) window.qhlyUI = {};
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
  longkuang_jiemian5:{
    name: '../../../千幻聆音/assets/longkuang_jiemian5',
  },
}
Array.prototype.contains = Array.prototype.includes;//懒得一个个改了，直接用这个消去报错。
//出框调整
//皮切用自己函数播放出框
//getSkinFile,setOriginSkin,syncChange
export let mainPackage = {
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
    intro: "版本号："+VERSION+"<br>对局内实时换肤换音扩展！<br>感谢七.提供的【水墨龙吟】界面素材。<br>感谢灵徒℡丶提供的【海克斯科技】界面素材。<br>感谢雷开发的十周年、手杀界面。<br>感谢以下群友参与了BUG反馈，并给出了可行的建议：<br>柚子 Empty city° ꧁彥꧂ 折月醉倾城 世中人 ᴀᴅɪᴏs 废城<b><br>",
    author: "玄武江湖工作室 & 雷",
    diskURL: "",
    forumURL: "",
    version: VERSION,
  }, files: { "character": [], "card": [], "skill": [] }
};

window.qhly_extension_package = mainPackage;