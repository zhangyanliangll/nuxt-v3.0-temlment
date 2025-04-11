<template>
  <div class="page-container">
    <div class="content_1">
      <div
        class="videos"
        :style="{ background: playerobj.videoUrl ? 'transparent' : '' }"
      >
        <div
          v-show="playerobj.videoUrl"
          style="height: 100%; width: 100%"
        >
          <!-- <video ref="videosplayer" id="videosplayer" :src="playerobj.videoUrl"
						style="height: 100%; width: 100%" autoplay muted loop></video> -->
        </div>
        <div class="textboxs service-list">
          <div>
            <div class="textboxsbody">
              <div>
                <div class="text-header">
                  <p>Explore Vancouver’s First Mixed-Reality Showroom</p>
                </div>
                <div class="text-body">
                  <p>
                    At Homei Living, we seamlessly integrate virtual and physical spaces with the use
                    of Mixed Reality, an experience unique to our Showroom.
                  </p>
                  <p>
                    We present an immersive, interactive environment where you can experiment and
                    feel inspired in your creative interior design exploration. Additionally,
                    through our Real-Scene Display Areas, you'll see the home spaces we've created
                    and experience the impeccable craftsmanship and the superior quality of our
                    products.
                  </p>
                  <p>
                    Reach out to us today to schedule an appointment for your own bespoke
                    consultation or demonstration.
                  </p>
                </div>
              </div>
              <div class="videosbgc">
                <img
                  src="../assets/image/about/showroom_bgc.png"
                  alt=""
                >
              </div>
              <!-- <img v-if="player" @click="chengeplay" class="videosplay" src="@/assets/newicos/play.svg"
								alt="" />
							<img v-if="!player" @click="chengeplay" class="videosplay" src="@/assets/newicos/pause.svg"
								alt="" /> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content_2">
      <div class="service-list">
        <template
          v-for="(item, index) in serviceData"
          :key="index"
        >
          <div class="service-item">
            <p class="service-title">
              {{ item.title }}
            </p>
            <p class="service-introduce">
              {{ item.introduce }}
            </p>
            <div class="btns">
              <el-button
                class="btn button-red--small"
                style="color: #fff;"
                color="#E85E38"
                @click="serviceclick(1)"
              >
                {{
                  item.btn1 }}
              </el-button>
            </div>
            <div class="btns mt16">
              <el-button
                class="btn button-black--small"
                color="#263138"
                @click="serviceclick(2, index)"
              >
                {{
                  item.bth2 }}
              </el-button>
            </div>
          </div>
          <div
            v-if="index != serviceData.length - 1"
            class="line-row"
          />
        </template>
      </div>
    </div>
    <div class="content_3">
      <div class="content3_body">
        <div class="map">
          <img
            src="../assets/image/mapImages.png"
            alt=""
          >
        </div>
        <div class="contact">
          <div
            v-for="(item, index) in contactInformation.titleData"
            :key="index"
            class="contact-item"
          >
            <p class="contact_title">
              {{ item.title }}
            </p>
            <p class="contact_value">
              {{ contactInformation.data[item.key] }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 弹框提交表单 -->
    <div
      v-if="showForm"
      class="design-mask"
    >
      <div
        class="zzc"
        @click.stop="
          showForm = false;
          formData.type = 20;
        "
      />
      <div class="design-box">
        <div class="design-top">
          <p class="design-title">
            Which service you are interested in?
            <!-- {{ $t('ContactUs.designExpertsTitle') }} -->
          </p>
          <svg-icon
            class="close-icon"
            name="close-login"
            @click="showForm = false"
          />
        </div>
        <el-form
          ref="formRef"
          :model="formData"
        >
          <div class="contens">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                {{ isdesin==1?'Design Consultation':isdesin==2?'Life-size floor plan':isdesin==3?'House Virtual Tour':'Other' }}
                <svg-icon
                  class="more"
                  name="ai-expend"
                />
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="1">
                    Design Consultation
                  </el-dropdown-item>
                  <el-dropdown-item command="2">
                    Life-size Floor Plan
                  </el-dropdown-item>
                  <el-dropdown-item command="3">
                    House Virtual Tour
                  </el-dropdown-item>
                  <el-dropdown-item command="4">
                    Other
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <!-- <p v-if="isdesin==0">- Design Consultation</p>
					  <p v-if="isdesin==1">- Life-size floor plan</p>
						<p v-if="isdesin==2">- House Virtual Tour</p> -->
            <el-row
              v-if="isdesin==4"
              :gutter="20"
            >
              <el-col :span="24">
                <el-form-item class="form-item">
                  <!-- <form-input
                    v-model:value="formData.comments"
                    class="form-input-s"
                    label=""
                    placeholder="Please enter text"
                    :max-length="100"
                  /> -->
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div class="logidesignn-content-box">
            <div class="design-content">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item
                    class="form-item"
                    prop="name"
                    :rules="formRules.name"
                  >
                    <!-- <form-input
                      v-model:value="formData.name"
                      class="form-input-s"
                      :label="$t('ContactUs.name')"
                      :placeholder="$t('ContactUs.name')"
                      :max-length="100"
                      :required="true"
                    /> -->
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    class="form-item"
                    prop="email"
                    :rules="formRules.email"
                  >
                    <!-- <form-input
                      v-model:value="formData.email"
                      class="form-input-s"
                      label="Email"
                      placeholder="Email"
                      :max-length="100"
                    /> -->
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item class="form-item">
                    <!-- <form-input
                      v-model:value="formData.thoughts"
                      class="form-input-s"
                      label="Messages"
                      placeholder="Please enter text"
                      :max-length="100"
                    /> -->
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <el-button
              class="submit-btn"
              @click.stop="submit"
            >
              {{ $t('Common.submit') }}
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ElMessage,
} from 'element-plus'

