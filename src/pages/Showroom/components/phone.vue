<template>
  <div class="showRoom-container">
    <div class="showRoom-title" />
    <div class="showRoom-content">
      <div class="box_1">
        <h1>Explore Vancouver’s First Mixed-Reality Showroom</h1>
        <p>
          At Homei Living, we seamlessly integrate virtual and physical spaces
          with the use of Mixed Reality, an experience unique to our Showroom.
        </p>
        <p>
          We present an immersive, interactive environment where you can
          experiment and feel inspired in your creative interior design
          exploration. Additionally, through our Real-Scene Display Areas,
          you'll see the home spaces we've created and experience the impeccable
          craftsmanship and the superior quality of our products.
        </p>
        <p>
          Reach out to us today to schedule an appointment for your own bespoke
          consultation or demonstration.
        </p>
      </div>
      <div class="box_2 mt64">
        <h3 class="textCenter">
          Design Consultation
        </h3>
        <p class="mt20">
          We take the art of listening seriously. Tell us what is it you're
          looking for in your home, and we'll show you how to get there.
        </p>
        <div class="common-btn-box mt24">
          <van-button
            class="orange-btn"
            @click="scheduleConsultation"
          >
            SCHEDULE AN IN-PERSON
            CONSULTATION
          </van-button>
        </div>
        <div class="common-btn-box mt12">
          <van-button
            class="dark-btn"
            @click="contactUs(0)"
          >
            CONTACT US FOR MORE INFORMATION
          </van-button>
        </div>
      </div>
      <div class="box_2 mt48">
        <h3 class="textCenter">
          Life-size floor plan
        </h3>
        <p class="mt20">
          Take your imagination to a whole different level. Our life-size floor
          plans let you feel the potential for your space in a way you can truly
          feel.
        </p>
        <div class="common-btn-box mt24">
          <van-button
            class="orange-btn"
            @click="scheduleConsultation"
          >
            SCHEDULE AN IN-PERSON
            EXPERIENCE
          </van-button>
        </div>
        <div class="common-btn-box mt12">
          <van-button
            class="dark-btn"
            @click="contactUs(1)"
          >
            CONTACT US FOR MORE INFORMATION
          </van-button>
        </div>
      </div>
      <div class="box_2 mt48">
        <h3 class="textCenter">
          House Virtual Tour
        </h3>
        <p class="mt20">
          Walk through your home, just like you pictured by taking advantage of
          our virtual house tour options. It's within your grasp.
        </p>
        <div class="common-btn-box mt24">
          <van-button
            class="orange-btn"
            @click="scheduleConsultation"
          >
            SCHEDULE A VIRTUAL TOUR
          </van-button>
        </div>
        <div class="common-btn-box mt12">
          <van-button
            class="dark-btn"
            @click="contactUs(2)"
          >
            CONTACT US FOR MORE INFORMATION
          </van-button>
        </div>
      </div>
    </div>
    <div class="addressBox mt64">
      <div class="images">
        <van-image
          :src="addressMap"
          class="upload-icon"
        />
      </div>
      <div class="contact">
        <div class="contact-item mt36">
          <span class="label">Phone</span>
          <span class="value">{{ info.phone }}</span>
        </div>
        <div class="contact-item mt36">
          <span class="label">Email</span>
          <span class="value">{{ info.email }}</span>
        </div>
        <div class="contact-item mt36">
          <span class="label">Address</span>
          <span class="value">{{ info.address }}</span>
        </div>
        <div class="contact-item mt36">
          <span class="label">Opening Hours</span>
          <span class="value">{{ info.workHours }}</span>
        </div>
      </div>
    </div>

    <!-- <contactUsPopup
      ref="contactUsPopupRef"
      :isdesin="isdesin"
      :type="14"
    /> -->
  </div>
</template>

<script setup>
// import contactUsPopup from './components/contactUsPopup.vue'
// import I18n from '@/locale/i18n'
import addressMap from '@/assets/about/address_map.png'

import {
  getCompanyInfo,
} from '@/apis/common'

// const arrowIcon = require('@/assets/account/arrow-icon.png')

// const {
//   t,
// } = I18n.global

const info = reactive({
  phone: '',
  email: '',
  workHours: '',
  address: '',
})

const scheduleConsultation = () => {
  window.open('https://calendly.com/homeiliving-info/showroom-in-person-consultation')
}

const isdesin = ref(1)
const contactUsPopupRef = ref(null)

const contactUs = (idnums) => {
  isdesin.value = idnums + 1
  console.log('isdesin', isdesin.value)
  contactUsPopupRef.value.showPopup = true
}

onMounted(() => {
  getCompanyInfo().then((res) => {
    Object.keys(info).forEach((key) => {
      info[key] = res[key] || ''
    })
  })
})
</script>

<style lang="scss" scoped>
	.mt36 {
		margin-top: 48px;
	}

	.mt48 {
		margin-top: 48px;
	}

	.mt64 {
		margin-top: 64px;
	}

	.textCenter {
		text-align: center;
	}

	h3 {
		margin: 0;
		color: #263138;
		font-family: MiSans;
		font-size: 20px;
		font-weight: 630;
	}

	p {
		color: #263138;
		font-family: MiSans;
		font-size: 12px;
		font-weight: 330;
		line-height: 20px;
	}

	.showRoom-container {
		position: relative;

		.showRoom-title {
			// position: absolute;
			// top: 0px;
			width: 100%;
			height: 192px;
			text-align: center;
			background: url("@/assets/about/showRoom-img.png") top left/100% no-repeat;
		}

		.showRoom-content {
			display: flex;
			flex-wrap: wrap;
			padding: 0px 16px;
			margin-top: -45px;
		}
	}

	.box_1 {
		display: flex;
		width: 100%;
		box-sizing: border-box;
		padding: 32px 24px;
		flex-direction: column;
		align-items: flex-start;
		gap: 20px;
		border-radius: 2px;
		background: #f9f6f3;
		box-shadow: 0px 0px 32px 0px rgba(0, 0, 0, 0.1);
	}

	.box_2 {
		width: 100%;
	}

	.common-btn-box {

		.orange-btn,
		.dark-btn {
			width: 100%;
			font-size: 12px;
			font-weight: 630;
			height: 32px;
			border-radius: 2px;
		}

		.dark-btn {
			background: #263138;
		}
	}

	.addressBox {
		.images {
			.van-image {
				width: 100%;
			}
		}
	}

	.contact {
		.contact-item {
			display: flex;
			flex-direction: column;
			text-align: center;

			.label {
				color: #263138;
				font-family: MiSans;
				font-size: 18px;
				font-style: normal;
				font-weight: 450;
				line-height: 150%;
				/* 27px */
			}

			.value {
				margin-top: 20px;
				color: #263138;
				font-family: MiSans;
				font-size: 14px;
				font-style: normal;
				font-weight: 330;
				line-height: 150%;
			}
		}
	}
</style>
