# UFW

> Debian


# 简单版本

* 下载

```bash
wget http://mirrors.163.com/debian/pool/main/u/ufw/(这里自己去查看版本).deb
#	http://mirrors.163.com/debian/pool/main/u/ufw/ufw_0.36.1-4_all.deb
```

* 安装

```bash
sudo dpkg -i *.deb
```

* 配置文件

```bash
nano /etc/default/ufw
```

* 说明

allow 开启

deny 禁止

ignore 忽略

* 查看状态

```bash
sudo  ufw status verbose
#	sudo ufw status
```

* 刷新

```bash
sudo ufw reload
```

* 删除规则

```bash
sudo ufw delete allow ssh#	删除刚才添加的某个规则
```

如果规则又长又复杂，问题就比较棘手了。这里有一个更简单的方法，需要分成两个步骤：

```bash
sudo ufw status numbered    //按规则来编号防火墙规则。命令会将所有防火墙规则以数字列表形式列出来
# 请将 [number] 替换成规则列表对应的数字序号。
sudo ufw delete 1           //按规则编号删除防火墙规则 sudo ufw delete [number]
sudo ufw delete 4           //删除编号为4的规则
```

* 添加规则

```bash
sudo ufw allow port
```

* 范围规则(UDP和TCP需要单独设置)

```bash
sudo ufw allow 0:1024/udp
```

* 禁用端口

示例:

```bash
sudo ufw deny http                      //拒绝http连接
sudo ufw deny smtp                      //禁止外部访问smtp服务

sudo ufw deny from 111.111.111.111      //拒绝特定IP连接
sudo ufw deny from 192.168.1.5 to any   //拦截或拒绝来自192.168.1.5的所有数据包
```








## 1.引言

`Linux`系统下一般会使用`iptables`对防火墙的规则进行管理。`iptables`可以灵活的定义防火墙规则， 功能非常强大,但是由此产生的副作用便是配置过于复杂。在`deepin`系的系统里，附带了一个相对iptables简单很多的防火墙配置工具：`ufw`。

## 2.安装

```bash
wget http://mirrors.163.com/debian/pool/main/u/ufw/(这里自己去查看版本).deb
#	http://mirrors.163.com/debian/pool/main/u/ufw/ufw_0.36.1-4_all.deb
```

```bash
sudo dpkg -i *.deb
```

一般系统已经自带了ufw,如果意外卸载了,可以执行以下命令安装:

```bash
sudo apt install ufw
```

## 3.查看防火墙状态

```
sudo ufw status
sudo ufw status numbered  //按编号显示
```

## 4. 防火墙版本

```
sudo ufw version
```

## 5.开启/禁止端口

```
sudo ufw allow|deny [service]
```

## 6.开启/关闭防火墙 (默认设置是`disable`)

```
sudo ufw enable|disable
```

## 7.常见用法

## 7.1基本使用

```
sudo ufw enable
sudo default deny
```

运行以上两条命令后，开启了防火墙，并在系统启动时自动开启。关闭所有外部对本机的访问，但本机访问外部正常;此时系统已经足够安全了，如果你需要开放某些服务，再使用`sudo ufw allow`开启。

设置默认策略（默认策略即为拒绝所有传入连接，允许所有传出链接）

```
sudo ufw default deny incoming
sudo ufw default allow outgoing
```

允许SSH连接（重要！）否则你将无法连接云服务器…

```
sudo ufw allow ssh
sudo ufw allow 22
```

### 7.2启动端口

示例:

```
sudo ufw allow from 123.45.67.89           //允许从一个 IP 地址连接
sudo ufw allow from 123.45.67.89/24        //允许特定子网的连接：
sudo ufw allow smtp　                      //允许所有的外部IP访问本机的25/tcp （smtp）端口
sudo ufw allow 22/tcp                      //允许所有的外部IP访问本机的22/tcp （ssh）端口
sudo ufw allow 53                          //允许外部访问53端口（tcp/udp）
sudo ufw allow from 192.168.1.100          //允许此IP访问所有的本机端口
sudo ufw allow proto udp 192.168.0.1 port 53 to 192.168.0.2 port 53

sudo ufw allow www
sudo ufw allow 80/tcp

sudo ufw allow ftp
sudo ufw allow 21/tcp

sudo ufw allow 22/tcp             //允许所有的外部IP访问本机的22/tcp (ssh)端口
sudo ufw allow 53                 //允许外部访问53端口(tcp/udp)
sudo ufw allow 80                 //允许外部访问80端口 等价 sudo ufw allow http
sudo ufw allow http

sudo ufw allow from 192.168.1.1   //允许此IP访问所有的本机端口    
sudo ufw allow from 111.111.111.111 to any port 22    //允许特定IP特定端口的连接
sudo ufw allow proto udp 192.168.0.1 port 53 to 192.168.0.2 port 53
sudo ufw allow smtp　             //允许所有的外部IP访问本机的25/tcp (smtp)端口
```

允许特定 IP/端口的组合：

```
sudo ufw allow from 123.45.67.89 to any port 22 proto tcp
//proto tcp 可以删除或者根据你的需求改成 proto udp，所有例子的 allow 都可以根据需要变成 deny。
```

允许特定端口范围连接

