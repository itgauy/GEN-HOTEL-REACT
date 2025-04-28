import { useState } from "react"
import Swal from 'sweetalert2'
import { HiOutlinePlusSm, HiOutlinePencil, HiOutlineArrowRight, HiOutlineTrash } from "react-icons/hi"
import { Button } from '../components'

function Content_Management_Page() {

    const faqs = [
        {
            _id: "1",
            question: "What is React?",
            answer: "React is a JavaScript library for building user interfaces, primarily used for creating single-page applications."
        },
        {
            _id: "2",
            question: "How do I install React?",
            answer: "You can install React using npm or yarn. Simply run 'npm install react' or 'yarn add react' in your project directory."
        },
        {
            _id: "3",
            question: "What is JSX?",
            answer: "JSX stands for JavaScript XML. It's a syntax extension for JavaScript that looks similar to XML or HTML, and is used with React to describe what the UI should look like."
        },
        {
            _id: "4",
            question: "What is state in React?",
            answer: "State is an object that stores data and determines the behavior of a component. It allows React to track and manage changes within a component."
        },
        {
            _id: "5",
            question: "How do I pass data between components?",
            answer: "In React, you can pass data between components using props. A parent component can pass data to a child component through the use of props."
        }
    ]

    // Add FAQ
    const handleAddFaq = async () => {
        await Swal.fire({
            title: 'Add New FAQ',
            html: `
            <div class="space-y-4 text-left">
                <div>
                    <label class="block text-sm mb-1 font-medium text-gray-700">Question</label>
                    <input id="swal-question" class="swal-input w-full" placeholder="Enter question">
                </div>
                <div>
                    <label class="block text-sm mb-1 font-medium text-gray-700">Answer</label>
                    <textarea id="swal-answer" class="swal-textarea w-full" rows="6" placeholder="Enter answer"></textarea>
                </div>
                <div id="swal-validation-message" class="text-center text-red-500 text-base"></div>
            </div>
            `,
            customClass: {
                title: "swal-title",
                text: "swal-text",
                popup: "swal-popup-xl",
                confirmButton: "swal-confirm",
                cancelButton: "swal-cancel"
            },
            showClass: {
                popup: 'swal-fade-in'
            },
            hideClass: {
                popup: 'swal-fade-out'
            },
            showCancelButton: true,
            confirmButtonText: 'Add FAQ',
            focusConfirm: false,
        })
    }

    // Edit Article FAQ
    const handleEdit = (faq) => {
        Swal.fire({
            title: 'Edit FAQ',
            html: `
            <div class="space-y-4 text-left">
                <div class="mb-4">
                <label class="block text-sm mb-2 font-medium text-gray-700">Title</label>
                <input id="swal-question" class="swal-input w-full" value="${faq.question}">
                </div>
                <div class="mb-4">
                <label class="block text-sm mb-2 font-medium text-gray-700">Body</label>
                <textarea id="swal-answer" class="swal-textarea w-full" rows="3">${faq.answer}</textarea>
                </div>
                <div id="swal-validation-message" class="text-center text-red-500 text-base"></div>
            </div>
            `,
            customClass: {
                title: "swal-title",
                text: "swal-text",
                popup: "swal-popup-xl",
                confirmButton: "swal-info",
                cancelButton: "swal-cancel"
            },
            showClass: {
                popup: 'swal-fade-in'
            },
            hideClass: {
                popup: 'swal-fade-out'
            },
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Update FAQ'
        })
    }

    // Delete FAQ
    const handleDelete = async (id) => {
        await Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be undone",
            icon: "warning",
            iconColor: "#ef4444",
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it',
            cancelButtonText: 'Cancel',
            customClass: {
                title: "swal-title",
                text: "swal-text",
                popup: "swal-popup-sm",
                confirmButton: "swal-danger",
                cancelButton: "swal-cancel"
            },
            showClass: {
                popup: 'swal-fade-in'
            },
            hideClass: {
                popup: 'swal-fade-out'
            },
        })
    }

    return (
        <section id="welcome-page" className="p-8">
            {/* Heading / Subheading */}
            <div className='flex items-end justify-between'>
                <div>
                    <h1 className="text-2xl font-semibold">Content Management</h1>
                    <p>{faqs.length} total FAQ{faqs.length > 1 && "s"}</p>
                </div>
                <Button variant='primary' onClick={handleAddFaq}>
                    New FAQ
                    <HiOutlinePlusSm className='size-5 stroke-2' />
                </Button>
            </div>
            {/* Main Content */}
            <ul className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-6'>
                {[...faqs].reverse().map((faq) => (
                    <li key={faq._id} className='flex flex-col justify-between gap-4 p-4 border border-neutral-200/70 rounded-2xl'>
                        <div className='space-y-4'>
                            <h4 className="text-2xl font-medium line-clamp-2">{faq.question}</h4>
                            <p>{faq.answer}</p>
                        </div>
                        <div className='flex justify-end gap-2'>
                            <Button variant='danger' onClick={() => handleDelete(faq._id)}>
                                <HiOutlineTrash className='size-5 stroke-[1.5px]' />
                                Delete
                            </Button>
                            <Button variant='info' onClick={() => handleEdit(faq)}>
                                <HiOutlinePencil className='size-5 stroke-[1.5px]' />
                                Edit
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Content_Management_Page
