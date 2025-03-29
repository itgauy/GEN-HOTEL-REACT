import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Forward } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { Heart } from "lucide-react";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Textarea } from "@/components/ui/textarea";
import { MoreHorizontal } from "lucide-react";
import { Share } from "lucide-react";


const Comment = ({ author, time, content, likes, replies, avatarSrc, children }) => {
    return (
        <div className="w-full space-y-4">
            <div className="flex flex-row items-start space-x-4">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={avatarSrc} />
                    <AvatarFallback>{author.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-2 flex-1">
                    <div className="text-sm flex flex-row items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="font-semibold">{author}</div>
                            <div className="text-gray-400">{time}</div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="text-sm space-y-2">
                        {content.map((paragraph, index) => (
                            <div key={index}>{paragraph}</div>
                        ))}
                    </div>
                    <div className="select-none w-full flex flex-row justify-between items-center pt-1">
                        <div className="space-x-4">
                            <Button
                                size="xs"
                                className="rounded-full border-none hover:underline hover:bg-transparent"
                                variant="outline"
                            >
                                <Heart className="mr-1 h-4 w-4" /> Like ({likes})
                            </Button>
                            <Button
                                size="xs"
                                className="rounded-full border-none hover:underline hover:bg-transparent"
                                variant="outline"
                            >
                                <MessageCircle className="mr-1 h-4 w-4" /> Reply ({replies})
                            </Button>
                        </div>
                        <Button
                            size="xs"
                            className="rounded-full border-none hover:underline hover:bg-transparent"
                            variant="outline"
                        >
                            <Share className="mr-1 h-4 w-4" /> Share
                        </Button>
                    </div>
                </div>
            </div>
            {children && <div className="pl-14">{children}</div>}
        </div>
    )
}

function StaySuite_Public_Blog_Article() {
    const defaultAvatar =
        "https://substackcdn.com/image/fetch/w_32,h_32,c_fill,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack.com%2Fimg%2Favatars%2Fdefault-light.png"
    return (
        <section className="pt-28 pb-24 flex items-start flex-col mx-auto lg:container lg:max-w-[728px] space-y-8">
            <div id="article-introduction" className="space-y-3 flex flex-col items-start">
                <div id="title" className="font-bold text-4xl break-words leading-tight">Hotel Innovation: The value-curve approach to redefine hospitality and outshine competitors.</div>
                <div id="first-note-paragraph" className="text-lg text-slate-500">Another woke hypocrite clutching pearls, while being honored by a man that bombed seven countries</div>
                <div className="flex flex-row items-start space-x-3 select-none">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src="https://github.com/lash0000.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div id="author" className="text-sm">
                        <div id="name" className="hover:underline cursor-pointer">Kenneth Obsequio</div>
                        <div id="published-date" className="text-slate-500">March 26, 2025</div>
                    </div>
                </div>
                <div className="pt-2 border-slate-300 border-b w-full" />
                <div className="select-none w-full flex flex-row justify-between items-center">
                    <div className="space-x-2">
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <Button className="rounded-full border-slate-300" variant="outline">
                                    <Heart /> 2
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Login required</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action needs for you to login first before issuing upon data request.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                        <AlertDialog>
                            <AlertDialogTrigger>
                                <Button className="rounded-full border-slate-300" variant="outline">
                                    <MessageCircle /> 2
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Login required</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action needs for you to login first before issuing upon data request.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                    <div className="space-x-2">
                        <Button className="rounded-full border-slate-300" variant="outline">
                            <Forward /> Share
                        </Button>
                    </div>
                </div>
            </div>
            <div id="article-body" className="space-y-4">
                <div id="article-paragraph" className="text-lg">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod ipsum dolorum architecto beatae id suscipit deserunt aliquid debitis eius quas! Temporibus sapiente nihil, ab magnam eligendi alias magni recusandae quam. Sequi harum quasi nostrum autem sit ex modi culpa delectus perferendis, inventore, omnis
                </div>
                <div id="article-single-image" className="w-full cursor-pointer select-none">
                    <PhotoProvider>
                        <PhotoView src="https://w.wallhaven.cc/full/vq/wallhaven-vq898p.png">
                            <img src="https://w.wallhaven.cc/full/vq/wallhaven-vq898p.png" alt="test me" className="w-full h-full object-cover aspect-video rounded-lg" />
                        </PhotoView>
                    </PhotoProvider>
                </div>
                <div id="article-paragraph" className="text-lg">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod ipsum dolorum architecto beatae id suscipit deserunt aliquid debitis eius quas! Temporibus sapiente nihil, ab magnam eligendi alias magni recusandae quam. Sequi harum quasi nostrum autem sit ex modi culpa delectus perferendis, inventore, omnis
                </div>
                <div id="article-paragraph" className="text-lg">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod ipsum dolorum architecto beatae id suscipit deserunt aliquid debitis eius quas! Temporibus sapiente nihil, ab magnam eligendi alias magni recusandae quam. Sequi harum quasi nostrum autem sit ex modi culpa delectus perferendis, inventore, omnis
                </div>
                <div id="article-paragraph" className="text-lg">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod ipsum dolorum architecto beatae id suscipit deserunt aliquid debitis eius quas! Temporibus sapiente nihil, ab magnam eligendi alias magni recusandae quam. Sequi harum quasi nostrum autem sit ex modi culpa delectus perferendis, inventore, omnis
                </div>
            </div>
            <div id="article-footer" className="w-full border-y border-slate-300">
                <div className="py-16 flex items-center justify-center text-center flex-col space-y-4">
                    <div id="last-note">Thanks for reading! Subscribe for free to receive new posts.</div>
                    <div className="w-[320px] select-none">
                        <div className="*:not-first:mt-2">
                            <div className="flex rounded-md shadow-xs">
                                <Input
                                    id=""
                                    className="-me-px flex-1 rounded-e-none border-black shadow-none focus-visible:z-10"
                                    placeholder="Email"
                                    type="email"
                                />
                                <button className="border-black bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:border-ring focus-visible:ring-ring/50 inline-flex items-center rounded-e-md border px-3 text-sm font-medium transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="max-w-[480px] break-words text-gray-500">
                        <Label>
                            By subscribing, I agree to StaySuite's Terms of Use, and acknowledge its Information Collection Notice and Privacy Policy.
                        </Label>
                    </div>
                </div>
            </div>

            {/* Dynamic Data for Comments */}
            
            <div className="text-lg font-bold">
                Discussions in this thread.
            </div>

            <div className="w-full max-w-3xl mx-auto space-y-6">
                {/* Main Thread Comment */}
                <Comment
                    author="Terence Maturan"
                    time="1d · Edited"
                    content={[
                        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
                    ]}
                    likes={32}
                    replies={2}
                    avatarSrc={defaultAvatar}
                >
                    {/* First Reply */}
                    <Comment
                        author="Kat"
                        time="9h"
                        content={[
                            'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
                        ]}
                        likes={5}
                        replies={1}
                        avatarSrc={defaultAvatar}
                    >
                        {/* Reply to the first reply */}
                        <Comment
                            author="DarleneGerez"
                            time="7h"
                            content={["True. Hays mahirap makipag argue kung one sided ung mga pananaw nila."]}
                            likes={1}
                            replies={0}
                            avatarSrc={defaultAvatar}
                        />

                        {/* Another reply to the first reply */}
                        <Comment author="Kat" time="6h" content={["Di ba!"]} likes={0} replies={0} avatarSrc={defaultAvatar} />
                    </Comment>
                </Comment>

                {/* Example with placeholder text (as shown in your second image) */}
                <div className="border-t pt-6">
                    <Comment
                        author="Toshiba Laptop"
                        time="1d"
                        content={["There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."]}
                        likes={2}
                        replies={2}
                        avatarSrc={defaultAvatar}
                    >
                        <Comment
                            author="Toshiba Laptop"
                            time="1d"
                            content={["If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet."]}
                            likes={2}
                            replies={2}
                            avatarSrc={defaultAvatar}
                        />
                    </Comment>
                </div>
            </div>

        </section>
    )
}

export default StaySuite_Public_Blog_Article;