```
sudo ufw allow 1000:2000/tcp
sudo ufw allow 2001:3000/udp

//拒绝所有的TCP流量从10.0.0.0/8 到192.168.0.1地址的22端口
sudo ufw deny proto tcp from 10.0.0.0/8 to 192.168.0.1 port 22

//可以允许所有RFC1918网络（局域网/无线局域网的）访问这个主机（/8,/16,/12是一种网络分级）：
sudo ufw allow from 10.0.0.0/8
sudo ufw allow from 172.16.0.0/12
sudo ufw allow from 192.168.0.0/16
```

### 7.3禁用端口

示例:

```
sudo ufw deny http                      //拒绝http连接
sudo ufw deny smtp                      //禁止外部访问smtp服务

sudo ufw deny from 111.111.111.111      //拒绝特定IP连接
sudo ufw deny from 192.168.1.5 to any   //拦截或拒绝来自192.168.1.5的所有数据包
```

除了基于端口的允许或阻止，UFW 还允许您按照 IP 地址、子网和 IP 地址/子网/端口的组合来允许/阻止:

```
ufw deny from {ip-address-here} to any port {port-number-here}

//例子:
sudo ufw deny from 202.54.1.5 to any port 80    //阻断或拒绝IP地址202.54.1.5访问80端口的请求
```

拦截特定IP、端口以及协议:

```
sudo ufw deny proto {tcp|udp} from {ip-address-here} to any port {port-number-here}

//例如:阻断IP地址202.54.1.1访问tcp 22端口（FTP协议），可以输入
sudo ufw deny proto tcp from 202.54.1.1 to any port 22
sudo ufw status numbered
```

拦截子网

```
sudo ufw deny proto tcp from sub/net to any port 22
sudo ufw deny proto tcp from 202.54.1.0/24 to any port 22
```

## 7.4删除规则

```
sudo ufw delete allow ssh
sudo ufw delete allow 22

sudo ufw delete allow http        
sudo ufw delete allow 80
sudo ufw delete allow 80/tcp

sudo ufw delete allow 1000:2000/tcp
```

如果规则又长又复杂，问题就比较棘手了。这里有一个更简单的方法，需要分成两个步骤：

```
sudo ufw status numbered    //按规则来编号防火墙规则。命令会将所有防火墙规则以数字列表形式列出来
# 请将 [number] 替换成规则列表对应的数字序号。
sudo ufw delete 1           //按规则编号删除防火墙规则 sudo ufw delete [number]
sudo ufw delete 4           //删除编号为4的规则
```

## 8.详细说明

```
//[]内的为选配项
//命令激活｜关闭｜重新载入
ufw enable|disable|reload

//命令默认 允许｜阻止｜拒绝 ［访问本机的规则｜向外访问的规则
//注：reject让访问者知道数据被拒绝（回馈拒绝信息）。deny则直接丢弃访问数据，访问者不知道是访问被拒绝还是不存在该主机。
ufw default allow|deny|reject [incoming|outgoing]

//命令日志 开启｜关闭｜“级别”
ufw logging on|off|LEVEL

//命令复位
ufw reset

//命令状态 ［详细｜被编号的规则］
ufw status [verbose|numbered]

//命令显示 “报告类型”
ufw show REPORT

//命令［删除］［插到“x号规则”之前］ 允许｜阻止｜拒绝｜限制 ［进｜出］ ［记录新连接｜记录所有数据包］ “端口” ［/“协议”］
ufw [delete] [insert NUM] allow|deny|reject|limit  [in|out][log|log-all] PORT[/protocol]

//命令［删除］［插到x号规则之前］ 允许｜阻止｜拒绝｜限制 ［进｜出 基于“什么网络设备”］ ［协议 “协议”］ ［来源 “地址” ［端口 “端口”］］ ［目标 “地址” ［端口 “端口”］］
ufw [delete] [insert NUM] allow|deny|reject|limit [in|out on INTERFACE] [log|log-all] [proto protocol] [from ADDRESS [port PORT]] [to ADDRESS [port PORT]]

//命令删除 “第X号规则”
ufw delete NUM

//命令程序 清单｜信息｜默认｜更新
ufw [--dry-run] app list|info|default|update
```

## 9.参数

```
–version
显示程序版本号

-h , –help
显示帮助信息

–dry-run
不实际运行，只是把涉及的更改显示出来。

enable
激活防火墙，开机时自动启动

disable
关闭防火墙，开机时不启动

reload
重新载入防火墙

default allow|deny|reject 方向
方向是指：向内（incoming）｜向外（outgoing）。如果更改了默认策略，一些已经存在的规则可能需要手动修改。更多内容看“规则示例”一节。

logging on|off|“级别”
切换日志状态。日志记录包使用的是系统日志。“级别”有好几个，默认是低级（low）。详细内容看“日志”一节。

reset [--force]
关闭防火墙，并复位至初始安装状态。如果使用–force选项，则忽略确认提示。

status
显示防火墙的状态和已经设定的规则。使用status verbose显示更详细的信息。‘anywhere’与‘any’、‘0.0.0.0/0’一个意思。

show “报告类型”
显示防火墙运行信息。详细内容看“报告类型”

limit “规则”
此命令目前只能用于IPv4。还不支持IPv6.
```

学习更多知识,加QQ群:1098090823









