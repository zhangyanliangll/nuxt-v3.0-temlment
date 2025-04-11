// SquareManager.js
import * as Square from '@square/web-sdk'

export default class SquareCardPayment {
  constructor({
    appId,
		locationId,
		cardContainerId,
  }) {
    // this.appId = appId || 'sandbox-sq0idb-gig0A09uevV2qgl8NCCI9g';
    // this.locationId = locationId || 'LX2F79X9F80EG';
    // this.appId = 'sq0idp-JCFVdKeFOtyRC3w_74u4tQ'
    // this.locationId = 'LX2F79X9F80EG'
    // this.appId = 'sq0idp-GvibsYHeenahRh4FYa_wCQ'
    // this.locationId = 'LQMJNJVWHT9WP'
    // 2025年1月6日，应客户要求，把家具支付的改成跟会员支付相同的配置了   -- 叶韬修改
    this.appId = 'sq0idp-JCFVdKeFOtyRC3w_74u4tQ'
    this.locationId = 'LN07T98K8GYMJ'

    this.cardContainerId = cardContainerId
  }

  // 初始化
  async initializeCard(vipnum) {
    if (vipnum == 1) {
      this.appId = 'sq0idp-JCFVdKeFOtyRC3w_74u4tQ'
      this.locationId = 'LN07T98K8GYMJ'
    }
    let url = window.location.href
    // 判断链接地址是否包含目标子字符串
    if (url.includes('random.homeiliving.com')) {
      // console.log('子字符串中包含 "random"');
      this.appId = 'sandbox-sq0idb-kwy2kX3gllevS-ByJPGhwA'
      this.locationId = 'LYD0Z1TJ6VNE6'
    }

    this.payments = await Square.payments(this.appId, this.locationId)
    this.card = await this.payments.card({})
    await this.card.attach(`#${this.cardContainerId}`)

    return this.card
  }

  async createPayment(token, verificationToken) {
    const body = JSON.stringify({
      locationId: this.locationId,
      sourceId: token,
      verificationToken,
      idempotencyKey: window.crypto.randomUUID(),
    })
    const paymentResponse = await fetch('/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })

    if (paymentResponse.ok) {
      return paymentResponse.json()
    }

    const errorBody = await paymentResponse.text()
    throw new Error(errorBody)
  }

  async tokenize() {
    const tokenResult = await this.card.tokenize()
    // console.log('tokenResult:', tokenResult)
    if (tokenResult.status === 'OK') {
      return tokenResult.token
    }
    else {
      let errorMessage = `Tokenization failed with status: ${tokenResult.status}`
      if (tokenResult.errors) {
        errorMessage += ` and errors: ${JSON.stringify(tokenResult.errors)}`
      }

      throw new Error(errorMessage)
    }
  }

  async verifyBuyer(verificationDetails) {
    const verificationResults = await this.payments.verifyBuyer(
      await this.tokenize(),
      verificationDetails,
    )
    return verificationResults.token
  }

  // 提交支付
  async handleSubmission(verificationDetails, vipnum) {
    try {
      if (vipnum && vipnum == 1) {
        this.appId = 'sq0idp-JCFVdKeFOtyRC3w_74u4tQ'
        this.locationId = 'LN07T98K8GYMJ'
      }

      const token = await this.tokenize()
      // const verificationToken = await this.verifyBuyer(verificationDetails);
      // const paymentResults = await this.createPayment(token, verificationToken);
      // console.log('paymentResults:', token)
      return {
        status: 'SUCCESS',
        results: token,
      }
    }
    catch (e) {
      return {
        status: 'FAILURE',
        error: e.message,
      }
    }
  }
}
