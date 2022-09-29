export interface MakeSignUpRequestInterface {
  displayName: string
  email: string
  password: string
  imageUrl: string
}

export interface MakeLoginRequestInterface {
  email: string
  password: string
}

export interface UserData {
  email: string | null
  displayName: string | null
  uid: string
  photoURL: string | null
}

export interface commentToAdd {
  displayName: string | null | undefined
  photoURL: string | null | undefined
  comment: string
  createdAt: number
  id: string
}
