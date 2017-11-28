# remlayout
用于移动端根据designWidth、layoutWidth等参数计算并设置html的font-size，并且可以设置最大的font-size。
## 简介
主要参考了网易的rem布局思想，设计稿上的100px对应css中的1rem，字体大小也采用rem，并且推荐font-family设置为font-family: 'STHeiti','Microsoft YaHei',Helvetica,Arial,sans-serif;。
## 使用方法
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Demo</title>
  <link rel="stylesheet" href="https://cdn.bootcss.com/normalize/7.0.0/normalize.min.css">
  <style>
    body {
      font-family: 'STHeiti','Microsoft YaHei',Helvetica,Arial,sans-serif;
      font-size: .32rem;
      line-height: 1;
    }

    body * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    .wrapper {
      padding-left: .16rem;
      padding-right: .16rem;
      margin: 0 auto;
    }

    .wrapper--max-width {
      /* 推荐设置为maxLayoutWidth */
      max-width: 750px;
    }
    
    .wrapper--no-padding {
      padding-left: 0;
      padding-right: 0;
    }

    .header {
      height: .88rem;
      background-color: #f7f7f7;
      border-bottom: 1px solid
    }

    .title {
      font-weight: normal;
      font-size: .4rem;
      line-height: .88rem;
      text-align: center;
    }

    .example__img {
      display: block;
      width: 3.75rem;
      height: 2rem;
      margin: 0 auto;
    }

    .example__p {
      font-size: .32rem;
    }

    .example__p--s {
      font-size: .28rem;
    }

    .example__p--l {
      font-size: .42rem;
    }

    .example__p--xl {
      font-size: .46rem
    }
  </style>
  <script src="../dist/RemLayout.js"></script>
  <script>
    new RemLayout(750, null, {
      maxLayoutWidth: 800,
      autoResize: true
    });
  </script>
</head>

<body>
  <div class="header">
    <h1 class="title">标题</h1>
  </div>
  <div class="main">
    <div class="wrapper wrapper--max-width">
      <div class="example">
          <img class="example__img" src="http://iph.href.lu/375x200?text=375*200" alt="" srcset="">
          <p class="example__p">1234567890 ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 一段内容</p>
          <p class="example__p--s">1234567890 ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 一段内容</p>
          <p class="example__p--l">1234567890 ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 一段内容</p>
          <p class="example__p--xl">1234567890 ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 一段内容</p>
      </div>
    </div>
  </div>
</body>

</html>
```

## API
