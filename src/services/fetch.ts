import { cookies } from 'next/headers'

const cookieStore = cookies()
const token = cookieStore.get('konahacustomer.token')?.value

type Folder = {
  id: string
  name: string
  user: {
    id: string
    name: string
  }
}

export type Image = {
  id: string
  name: string
  key_name: string
  size: number
  content_type: string
  tenant_id: string
  user_id: string
  created_at: Date
  updated_at: Date
  imageUrl: string
}

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT

export class FetchApi {
  async getFolder() {
    const foldersResponse = await fetch(`${API_ENDPOINT}/customer/folders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const folders: Folder[] = await foldersResponse.json()

    return folders
  }

  async getImages(folderId: string) {
    const foldersResponse = await fetch(
      `${API_ENDPOINT}/customer/files/${folderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    const folders: Image[] = await foldersResponse.json()

    return folders
  }
}
