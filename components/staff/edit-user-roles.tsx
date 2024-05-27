'use client'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Group from "@/lib/@types/group";
import { FC } from 'react'
import { Button } from '@/components/ui/button'
import { Pencil } from "lucide-react";

interface EditUserRolesProps {
  staffId: String;
  groups: Group[];
}

const EditUserRoles: FC<EditUserRolesProps> = ({ staffId, groups }) => {
  return (
    <Popover>
      <PopoverTrigger>
      <Button variant="ghost" className="block mb-2 flex flex-row items-center justify-start gap-4 cursor-pointer text-sm font-medium text-gray-900"><Pencil strokeWidth={1.5} size={18} />Roles</Button>
</PopoverTrigger>
      <PopoverContent>
        <ul>
          <li>Option 1</li>
          <li>Option 2</li>
          <li>Option 3</li>
        </ul>
      </PopoverContent>
    </Popover>
  )
}

export default EditUserRoles;