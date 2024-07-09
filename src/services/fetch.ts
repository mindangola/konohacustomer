import { cookies } from 'next/headers'

const cookieStore = cookies()
const token = cookieStore.get('konaha.token')?.value

type Folder = {
  id: string
  name: string
  user: {
    id: string
    name: string
  }
}

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT

export class FetchApi {
  async getFolder(url: string) {
    const foldersResponse = await fetch(`${API_ENDPOINT}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const folders: Folder[] = await foldersResponse.json()

    return folders
  }

  async getImages(folderId: string) {
    const foldersResponse = await fetch(
      `${API_ENDPOINT}/folders/user/${folderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    const folders: Folder[] = await foldersResponse.json()

    return folders
  }
}
