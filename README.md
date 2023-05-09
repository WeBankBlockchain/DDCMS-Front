### 克隆代码
```
git clone https://github.com/WeBankBlockchain/Data-Brain-Front.git
cd Data-Brain-Front
git checkout origin/dev
```

### 修改配置
创建.env（可以参考.env.example）中，将REACT_APP_SERVER_API修改为实际的后端api地址，例如：
```
REACT_APP_SERVER_API=http://localhost:10880/api/
```


更新依赖：
```
yarn
```

启动：
```
yarn start
```

然后用户可以访问http://localhost:3000 进行体验