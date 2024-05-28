'use client'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import Group from "@/lib/@types/group";
import { FC } from 'react'
import { Pencil, Minus, Plus } from "lucide-react";
import { useStaffStore } from "@/lib/providers/staff-store-provider";
interface EditUserRolesProps {
  staffId: string;
  name: string;
}


const EditUserRoles: FC<EditUserRolesProps> = ({ staffId, name }) => {
  const { updateStaffGroup, groups, getGroups } = useStaffStore((state) => state);
  const changeRole = async (groupId: string, state: boolean) => {
    await updateStaffGroup({ staffId, groupId, state });
    await getGroups()
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger className="block mb-2 flex flex-row items-center justify-start gap-2 cursor-pointer text-sm font-medium text-gray-900"><Pencil strokeWidth={1.5} size={18} />Roles</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{`${name}'s roles`}</AlertDialogTitle>
          <div className="flex flex-col gap-3">
            <div>
              <ul>
                {groups.filter(group => group.members.includes(staffId))
                  .map(g => (
                    <li key={g.id} className="hover:bg-neu-2 cursor-pointer mb-2 p-2">
                      <h3 className="capitalize text-acc-7 font-semibold flex flex-row items-center justify-between">
                        {g.name}
                        <Minus onClick={() => changeRole(g.id, false)} color={"red"} strokeWidth={2} size={20} /></h3>
                      <p className="text-sm">{g.description}</p>
                    </li>
                  )
                  )
                }
              </ul>
            </div>
            <div>
              <h3 className="text-pri-6 font-bold">Add These roles to {name}</h3>
              <ul>
                {groups.filter(group => !group.members.includes(staffId))
                  .map(g => (
                    <li key={g.id} className="hover:bg-neu-2 cursor-pointer mb-2 p-2">
                      <h3 className="capitalize text-acc-7 font-semibold flex flex-row items-center justify-between">
                        {g.name}
                        <Plus className="hover:scale(115) transition transition-all" onClick={() => changeRole(g.id, true)} color={"green"} strokeWidth={2} size={20} /></h3>
                      <p className="text-sm">{g.description}</p>
                    </li>
                  )
                  )
                }
              </ul>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  )
}

export default EditUserRoles;