import {
  useI18n,
} from 'vue-i18n'
// import {
//   useMeta,
// } from 'vue-meta'
// import {
//   useHead,
// } from '@vueuse/head'

import {
  homepageVideoCommendApi,
  putContactInfo,
} from '@/apis/common'

// import formInput from '@/components/Basic/formInput.vue'

import {
  phoneReg,
  emailReg,
} from '@/unit/pattern'

const {
  t,
} = useI18n()

// useMeta({
//   title: 'Homei Living Showroom | Experience Your Home with Virtual Tours and Life-Size Floor Plans',
//   htmlAttrs: {
//     lang: 'en',
//     amp: true,
//   },
//   meta: [{
//     name: 'mixed reality showroom,virtual house tours,life-size floor plans,design consultation,home design experience,interactive showroom',
//     description: 'Experience Homei Living\'s Digital Showroom, where virtual and physical spaces merge. Explore life-size floor plans, virtual house tours, and personalized design consultations to bring your dream home to life. Schedule your bespoke consultation today.',
//   }],
// })

// useHead({
//   title: 'Homei Living Showroom | Experience Your Home with Virtual Tours and Life-Size Floor Plans',
//   meta: [{
//     name: 'mixed reality showroom,virtual house tours,life-size floor plans,design consultation,home design experience,interactive showroom',
//     description: 'Experience Homei Living\'s Digital Showroom, where virtual and physical spaces merge. Explore life-size floor plans, virtual house tours, and personalized design consultations to bring your dream home to life. Schedule your bespoke consultation today.',
//   }],
// })

// 视频位置
const playerobj = ref({
  videoUrl: '',
  bannerLabel: '',
  buttonLabel: '',
  url: '',
})

const showForm = ref(false)

