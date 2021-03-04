我的毕业设计

##表之间的关系
```javascript
Category.hasMany(Product);
Product.belongsTo(Category);


User.belongsToMany(Product, { through: 'RCart' });
Product.belongsToMany(User, { through: 'RCart' });

User.hasMany(Address);
Address.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

Address.hasOne(Order);
Order.belongsTo(Address);

Order.belongsToMany(Product, { through: 'RList' });
Product.belongsToMany(Order, { through: 'RList' });

User.hasMany(Navigation);
Navigation.belongsTo(User);

Navigation.belongsToMany(Product, { through: 'RMenu' });
Product.belongsToMany(Navigation, { through: 'RMenu' });

Product.hasMany(Display);
Display.belongsTo(Product);

```
Nginx部署
`xiaomi.conf`
```
server {
    listen       80;
    server_name  joeley.cn;
    root /home/nginx/xiaomi/user;
    index  index.html index.htm;
    try_files $uri $uri/ /index.html;

    # location / {
    #     # root   /home/nginx/xiaomi;
    #     # index  index.html index.htm;
    #     # try_files $uri $uri/ /index.html;
    # }

    # 自己上传的图片
    location /api/ {
    	proxy_pass  http://127.0.0.1:5009;
    }
    # 图片
    location ~* \/picture[A-z\/\?\:0-9\-\.]*\.(jpg|jpeg|gif|png|ico|cur|gz|svg|svgz|mp4|ogg|ogv|webm|webp)$ {
    	proxy_pass  http://127.0.0.1:5009;
    }


    location ~* \.(?:jpg|jpeg|gif|png|ico|cur|gz|svg|svgz|mp4|ogg|ogv|webm|webp)$ {
        # 防盗链
        valid_referers server_names *.joeley.cn;
        if ($invalid_referer){
            # rewrite ^/ http://ojt4b2cr5.bkt.clouddn.com/blog/20171028/214345352.png;
            return 409;
        }
        expires 7d;

    }
    location ~* \.(?:js|css)$ {
        expires 7d;
    }

    location ~* \.(?:htm|html)$ {
        add_header Cache-Control "private, no-store, no-cache, must-revalidate, proxy-revalidate";
    }  
}


```
`xiaomiadmin.conf`
```
server {
    listen       80;
    server_name  admin.joeley.cn;
    root /home/nginx/xiaomi/admin;
    index  index.html index.htm;
    try_files $uri $uri/ /index.html;

    # location / {
    #     # root   /home/nginx/xiaomi;
    #     # index  index.html index.htm;
    #     # try_files $uri $uri/ /index.html;
    # }


    location /admin/ {
    	proxy_pass  http://127.0.0.1:5009;
    }
    # 自己上传的图片
    location ~* \/picture[A-z\/\?\:0-9\-\.]*\.(jpg|jpeg|gif|png|ico|cur|gz|svg|svgz|mp4|ogg|ogv|webm|webp)$ {
    	proxy_pass  http://127.0.0.1:5009;
    }


    location ~* \.(?:jpg|jpeg|gif|png|ico|cur|gz|svg|svgz|mp4|ogg|ogv|webm|webp)$ {
        # 防盗链
        valid_referers server_names *.joeley.cn;
        if ($invalid_referer){
            # rewrite ^/ http://ojt4b2cr5.bkt.clouddn.com/blog/20171028/214345352.png;
            return 410;
        }
        expires 7d;

    }
    location ~* \.(?:js|css)$ {
        expires 7d;
    }

    location ~* \.(?:htm|html)$ {
        add_header Cache-Control "private, no-store, no-cache, must-revalidate, proxy-revalidate";
    }  


}

```
---

业务
code 0 成功
code 1 失败 
code 2 没权限 重新登录

---

支付
由于微信支付和支付宝的接口只提供给企业
所以本项目采用支付宝沙盒支付
由于微信没有沙盒支付，所以没接入

---
删除
用户 地址 商品  采用软删除
订单 不可删除 

