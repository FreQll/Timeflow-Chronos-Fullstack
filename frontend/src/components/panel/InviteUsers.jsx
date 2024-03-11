import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '../ui/dialog';
import { Label, Separator } from '@radix-ui/react-dropdown-menu'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import ButtonBlue from '../buttons/ButtonBlue'
import { Button } from '../ui/button'
import ComboboxPopover from '../ComboboxPopover';
import axios, { GET_CONFIG } from '../../../API/axios';

const InviteUsers = ({ calendars }) => {
    const [ email, setEmail ] = useState('');
    const [ selectedCalendar, setSelectedCalendar ] = useState(calendars && calendars[0].calendar)

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleInvite = async () => {
        console.log(email);
        const isEmailExist = await axios.get(`/api/user/email/${email}`, GET_CONFIG);
        console.log(isEmailExist);
    }

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle className='font-[600] text-[20px]'>Invite users</DialogTitle>
                <Separator className='h-[1px] bg-gray-200' />
            </DialogHeader>
            <table className=" border-separate border-spacing-[10px] py-[10px]">
                <tbody>
                    <tr>
                        <td className="text-right"><Label htmlFor="title" className=''>Email</Label></td>
                        <td><Input type='text' id='title' value={email} onChange={handleEmailChange} className='outline-none bg-transparent text-black w-[100%]' autoFocus /></td>
                    </tr>
                    <tr>
                        <td className="text-right"><Label>Calendar: </Label></td>
                        <td>
                            <ComboboxPopover
                                className='w-[100%]'
                                buttonColor={"bg-[#ffffffab]"}
                                statuses={calendars}
                                placeholder={"Set calendar"}
                                selectedStatusName={selectedCalendar?.name}
                                selectedStatus={selectedCalendar}
                                setSelectedStatus={setSelectedCalendar}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <DialogFooter>
                <ButtonBlue text={'Invite'} onClick={handleInvite} className='w-auto' />
                <DialogClose asChild>
                    <Button type="button" variant="secondary">Close</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    )
}

export default InviteUsers