const serviceData = ref([{
  title: 'Design Consultation',
  introduce: 'We take the art of listening seriously. Tell us what is it you\'re looking for in your home, and we\'ll show you how to get there.',
  btn1: 'SCHEDULE AN IN-PERSON CONSULTATION',
  bth2: 'CONTACT US FOR MORE INFORMATION',
},
{
  title: 'Life-size Floor Plan',
  introduce: 'Take your imagination to a whole different level. Our life-size floor plans let you feel the potential for your space in a way you can truly feel.',
  btn1: 'SCHEDULE AN IN-PERSON CONSULTATION',
  bth2: 'CONTACT US FOR MORE INFORMATION',
},
{
  title: 'House Virtual Tour',
  introduce: 'Walk through your home, just like you pictured by taking advantage of our virtual house tour options. It\'s within your grasp.',
  btn1: 'SCHEDULE AN IN-PERSON CONSULTATION',
  bth2: 'CONTACT US FOR MORE INFORMATION',
},
])

// 联系方式
const contactInformation = ref({
  titleData: [{
    title: 'Phone',
    key: 'phone',
    // value: "+1 778.223.4282",
  },
  {
    title: 'Email',
    key: 'email',
    value: 'info@homeiliving.com',
  },
  {
    title: 'Address',
    key: 'address',
    // value: "12620 Bridgeport Rd, #150, Richmond, BC, V6V 1J5",
  },
  {
    title: 'Opening Hours',
    key: 'workHours',
    // value: "Monday - Friday 10:00 - 17:00 PST (By appointment only)",
  },
  ],
  data: {
    phone: '+1 604.238.6766',
    address: '12620 Bridgeport Rd, #150, Richmond, BC, V6V 1J5',
    workHours: 'Monday - Sunday 10 AM - 6 PM ',
    email: 'info@homeiliving.com',
  },
})

function gethomepageVideoCommend() {
  homepageVideoCommendApi().then((res) => {
    playerobj.value = res
  })
}

const isdesin = ref(1)
const serviceclick = (num, idnums) => {
  if (num == 1) {
    window.open('https://calendly.com/homeiliving-info/showroom-in-person-consultation')
  }
  else {
    isdesin.value = idnums + 1
    showForm.value = true
  }
}

const formRef = ref()
const submit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      formData.serviceType = isdesin.value
      putContactInfo(formData).then(() => {
        ElMessage(t('Common.submitSuccess'))
        formData.name = ''
        formData.email = ''
        formData.phone = ''
        formData.comments = ''
        formData.thoughts = ''
        showForm.value = false
      })
    }
  })
}
// 弹窗
const formData = reactive({
  name: '',
  phone: '',
  email: '',
  comments: '',
  thoughts: '',
  serviceType: 4,
  type: 20,
})

const formRules = reactive({
  name: [{
    required: true,
    message: t('Common.pleaseEnter', {
      attr: t('ContactUs.name'),
    }),
    trigger: 'blur',
  }],
  phone: [{
    required: true,
    message: t('Common.pleaseEnter', {
      attr: t('ContactUs.phoneNumber'),
    }),
    trigger: 'blur',
  },
  {
    pattern: phoneReg,
    message: t('Common.formatIncorrect', {
      attr: t('ContactUs.phoneNumber'),
    }),
  },
  ],
  email: [{
    required: true,
    message: t('Common.pleaseEnter', {
      attr: t('ContactUs.emailAddr'),
    }),
    trigger: 'blur',
  },
  {
    pattern: emailReg,
    message: t('Common.formatIncorrect', {
      attr: t('ContactUs.emailAddr'),
    }),
  },
  ],
})

const handleCommand = (val) => {
  console.log(val, '获取val值')
  isdesin.value = val
}

const informa = ref({})

onMounted(async () => {
  await gethomepageVideoCommend()

  informa.value = localStorage.getItem('informaton')
    ? JSON.parse(localStorage.getItem('informaton'))
    : {}
  if (informa.value.phone) {
    contactInformation.value.data.phone = informa.value.phone
  }
  if (informa.value.email) {
    contactInformation.value.data.email = informa.value.email
  }
  if (informa.value.address) {
    contactInformation.value.data.address = informa.value.address
  }
  if (informa.value.workHours) {
    contactInformation.value.data.workHours = informa.value.workHours
  }
})
</script>

