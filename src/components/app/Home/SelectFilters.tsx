'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function FolderFilter() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  function handleValueChange(value: string) {
    const params = new URLSearchParams(searchParams)

    const fieldValue = value

    if (fieldValue) {
      params.set('folder', fieldValue)
    } else {
      params.delete('folder')
    }

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="hidden sm:block">
      <Select onValueChange={(value) => handleValueChange(value)}>
        <SelectTrigger className="w-[500px] bg-gray-950 text-white">
          <SelectValue placeholder="Estado do evento" />
        </SelectTrigger>
        <SelectContent className="">
          <SelectItem value="pending" className="flex flex-row gap-2">
            Agendado
          </SelectItem>
          <SelectItem value="processing">Em Progresso</SelectItem>
          <SelectItem value="completed">Concluído</SelectItem>
          <SelectItem value="cancelled">Cancelado</SelectItem>
          <SelectItem value="rescheduled">Adiado</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
