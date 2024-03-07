import { Button } from '@/components/ui/button'
import { DialogHeader, DialogContent, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useState } from 'react'
import { ColorPicker } from 'antd';
import ButtonBlue from '@/components/buttons/ButtonBlue'
import axios, { POST_CONFIG } from '../../../API/axios'
import { getSavedState } from '@/redux/store'
import { DialogClose } from '@radix-ui/react-dialog'
import { useNavigate } from 'react-router-dom'
import { TrashIcon } from "@radix-ui/react-icons"
import ButtonWithBorder from '../buttons/ButtonWithBorder'

const EditCalendar = ({ calendar }) => {
    const [ title, setTitle ] = useState(calendar.name);
    const [ description, setDescription ] = useState(calendar.description);
    const [ color, setColor ] = useState(calendar.color);
    const navigate = useNavigate();

    const handleTitleChange = async (e) => {
        setTitle(e.target.value)
        const data = {
            name: e.target.value,
        }
        await handleUpdate(data);
    }

    const handleDescriptionChange = async (e) => {
        setDescription(e.target.value);
        const data = {
            description: e.target.value,
        }
        await handleUpdate(data);
    }

    const handleColorChange = async (e) => {
        setColor(e.target.value)
        const data = {
            color: e.target.value,
        }
        await handleUpdate(data);
    }

    const handleUpdate = async (data) => {
        const response = await axios.patch(`/api/calendar/${calendar.id}`, data, POST_CONFIG);
        if (response) navigate('/');
    }

    const calendarDelete = async () => {
        const response = await axios.delete(`api/calendar/${calendar.id}`, GET_CONFIG)
        if (response.status == 200) navigate('/')
    }
    

    return (
        <div className="flex flex-col relative items-end gap-[10px]">
            <table className='w-[100%]'>
                <tbody>
                    <tr>
                        <td className='text-right pr-[10px]'><Label htmlFor="title" className=''>Title</Label></td>
                        <td className='flex gap-[5px] justify-between items-center'>
                            <Input type='text' id='title' value={title} onChange={handleTitleChange} className='outline-none bg-transparent text-black w-auto' />
                            <input type="color" className="h-7 w-6 block cursor-pointer rounded-[20px] bg-transparent disabled:opacity-50 disabled:pointer-events-none overflow-hidden" id="hs-color-input" value={color} onChange={handleColorChange} title="Choose your color"></input>
                        </td>
                    </tr>
                    <tr>
                        <td className='text-right align-top pt-[8px] pr-[10px]'><Label htmlFor="title">Description</Label></td>
                        <td className='items-start'>
                            <Textarea id="description" value={description} onChange={handleDescriptionChange} className='mt-[5px] max-h-[400px] text-black' />
                        </td>
                    </tr>
                </tbody>
            </table>
            <ButtonWithBorder onClick={calendarDelete} text={'Delete'} className={'border-red-400 text-red-400 hover:bg-red-400 hover:text-white'} />
        </div>
    )
}

export default EditCalendar

{/* <div className="sm:max-w-[425px]">
<DialogHeader>
    <DialogTitle className='font-[600] text-[20px]'>Edit calendar</DialogTitle>
    <Separator className='h-[1px] bg-gray-200' />
    <DialogDescription className='mn-[10px]'>
        <table className='w-[100%] mt-[10px]'>
            <tbody>
                <tr>
                    <td className='text-right pr-[10px]'><Label htmlFor="title" className=''>Title</Label></td>
                    <td className='flex gap-[5px] justify-between items-center'>
                        <Input type='text' id='title' value={title} onChange={handleTitleChange} className='outline-none bg-transparent text-black w-auto' />
                        <input type="color" className="h-7 w-6 block cursor-pointer rounded-[20px] bg-transparent disabled:opacity-50 disabled:pointer-events-none overflow-hidden" id="hs-color-input" value={color} onChange={(e) => {setColor(e.target.value)}} title="Choose your color"></input>
                    </td>
                </tr>
                <tr className=''>
                    <td className='text-right align-top pt-[8px] pr-[10px]'><Label htmlFor="title">Description</Label></td>
                    <td className=' items-start'>
                        <Textarea id="description" value={description} onChange={handleDescriptionChange} className='mt-[5px] max-h-[400px] text-black' />
                    </td>
                </tr>
            </tbody>
        </table>

    </DialogDescription>
</DialogHeader>
<DialogFooter>
    <DialogClose asChild>
        <Button type="button" variant="secondary" className='bg-red-400 hover:bg-red-300 text-white'>Delete</Button>
    </DialogClose>
    <ButtonBlue text={'Save'} onClick={handleUpdate} className='w-auto' />
</DialogFooter>
</div> */}