<style lang="scss" scoped>
	.mt16 {
		margin-top: 16px;
	}

	.page-container {
		background: #fff;
		height: 100%;

		.content_1 {
			// background-image: url('@/assets/image/services/1.png');
			background: url('@/assets/image/about/Showroom-title-bgc.jpg');
			background-size: cover;
			background-repeat: no-repeat;
			height: 1080px;

			.videos {
				position: relative;
				width: 100%;
				height: 1080px;
				// background: #000;
				overflow: hidden;
				// background: url(../../assets/image/about//Showroom-title-bgc.jpg) center;

				video {
					object-fit: cover;
				}

				.service-list {
					width: 1360px;
					height: 100%;
					padding-top: 334px;
					position: absolute;
					top: 0;
					left: 50%;
					transform: translate(-50%, 0);
				}

				.textboxs {
					color: #fff;

					.textboxsbody {
						position: relative;
						width: 100%;

						.videosplay {
							position: absolute;
							top: 580px;
							left: 837px;
							width: 60px;
							height: 60px;
							cursor: pointer;
						}

						.videosbgc {
							position: absolute;
							top: -25%;
							right: 0;
							width: 543px;
							height: 898px;
							background: pink;
							border-top-left-radius: 275px;
							border-top-right-radius: 275px;
							overflow: hidden;

							img {
								width: 543px;
								height: 898px;
							}
						}
					}

					.text-header {
						width: 755px;

						p {
							color: #263138;
							font-family: MiSans;
							font-size: 72px;
							font-weight: 630;
						}
					}

					.text-body {
						margin-top: 60px;
						width: 590px;

						p {
							color: #6D6258;
							font-family: MiSans;
							font-size: 18px;
							font-style: normal;
							font-weight: 430;
							line-height: 28px;
							margin-top: 32px;
						}
					}
				}

			}

		}

		.content_2 {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 160px 0;
			gap: 20px;

			&>h1 {
				color: #263138;
				font-size: 32px;
				font-style: normal;
				font-weight: 630;
				line-height: normal;
			}

			&>p {
				color: #6d6258;
				font-size: 24px;
				font-style: normal;
				font-weight: 380;
				line-height: 100%;
				/* 24px */
				letter-spacing: 1px;
				text-transform: uppercase;
			}

			.service-list {
				padding-top: 20px;
				display: flex;
				flex-wrap: wrap;
				gap: 40px;
				width: 1360px;
				justify-content: space-between;

				.service-item {
					width: 380px;
					height: 334px;

					.service-title {
						color: #000;
						text-align: center;
						font-family: MiSans;
						font-size: 20px;
						font-style: normal;
						font-weight: 630;
						/* 30px */
						padding-top: 48px;
					}

					.service-introduce {
						color: #000;
						text-align: center;
						font-family: MiSans;
						font-size: 16px;
						font-style: normal;
						font-weight: 430;
						/* 24px */
						padding-top: 24px;
						height: 100px;

					}

					.btns {
						width: 100%;

						&:nth-of-type(1) {
							margin-top: 10px;
						}

						&:nth-of-type(2) {
							margin-top: 16px;
						}
					}

					.btn {
						width: 100%;
						height: 35px;
						font-family: MiSans;
						font-size: 14px;
						font-weight: 450;
						letter-spacing: 1px;
					}
				}

				.line-row {
					width: 1px;
					height: 334px;
					background: #000;
				}

				// &>div {
				// 	width: 660px;
				// 	height: 509px;
				// 	border-radius: 4px;
				// 	position: relative;
				// 	cursor: pointer;

				// 	&>img {
				// 		width: 660px;
				// 		height: 371px;
				// 	}

				// 	&>div {
				// 		background-color: #f9f6f3;
				// 		padding: 40px;
				// 		display: flex;
				// 		flex-direction: column;
				// 		gap: 10px;
				// 		align-items: center;
				// 		position: absolute;
				// 		bottom: 0;
				// 		left: 0;
				// 		right: 0;
				// 		height: 138px;
				// 		/* 初始高度 */
				// 		transition: height 0.5s;

				// 		&>h2 {
				// 			color: #21272a;
				// 			font-size: 20px;
				// 			font-style: normal;
				// 			font-weight: 630;
				// 			line-height: normal;
				// 		}

				// 		&>p {
				// 			color: #21272a;
				// 			text-align: center;
				// 			font-size: 16px;
				// 			font-style: normal;
				// 			font-weight: 430;
				// 			line-height: 24px;
				// 		}
				// 	}

				// 	&:hover {
				// 		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

				// 		&>div>h2 {
				// 			text-decoration: underline;
				// 		}

				// 		&>div {
				// 			height: 160px;
				// 		}
				// 	}
				// }
			}
		}

		.content_3 {
			width: 100%;
			height: 520px;
			background: #F9F6F3;
			box-sizing: border-box;
			padding: 80px 0px;

			.content3_body {
				width: 1360px;
				margin: 0 auto;
				display: flex;

				.map {
					width: 732px;
					height: 360px;

					img {
						width: 100%;
						height: 100%;
					}
				}

				.contact {
					margin-left: 92px;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					width: 536px;

					.contact-item {
						.contact_title {
							color: #263138;
							font-family: MiSans;
							font-size: 24px;
							font-style: normal;
							font-weight: 380;
							/* 36px */
						}

						.contact_value {
							margin-top: 20px;
							color: #263138;
							font-family: MiSans;
							font-size: 16px;
							font-style: normal;
							font-weight: 430;
							/* 24px */
						}
					}
				}

			}
		}
	}

	// 这一块不知道有没有用
	.design-mask {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		// background: rgba(0, 0, 0, 0.7);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 2002;

		.zzc {
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.7);
			position: absolute;
		}

		.form-input {
			width: 100%;
		}

		.submit-btn {
			// margin-top: 40px;
			display: block;
			height: 50px;
			width: 100%;
			color: #fff;
			text-align: center;
			font-size: 16px;
			font-weight: 700;
			padding: 14px 0;
			background: #263138;
			border-radius: 2px;
			cursor: pointer;
			margin-top: 16px;
		}

		.form-title {
			color: #263138;
			font-family: MiSans;
			font-size: 16px;
			font-style: normal;
			font-weight: 500;
			line-height: normal;
			margin-bottom: 12px;
		}

		.form-item {
			margin-bottom: 24px;
		}

		.design-box {
			width: 942px;
			background: #fff;
			border-radius: 4px;
			padding: 24px;
			position: relative;

			.el-row {
				.el-col {
					flex: 1;
				}
			}
		}

		.design-content-box {
			width: 100%;
			height: 100%;
			display: flex;
			padding: 40px;
			flex-direction: column;
			align-items: center;
			position: relative;
		}

		.design-top {
			display: flex;
			align-items: center;
			margin: 0 auto 40px;

			.design-title {
				color: #263138;
				font-family: MiSans;
				font-size: 20px;
				font-style: normal;
				font-weight: 700;
				line-height: normal;
			}

			.close-icon {
				width: 32px;
				height: 32px;
				position: absolute;
				top: 24px;
				right: 24px;
				flex-shrink: 0;
				cursor: pointer;
			}
		}
	}

	.logidesignn-content-box {
		margin-top: 20px;
	}

	.el-dropdown-link {
		cursor: pointer;
		color: var(--el-color-primary);
		display: flex;
		align-items: center;

		.more {
			width: 30px;
			height: 30px;
		}
	}
</style>
