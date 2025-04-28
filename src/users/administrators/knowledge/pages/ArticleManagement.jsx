import { useState } from "react"
import Swal from 'sweetalert2'
import { Link } from "react-router-dom"
import { HiOutlinePlusSm, HiOutlinePencil, HiOutlineArrowRight, HiOutlineTrash } from "react-icons/hi"
import { Button } from '../components'

function Article_Management() {

    // Sample articles data
    const article = [
        {
            _id: "1",
            title: "Exploring the Best Beaches in the Philippines",
            body: "The Philippines is home to some of the most stunning beaches in the world. From the powdery white sands of Boracay to the untouched beauty of Palawan, each island offers a unique experience. In this article, we’ll take you through the top destinations you must visit for your next tropical getaway.",
            tags: ['beach', 'vacation', 'travel', 'Philippines'],
            image: "https://plus.unsplash.com/premium_photo-1742356870701-1c4fd715d4e7?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            createdAt: "2024-04-25T09:00:00Z"
        },
        {
            _id: "2",
            title: "5 Essential Tips for Remote Work Success",
            body: "Working remotely offers flexibility but also comes with challenges. Setting up a dedicated workspace, maintaining a consistent schedule, and using the right collaboration tools can significantly boost your productivity. Learn more actionable tips in this article to thrive while working from home.",
            tags: ['remote work', 'productivity', 'work tips', 'flexibility'],
            createdAt: "2024-04-26T14:30:00Z"
        },
        {
            _id: "3",
            title: "Beginner’s Guide to Sustainable Living",
            body: "Sustainability starts with small, consistent changes in your daily habits. From reducing single-use plastics to choosing eco-friendly products, every step counts. This guide covers easy and practical ways you can start living a greener lifestyle today, even with a busy schedule.",
            tags: ['sustainability', 'eco-friendly', 'green living', 'environment'],
            createdAt: "2024-04-27T11:45:00Z"
        },
        {
            _id: "4",
            title: "Top 10 Must-Try Street Foods in Southeast Asia",
            body: "Southeast Asia is a food lover’s paradise, offering a variety of delicious street foods. Whether it's the savory satay of Indonesia or the sweet mango sticky rice of Thailand, each dish tells a story of culture and tradition. Here’s a list of ten must-try treats when traveling through the region.",
            tags: ['street food', 'Southeast Asia', 'foodie', 'travel'],
            image: "https://plus.unsplash.com/premium_photo-1742356870699-21ccb47a11b1?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            createdAt: "2024-04-28T08:10:00Z"
        },
        {
            _id: "5",
            title: "How to Start Investing with Little Money",
            body: "Investing isn’t just for the wealthy. With the rise of micro-investing platforms, anyone can start building their financial future with just a few dollars. This article breaks down simple strategies and tools you can use to make your first investment, even on a tight budget.",
            tags: ['investing', 'finance', 'budget', 'wealth building'],
            image: "https://plus.unsplash.com/premium_photo-1742356870681-fd40aef21af9?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            createdAt: "2024-04-29T16:20:00Z"
        }
    ]

    // Add Article Form
    const handleAddArticle = async () => {
        await Swal.fire({
            title: 'Add New Article',
            html: `
            <script>
            function autoResize(textarea) {
                const scrollTop = window.scrollY
                textarea.style.height = 'auto'
                textarea.style.height = textarea.scrollHeight + 'px'
                window.scrollTo({ top: scrollTop })
            }
            </script>
            <div class="space-y-4 text-left">
            <div>
                <label class="block text-sm mb-1 font-medium text-gray-700">Title</label>
                <input id="swal-title" class="swal-input w-full" placeholder="Article title" />
            </div>
            <div>
                <label class="block text-sm mb-1 font-medium text-gray-700">Body</label>
                <textarea
                id="swal-body"
                class="swal-textarea w-full resize-none overflow-hidden"
                rows="6"
                placeholder="Article content"
                ></textarea>
            </div>
            <div>
                <label class="block text-sm mb-1 font-medium text-gray-700">Tags <span class='text-gray-500 font-normal'>(comma separated)</span></label>
                <input id="swal-tags" class="swal-input w-full" placeholder="tag1, tag2" />
            </div>
            <div>
                <label class="block text-sm mb-1 font-medium text-gray-700">Image</label>
                <input type="file" id="swal-image" accept="image/*" class="swal-input w-full" />
                <div class='flex items-center justify-center mt-6'>
                <img id="swal-image-preview" class="mt-2 rounded-lg max-w-lg hidden" /> 
                </div>
            </div>
            </div>
            `,
            customClass: {
                title: "swal-title",
                text: "swal-text",
                popup: "swal-popup-5xl",
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
            confirmButtonText: 'Add Article',
            focusConfirm: false,
            didOpen: () => {
                const fileInput = document.getElementById('swal-image')
                const preview = document.getElementById('swal-image-preview')
                const textarea = document.getElementById('swal-body')

                if (textarea) {
                    const autoResize = (el) => {
                        const scrollTop = window.scrollY
                        el.style.height = 'auto'
                        el.style.height = el.scrollHeight + 'px'
                        window.scrollTo({ top: scrollTop })
                    }
                    textarea.addEventListener('input', () => autoResize(textarea))
                }

                fileInput.addEventListener('change', () => {
                    const file = fileInput.files[0]
                    if (file) {
                        const reader = new FileReader()
                        reader.onload = e => {
                            preview.src = e.target.result
                            preview.classList.remove('hidden')
                        }
                        reader.readAsDataURL(file)
                    }
                })
            },
            allowOutsideClick: true
        })
    }

    // Edit Article Form
    const handleEdit = (article) => {
        Swal.fire({
            title: 'Edit Article',
            html: `
            <div class="space-y-4 text-left">
            <div>
                <label class="block text-sm mb-1 font-medium text-gray-700">Title</label>
                <input id="swal-title" class="swal-input w-full" placeholder="Article title" value="${article.title}" readonly />
            </div>
            <div>
                <label class="block text-sm mb-1 font-medium text-gray-700">Body</label>
                <textarea id="swal-body" class="swal-textarea w-full resize-none overflow-hidden" rows="6" placeholder="Article content" readonly>${article.body}</textarea>
            </div>
            <div>
                <label class="block text-sm mb-1 font-medium text-gray-700">Tags (comma separated)</label>
                <input id="swal-tags" class="swal-input w-full" placeholder="tag1, tag2" value="${article.tags}" readonly />
            </div>
            <div>
                <label class="block text-sm mb-1 font-medium text-gray-700">Image</label>
                <input type="file" id="swal-image" accept="image/*" class="swal-input w-full" disabled />
            </div>
            ${article.image ? `
            <div class='flex flex-col items-center justify-center mt-6'>
                <label class="block text-sm mb-1 font-medium text-gray-700 text-center">Current Image</label>
                <img src="${article.image}" alt="Current image" class="rounded-lg max-w-lg w-full" /> 
            </div>` : ''}
            </div>
            `,
            customClass: {
                title: "swal-title",
                text: "swal-text",
                popup: "swal-popup-5xl",
                confirmButton: "swal-info",
                cancelButton: "swal-cancel"
            },
            showClass: {
                popup: 'swal-fade-in'
            },
            hideClass: {
                popup: 'swal-fade-out'
            },
            showCancelButton: true,
            confirmButtonText: 'Update Article',
            showLoaderOnConfirm: true,
            focusConfirm: false,
        })
    }

    // Delete Article
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
                    <h1 className="text-2xl font-semibold">Article Management</h1>
                    <p>{article.length} total article{article.length > 1 && "s"}</p>
                </div>
                <Button variant='primary' onClick={handleAddArticle}>
                    New Article
                    <HiOutlinePlusSm className='size-5 stroke-2' />
                </Button>
            </div>
            {/* Main Content */}
            <ul className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-6'>
                {[...article].reverse().map((article) => (
                    <li key={article._id} className='p-2.5 border border-neutral-200 rounded-2xl'>
                        {article.image ? (
                            <div className='border border-neutral-300 relative h-56 rounded-lg overflow-hidden'>
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="absolute w-full h-full object-cover"
                                />
                            </div>
                        ) : <div className='border border-neutral-300 relative h-56 rounded-lg overflow-hidden'>
                            <img src="https://placehold.co/30x30" alt="Placeholder Image" className='absolute w-full h-full object-cover' />
                        </div>}
                        {/* Article Infos */}
                        <div className='space-y-2.5 p-4'>
                            <h4 className='line-clamp-2 text-2xl font-medium'>{article.title}</h4>
                            <p className='line-clamp-3'>{article.body}</p>
                            <div className='flex items-end justify-between gap-2 mt-6'>
                                {/* Date */}
                                <p className="text-sm text-neutral-500">
                                    {new Date(article.createdAt).toLocaleDateString('en-PH', {
                                        month: 'short', day: '2-digit', year: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                        {/* Action Buttons */}
                        <div className='flex items-center justify-between p-1'>
                            <Link to={`/article/${article._id}`}>
                                <Button variant='secondary'>
                                    Read more
                                    <HiOutlineArrowRight className='size-4.5 -rotate-45 stroke-[1.5px] mt-1' />
                                </Button>
                            </Link>
                            <div className='flex gap-2'>
                                <Button variant='danger' onClick={() => handleDelete(article._id)}>
                                    <HiOutlineTrash className='size-5 stroke-[1.5px]' />
                                    Delete
                                </Button>
                                <Button variant='info' onClick={() => handleEdit(article)}>
                                    <HiOutlinePencil className='size-5 stroke-[1.5px]' />
                                    Edit
                                </Button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Article_Management
