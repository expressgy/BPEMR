![Docker](./Docker.assets/Docker.svg)

>  说明

- 学习来源
  - [学习 Docker 看完哪篇超详细的教程就足够了？ - 知乎 (zhihu.com)](https://www.zhihu.com/question/485967221)
  - [【docker教程】2022新完整版docker容器教程，入门到精通3天光速搞定_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1AZ4y1b7ev/)


------



[toc]

# 📙一、 系统介绍

## 1 概括性介绍

### 1.1 Docker Run做了什么

- 查找本地镜像
- 查找网络镜像

### 1.2 Docker工作机制

> 作者：步尔斯特
> 链接：https://www.zhihu.com/question/485967221/answer/2556644950
> 来源：知乎
> 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

Docker是一个Client-Server结构的系统，Docker守护进程运行在主机上， 然后通过Socket从客户端访问，DockerServer（守护进程）接受到DockerClient（客户端）的指令，就会执行这个命令。

守护进程管理运行在主机上的容器 。

容器，是一个运行时环境，就是我们前面说到的集装箱。

### 1.3 Docker比VMware快的原因

> 作者：步尔斯特
> 链接：https://www.zhihu.com/question/485967221/answer/2556644950
> 来源：知乎
> 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

- `docker有着比虚拟机更少的抽象层`。由于docker不需要Hypervisor实现硬件资源虚拟化,运行在docker容器上的程序直接使用的都是实际物理机的硬件资源。因此在CPU、内存利用率上docker将会在效率上有明显优势。
- `docker利用的是宿主机的内核,而不需要Guest OS`。因此,当新建一个容器时,docker不需要和虚拟机一样重新加载一个操作系统内核。仍而避免引寻、加载操作系统内核返个比较费时费资源的过程,当新建一个虚拟机时,虚拟机软件需要加载Guest OS,返个新建过程是分钟级别的。而docker由于直接利用宿主机的操作系统,则省略了返个过程,因此新建一个docker容器只需要几秒钟。
- **Docker底层共用物理机的实际资源，而虚拟机需要模拟物理机的操作系统资源，所以Docker加载得更快，而虚拟机更慢。**



<img src="./Docker.assets/Docker%E5%92%8CVMware%E5%8C%BA%E5%88%AB.png" alt="Docker和VMware区别" style="zoom:50%;" />



> Docker是一个解决了运行环境和配置问题，并且方便做持续集成以及有助于整体发布的容器虚拟化技术。

- 镜像
- 容器
- 仓库

-----



# 📦二、 安装

## 1 脚本安装

```bash
$ curl -fsSL https://get.docker.com -o get-docker.sh
$ DRY_RUN=1 sh ./get-docker.sh	# 了解脚本在安装过程中将执行哪些步骤
$ sudo sh test-docker.sh	# 直接执行
```

## 2 package包

- 转到 [`https://download.docker.com/linux/debian/dists/`](https://download.docker.com/linux/debian/dists/)，选择您的 Debian 版本，然后浏览到 、选择 、 或 ，然后下载您要安装的 Docker 引擎版本的文件。`pool/stable/``amd64``armhf``arm64``.deb`

- 安装

```bash
$ sudo dpkg -i package.deb
```

- 运行

```bash
$ sudo docker run hello-world
```

## 3 软件源

参考：

> [在 Debian | 上安装 Docker 引擎泊坞窗文档](https://docs.docker.com/engine/install/debian/)
>
> [Debian安装Docker(国内源) - 简书 (jianshu.com)](https://www.jianshu.com/p/e9873d92ebbd)
>
> [容器镜像服务 (aliyun.com)](https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors)

### 3.1 卸载

#### 3.1.1 普通卸载

卸载内容：`docker` `docker.io` `docker-engine`

```bash
$ sudo apt-get remove docker docker-engine docker.io containerd runc
```

将保留 的内容，包括映像、容器、卷和网络。

#### 3.1.2 完全卸载

- 卸载泊坞引擎、CLI、容器化和泊坞窗撰写包：

  ```bash
  $ sudo apt-get purge docker-ce docker-ce-cli containerd.io docker-compose-plugin
  $ # purge不保留配置文件
  ```

- 主机上的映像、容器、卷或自定义配置文件不会自动删除。删除所有映像、容器和卷：

  ```bash
  $ sudo rm -rf /var/lib/docker
  $ sudo rm -rf /var/lib/containerd
  ```

您必须手动删除任何已编辑的配置文件。

### 3.2 安装

#### 3.2.1 设置源

1. ##### 基础源

```bash
$ # 编辑/etc/apt/sources.list
# 阿里云源 
deb https://mirrors.aliyun.com/debian/ bullseye main non-free contrib
deb-src https://mirrors.aliyun.com/debian/ bullseye main non-free contrib
deb https://mirrors.aliyun.com/debian-security/ bullseye-security main
deb-src https://mirrors.aliyun.com/debian-security/ bullseye-security main
deb https://mirrors.aliyun.com/debian/ bullseye-updates main non-free contrib
deb-src https://mirrors.aliyun.com/debian/ bullseye-updates main non-free contrib
deb https://mirrors.aliyun.com/debian/ bullseye-backports main non-free contrib
deb-src https://mirrors.aliyun.com/debian/ bullseye-backports main non-free contrib

$ sudo apt-get update
$ sudo apt-get install \
	apt-transport-https \
	ca-certificates \
	curl \
	gnupg \
	lsb-release
```

2. ##### 设置Docker源

- 官方源
  - 添加Docker官方的GPG key
  - 设置stable源

```bash
# 添加Docker官方的GPG key
$ sudo mkdir -p /etc/apt/keyrings
$ curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
# 设置stable源
$ echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

- 国内源
  - 添加Docker官方的GPG key
  - 设置stable源

```bash
# 添加Docker官方的GPG key
$ sudo mkdir -p /etc/apt/keyrings
$ curl -fsSL http://mirrors.ustc.edu.cn/docker-ce/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
# 设置stable源
$ echo \
  "deb [arch=amd64 signed-by=/etc/apt/keyrings/docker.gpg] http://mirrors.ustc.edu.cn/docker-ce/linux/debian \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

3. ##### 安装

- 更新包索引安装最新的Docker

```bash
$ sudo apt-get update
```

- 查看可用版本

```bash
$ apt-cache madison docker-ce

 docker-ce | 5:20.10.18~3-0~debian-bullseye | https://download.docker.com/linux/debian bullseye/stable amd64 Packages
 docker-ce | 5:20.10.17~3-0~debian-bullseye | https://download.docker.com/linux/debian bullseye/stable amd64 Packages
 docker-ce | 5:20.10.16~3-0~debian-bullseye | https://download.docker.com/linux/debian bullseye/stable amd64 Packages
 docker-ce | 5:20.10.15~3-0~debian-bullseye | https://download.docker.com/linux/debian bullseye/stable amd64 Packages
 docker-ce | 5:20.10.14~3-0~debian-bullseye | https://download.docker.com/linux/debian bullseye/stable amd64 Packages
 docker-ce | 5:20.10.13~3-0~debian-bullseye | https://download.docker.com/linux/debian bullseye/stable amd64 Packages
 docker-ce | 5:20.10.12~3-0~debian-bullseye | https://download.docker.com/linux/debian bullseye/stable amd64 Packages
 docker-ce | 5:20.10.11~3-0~debian-bullseye | https://download.docker.com/linux/debian bullseye/stable amd64 Packages
 docker-ce | 5:20.10.10~3-0~debian-bullseye | https://download.docker.com/linux/debian bullseye/stable amd64 Packages
 docker-ce | 5:20.10.9~3-0~debian-bullseye | https://download.docker.com/linux/debian bullseye/stable amd64 Packages
 docker-ce | 5:20.10.8~3-0~debian-bullseye | https://download.docker.com/linux/debian bullseye/stable amd64 Packages
 docker-ce | 5:20.10.7~3-0~debian-bullseye | https://download.docker.com/linux/debian bullseye/stable amd64 Packages
 docker-ce | 5:20.10.6~3-0~debian-bullseye | https://download.docker.com/linux/debian bullseye/stable amd64 Packages
```

- 安装最新版

```bash
$ sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

- 安装指定版本，版本号为`5:20.10.8~3-0~debian-bullseye`

```bash
$ sudo apt-get install docker-ce=<VERSION_STRING> docker-ce-cli=<VERSION_STRING> containerd.io docker-compose-plugin
```

4. ##### 运行测试

- 通过运行`hello-world`镜像来验证是否正确安装了 Docker 引擎。

```bash
$ sudo docker run hello-world
```

5. ##### 设置仓库(配置docker加速器)

```bash
$ sudo mkdir -p /etc/docker
$ sudo touch /etc/docker/daemon.json

#	编辑此文件，加入以下内容
{
 "registry-mirrors" : [
 "https://8xpk5wnt.mirror.aliyuncs.com" # 自己的阿里云镜像源，每个人不一样
 # https://docker.mirrors.ustc.edu.cn	# 中科大的源
 ]
}

# 重启
systemctl daemon-reload
systemctl restart docker
# 设置开机启动
systemctl enable docker

#查看是否运行
ps aux | grep docker

docker ps
docker images
docker version
```



### 3.3 以非root身份运行

#### 3.3.1 查看用户组

```bash
$ sudo cat /etc/group |grep docker

# docker:x:998:表示存在
```

#### 3.3.2 创建用户组

```bash
$ sudo groupadd docker
```

#### 3.3.3 将用户添加到用户组

```bash
$ sudo usermod -aG docker $USER
$ newgrp docker	# 激活组更改，无效的话尝试重连ssh，退出登录，重启计算机等
```

### 3.4 为Docker指定DNS服务器

[Linux |的安装后步骤泊坞窗文档 (docker.com)](https://docs.docker.com/engine/install/linux-postinstall/#specify-dns-servers-for-docker)

### 3.5 CentOS上安装

> 大同小异，参考[在 CentOS |上安装Docker引擎文档 (docker.com)](https://docs.docker.com/engine/install/centos/)

-----



# 📒三、入门

## 1 基础组件

### 1.1 ⭐Docker引擎

<img src="./Docker.assets/Docker%20Engine.png" alt="Docker Engine" style="zoom: 50%;" />

### 1.2 ⭐Docker核心

<img src="./Docker.assets/Docker%E6%A0%B8%E5%BF%83.png" alt="Docker核心" style="zoom: 50%;" />

### 1.3 ⭐Docker平台组成

<img src="./Docker.assets/Docker%E5%B9%B3%E5%8F%B0%E7%BB%84%E6%88%90.png" alt="Docker平台组成" style="zoom: 50%;" />

### 1.4 ⭐Docker生命周期

<img src="./Docker.assets/Docker%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.png" alt="Docker生命周期" style="zoom:50%;" />

### 1.5 ⭐Docker分层原理

![镜像分层原理](./Docker.assets/%E9%95%9C%E5%83%8F%E5%88%86%E5%B1%82%E5%8E%9F%E7%90%86.png)



-----



# 🔯四、命令
