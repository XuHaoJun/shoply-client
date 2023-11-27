'use client'

import { XStack, YStack, Text, H3, Input, Button, Separator, Anchor } from '@my/ui'
import { LmInput } from '@my/ui/src'
import { Chrome, Facebook } from '@tamagui/lucide-icons'
import React, { useMemo, useState } from 'react'
import { useLink } from 'solito/navigation'
import isEmail from 'validator/lib/isEmail'
import isMobilePhone from 'validator/lib/isMobilePhone'
import { alovaInstance } from '@my/api'

function validateEmailOrPhone(emailOrPhone: string) {
  return isEmail(emailOrPhone) || isMobilePhone(emailOrPhone, 'zh-TW')
}

export function RegisterScreen() {
  const loginLink = useLink({
    href: '/login',
  })
  const [step, setStep] = useState(0)

  const [emailOrPhone, setEmailOrPhone] = useState('')
  const [emailOrPhoneError, setEmailOrPhoneError] = useState<string | undefined>()

  const [otp, setOtp] = useState('')

  const otpType = useMemo(() => {
    if (isEmail(emailOrPhone)) {
      return 0
    }
    if (isMobilePhone(emailOrPhone.replace('0', '+886'), 'zh-TW')) {
      return 1
    }
    return null
  }, [emailOrPhone])

  const handleEmailOrPhoneText = (text: string) => {
    const isPhone = text.startsWith('0') && !isEmail(text)
    let final: string
    if (isPhone) {
      final = text.replace('0', '+886')
    } else {
      final = text
    }
    setEmailOrPhone(text)
    const valid = validateEmailOrPhone(final)
    if (!valid) {
      setEmailOrPhoneError('請輸入有效手機號碼或信箱')
    } else {
      setEmailOrPhoneError(undefined)
    }
  }

  return (
    <YStack>
      <XStack flex={1} jc="center">
        <XStack height={84} maxWidth={1180} flex={1} ai="center">
          <Text fontSize={33} height={42} color="#ee4d2d" marginRight="$5">
            🛒蝦粒購物
          </Text>
          <Text fontSize="$8">註冊</Text>
          <XStack f={1} />
          <Text fontSize="$3">需要幫助?</Text>
        </XStack>
      </XStack>
      <XStack flex={1} jc="center" height={600} backgroundColor="#ee4d2d">
        <YStack flex={1} jc="center" maxWidth={1180}>
          <XStack jc="flex-end">
            <YStack
              width={400}
              backgroundColor="white"
              borderRadius="$4"
              elevation="$8"
              paddingHorizontal="25px"
              paddingVertical="20px"
              space="$3"
            >
              <Text fontSize="$7">註冊</Text>
              <LmInput
                size="$4"
                placeholder="手機號碼或信箱"
                value={emailOrPhone}
                onChangeText={handleEmailOrPhoneText}
                disabled={step !== 0}
                error={Boolean(emailOrPhoneError)}
                helperText={emailOrPhoneError}
              />
              {step === 1 && (
                <XStack space="$2">
                  <Input size="$4" placeholder="驗證碼" value={otp} onChangeText={setOtp} />
                  <Button
                    onPress={() => {
                      alovaInstance.Post('/member/send-otp', { emailOrPhone, otpType }).send()
                    }}
                  >
                    重新發送
                  </Button>
                </XStack>
              )}
              {step === 2 && <Input size="$4" placeholder="姓名" />}
              {step === 2 && <LmInput isPassword size="$4" placeholder="密碼" />}
              {step === 2 && <LmInput isPassword size="$4" placeholder="確認密碼" />}
              {step === 0 && (
                <Button
                  onPress={() => {
                    setStep(1)
                    alovaInstance.Post('/member/send-otp', { emailOrPhone, otpType }).send()
                  }}
                  disabled={!emailOrPhone || (Boolean(emailOrPhone) && Boolean(emailOrPhoneError))}
                >
                  下一步
                </Button>
              )}
              {step === 1 && (
                <Button
                  onPress={async () => {
                    const isVerified = await alovaInstance
                      .Post('/member/verify-otp', { emailOrPhone, otpType, otp })
                      .send()
                    console.log('result', isVerified)
                    if (isVerified) {
                      setStep(2)
                    }
                  }}
                >
                  下一步
                </Button>
              )}
              {step === 2 && <Button>註冊</Button>}
              <Separator alignSelf="stretch" marginVertical={5} />
              {step === 0 && (
                <XStack space>
                  <Button flex={1} icon={Facebook}>
                    Facebook
                  </Button>
                  <Button flex={1} icon={Chrome}>
                    Google
                  </Button>
                </XStack>
              )}
              <XStack jc="center">
                <YStack jc="center" ai="center" maxWidth="80%">
                  <Text fontSize="$1">點擊「下一步」或繼續註冊，即表示您已閱讀並同意</Text>
                  <Text fontSize="$1">蝦粒購物的服務條款與隱私權政策</Text>
                </YStack>
              </XStack>
              <XStack jc="center">
                <Text color="gray">已經有帳號了嗎?</Text>
                <Anchor color="#ee4d2d" marginLeft="$2" {...loginLink}>
                  登入
                </Anchor>
              </XStack>
            </YStack>
          </XStack>
        </YStack>
      </XStack>
      <XStack backgroundColor="#F5F5F5" jc="center">
        <XStack maxWidth={1180} flex={1}>
          <Text>關於蝦粒</Text>
        </XStack>
      </XStack>
    </YStack>
  )
}
