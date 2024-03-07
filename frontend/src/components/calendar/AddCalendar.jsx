import { Button } from '@/components/ui/button'
import { DialogHeader, DialogContent, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import React, { useState } from 'react'
import { ColorPicker } from 'antd';
import ButtonBlue from '@/components/buttons/ButtonBlue'
import axios, { POST_CONFIG } from '../../../API/axios'
import { getSavedState } from '@/redux/store'
import { DialogClose } from '@radix-ui/react-dialog'
import { useNavigate } from 'react-router-dom'

const AddCalendar = () => {
    const [ title, setTitle ] = useState('New calendar');
    const [ description, setDescription ] = useState('');
    const [ color, setColor ] = useState('#1677ff');
    const navigate = useNavigate();

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    const handleCreate = async () => {
        const data = {
            name: title,
            description: description,
            color: color,
            userId: getSavedState()?.user.id
        }

        const response = await axios.post('/api/calendar', data, POST_CONFIG);
        if (response) navigate('/');
    }

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle className='font-[600] text-[20px]'>Add calendar</DialogTitle>
                <Separator className='h-[1px] bg-gray-200' />
                <DialogDescription className='mn-[10px]'>
                    <table className='w-[100%] mt-[10px]'>
                        <tbody>
                            <tr>
                                <td className='text-right pr-[10px]'><Label htmlFor="title" className=''>Title</Label></td>
                                <td className='flex gap-[5px] justify-between items-center'>
                                    <Input type='text' id='title' value={title} onChange={handleTitleChange} className='outline-none bg-transparent text-black w-auto' autoFocus />
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
                <ButtonBlue text={'Create'} onClick={handleCreate} className='w-auto' />
                <DialogClose asChild>
                    <Button type="button" variant="secondary">Close</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    )
}

export default AddCalendar
