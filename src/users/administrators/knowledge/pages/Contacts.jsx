import { useState } from "react"
import Swal from 'sweetalert2'
import { HiOutlineArrowRight, HiOutlineSearch, HiOutlineReply } from "react-icons/hi"
import { Button, InputText } from '../components'

function Hotel_Services_Contacts() {

    const [search, setSearch] = useState("")

    // Sample contacts data
    const contacts = [
        {
            _id: "1",
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            message: "Hi, I am planning a trip next month and I would like to inquire more about your hotel services, including the amenities and available room packages. Could you please send me more detailed information?",
            createdAt: "2024-04-25T10:30:00Z"
        },
        {
            _id: "2",
            firstName: "Jane",
            lastName: "Smith",
            email: "jane.smith@example.com",
            message: "Hello, I am considering a long-term stay at your hotel and was wondering if you offer any special discounts or packages for guests who plan to stay for more than a month. I would appreciate any information you could provide.",
            createdAt: "2024-04-26T12:45:00Z"
        },
        {
            _id: "3",
            firstName: "Alice",
            lastName: "Johnson",
            email: "alice.johnson@example.com",
            message: "Good day! I have an upcoming reservation at your hotel, and I was wondering if it would be possible to arrange for an early check-in. My flight arrives very early in the morning, and it would be very helpful to check in earlier if available.",
            createdAt: "2024-04-27T08:15:00Z"
        },
        {
            _id: "4",
            firstName: "Robert",
            lastName: "Williams",
            email: "robert.williams@example.com",
            message: "Hi, I am interested in booking a room at your hotel and would like to confirm whether breakfast is included in the room price. If not, could you let me know the additional cost and the breakfast options available?",
            createdAt: "2024-04-28T09:20:00Z"
        },
        {
            _id: "5",
            firstName: "Emily",
            lastName: "Brown",
            email: "emily.brown@example.com",
            message: "Hello, before making a reservation, I would like to understand your cancellation policy. Could you please clarify how far in advance I would need to cancel to avoid any charges, and if there are any cancellation fees involved?",
            createdAt: "2024-04-29T14:05:00Z"
        }
    ]


    // Search Filter
    const filteredContacts = contacts
        .slice()
        .reverse()
        .filter(({ firstName, lastName, email, message }) => {
            const query = search.toLowerCase()
            return (
                firstName.toLowerCase().includes(query) ||
                lastName.toLowerCase().includes(query) ||
                email.toLowerCase().includes(query) ||
                message.toLowerCase().includes(query)
            )
        })


    // View Modal
    const handleViewContact = (contact) => {
        Swal.fire({
            title: `Inquiry from ${contact.firstName}`,
            html: `
            <div class="text-left mt-5">
                <div class='flex justify-between items-start'>
                <div>
                    <span class='text-xl text-neutral-900 font-semibold'>${contact.lastName}, ${contact.firstName}</span>
                    <p>${contact.email}</p>
                </div>
                <p class="mt-[1px]"> ${new Date(contact.createdAt).toLocaleString(undefined, {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            })}
                </p>
                </div>
                <br>
                <p>Message: ${contact.message}</p>
            </div>
            `,
            confirmButtonText: "Reply",
            denyButtonText: "Close",
            showDenyButton: true,
            customClass: {
                title: "swal-title",
                text: "swal-text",
                popup: "swal-popup-xl",
                confirmButton: "swal-confirm",
                denyButton: "swal-cancel"
            },
            showClass: {
                popup: 'swal-fade-in'
            },
            hideClass: {
                popup: 'swal-fade-out'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                handleReply(contact)
            }
        })
    }

    // Reply Modal
    const handleReply = (contactData) => {
        Swal.fire({
            title: 'Reply to Contact',
            html: `
            <div class="mb-4">
                <p class="mb-[2px] text-sm text-left">Replying to:</p>
                <div class='flex flex-col justify-start items-start -space-y-[2px]'>
                <span class='text-xl text-neutral-900 font-semibold'>${contactData.lastName}, ${contactData.firstName}</span>
                <p>${contactData.email}</p>
                </div>
            </div>
            <div class="mb-4">
                <label for="subject" class="block mb-2 text-left">Subject</label>
                <input id="subject" class="swal-input w-full" placeholder="Enter subject">
            </div>
            <div class="mb-4">
                <label for="message" class="block mb-2 text-left">Message</label>
                <textarea id="message" class="swal-textarea w-full" placeholder="Type your reply here..."></textarea>
            </div>
            <div id="swal-validation-message" class="text-center text-red-500 text-base"></div>
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
            confirmButtonText: 'Send Reply',
        })
    }

    return (
        <section id="welcome-page" className="p-8">
            {/* Header */}
            <div className='flex justify-between items-end'>
                {/* Headings / Subheadings */}
                <div>
                    <h1 className="text-2xl font-semibold">Contact Inquiries</h1>
                    {/* {contact.length} */}
                    <p>{contacts.length} total inquiry{contacts.length > 1 && "ies"}</p>
                </div>
                {/* Search Bar */}
                <div className='relative w-full max-w-sm'>
                    <HiOutlineSearch className='size-5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600' />
                    <InputText
                        type="text"
                        placeholder="Search by name, email, or message"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 w-full max-w-sm"
                    />
                </div>
            </div>
            {/* Main Content */}
            <ul className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-6'>
                {filteredContacts.map((contact) => (
                    <div key={contact._id} onClick={() => handleViewContact(contact)} className="group p-4 border border-neutral-200/70 rounded-2xl space-y-4 transition-all duration-300 ease-in-out hover:shadow-lg shadow-neutral-200/50 cursor-pointer">
                        <div className='flex justify-between items-start'>
                            <div>
                                <span className='text-lg font-semibold'>{contact.lastName}, {contact.firstName}</span>
                                <p className="text-neutral-600">{contact.email}</p>
                            </div>
                            <span className='text-sm text-neutral-500'>
                                {new Date(contact.createdAt).toLocaleString(undefined, {
                                    year: 'numeric',
                                    month: 'numeric',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true
                                })}
                            </span>
                        </div>
                        <p className='line-clamp-3 text-neutral-700'>Message: {contact.message}</p>
                        <div className='flex justify-between items-end'>
                            <p className='flex items-center transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100'>
                                Open
                                <HiOutlineArrowRight className='-rotate-45 mt-[3px]' />
                            </p>
                            <Button
                                variant='info'
                                onClick={(e) => {
                                    e.stopPropagation() // prevent card click
                                    handleReply(contact)
                                }}
                            >
                                <HiOutlineReply className='size-4.5 stroke-[1.5px]' />
                                Reply
                            </Button>
                        </div>
                    </div>
                ))}
            </ul>
        </section>
    )
}

export default Hotel_Services_Contacts
