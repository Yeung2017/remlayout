(function (win) {
  /**
   * 构造函数
   * @param {number} designWidth 设计稿的宽度
   * @param {number} layoutWidth layout viewport的宽度
   * @param {object} options 其他参数
   */
  function RemLayout (designWidth, layoutWidth, options) {
    this.resizeTimer = null
    this.options = options || {}
    // 如果没有给layoutWidth,则以自身的clientWidth为准
    if (!!layoutWidth === false) {
      layoutWidth = document.documentElement.clientWidth
    }
    this.layoutWidth = layoutWidth > this.options.maxLayoutWidth
      ? this.options.maxLayoutWidth
      : layoutWidth
    this.designWidth = designWidth

    this.setHtmlFontSize()
    var _this = this
    this.handleResize = function () {
      if (_this.resizeTimer) {
        clearTimeout(_this.resizeTimer)
      }
      _this.resizeTimer = setTimeout(function () {
        _this.layoutWidth = document.documentElement.clientWidth > _this.options.maxLayoutWidth
          ? _this.options.maxLayoutWidth
          : document.documentElement.clientWidth
        _this.setHtmlFontSize()
      }, 20)
    }
    // 如果需要在窗口大小改变的时候自动调整
    if (this.options.autoResize) {
      this.toggleAutoResize(true)
    }
  }

  /**
   * 计算font-size
   */
  RemLayout.prototype.calculateFontSize = function () {
    return this.layoutWidth / this.designWidth * 100
  }

  /**
   * 在根元素上设置font-size
   */
  RemLayout.prototype.setHtmlFontSize = function () {
    document.documentElement.style.fontSize = this.calculateFontSize() + 'px'
    return this
  }

  /**
   * 启用或关闭当窗口大小改变时重新设置font-size的功能
   * @param {boolean} flag 为true时启用,false时关闭
   */
  RemLayout.prototype.toggleAutoResize = function (flag) {
    if (flag) {
      this.options.autoResize = true
      win.addEventListener('resize', this.handleResize)
    } else {
      this.options.autoResize = false
      win.removeEventListener('resize', this.handleResize)
    }
  }

  win.RemLayout = RemLayout
})(window)
