const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'NzAzMDYzMDM5MDI0NTYyMjc2.Xs0TzA.s3cHKFpoMVPYEryt68cp8vRyZDE';
const moment = require("moment");
require("moment-duration-format");
const welcomeChannelName = "안녕하세요";
const byeChannelName = "안녕히가세요";
const welcomeChannelComment = "어서오세요.";
const byeChannelComment = "안녕히가세요.";

client.on('ready', () => {
  console.log('켰다.');
  client.user.setPresence({ game: { name: '!명령어' }, status: 'online' })
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);

  member.addRole(guild.roles.find(role => role.name == "일반인"));
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == '!디스코드') {
    return message.reply('```https://discord.gg/rn7snEY```');
  }
  if(message.content == '!유튜브') {
    return message.reply('https://www.youtube.com/channel/UCMyW9-lHVnNp_moiu9BQtvQ?view_as=subscriber');
  }
  if(message.content == 'ping') {
    return message.reply('pong');
  }
  if(message.content == 'ping') {
    return message.reply('pong');
  }
  

  if(message.content == '!서버정보') {
    let embed = new Discord.RichEmbed()
    let img = 'https://cdn.discordapp.com/icons/705005885759422564/79eda5e0486fea441b39b23a03018ea9.webp?size=128';
    var duration = moment.duration(client.uptime).format(" D [일], H [시간], m [분], s [초]");
    embed.setColor('#186de6')
    embed.setAuthor('server info of Team Genesis Bot', img)
    embed.setFooter(`Team Genesis Bot`)
    embed.addBlankField()
    embed.addField('RAM usage',    `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true);
    embed.addField('running time', `${duration}`, true);
    embed.addField('user',         `${client.users.size.toLocaleString()}`, true);
    embed.addField('server',       `${client.guilds.size.toLocaleString()}`, true);
    // embed.addField('channel',      `${client.channels.size.toLocaleString()}`, true);
    embed.addField('Discord.js',   `v${Discord.version}`, true);
    embed.addField('Node',         `${process.version}`, true);

    let arr = client.guilds.array();
    let list = '';
    list = `\`\`\`css\n`;

    for(let i=0;i<arr.length;i++) {
      // list += `${arr[i].name} - ${arr[i].id}\n`
      list += `${arr[i].name}\n`
    }
    list += `\`\`\`\n`
    embed.addField('list:',        `${list}`);

    embed.setTimestamp()
    message.channel.send(embed);
  }

  else if(message.content == '!명령어') {
    let helpImg = 'https://cdn.discordapp.com/icons/705005885759422564/79eda5e0486fea441b39b23a03018ea9.webp?size=128';
    let commandList = [
      {name: '!디스코드', desc: '사용할수 있는 명령어를 보여드림니다'},
      {name: '!공지', desc: 'dm으로 전체 공지를 보넴니다'},
      {name: '!청소', desc: '텍스트를 지움니다'},
      {name: '!초대코드', desc: '해당 채널의 초대 코드 표기'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('Help of Team Genesis Bot', helpImg)
      .setColor('#186de6')
      .setFooter(`Team Genesis Bot`)
      .setTimestamp()

    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed);
  }
  if (message.content === '/온') {
    message.delete();  
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
      return message.channel.send(
        `<@${message.author.id}> ` +
          '명령어를 수행할 관리자 권한을 소지하고 있지않습니다.'
      );
    }
    let img =
      'https://cdn.discordapp.com/attachments/700700907519737931/707234149446189086/0f286dd12592ed8d.png';
    let embed = new Discord.RichEmbed()
      .setTitle('서버가 열렸습니다')
      .setColor(0x00ff3c)
      .setAuthor('클루온라인', img)
      .setThumbnail(img)
      .addField(' 카페', 'https://cafe.naver.com/clueonline\n')
      .addField('디스코드', 'https://discord.gg/tW7fs7H\n')
      .addField('카카오톡', 'https://open.kakao.com/o/gWOUiN5b\n')
      .addBlankField()
      .setTimestamp()
      .setFooter('클루온라인 관리진', img);

    message.channel.send(embed);
  }
  if (message.content === '/오프') {
    message.delete();
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
      return message.channel.send(
        `<@${message.author.id}> ` +
          '명령어를 수행할 관리자 권한을 소지하고 있지않습니다.'
      );
    }
    let img =
      'https://cdn.discordapp.com/attachments/700700907519737931/707234149446189086/0f286dd12592ed8d.png';
    let embed = new Discord.RichEmbed()
      .setTitle('서버가 닫혔습니다')
      .setColor(0xff0000)
      .setAuthor('클루온라인', img)
      .setThumbnail(img)
      .addField('카페', 'https://cafe.naver.com/clueonline\n')
      .addField('디스코드', 'https://discord.gg/tW7fs7H\n')
      .addField('카카오톡', 'https://open.kakao.com/o/gWOUiN5b\n')
      .addBlankField()
      .setTimestamp()
      .setFooter('클루온라인 관리진', img);

    message.channel.send(embed);
  }
  if (message.content === '/리붓') {
    message.delete();  
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
      return message.channel.send(
        `<@${message.author.id}> ` +
          '명령어를 수행할 관리자 권한을 소지하고 있지않습니다.'
      );
    }
    let img =
      'https://cdn.discordapp.com/attachments/700700907519737931/707234149446189086/0f286dd12592ed8d.png';
    let embed = new Discord.RichEmbed()
      .setTitle('서버가 다시시작됩니다')
      .setColor(0xf6ff00)
      .setAuthor('클루온라인', img)
      .setThumbnail(img)
      .addField(' 카페', 'https://cafe.naver.com/clueonline\n')
      .addField('디스코드', 'https://discord.gg/tW7fs7H\n')
      .addField('카카오톡', 'https://open.kakao.com/o/gWOUiN5b\n')
      .addBlankField()
      .setTimestamp()
      .setFooter('클루온라인 관리진', img);

  message.channel.send(embed);
}
if (message.content === '/점검') {
  message.delete();  
  if (!message.member.hasPermission('MANAGE_MESSAGES')) {
    return message.channel.send(
      `<@${message.author.id}> ` +
        '명령어를 수행할 관리자 권한을 소지하고 있지않습니다.'
    );
  }
  let img =
    'https://cdn.discordapp.com/attachments/700700907519737931/707234149446189086/0f286dd12592ed8d.png';
  let embed = new Discord.RichEmbed()
    .setTitle('서버가 점검중입니다')
    .setColor(0xff7200)
    .setAuthor('클루온라인', img)
    .setThumbnail(img)
    .addField(' 카페', 'https://cafe.naver.com/clueonline\n')
    .addField('디스코드', 'https://discord.gg/tW7fs7H\n')
    .addField('카카오톡', 'https://open.kakao.com/o/gWOUiN5b\n')
    .addBlankField()
    .setTimestamp()
    .setFooter('클루온라인 관리진', img);
	

    message.channel.send(embed)
  } else if(message.content == '!초대코드') {
    client.guilds.array().forEach(x => {
      x.channels.find(x => x.type == 'text').createInvite({maxAge: 0}) // maxAge: 0은 무한이라는 의미, maxAge부분을 지우면 24시간으로 설정됨
        .then(invite => {
          message.channel.send(invite.url)
        })
        .catch((err) => {
          if(err.code == 50013) {
            message.channel.send('**'+x.channels.find(x => x.type == 'text').guild.name+'** 채널 권한이 없어 초대코드 발행 실패')
          }
        })
    });
  } else if(message.content.startsWith('!공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!공지'.length);
      let embed = new Discord.RichEmbed()
        .setAuthor('공지 of Team Genesis Bot')
        .setColor('#186de6')
        .setFooter(`Team Genesis Bot`)
        .setTimestamp()

      embed.addField('공지: ', contents);

      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(embed)
      });

      return message.reply('공지를 전송했습니다.');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  } else if(message.content.startsWith('!청소')) {
    if(message.channel.type == 'dm') {
      return message.reply('dm에서 사용할 수 없는 명령어 입니다.');
    }

    if(message.channel.type != 'dm' && checkPermission(message)) return

    var clearLine = message.content.slice('!청소 '.length);
    var isNum = !isNaN(clearLine)

    if(isNum && (clearLine <= 0 || 100 < clearLine)) {
      message.channel.send("1부터 99까지의 숫자만 입력해주세요.")
      return;
    } else if(!isNum) { // c @나긋해 3
      if(message.content.split('<@').length == 2) {
        if(isNaN(message.content.split(' ')[2])) return;

        var user = message.content.split(' ')[1].split('<@!')[1].split('>')[0];
        var count = parseInt(message.content.split(' ')[2])+1;
        let _cnt = 0;

        message.channel.fetchMessages().then(collected => {
          collected.every(msg => {
            if(msg.author.id == user) {
              msg.delete();
              ++_cnt;
            }
            return !(_cnt == count);
          });
        });
      }
    } else {
      message.channel.bulkDelete(parseInt(clearLine)+1)
        .then(() => {
          AutoMsgDelete(message, `<@${message.author.id}> ` + parseInt(clearLine) + "개의 메시지를 삭제했습니다. (이 메세지는 잠시 후에 사라집니다.)");
        })
        .catch(console.error)
    }
  }
});

function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
    return true;
  } else {
    return false;
  }
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
      tmp += ' ';
  }

  return tmp;
}

async function AutoMsgDelete(message, str, delay = 3000) {
  let msg = await message.channel.send(str);

  setTimeout(() => {
    msg.delete();
  }, delay);
}


client.login(token);