import { instance } from './instance'

// API
export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<LoginResponseType>('login', data)
  },
  signup(data: SignupParamsType) {
    return instance.post<SignupResponseType>('signup', data)
  },
  me(data: MeParamsType) {
    return instance.get<MeResponseType>('me', { params: data })
  },
}

// TYPES
export type LoginParamsType = {
  username: string
  password: string
}

export type SignupParamsType = LoginParamsType & { avatarURL?: string }

type LoginResponseType = {
  token: string
  username: string
  userId: string
}

export type SignupResponseType = {
  token: string
  username: string
  userId: string
  avatarURL: string
  hashedPassword: string
}

export type MeParamsType = {
  username: string
  userId: string
}

type MeResponseType = {
  message: boolean
}
